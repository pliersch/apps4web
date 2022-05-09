export class User {
  constructor(
    public id: string,
    public title: string,
    public givenName: string,
    public lastName: string,
    public email: string,
    public role: string,
  ) {}
}
