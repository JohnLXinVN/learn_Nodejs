import bcrypt from "bcryptjs";
import db from "../models";

export let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let isCheck = await checkUserEmail(email);
      if (isCheck) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });

        if (user) {
          let checkPassword = bcrypt.compareSync(password, user.password);

          if (checkPassword) {
            (data.errCode = 0), (data.message = "ok"), delete user.password;
            data.user = user;
          } else {
            (data.errCode = 4),
              (data.message = "Your password is wrong. Please try again");
          }
        } else {
          data.errCode = 2;
          data.message = "User not found";
        }
        resolve(data);
      } else {
        data.errCode = 1;
        data.message = "Your email isn't exit, please try other email";
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
