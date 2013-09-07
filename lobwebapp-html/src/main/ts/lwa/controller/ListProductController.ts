///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>

module lwa.controller{
    import domain = lwa.domain;
    
    export interface ListProductViewModel extends ng.IScope {
        alerts: domain.util.Alert[];
        product: domain.Product;
        products: domain.Product[];
        editProduct: (id: number) => void;
        findProduct: (searchText: string) => void;
        findProductModal: () => void;
    }
    
    export class ListProductController {
        private scope: ListProductViewModel;
        private location: ng.ILocationService;
        private routeParams: any;
        private productService: service.contract.ProductService;
        private alertService: service.contract.util.AlertService;
        private modalService: any;

        constructor($scope: ListProductViewModel, 
                    $location: ng.ILocationService, 
                    $routeParams: ng.IRouteParamsService,
                    _productService: service.contract.ProductService, 
                    _alertService: service.contract.util.AlertService,
                    $ekathuwa: any){
            this.scope = $scope;
            this.location = $location;
            this.routeParams = $routeParams;
            this.productService = _productService;
            this.alertService = _alertService;
            this.modalService = $ekathuwa;

            this.populateScope();
            this.listProducts();
            this.processArgs();
        }

        listProducts(){
            this.productService.list(
                (successData, successStatus) => {
                    this.scope.products = successData;
            }, (errorData, errorStatus) => {
                    this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Lista de Produtos não pode ser carregada'));
            });
        }

        editProduct(id: number){
            this.location.url('/product/' + id);
        }

        findProduct(searchText?: string) { 
            if(!isNaN(Number(searchText))){ this.location.url('/product/'+searchText); }  
            else { 
               this.productService.findByName(searchText,
                       (successData, successStatus) => { this.location.url('/product/'+successData[0].id); },
                       (errorData, errorStatus) => { 
                           this.alertService.add(new domain.util.Alert(domain.util.AlertType.warning, 'Código: '+errorStatus, 'Produto com o ID/Nome especificado não foi encontrado'));
                       });
           }
        }

        processArgs(){
            var findParam = this.routeParams.find;
             if(findParam){ // cobre: 'x', '1'
                if(!isNaN(Number(findParam))){ this.location.url('/product/'+findParam); }  
                else { 
                   this.productService.findByName(findParam,
                           (successData, successStatus) => { this.location.url('/product/'+successData[0].id); },
                           (errorData, errorStatus) => { 
                               this.alertService.add(new domain.util.Alert(domain.util.AlertType.warning, 'Código: '+errorStatus, 'Produto com o ID/Nome especificado não foi encontrado'));
                           });
                }
            }else if(findParam == ''){ // cobre: '', undefined
                this.scope.findProductModal();
            }
            
        }

        populateScope(){
            this.scope.alerts = this.alertService.list();
            this.scope.editProduct = (id: number) => { this.editProduct(id); };
            this.scope.findProduct = (searchText: string) => { this.findProduct(searchText); }
            this.scope.findProductModal = () => {
                this.modalService.modal({
                        id: 'findProductModalId',
                        templateURL: 'views/product/modal/findProductModal.html',
                        scope: this.scope
                    });
            }
        }

    }
    
}