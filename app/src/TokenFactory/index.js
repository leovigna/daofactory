import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types'; // ES6

import { Container, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AccountData, ContractData, ContractForm } from "@drizzle/react-components";

import ERC20Token from "../contracts/ERC20Token.json";

const ERC20Factory = ({ accounts, contracts }, context) => {
    const [tokenName, setTokenName] = useState()
    const [tokenSymbol, setTokenSymbol] = useState()
    const [tokenSupply, setTokenSupply] = useState()
    const [contractName, setContractName] = useState("ERC20Token")

    const [searchContract, setSearchContract] = useState()

    const handleChangeTokenName = e => {
        setTokenName(e.target.value)
    }

    const handleChangeTokenSymbol = e => {
        setTokenSymbol(e.target.value)
    }

    const handleChangeTokenSupply = e => {
        setTokenSupply(e.target.value)
    }

    const handleChangeSearchContract = e => {
        setSearchContract(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        //alert(tokenName + ' (' + tokenSymbol + ') - ' + tokenSupply)
        const web3 = context.drizzle.web3
        // Deploy using web3
        const web3Contract = new web3.eth.Contract(ERC20Token.abi)
        web3Contract
            .deploy({ data: ERC20Token.bytecode, arguments: [tokenName, tokenSymbol, 18, parseInt(tokenSupply)] })
            .send({
                from: web3.currentProvider.selectedAddress,
                gas: 1500000,
                gasPrice: web3.eth.gasPrice
            }, function (error, transactionHash) { console.log(transactionHash) })
            .on('error', function (error) { console.log(error) })
            .on('transactionHash', function (transactionHash) { console.log(transactionHash) })
            .on('receipt', function (receipt) {
                console.log(receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function (confirmationNumber, receipt) { console.log(confirmationNumber) })
            .then(function (newContractInstance) {
                const newAddress = newContractInstance.options.address
                console.log(newAddress) // instance with the new contract address

                // Add to drizzle datastore
                const contractConfig = {
                    contractName: newAddress,
                    web3Contract: newContractInstance
                }
                const events = ["Transfer", "Approval"]
                context.drizzle.addContract(contractConfig, events)
            });

        
    }

    const handleSubmitSearchContract = event => {
        event.preventDefault();

        // Add to drizzle datastore
        const web3 = context.drizzle.web3

        const web3Contract = new web3.eth.Contract(ERC20Token.abi)
        const contractConfig = {
            contractName: searchContract,
            web3Contract: web3Contract
        }
        const events = ["Transfer", "Approval"]
        context.drizzle.addContract(contractConfig, events)

        console.log(contracts)        
    }

    const componentDidUpdate = (prevProps, prevState) => {
        console.log(prevProps)
        console.log(prevState)
    }

    return (
        <Container>
            {/*
            <Row>
                <Form onSubmit={handleSubmitSearchContract}>
                    <FormGroup>
                        <Input type="text" value={searchContract} onChange={handleChangeSearchContract} name="searchContract" id="searchContract" placeholder="Enter Contract" />
                    </FormGroup>
                    <Button>Change contract</Button>
                </Form>
            </Row>
            <Row>
                <h2><ContractData contract={contractName} method="name" /></h2>
                <p>
                    <strong>Total Supply: </strong>
                    <ContractData
                        contract={contractName}
                        method="totalSupply"
                        methodArgs={[{ from: accounts[0] }]}
                    />{" "}
                    <ContractData contract={contractName} method="symbol" />
                </p>
                <p>
                    <strong>My Balance: </strong>
                    <ContractData
                        contract={contractName}
                        method="balanceOf"
                        methodArgs={[accounts[0]]}
                    />
                </p>
                <h3>Send Tokens</h3>
                <ContractForm contract={contractName} method="transfer" />
            </Row>
            */}
            <Row>
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
            </Row>
        </Container>
    );
}

ERC20Factory.contextTypes = {
    drizzle: PropTypes.object
}

export default ERC20Factory;