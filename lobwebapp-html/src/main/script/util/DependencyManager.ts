///<reference path="./../reference.d.ts"/>

import p = require("./Progress");

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService){

        }

        public resolve(paths: string[]) {
            var deferred = this.$q.defer();
            p.util.Progress.start();

            require(paths, () =>
            {
                this.$rootScope.$apply(() =>
                {
                    deferred.resolve();
                    console.log("Dependency Manager: resolved " + paths);
                    p.util.Progress.done();
                });
            });

            return deferred.promise;
        }

    }
}