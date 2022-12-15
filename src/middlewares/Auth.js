import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function verifyToken(request,response,next){
    const authHeader=request.get('Authorization');
    if (authHeader) {
        var token=authHeader.replace("Bearer ","");
        jwt.verify(token,process.env.SECRET_KEY,(error)=>{
            if(error){
                response.status(StatusCodes.UNAUTHORIZED)
                .json({message:'Access Denied'});
            }
            else{
                next();
            }
        });
    } else {
        response.status(StatusCodes.UNAUTHORIZED)
        .json({message:'Access Denied'});
    }
}