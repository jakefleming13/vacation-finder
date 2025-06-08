import { Amplify } from "aws-amplify";
import { AuthStack } from "../../../vacation-finder-model/outputs.json";
import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  type AuthUser,
} from "@aws-amplify/auth";
import { type SignInOutput, type SignUpOutput } from "@aws-amplify/auth";
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

  public async signUpAndSignIn(
    username: string,
    email: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      const signUpOutput: SignUpOutput = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          // To achieve "immediately logged in after account creation" without confirmation,
          // your Cognito User Pool MUST be configured for:
          // 1. Email/phone verification: "No verification" or "Auto-verify"
          // 2. User account status: "Auto-confirm new users" (often found under General settings -> Account recovery -> Self-service signup)
          // If not configured this way, the nextStep will be 'CONFIRM_SIGN_UP'
          // and the subsequent login will fail until confirmed.
        },
      });

      console.log("SignUp output:", signUpOutput);

      // Attempt to sign in immediately after signup.
      // This assumes the user pool is configured for auto-confirmation.
      // If confirmation is still required, this login will likely fail.
      return await this.login(username, password);
    } catch (error: any) {
      console.error("Error during signup or auto-login:", error);
      // Amplify errors often have a .name and .message property
      throw new Error(error.message || "An unknown signup error occurred.");
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
