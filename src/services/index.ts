import { GroupService } from "./group.service";

export type PensilServiceConfig = {
    token: string;
    baseUrl?: string;
    themeData?: PensilThemeData
}

interface PensilServices {
    group: GroupService;
}

interface PensilThemeData {
    primaryColor: string;
}

const DEFAULT_THEME_DATA = {
    primaryColor: '#00AEEF'
};

export class PensilService {

    private config: PensilServiceConfig;
    public services: PensilServices;

    constructor(config: PensilServiceConfig) {
        this.config = config;
        // initialise all the services
        this.services = {
            group: new GroupService(this.config)
        };
        this.init();
    }

    /**
     * Initialises the service
     */
    private init(): void {
        // if not theme data, get the default values
        if (!this.config.themeData) {
            this.config.themeData = DEFAULT_THEME_DATA;
        }

        // add the theme data as style to the body
        if (document) {
            const themeStyle = document.getElementById("pensil-theme-style");
            if (!themeStyle) {
                const style = document.createElement('style');
                style.id = 'pensil-theme-style';
                style.innerHTML = this.generateThemeData();
                document.body.appendChild(style);
            }
        }
    }

    /**
     * Creates css based on themedata and returns it as a string
     * @returns String of theme data
     */
    private generateThemeData(): string {

        if (!this.config.themeData) {
            return ``;
        }

        return `
            body {
                --pensil-theme-primary-color: ${this.config.themeData.primaryColor};
            }
        `;
    }

    public getConfig(): PensilServiceConfig {
        return this.config;
    }
}