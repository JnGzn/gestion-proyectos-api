import { Request, Response, NextFunction } from "express";
import authService from '../sevice/auth/auth.service';
import { RolesUser } from "../model/roles.num";


export function isOperator(req: Request, res: Response, next: NextFunction): void {
    let { authorization } = req.headers;
    authorization = authorization ? authorization.replace('Bearer ', '') : undefined;

    if (!authorization) {
        res.sendStatus(403);
        return;
    }

    try {
        const role = authService.validateToken(authorization);
        if (role !== RolesUser.OPERATOR) {
            res.sendStatus(403);
            return
        }
    } catch (error) {
        res.sendStatus(403);
        return
    }


    next();
    return;
}

export function validateToken(req: Request, res: Response, next: NextFunction): void {
    let { authorization } = req.headers;
    authorization = authorization ? authorization.replace('Bearer ', '') : undefined;

    if (!authorization) {
        res.sendStatus(403);
        return;
    }

    try {
        authService.validateToken(authorization);
    } catch (error) {
        res.sendStatus(403);
        return
    }


    next();
    return;
}
