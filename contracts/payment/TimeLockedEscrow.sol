pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/payment/escrow/ConditionalEscrow.sol";

/**
 * @title TimeLockedEscrow
 * @dev Escrow that holds funds for a beneficiary, deposited from multiple
 * parties.
 * @dev Intended usage: See {Escrow}. Same usage guidelines apply here.
 */
contract TimeLockedEscrow is ConditionalEscrow {
    uint public _withdrawAfter;

    /**
     * @dev Constructor.
     * @param withdrawAfter The unix timestamp after which escrow is unlocked.
     */
    constructor (uint withdrawAfter) public {
        require(withdrawAfter >= now, "TimeLockedEscrow: withdrawAfter should be after current block timestamp.");
        _withdrawAfter = withdrawAfter;
    }

    /**
     * @dev All funds are locked until withdrawal date.
     * @param payee The destination address of the funds.
     */
    function withdrawalAllowed(address payee) public view returns (bool) {
        return now >= _withdrawAfter;
    }
}
