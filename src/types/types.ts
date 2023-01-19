import { JwtPayload } from "jsonwebtoken";
import { type } from "os";
import TComments from "./TComments";


export interface RequestWithUserRole extends Request
{
    id?: string | JwtPayload | undefined,
    headers: HeaderWithAuthorization
}

interface HeaderWithAuthorization extends Headers
{
    authorization?: JwtPayload
}

export type TUser = {
    id: number,
    name: string,
    password: string
}

export type TPartialUser = {
    id: number,
    name: string,
}

export type TStatus = 'OK' | 'FAILED'

export enum EStatus {
    OK = 'OK',
    FAILED = 'FAILED'
}


export type TApiResponse = {
    status: EStatus,
    message: string,
    data: any
}