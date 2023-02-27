
import { handleUserLogin } from "../services/userService";

export const loginAPIPage = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing email",
    });
  }
  let userData = await handleUserLogin(email, password);
  // console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user? userData.user : {}
  });
};
