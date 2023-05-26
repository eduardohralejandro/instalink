import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  linkid: { type: ObjectId, required: true },
  authentication: {
    passwords: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, required: true },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (token: string) =>
  UserModel.findOne({ "authentication.sessionToken": token });
export const getUserById = (id: string) => UserModel.findById({ id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findOneAndUpdate({id,  values});
