exports.response = (res, status, statusCode, data= null, totalDoc = null) => {
    res.status(statusCode).json({
      status, totalDoc, result: data.length,data
      })

}