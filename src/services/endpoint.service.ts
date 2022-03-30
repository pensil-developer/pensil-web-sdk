export class EndpointService {
    private baseUrl = 'https://api.pensil.in/api/';

    constructor(baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
    }

    public getEndpoints() {

        const service = this;

        return {
            groupDetail: (groupId: string) => `${service.baseUrl}group/${groupId}`,
            sectionPostsPaginated: (groupId: string, sectionId: string, page = 1) =>
                service.baseUrl + "group/" + groupId + "/section/" + sectionId + "/posts?page=" + page,
        }
    }
}