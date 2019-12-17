export class User {
  constructor(
    public email: string,
    public username: string,
    private profileImage: string,
    private accessProvider: string,
  ) { }
}
