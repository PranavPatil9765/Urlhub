import mongoose from "mongoose";
const { Schema } = mongoose;
const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  Alias:{
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  email:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const url =mongoose.models.url || mongoose.model("url", urlSchema);

export default url;