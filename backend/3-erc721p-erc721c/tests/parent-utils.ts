import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ChildAdded,
  ChildBurned,
  ChildTransfer,
  ParentRoleAdminChanged,
  ParentRoleGranted,
  ParentRoleRevoked,
  Transfer
} from "../generated/Parent/Parent"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createChildAddedEvent(
  childContract: Address,
  childId: BigInt,
  parentId: BigInt
): ChildAdded {
  let childAddedEvent = changetype<ChildAdded>(newMockEvent())

  childAddedEvent.parameters = new Array()

  childAddedEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  childAddedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  childAddedEvent.parameters.push(
    new ethereum.EventParam(
      "parentId",
      ethereum.Value.fromUnsignedBigInt(parentId)
    )
  )

  return childAddedEvent
}

export function createChildBurnedEvent(
  childContract: Address,
  childId: BigInt
): ChildBurned {
  let childBurnedEvent = changetype<ChildBurned>(newMockEvent())

  childBurnedEvent.parameters = new Array()

  childBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  childBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )

  return childBurnedEvent
}

export function createChildTransferEvent(
  childContract: Address,
  childId: BigInt,
  newHolder: Address
): ChildTransfer {
  let childTransferEvent = changetype<ChildTransfer>(newMockEvent())

  childTransferEvent.parameters = new Array()

  childTransferEvent.parameters.push(
    new ethereum.EventParam(
      "childContract",
      ethereum.Value.fromAddress(childContract)
    )
  )
  childTransferEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  childTransferEvent.parameters.push(
    new ethereum.EventParam("newHolder", ethereum.Value.fromAddress(newHolder))
  )

  return childTransferEvent
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

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
