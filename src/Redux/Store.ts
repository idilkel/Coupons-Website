import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { customersReducer } from "./CustomersAppState";
import { couponsReducer } from "./CouponsAppState";

const reducers = combineReducers({
  authReducer: authReducer,
  companiesReducer: companiesReducer,
  customersReducer: customersReducer,
  couponsReducer: couponsReducer,
});
const store = createStore(reducers);

export default store;
