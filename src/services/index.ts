import { GroupService } from "./group.service";
import { PostService } from "./post.service";

export type PensilServiceConfig = {
    token: string;
    baseUrl?: string;
    themeData?: PensilThemeData
}

interface PensilServices {
    group: GroupService;
    post:PostService
}

interface PensilThemeData {
    primaryColor: string;
    primaryLightColor: string;
    onPrimaryColor: string;

    backgroundColor: string;
    onBackgroundColor: string;

    surfaceColor: string;
    onSurfaceColor: string;

    defaultTextColor: string;

    heading1TextColor: string;
    heading2TextColor: string;
    subtitle1TextColor: string;
    subtitle2TextColor: string;

    disabledColor: string;
    dividerColor: string;
    borderColor: string;

    dangerColor: string;
    infoColor: string;
    successColor: string;
    warningColor: string;
}

const DEFAULT_THEME_DATA = {
    primaryColor: '#0445fe',
    primaryLightColor: '#0445fe20',
    onPrimaryColor: '#ffffff',

    backgroundColor: '#f5f6f8',
    onBackgroundColor: '#181818',

    surfaceColor: '#ffffff',
    onSurfaceColor: '#181818',

    defaultTextColor: '#181818',

    heading1TextColor: '#181818',
    heading2TextColor: '#505050',
    subtitle1TextColor: '#707070',
    subtitle2TextColor: '#929292',

    disabledColor: '#dddddd; ',
    dividerColor: '#bebebe',
    borderColor: '#e5e7eb',

    dangerColor: '#ff0000',
    successColor: '#00ff00',
    infoColor: '#00bcd4',
    warningColor: '#ff8181',
};

export class PensilService {

    private config: PensilServiceConfig;
    public services: PensilServices;

    constructor(config: PensilServiceConfig) {
        this.config = config;
        // initialize all the services
        this.services = {
            group: new GroupService(this.config),
            post: new PostService(this.config)
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
                --pensil-theme-primary-light-color: ${this.config.themeData.primaryLightColor};
                --pensil-theme-on-primary-color: ${this.config.themeData.onPrimaryColor};
                --pensil-theme-background-color: ${this.config.themeData.backgroundColor};
                --pensil-theme-on-background-color: ${this.config.themeData.onBackgroundColor};
                --pensil-theme-surface-color: ${this.config.themeData.surfaceColor};
                --pensil-theme-on-surface-color: ${this.config.themeData.onSurfaceColor};
                --pensil-theme-default-text-color: ${this.config.themeData.defaultTextColor};
                --pensil-theme-heading-1-text-color: ${this.config.themeData.heading1TextColor};
                --pensil-theme-heading-2-text-color: ${this.config.themeData.heading2TextColor};
                --pensil-theme-subtitle-1-text-color: ${this.config.themeData.subtitle1TextColor};
                --pensil-theme-subtitle-2-text-color: ${this.config.themeData.subtitle2TextColor};
                --pensil-theme-disabled-color: ${this.config.themeData.disabledColor};
                --pensil-theme-divider-color: ${this.config.themeData.dividerColor};
                --pensil-theme-border-color: ${this.config.themeData.borderColor};
                --pensil-theme-danger-color: ${this.config.themeData.dangerColor};
                --pensil-theme-info-color: ${this.config.themeData.infoColor};
                --pensil-theme-success-color: ${this.config.themeData.successColor};
                --pensil-theme-warning-color: ${this.config.themeData.warningColor};
            }
        `;
    }

    public getConfig(): PensilServiceConfig {
        return this.config;
    }
}