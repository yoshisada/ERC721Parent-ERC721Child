import {
  ChildMinted as ChildMintedEvent,
  ParentMinted as ParentMintedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  StorefrontPaused as StorefrontPausedEvent,
  StorefrontUnpaused as StorefrontUnpausedEvent
} from "../generated/Storefront/Storefront"
import {
  ChildMinted,
  ParentMinted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StorefrontPaused,
  StorefrontUnpaused
} from "../generated/schema"

export function handleChildMinted(event: ChildMintedEvent): void {
  let entity = new ChildMinted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.id = event.params.id.toString()
  entity.parentId = event.params.parentId
  entity.price = event.params.price
  entity.owner = event.params.owner
  entity.save()
}

export function handleParentMinted(event: ParentMintedEvent): void {
  let entity = new ParentMinted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.id = event.params.id.toString()
  entity.price = event.params.price
  entity.owner = event.params.owner
  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole
  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleStorefrontPaused(event: StorefrontPausedEvent): void {
  let entity = new StorefrontPaused(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}

export function handleStorefrontUnpaused(event: StorefrontUnpausedEvent): void {
  let entity = new StorefrontUnpaused(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}
