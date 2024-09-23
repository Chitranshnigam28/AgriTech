const User = require("../models/user")
const bcrypt = require("bcrypt")

async function createAdminAccount() {
    try {
        const existAdmin = await User.findOne({ email: "admin@test.com" });
        if(!existAdmin){
            const newAdmin = new User({
                email: "admin@test.com",
                name : "Admin",
                password : await bcrypt.hash("admin",10),
                role : "admin"
            })
            newAdmin.save();
            console.log("Admin account created successfully!")
        }else{
            console.log("Admin already exist")
        }
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = createAdminAccount