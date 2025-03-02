import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

const adminUserSchema = new mongoose.Schema(
  {
    adminUserName: { type: String, required: true, trim: true },
    adminUserPassword: { type: String, required: true },
    adminUserEmail: { type: String, required: true, unique: true, lowercase: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("adminUserPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.adminUserPassword = await bcrypt.hash(this.adminUserPassword, salt);
    next();
  } catch (error) {
    console.error("Error hashing password:", error.message);
    next(error);
  }
});

adminUserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.adminUserPassword);
};

const AdminUserModel = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);
export default AdminUserModel;
