export class Users {
    public firstname: string;
    public lastname: string;
    public email: string;
    public invitationCode: string;

    constructor(firstname: string, lastname: string, email: string, invitationCode: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.invitationCode = invitationCode;
    }
}
