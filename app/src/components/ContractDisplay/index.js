import React, { useState, useContext } from "react"

import {
    Row, Col, ListGroup, ListGroupItem, Badge,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from "reactstrap"
import { DrizzleContext } from "@drizzle/react-plugin"
import { newContextComponents } from "@drizzle/react-components"

const { ContractData, ContractForm } = newContextComponents

const ToggleHide = ({children}) => {
    const [hidden, setHidden] = useState(false);
    const toggle = () => setHidden(prevState => !prevState);

    return (<> 
    <Button onClick={toggle}>{hidden ? "Show" : "Hide"}</Button>
    {!hidden ? children : null}
    </>)
}

const ContractDisplay = ({ contract }) => {
    const drizzleContext = useContext(DrizzleContext.Context)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [showFunction, setShowFunction] = useState({});

    const toggleShowFunction = (f) => { 
        showFunction[f] = !showFunction[f];
    }

    const { drizzle, drizzleState } = drizzleContext
    if (!drizzleState) {
        return null
    }

    const web3Contract = drizzle.contracts[contract]
    if (!web3Contract) {
        return null
    }

    const { abi, address, contracName } = web3Contract;

    return (
        <Row>
            <Col>
                <Button onClick={toggle}>
                    {dropdownOpen ? "Hide" : "Show"}
                </Button>
                {dropdownOpen ?
                    <ListGroup>
                        <ListGroupItem className="justify-content-between">
                        </ListGroupItem>
                        {abi.map((f) => {
                            if (f.type == "function") {
                                if (f.constant && f.inputs.length == 0) {
                                    return (
                                        <ListGroupItem className="justify-content-between">
                                            {f.name}
                                            <Badge pill>
                                                <ContractData
                                                    drizzle={drizzle}
                                                    drizzleState={drizzleState}
                                                    contract={contract}
                                                    method={f.name}
                                                    render={data => data}
                                                />
                                            </Badge>
                                        </ListGroupItem>
                                    )
                                } else if (f.constant) {
                                    return (
                                        <ToggleHide>
                                        <ListGroupItem className="justify-content-between">
                                            {f.name}
                                            <ContractForm
                                                drizzle={drizzle}
                                                drizzleState={drizzleState}
                                                contract={contract}
                                                method={f.name}
                                            />
                                        </ListGroupItem>
                                        </ToggleHide>)
                                } else {
                                    return (
                                        <ListGroupItem className="justify-content-between">
                                            {f.name}
                                            <ContractForm
                                                drizzle={drizzle}
                                                drizzleState={drizzleState}
                                                contract={contract}
                                                method={f.name}
                                            />
                                        </ListGroupItem>)
                                }
                            }
                        })}
                    </ListGroup> : <></>}
            </Col>
        </Row>
    )
}

export default ContractDisplay
