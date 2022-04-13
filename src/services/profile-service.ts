import axios from "axios";
import { PensilServiceConfig } from ".";
import { EndpointService } from "./endpoint.service";

export class ProfileService extends EndpointService {

    private config: PensilServiceConfig;
    private endpointService: EndpointService;

    constructor(config: PensilServiceConfig) {
        super(config.baseUrl);
        this.config = config;
        this.endpointService = new EndpointService(config.baseUrl);
    }



    /**
   * Get current user profile
   * @returns
   */
    public async getUserProfile() {
        return axios
            .get(this.endpointService.getEndpoints().user.profile, {
                headers: {
                    Authorization: "Bearer " + (this.config.token ? this.config.token : null),
                },
            })
            .then((response) => response.data);
    }
}