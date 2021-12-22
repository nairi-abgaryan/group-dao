export const MANDATORY_ENVIRONMENT_VARIABLES: string[] = ['JWT_PUBLIC_KEY', 'JWT_ISSUER']
export const SERVER_PORT = 9998

export const JWT_PUBLIC_KEY: string = <string>process.env.JWT_PUBLIC_KEY
export const JWT_ISSUER: string = <string>process.env.JWT_ISSUER
export const GLOBAL_ID_BASE_URL = 'https://global.id/_api'
