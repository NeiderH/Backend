"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validartoken = (req, res, next) => {
    const htoken = req.headers['authorization'];
    console.log(htoken);
    if (htoken != undefined && htoken.startsWith('Bearer ')) {
        try {
            const token = htoken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'CY242BHtr87DCsacYUGjsJN');
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Token invalido'
            });
        }
    }
    else {
        res.status(401).json({
            message: 'No estas autorizado para realizar esta accion'
        });
    }
};
exports.default = validartoken;
