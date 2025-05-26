import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
//This file will house our code that is related to Amplify

const awsRegion = "us-east-2";

//This ideally should to automatically extrated from our deployment
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_hRQRcPRUw",
      userPoolClientId: "4paksj1b9d7u3c4ql3ihjj5ki",
      identityPoolId: "us-east-2:f129b1ec-6d60-4441-a5ac-bcc372376d8e",
    },
  },
});

export class AuthService {
  //this method prepares the way for us to generate tokens
  public async login(userName: string, password: string) {
    const signInOutput: SignInOutput = await signIn({
      username: userName,
      password: password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    return signInOutput;
  }

  //In order to get tokens we need to call fetchAuthSession
  //only call after login
  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }

  //method that will generate temp credentials
  public async generateTempCredentials() {
    //first get a token
    const idToken = await this.getIdToken();

    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-2_hRQRcPRUw`;

    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "us-east-2:f129b1ec-6d60-4441-a5ac-bcc372376d8e",
        logins: {
          [cognitoIdentityPool]: idToken,
        },
      }),
    });

    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
