///<reference path="../../reference.d.ts"/>

import a = require("./base/EntityServiceMock");

export module service.mock {
    export class StockServiceMock extends a.service.mock.base.EntityServiceMock<domain.Stock> implements d.service.contract.StockService {

        static $inject = ["$timeout"];
        constructor(public $timeout: ng.ITimeoutService) {
            super($timeout);

            this.addToRepository({
              id: 0,
              product: { id: 0, name: "", description: "", quantity: 0, costPrice: 0, price: 0, category: "", ncm: "" },
              quantity: 0,
              minQuantity: 0,
              maxQuantity: 0,
              unit: ""
            });
            this.addToRepository({
                id: 1,
                product: { id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, category: "Inform�tica/Computadores", ncm: "8471.30.19" },
                quantity: 59,
                minQuantity: 3,
                maxQuantity: 100,
                unit: "Item"
            });
        }

        listUnit(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            var unitList: string[] = [];
            this.getRepository().forEach((x) => {
                if (unitList.indexOf(x.unit) == -1)
                    unitList.push(x.unit);
            });

            this.$timeout(() => {
                successCallback(unitList, 200, null, null);
            }, 1000);
        }
    }
}

export var register = (module: ng.ILazyModule) => {
  module.service("StockService", service.mock.StockServiceMock);
};
