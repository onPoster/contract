const { expect, assert } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

describe('Poster should:', function() {
    let bob, deployer, me;
    before(async function() {
        [deployer, me, bob] = await ethers.getSigners();
    });

    it('deploy Poster contract', async function() {
        const Poster = await ethers.getContractFactory('Poster', deployer);
        poster = await Poster.deploy();
        expect(await poster.address).to.not.equal(0);
    });

    it('let me post', async function() {

        let content = '{"type":"microblog","post":"this is a post from me"}';
        const receipt = await poster.connect(me).post(content);
        console.log(receipt);
        // Test that a NewPost event was emitted with the new value
        expectEvent(receipt, 'NewPost', { content: content });
    })
});
