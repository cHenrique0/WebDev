const { StatusCodes } = require("http-status-codes");
const Person = require("../models/Person.model");

class PersonController {
  async create(request, response, next) {
    const newPerson = request.body;
    if (!newPerson.name || !newPerson.salary) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        message: "The fields must not be empty",
      });
    }

    await Person.create(newPerson)
      .then((person) => {
        if (!person) {
          return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Unable create the person",
          });
        }
        return response.status(StatusCodes.CREATED).send({
          message: "Person created successfully",
          data: person,
        });
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll(request, response, next) {
    const query = request.query.name ? request.query.name : undefined;
    if (!query) {
      await Person.find()
        .then((people) => {
          return response.status(StatusCodes.OK).send(people);
        })
        .catch((error) => {
          console.log(error);
          return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        });
      return;
    }
    await Person.find({ name: { $regex: query } })
      .then((people) => {
        return response.status(StatusCodes.OK).send(people);
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  async findById(request, response, next) {
    const personID = request.params.id;

    // await Person.findOne({ _id: personID })
    await Person.findById(personID)
      .then((person) => {
        if (!person) {
          return response.status(StatusCodes.NOT_FOUND).send({
            message: "Person not found",
          });
        }
        return response.status(StatusCodes.OK).send(person);
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  async update(request, response, next) {
    const personID = request.params.id;
    const personUpdate = request.body;

    await Person.updateOne({ _id: personID }, personUpdate)
      .then(({ matchedCount }) => {
        if (!matchedCount) {
          return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Unable update person",
          });
        }
        return response.status(StatusCodes.OK).send({
          message: "Person successfully updated",
        });
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  async delete(request, response, next) {
    const personID = request.params.id;

    await Person.findOne({ _id: personID })
      .then((person) => {
        if (!person) {
          return response.status(StatusCodes.NOT_FOUND).send({
            message: "Person not found",
          });
        }
        Person.deleteOne({ _id: personID })
          .then(({ deletedCount }) => {
            if (!deletedCount) {
              return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: "Unable delete person",
              });
            }
            return response.status(StatusCodes.OK).send({
              message: "Person successfully deleted",
            });
          })
          .catch((error) => {
            console.log(error);
            return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
          });
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }
}

module.exports = PersonController;
