///<reference path="../../reference.d.ts"/>

module service.contract {
    export interface StockService extends base.EntityService<domain.Stock> {

    	listUnit(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;
    }
}