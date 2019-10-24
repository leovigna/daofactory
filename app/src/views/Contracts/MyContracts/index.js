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
import ContractCard from "../ContractCard"

const MyContracts = () => {
  const drizzleContext = useContext(DrizzleContext.Context)
  const { drizzle, drizzleState, initialized } = drizzleContext
  if (!initialized) {
    return "Loading..."
  }
  if (!drizzleState) {
    return "Invalid state..."
  }
  const { contracts, contractMetadata } = drizzleState

  const deleteContract = contractKey => {
    drizzle.deleteContract(contractKey)
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          {Object.entries(contracts).map(([key, value]) => (
            <ContractCard
              key={key}
              deleteContract={deleteContract}
              contractKey={key}
              contract={value}
              metadata={contractMetadata[key]}
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default MyContracts
