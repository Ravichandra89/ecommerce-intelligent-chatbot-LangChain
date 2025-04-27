import mongoose, { Schema } from "mongoose";

const deliverySchema = new Schema({
  userId: String,
  status: String,
  details: String,
});

export default mongoose.model("Delivery", deliverySchema);
