class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    coupons: "http://localhost:8080/api",
  };
  //   public urls = [
  //     { administrator: "http://localhost:8080/api/admin" },
  //     { companies: "http://localhost:8080/api/companies" },
  //     { customers: "http://localhost:8080/api/customers" },
  //     { logins: "http://localhost:8080/api/login" },
  //   ];
}

class ProductionGlobals extends Globals {
  public urls = {
    coupons: "www.aws.com/website/coupons-system",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
