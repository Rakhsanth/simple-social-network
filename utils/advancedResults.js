// custom modules
const ErrorResponse = require('../utils/errorWrapper');

const advancedResults = (model, populate) => {
    return async (request, response, next) => {
        let query;
        let queryString = { ...request.query };

        const objectsToRemove = ['select', 'sort', 'page'];
        objectsToRemove.forEach((eachObject) => delete queryString[eachObject]);

        queryString = JSON.stringify(queryString);

        queryString = queryString.replace(
            /\b(lt|lte|gt|gte|in)\b/g,
            (match) => `$${match}`
        );

        queryString = JSON.parse(queryString);

        query = model.find(queryString);

        if (populate) {
            query = query.populate(populate);
        }

        if (request.query.select) {
            const fields = request.query.select.split(',').join(' ');
            query = query.select(fields);
        }
        if (request.query.sort) {
            const sortBy = request.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        const filteredResult = await query;
        totalNoOfResults = filteredResult.length;

        const pagination = {
            prev: null,
            next: null,
        };

        const limit = Number(process.env.PAGINATION_PAGE_LIMIT);
        let pageNumber = Number(request.query.page) || 1;

        let pageStartIndex = (pageNumber - 1) * limit;
        let toSkip = (pageNumber - 1) * limit;
        let pageEndIndex = pageNumber * limit;

        query = query.skip(toSkip).limit(limit);

        const result = await query;

        if (pageStartIndex > 0) {
            pagination.prev = pageNumber - 1;
        }
        if (pageEndIndex < totalNoOfResults) {
            pagination.next = pageNumber + 1;
        }

        if (!result) {
            return next(err);
        }

        response.advancedResults = {
            success: true,
            count: result.length,
            pagination,
            data: result,
            error: false,
        };

        next();
    };
};

module.exports = advancedResults;
