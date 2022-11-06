import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ChildMinted } from "../generated/schema"
import { ChildMinted as ChildMintedEvent } from "../generated/Storefront/Storefront"
import { handleChildMinted } from "../src/storefront"
import { createChildMintedEvent } from "./storefront-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let childId = BigInt.fromI32(234)
    let parentId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newChildMintedEvent = createChildMintedEvent(
      childId,
      parentId,
      price,
      owner
    )
    handleChildMinted(newChildMintedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChildMinted created and stored", () => {
    assert.entityCount("ChildMinted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChildMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "childId",
      "234"
    )
    assert.fieldEquals(
      "ChildMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "parentId",
      "234"
    )
    assert.fieldEquals(
      "ChildMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ChildMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
