export class Validators {

    static get stringNumber() {
        return /^\d+$/;
    }

    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    static get isString(){
        return /\d/;
    }
}