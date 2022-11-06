// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ChildMinted extends ethereum.Event {
  get params(): ChildMinted__Params {
    return new ChildMinted__Params(this);
  }
}

export class ChildMinted__Params {
  _event: ChildMinted;

  constructor(event: ChildMinted) {
    this._event = event;
  }

  get childId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get parentId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class ParentMinted extends ethereum.Event {
  get params(): ParentMinted__Params {
    return new ParentMinted__Params(this);
  }
}

export class ParentMinted__Params {
  _event: ParentMinted;

  constructor(event: ParentMinted) {
    this._event = event;
  }

  get childId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class StorefrontPaused extends ethereum.Event {
  get params(): StorefrontPaused__Params {
    return new StorefrontPaused__Params(this);
  }
}

export class StorefrontPaused__Params {
  _event: StorefrontPaused;

  constructor(event: StorefrontPaused) {
    this._event = event;
  }
}

export class StorefrontUnpaused extends ethereum.Event {
  get params(): StorefrontUnpaused__Params {
    return new StorefrontUnpaused__Params(this);
  }
}

export class StorefrontUnpaused__Params {
  _event: StorefrontUnpaused;

  constructor(event: StorefrontUnpaused) {
    this._event = event;
  }
}

export class Storefront extends ethereum.SmartContract {
  static bind(address: Address): Storefront {
    return new Storefront("Storefront", address);
  }

  ACCOUNTANT_ROLE(): Bytes {
    let result = super.call(
      "ACCOUNTANT_ROLE",
      "ACCOUNTANT_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_ACCOUNTANT_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "ACCOUNTANT_ROLE",
      "ACCOUNTANT_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  CURATOR_ROLE(): Bytes {
    let result = super.call("CURATOR_ROLE", "CURATOR_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_CURATOR_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("CURATOR_ROLE", "CURATOR_ROLE():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  checkSalePaused(): boolean {
    let result = super.call("checkSalePaused", "checkSalePaused():(bool)", []);

    return result[0].toBoolean();
  }

  try_checkSalePaused(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkSalePaused",
      "checkSalePaused():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  child1Address(): Address {
    let result = super.call("child1Address", "child1Address():(address)", []);

    return result[0].toAddress();
  }

  try_child1Address(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "child1Address",
      "child1Address():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  child2Address(): Address {
    let result = super.call("child2Address", "child2Address():(address)", []);

    return result[0].toAddress();
  }

  try_child2Address(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "child2Address",
      "child2Address():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  counterParent(): BigInt {
    let result = super.call("counterParent", "counterParent():(uint256)", []);

    return result[0].toBigInt();
  }

  try_counterParent(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "counterParent",
      "counterParent():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBalance(): BigInt {
    let result = super.call("getBalance", "getBalance():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getBalance", "getBalance():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPrice(): BigInt {
    let result = super.call("getPrice", "getPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPrice", "getPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  maxParentCount(): BigInt {
    let result = super.call("maxParentCount", "maxParentCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxParentCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "maxParentCount",
      "maxParentCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  parentAddress(): Address {
    let result = super.call("parentAddress", "parentAddress():(address)", []);

    return result[0].toAddress();
  }

  try_parentAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "parentAddress",
      "parentAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _parent(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _child1(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _child2(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class MintChild1Call extends ethereum.Call {
  get inputs(): MintChild1Call__Inputs {
    return new MintChild1Call__Inputs(this);
  }

  get outputs(): MintChild1Call__Outputs {
    return new MintChild1Call__Outputs(this);
  }
}

export class MintChild1Call__Inputs {
  _call: MintChild1Call;

  constructor(call: MintChild1Call) {
    this._call = call;
  }

  get parentId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class MintChild1Call__Outputs {
  _call: MintChild1Call;

  constructor(call: MintChild1Call) {
    this._call = call;
  }
}

export class MintChild2Call extends ethereum.Call {
  get inputs(): MintChild2Call__Inputs {
    return new MintChild2Call__Inputs(this);
  }

  get outputs(): MintChild2Call__Outputs {
    return new MintChild2Call__Outputs(this);
  }
}

export class MintChild2Call__Inputs {
  _call: MintChild2Call;

  constructor(call: MintChild2Call) {
    this._call = call;
  }

  get parentId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class MintChild2Call__Outputs {
  _call: MintChild2Call;

  constructor(call: MintChild2Call) {
    this._call = call;
  }
}

export class MintParentCall extends ethereum.Call {
  get inputs(): MintParentCall__Inputs {
    return new MintParentCall__Inputs(this);
  }

  get outputs(): MintParentCall__Outputs {
    return new MintParentCall__Outputs(this);
  }
}

export class MintParentCall__Inputs {
  _call: MintParentCall;

  constructor(call: MintParentCall) {
    this._call = call;
  }
}

export class MintParentCall__Outputs {
  _call: MintParentCall;

  constructor(call: MintParentCall) {
    this._call = call;
  }
}

export class PauseSaleCall extends ethereum.Call {
  get inputs(): PauseSaleCall__Inputs {
    return new PauseSaleCall__Inputs(this);
  }

  get outputs(): PauseSaleCall__Outputs {
    return new PauseSaleCall__Outputs(this);
  }
}

export class PauseSaleCall__Inputs {
  _call: PauseSaleCall;

  constructor(call: PauseSaleCall) {
    this._call = call;
  }
}

export class PauseSaleCall__Outputs {
  _call: PauseSaleCall;

  constructor(call: PauseSaleCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class UnpauseSaleCall extends ethereum.Call {
  get inputs(): UnpauseSaleCall__Inputs {
    return new UnpauseSaleCall__Inputs(this);
  }

  get outputs(): UnpauseSaleCall__Outputs {
    return new UnpauseSaleCall__Outputs(this);
  }
}

export class UnpauseSaleCall__Inputs {
  _call: UnpauseSaleCall;

  constructor(call: UnpauseSaleCall) {
    this._call = call;
  }
}

export class UnpauseSaleCall__Outputs {
  _call: UnpauseSaleCall;

  constructor(call: UnpauseSaleCall) {
    this._call = call;
  }
}

export class UpdateChild1URICall extends ethereum.Call {
  get inputs(): UpdateChild1URICall__Inputs {
    return new UpdateChild1URICall__Inputs(this);
  }

  get outputs(): UpdateChild1URICall__Outputs {
    return new UpdateChild1URICall__Outputs(this);
  }
}

export class UpdateChild1URICall__Inputs {
  _call: UpdateChild1URICall;

  constructor(call: UpdateChild1URICall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateChild1URICall__Outputs {
  _call: UpdateChild1URICall;

  constructor(call: UpdateChild1URICall) {
    this._call = call;
  }
}

export class UpdateChild2URICall extends ethereum.Call {
  get inputs(): UpdateChild2URICall__Inputs {
    return new UpdateChild2URICall__Inputs(this);
  }

  get outputs(): UpdateChild2URICall__Outputs {
    return new UpdateChild2URICall__Outputs(this);
  }
}

export class UpdateChild2URICall__Inputs {
  _call: UpdateChild2URICall;

  constructor(call: UpdateChild2URICall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateChild2URICall__Outputs {
  _call: UpdateChild2URICall;

  constructor(call: UpdateChild2URICall) {
    this._call = call;
  }
}

export class UpdateParentURICall extends ethereum.Call {
  get inputs(): UpdateParentURICall__Inputs {
    return new UpdateParentURICall__Inputs(this);
  }

  get outputs(): UpdateParentURICall__Outputs {
    return new UpdateParentURICall__Outputs(this);
  }
}

export class UpdateParentURICall__Inputs {
  _call: UpdateParentURICall;

  constructor(call: UpdateParentURICall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateParentURICall__Outputs {
  _call: UpdateParentURICall;

  constructor(call: UpdateParentURICall) {
    this._call = call;
  }
}

export class UpdatePriceCall extends ethereum.Call {
  get inputs(): UpdatePriceCall__Inputs {
    return new UpdatePriceCall__Inputs(this);
  }

  get outputs(): UpdatePriceCall__Outputs {
    return new UpdatePriceCall__Outputs(this);
  }
}

export class UpdatePriceCall__Inputs {
  _call: UpdatePriceCall;

  constructor(call: UpdatePriceCall) {
    this._call = call;
  }

  get newPrice(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePriceCall__Outputs {
  _call: UpdatePriceCall;

  constructor(call: UpdatePriceCall) {
    this._call = call;
  }
}

export class WithdrawETHCall extends ethereum.Call {
  get inputs(): WithdrawETHCall__Inputs {
    return new WithdrawETHCall__Inputs(this);
  }

  get outputs(): WithdrawETHCall__Outputs {
    return new WithdrawETHCall__Outputs(this);
  }
}

export class WithdrawETHCall__Inputs {
  _call: WithdrawETHCall;

  constructor(call: WithdrawETHCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawETHCall__Outputs {
  _call: WithdrawETHCall;

  constructor(call: WithdrawETHCall) {
    this._call = call;
  }
}

export class WithdrawETHToCall extends ethereum.Call {
  get inputs(): WithdrawETHToCall__Inputs {
    return new WithdrawETHToCall__Inputs(this);
  }

  get outputs(): WithdrawETHToCall__Outputs {
    return new WithdrawETHToCall__Outputs(this);
  }
}

export class WithdrawETHToCall__Inputs {
  _call: WithdrawETHToCall;

  constructor(call: WithdrawETHToCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawETHToCall__Outputs {
  _call: WithdrawETHToCall;

  constructor(call: WithdrawETHToCall) {
    this._call = call;
  }
}
