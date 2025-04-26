import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true }, // fixed typo here
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true }); // optional but useful to track createdAt & updatedAt

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
