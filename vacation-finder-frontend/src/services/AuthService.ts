import { Amplify } from "aws-amplify";
import { AuthStack } from "../../../vacation-finder-model/outputs.json";
import { fetchAuthSession, signIn } from "@aws-amplify/auth";
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
  private user: SignInOutput | undefined;
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
      console.log();
      console.log(signInOutput);
      console.log();

      //after successful login call generateIdToken
      await this.generateIdToken();

      return this.user;
    } catch (error) {
      console.error(error);
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

  private async generateIdToken() {
    //populate private jwtToken field
    const session = await fetchAuthSession();
    this.jwtToken = session.tokens?.idToken?.toString();
    console.log("JWT Token: " + this.jwtToken);
  }

  public getIdToken() {
    return this.jwtToken;
  }

  public getUserName() {
    return this.userName;
  }
}
