///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.customer {
    export interface IEditCustomerController extends i0.controller.base.IEditEntityController<domain.Customer> {
    }

    export class EditCustomerController extends i0.controller.base.AbstractEditEntityController<domain.Customer> implements IEditCustomerController {
        static $inject = ["$scope", "CustomerService", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public CustomerService: d.service.contract.CustomerService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, CustomerService, AlertService, "/customer", "Cliente");
            
            this.findEntity(this.$scope.navigator.params().customerId);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditCustomerController", controller.customer.EditCustomerController);
};