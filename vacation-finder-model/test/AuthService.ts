import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
//This file will house our code that is related to Amplify

const awsRegion = "us-east-2";

//This ideally should to automatically extrated from our deployment
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_hRQRcPRUw",
      userPoolClientId: "4paksj1b9d7u3c4ql3ihjj5ki",
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
    return authSession.tokens?.idToken?.toString;
  }
}
