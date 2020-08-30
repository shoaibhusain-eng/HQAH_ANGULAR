const { ServicePageSchema } = require('../../../models');
const { ResponseFormat, Helper, Constants } = require('../../../../core');
// const empSetting = require('./setting.controller');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;


module.exports = {
    async create(req, res) {
        const newServicePageSchema = new ServicePageSchema(req.body);

        try {
            // Save Service Page in the database
            const createServicePage = await newServicePageSchema.save();
            return successResponse(res, createServicePage._id, 201, "New Service Page create successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when create service Page"));
        }
    },

    async list(req, res) {
        try {
            const reqBody = req.body;
            const currentPage = reqBody.currentPage ? Number(reqBody.currentPage) : 0;
            const Limit = reqBody.limit ? Number(reqBody.limit) : 5;
            const sortColumn = reqBody.sortColumn ? reqBody.sortColumn : '_id';
            const sortBy = reqBody.sortBy ? reqBody.sortBy : 'desc';

            const filterData = [{}];
            const searchData = [{}];

            const filterColumn = reqBody.filterColumn ? reqBody.filterColumn : '';
            const filter = reqBody.filter ? reqBody.filter : '';

            const search = { $regex: '.*' + filter + '.*', $options: 'i' };

            if (filterColumn && filterColumn !== '_id' && filter)
                filterData.push({ [filterColumn]: search })

            if (filterColumn === '_id' && filter && !isNaN(filter))
                filterData.push({ [filterColumn]: filter })

            if (!filterColumn && filter) {
                searchData.push({ first_name: search });
                searchData.push({ last_name: search });
                searchData.push({ status: search });
                searchData.push({ job_title: search });

                if (!isNaN(filter)) {
                    searchData.push({ _id: filter });
                    searchData.push({ team: filter });
                    searchData.push({ level: filter });
                }
            }

            const skipRecord = currentPage * Limit;

            console.log(reqBody, filterData, searchData)

            let filtered = {};
            if (filterColumn && filter) {
                filtered = { $and: filterData }
            } else if (filter) {
                filtered = { $and: searchData }
            }

            const recordList = await ServicePageSchema
                .find(filtered)
                .skip(skipRecord)
                .limit(Limit)
                .populate('created_by', 'first_name last_name')
                .sort({ [sortColumn]: sortBy })
                .lean().exec();

            const totalRecords = await ServicePageSchema
                .find(filtered)
                .count()
                .lean().exec();

            const records = {
                totalRecords: totalRecords,
                currentPage: currentPage,
                Limit: Limit,
                service: recordList,
            };

            return successResponse(res, records, 200, "Service Page list get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get list"));
        }

    },

    async getService(req, res) {
        const Id = req.query.id;

        if (!Id) { return errorResponse(res, 400, "Id is required"); }

        try {
            const result = await ServicePageSchema.findById(Id).lean().exec();

            if (!result) { return errorResponse(res, 400, "record not found for this service page"); }

            return successResponse(res, result, 200, "Service page get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get service page"));
        }
    },

    async serviceTitles(req, res) {
        try {
            const result = await ServicePageSchema.find({ is_deleted: false, status: "Public" }).lean().exec();
            return successResponse(res, result, 200, "Service Page Titles get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get list"));
        }
    },

    async updateService(req, res) {
        const Id = req.body.id;
        const reqBody = req.body;

        const imageArray = req.files;
        let imageFiles = [];

        if (imageArray) {
            imageArray.forEach(E => {
                imageFiles.push(E.filename);
            })
            reqBody.banner_image = imageFiles.length ? imageFiles : null;
        }

        if(!reqBody.banner_image) {
            delete reqBody.banner_image;
        }

        console.log(Id, reqBody, imageArray)

        try {
            const updated = await ServicePageSchema.findByIdAndUpdate(Id, reqBody).lean().exec();
            return successResponse(res, {}, 200, "User updated successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when updated service page"));
        }
    },

    async deleteService(req, res) {
        const id = req.query.id;
        try {
            const deleted = await ServicePageSchema.remove({ _id: id }).lean().exec();
            return successResponse(res, {}, 200, "Service page deleted successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when delete service page"));
        }
    }
}
