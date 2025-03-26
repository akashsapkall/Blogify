const JWT=require("jsonwebtoken");
function createToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role,
        profileImgUrl:user.profileImgUrl,
    }
    const token=JWT.sign(payload,process.env._SECRETKEYFORTOKEN);
    return token;
}

function validateToken(token){
    try {
        const payload = JWT.verify(token, process.env._SECRETKEYFORTOKEN);
        return payload; // Returns decoded payload if valid
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null; // Return null if verification fails
    }
}

module.exports={
    createToken,
    validateToken,
}