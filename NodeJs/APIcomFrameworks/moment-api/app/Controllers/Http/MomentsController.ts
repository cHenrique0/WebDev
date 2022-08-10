import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { StatusCodes } from "http-status-codes";
import Moment from "App/Models/Moment";
import Database from "@ioc:Adonis/Lucid/Database";

export default class MomentsController {
  private validationOptions = {
    types: ["image"],
    size: "2mb",
  };

  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
    const image = request.file("image", this.validationOptions);
    if (image) {
      await image.moveToDisk("./");

      body.image = image.fileName;
    }

    const newMoment = await Moment.create({ ...body });

    return response.status(StatusCodes.CREATED).send({
      message: "Moment created successfully",
      data: newMoment,
    });
  }

  public async index({ response, params }: HttpContextContract) {
    const momentList = await Moment.query().preload("comments");

    return response.status(StatusCodes.OK).send({
      data: momentList,
    });
  }

  public async show({ response, params }: HttpContextContract) {
    const id = params.id;
    const moment = await Moment.findOrFail(id);

    await moment.load("comments");

    return response.status(StatusCodes.OK).send({
      data: moment,
    });
  }

  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body();
    const id = params.id;
    const moment = await Moment.findOrFail(id);

    moment.title = body.title;
    moment.description = body.description;

    if (moment.image !== body.image || !moment.image) {
      const image = request.file("image", this.validationOptions);

      // atualiza a imagem
      if (image) {
        await image.moveToDisk("./");

        if (image.fileName) {
          // apaga a imagem antiga
          await Drive.delete(moment.image);
        }

        moment.image = String(image.fileName);
      }
    }

    await moment.save();

    return response.status(StatusCodes.OK).send({
      message: "Moment updated successfully",
    });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const id = params.id;
    const moment = await Moment.findOrFail(id);

    await moment.delete();

    return response.status(StatusCodes.OK).send({
      message: "Successfully deleted moment",
    });
  }
}
