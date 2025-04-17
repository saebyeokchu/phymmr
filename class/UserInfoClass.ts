import { Sex } from "../data/Enums";
import { Tenant } from "../type/RoomType";

export class UserInfoClass {
    private _name: string;
    private _sex: Sex;
    private _age : number;
    private _phoneNumber: string;
    private _address: string;
    private _accountNumber: string;

    public constructor() {
        this._name = '';
        this._sex = Sex.none;
        this._age = 20;
        this._phoneNumber = '';
        this._address = '';
        this._accountNumber = '';
    }

    // public constructor(newUser: Tenant) {
    //     this._name = newUser.name;
    //     this._sex = newUser.sex;
    //     this._phoneNumber = newUser.phoneNumber;
    //     this._address = newUser.address;
    //     this._accountNumber = newUser.accountNumber;
    //   }

    public getUser() : Tenant{
        return {
            name : this._name,
            sex : this._sex,
            age : this._age,
            phoneNumber : this._phoneNumber,
            address : this._address,
            accountNumber : this.accountNumber
        }
    }

    public isUserInfoFilled(){
        return !(this._name == '' || this._phoneNumber == '' || this._address == '' || this._accountNumber == '');
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get sex(): Sex {
        return this._sex;
    }
    public set sex(value: Sex) {
        this._sex = value;
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }

    public get accountNumber(): string {
        return this._accountNumber;
    }
    public set accountNumber(value: string) {
        this._accountNumber = value;
    }

}
   