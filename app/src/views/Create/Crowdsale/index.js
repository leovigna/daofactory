import React, { useState, useContext } from "react"

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap"

import { DrizzleContext } from "@drizzle/react-plugin"
import { deployCrowdsale } from "../../../tokenlaunch/deploy"

const CreateCrowdsale = () => {
  const [tokenAddress, setTokenAddress] = useState()
  const [tokenPrice, setTokenPrice] = useState()

  const drizzleContext = useContext(DrizzleContext.Context)
  const { drizzle, drizzleState, initialized } = drizzleContext
  if (!initialized) {
    return "Loading..."
  }
  if (!drizzleState) {
    return "Invalid state..."
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { web3 } = drizzle

    deployCrowdsale({
      web3,
      tokenAddress,
      tokenPrice
    }).then(function(newContractInstance) {
      const newAddress = newContractInstance.options.address
      console.log(newAddress) // instance with the new contract address

      // Add to drizzle datastore
      const contractConfig = {
        contractName: newAddress,
        web3Contract: newContractInstance
      }
      const events = []
      drizzle.addContract(contractConfig, events)

      drizzle.store.dispatch({
        type: "ADD_CONTRACT_METADATA",
        contractName: newAddress,
        contractMetadata: { contractInterface: "Crowdsale" }
      })
    })
  }
  const handleChangeTokenAddress = e => {
    setTokenAddress(e.target.value)
  }
  const handleChangeTokenPrice = e => {
    setTokenPrice(e.target.value)
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Crowdsale</strong> Create
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="tokenAddress">Token Address</Label>
                  <Input
                    type="text"
                    value={tokenAddress}
                    onChange={handleChangeTokenAddress}
                    name="tokenAddress"
                    id="tokenAddress"
                    placeholder="Enter Token Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tokenPrice">Token Price</Label>
                  <Input
                    type="number"
                    value={tokenPrice}
                    onChange={handleChangeTokenPrice}
                    name="tokenPrice"
                    id="tokenPrice"
                    placeholder="Enter Token Sale Price"
                  />
                </FormGroup>
                <Button>Launch</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateCrowdsale
