import { toolkit } from "./utils/toolkit";

export const APP_URL = toolkit.environment.getRequiredValue("APP_URL");
export const EMAIL_ORIGIN = toolkit.environment.getRequiredValue("EMAIL_ORIGIN");
export const SECRET_KEY_JWT = toolkit.environment.getRequiredValue("SECRET_KEY_JWT");
export const TOKEN_EXPIRY_TIME = toolkit.environment.getRequiredValue("TOKEN_EXPIRY_TIME");