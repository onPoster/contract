const { expect, assert } = require("chai");

describe("Poster should:", function() {
  let deployer, user;
  before(async function() {
    [deployer, user, bob] = await ethers.getSigners();
    const Poster = await ethers.getContractFactory("Poster", deployer);
    poster = await Poster.deploy();
    expect(await poster.address);
  });

  it("let user make a post", async function() {
    let content =
      '{"post":{type":"microblog","text":"this is a post from user"}}';
    await expect(await poster.connect(user).post(content));
  });
});
