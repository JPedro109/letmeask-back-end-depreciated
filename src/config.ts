import { toolkit } from "./utils/toolkit";

export const ENVIRONMENT = toolkit.environment.getValue("ENVIRONMENT");
export const APP_URL = toolkit.environment.getRequiredValue("APP_URL");
export const API_URL = toolkit.environment.getRequiredValue("API_URL");
export const TOKEN_EXPIRY_TIME = toolkit.environment.getRequiredValue("TOKEN_EXPIRY_TIME");
export const PORT = parseInt(toolkit.environment.getRequiredValue("PORT"));