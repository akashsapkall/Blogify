const { validateToken } = require("../services/authentication");
function authenticateCookie() {
  return function (req, res, next) {
    const presenttoken = req.cookies.token;
    if (!presenttoken) return next();
    try {
      const userPayload = validateToken(presenttoken);
      req.user = userPayload;
    } catch (e) {
      console.error("Token validation error:", e.message);
    }
    return next();
  };
}
function restrictTo(req,res,next){
  if(!req.user) return res.redirect("/user/signin");
  return next();
}
module.exports = {
  authenticateCookie,
  restrictTo,
};
