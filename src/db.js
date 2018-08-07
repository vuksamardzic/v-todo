import mongoose from 'mongoose';


mongoose.Promise = global.Promise;
const uri = 'mongodb://localhost:27017/vue-todo';

export const connect = () => {
  mongoose.connect(uri, { useNewUrlParser: true })
    .then(conn => {
      console.log(`db connected on port #${conn.connections[0].port}`);
    })
    .catch(e => {
      console.log(e);
    });
};
