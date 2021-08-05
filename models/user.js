import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    id: { type: String },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const hash = await bcrypt.hash(this.password, +bcryptSalt);
  this.password = hash;

  next();
});

userSchema.methods.matchPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    console.error(error);
  }
};

export default mongoose.model('User', userSchema);
