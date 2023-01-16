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

export type TStatus = 'OK' | 'FAILED'

export enum EStatus {
    OK = 'OK',
    FAILED = 'FAILED'
}

const test: EStatus = EStatus.FAILED