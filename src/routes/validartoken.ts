import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const validartoken = (req: Request, res: Response, next: NextFunction) => {
    const htoken = req.headers['authorization'];
    console.log(htoken);
    if (htoken != undefined && htoken.startsWith('Bearer ')) {
        try{
            const token = htoken.slice(7);
            jwt.verify(token, process.env.SECRET_KEY || 'CY242BHtr87DCsacYUGjsJN')
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Token invalido'
            });
        }  
    }else{
        res.status(401).json({
            message: 'No estas autorizado para realizar esta accion'
        });
    }
}
export default validartoken;