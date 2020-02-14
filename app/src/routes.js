import React from "react"

const Home = React.lazy(() => import("./views/Home"))
const CreateToken = React.lazy(() => import("./views/Create/Token"))
const CreateCrowdsale = React.lazy(() => import("./views/Create/Crowdsale"))
const CreateCustom = React.lazy(() => import("./views/Create/Custom"))
const CreateProxy = React.lazy(() => import("./views/Create/Proxy"))

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
    path: "/create/custom",
    name: "Create Custom",
    component: CreateCustom
  },
  {
    path: "/create/proxy",
    name: "Create Proxy",
    component: CreateProxy
  },
  {
    path: "/contracts/mycontracts",
    name: "My Contracts",
    component: MyContracts
  }
]

export default routes
