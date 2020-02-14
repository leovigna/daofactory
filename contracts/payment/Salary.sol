pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/payment/escrow/ConditionalEscrow.sol";

/**
 * @title Salary
 * @dev Salary in 1wei/sec.
 * @dev Intended usage: See {Escrow}. Same usage guidelines apply here.
 */
contract Salary is ConditionalEscrow {
    uint public _withdrawAfter;

    //Record all withdrawals to compute allowed salary
    mapping(address => uint256) private _withdrawals;
    //Salary in 1wei/sec
    mapping(address => uint256) private _salaries;
    //Employment start dates, used to compute salary
    mapping(address => uint256) private _startDates;

    /**
     * @dev Employee must have started
     * @param payee The destination address of the funds.
     */
    function withdrawalAllowed(address payee) public view returns (bool);

    /**
     * @dev Set employee salary in wei/sec
     * @param payee The destination address of the funds.
     */
    function setSalary(address payee, uint salary) public onlyPrimary;

    /**
     * @dev Set employee start date
     * @param payee The destination address of the funds.
     */
    function setSalary(address payee, uint startDate) public onlyPrimary;

}
