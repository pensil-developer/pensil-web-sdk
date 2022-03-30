import { PensilServiceConfig } from ".";
import axios from "axios";
import { EndpointService } from "./endpoint.service";

export class GroupService {

    private config: PensilServiceConfig;
    private endpointService: EndpointService;

    constructor(config: PensilServiceConfig) {
        this.config = config;
        this.endpointService = new EndpointService(config.baseUrl);
    }

    public async getGroupDetail(groupId: string) {
        return axios
            .get(this.endpointService.getEndpoints().groupDetail(groupId), {
                headers: {
                    Authorization: "Bearer " + this.config.token ?? "",
                },
            })
            .then((response) => response.data);
    }

    public async getSectionPostsPaginated(groupId: string, sectionId: string, page = 1) {
        return axios
            .get(this.endpointService.getEndpoints().sectionPostsPaginated(groupId, sectionId, page), {
                headers: {
                    Authorization: "Bearer " + this.config.token ?? "",
                },
            })
            .then((response) => response.data);
    }
}