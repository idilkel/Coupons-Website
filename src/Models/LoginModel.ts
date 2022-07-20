export class LoginModel {
  public email?: string;
  public password?: string;
  public type?: string;

  public constructor(email?: string, password?: string, type?: string) {
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

// export class CredentialsModel {
//   public email?: string;
//   public password?: string;

//   public constructor(email?: string, password?: string) {
//     this.email = email;
//     this.password = password;
//   }
// }

//"token" must be the same name as the response on the backend: LoginResDto
export class UserModel {
  public token?: string;
  public email?: string;
  // public type?: string;

  public constructor(token?: string, email?: string) {
    this.token = token;
    this.email = email;
    // this.type = type;
  }
}
