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
})
