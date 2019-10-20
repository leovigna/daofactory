import MyComponent from "./MyComponent";
import TokenFactory from "./TokenFactory";

import { drizzleConnect } from "@drizzle/react-plugin";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
  };
};

const MyContainer = drizzleConnect(TokenFactory, mapStateToProps);

export default MyContainer;
