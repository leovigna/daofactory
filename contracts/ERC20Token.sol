pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

contract ERC20Token is ERC20 {
    using SafeERC20 for ERC20;

    string public name;
    string public symbol;
    uint public decimals;
    address public owner;

    constructor(string memory tokenName, string memory tokenSymbol, uint tokenDecimals, uint initialSupply) public {
        owner = msg.sender;
        name = tokenName;
        symbol = tokenSymbol;
        decimals = tokenDecimals;
        _mint(msg.sender, initialSupply * 10 ** decimals);
    }
}
