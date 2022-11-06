import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  ChildMinted,
  ParentMinted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StorefrontPaused,
  StorefrontUnpaused,
  URIUpdated
} from "../generated/Storefront/Storefront"

export function createChildMintedEvent(
  childId: BigInt,
  parentId: BigInt,
  price: BigInt,
  owner: Address,
  contractAddress: Address
): ChildMinted {
  let childMintedEvent = changetype<ChildMinted>(newMockEvent())

  childMintedEvent.parameters = new Array()

  childMintedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  childMintedEvent.parameters.push(
    new ethereum.EventParam(
      "parentId",
      ethereum.Value.fromUnsignedBigInt(parentId)
    )
  )
  childMintedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  childMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  childMintedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )

  return childMintedEvent
}

export function createParentMintedEvent(
  childId: BigInt,
  price: BigInt,
  owner: Address,
  contractAddress: Address
): ParentMinted {
  let parentMintedEvent = changetype<ParentMinted>(newMockEvent())

  parentMintedEvent.parameters = new Array()

  parentMintedEvent.parameters.push(
    new ethereum.EventParam(
      "childId",
      ethereum.Value.fromUnsignedBigInt(childId)
    )
  )
  parentMintedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  parentMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  parentMintedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )

  return parentMintedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createStorefrontPausedEvent(): StorefrontPaused {
  let storefrontPausedEvent = changetype<StorefrontPaused>(newMockEvent())

  storefrontPausedEvent.parameters = new Array()

  return storefrontPausedEvent
}

export function createStorefrontUnpausedEvent(): StorefrontUnpaused {
  let storefrontUnpausedEvent = changetype<StorefrontUnpaused>(newMockEvent())

  storefrontUnpausedEvent.parameters = new Array()

  return storefrontUnpausedEvent
}

export function createURIUpdatedEvent(
  nftId: BigInt,
  contractAddress: Address,
  uri: string
): URIUpdated {
  let uriUpdatedEvent = changetype<URIUpdated>(newMockEvent())

  uriUpdatedEvent.parameters = new Array()

  uriUpdatedEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )
  uriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  uriUpdatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return uriUpdatedEvent
}
