export class DataService {
  public async createSpace(name: string, location: string, photo?: File) {
    return "123" + name + location;
  }

  public isAuthorized() {
    return true;
  }
}
