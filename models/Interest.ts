import mongoose from 'mongoose';

// Define the schema for the Interest model
const InterestSchema = new mongoose.Schema({
  interests: {
    type: [String], // Array of strings
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true, // Ensure one entry per user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before creating it
const Interest =
  mongoose.models.Interest || mongoose.model('Interest', InterestSchema);

export default Interest;
