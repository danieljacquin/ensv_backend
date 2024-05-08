export class CustomError extends Error{

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ){
        super(message)
    }

    static badRequest(message: string){
        return new CustomError(400, message)
    }

    static internalServer(message: string = 'internal server error'){
        return new CustomError(500, message);
    }
}