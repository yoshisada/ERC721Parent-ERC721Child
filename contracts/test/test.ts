const { ethers, upgrades } = require('hardhat')
const { expect } = require('chai')

describe('ERC721P and ERC721C', function () {
  let ERC721C
  let ERC721P
  let child
  let Thisabled1155Storefront
  let parent
  let owner
  let addr1
  let addr2

  const testNFTs = [
    {
      tokenURI: 'QmXvdXnXWW84zf8oSPMQsMmM6Dii2TtdCUQkxNAbuou1br',
      printCount: '20',
      price: '10000000000',
    },
    {
      tokenURI: 'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
      printCount: '20',
      price: '10000000000',
    },
    {
      tokenURI: 'QmboWvytdoiJPbe87REdpbsVX2KTfP2MEsGoPYAfqvkWi6',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmVci79ETvDmfBcE1vJYajXzhC2C5q1rC5yxk7cQv5TfoR',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmYmqJpbMNNBvs5KigoW1WoVg9G5irHTMJzxXK877QSoQb',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmU9bWsJX3tNJmx2yt2LNC4uFFm87Xne3DNJ9U1iGzAgpW',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmUvg4nU11t8rESiWqXQNyJY2MfUbxae7xmjxno12rmxrx',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmSCSt5vuz9ypkMgJ77ESjhZvVEpsLm3trGQqAvfjPtHn8',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmS8k2JCjn9S4jFKwaGYaDut1mG3CMT19c4mqC3RmE5BBc',
      printCount: '200',
      price: '1000000000000',
    },
    {
      tokenURI: 'QmX2LeeFhnSF3hH8M2M65QBKeQTbdtxHx6vyDhaqxYW6FV',
      printCount: '200',
      price: '1000000000000000',
    },
  ]

  // 1 parent 3 child setup
  async function p1c3() {
    const minterRole = parent.MINTER_ROLE()
    const childMinterRole = child.MINTER_ROLE()
    await parent.grantRole(minterRole, addr1.address)
    await child.grantRole(childMinterRole, addr1.address)
    expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
    expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

    const mintTx = await parent
      .connect(addr1)
      .safeMint(
        addr1.address,
        0,
        'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
      )
    const mintResults = await mintTx.wait()
    // check if minted token id matches the passed in token id of zero
    expect(mintResults.events[0].args['tokenId']).to.equal(0)
    // should create a child nft of parent token 0
    const mintTx2 = await child
      .connect(addr1)
      .safeMint(
        addr1.address,
        0,
        0,
        'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
      )
    const mintResults2 = await mintTx2.wait()
    // check if minted token id matches the passed in token id of zero
    const destructEvent = parent.interface.decodeEventLog(
      'ChildAdded',
      mintResults2.events[0].data,
      mintResults2.events[0].topics,
    )
    expect(destructEvent['childId']).to.equal(0)
    expect(destructEvent['parentId']).to.equal(0)

    const mintTx3 = await child
      .connect(addr1)
      .safeMint(
        addr1.address,
        1,
        0,
        'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
      )
    const mintResults3 = await mintTx3.wait()
    // check if minted token id matches the passed in token id of zero
    const destructEvent1 = parent.interface.decodeEventLog(
      'ChildAdded',
      mintResults3.events[0].data,
      mintResults3.events[0].topics,
    )
    expect(destructEvent1['childId']).to.equal(1)
    expect(destructEvent1['parentId']).to.equal(0)

    const mintTx4 = await child
      .connect(addr1)
      .safeMint(
        addr1.address,
        2,
        0,
        'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
      )
    const mintResults4 = await mintTx4.wait()
    // check if minted token id matches the passed in token id of zero
    const destructEvent2 = parent.interface.decodeEventLog(
      'ChildAdded',
      mintResults4.events[0].data,
      mintResults4.events[0].topics,
    )
    expect(destructEvent2['childId']).to.equal(2)
    expect(destructEvent2['parentId']).to.equal(0)
  }
  beforeEach(async function () {
    //Get ContractFactory and signers
    ERC721P = await ethers.getContractFactory('ParentERC721P')
    ERC721C = await ethers.getContractFactory('Child1ERC721C')
    ;[owner, addr1, addr2] = await ethers.getSigners()

    //Deploy NFT contract
    parent = await ERC721P.deploy()

    //Deploy storefront contract
    // console.log(parent.address)
    child = await ERC721C.deploy(parent.address)

    //Grant storefront contract roles
    // const storefrontRoleID = await thisabled1155.STOREFRONT_ROLE();
    // await thisabled1155.grantRole(storefrontRoleID, thisabled1155Storefront.address);

    //Set Child token in parent
    await parent.addChildContract(child.address)

    // //Grant owner curator and account storefront roles
    // const curatorRoleID = await thisabled1155Storefront.CURATOR_ROLE();
    // const accountantRoleID = await thisabled1155Storefront.ACCOUNTANT_ROLE();
    // await thisabled1155Storefront.grantRole(curatorRoleID, owner.address);
    // await thisabled1155Storefront.grantRole(accountantRoleID, owner.address);
  })

  describe('Deployment', function () {
    it('Parent address matches address stored in child', async function () {
      const targetAddress = await child._contractAddress()
      expect(await parent.address).to.equal(targetAddress)
    })

    it('Owner has all roles', async function () {
      //Owner has all roles for NFT contract
      const adminRoleID = await child.DEFAULT_ADMIN_ROLE()
      expect(await child.hasRole(adminRoleID, owner.address)).to.equal(true)

      const adminRoleID2 = await parent.DEFAULT_ADMIN_ROLE()
      expect(await parent.hasRole(adminRoleID2, owner.address)).to.equal(true)
    })
  })

  describe('Mint NFTs', function () {
    it('Creates 1 Parent NFT', async function () {
      const minterRole = parent.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
    })
    it('Creates 1 Parent and 1 Child of said parent', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)
    })

    it('Creates 1 Parent and 3 Child of said parent', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)

      const mintTx3 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          1,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults3 = await mintTx3.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent1 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults3.events[0].data,
        mintResults3.events[0].topics,
      )
      expect(destructEvent1['childId']).to.equal(1)
      expect(destructEvent1['parentId']).to.equal(0)

      const mintTx4 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          2,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults4 = await mintTx4.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent2 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults4.events[0].data,
        mintResults4.events[0].topics,
      )
      expect(destructEvent2['childId']).to.equal(2)
      expect(destructEvent2['parentId']).to.equal(0)
    })
  })

  describe('Transfers', function () {
    it('Mint 1 Parent and 3 Child to said parent then Transfer', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)

      const mintTx3 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          1,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults3 = await mintTx3.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent1 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults3.events[0].data,
        mintResults3.events[0].topics,
      )
      expect(destructEvent1['childId']).to.equal(1)
      expect(destructEvent1['parentId']).to.equal(0)

      const mintTx4 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          2,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults4 = await mintTx4.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent2 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults4.events[0].data,
        mintResults4.events[0].topics,
      )
      expect(destructEvent2['childId']).to.equal(2)
      expect(destructEvent2['parentId']).to.equal(0)

      const transferTxn = await parent
        .connect(addr1)
        .transferFrom(addr1.address, addr2.address, 0)
      const transferResult = await transferTxn.wait()

      const event = transferResult.events.filter(
        (e) => e.event === 'ChildTransfer',
      )

      //console.log(event)
      for (let i = 0; i < event.length; i++) {
        expect(event[i].event).to.equal('ChildTransfer')
        expect(event[i].args['newHolder']).to.equal(addr2.address)
      }
    })

    it('Mint 1 Parent and 3 Child to said parent then attempt Transfer of child', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)

      const mintTx3 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          1,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults3 = await mintTx3.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent1 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults3.events[0].data,
        mintResults3.events[0].topics,
      )
      expect(destructEvent1['childId']).to.equal(1)
      expect(destructEvent1['parentId']).to.equal(0)

      const mintTx4 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          2,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults4 = await mintTx4.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent2 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults4.events[0].data,
        mintResults4.events[0].topics,
      )
      expect(destructEvent2['childId']).to.equal(2)
      expect(destructEvent2['parentId']).to.equal(0)

      await expect(
        child.connect(addr1).transferFrom(addr1.address, addr2.address, 0),
      ).to.be.revertedWith('ERC721C: Caller is not parent')
    })
  })

  describe('Burns', function () {
    it('Mint 1 Parent and 3 Child then burn the parent and all of the children should follow', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)

      const mintTx3 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          1,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults3 = await mintTx3.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent1 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults3.events[0].data,
        mintResults3.events[0].topics,
      )
      expect(destructEvent1['childId']).to.equal(1)
      expect(destructEvent1['parentId']).to.equal(0)

      const mintTx4 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          2,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults4 = await mintTx4.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent2 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults4.events[0].data,
        mintResults4.events[0].topics,
      )
      expect(destructEvent2['childId']).to.equal(2)
      expect(destructEvent2['parentId']).to.equal(0)

      const burnTxn = await parent.connect(addr1).burn(0)
      const burnResult = await burnTxn.wait()
      //console.log(burnResult)

      const event = burnResult.events.filter((e) => e.event === 'ChildBurned')

      //console.log(event)
      for (let i = 0; i < event.length; i++) {
        expect(event[i].event).to.equal('ChildBurned')
        expect(event[i].args['childContract']).to.equal(child.address)
      }
    })

    it('Mint 1 Parent and 3 Child to said parent then attempt Burn of child', async function () {
      const minterRole = parent.MINTER_ROLE()
      const childMinterRole = child.MINTER_ROLE()
      await parent.grantRole(minterRole, addr1.address)
      await child.grantRole(childMinterRole, addr1.address)
      expect(await parent.hasRole(minterRole, addr1.address)).to.equal(true)
      expect(await child.hasRole(childMinterRole, addr1.address)).to.equal(true)

      const mintTx = await parent
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults = await mintTx.wait()
      // check if minted token id matches the passed in token id of zero
      expect(mintResults.events[0].args['tokenId']).to.equal(0)
      // should create a child nft of parent token 0
      const mintTx2 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          0,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults2 = await mintTx2.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults2.events[0].data,
        mintResults2.events[0].topics,
      )
      expect(destructEvent['childId']).to.equal(0)
      expect(destructEvent['parentId']).to.equal(0)

      const mintTx3 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          1,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults3 = await mintTx3.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent1 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults3.events[0].data,
        mintResults3.events[0].topics,
      )
      expect(destructEvent1['childId']).to.equal(1)
      expect(destructEvent1['parentId']).to.equal(0)

      const mintTx4 = await child
        .connect(addr1)
        .safeMint(
          addr1.address,
          2,
          0,
          'Qmc24dLy8mQ8jTJcTwfCSqHoiPESABw3PGdV6CNx2B2fz2',
        )
      const mintResults4 = await mintTx4.wait()
      // check if minted token id matches the passed in token id of zero
      const destructEvent2 = parent.interface.decodeEventLog(
        'ChildAdded',
        mintResults4.events[0].data,
        mintResults4.events[0].topics,
      )
      expect(destructEvent2['childId']).to.equal(2)
      expect(destructEvent2['parentId']).to.equal(0)

      try {
        await child.connect(addr1).burn(0)
      } catch (error) {}
    })
  })

  //   describe("Storefront batch add multiple art pieces", function() {
  //     it("Successfully batch add multiple art pieces to storefront", async function() {
  //       let uriList = [];
  //       let printCountList = [];
  //       let priceList = [];
  //       let pausedList = [];
  //       for(let i = 0; i < testNFTs.length; i++){
  //         printCountList.push(parseInt(testNFTs[i].printCount));
  //         priceList.push(parseInt(testNFTs[i].price));
  //         uriList.push(testNFTs[i].tokenURI);
  //         pausedList.push(false);
  //       }
  //       const artAddTx = await thisabled1155Storefront.batchAddArtworkToStorefront(uriList, printCountList, priceList, pausedList);
  //       const artAddResults = await artAddTx.wait();
  //     });
  //     it("Successfully mint each batch added art pieces", async function() {
  //       let uriList = [];
  //       let printCountList = [];
  //       let priceList = [];
  //       let pausedList = [];
  //       for(let i = 0; i < testNFTs.length; i++){
  //         printCountList.push(parseInt(testNFTs[i].printCount));
  //         priceList.push(parseInt(testNFTs[i].price));
  //         uriList.push(testNFTs[i].tokenURI);
  //         pausedList.push(false);
  //       }
  //       const artAddTx = await thisabled1155Storefront.batchAddArtworkToStorefront(uriList, printCountList, priceList, pausedList);
  //       const artAddResults = await artAddTx.wait();
  //       for(result of artAddResults.events){
  //         if(result?.event == "ArtworkAddedToStorefront"){
  //           const tokenID = result.args.tokenId;
  //           const printPrice = result.args.price;
  //           const mintTx = await thisabled1155Storefront.connect(addr1).mintArtwork(tokenID, {value: printPrice});
  //           const mintResults = await mintTx.wait();
  //           expect(mintResults.events[1].args[0]).to.equal(tokenID);
  //           expect(await thisabled1155.balanceOf(addr1.address, tokenID)).to.equal(1);
  //         }
  //       }
  //     });
  //     it("Successfully batch mint all batch added art pieces", async function() {
  //       let uriList = [];
  //       let printCountList = [];
  //       let priceList = [];
  //       let pausedList = [];
  //       for(let i = 0; i < testNFTs.length; i++){
  //         printCountList.push(parseInt(testNFTs[i].printCount));
  //         priceList.push(parseInt(testNFTs[i].price));
  //         uriList.push(testNFTs[i].tokenURI);
  //         pausedList.push(false);
  //       }
  //       const artAddTx = await thisabled1155Storefront.batchAddArtworkToStorefront(uriList, printCountList, priceList, pausedList);
  //       const artAddResults = await artAddTx.wait();
  //       let tokenIDs = [];
  //       let amounts = [];
  //       let amountCount = 1;
  //       let totalPrice = 0;
  //       for(result of artAddResults.events){
  //         if(result?.event == "ArtworkAddedToStorefront"){
  //           tokenIDs.push(result.args.tokenId);
  //           const batchPrice = ethers.BigNumber.from(result.args.price).mul(amountCount);
  //           totalPrice = ethers.BigNumber.from(totalPrice).add(batchPrice);
  //           amounts.push(amountCount);
  //           amountCount += 1;
  //         }
  //       }
  //       const batchMintTx = await thisabled1155Storefront.connect(addr1).batchMintArtwork(tokenIDs,  amounts, {value: totalPrice});
  //       const batchMintResults = await batchMintTx.wait();
  //     });
  //   });

  //   describe("Storefront pause/upause art sale", function() {
  //     it("Add artwork to storefront with a paused sale", async function() {
  //       const printCount = testNFTs[0].printCount;
  //       const printPrice = testNFTs[0].price;
  //       const artworkURI = testNFTs[0].tokenURI;
  //       const artAddTx = await thisabled1155Storefront.addArtworkToStorefront(artworkURI, printCount, printPrice, true);
  //       const artAddResults = await artAddTx.wait();
  //       const tokenID = artAddResults.events[1].args[0];
  //       expect(await thisabled1155Storefront.checkSalePaused(tokenID)).to.equal(true);

  //       //Unpause
  //       const artUnpauseTx = await thisabled1155Storefront.unpauseSale(tokenID);
  //       const artUnpauseResults = await artUnpauseTx.wait();
  //       expect(artUnpauseResults.events[0].args.tokenId).to.equal(tokenID);
  //       expect(await thisabled1155Storefront.checkSalePaused(tokenID)).to.equal(false);
  //     });
  //     it("Attempt to mint a paused art piece", async function() {
  //       const printCount = testNFTs[0].printCount;
  //       const printPrice = testNFTs[0].price;
  //       const artworkURI = testNFTs[0].tokenURI;
  //       const artAddTx = await thisabled1155Storefront.addArtworkToStorefront(artworkURI, printCount, printPrice, true);
  //       const artAddResults = await artAddTx.wait();
  //       const tokenID = artAddResults.events[1].args[0];
  //       await expect(thisabled1155Storefront.connect(addr1).mintArtwork(tokenID, {value: printPrice})).to.be.revertedWith("Artwork sale paused");

  //       //Unpause
  //       const artUnpauseTx = await thisabled1155Storefront.unpauseSale(tokenID);
  //       const artUnpauseResults = await artUnpauseTx.wait();
  //       expect(await thisabled1155Storefront.checkSalePaused(tokenID)).to.equal(false);
  //       const mintTx = await thisabled1155Storefront.connect(addr1).mintArtwork(tokenID, {value: printPrice});
  //       const mintResults = await mintTx.wait();
  //       expect(mintResults.events[1].args[0]).to.equal(tokenID);
  //       expect(await thisabled1155.balanceOf(addr1.address, tokenID)).to.equal(1);
  //     });
  //   });

  //   describe("Storefront price update", function() {
  //     it("Successfully add artwork to storefront and update price", async function() {
  //       const printCount = testNFTs[0].printCount;
  //       const printPrice = testNFTs[0].price;
  //       const artworkURI = testNFTs[0].tokenURI;
  //       const artAddTx = await thisabled1155Storefront.addArtworkToStorefront(artworkURI, printCount, printPrice, false);
  //       const artAddResults = await artAddTx.wait();
  //       const tokenID = artAddResults.events[1].args[0];
  //       expect(artAddResults.events[1].args[2]).to.equal(printPrice);
  //       expect(await thisabled1155Storefront.getPrice(tokenID)).to.equal(printPrice);

  //       const newPrice = printPrice + 100000;
  //       const priceUpdateTx = await thisabled1155Storefront.updatePrice(tokenID, newPrice);
  //       const priceUpdateResult = await priceUpdateTx.wait();
  //       expect(await thisabled1155Storefront.getPrice(tokenID)).to.equal(newPrice);
  //     });
  //   });

  //   describe("NFT burn artwork", function() {
  //     it("Mint and burn artwork", async function() {
  //       //Add to storefront
  //       const printCount = testNFTs[3].printCount;
  //       const printPrice = testNFTs[3].price;
  //       const artworkURI = testNFTs[3].tokenURI;
  //       const artAddTx = await thisabled1155Storefront.addArtworkToStorefront(artworkURI, printCount, printPrice, false);
  //       const artAddResults = await artAddTx.wait();
  //       const tokenID = artAddResults.events[1].args[0];

  //       //Mint
  //       const mintTx = await thisabled1155Storefront.connect(addr1).mintArtwork(tokenID, {value: printPrice});
  //       const mintResults = await mintTx.wait();
  //       expect(mintResults.events[1].args[0]).to.equal(tokenID);
  //       expect(await thisabled1155.balanceOf(addr1.address, tokenID)).to.equal(1);

  //       //Burn
  //       const maxPrints = await thisabled1155.getMaxPrints(tokenID);
  //       const burnTx = await thisabled1155.connect(addr1).burn(addr1.address, tokenID, 1);
  //       const burnResults = await burnTx.wait();
  //       expect(await thisabled1155.balanceOf(addr1.address, tokenID)).to.equal(0);
  //       expect(await thisabled1155.getMaxPrints(tokenID)).to.equal(maxPrints - 1);
  //     });
  //   });

  //   describe("NFT transfer", function() {
  //     it("Successfully mint and transfer an NFT", async function() {
  //       const printCount = testNFTs[1].printCount;
  //       const printPrice = testNFTs[1].price;
  //       const artworkURI = testNFTs[1].tokenURI;
  //       const artAddTx = await thisabled1155Storefront.addArtworkToStorefront(artworkURI, printCount, printPrice, false);
  //       const artAddResults = await artAddTx.wait();
  //       const tokenId = artAddResults.events[1].args[0];

  //       const mintTx = await thisabled1155Storefront.connect(addr1).mintArtwork(tokenId, {value: printPrice});
  //       const mintResults = await mintTx.wait();
  //       expect(mintResults.events[1].args[0]).to.equal(tokenId);
  //       expect(await thisabled1155.balanceOf(addr1.address, tokenId)).to.equal(1);
  //       expect(await thisabled1155.balanceOf(addr2.address, tokenId)).to.equal(0);

  //       const transferTx = await thisabled1155.connect(addr1).safeTransferFrom(addr1.address, addr2.address, tokenId, 1, []);
  //       const transferResult = await transferTx.wait();
  //       expect(transferResult.events[0].event).to.equal("TransferSingle");
  //       expect(await thisabled1155.balanceOf(addr1.address, tokenId)).to.equal(0);
  //       expect(await thisabled1155.balanceOf(addr2.address, tokenId)).to.equal(1);
  //     });
  //   });

  //   describe("Storefront accounting", function() {
  //     it("Successfully withdraw funds after mintings", async function() {
  //       let uriList = [];
  //       let printCountList = [];
  //       let priceList = [];
  //       let pausedList = [];
  //       for(let i = 0; i < testNFTs.length; i++){
  //         printCountList.push(parseInt(testNFTs[i].printCount));
  //         priceList.push(parseInt(testNFTs[i].price));
  //         uriList.push(testNFTs[i].tokenURI);
  //         pausedList.push(false);
  //       }
  //       const artAddTx = await thisabled1155Storefront.batchAddArtworkToStorefront(uriList, printCountList, priceList, pausedList);
  //       const artAddResults = await artAddTx.wait();
  //       let tokenIDs = [];
  //       let amounts = [];
  //       let amountCount = 1;
  //       let totalPrice = 0;
  //       for(result of artAddResults.events){
  //         if(result?.event == "ArtworkAddedToStorefront"){
  //           tokenIDs.push(result.args.tokenId);
  //           const batchPrice = ethers.BigNumber.from(result.args.price).mul(amountCount);
  //           totalPrice = ethers.BigNumber.from(totalPrice).add(batchPrice);
  //           amounts.push(amountCount);
  //           amountCount += 1;
  //         }
  //       }
  //       const batchMintTx = await thisabled1155Storefront.connect(addr1).batchMintArtwork(tokenIDs,  amounts, {value: totalPrice});
  //       const batchMintResults = await batchMintTx.wait();

  //       const storeBalance = await thisabled1155Storefront.getBalance();
  //       expect(storeBalance).to.equal(totalPrice);
  //       const currentOwnerBalance = await owner.getBalance();
  //       const withdrawTx = await thisabled1155Storefront.withdrawETH(storeBalance);
  //       const withdrawResult = await withdrawTx.wait();
  //       const gasUsed = ethers.utils.parseEther(ethers.utils.formatUnits(withdrawResult.gasUsed, "gwei"));
  //       const newStoreBalance = await thisabled1155Storefront.getBalance();
  //       const newOwnerBalance = await owner.getBalance();
  //       expect(Math.abs((newOwnerBalance - currentOwnerBalance) - (storeBalance - gasUsed))).to.lessThan(5000000);
  //       expect(await thisabled1155Storefront.getBalance()).to.equal(0);
  //     });
  //     it("Successfully withdraw funds to artist after mintings", async function() {
  //       let uriList = [];
  //       let printCountList = [];
  //       let priceList = [];
  //       let pausedList = [];
  //       for(let i = 0; i < testNFTs.length; i++){
  //         printCountList.push(parseInt(testNFTs[i].printCount));
  //         priceList.push(parseInt(testNFTs[i].price));
  //         uriList.push(testNFTs[i].tokenURI);
  //         pausedList.push(false);
  //       }
  //       const artAddTx = await thisabled1155Storefront.batchAddArtworkToStorefront(uriList, printCountList, priceList, pausedList);
  //       const artAddResults = await artAddTx.wait();
  //       let tokenIDs = [];
  //       let amounts = [];
  //       let amountCount = 1;
  //       let totalPrice = 0;
  //       for(result of artAddResults.events){
  //         if(result?.event == "ArtworkAddedToStorefront"){
  //           tokenIDs.push(result.args.tokenId);
  //           const batchPrice = ethers.BigNumber.from(result.args.price).mul(amountCount);
  //           totalPrice = ethers.BigNumber.from(totalPrice).add(batchPrice);
  //           amounts.push(amountCount);
  //           amountCount += 1;
  //         }
  //       }
  //       const batchMintTx = await thisabled1155Storefront.connect(addr1).batchMintArtwork(tokenIDs,  amounts, {value: totalPrice});
  //       const batchMintResults = await batchMintTx.wait();

  //       const storeBalance = await thisabled1155Storefront.getBalance();
  //       expect(storeBalance).to.equal(totalPrice);
  //       const currentArtistBalance = await addr2.getBalance();
  //       const withdrawTx = await thisabled1155Storefront.withdrawETHTo(addr2.address, storeBalance);
  //       const withdrawResult = await withdrawTx.wait();
  //       const newStoreBalance = await thisabled1155Storefront.getBalance();
  //       const newArtistBalance = await addr2.getBalance();
  //       expect(Math.abs((newArtistBalance - currentArtistBalance) - storeBalance)).to.lessThan(5000000);
  //       expect(await thisabled1155Storefront.getBalance()).to.equal(0);
  //     });
  //   });
})
