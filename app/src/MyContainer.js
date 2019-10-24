import React from "react"
import {
  Navbar,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap"

import { drizzleConnect } from "@drizzle/react-plugin"
import MyComponent from "./MyComponent"
import TokenFactory from "./TokenFactory"

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus
  }
}

// <MyComponent {...props} />
const MyContainer = props => {
  return (
    <div>
      <Navbar />
      <Container>
        <TokenFactory {...props} />
      </Container>
    </div>
  )
}

export default drizzleConnect(MyContainer, mapStateToProps)
