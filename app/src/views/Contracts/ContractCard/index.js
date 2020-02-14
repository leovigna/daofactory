// @flow
import React from "react"

import { Card, CardHeader, CardBody } from "reactstrap"

import ERC20Display from "../../../components/ERC20/ERC20Display"
import CrowdsaleDisplay from "../../../components/Crowdsale/CrowdsaleDisplay"
import ContractDisplay from "../../../components/ContractDisplay"

type Props = {
  contractKey: string,
  metadata: {
    contractInterface: string
  }
}

const ContractCard = (props: Props) => {
  const { contractKey, metadata } = props
  let contractInterface
  if (metadata) {
    contractInterface = metadata.contractInterface
  }

  /*
  const handleDeleteContract = e => {
    deleteContract(contractKey)
  }
  */

  let contractInfo = <div />
  if (contractInterface === "ERC200") {
    contractInfo = <ERC20Display contract={contractKey} />
  } else if (contractInterface === "Crowdsale") {
    contractInfo = <CrowdsaleDisplay contract={contractKey} />
  } else {
    contractInfo = <ContractDisplay contract={contractKey} />
  }

  return (
    <Card>
      <CardHeader>
        <strong>{contractInterface || "Unknown"}</strong> {contractKey}
      </CardHeader>
      <CardBody>
        {contractInfo}
        {/* <Button onClick={handleDeleteContract}>Delete</Button> */}
      </CardBody>
    </Card>
  )
}

export default ContractCard
