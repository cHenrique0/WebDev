import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import Moment from "App/Models/Moment";
import { StatusCodes } from "http-status-codes";

export default class CommentsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body();
    const momentId = params.momentId;

    await Moment.findOrFail(momentId);

    body.momentId = momentId;

    const comment = await Comment.create(body);

    return response.status(StatusCodes.CREATED).send({
      message: "Comment successfully added",
      data: comment,
    });
  }
}
