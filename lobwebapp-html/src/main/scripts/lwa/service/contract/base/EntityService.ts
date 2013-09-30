///<reference path="./../../../reference.d.ts"/>

module d.service.contract.base {
    export interface EntityService<T extends domain.base.AbstractEntity> {
        save(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        update(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        remove(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        findById(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        list(successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        contains(entity: T,
            successCallback: (boolean: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

    }
}