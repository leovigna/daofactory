const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const ERC20Token = artifacts.require("ERC20Token");
//const CrowdsaleSimple = artifacts.require("CrowdsaleSimple");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(ERC20Token, "Token 2", "TK2", 18, 1000);
  //deployer.deploy(CrowdsaleSimple, 1, "0x1E7C4077345fAD7009DdB9C98Ad4b996565585dd", "0x2bcE191e0e86F30F2aCCd436abDb626eB3a47652");
};
