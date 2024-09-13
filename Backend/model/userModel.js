const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobileNumber : {type: String, required: true},
    // role:  { type: String, enum: ['admin'], default: 'admin' }
});

// Hash password before saving the user
userSchema.pre('save',async function (next){
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10); // Increase the salt rounds for better security
            user.password = await bcrypt.hash(user.password, salt);
         
        } catch (error) {
            return next(error); // Pass the error to the next middleware
        }
    }
    next();
});

userSchema.methods.comparePassword =  async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User',userSchema);