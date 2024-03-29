import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Example = mongoose.model('Example', schema, 'Example');
