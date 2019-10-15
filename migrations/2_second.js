var Votes = artifacts.require('./Votes.sol')

module.exports = function(deployer) {
    deployer.deploy(Votes)
    // console.log(Votes) // test to see if votes is being detected
};