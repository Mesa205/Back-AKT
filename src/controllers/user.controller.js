import { userModel } from "../models/User.js";
import { response } from "../helpers/response.js";
import { encryptPassword } from "../helpers/encryptPassoword.js";
import { generateToken } from "../helpers/generateToken.js";
import mongooseErrorHandler from "mongoose-validation-error-message-handler";

const userCtrl = {};

userCtrl.signup = async (req, reply) => {
  try {
    const { name, lastname, docNum, cellPhoneNum, email, password } = req.body;
    const user = await userModel.findOne({ docNum, email });
    if (user) {
      return response(
        reply,
        409,
        false,
        "",
        "el numero de documento o email ya existe en otro registro"
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new userModel({
      name,
      lastname,
      docNum,
      cellPhoneNum,
      email,
      password: passwordEncrypt,
    });

    await newUser.save();

    const token = generateToken({ user: newUser._id });

    response(
      reply,
      201,
      true,
      { ...newUser.toJSON(), password: null, token },
      "Usuario creado"
    );
  } catch (error) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

userCtrl.login = async (req, reply) => {
  try {
    const { password, docNum } = req.body;
    const user = await userModel.findOne({ docNum });

    if (user && user.matchPassword(password)) {
      const token = generateToken({ user: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON(), password: null, token },
        "Bienvenido"
      );
    }
    response(reply, 400, false, "", "Numero de documento o contraseña incorrectos");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default userCtrl;

// ACOPLADA A FASTIFY :)

// AKT BACKEND TERMINADO :)
