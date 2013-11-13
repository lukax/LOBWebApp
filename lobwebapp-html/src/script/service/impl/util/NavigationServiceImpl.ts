///<reference path="./../../../reference.d.ts"/>

import svcu = d.service.contract.util;
import p = require("./../../../util/Progress");

export module service.impl.util {
    export class NavigationServiceImpl implements d.service.contract.util.NavigationService {

        public progress: d.service.contract.util.Progress;

        static $inject = ['$location', '$stateParams'];
        constructor(public $location: ng.ILocationService, public $stateParams: ng.ui.IStateParams) {
            this.progress = p.util.Progress;
        }

        params() {
            return this.$stateParams;
        }

        navigateTo(url: string){
            this.$location.url(url);
        }

        navigate(viewId: string, arg?: string) {
            switch (viewId) {
                case 'product_list':
                    this.$location.url('/product/list');
                    break;
                case 'product_new':
                    this.$location.url('/product/new');
                    break;
                case 'product_view':
                    this.$location.url('/product/' + arg);
                    break;

                case 'user_auth':
                    this.$location.url('/user/auth');
                    break;
                case 'user_status':
                    this.$location.url('/user/status');
                    break;

                default:
                    return this.$location.url();
            }
            return;
        }
        
        
    }
}