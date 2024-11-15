import { makeStateKey } from "@angular/core";
import { AuthToken } from "../../interfaces/auth-token";

export const AUTH_TOKEN_KEY = makeStateKey<AuthToken>('authToken');