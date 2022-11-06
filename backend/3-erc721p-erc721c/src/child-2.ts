import {
  Child2Approval as Child2ApprovalEvent,
  Child2ApprovalForAll as Child2ApprovalForAllEvent,
  Child2RoleAdminChanged as Child2RoleAdminChangedEvent,
  Child2RoleGranted as Child2RoleGrantedEvent,
  Child2RoleRevoked as Child2RoleRevokedEvent,
  Child2Transfer as Child2TransferEvent
} from "../generated/Child2/Child2"
import {
  Child2Approval,
  Child2ApprovalForAll,
  Child2RoleAdminChanged,
  Child2RoleGranted,
  Child2RoleRevoked,
  Child2Transfer
} from "../generated/schema"

export function handleChild2Approval(event: Child2ApprovalEvent): void {
  let entity = new Child2Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleChild2ApprovalForAll(
  event: Child2ApprovalForAllEvent
): void {
  let entity = new Child2ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleChild2RoleAdminChanged(
  event: Child2RoleAdminChangedEvent
): void {
  let entity = new Child2RoleAdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole
  entity.save()
}

export function handleChild2RoleGranted(event: Child2RoleGrantedEvent): void {
  let entity = new Child2RoleGranted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleChild2RoleRevoked(event: Child2RoleRevokedEvent): void {
  let entity = new Child2RoleRevoked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleChild2Transfer(event: Child2TransferEvent): void {
  let entity = new Child2Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
