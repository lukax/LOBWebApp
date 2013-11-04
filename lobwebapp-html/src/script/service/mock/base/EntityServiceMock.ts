///<reference path="./../../../reference.d.ts"/>

export module service.mock.base {
    export class AbstractEntityService<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {
        private repository: T[];

        constructor(public $timeout: ng.ITimeoutService, public _: _<T>) {
            this.repository = new Array<T>();
        }

        public save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    if (entity.id != 0) errorCallback({message: "ID Inválido"}, 403, null, null);
                    var storId = 0;
                    this.getRepository().forEach(
                        (item: T) => {
                            if (item.id > storId) storId = item.id;
                        });
                    entity.id = ++storId;
                    this.getRepository().push(angular.copy(entity));

                    successCallback(entity, 200, null, null);
                });
        }

        public update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    if (entity.id == 0) errorCallback({message: "ID Inválido"}, 403, null, null);
                    var success = false;
                    this.getRepository().some(
                        (item: T, index: number) => {
                            if (item.id == entity.id) {
                                this.getRepository()[index] = angular.copy(entity);
                                success = true;
                                successCallback(entity, 200, null, null);
                                return true;
                            }
                            else return false;
                        });
                    if (!success) errorCallback({message: "ID Inexistente"}, 404, null, null);
                }, 100);
        }

        public remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var success = false;
                    this.getRepository().some(
                        (item: T, index: number) => {
                            if (item.id == entity.id) {
                                this.getRepository().splice(index, 1);
                                success = true;
                                successCallback(entity, 200, null, null);
                                return true;
                            }
                            else return false;
                        });
                    if (!success) errorCallback({message: "ID Inexistente"}, 404, null, null);
                }, 100);
        }

        public find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var success = false;
                    var retrievedEntity = <T>{};
                    this.getRepository().some(
                        (item: T) => {
                            if (item.id == id) {
                                angular.copy(item, retrievedEntity);
                                success = true;
                                return true;
                            }
                            return false;
                        });
                    if (success) successCallback(retrievedEntity, 200, null, null);
                    else errorCallback({ message: "ID Inexistente" }, 404, null, null);
                }, 100);
        }

        public list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    successCallback(angular.copy(this.getRepository()), 200, null, null);
                }, 1000);
        }

        public contains(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var success = false;
                    this.getRepository().some((x: T) => {
                       if(_.isEqual(entity, x)) {
                           success = true;
                           return true;
                       }
                       return false;
                    });

                    if(success) successCallback(true, 200, null, null);
                    else errorCallback({message: "Entidade Inexistente"}, 200, null, null);
                }, 100);
        }

        public getRepository() {
            return this.repository;
        }
    }
}