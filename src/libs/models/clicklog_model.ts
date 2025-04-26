import mongoose from "mongoose";

const ClickLogSchema = new mongoose.Schema({
    email: { type: String, required: true },
  shortUrl: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
  referrer: { type: String },
  clickedAt: { type: Date, default: Date.now },
});

export default mongoose.models.ClickLog || mongoose.model("ClickLog", ClickLogSchema);