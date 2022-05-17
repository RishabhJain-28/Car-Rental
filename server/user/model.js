const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    phone: Number,

    email: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    forgetPassword: {
      token: String,
      expires: Date,
    },
    watchlist: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'Product',
        },
      ],
      validate: [itemLimit, '{PATH} exceeds the limit of 25'],
    },
    // cart: {
    //   type: [
    //     {
    //       item: { type: mongoose.Schema.Types.ObjectID, ref: 'Product' },
    //       count: {
    //         type: Number,
    //         min: 1,
    //         default: 1,
    //       },
    //     },
    //   ],
    //   validate: [itemLimit, '{PATH} exceeds the limit of 25'],
    // },
    cart: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'Product',
        },
        qty: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

function itemLimit(val) {
  return val.length <= 25;
}

userSchema.virtual('name').get(function () {
  // console.log('a');
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods.verifyPassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

userSchema.methods.setPassword = async function (password) {
  this.password = await hashPassword(password);
};
userSchema.statics.hashPassword = async function (password) {
  return await hashPassword(password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
