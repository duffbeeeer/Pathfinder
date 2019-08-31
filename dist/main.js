(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_guards/index.ts":
/*!**********************************!*\
  !*** ./src/app/_guards/index.ts ***!
  \**********************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });




/***/ }),

/***/ "./src/app/_helpers/error.interceptor.ts":
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");





var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                _this.authenticationService.logout();
                location.reload(true);
            }
            var error = err.error.message || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
        }));
    };
    ErrorInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/_helpers/fake-backend.ts":
/*!******************************************!*\
  !*** ./src/app/_helpers/fake-backend.ts ***!
  \******************************************/
/*! exports provided: FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return FakeBackendInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return fakeBackendProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor() {
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        var users = [
            { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }
        ];
        var authHeader = request.headers.get('Authorization');
        var isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        // wrap in delayed observable to simulate server api call
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function () {
            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                var user = users.find(function (x) { return x.username === request.body.username && x.password === request.body.password; });
                if (!user)
                    return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: "fake-jwt-token"
                });
            }
            // get all users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (!isLoggedIn)
                    return unauthorised();
                return ok(users);
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["materialize"])())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(500))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["dematerialize"])());
        // private helper functions
        function ok(body) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({ status: 200, body: body }));
        }
        function unauthorised() {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ status: 401, error: { message: 'Unauthorised' } });
        }
        function error(message) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ status: 400, error: { message: message } });
        }
    };
    FakeBackendInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());

var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_helpers/index.ts":
/*!***********************************!*\
  !*** ./src/app/_helpers/index.ts ***!
  \***********************************/
/*! exports provided: ErrorInterceptor, JwtInterceptor, FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.interceptor */ "./src/app/_helpers/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _error_interceptor__WEBPACK_IMPORTED_MODULE_0__["ErrorInterceptor"]; });

/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt.interceptor */ "./src/app/_helpers/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__["JwtInterceptor"]; });

/* harmony import */ var _fake_backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fake-backend */ "./src/app/_helpers/fake-backend.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return _fake_backend__WEBPACK_IMPORTED_MODULE_2__["FakeBackendInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return _fake_backend__WEBPACK_IMPORTED_MODULE_2__["fakeBackendProvider"]; });






/***/ }),

/***/ "./src/app/_helpers/jwt.interceptor.ts":
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");



var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_services/authentication.service.ts ***!
  \*****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(config.apiUrl + "/users/authenticate", { username: username, password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/_services/index.ts":
/*!************************************!*\
  !*** ./src/app/_services/index.ts ***!
  \************************************/
/*! exports provided: AuthenticationService, UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ "./src/app/_services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]; });





/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(config.apiUrl + "/users");
    };
    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home */ "./src/app/home/index.ts");
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_guards */ "./src/app/_guards/index.ts");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ "./src/app/login/index.ts");
/* harmony import */ var _maps_maps_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./maps/maps.component */ "./src/app/maps/maps.component.ts");
/* harmony import */ var _login_registration_registration_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/registration/registration.component */ "./src/app/login/registration/registration.component.ts");








var routes = [
    {
        path: '',
        component: _login__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
    },
    {
        path: 'home',
        component: _home__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        canActivate: [_guards__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    },
    {
        path: 'maps',
        component: _maps_maps_component__WEBPACK_IMPORTED_MODULE_6__["MapsComponent"]
    },
    {
        path: 'register',
        component: _login_registration_registration_component__WEBPACK_IMPORTED_MODULE_7__["RegistrationComponent"]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- main app container -->\r\n<router-outlet></router-outlet>\r\n\r\n<!-- credits -->\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_services */ "./src/app/_services/index.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    AppComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home */ "./src/app/home/index.ts");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login */ "./src/app/login/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_helpers */ "./src/app/_helpers/index.ts");
/* harmony import */ var _navigation_navigation_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./navigation/navigation.module */ "./src/app/navigation/navigation.module.ts");
/* harmony import */ var _maps_maps_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./maps/maps.module */ "./src/app/maps/maps.module.ts");
/* harmony import */ var _augmented_augmented_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./augmented/augmented.module */ "./src/app/augmented/augmented.module.ts");
/* harmony import */ var _score_score_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./score/score.module */ "./src/app/score/score.module.ts");
/* harmony import */ var _shared_geolocation_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/geolocation.service */ "./src/app/shared/geolocation.service.ts");
/* harmony import */ var _login_registration_registration_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./login/registration/registration.component */ "./src/app/login/registration/registration.component.ts");
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _navigation_navigation_module__WEBPACK_IMPORTED_MODULE_10__["NavigationModule"],
                _maps_maps_module__WEBPACK_IMPORTED_MODULE_11__["MapsModule"],
                _augmented_augmented_module__WEBPACK_IMPORTED_MODULE_12__["AugmentedModule"],
                _score_score_module__WEBPACK_IMPORTED_MODULE_13__["ScoreModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _home__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _login__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _login_registration_registration_component__WEBPACK_IMPORTED_MODULE_15__["RegistrationComponent"]
            ],
            providers: [
                { provide: _shared_geolocation_service__WEBPACK_IMPORTED_MODULE_14__["GeolocationService"], useClass: _shared_geolocation_service__WEBPACK_IMPORTED_MODULE_14__["GeolocationService"] },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_9__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_9__["ErrorInterceptor"], multi: true },
                // provider used to create fake backend
                _helpers__WEBPACK_IMPORTED_MODULE_9__["fakeBackendProvider"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/augmented/augmented.component.html":
/*!****************************************************!*\
  !*** ./src/app/augmented/augmented.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<webcam class=\"text-center\" (initError)=\"handleInitError($event)\" [width]=\"screenWidth\" [height]=\"screenHeight\"\r\n  [switchCamera]=\"nextWebcamObservable\" allowSwitchCamera=\"false\">\r\n</webcam>\r\n<a-scene #AFRAME embedded vr-mode-ui=\"enabled: false\" [ngStyle]=\"{'width': screenWidth+'px', 'height': screenHeight-60+'px'}\">\r\n  <!-- <a-camera wasd-controls-enabled=\"false\" >\r\n    <a-cursor material=\"color: #00ffff\" position=\"0 0.07 -0.3\" scale=\" 0.4 0.4 0.4\"></a-cursor>\r\n  </a-camera> -->\r\n  \r\n  <a-entity camera look-controls look-controls=\"touchEnabled: false\">\r\n    <a-entity #cursor\r\n              cursor=\"fuse: false\"\r\n              position=\"0 0.07 -0.3\"\r\n              raycaster=\"direction: 0 0.25 -1\"\r\n              geometry=\"primitive: ring; radiusInner: 0.009; radiusOuter: 0.017\"\r\n              material=\"color: #00ffff; shader: flat\">\r\n    </a-entity>\r\n  </a-entity>\r\n  \r\n  <!-- <a-entity id=\"box\" cursor-listener geometry=\"primitive: box\" material=\"color: blue\"></a-entity> -->\r\n  \r\n\r\n\r\n  \r\n  <a-entity class=\"collidable\"#coinBlock  [attr.position]=\"{x: 0, y: height, z: 0} | aframe\" cursor-listener>\r\n    <a-gltf-model\r\n      src=\"../../assets/models/CoinBlock.gltf.glb\"  \r\n      position=\"0 0 -1\"\r\n      scale=\"0.002 0.002 0.002\"\r\n      >\r\n    </a-gltf-model>\r\n  </a-entity>\r\n\r\n\r\n  <a-entity light=\"color: #ffffff; intensity: 1\" position=\"-1 1 0\"></a-entity>\r\n  <a-entity light=\"color: #ffffff; intensity: 1\" position=\"1 1 0\"></a-entity>\r\n  <a-entity light=\"color: #ffffff; intensity: 1\" position=\"0 -1 2\"></a-entity>\r\n  <a-entity light=\"color: #ffffff; intensity: 1\" position=\"0 -1 -2\"></a-entity>\r\n  <!-- <a-box position=\"-1 0.5 -3\" rotation=\"0 45 0\" color=\"#4CC3D9\"></a-box> -->\r\n</a-scene>\r\n<!-- <a-scene>\r\n    <a-box position=\"-1 0.5 -3\" rotation=\"0 45 0\" color=\"#4CC3D9\"\r\n           event-set__enter=\"_event: mouseenter; color: #8FF7FF\"\r\n           event-set__leave=\"_event: mouseleave; color: #4CC3D9\"></a-box>\r\n    \r\n    <a-sphere position=\"0 1.25 -5\" radius=\"1.25\" color=\"#EF2D5E\"\r\n              event-set__down=\"_event: mousedown; scale: 1.2 1.2 1.2\"\r\n              event-set__up=\"_event: mouseup; scale: 1 1 1\"\r\n              event-set__leave=\"_event: mouseleave; scale: 1 1 1\"></a-sphere>\r\n    \r\n    <a-cylinder position=\"1 0.75 -3\" radius=\"0.5\" height=\"1.5\" color=\"#FFC65D\"\r\n                event-set__enter=\"_event: mouseenter; _target: #cylinderText; visible: true\"\r\n                event-set__leave=\"_event: mouseleave; _target: #cylinderText; visible: false\">\r\n      <a-text id=\"cylinderText\" value=\"This is a cylinder\" align=\"center\" color=\"#FFF\" visible=\"false\" position=\"0 -0.55 0.55\"\r\n              geometry=\"primitive: plane; width: 1.75\" material=\"color: #333\"></a-text>\r\n    </a-cylinder>\r\n    \r\n    \r\nl      \r\n    <a-camera>\r\n      <a-cursor></a-cursor>\r\n    </a-camera>\r\n    \r\n  </a-scene> -->\r\n  "

/***/ }),

/***/ "./src/app/augmented/augmented.component.scss":
/*!****************************************************!*\
  !*** ./src/app/augmented/augmented.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".webcamContainer {\n  background-color: grey; }\n\nwebcam {\n  background-color: black; }\n\na-scene {\n  position: fixed;\n  top: 120px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXVnbWVudGVkL0M6XFxkZXZcXFBhdGhmaW5kZXIvc3JjXFxhcHBcXGF1Z21lbnRlZFxcYXVnbWVudGVkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCLEVBQUE7O0FBRXhCO0VBQ0UsdUJBQXVCLEVBQUE7O0FBT3pCO0VBQ0UsZUFBZTtFQUNmLFVBQVUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2F1Z21lbnRlZC9hdWdtZW50ZWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2ViY2FtQ29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG59XHJcbndlYmNhbSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbn1cclxuLy8gQG1lZGlhKG9yaWVudGF0aW9uOmxhbmRzY2FwZSl7XHJcbi8vICAgICB3ZWJjYW17XHJcbi8vICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbi8vICAgICB9XHJcbi8vIH1cclxuYS1zY2VuZSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMTIwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/augmented/augmented.component.ts":
/*!**************************************************!*\
  !*** ./src/app/augmented/augmented.component.ts ***!
  \**************************************************/
/*! exports provided: AugmentedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AugmentedComponent", function() { return AugmentedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_webcam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webcam */ "./node_modules/ngx-webcam/fesm5/ngx-webcam.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




__webpack_require__(/*! aframe-event-set-component */ "./node_modules/aframe-event-set-component/dist/aframe-event-set-component.js");
var AugmentedComponent = /** @class */ (function () {
    function AugmentedComponent(hostElement) {
        this.hostElement = hostElement;
        this.nextWebcam = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.multipleWebcamsAvailable = false;
        this.aframe = window.AFRAME;
        this.positions = [
            { x: 0, y: 0, z: 0 },
            { x: 0.2, y: 0, z: 0 },
            { x: 0.4, y: 0, z: 0 },
            { x: 0.6, y: 0, z: 0 },
            { x: 0.8, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
        ];
    }
    AugmentedComponent.prototype.ngAfterViewInit = function () {
        console.log(this.coinBlock);
    };
    AugmentedComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.aframed);
        // console.log(this.coinBlock.nativeElement)
        ngx_webcam__WEBPACK_IMPORTED_MODULE_2__["WebcamUtil"].getAvailableVideoInputs()
            .then(function (mediaDevices) {
            _this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        });
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight - 90;
        console.log("Screen Width: " + this.screenWidth + " Screen Height: " + this.screenHeight);
        // this.aframed.registerComponent('cursor-listener',{
        //   init: function () {
        //     var lastIndex = -1;
        //     var COLORS = ['red', 'green', 'blue'];
        //     this.el.addEventListener('click', function (evt) {
        //       lastIndex = (lastIndex + 1) % COLORS.length;
        //       this.object3D.position.set(0, 0.5, 0);
        //       console.log('I was clicked at: ', evt.detail.intersection.point);
        //     });
        //   }
        // });
        this.aframe.registerComponent('cursor-listener', {
            init: function () {
                console.log(_this.coinBlock);
                _this.coinBlock.nativeElement.addEventListener('click', function (evt) {
                    _this.onHit(_this.rngPosition());
                    console.log('I was clicked at: ', evt.detail.intersection.point);
                });
                _this.coinBlock.nativeElement.addEventListener('mouseenter', function () {
                    console.log("#FF000F");
                    _this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F');
                });
                _this.coinBlock.nativeElement.addEventListener('mouseleave', function () {
                    console.log("#FF000F");
                    _this.cursor.nativeElement.setAttribute('material', 'color', '#00ffff');
                });
            }
        });
    };
    AugmentedComponent.prototype.rngPosition = function () {
        console.log(this.positions.length);
        this.rngIndex = Math.floor((Math.random() * this.positions.length));
        return this.positions[this.rngIndex];
    };
    AugmentedComponent.prototype.onHit = function (newPosition) {
        this.coinBlock.nativeElement.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
    };
    AugmentedComponent.prototype.handleInitError = function (error) {
        if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
            console.warn("Camera access was not allowed by user!");
        }
    };
    AugmentedComponent.prototype.randomPosition = function () {
        console.log("yay");
        return "_event: mouseup; position: 0.003 0.003 0.003";
    };
    Object.defineProperty(AugmentedComponent.prototype, "nextWebcamObservable", {
        get: function () {
            return this.nextWebcam.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AugmentedComponent.prototype.showNextWebcam = function (directionOrDeviceId) {
        // true => move forward through devices
        // false => move backwards through devices
        // string => move to device with given deviceId
        console.log(directionOrDeviceId + "-.-");
        this.nextWebcam.next(directionOrDeviceId);
    };
    AugmentedComponent.prototype.cameraWasSwitched = function (deviceId) {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('coinBlock'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AugmentedComponent.prototype, "coinBlock", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('cursor'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AugmentedComponent.prototype, "cursor", void 0);
    AugmentedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-augmented',
            template: __webpack_require__(/*! ./augmented.component.html */ "./src/app/augmented/augmented.component.html"),
            styles: [__webpack_require__(/*! ./augmented.component.scss */ "./src/app/augmented/augmented.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]])
    ], AugmentedComponent);
    return AugmentedComponent;
}());



/***/ }),

/***/ "./src/app/augmented/augmented.module.ts":
/*!***********************************************!*\
  !*** ./src/app/augmented/augmented.module.ts ***!
  \***********************************************/
/*! exports provided: AugmentedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AugmentedModule", function() { return AugmentedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _augmented_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./augmented.component */ "./src/app/augmented/augmented.component.ts");
/* harmony import */ var ngx_webcam__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webcam */ "./node_modules/ngx-webcam/fesm5/ngx-webcam.js");
/* harmony import */ var angular_aframe_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-aframe-pipe */ "./node_modules/angular-aframe-pipe/esm5/angular-aframe-pipe.js");






var AugmentedModule = /** @class */ (function () {
    function AugmentedModule() {
    }
    AugmentedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_augmented_component__WEBPACK_IMPORTED_MODULE_3__["AugmentedComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ngx_webcam__WEBPACK_IMPORTED_MODULE_4__["WebcamModule"],
                angular_aframe_pipe__WEBPACK_IMPORTED_MODULE_5__["AframePipeModule"]
            ],
            exports: [_augmented_component__WEBPACK_IMPORTED_MODULE_3__["AugmentedComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AugmentedModule);
    return AugmentedModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation activateMaps=onActivateMaps() activateAugmented=onActivateAugmented()></app-navigation>\r\n<app-maps *ngIf=\"isMapsActive\" [currentPosition]=\"currentPosition$ | async\"></app-maps>\r\n<app-augmented *ngIf=\"isAugmentedActive\"></app-augmented>\r\n<app-score></app-score>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_active_view_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/active-view.model */ "./src/app/shared/active-view.model.ts");
/* harmony import */ var _shared_geolocation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/geolocation.service */ "./src/app/shared/geolocation.service.ts");




var HomeComponent = /** @class */ (function () {
    function HomeComponent(geolocationService) {
        this.geolocationService = geolocationService;
        this.view = _shared_active_view_model__WEBPACK_IMPORTED_MODULE_2__["View"];
        this.currentPosition$ = this.geolocationService.getCurrentPosition();
        this.currentPosition$.subscribe(function (x) { return console.log(x); });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.currentView = _shared_active_view_model__WEBPACK_IMPORTED_MODULE_2__["initialView"];
    };
    HomeComponent.prototype.onActivateMaps = function () {
        this.currentView.activeView = this.view.MapsComponent;
    };
    HomeComponent.prototype.onActivateAugmented = function () {
        this.currentView.activeView = this.view.AugmentedComponent;
    };
    Object.defineProperty(HomeComponent.prototype, "isMapsActive", {
        get: function () {
            return this.currentView.activeView === this.view.MapsComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "isAugmentedActive", {
        get: function () {
            return this.currentView.activeView === this.view.AugmentedComponent;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_geolocation_service__WEBPACK_IMPORTED_MODULE_3__["GeolocationService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/home/index.ts":
/*!*******************************!*\
  !*** ./src/app/home/index.ts ***!
  \*******************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]; });




/***/ }),

/***/ "./src/app/login/index.ts":
/*!********************************!*\
  !*** ./src/app/login/index.ts ***!
  \********************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });




/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"alert alert-info\">\r\n    Username: test<br />\r\n    Password: test\r\n</div> -->\r\n<div class=\"jumbotron color-theme\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-6 offset-3\">\r\n\r\n        <img class=\"img-fluid\" style=\"height:142;width:421px\" src=\"../../Pathfinder/assets/images/pathfinder-logo.png\">\r\n        <img class=\"img-fluid\" src=\"../../Pathfinder/assets/images/MuC2019.png\">\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-6 offset-3\">\r\n\r\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\r\n          <div class=\"form-group\">\r\n            <label for=\"username\" class=\"color-theme\">Playername</label>\r\n            <input type=\"text\" formControlName=\"username\" class=\"form-control\"\r\n              [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\r\n            <div *ngIf=\"submitted && !!f.username.errors\" class=\"invalid-feedback\">\r\n              <div *ngIf=\"!!f.username.errors.required\">Playername is required</div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"password\" class=\"color-theme\">Password</label>\r\n            <input type=\"password\" formControlName=\"password\" class=\"form-control\"\r\n              [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\r\n            <div *ngIf=\"submitted && !!f.password.errors\" class=\"invalid-feedback\">\r\n              <div *ngIf=\"!!f.password.errors.required\">Password is required</div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <button [disabled]=\"loading\" class=\"btn btn-primary btn-login\">Login</button>\r\n            <button class=\"btn btn-primary btn-register\" [routerLink]=\"['/register']\" routerLinkActive=\"router-link-active\" >Create Player</button>\r\n            <img *ngIf=\"loading\" class=\"pl-2\"\r\n              src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n          </div>\r\n          <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".color-theme {\n  color: white;\n  background-color: black; }\n\n.btn-login {\n  float: left; }\n\n.btn-register {\n  float: right; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vQzpcXGRldlxcUGF0aGZpbmRlci9zcmNcXGFwcFxcbG9naW5cXGxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLFdBQVcsRUFBQTs7QUFHYjtFQUNFLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbG9yLXRoZW1le1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJ0bi1sb2dpbiB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5idG4tcmVnaXN0ZXIge1xyXG4gIGZsb2F0OiByaWdodDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'home';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.router.navigate([this.returnUrl]);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/registration/registration.component.html":
/*!****************************************************************!*\
  !*** ./src/app/login/registration/registration.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron color-theme\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-6 offset-3\">\r\n\r\n        <img class=\"img-fluid\" style=\"height:142;width:421px\" src=\"../../Pathfinder/assets/images/pathfinder-logo.png\">\r\n        <img class=\"img-fluid\" src=\"../../Pathfinder/assets/images/MuC2019.png\">\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-6 offset-3\">\r\n\r\n<form [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"form-group\">\r\n    <label for=\"username\" class=\"color-theme\">Playername</label>\r\n    <input type=\"text\" formControlName=\"username\" class=\"form-control\"\r\n      [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\r\n    <div *ngIf=\"submitted && !!f.username.errors\" class=\"invalid-feedback\">\r\n      <div *ngIf=\"!!f.username.errors.required\">Playername is required</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"password\" class=\"color-theme\">Password</label>\r\n    <input type=\"password\" formControlName=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\"/>\r\n    <div *ngIf=\"!!f.password.invalid && (submitted || !!f.password.touched)\" class=\"alert alert-danger\">\r\n      <div *ngIf=\"!!f.password.errors.required\"> Password is required. </div>\r\n      <div *ngIf=\"!!f.password.errors.pattern\"> Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.</div>\r\n    </div>\r\n   </div>\r\n\r\n   <div class=\"form-group\">\r\n      <label for=\"confirmpassword\" class=\"color-theme\">Confirm Password</label>\r\n    <input type=\"password\" formControlName=\"confirmpassword\" name=\"confirmpassword\" placeholder=\"Confirm Password\" class=\"form-control\"/>\r\n    <div *ngIf=\"!!f.confirmpassword.invalid && (submitted || !!f.confirmpassword.touched)\" class=\"alert alert-danger\">\r\n      <div *ngIf=\"!!f.confirmpassword.errors.required\"> Confirm password is required. </div>\r\n      <div *ngIf=\"!!f.confirmpassword.errors.pattern\"> Password & Confirm Password does not match.</div>\r\n    </div>\r\n   </div>\r\n  <!-- <div class=\"form-group\">\r\n    <label for=\"password\" class=\"color-theme\">Password</label>\r\n    <input type=\"password\" formControlName=\"password\" class=\"form-control\"\r\n      [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\r\n    <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\r\n      <div *ngIf=\"f.password.errors.required\">Password is required</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"password\" class=\"color-theme\">Repeat Password</label>\r\n    <input type=\"password\" formControlName=\"password\" class=\"form-control\"\r\n      [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\r\n    <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\r\n      <div *ngIf=\"f.password.errors.required\">Password is required</div>\r\n    </div>\r\n  </div> -->\r\n  <div class=\"form-group\">\r\n    <button [disabled]=\"loading\" class=\"btn btn-primary btn-login\">Create Player</button>\r\n    <img *ngIf=\"loading\" class=\"pl-2\"\r\n      src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n  </div>\r\n  <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n</form>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/registration/registration.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/login/registration/registration.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".color-theme {\n  color: white;\n  background-color: black; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vcmVnaXN0cmF0aW9uL0M6XFxkZXZcXFBhdGhmaW5kZXIvc3JjXFxhcHBcXGxvZ2luXFxyZWdpc3RyYXRpb25cXHJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWix1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29sb3ItdGhlbWV7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/registration/registration.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/login/registration/registration.component.ts ***!
  \**************************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(router, formBuilder, route) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.route = route;
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')],
            confirmpassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.f.confirmpassword.value)]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'login';
    };
    Object.defineProperty(RegistrationComponent.prototype, "f", {
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrationComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.router.navigate([this.returnUrl]);
    };
    RegistrationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! ./registration.component.html */ "./src/app/login/registration/registration.component.html"),
            styles: [__webpack_require__(/*! ./registration.component.scss */ "./src/app/login/registration/registration.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./src/app/maps/maps.component.html":
/*!******************************************!*\
  !*** ./src/app/maps/maps.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [styles]=\"styles\" [streetViewControl]=\"false\" [zoomControl]=\"false\" [ngStyle]=\"{'width': screenWidth+'px', 'height': screenHeight+'px'}\">\r\n    <agm-direction [origin]=\"origin\" [destination]=\"destination\" [travelMode]=\"travelMode\"></agm-direction>\r\n    <div *ngFor=\"let marker of markers; \">\r\n      <agm-marker [latitude]=\"marker.lat\" [longitude]=\"marker.lng\" [iconUrl]=\"iconUrl\"></agm-marker>\r\n    </div>\r\n  </agm-map>\r\n"

/***/ }),

/***/ "./src/app/maps/maps.component.scss":
/*!******************************************!*\
  !*** ./src/app/maps/maps.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 90vh;\n  width: 100vw; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFwcy9DOlxcZGV2XFxQYXRoZmluZGVyL3NyY1xcYXBwXFxtYXBzXFxtYXBzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLFlBQ0YsRUFBQSIsImZpbGUiOiJzcmMvYXBwL21hcHMvbWFwcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFnbS1tYXAge1xyXG4gIGhlaWdodDogOTB2aDtcclxuICB3aWR0aDogMTAwdndcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/maps/maps.component.ts":
/*!****************************************!*\
  !*** ./src/app/maps/maps.component.ts ***!
  \****************************************/
/*! exports provided: MapsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsComponent", function() { return MapsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _assets_maps_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/maps.style */ "./src/assets/maps.style.ts");



var MapsComponent = /** @class */ (function () {
    function MapsComponent() {
        this.destination = { lat: 53.562699, lng: 9.987803 };
        this.travelMode = 'TRANSIT';
        this.styles = _assets_maps_style__WEBPACK_IMPORTED_MODULE_2__["mapStyles"];
        this.markers = [
            { lat: 53.562136, lng: 9.988778 },
            { lat: 53.560588, lng: 9.990415 },
            { lat: 53.559102, lng: 9.989839 },
            { lat: 53.565019, lng: 10.033581 },
            { lat: 53.566846, lng: 10.031384 },
        ];
        this.iconUrl = {
            url: 'http://torage.github.io/Pathfinder/assets/images/pathfinder-icon.png',
            scaledSize: { height: 32, width: 25 }
        };
    }
    MapsComponent.prototype.ngOnInit = function () {
        // this.updateSubscription = interval(1000).subscribe(
        //   (val) => { this.updateStats();
        // });
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight - 60;
    };
    // ngOnDestroy() {
    //   this.updateSubscription.unsubscribe();
    // }
    MapsComponent.prototype.ngOnChanges = function () {
        if (this.currentPosition) {
            this.origin = { lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude };
            console.log('obs pos ' + this.currentPosition.coords.latitude);
        }
    };
    MapsComponent.prototype.updateStats = function () {
        console.log('I am doing something every second');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MapsComponent.prototype, "currentPosition", void 0);
    MapsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-maps',
            template: __webpack_require__(/*! ./maps.component.html */ "./src/app/maps/maps.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./maps.component.scss */ "./src/app/maps/maps.component.scss")]
        })
    ], MapsComponent);
    return MapsComponent;
}());

// private getUserLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       this.lat = position.coords.latitude;
//       this.lng = position.coords.longitude;
//       this.origin = { lat: this.lat, lng: this.lng };
//       console.log(this.origin.lat);
//     });
//   }
// }


/***/ }),

/***/ "./src/app/maps/maps.module.ts":
/*!*************************************!*\
  !*** ./src/app/maps/maps.module.ts ***!
  \*************************************/
/*! exports provided: MapsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsModule", function() { return MapsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _maps_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maps.component */ "./src/app/maps/maps.component.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var agm_direction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! agm-direction */ "./node_modules/agm-direction/fesm5/agm-direction.js");






var MapsModule = /** @class */ (function () {
    function MapsModule() {
    }
    MapsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_4__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyBoL1fpHu6eozEg-4rvIT2JYrZPT4h5h18'
                }),
                agm_direction__WEBPACK_IMPORTED_MODULE_5__["AgmDirectionModule"]
            ],
            declarations: [
                _maps_component__WEBPACK_IMPORTED_MODULE_3__["MapsComponent"]
            ],
            exports: [
                _maps_component__WEBPACK_IMPORTED_MODULE_3__["MapsComponent"]
            ]
        })
    ], MapsModule);
    return MapsModule;
}());



/***/ }),

/***/ "./src/app/navigation/navigation.component.html":
/*!******************************************************!*\
  !*** ./src/app/navigation/navigation.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-container\">\r\n<div class=\"color-theme row justify-content-around align align-items-center\">\r\n    <div class=\"col-5 no-pad\">\r\n      <img class=\"img-fluid img-muc\" src=\"../../Pathfinder/assets/images/MuC2019.png\" />\r\n    </div>\r\n    <div class=\"col-2 text-center\">\r\n      <button *ngIf=\"isMapsActive\"\r\n        mat-icon-button\r\n         aria-label=\"Example icon-button with a menu\" (click)=\"switchView()\">\r\n        <mat-icon class=\"white-icon\">map</mat-icon>\r\n      </button>\r\n      <button *ngIf=\"!isMapsActive\"\r\n        mat-icon-button\r\n         aria-label=\"Example icon-button with a menu\" (click)=\"switchView()\">\r\n        <mat-icon class=\"red-icon\">videocam</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-5 text-right right-pad\">\r\n      <img class=\"img-fluid img-haw\" src=\"../../Pathfinder/assets/images/haw-logo.png\" />\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/navigation/navigation.component.scss":
/*!******************************************************!*\
  !*** ./src/app/navigation/navigation.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".color-theme {\n  background-color: black;\n  height: 60px;\n  width: 100%;\n  margin: 0; }\n\n.white-icon {\n  color: white; }\n\n.red-icon {\n  color: crimson; }\n\n.img-haw {\n  width: 122px;\n  height: 29px;\n  padding: 0; }\n\n.img-muc {\n  margin: 2px;\n  padding: 0;\n  width: 141px;\n  height: 48px; }\n\n.my-container {\n  margin: 0 auto;\n  width: 100%; }\n\n.no-pad {\n  padding: 0; }\n\n.right-pad {\n  padding-right: 5px;\n  padding-left: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2aWdhdGlvbi9DOlxcZGV2XFxQYXRoZmluZGVyL3NyY1xcYXBwXFxuYXZpZ2F0aW9uXFxuYXZpZ2F0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0VBQ1gsU0FBUyxFQUFBOztBQUVYO0VBQ0UsWUFBWSxFQUFBOztBQUVkO0VBQ0UsY0FBYyxFQUFBOztBQUVoQjtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osVUFBUyxFQUFBOztBQUVYO0VBQ0UsV0FBVztFQUNYLFVBQVM7RUFDVCxZQUFZO0VBQ1osWUFBWSxFQUFBOztBQUVkO0VBQ0UsY0FBYztFQUNkLFdBQVcsRUFBQTs7QUFFYjtFQUNFLFVBQVMsRUFBQTs7QUFFWDtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb2xvci10aGVtZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4ud2hpdGUtaWNvbiB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5yZWQtaWNvbiB7XHJcbiAgY29sb3I6IGNyaW1zb247XHJcbn1cclxuLmltZy1oYXcge1xyXG4gIHdpZHRoOiAxMjJweDtcclxuICBoZWlnaHQ6IDI5cHg7XHJcbiAgcGFkZGluZzowO1xyXG59XHJcbi5pbWctbXVjIHtcclxuICBtYXJnaW46IDJweDtcclxuICBwYWRkaW5nOjA7XHJcbiAgd2lkdGg6IDE0MXB4O1xyXG4gIGhlaWdodDogNDhweDtcclxufVxyXG4ubXktY29udGFpbmVyIHtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4ubm8tcGFke1xyXG4gIHBhZGRpbmc6MDtcclxufVxyXG4ucmlnaHQtcGFke1xyXG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/navigation/navigation.component.ts":
/*!****************************************************!*\
  !*** ./src/app/navigation/navigation.component.ts ***!
  \****************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_active_view_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/active-view.model */ "./src/app/shared/active-view.model.ts");





var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.view = _shared_active_view_model__WEBPACK_IMPORTED_MODULE_4__["View"];
        this.activateMaps = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.activateAugmented = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    NavigationComponent.prototype.ngOnInit = function () {
        this.currentView = _shared_active_view_model__WEBPACK_IMPORTED_MODULE_4__["initialView"];
    };
    NavigationComponent.prototype.onActivateMaps = function () {
        this.activateMaps.emit();
    };
    NavigationComponent.prototype.onActivateAugmented = function () {
        this.activateAugmented.emit();
    };
    NavigationComponent.prototype.switchView = function () {
        if (this.currentView.activeView === this.view.MapsComponent) {
            this.currentView.activeView = this.view.AugmentedComponent;
            this.onActivateAugmented();
            console.log('switching to augmented');
        }
        else {
            this.currentView.activeView = this.view.MapsComponent;
            this.onActivateMaps();
            console.log('switching to maps');
        }
    };
    NavigationComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    Object.defineProperty(NavigationComponent.prototype, "isMapsActive", {
        get: function () {
            return this.currentView.activeView === this.view.MapsComponent;
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], NavigationComponent.prototype, "activateMaps", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], NavigationComponent.prototype, "activateAugmented", void 0);
    NavigationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navigation',
            template: __webpack_require__(/*! ./navigation.component.html */ "./src/app/navigation/navigation.component.html"),
            styles: [__webpack_require__(/*! ./navigation.component.scss */ "./src/app/navigation/navigation.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], NavigationComponent);
    return NavigationComponent;
}());



/***/ }),

/***/ "./src/app/navigation/navigation.module.ts":
/*!*************************************************!*\
  !*** ./src/app/navigation/navigation.module.ts ***!
  \*************************************************/
/*! exports provided: NavigationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationModule", function() { return NavigationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _navigation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation.component */ "./src/app/navigation/navigation.component.ts");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");









var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__["MatButtonToggleModule"],
            ],
            declarations: [_navigation_component__WEBPACK_IMPORTED_MODULE_3__["NavigationComponent"]],
            exports: [_navigation_component__WEBPACK_IMPORTED_MODULE_3__["NavigationComponent"]]
        })
    ], NavigationModule);
    return NavigationModule;
}());



/***/ }),

/***/ "./src/app/score/score-compact-view/score-compact-view.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/score/score-compact-view/score-compact-view.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  score-compact-view works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/score/score-compact-view/score-compact-view.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/score/score-compact-view/score-compact-view.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Njb3JlL3Njb3JlLWNvbXBhY3Qtdmlldy9zY29yZS1jb21wYWN0LXZpZXcuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/score/score-compact-view/score-compact-view.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/score/score-compact-view/score-compact-view.component.ts ***!
  \**************************************************************************/
/*! exports provided: ScoreCompactViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreCompactViewComponent", function() { return ScoreCompactViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ScoreCompactViewComponent = /** @class */ (function () {
    function ScoreCompactViewComponent() {
    }
    ScoreCompactViewComponent.prototype.ngOnInit = function () {
    };
    ScoreCompactViewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-score-compact-view',
            template: __webpack_require__(/*! ./score-compact-view.component.html */ "./src/app/score/score-compact-view/score-compact-view.component.html"),
            styles: [__webpack_require__(/*! ./score-compact-view.component.scss */ "./src/app/score/score-compact-view/score-compact-view.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ScoreCompactViewComponent);
    return ScoreCompactViewComponent;
}());



/***/ }),

/***/ "./src/app/score/score-detail-view/score-detail-view.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/score/score-detail-view/score-detail-view.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let player of players\">\r\n    <button mat-menu-item>{{player.username}}: {{player.score}} Pts.</button>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/score/score-detail-view/score-detail-view.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/score/score-detail-view/score-detail-view.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Njb3JlL3Njb3JlLWRldGFpbC12aWV3L3Njb3JlLWRldGFpbC12aWV3LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/score/score-detail-view/score-detail-view.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/score/score-detail-view/score-detail-view.component.ts ***!
  \************************************************************************/
/*! exports provided: ScoreDetailViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreDetailViewComponent", function() { return ScoreDetailViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ScoreDetailViewComponent = /** @class */ (function () {
    function ScoreDetailViewComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ScoreDetailViewComponent.prototype, "players", void 0);
    ScoreDetailViewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-score-detail-view',
            template: __webpack_require__(/*! ./score-detail-view.component.html */ "./src/app/score/score-detail-view/score-detail-view.component.html"),
            styles: [__webpack_require__(/*! ./score-detail-view.component.scss */ "./src/app/score/score-detail-view/score-detail-view.component.scss")]
        })
    ], ScoreDetailViewComponent);
    return ScoreDetailViewComponent;
}());



/***/ }),

/***/ "./src/app/score/score.component.html":
/*!********************************************!*\
  !*** ./src/app/score/score.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-12 colortheme footer fixed-bottom\">\r\n  <div class=\"col-6 left-footer text-left\">\r\n    <p>\r\n        <a href=\"https://muc2019.mensch-und-computer.de/\" target=\"_top\">MuC 2019 Hamburg</a>\r\n    </p>\r\n  </div>\r\n  <div class=\"col-6 right-footer text-right\">\r\n      <button mat-button [matMenuTriggerFor]=\"menu\">Torage: 4242424 Pts</button>\r\n      <mat-menu #menu=\"matMenu\">\r\n        <app-score-detail-view [players]=\"players\"></app-score-detail-view>\r\n      </mat-menu>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/score/score.component.scss":
/*!********************************************!*\
  !*** ./src/app/score/score.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".colortheme {\n  background-color: black;\n  color: white; }\n\n.footer {\n  height: 30px;\n  padding: 0; }\n\np {\n  margin: 0;\n  background-color: black; }\n\na:link {\n  color: white; }\n\na:visited {\n  color: white; }\n\n.left-footer {\n  float: left; }\n\n.right-footer {\n  float: right; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NvcmUvQzpcXGRldlxcUGF0aGZpbmRlci9zcmNcXGFwcFxcc2NvcmVcXHNjb3JlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVksRUFBQTs7QUFFZDtFQUNFLFlBQVk7RUFDWixVQUFVLEVBQUE7O0FBRVo7RUFDRSxTQUFTO0VBQ1QsdUJBQXVCLEVBQUE7O0FBRXpCO0VBQ0UsWUFBVyxFQUFBOztBQUViO0VBQ0UsWUFBWSxFQUFBOztBQUdkO0VBQ0UsV0FBVyxFQUFBOztBQUdiO0VBQ0UsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2NvcmUvc2NvcmUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29sb3J0aGVtZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5mb290ZXIge1xyXG4gIGhlaWdodDogMzBweDtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbnAge1xyXG4gIG1hcmdpbjogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5hOmxpbmsge1xyXG4gIGNvbG9yOndoaXRlO1xyXG59XHJcbmE6dmlzaXRlZHtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5sZWZ0LWZvb3RlciB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5yaWdodC1mb290ZXIge1xyXG4gIGZsb2F0OiByaWdodDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/score/score.component.ts":
/*!******************************************!*\
  !*** ./src/app/score/score.component.ts ***!
  \******************************************/
/*! exports provided: ScoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreComponent", function() { return ScoreComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ScoreComponent = /** @class */ (function () {
    function ScoreComponent() {
        this.players = [
            {
                username: 'torage',
                score: 4523
            },
            {
                username: 'torage1',
                score: 45232
            },
            {
                username: 'torage2',
                score: 453435
            },
            {
                username: 'torage3',
                score: 454435
            },
            {
                username: 'torage4',
                score: 453435
            }
        ];
    }
    Object.defineProperty(ScoreComponent.prototype, "playerArray", {
        get: function () {
            return this.players;
        },
        enumerable: true,
        configurable: true
    });
    ScoreComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-score',
            template: __webpack_require__(/*! ./score.component.html */ "./src/app/score/score.component.html"),
            styles: [__webpack_require__(/*! ./score.component.scss */ "./src/app/score/score.component.scss")]
        })
    ], ScoreComponent);
    return ScoreComponent;
}());



/***/ }),

/***/ "./src/app/score/score.module.ts":
/*!***************************************!*\
  !*** ./src/app/score/score.module.ts ***!
  \***************************************/
/*! exports provided: ScoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreModule", function() { return ScoreModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _score_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score.component */ "./src/app/score/score.component.ts");
/* harmony import */ var _score_compact_view_score_compact_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./score-compact-view/score-compact-view.component */ "./src/app/score/score-compact-view/score-compact-view.component.ts");
/* harmony import */ var _score_detail_view_score_detail_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./score-detail-view/score-detail-view.component */ "./src/app/score/score-detail-view/score-detail-view.component.ts");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");







var ScoreModule = /** @class */ (function () {
    function ScoreModule() {
    }
    ScoreModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_score_component__WEBPACK_IMPORTED_MODULE_3__["ScoreComponent"], _score_compact_view_score_compact_view_component__WEBPACK_IMPORTED_MODULE_4__["ScoreCompactViewComponent"], _score_detail_view_score_detail_view_component__WEBPACK_IMPORTED_MODULE_5__["ScoreDetailViewComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenuModule"]
            ],
            exports: [_score_component__WEBPACK_IMPORTED_MODULE_3__["ScoreComponent"], _score_compact_view_score_compact_view_component__WEBPACK_IMPORTED_MODULE_4__["ScoreCompactViewComponent"], _score_detail_view_score_detail_view_component__WEBPACK_IMPORTED_MODULE_5__["ScoreDetailViewComponent"]]
        })
    ], ScoreModule);
    return ScoreModule;
}());



/***/ }),

/***/ "./src/app/shared/active-view.model.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/active-view.model.ts ***!
  \*********************************************/
/*! exports provided: View, initialView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialView", function() { return initialView; });
var View;
(function (View) {
    View["MapsComponent"] = "MAPS_COMPONENT";
    View["AugmentedComponent"] = "AUGMENTED_COMPONENT";
})(View || (View = {}));
var initialView = {
    activeView: View.MapsComponent
};


/***/ }),

/***/ "./src/app/shared/geolocation.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/geolocation.service.ts ***!
  \***********************************************/
/*! exports provided: GeolocationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeolocationService", function() { return GeolocationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



/**
 * GeolocationService class.
 * https://developers.google.com/maps/documentation/javascript/
 * https://dev.w3.org/geo/api/spec-source.html
 */
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
    /**
     * Tries HTML5 geolocation.
     *
     * Wraps the Geolocation API into an observable.
     *
     * @return An observable of Position
     */
    GeolocationService.prototype.getCurrentPosition = function () {
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            // Invokes getCurrentPosition method of Geolocation API.
            navigator.geolocation.getCurrentPosition(function (position) {
                observer.next(position);
                observer.complete();
            }, function (error) {
                console.log('Geolocation service: ' + error.message);
                observer.error(error);
            });
        });
    };
    GeolocationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], GeolocationService);
    return GeolocationService;
}());



/***/ }),

/***/ "./src/assets/maps.style.ts":
/*!**********************************!*\
  !*** ./src/assets/maps.style.ts ***!
  \**********************************/
/*! exports provided: mapStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStyles", function() { return mapStyles; });
var mapStyles = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#212121'
            }
        ]
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575'
            }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#212121'
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                color: '#757575'
            }
        ]
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e'
            }
        ]
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#bdbdbd'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#181818'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1b1b1b'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#2c2c2c'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#8a8a8a'
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#373737'
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#3c3c3c'
            }
        ]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
            {
                color: '#4e4e4e'
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575'
            }
        ]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            }
        ]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#3d3d3d'
            }
        ]
    }
];
// export const mapStyles = [
//   {
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#1d2c4d'
//       }
//     ]
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#8ec3b9'
//       }
//     ]
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1a3646'
//       }
//     ]
//   },
//   {
//     featureType: 'administrative.country',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#4b6878'
//       }
//     ]
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#64779e'
//       }
//     ]
//   },
//   {
//     featureType: 'administrative.province',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#4b6878'
//       }
//     ]
//   },
//   {
//     featureType: 'landscape.man_made',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#334e87'
//       }
//     ]
//   },
//   {
//     featureType: 'landscape.natural',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#023e58'
//       }
//     ]
//   },
//   {
//     featureType: 'poi',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#283d6a'
//       }
//     ]
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#6f9ba5'
//       }
//     ]
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1d2c4d'
//       }
//     ]
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#023e58'
//       }
//     ]
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#3C7680'
//       }
//     ]
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#304a7d'
//       }
//     ]
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#98a5be'
//       }
//     ]
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1d2c4d'
//       }
//     ]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#2c6675'
//       }
//     ]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#255763'
//       }
//     ]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#b0d5ce'
//       }
//     ]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#023e58'
//       }
//     ]
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#98a5be'
//       }
//     ]
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1d2c4d'
//       }
//     ]
//   },
//   {
//     featureType: 'transit.line',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#283d6a'
//       }
//     ]
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#3a4762'
//       }
//     ]
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#0e1626'
//       }
//     ]
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#4e6d70'
//       }
//     ]
//   }
// ];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\Pathfinder\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map