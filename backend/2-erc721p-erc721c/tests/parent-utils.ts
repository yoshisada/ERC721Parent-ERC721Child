import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ParentApproval,
  ParentApprovalForAll,
  ParentChildAdded,
  ParentChildBurned,
  ParentChildTransfer,
  ParentRoleAdminChanged,
  ParentRoleGranted,
  ParentRoleRevoked,
  ParentTransfer
} from "../generated/Parent/Parent"

export function createParentApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): ParentApproval {
  let parentApprovalEvent = changetype<ParentApproval>(newMockEvent())

  parentApprovalEvent.parameters = new Array()

  parentApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  parentApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  parentApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return parentApprovalEvent
}

export function createParentApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ParentApprovalForAll {
  let parentApprovalForAllEvent = changetype<ParentApprovalForAll>(
    newMockEvent()
  )

  parentApprovalForAllEvent.parameters = new Array()

  parentApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  parentApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  parentApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return parentApprovalForAllEvent
}

export function createParentChildAddedEvent(
  childContract: Address,
  childId: BigInt,
  parentId: BigInt
): ParentChildAdded {
  let parentChildAddedEvent = changetype<ParentChildAdded>(newMockEvent())

  parentChildAddedEvent.parameters = new Array()

  parentChildAddedEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  parentChildAddedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  parentChildAddedEvent.parameters.push(
    new ethereum.EventParam(
      "parentId",
      ethereum.Value.fromUnsignedBigInt(parentId)
    )
  )

  return parentChildAddedEvent
}

export function createParentChildBurnedEvent(
  childContract: Address,
  childId: BigInt
): ParentChildBurned {
  let parentChildBurnedEvent = changetype<ParentChildBurned>(newMockEvent())

  parentChildBurnedEvent.parameters = new Array()

  parentChildBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  parentChildBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )

  return parentChildBurnedEvent
}

export function createParentChildTransferEvent(
  childContract: Address,
  childId: BigInt,
  newHolder: Address
): ParentChildTransfer {
  let parentChildTransferEvent = changetype<ParentChildTransfer>(newMockEvent())

  parentChildTransferEvent.parameters = new Array()

  parentChildTransferEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  parentChildTransferEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  parentChildTransferEvent.parameters.push(
    new ethereum.EventParam("newHolder", ethereum.Value.fromAddress(newHolder))
  )

  return parentChildTransferEvent
}

export function createParentRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): ParentRoleAdminChanged {
  let parentRoleAdminChangedEvent = changetype<ParentRoleAdminChanged>(
    newMockEvent()
  )

  parentRoleAdminChangedEvent.parameters = new Array()

  parentRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  parentRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  parentRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return parentRoleAdminChangedEvent
}

export function createParentRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): ParentRoleGranted {
  let parentRoleGrantedEvent = changetype<ParentRoleGranted>(newMockEvent())

  parentRoleGrantedEvent.parameters = new Array()

  parentRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  parentRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  parentRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return parentRoleGrantedEvent
}

export function createParentRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): ParentRoleRevoked {
  let parentRoleRevokedEvent = changetype<ParentRoleRevoked>(newMockEvent())

  parentRoleRevokedEvent.parameters = new Array()

  parentRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  parentRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  parentRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return parentRoleRevokedEvent
}

export function createParentTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): ParentTransfer {
  let parentTransferEvent = changetype<ParentTransfer>(newMockEvent())

  parentTransferEvent.parameters = new Array()

  parentTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  parentTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  parentTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return parentTransferEvent
}
