///<reference path="./../../../reference.d.ts"/>
import i0 = require("script/service/mock/UserServiceMock");
import _ = require("underscore");

describe("service: UserService", () => {
    beforeEach(() => {
        angular.module("app",[])
            .constant("_", _)
            .service("UserService", i0.service.mock.UserServiceMock)
        ;
        module("app");
    });

    it("should find a user by username", (inject(($timeout: ng.ITimeoutService, UserService:d.service.contract.UserService) => {
        UserService.save(<domain.User>{id: 0, username: "user 1", password: "123456"}, ()=> {}, ()=> {});
        $timeout.flush();
        var spy = jasmine.createSpy("user");
        UserService.findByUsername("user 1", spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0].username).toBe("user 1");
    })));
});