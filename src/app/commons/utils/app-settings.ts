import { toPascalCase } from "./string.util";

export class AppSettings {
    public static readonly APP_NAME = 'Bug Zilo';


    public static get APP_NAME_FORMATTED(): string {
        return toPascalCase(this.APP_NAME);
    }
}