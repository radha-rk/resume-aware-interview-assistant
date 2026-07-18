export const successResponse = (
    res,
    statusCode = 200,  //200 - OK
    message = "Success",
    data = null
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });

};

export const errorResponse = (
    res,
    statusCode = 500,
    message = "Something went wrong"
) => {

    return res.status(statusCode).json({
        success: false,
        message,
    });

};