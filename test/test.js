const { expect, assert } = require("chai");

describe("Poster should:", function() {
  let deployer;
  before(async function() {
    [deployer] = await ethers.getSigners();
    const Poster = await ethers.getContractFactory("Poster", deployer);
    poster = await Poster.deploy();
    expect(await poster.init());
    expect(await poster.address);
  });

  it("emit an event when post() is called", async function() {
    let content =
      '{"post":{"type":"microblog","text":"this is a post from user"}}';
    let tag = await ethers.utils.formatBytes32String("Poster");
    // Test that a NewPost event was emitted with the correct user, and content
    expect(await poster.post(content, tag))
      .to.emit(poster, "NewPost")
      .withArgs(deployer.address, tag, content);
  });
});
