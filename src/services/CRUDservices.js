import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

export const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
        positionId: data.positionId,
      });
      resolve("ok create a new user");
    } catch (error) {
      reject(error);
    }
  });
};
