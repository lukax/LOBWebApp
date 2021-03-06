///<reference path="../../reference.d.ts"/>
import EntityServiceImpl = require("../../lwa.core/service/EntityServiceImpl");

class CustomerServiceImpl extends EntityServiceImpl<domain.Customer>
    implements service.contract.CustomerService, service.contract.base.HasDefaultValue<domain.Customer> {

    static $inject = ["$http"];
    constructor($http: ng.IHttpService) {
        super("customer", $http, this);
    }

    getDefault(): domain.Customer {
        return { id: 0, name: "" };
    }
}
export = CustomerServiceImpl;
