///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module module{
    export class ServiceModule{
        private serviceNgModule: ng.IModule;
        
        constructor(){
            this.serviceNgModule = angular.module('lwServiceModule',[]);
        }
        
        configure(){
            this.serviceNgModule
                .service('_productService', ['$timeout', ($timeout: ng.ITimeoutService) => new service.mock.DefaultProductServiceMock($timeout)])
                .service('_alertService', () => new service.impl.util.DefaultAlertService())
                ;
            return this;
        }
    }
}