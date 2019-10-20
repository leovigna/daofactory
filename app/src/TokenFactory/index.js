import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types'; // ES6

import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import TutorialToken from "../contracts/TutorialToken.json";

const ERC20Factory = (props, context) => {
    const [tokenName, setTokenName] = useState()
    const [tokenSymbol, setTokenSymbol] = useState()
    const [tokenSupply, setTokenSupply] = useState()

    const handleChangeTokenName = e => {
        setTokenName(e.target.value)
    }

    const handleChangeTokenSymbol = e => {
        setTokenSymbol(e.target.value)
    }

    const handleChangeTokenSupply = e => {
        setTokenSupply(e.target.value)
    }

    const handleSubmit = event => {

        //alert(tokenName + ' (' + tokenSymbol + ') - ' + tokenSupply)
        const web3 = context.drizzle.web3
        console.log(web3)
        var contractConfig = {
            contractName: "Token1",
            web3Contract: new web3.eth.Contract(TutorialToken.abi)
        }
        const events = ['Mint']
        contractConfig.web3Contract
        .deploy({data: TutorialToken.bytecode})
        .send({
            from: web3.currentProvider.selectedAddress,
            gas: 1500000,
            gasPrice: web3.eth.gasPrice
        }, function(error, transactionHash){ console.log(transactionHash) })
        .on('error', function(error){ console.log(error)  })
        .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
        .on('receipt', function(receipt){
           console.log(receipt.contractAddress) // contains the new contract address
        })
        .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber) })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
        // Using an action
        //dispatch({type: 'ADD_CONTRACT', drizzle, contractConfig, events, web3})
        // Or using the Drizzle context object
        //this.context.drizzle.addContract(contractConfig, events)
        event.preventDefault()

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="tokenName">Token Name</Label>
                    <Input type="text" value={tokenName} onChange={handleChangeTokenName} name="tokenName" id="tokenName" placeholder="Enter Token Name (eg. Ethereum)" />
                </FormGroup>
                <FormGroup>
                    <Label for="tokenSymbol">Token Symbol</Label>
                    <Input type="text" value={tokenSymbol} onChange={handleChangeTokenSymbol} name="tokenSymbol" id="tokenSymbol" placeholder="Enter Token Symbol (eg. ETH)" />
                </FormGroup>
                <FormGroup>
                    <Label for="tokenSupply">Initial Supply</Label>
                    <Input type="number" value={tokenSupply} onChange={handleChangeTokenSupply} name="tokenSupply" id="tokenSupply" placeholder="Enter Initial Supply (eg. 1000)" />
                </FormGroup>
                <Button>Launch</Button>
            </Form>
        </Container>
    );
}

ERC20Factory.contextTypes = {
    drizzle: PropTypes.object
}

export default ERC20Factory;