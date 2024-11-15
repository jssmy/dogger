import { jwtDecode } from "jwt-decode";

export class JWT {
    public static decode<T>(payload: string) {
        try {
            return jwtDecode(payload) as T;
        } catch(__e) {
            return null;
        }

    }
}