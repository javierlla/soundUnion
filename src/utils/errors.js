class UserNameProvided extends Error {
    constructor() {
        super("User name not provided");
        this.statusCode = 400;
    }
}

class UserMailProvided extends Error {
    constructor() {
        super("User email not provided");
        this.statusCode = 400;
    }
}

class UserPasswordNotProvided extends Error {
    constructor() {
        super("User password not provided");
        this.statusCode = 400;
    }
}

class UserRoleIncorrect extends Error {
    constructor() {
        super("User role is not correct, must be 'admin' or 'user'");
        this.statusCode = 400;
    }
}

class UserEmailAlreadyExists extends Error {
    constructor() {
        super("User email already exists");
        this.statusCode = 400;
    }
}

class UserInvalidCredentials extends Error {
    constructor() {
        super("Invalid credentials");
        this.statusCode = 401;
    }
}

export {
    UserNameProvided,
    UserMailProvided,
    UserPasswordNotProvided,
    UserRoleIncorrect,
    UserEmailAlreadyExists,
    UserInvalidCredentials
};

