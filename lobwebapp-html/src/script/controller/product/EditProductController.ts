///<reference path="../../reference.d.ts"/>
///<amd-dependency path="fileupload"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends i0.controller.base.EditEntityViewModel<domain.Product> {  
        markUp: number;
        categories: string[];
        saveChanges(product: domain.Product): void;
        removeProduct(product: domain.Product): void;
        imageUrl: string;
    }

    export class EditProductController extends i0.controller.base.AbstractEditEntityController<domain.Product> {
        allCategories: string[] = [];

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, "product", ProductService, AlertService);
            super.setEntityName("Produto");

            var productId = this.$scope.navigator.$stateParams.productId;
            
            this.findEntity(productId, ()=> { 
                this.populateScope(); 
            });
        }
        
        fetchCategories() {
            this.ProductService.listCategory(
                (successData) => {
                    this.allCategories = successData;
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível carregar as categorias");
                });
        }

        filterCategories(){
            if(this.$scope.entity.category != null)
                this.$scope.categories = this.$filter("filter")(this.allCategories, this.$scope.entity.category);
        }
        
        populateScope() {
            this.$scope.$watch("entity.category", () => {
                this.filterCategories();
            });
            this.$scope.$watch("entity.price + entity.costPrice", () => {
                this.$scope.markUp = 100 * this.ProductService.getMarkUp(this.$scope.entity);
            });
            this.$scope.$watch("entity.id", () => {
                this.$scope.imageUrl = this.ProductService.getImageUrl(this.$scope.entity.id);
            });
            this.fetchCategories();
            this.$scope.saveChanges = (entity) => this.saveChanges(entity);
            this.$scope.removeProduct = (entity) => this.removeEntity(entity);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};