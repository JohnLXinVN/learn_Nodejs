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

export const getAllUsers = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = await db.User.findAll({raw: true});
            
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
};

export const getInfoUser = async (dataID) => {
    return new Promise( async (resolve, reject) => {
      try {
        let user = await db.User.findOne({ where: { id: dataID } ,  raw: true })
        resolve(user);
      } catch (error) {
        reject(error);
      }
    })
}

export const updateCrudUser = async (data) => {
  return new Promise( async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: {id: Math.floor(data.id)}, raw: true })
      console.log("usser action: ",user)

      if(user) {
        
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender;
        user.roleId = data.roleId;

        await db.User.update(user,  {where: {id: data.id}})
        resolve();
      }
      else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  })
}

export const deleteCrudUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({where: {id: id}})
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}
