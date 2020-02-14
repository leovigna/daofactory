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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormText
} from "reactstrap"

import { DrizzleContext } from "@drizzle/react-plugin"
import ERC20Token from "../../../contracts/ERC20Token.json"
import CrowdsaleSimple from "../../../contracts/CrowdsaleSimple.json"


const CreateCustom = () => {
  const [contractAddress, setContractAddress] = useState()
  const [contractInterface, setContractInterface] = useState()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

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
    let web3Contract;
    if (contractInterface === "ERC20") {
        web3Contract = new web3.eth.Contract(ERC20Token.abi, contractAddress)
    } else if (contractInterface === "Crowdsale") {
        web3Contract = new web3.eth.Contract(CrowdsaleSimple.abi, contractAddress)
    }

    // Add to drizzle datastore
    const contractConfig = {
        contractName: contractAddress,
        web3Contract: web3Contract
      }
    const events = []
    drizzle.addContract(contractConfig, events)

    drizzle.store.dispatch({
        type: "ADD_CONTRACT_METADATA",
        contractName: contractAddress,
        contractMetadata: { contractInterface: contractInterface }
    })
    
  }
  const handleChangeContractAddress = e => {
    setContractAddress(e.target.value)
  }

  const handleChangeContractInterface = e => {
    setContractInterface(e.target.value)
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Contract</strong> Add
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="contractAddress">Contract Address</Label>
                  <Input
                    type="text"
                    value={contractAddress}
                    onChange={handleChangeContractAddress}
                    name="contractAddress"
                    id="contractAddress"
                    placeholder="Enter Existing Contract Address"
                  />
                </FormGroup>
                <FormGroup>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} onChange={handleChangeContractInterface}>
                <DropdownToggle caret>
                    {contractInterface || "Select Interface"}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={handleChangeContractInterface} value="ERC20">ERC20</DropdownItem>
                    <DropdownItem onClick={handleChangeContractInterface} value="Crowdsale">Crowdsale</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                </FormGroup>
                <Button>Add</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateCustom
