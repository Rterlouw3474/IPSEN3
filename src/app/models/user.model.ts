export class User {
  constructor(
    public email: string,
    public username: string,
    public profileImage: string,
    private accessProvider: string,
  ) { }
}
