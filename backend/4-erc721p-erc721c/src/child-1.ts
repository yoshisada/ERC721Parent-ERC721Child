import {
  Child1Approval as Child1ApprovalEvent,
  Child1ApprovalForAll as Child1ApprovalForAllEvent,
  Child1RoleAdminChanged as Child1RoleAdminChangedEvent,
  Child1RoleGranted as Child1RoleGrantedEvent,
  Child1RoleRevoked as Child1RoleRevokedEvent,
  Child1Transfer as Child1TransferEvent
} from "../generated/Child1/Child1"
import {
  Child1Approval,
  Child1ApprovalForAll,
  Child1RoleAdminChanged,
  Child1RoleGranted,
  Child1RoleRevoked,
  Child1Transfer
} from "../generated/schema"

export function handleChild1Approval(event: Child1ApprovalEvent): void {
  let entity = new Child1Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleChild1ApprovalForAll(
  event: Child1ApprovalForAllEvent
): void {
  let entity = new Child1ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleChild1RoleAdminChanged(
  event: Child1RoleAdminChangedEvent
): void {
  let entity = new Child1RoleAdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole
  entity.save()
}

export function handleChild1RoleGranted(event: Child1RoleGrantedEvent): void {
  let entity = new Child1RoleGranted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleChild1RoleRevoked(event: Child1RoleRevokedEvent): void {
  let entity = new Child1RoleRevoked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleChild1Transfer(event: Child1TransferEvent): void {
  let entity = new Child1Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
