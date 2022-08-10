const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const User = require("../model/UserModel");

const getPagination = (page, size) => {
  const limit = size ? +size : 3; // default size: 3
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

const create = async (request, response) => {
  const { name, email } = request.body;

  await User.create({ name, email })
    .then((user) => {
      if (!user) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Couldn't create the user",
        });
      }
      return response.status(StatusCodes.CREATED).send({
        message: "User created successfully",
        user,
      });
    })
    .catch((error) => {
      console.log(error);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Some error occurred: " + error.message,
      });
    });
};

const findAll = async (request, response) => {
  const { page, size, name } = request.query;

  // pagination
  const { limit, offset } = getPagination(page, size);

  // filter by name (is a query select with like)
  let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : undefined;

  await User.findAndCountAll({ where: condition, limit, offset })
    .then((users) => {
      const userList = getPagingData(users, page, limit);

      return response.status(StatusCodes.OK).send(userList);
    })
    .catch((error) => {
      console.log(error);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    });
};

const findByID = async (request, response) => {
  const userID = request.params.uuid;

  await User.findByPk(userID)
    .then((user) => {
      return response.status(StatusCodes.OK).send({
        user,
      });
    })
    .catch((error) => {
      console.log(error);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Some error ocurred",
        error: error.message,
      });
    });
};

const update = async (request, response) => {
  const userID = request.params.uuid;

  await User.update({ ...request.body }, { where: { uuid: userID } }).then(
    (affectedCount) => {
      if (!affectedCount) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Couldn't update the user",
        });
      }
      return response.status(StatusCodes.OK).send({
        message: "User successfully updated",
      });
    }
  );
};

const remove = async (request, response) => {
  const userID = request.params.uuid;

  await User.destroy({ where: { uuid: userID } }).then((deletedRows) => {
    if (!deletedRows) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Couldn't delete the user",
      });
    }
    return response.status(StatusCodes.OK).send({
      message: "User successfully deleted",
    });
  });
};

module.exports = { create, findAll, findByID, update, remove };
