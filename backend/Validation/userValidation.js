const validator = require("validator");

const registerUserValidation = (req) => {
    const { name, email, password } = req.body;

    if (!name) {
        const err = new Error("Name is required");
        err.name = "ValidationError";
        throw err;
    }else if(name.trim().length > 20){
        const err = new Error("Name must below 20 characters");
        err.name="ValidationError";
        throw err;
    }
    if(!email){
        const err = new Error("Email is required");
        err.name="ValidationError";
        throw err;
    }else if (!validator.isEmail(email)) {
        const err = new Error("Wrong email format");
        err.name = "ValidationError";
        throw err;
    }

    if(!password){
        const err = new Error ("Password is required");
        err.name="ValidationError";
        throw err;
    }else if (!validator.isStrongPassword(password)) {
        const err = new Error("Weak password");
        err.name = "ValidationError";
        throw err;
    }

    return true;
};

module.exports = {registerUserValidation}
