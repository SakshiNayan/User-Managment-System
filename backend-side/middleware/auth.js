const AdminModel = require("../Model/admin-model");
const bcrypt = require("bcryptjs");
const checkExistingUser = async (userName)=> {
    let existingUser = false;
    await AdminModel.find({userName: userName}).then((userData)=> {
        if(userData.length) {
            existingUser = true;
        }
    });
    return existingUser;
}

const generatePasswordHash = (password) => {
    const salt = 10; //adding random 16 bit value to password for encrypting
    return new Promise((resolve, reject)=> {
         bcrypt.genSalt(salt).then((hashSalt)=> {
            bcrypt.hash(password, hashSalt).then((passwordHash)=> {
                resolve(passwordHash);
            })
        })
    });
}
module.exports = {checkExistingUser, generatePasswordHash};