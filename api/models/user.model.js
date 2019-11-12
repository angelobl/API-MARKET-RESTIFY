const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  owner: { type: String, required: true},
  name: {type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
});

//Usamos el metodo model para reutilizar el modelo anterior
module.exports = mongoose.model('user', userSchema);