import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { customersReducer } from "./CustomersAppState";
import { couponsReducer } from "./CouponsAppState";
// import { customerCouponsReducer } from "./CustomerCouponsAppState";

const reducers = combineReducers({
  authReducer: authReducer,
  companiesReducer: companiesReducer,
  customersReducer: customersReducer,
  couponsReducer: couponsReducer,
  // customerCouponsReducer: customerCouponsReducer,
});
const store = createStore(reducers);

export default store;
