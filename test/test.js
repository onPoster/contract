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
        // Test that a NewPost event was emitted with the correct id, user, and content
        await expect(await poster.connect(user).post(content))
        .to.emit(poster, 'NewPost')
        .withArgs(0,user.address, content);
    });

    it('increment the id each post', async function() {
        let content = '{"type":"microblog","post":"this is also a post from user"}';
        // Test that a NewPost event was emitted with the correct id, user, and content
        await expect(await poster.connect(user).post(content))
        .to.emit(poster, 'NewPost')
        .withArgs(1,user.address, content);
    });
});
