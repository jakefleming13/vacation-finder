import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

//Stack that will contain the Dynamodb database
export class AuthStack extends Stack {
  private userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createUserPool();
    this.createUserPoolClient();
  }

  //use private methods to better organize our code
  private createUserPool() {
    this.userPool = new UserPool(this, "VacationUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    //we need the user pool id when we want to connect to it
    new CfnOutput(this, "VacationUserPoolId", {
      value: this.userPool.userPoolId,
    });
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient("VacationUserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });

    //Output the userPoolClient id
    new CfnOutput(this, "VacationUserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }
}
