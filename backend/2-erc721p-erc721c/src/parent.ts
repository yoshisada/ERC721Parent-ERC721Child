import {
  ParentApproval as ParentApprovalEvent,
  ParentApprovalForAll as ParentApprovalForAllEvent,
  ParentChildAdded as ParentChildAddedEvent,
  ParentChildBurned as ParentChildBurnedEvent,
  ParentChildTransfer as ParentChildTransferEvent,
  ParentRoleAdminChanged as ParentRoleAdminChangedEvent,
  ParentRoleGranted as ParentRoleGrantedEvent,
  ParentRoleRevoked as ParentRoleRevokedEvent,
  ParentTransfer as ParentTransferEvent
} from "../generated/Parent/Parent"
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
} from "../generated/schema"

export function handleParentApproval(event: ParentApprovalEvent): void {
  let entity = new ParentApproval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleParentApprovalForAll(
  event: ParentApprovalForAllEvent
): void {
  let entity = new ParentApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleParentChildAdded(event: ParentChildAddedEvent): void {
  let entity = new ParentChildAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.childContract = event.params.childContract
  entity.childId = event.params.childId
  entity.parentId = event.params.parentId
  entity.save()
}

export function handleParentChildBurned(event: ParentChildBurnedEvent): void {
  let entity = new ParentChildBurned(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.childContract = event.params.childContract
  entity.childId = event.params.childId
  entity.save()
}

export function handleParentChildTransfer(
  event: ParentChildTransferEvent
): void {
  let entity = new ParentChildTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.childContract = event.params.childContract
  entity.childId = event.params.childId
  entity.newHolder = event.params.newHolder
  entity.save()
}

export function handleParentRoleAdminChanged(
  event: ParentRoleAdminChangedEvent
): void {
  let entity = new ParentRoleAdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole
  entity.save()
}

export function handleParentRoleGranted(event: ParentRoleGrantedEvent): void {
  let entity = new ParentRoleGranted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleParentRoleRevoked(event: ParentRoleRevokedEvent): void {
  let entity = new ParentRoleRevoked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleParentTransfer(event: ParentTransferEvent): void {
  let entity = new ParentTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
