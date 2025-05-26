import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  vacationsLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "VacationsApi");

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "VacationsAPIAuthorizer",
      {
        cognitoUserPools: [props.userPool], //reference our userpool
        identitySource: "method.request.header.Authorization", //location of the authorization header
      }
    );

    authorizer._attachToApi(api); //need to attach the authorizer to our api
    //authorizer must be passed to each of our http methods

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    };

    const vacationResource = api.root.addResource("vacations");

    //Link to lambda that we created
    vacationResource.addMethod(
      "GET",
      props.vacationsLambdaIntegration,
      optionsWithAuth
    );
    vacationResource.addMethod(
      "POST",
      props.vacationsLambdaIntegration,
      optionsWithAuth
    );
    vacationResource.addMethod(
      "PUT",
      props.vacationsLambdaIntegration,
      optionsWithAuth
    );
    vacationResource.addMethod(
      "DELETE",
      props.vacationsLambdaIntegration,
      optionsWithAuth
    );
  }
}
