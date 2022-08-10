const { StatusCodes } = require("http-status-codes");
const User = require("../model/UserModel");

module.exports = {
  async checkUserExists(request, response, next) {
    const userID = request.params.uuid;
    await User.findByPk(userID)
      .then((user) => {
        if (!user) {
          return response.status(StatusCodes.NOT_FOUND).send({
            message: "User not found",
          });
        }
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
};
