import test from "node:test";
import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("firstuserjohn", "(John1205675");
  const idToken = await service.getIdToken();
  console.log(loginResult);
  console.log(idToken);
}

testAuth();
