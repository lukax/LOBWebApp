///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.stock {
    export interface EditStockViewModel extends i0.controller.base.EditEntityViewModel<domain.Stock> {
        saveChanges: (stock: domain.Stock) => void;
        removeStock: (stock: domain.Stock) => void;
        fetchProduct: (productId: number) => void;
        invalid: any;
    }

    export class EditStockController extends i0.controller.base.AbstractEditEntityController<domain.Stock> {

        static $inject = ["$scope", "StockService", "ProductService", "AlertService"];
        constructor(public $scope: EditStockViewModel,
                    public StockService: d.service.contract.StockService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, "stock", StockService, AlertService);
            
            var stockId = this.$scope.navigator.$stateParams.stockId;
            var productId = this.$scope.navigator.$stateParams.productId;
            this.findEntity(stockId || 0, ()=>{
                if(productId != null) this.fetchProduct(productId);
                this.populateScope();
                this.setupValidations();
            });
        }

        fetchProduct(id: number) {
            if(id == null) return;
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    this.$scope.entity.product = successData;
                    this.unlock();
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.add({ title: "Não foi possível buscar produto", content: errorData.message, type: enums.AlertType.WARNING });
                    this.unlock();
                });
        }

        setupValidations(){
            this.$scope.invalid = {};
            this.$scope.$watch("entity.quantity", ()=>{
                this.$scope.invalid.quantity = this.$scope.entity.quantity < this.$scope.entity.minQuantity;
            });
            this.$scope.$watch("entity.minQuantity", ()=>{
                this.$scope.invalid.minQuantity = this.$scope.entity.minQuantity >= this.$scope.entity.maxQuantity;
            });
            this.$scope.$watch("entity.maxQuantity", ()=>{
                this.$scope.invalid.maxQuantity = this.$scope.entity.maxQuantity <= this.$scope.entity.minQuantity;
            });
        }

        populateScope() {
            this.$scope.saveChanges = (stock) => this.saveChanges(stock);
            this.$scope.removeStock = (stock) => this.removeEntity(stock);
            this.$scope.fetchProduct = (productId) => this.fetchProduct(productId);
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditStockController", controller.stock.EditStockController);
};