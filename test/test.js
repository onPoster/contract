const { expect, assert } = require('chai');

describe('Poster should:', function() {
    let deployer, user;
    before(async function() {
        [deployer, user, bob] = await ethers.getSigners();
        const Poster = await ethers.getContractFactory('Poster', deployer);
        poster = await Poster.deploy();
        expect(await poster.address);
    });

    it('let user make a post', async function() {
        let content = '{"type":"microblog","post":"this is a post from user"}';
        const receipt = await poster.connect(user).post(content);
        // Test that a NewPost event was emitted with the correct id, user, and content
        await expect(await poster.connect(user).post(content))
        .to.emit(poster, 'NewPost')
        .withArgs("0xd1cb4e4d2082f3a3cf53a27d24685fb07ff548c94a7d1f4e9228558b6a987a14",user.address, content);
    });
});
