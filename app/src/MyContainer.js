import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import MyComponent from "./MyComponent";
import TokenFactory from "./TokenFactory";

import { drizzleConnect } from "@drizzle/react-plugin";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
  };
};

//<MyComponent {...props} />
const MyContainer = (props) => { return (
    <Container>
        <TokenFactory {...props}/>
    </Container>
)}

export default drizzleConnect(MyContainer, mapStateToProps);
