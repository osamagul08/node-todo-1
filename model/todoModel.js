const mongoose = require('mongoose');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'A TODO must define'],
      unique: true,
      trim: true,
      maxlength: [40, 'A TODO name must have less or equal then 40 characters'],
      minlength: [5, 'A TODO name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    complete: {
        type: Boolean,
        default: false
    }

  }
);

const Todo = mongoose.model('Todo', tourSchema);

module.exports = Todo;