class Globals {}

class DevelopmentGlobals extends Globals {
  // public urls = {
  //   coupons: "http://localhost:8080/api/",
  // };
  public urls = {
    administrator: "http://localhost:8080/api/admin",
    companies: "http://localhost:8080/api/companies",
    customers: "http://localhost:8080/api/customers",
    login: "http://localhost:8080/api/login",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    administrator: "www.aws.com/website/admin",
    companies: "www.aws.com/website/companies",
    customers: "www.aws.com/website/customers",
    login: "www.aws.com/website/login",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
