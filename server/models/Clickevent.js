import mongoose from "mongoose";

const ClickEventSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const ClickEvent = mongoose.model("ClickEvent", ClickEventSchema);
