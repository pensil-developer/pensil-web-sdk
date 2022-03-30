import { GroupService } from "./group.service";

export type PensilServiceConfig = {
    token: string;
    baseUrl?: string;
}

interface PensilServices {
    group: GroupService;
}

export class PensilService {

    private config: PensilServiceConfig;
    public services: PensilServices;

    constructor(config: PensilServiceConfig) {
        this.config = config;
        // initialise all the services
        this.services = {
            group: new GroupService(this.config)
        };
    }

    public getConfig(): PensilServiceConfig {
        return this.config;
    }


}