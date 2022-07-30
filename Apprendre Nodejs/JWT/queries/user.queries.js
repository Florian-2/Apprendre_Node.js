const Users = require("../databases/models/user.model");

exports.createUser = async (body) => {
    try {
        const hashedPassword = await Users.hashPassword(body.password);

        const user = await Users.create({
            local: {
                email: body.email,
                password: hashedPassword,
            },
            username: body.username
        })
        
        return user;
    } 
    catch (error) {
        throw error;
    }
}

exports.findUserByEmail = async (email) => {
    return Users.findOne({ "local.email": email }).exec();
}

exports.findUserById = async (id) => {
    return Users.findById(id).exec();
}