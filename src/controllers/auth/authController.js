import User from "../../models/users.js";
import { hash, compare } from "../../utils/bcrypt.js";
import {
    UserMailProvided,
    UserEmailAlreadyExists,
    UserNameProvided,
    UserRoleIncorrect,
    UserPasswordNotProvided,
    UserInvalidCredentials
} from "../../utils/errors.js";


async function register(userData) {
    if (!userData.name) throw new UserNameProvided();
    if (!userData.email) throw new UserMailProvided();
    if (!userData.password) throw new UserPasswordNotProvided();

    userData.role = userData.role ? userData.role.toLowerCase() : "user";

    const validRoles = ["admin", "user"];
    if (!validRoles.includes(userData.role)) {
        throw new UserRoleIncorrect();
    }

    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) throw new UserEmailAlreadyExists();

    userData.password = await hash(userData.password);

    const newUser = await User.create(userData);

    return newUser;
}

async function login(email, password) {
    if (!email) throw new UserMailProvided();
    if (!password) throw new UserPasswordNotProvided();

    const user = await User.findOne({ where: { email } });
    if (!user) throw new UserInvalidCredentials();

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new UserInvalidCredentials();

    return user;
}

function logout(req, res) {
    req.session.user = undefined;
    res.redirect("/");
}

export default {
    register,
    login,
    logout
};
