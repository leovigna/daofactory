const ERC20Token = artifacts.require("ERC20Token");
const CrowdsaleSimple = artifacts.require("CrowdsaleSimple");

const TestWallet = "0x1E7C4077345fAD7009DdB9C98Ad4b996565585dd"
module.exports = function(deployer) {
    deployer
        .then(() => ERC20Token.new("Test Token", "TEST", 18, 100000))
        .then((erc20) => {
            console.log("ERC20 deployed at:" + erc20.address)
            return CrowdsaleSimple.new(1, TestWallet, erc20.address)
        })
        .then((crowdSale) => {
            console.log("Crowdsale deployed at:" + crowdSale.address)
        })
  //deployer.deploy(ERC20Token, );
  //console.log(ERC20Token)
  //deployer.deploy(CrowdsaleSimple,
};
