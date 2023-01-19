import { JwtPayload } from "jsonwebtoken";


export interface RequestWithUserRole extends Request
{
    id?: string | JwtPayload | undefined,
    headers: HeaderWithAuthorization
}

interface HeaderWithAuthorization extends Headers
{
    authorization?: JwtPayload
}

/**
 * typage d'un utilisateur
 */
export type TUser = {
    id: number,
    name: string,
    password: string
}

/**
 * typage d'un nouvel utilisateur
 */
export type TPartialUser = {
    id: number,
    name: string,
}

/**
 * typage du status des réponses
 */
export type TStatus = 'OK' | 'FAILED'

/**
 * énumération du status
 */
export enum EStatus {
    OK = 'OK',
    FAILED = 'FAILED'
}

/**
 * typage des réponses
 */
export type TApiResponse = {
    status: EStatus,
    message: string,
    data: any
}