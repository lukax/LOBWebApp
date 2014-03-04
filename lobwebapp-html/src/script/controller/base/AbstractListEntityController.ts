///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.base {
    export interface ListEntityViewModel<T extends domain.base.AbstractEntity> extends d.controller.base.ViewModel {
        entities: T[];
        editEntity(id: number): void;
        listEntity(page: number): void;
        searchText: string;
        page: domain.util.Page;
    }

    export class AbstractListEntityController<T extends domain.base.AbstractEntity> implements d.controller.base.Controller{
        redirectString: string;
        defaultPageSize: number = 50;

        constructor(public $scope: ListEntityViewModel<T>,
                    public EntityService: d.service.contract.base.EntityService<T>,
                    public AlertService: d.service.contract.AlertService,
                    public contextUrl: string,
                    public redirectParam: string) {

            this.redirectString = this.$scope.navigator.$stateParams.redirect;
            
            this.$scope.searchText = (this.$scope.navigator.$stateParams.search || "");
            this.$scope.editEntity = (id: number) => this.editEntity(id);
            this.$scope.listEntity = (page) => this.listEntity(page);
        }

        listEntity(pageIndex: number) {
            this.$scope.page = { index: pageIndex, size: 1 };
            this.$scope.navigator.Progress.start();
                this.EntityService.list(
                    (successData, successStatus, headers) => {
                        this.$scope.page.size = Number(headers(enums.Headers.PAGE_TOTAL));
                        this.$scope.entities = successData;
                        this.$scope.navigator.Progress.done();
                        if (this.redirectString) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um item da lista para voltar para a página anterior", type: enums.AlertType.INFO });
                    },
                    (errorData) => {
                        console.log(errorData);
                        this.AlertService.addMessageResponse(errorData, "Não foi possível listar");
                        this.$scope.navigator.Progress.done();
                    }, { index: pageIndex, size: this.defaultPageSize });
        }

        editEntity(id: number) {
            if (this.redirectString) {
                this.redirectString = this.replaceUrlParam(decodeURIComponent(this.redirectString), this.redirectParam, String(id));
                console.log(this.redirectString);
                this.$scope.navigator.$location.url(this.redirectString);
            }
            else 
                this.$scope.navigator.$location.url(this.contextUrl + id);
        }

        private replaceUrlParam(url: string, paramName: string, paramVal: string) {
            var newUrl;
            if(url.indexOf(paramName) != -1)
                newUrl = url.replace(new RegExp("([?&])"+ paramName + "=\\d+"), "$1" + paramName + "=" + paramVal);
            else
                if(url.indexOf("?") > 0)
                    newUrl = url + "&" + paramName + "=" + paramVal;
                else
                    newUrl = url + "?" + paramName + "=" + paramVal;
            return newUrl;
        }

    }
}