import bcrypt from 'bcrypt';

async function hash(password) {
    try {
        const result = await bcrypt.hash(password, 10);
        return result;
    } catch (error) {
        throw new Error("Error hashing password");
    }
}

async function compare(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        throw new Error("Error comparing password");
    }
}

export {
    hash,
    compare
};
