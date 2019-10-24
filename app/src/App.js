import React, { Component } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"

import { Drizzle } from "@drizzle/store"
import { DrizzleContext } from "@drizzle/react-plugin"

import "./App.scss"

import drizzle from "./store"
// import MyContainer from "./MyContainer";
// import TokenFactory from "./TokenFactory"

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
)

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"))

class App extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </DrizzleContext.Provider>
    )
  }
}

export default App
