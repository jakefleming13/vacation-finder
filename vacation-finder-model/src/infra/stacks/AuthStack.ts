import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from "aws-cdk-lib/aws-cognito";
import { CfnUserGroup } from "aws-cdk-lib/aws-elasticache";
import { Construct } from "constructs";

//Stack that will contain the Dynamodb database
export class AuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminGroup();
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

  //simply create a group of users for access control through the cdk
  private createAdminGroup() {
    //one way to test a created group is to look at the APIGatewayProxyEvent in your lamba function
    //it will contain the cognito groups that your user is in

    //This is how you would create a user pool ground using cfn construct
    new CfnUserPoolGroup(this, "VacationsAdmins", {
      userPoolId: this.userPool.userPoolId,
      groupName: "admins",
    });
  }
}
