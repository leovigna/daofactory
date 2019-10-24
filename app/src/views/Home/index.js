import React from "react"

import { Col, Card, CardHeader, CardBody, Row, Button } from "reactstrap"

const Home = () => {
  const handleCreateTokenClick = e => {
    e.preventDefault()
    window.location = "/#/create/token"
  }

  const handleCreateCrowdsaleClick = e => {
    e.preventDefault()
    window.location = "/#/create/crowdsale"
  }

  const handleViewContractsClick = e => {
    e.preventDefault()
    window.location = "/#/contracts/mycontracts"
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="8">
          <Card>
            <CardHeader>
              <strong>Welcome to Token Launch</strong>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center mt-3">
                <Col col="2" className="mb-3 mb-xl-0 text-center">
                  <Button
                    onClick={handleCreateTokenClick}
                    color="primary"
                    size="lg"
                  >
                    Create Token
                  </Button>
                </Col>
                <Col col="2" className="mb-3 mb-xl-0 text-center">
                  <Button
                    onClick={handleCreateCrowdsaleClick}
                    color="primary"
                    size="lg"
                  >
                    Create Crowdsale
                  </Button>
                </Col>
                <Col col="2" className="mb-3 mb-xl-0 text-center">
                  <Button
                    onClick={handleViewContractsClick}
                    color="secondary"
                    size="lg"
                  >
                    View Contracts
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
