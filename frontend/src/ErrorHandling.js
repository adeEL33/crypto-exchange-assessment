export default class ErrorHandling {
    //constructor
    constructor() {
        //initializing global variable error as empty object
        this.errors = {};
    }

    //check if key exist in object
    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    //checking the length
    any() {
        return Object.keys(this.errors).length > 0;
    }


    //getting key value
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    //recoring errors
    record(errors) {
        this.errors = errors;
    }

    //clear/unset error object key
    clear(field) {
        delete this.errors[field]
    }
}