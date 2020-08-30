const { ServicesSchema } = require('../../../models');
const { ResponseFormat, Helper, Constants } = require('../../../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

module.exports = {
    async create(req, res) {
        const reqBody = req.body;
        const Title = reqBody.title;
        const titleDescription = reqBody.title_description;
        const subTitle = reqBody.sub_title;
        const subTitleDescription = reqBody.sub_title_description;        
        const parentId = reqBody.parent_id;

        const Meta = reqBody.meta;
        const Content = reqBody.content;

        try {
            const serviceModel = new ServicesSchema({
                title: Title,
                title_description: titleDescription,
                sub_title: subTitle,
                sub_title_description: subTitleDescription,
                parent_id: parentId,

                meta: Meta,
                content: Content,
            });

            const createSvc = await serviceModel.save();
            return successResponse(res, createSvc._id, 201, "Service create successfully");
        } catch (err) {
            return errorResponse(res, 201, (err.message || "something went wrong when create service"));
        }
    },

    async list(req, res) {
        try {
            const serviceList = await ServicesSchema.find({ is_deleted: false }).lean().exec();
            return successResponse(res, serviceList, 200, "Service list get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when create service"));
        }
    }
}