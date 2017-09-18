export class DoctorModel {
    public lanr: string;
    public firstname: string;
    public lastname: string;
    public address: string;

    constructor(data) {
        this.address = data.address;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.lanr = data.lanr;
    }

    public setLanr(lanr: string): void {
        this.lanr = lanr;
    }

    public getLanr(): string {
        return this.lanr;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getAddress(): string {
        return this.lanr;
    }

    public toJSON(): object {
        return {
            lanr: this.lanr,
            firstname: this.firstname,
            lastname: this.lastname,
            address: this.address
        };
    }
}
