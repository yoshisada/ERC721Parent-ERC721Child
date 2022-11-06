import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Child2Approval,
  Child2ApprovalForAll,
  Child2RoleAdminChanged,
  Child2RoleGranted,
  Child2RoleRevoked,
  Child2Transfer
} from "../generated/Child2/Child2"

export function createChild2ApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Child2Approval {
  let child2ApprovalEvent = changetype<Child2Approval>(newMockEvent())

  child2ApprovalEvent.parameters = new Array()

  child2ApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  child2ApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  child2ApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return child2ApprovalEvent
}

export function createChild2ApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): Child2ApprovalForAll {
  let child2ApprovalForAllEvent = changetype<Child2ApprovalForAll>(
    newMockEvent()
  )

  child2ApprovalForAllEvent.parameters = new Array()

  child2ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  child2ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  child2ApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return child2ApprovalForAllEvent
}

export function createChild2RoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): Child2RoleAdminChanged {
  let child2RoleAdminChangedEvent = changetype<Child2RoleAdminChanged>(
    newMockEvent()
  )

  child2RoleAdminChangedEvent.parameters = new Array()

  child2RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child2RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  child2RoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return child2RoleAdminChangedEvent
}

export function createChild2RoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): Child2RoleGranted {
  let child2RoleGrantedEvent = changetype<Child2RoleGranted>(newMockEvent())

  child2RoleGrantedEvent.parameters = new Array()

  child2RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child2RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  child2RoleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return child2RoleGrantedEvent
}

export function createChild2RoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): Child2RoleRevoked {
  let child2RoleRevokedEvent = changetype<Child2RoleRevoked>(newMockEvent())

  child2RoleRevokedEvent.parameters = new Array()

  child2RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  child2RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  child2RoleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return child2RoleRevokedEvent
}

export function createChild2TransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Child2Transfer {
  let child2TransferEvent = changetype<Child2Transfer>(newMockEvent())

  child2TransferEvent.parameters = new Array()

  child2TransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  child2TransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  child2TransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return child2TransferEvent
}
