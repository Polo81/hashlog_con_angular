var HashLogContract = artifacts.require("./HashLogContract.sol");

module.exports = function(deployer) {
  deployer.deploy(HashLogContract);
};
