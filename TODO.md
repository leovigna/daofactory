# To Do

# UI Elements
* Function call / General Dropdown (à la Remix)
    - Styling
    - Validation
* Array/Mapping Table
* Struct Display
* Save to Metamask Contacts
* Address Link + Forl



## Proxy
### Simple Proxy
Implemented by OpenZeppelin. See <>

## Escrow
### Basic Escrow
Implemented by OpenZeppelin. See @openzellpelin/contracts
### Refund Escrow
Implemented by OpenZeppelin. See @openzellpelin/contracts
### Time-locked Escrow
- contructor()
    - withdrawalAfter (utc)
- withdrawalAllowed
    - block.timestamp > withdrawalAfter
### Per-second Payment
- contructor()
- withdrawalAllowed
    - salary set?
    - block.timestamp > withdrawalAfter
- withdrawableDepositsOf, min(:
    - depositsOf
    - (block.timestamp - withdrawalAfter)*_salary - _withdrawn
- setSalary 
- 