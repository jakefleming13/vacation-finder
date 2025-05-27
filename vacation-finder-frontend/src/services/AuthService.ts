import { Amplify } from "aws-amplify";
import { AuthStack } from "../../../vacation-finder-model/outputs.json";
import { type SignInOutput, signIn } from "@aws-amplify/auth";

//hard code our aws region
//const awsRegion = "us-east-2";

//AMplify configuration
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: AuthStack.VacationUserPoolId,
      userPoolClientId: AuthStack.VacationUserPoolClientId,
      identityPoolId: AuthStack.VacationIdentityPoolId,
    },
  },
});

export class AuthService {
  private user: SignInOutput | undefined;
  private userName: string = "";

  public async login(
    userName: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      //use amplify's sign in method
      const signInOutput: SignInOutput = await signIn({
        username: userName,
        password: password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      this.user = signInOutput;
      this.userName = userName;
      return this.user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public getUserName() {
    return this.userName;
  }
}
