///<reference path="../reference.d.ts"/>

export module directive {
    export class EntityIdDirective implements ng.IDirective {
        restrict = "E";
        templateUrl = "/template/directive/EntityIdTemplate.html";
    }

    export class SaveChangesDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            disabled: "=",
            saveDisabled: "=",
            removeDisabled: "=",
            discardDisabled: "=",
            onRemove: "&",
            onDiscard: "&"
        };
        templateUrl = "/template/directive/SaveChangesTemplate.html";
    }

    export class FormItemDirective implements ng.IDirective {
    	restrict = "E";
    	transclude = true;
    	scope = {
    		inputId: "@",
    		inputColumn: "@",
    		inputLabel: "@",
    		form: "="
    	};
    	templateUrl = "/template/directive/FormItemTemplate.html";
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("entityId", [() => new directive.EntityIdDirective()]);
	angular.module(moduleName).lazy.directive("saveChanges", [() => new directive.SaveChangesDirective()]);
    angular.module(moduleName).lazy.directive("formItem", [() => new directive.FormItemDirective()]);
};