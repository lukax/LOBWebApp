///<reference path="../../reference.d.ts"/>
import _ = require("underscore");

class EntityServiceMock<T extends domain.base.AbstractEntity> implements service.contract.base.EntityService<T> {
    private repository: T[];

    constructor(public $timeout: ng.ITimeoutService) {
        this.repository = new Array<T>();
    }

    save(entity: T,
        successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            if (entity.id != 0) errorCallback({ message: "ID Inválido" }, 403, () => "", null);
            var storId = 0;
            this.getRepository().forEach(
                (x: T) => {
                    if (x.id > storId) storId = x.id;
                });
            entity.id = ++storId;
            this.getRepository().push(angular.fromJson(angular.toJson(entity)));

            successCallback(entity, 200, (s) => {
                if (s == "Entity-Id")
                    return String(entity.id);
                return "";
            }, null);
        }, 1000);
    }

    update(entity: T,
        successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            if (entity.id == 0) errorCallback({ message: "ID Inválido" }, 403, () => "", null);
            var success = false;
            this.getRepository().some(
                (item: T, index: number) => {
                    if (item.id == entity.id) {
                        this.getRepository()[index] = angular.fromJson(angular.toJson(entity));
                        success = true;
                        successCallback(entity, 200, () => "", null);
                        return true;
                    }
                    else return false;
                });
            if (!success) errorCallback({ message: "ID Inexistente" }, 404, () => "", null);
        }, 1000);
    }

    remove(entity: T,
        successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            var success = false;
            this.getRepository().some(
                (item: T, index: number) => {
                    if (item.id == entity.id) {
                        this.getRepository().splice(index, 1);
                        success = true;
                        successCallback(entity, 200, () => "", null);
                        return true;
                    }
                    else return false;
                });
            if (!success) errorCallback({ message: "ID Inexistente" }, 404, () => "", null);
        }, 1000);
    }

    find(id: number,
        successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            var success = false;
            var retrievedEntity = <T>{};
            this.getRepository().some(
                (item: T) => {
                    if (item.id == id) {
                        retrievedEntity = angular.fromJson(angular.toJson(item));
                        success = true;
                        return true;
                    }
                    return false;
                });
            if (success) successCallback(retrievedEntity, 200, () => "", null);
            else errorCallback({ message: "ID Inexistente" }, 404, () => "", null);
        });
    }

    list(
        successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        pageable?: domain.util.Page) {
        this.$timeout(() => {
            var repo = angular.fromJson(angular.toJson(this.getRepository()));
            if (pageable) {
                repo.splice(0, pageable.index);
                repo.splice(pageable.index + pageable.size, repo.length - 1);
            }
            successCallback(repo, 200, (h) => { if (h == "page_total") return "" + pageable.size; }, null);
        }, 1000);
    }

    exists(entity: T,
        successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            var success = false;
            this.getRepository().some((x: T) => {
                if (_.isEqual(entity, x)) {
                    success = true;
                    return true;
                }
                return false;
            });

            if (success) successCallback(true, 200, () => "", null);
            else errorCallback({ message: "Entidade Inexistente" }, 200, (h) => "", { method: "", url: "" });
        }, 100);
    }

    getRepository() {
        return this.repository;
    }

    addToRepository(entity: T) {
      this.repository.push(angular.fromJson(angular.toJson(entity)));
    }
}
export = EntityServiceMock;
