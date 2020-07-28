const Poster = artifacts.require('./Poster.sol')

module.exports = async function(deployer) {
  await deployer.deploy(Poster)
}
