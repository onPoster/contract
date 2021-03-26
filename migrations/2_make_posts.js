const Poster = artifacts.require('./Poster.sol')

module.exports = async function(deployer) {
  const poster = await Poster.deployed()

  console.log('Poster address:', poster.address)

  let accounts = await web3.eth.getAccounts()
  await poster.post(1,'{"type":"microblog","post":"this is a post from Jim"}', {
    from: accounts[0],
  })
  await poster.post(2,'{"type":"microblog","post":"this is a post from Bob"}', {
    from: accounts[1],
  })
}
