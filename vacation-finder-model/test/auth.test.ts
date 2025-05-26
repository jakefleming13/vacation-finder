import test from "node:test";
import { AuthService } from "./AuthService";

//function to get a new token after each deploy
async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("firstuserjohn", "(John1205675");
  const idToken = await service.getIdToken();
  console.log(idToken);
  console.log();

  const credentials = await service.generateTempCredentials();
  console.log(credentials);
}

testAuth();
