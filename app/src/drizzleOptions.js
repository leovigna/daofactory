import SimpleStorage from "./contracts/SimpleStorage.json";
import ComplexStorage from "./contracts/ComplexStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import ERC20Token from "./contracts/ERC20Token.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [SimpleStorage, ComplexStorage, ERC20Token],
  events: {
    SimpleStorage: ["StorageSet"],
    ERC20Token: ["Transfer", "Approval"]
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
