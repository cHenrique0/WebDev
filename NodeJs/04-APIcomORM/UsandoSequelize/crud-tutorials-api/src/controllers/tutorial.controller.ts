import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { Tutorial } from "../models/tutorial.model";

const getPagination = (page: any, size: any) => {
  const limit = size ? +size : 3; // default size: 3
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data: any, page: any, limit: number) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

export const createTutorial: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  const published = req.body.published ? req.body.published : false;

  if (!title || !description) {
    return res.status(StatusCodes.NOT_FOUND).send({
      message: "Content can't be empty!",
    });
  }

  const tutorial = {
    title,
    description,
    published,
  };

  await Tutorial.create({ ...tutorial })
    .then((tutorial) => {
      if (tutorial) {
        return res.status(StatusCodes.CREATED).send({
          uuid: tutorial.get("uuid"),
          title: tutorial.get("title"),
          description: tutorial.get("description"),
          published: tutorial.get("published"),
        });
      }
    })
    .catch((error) => {
      next(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Database error. Unable to create the tutorial",
      });
    });
};

export const findAllTutorials: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, size, title } = req.query;

  // pagination
  const { limit, offset } = getPagination(page, size);

  // filter by title (is a query select with like)
  let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : undefined;

  await Tutorial.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset,
  })
    .then((tutorials) => {
      const response = getPagingData(tutorials, page, limit);

      return res.status(StatusCodes.OK).send(response);
    })
    .catch((error) => {
      next(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          error.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const findTutorialByID: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;

  await Tutorial.findByPk(uuid)
    .then((tutorial) => {
      if (!tutorial) {
        return res.status(StatusCodes.NOT_FOUND).send({
          message: "Can't find tutorial",
        });
      }
      return res.status(StatusCodes.OK).send(tutorial);
    })
    .catch((error) => {
      next(error);
    });
};

export const findAllPublished: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  await Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
    .then((tutorial) => {
      const response = getPagingData(tutorial, page, limit);
      return res.status(StatusCodes.OK).send(response);
    })
    .catch((error) => {
      next(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          error.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const updateTutorial: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;
  await Tutorial.update({ ...req.body }, { where: { uuid } });
  return res.sendStatus(StatusCodes.OK);
};

export const deleteTutorial: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;

  await Tutorial.destroy({ where: { uuid } });
  return res.sendStatus(StatusCodes.OK);
};

export const deleteAllTutorials: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Tutorial.destroy({ where: {}, truncate: false }).then((rowsDeleted) => {
    if (rowsDeleted > 0) {
      return res.status(StatusCodes.OK).send({
        message: `${rowsDeleted} Tutorials were deleted successfully!`,
      });
    }

    return res.status(StatusCodes.NOT_FOUND).send({
      message: "No tutorials found to be deleted",
    });
  });
};
