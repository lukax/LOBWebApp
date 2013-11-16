///<reference path="./../../../reference.d.ts"/>

export module service.impl.base {
    export class EntityServiceImpl<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {

        private rootUrl: string = "http://localhost:9000/api/";
        
        constructor(contextUrl: string, public $http: ng.IHttpService) {
            this.rootUrl += '/' + contextUrl;
        }

        public save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.getHttpService().post(this.rootUrl, entity).success(successCallback).error(errorCallback);
        }

        public update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.getHttpService().put(this.rootUrl, entity).success(successCallback).error(errorCallback);
        }

        public remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.getHttpService().delete(this.rootUrl, entity).success(successCallback).error(errorCallback);
        }

        public find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.getHttpService().get(this.rootUrl + '/' + id).success(successCallback).error(errorCallback);
        }

        public list(successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.getHttpService().get(this.rootUrl).success(successCallback).error(errorCallback);
        }

        public contains(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            //TODO: Implement this function
        }


        public getHttpService() {
            return this.$http;
        }

    }
}