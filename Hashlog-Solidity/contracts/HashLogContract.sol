pragma solidity ^0.4.4;
//Version 0//

contract HashLogContract {

	event hashloged(address indexed _from, bytes32 _hash);

	function hashlog(bytes32 hash) {
		hashloged(msg.sender, hash);
	}

}
