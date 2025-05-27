class apiError extends Error{
    constructor(
        statusCode,
        message="Somthing went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.message=message
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default apiError