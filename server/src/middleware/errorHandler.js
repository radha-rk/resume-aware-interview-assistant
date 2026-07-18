const errorHandler = (err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({      //500 - internal server errors.
        success: false,
        message: err.message || "Internal Server Error",
    });

};

export default errorHandler;