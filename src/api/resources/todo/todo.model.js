import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'incomplete'
  }
});

export const Todo = mongoose.model('todo', todoSchema);
