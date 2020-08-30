const { TemplateSchema } = require('../../../models');
const { ResponseFormat } = require('../../../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

module.exports = {
    async create(req, res) {
        const reqBody = req.body;

        try {
            const tmpModel = new TemplateSchema(reqBody);
            const createTmp = await tmpModel.save();

            return successResponse(res, createTmp._id, 201, "Template create successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when create Template"));
        }
    },

    async list(req, res) {
        try {
            const reqBody = req.body;
            const currentPage = reqBody.currentPage ? Number(reqBody.currentPage) : 0;
            const Limit = reqBody.limit ? Number(reqBody.limit) : 0;
            const sortColumn = reqBody.sortColumn ? reqBody.sortColumn : '_id';
            const sortBy = reqBody.sortBy ? reqBody.sortBy : 'asc';

            const filterData = [{ is_deleted: false }];
            const searchData = [{ is_deleted: false }];

            const filterColumn = reqBody.filterColumn ? reqBody.filterColumn : '';
            const filter = reqBody.filter ? reqBody.filter : '';

            const search = { $regex: '.*' + filter + '.*', $options: 'i' };

            if (!filterColumn && filter) {

            }


            const skipRecord = currentPage * Limit;

            let filtered = {};
            if (filterColumn && filter) {
                filtered = { $and: filterData }
            } else if (filter) {
                filtered = { $and: searchData }
            }

            const recordList = await TemplateSchema
                .find(filtered)
                .skip(skipRecord)
                .limit(Limit)
                .populate('created_by', 'first_name last_name')
                .sort({ [sortColumn]: sortBy })
                .lean().exec();

            const totalRecords = await TemplateSchema
                .find(filtered)
                .count()
                .lean().exec();

            const records = {
                totalRecords: totalRecords,
                currentPage: currentPage,
                Limit: Limit,
                template: recordList,
            };

            console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",records);

            return successResponse(res, records, 200, "Template list get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get list"));
        }
    },

    async update(req, res) {
        const Id = req.body.id;
        const updatedJson = req.body;

        if(!Id) { requiredResponse(res, "Id"); }

        try {
            const updated = await TemplateSchema.findByIdAndUpdate(Id, updatedJson).lean().exec();
            return successResponse(res, {}, 200, "Template updated successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when updated template"));
        }
    },

    async getOne(req, res) {
        const id = req.query.id;

        try {
            const tmp = await TemplateSchema.findById(id).lean().exec();
            return successResponse(res, tmp, 200, "Template get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get template"));
        }
    },
    
    async delete(req, res) {
        const id = req.query.id;

        try {
            const deleted = await TemplateSchema.remove({ _id: id }).lean().exec();
            return successResponse(res, {}, 200, "Template deleted successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when delete template"));
        }

    },
}