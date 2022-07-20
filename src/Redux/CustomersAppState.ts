import { CustomerModel } from "../Models/Customer";
import globals from "../Services/Globals";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CustomersAppState {
  public customers: CustomerModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CustomersActionType {
  CustomersDownloaded = "CustomersDownloaded",
  CustomerAdded = "CustomerAdded",
  CustomerUpdated = "CustomerUpdated",
  CustomerDeleted = "CustomerDeleted",
  CustomersClear = "CustomersClear",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAction {
  type: CustomersActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customersDownloadedAction(
  customers: CustomerModel[]
): CustomerAction {
  console.log("step4 customers: " + customers);
  return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customerAddedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customerDeletedAction(id: number): CustomerAction {
  return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersClear(): CustomerAction {
  return { type: CustomersActionType.CustomerDeleted };
}

// Step 5 - Reducer function perform the required action
export function customersReducer(
  currentState: CustomersAppState = new CustomersAppState(),
  action: CustomerAction
): CustomersAppState {
  const newState = { ...currentState }; //Spread Operator

  switch (action.type) {
    case CustomersActionType.CustomersDownloaded:
      newState.customers = action.payload;
      console.log("downloaded...");
      console.log(newState.customers);
      console.log("payload: " + action.payload);
      break;
    case CustomersActionType.CustomerAdded:
      newState.customers.push(action.payload);
      break;
    case CustomersActionType.CustomerUpdated:
      const idx = newState.customers.findIndex(
        (t) => t.id === action.payload.id
      );
      newState.customers[idx] = action.payload;
      break;
    case CustomersActionType.CustomerDeleted:
      newState.customers = newState.customers.filter(
        (c) => c.id !== action.payload
      );
      break;

    case CustomersActionType.CustomersClear:
      newState.customers = [];
      break;
  }
  return newState;
}
