import { Amplify } from "aws-amplify";
import { AuthStack } from "../../../vacation-finder-model/outputs.json";
import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  type AuthUser,
} from "@aws-amplify/auth";
import { type SignInOutput } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

//hard code our aws region
const awsRegion = "us-east-2";

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
  private user: SignInOutput | AuthUser | undefined;
  private userName: string = "";

  //generate temp credentials to take a file from local machine to s3 using the web browser
  public jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;

  public isAuthorized() {
    if (this.user) {
      return true;
    }
    return false;
  }

  //only call after login
  private async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }

  public async login(
    userName: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      //check to see if user is logged in or not
      const user = await this.getCurrentUser();
      if (user) {
        this.user = user;
      } else {
        //use amplify's sign in method
        const signInOutput: SignInOutput = await signIn({
          username: userName,
          password: password,
          options: {
            authFlowType: "USER_PASSWORD_AUTH",
          },
        });
        this.user = signInOutput;
      }

      this.userName = userName;
      this.jwtToken = await this.getIdToken();

      //after successful login call generateIdToken
      //await this.generateIdToken();

      console.log(this.jwtToken);
      return this.user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async getCurrentUser() {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return undefined;
    }
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTempCredentials();
    return this.temporaryCredentials;
  }

  private async generateTempCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.VacationUserPoolId}`;
    //const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-2_hRQRcPRUw`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: awsRegion,
        },
        identityPoolId: AuthStack.VacationIdentityPoolId,
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });

    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }

  public getUserName() {
    return this.userName;
  }

  public async logout(): Promise<void> {
    try {
      await signOut();
      this.user = undefined;
      this.jwtToken = undefined;
      this.temporaryCredentials = undefined;
      this.userName = "";
      console.log("User successfully signed out.");
      const user = await this.getCurrentUser();
      console.log(user);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }
}
