import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ChildAdded as ChildAddedEvent,
  ChildBurned as ChildBurnedEvent,
  ChildTransfer as ChildTransferEvent,
  ParentRoleAdminChanged as ParentRoleAdminChangedEvent,
  ParentRoleGranted as ParentRoleGrantedEvent,
  ParentRoleRevoked as ParentRoleRevokedEvent,
  Transfer as TransferEvent
} from "../generated/Parent/Parent"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleChildAdded(event: ChildAddedEvent): void {
  let entity = new ChildAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.childContract = event.params.childContract
  entity.childId = event.params.childId
  entity.parentId = event.params.parentId
  entity.save()
}

export function handleChildBurned(event: ChildBurnedEvent): void {
  let entity = new ChildBurned(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.childContract = event.params.childContract
  entity.childId = event.params.childId
  entity.save()
}

export function handleChildTransfer(event: ChildTransferEvent): void {
  let entity = new ChildTransfer(
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

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
