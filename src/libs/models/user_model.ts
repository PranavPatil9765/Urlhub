import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{

    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;    