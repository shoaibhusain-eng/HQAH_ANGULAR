const { EmployeesSchema } = require('../../../models');
const { ResponseFormat } = require('../../../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

module.exports = {
    async findEmployee(params, columns) {
        params['is_deleted'] = false;
        const selecteColumns = columns ? columns : '-__v -updated_at -is_deleted';

        return new Promise((resolve, reject) => {
            EmployeesSchema.findOne(params).select(selecteColumns)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        })
    },

    async findAllEmployees(params, columns) {
        params['is_deleted'] = false;
        const selecteColumns = columns ? columns : '-__v -updated_at -is_deleted';

        return new Promise((resolve, reject) => {
            EmployeesSchema.find(params).select(selecteColumns)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        })
    }


}