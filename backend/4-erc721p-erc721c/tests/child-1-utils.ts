import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Child1Approval,
  Child1ApprovalForAll,
  Child1RoleAdminChanged,
  Child1RoleGranted,
  Child1RoleRevoked,
  Child1Transfer
} from "../generated/Child1/Child1"

export function createChild1ApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Child1Approval {
  let child1ApprovalEvent = changetype<Child1Approval>(newMockEvent())

  child1ApprovalEvent.parameters = new Array()

  child1ApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  child1ApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  child1ApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return child1ApprovalEvent
}

export function createChild1ApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): Child1ApprovalForAll {
  let child1ApprovalForAllEvent = changetype<Child1ApprovalForAll>(
    newMockEvent()
  )

  child1ApprovalForAllEvent.parameters = new Array()

  child1ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  child1ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  child1ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return child1ApprovalForAllEvent
}

export function createChild1RoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): Child1RoleAdminChanged {
  let child1RoleAdminChangedEvent = changetype<Child1RoleAdminChanged>(
    newMockEvent()
  )

  child1RoleAdminChangedEvent.parameters = new Array()

  child1RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child1RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  child1RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return child1RoleAdminChangedEvent
}

export function createChild1RoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): Child1RoleGranted {
  let child1RoleGrantedEvent = changetype<Child1RoleGranted>(newMockEvent())

  child1RoleGrantedEvent.parameters = new Array()

  child1RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child1RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  child1RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return child1RoleGrantedEvent
}

export function createChild1RoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): Child1RoleRevoked {
  let child1RoleRevokedEvent = changetype<Child1RoleRevoked>(newMockEvent())

  child1RoleRevokedEvent.parameters = new Array()

  child1RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child1RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  child1RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return child1RoleRevokedEvent
}

export function createChild1TransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Child1Transfer {
  let child1TransferEvent = changetype<Child1Transfer>(newMockEvent())

  child1TransferEvent.parameters = new Array()

  child1TransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  child1TransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  child1TransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return child1TransferEvent
}
