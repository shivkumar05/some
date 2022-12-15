import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function saveUser(request,response){
    try {
        const encryptedPassword=bcrypt.hashSync(request.body.password,12)
        request.body['password']=encryptedPassword;
        const user=new UserModel(request.body);
        const savedUser=await user.save();
        response.status(StatusCodes.CREATED).json(savedUser);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Something went wrong'})
    }
}

export async function fetchUserByPhone(request,response){
    try {
       const user= await UserModel.findOne({phone:request.params.phone});
       if(user){
            response.status(StatusCodes.OK).json(user);
       }
       else{
            response.status(StatusCodes.NOT_FOUND).json({message:'User not found'});
       }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Something went wrong'})
    }
}

export async function deleteUserById(request,response){
    try {
        const user=await UserModel.findById(request.params.id);
        if (user){
             await UserModel.findByIdAndDelete(request.params.id)
             response.status(StatusCodes.NO_CONTENT).json();
        }
        else{
             response.status(StatusCodes.NOT_FOUND).json({message:'User not found'})
        }
     } catch (error) {
         response.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({message:'Something went wrong'})
     }
}

export async function updateUser(request,response){
    try {
       await UserModel.findByIdAndUpdate(request.params.id,request.body);
       response.status(StatusCodes.OK).json({message:'User Updated'}) 
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({message:'Something went wrong'})
    }
}

export async function login(request,response){
    try {
        const user=await UserModel.findOne({email:request.body.email});
        if(user){
            if(bcrypt.compareSync(request.body.password,user.password)){
                const token=jwt.sign({userid:user._id},process.env.SECRET_KEY);
                response.status(StatusCodes.OK).json({token:token});
            }
            else{
                response.status(StatusCodes.BAD_REQUEST).json({message:'Incorrect Password'});
            }
        }
        else{
            response.status(StatusCodes.NOT_FOUND).json({message:'User with given email not found'})
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({message:'Something went wrong'})
    }
}