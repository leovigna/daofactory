import React from "react"

const Home = React.lazy(() => import("./views/Home"))
const CreateToken = React.lazy(() => import("./views/Create/Token"))
const CreateCrowdsale = React.lazy(() => import("./views/Create/Crowdsale"))
const MyContracts = React.lazy(() => import("./views/Contracts/MyContracts"))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", name: "Home", component: Home },
  { path: "/create/token", name: "Create Token", component: CreateToken },
  {
    path: "/create/crowdsale",
    name: "Create Crowdsale",
    component: CreateCrowdsale
  },
  {
    path: "/contracts/mycontracts",
    name: "My Contracts",
    component: MyContracts
  }
]

export default routes
