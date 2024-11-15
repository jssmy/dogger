import { AuthToken } from "../interfaces/auth-token";
import { User } from "../interfaces/user";
import { JWT } from "./jwt.util";

export class Auth {
    private static authTokenKey = 'auth-token';
    public static user(): User | null {
        if (this.check()) {
            try {
                return JWT.decode<User>(this.authToken()?.accessToken as string);
            } catch (error) {
                return null;
            }
        }
        return null;
    }


    public static check(): boolean {
        return Boolean(sessionStorage.getItem(this.authTokenKey));
    }


    public static authToken(): AuthToken | null {
        if (this.check()) {
            const data = sessionStorage.getItem(this.authTokenKey);
            return JSON.parse(data as string) as AuthToken;
        }
        return null;
    }
}