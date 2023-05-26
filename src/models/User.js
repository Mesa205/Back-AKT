import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "el campo name es requerido"],
    },

    // docType: {
    //   required: [true, "el campo docType es requerido"],
    // },

    docNum: {
      type: String,
      required: [true, "el campo Numero de Documento es requerido"],
    },

    cellPhoneNum: {
      type: String,
      required: [true, "el campo Numero de Celular es requerido"],
    },

    lastname: {
      type: String,
      required: [true, "el lastname es requerido"],
    },

    email: {
      type: String,
      required: [true, "el campo email es requerido"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "el campo password es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const userModel = model("user", userSchema);

// name
// lastname
// docType
// docNum
// cellPhoneNum
// email
// password: passwordEncrypt
// passwordConfirmation
