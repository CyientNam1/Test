webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dATViewer/dATViewer.module": [
		"../../../../../src/app/routes/dATViewer/dATViewer.module.ts",
		"dATViewer.module"
	],
	"./dataMapViewer/dataMapViewer.module": [
		"../../../../../src/app/routes/dataMapViewer/dataMapViewer.module.ts",
		"dataMapViewer.module"
	],
	"./esriMap/esri-map.module": [
		"../../../../../src/app/routes/esriMap/esri-map.module.ts",
		"common"
	],
	"./gridStatus/gridStatus.module": [
		"../../../../../src/app/routes/gridStatus/gridStatus.module.ts",
		"common",
		"gridStatus.module"
	],
	"./home/home.module": [
		"../../../../../src/app/routes/home/home.module.ts",
		"common",
		"home.module"
	],
	"./jobs/jobs.module": [
		"../../../../../src/app/routes/jobs/jobs.module.ts",
		"common",
		"jobs.module"
	],
	"./reports/reports.module": [
		"../../../../../src/app/routes/reports/reports.module.ts",
		"common",
		"reports.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(settings, authenticationService) {
        this.settings = settings;
        this.authenticationService = authenticationService;
    }
    Object.defineProperty(AppComponent.prototype, "isFixed", {
        get: function () { return this.settings.layout.isFixed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "isCollapsed", {
        get: function () { return this.settings.layout.isCollapsed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "isBoxed", {
        get: function () { return this.settings.layout.isBoxed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "useFullLayout", {
        get: function () { return this.settings.layout.useFullLayout; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "hiddenFooter", {
        get: function () { return this.settings.layout.hiddenFooter; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "horizontal", {
        get: function () { return this.settings.layout.horizontal; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "isFloat", {
        get: function () { return this.settings.layout.isFloat; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "offsidebarOpen", {
        get: function () { return this.settings.layout.offsidebarOpen; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "asideToggled", {
        get: function () { return this.settings.layout.asideToggled; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "isCollapsedText", {
        get: function () { return this.settings.layout.isCollapsedText; },
        enumerable: true,
        configurable: true
    });
    ;
    AppComponent.prototype.ngOnInit = function () {
        this.authenticationService.getTableauToken();
        $(document).on('click', '[href="#"]', function (e) { return e.preventDefault(); });
        /* const token = sessionStorage.getItem('cyientToken') ? sessionStorage.getItem('cyientToken') : '';

        if (token) {
            this.loginService.validateToken(token).subscribe(result => {
                if (result.message === 'Valid Token') {
                    this.loginService.setMenuItem();
                    this.router.navigateByUrl('/gridStatus');
                }
                else {
                    this.router.navigateByUrl('/login');
                    this.menu.removeItem();
                }
            });
        }
        else {
            this.menu.removeItem();
            this.router.navigateByUrl('/login');
        }
        return; */
        this.authenticationService.getTokenForJobs().subscribe(function (res) {
            console.log('received token');
        });
        /* this.authenticationService.getToken().subscribe(results  =>  {
            console.log(results);
        }); */
        /*      $(document).ready(function () {
                 $.ajax({
                     url: 'http:localhost:8091/TestAPIGateway/trusted',
                     type: 'POST',
                     data: {
                         username: 'Utilities_NAM'
                     },
                     xhrFields: {
                         withCredentials: false
                     },
                     headers: {
                         "Content-Type": "application/x-www-form-urlencoded"
     
                     },
                     success: function (data) {
                         sessionStorage.setItem('tableauTokenId',data);
                     },
                     error:
                     function (data) {
     
                     }
     
                 });
     
             }); */
        $(document).on('click', '[href="#"]', function (e) { return e.preventDefault(); });
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.layout-fixed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isFixed", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.aside-collapsed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isCollapsed", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.layout-boxed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isBoxed", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.layout-fs'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "useFullLayout", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.hidden-footer'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "hiddenFooter", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.layout-h'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "horizontal", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.aside-float'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isFloat", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.offsidebar-open'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "offsidebarOpen", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.aside-toggled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "asideToggled", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.aside-collapsed-text'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isCollapsedText", null);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_core_module__ = __webpack_require__("../../../../../src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layout_layout_module__ = __webpack_require__("../../../../../src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_routes_module__ = __webpack_require__("../../../../../src/app/routes/routes.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 // this is needed!









// https://github.com/ocombe/ng2-translate/issues/218
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__core_core_module__["a" /* CoreModule */],
            __WEBPACK_IMPORTED_MODULE_7__layout_layout_module__["a" /* LayoutModule */],
            __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9__routes_routes_module__["a" /* RoutesModule */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]]
                }
            })
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/authentication/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var swal = __webpack_require__("../../../../sweetalert/lib/sweetalert.js");
var AuthenticationService = (function () {
    function AuthenticationService(http, _http) {
        this.http = http;
        this._http = _http;
        this.postHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'https://busrep.cyient.com/trusted' });
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.getToken = function () {
        var _this = this;
        var url = 'https://apigateway.cyient-fiops.com/tableauSecurity';
        var postHeaders = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var data = {
            username: 'Utilities_NAM'
        };
        return this._http.post(url, data, { headers: postHeaders, withCredentials: false }).map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('tableau-token', token);
                // return true to indicate successful login
                return token;
            }
            else {
                // return false to indicate failed login
                return '';
            }
        });
    };
    AuthenticationService.prototype.getTokenForJobs = function () {
        var _this = this;
        var postHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        return this.http.post('https://dte-api.cyient-fiops.com/api/fiops/security/token/cyient', JSON.stringify({ username: 'Raviteja.Viswanadha', password: 'Cyient123' }), { headers: postHeaders })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access-token', token);
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.getTableauToken = function () {
        return $.ajax({
            url: 'https://apigateway.cyient-fiops.com/tableauSecurity',
            type: 'POST',
            data: {
                username: 'Utilities_NAM'
            },
            xhrFields: {
                withCredentials: false
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (data) {
                sessionStorage.setItem('tableauTokenId', data);
                return data;
            },
            error: function (data) {
                return data;
            }
        });
    };
    AuthenticationService.prototype.post = function (url, postData) {
        return this.http
            .post(url, postData, { headers: this.postHeaders })
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errormessage = error._body;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(errormessage);
    };
    AuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        if (body) {
            return body.data || body;
        }
        else {
            return {};
        }
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object])
], AuthenticationService);

var _a, _b;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__themes_themes_service__ = __webpack_require__("../../../../../src/app/core/themes/themes.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__translator_translator_service__ = __webpack_require__("../../../../../src/app/core/translator/translator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu_service__ = __webpack_require__("../../../../../src/app/core/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_import_guard__ = __webpack_require__("../../../../../src/app/core/module-import-guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var CoreModule = (function () {
    function CoreModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_7__module_import_guard__["a" /* throwIfAlreadyLoaded */])(parentModule, 'CoreModule');
    }
    return CoreModule;
}());
CoreModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["HttpModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__settings_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__themes_themes_service__["a" /* ThemesService */],
            __WEBPACK_IMPORTED_MODULE_4__translator_translator_service__["a" /* TranslatorService */],
            __WEBPACK_IMPORTED_MODULE_5__menu_menu_service__["a" /* MenuService */],
            __WEBPACK_IMPORTED_MODULE_6__authentication_authentication_service__["a" /* AuthenticationService */]
        ],
        declarations: [],
        exports: []
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/menu/menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuService = (function () {
    function MenuService() {
        this.menuItems = [];
    }
    MenuService.prototype.addMenu = function (items) {
        var _this = this;
        items.forEach(function (item) {
            _this.menuItems.push(item);
        });
    };
    MenuService.prototype.getMenu = function () {
        return this.menuItems;
    };
    return MenuService;
}());
MenuService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], MenuService);

//# sourceMappingURL=menu.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/module-import-guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throwIfAlreadyLoaded;
// https://angular.io/styleguide#!#04-12
// https://angular.io/styleguide#!#04-12
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}
//# sourceMappingURL=module-import-guard.js.map

/***/ }),

/***/ "../../../../../src/app/core/settings/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsService = (function () {
    function SettingsService() {
        // User Settings
        // -----------------------------------
        this.user = {
            name: '',
            job: 'ng-developer',
            picture: 'assets/img/user/User.jpg'
        };
        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Smart Manage',
            description: '',
            year: ((new Date()).getFullYear())
        };
        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };
    }
    SettingsService.prototype.getAppSetting = function (name) {
        return name ? this.app[name] : this.app;
    };
    SettingsService.prototype.getUserSetting = function (name) {
        return name ? this.user[name] : this.user;
    };
    SettingsService.prototype.getLayoutSetting = function (name) {
        return name ? this.layout[name] : this.layout;
    };
    SettingsService.prototype.setAppSetting = function (name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    };
    SettingsService.prototype.setUserSetting = function (name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    };
    SettingsService.prototype.setLayoutSetting = function (name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    };
    SettingsService.prototype.toggleLayoutSetting = function (name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SettingsService);

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/themes/themes.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var themeA = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-a.scss");
var themeB = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-b.scss");
var themeC = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-c.scss");
var themeD = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-d.scss");
var themeE = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-e.scss");
var themeF = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-f.scss");
var themeG = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-g.scss");
var themeH = __webpack_require__("../../../../../src/app/shared/styles/themes/theme-h.scss");
var ThemesService = (function () {
    function ThemesService() {
        this.defaultTheme = 'A';
        this.createStyle();
        this.setTheme(this.defaultTheme);
    }
    ThemesService.prototype.createStyle = function () {
        var head = document.head || document.getElementsByTagName('head')[0];
        this.styleTag = document.createElement('style');
        this.styleTag.type = 'text/css';
        this.styleTag.id = 'appthemes';
        head.appendChild(this.styleTag);
    };
    ThemesService.prototype.setTheme = function (name) {
        switch (name) {
            case 'A':
                this.injectStylesheet(themeA);
                break;
            case 'B':
                this.injectStylesheet(themeB);
                break;
            case 'C':
                this.injectStylesheet(themeC);
                break;
            case 'D':
                this.injectStylesheet(themeD);
                break;
            case 'E':
                this.injectStylesheet(themeE);
                break;
            case 'F':
                this.injectStylesheet(themeF);
                break;
            case 'G':
                this.injectStylesheet(themeG);
                break;
            case 'H':
                this.injectStylesheet(themeH);
                break;
        }
    };
    ThemesService.prototype.injectStylesheet = function (css) {
        this.styleTag.innerHTML = css;
    };
    ThemesService.prototype.getDefaultTheme = function () {
        return this.defaultTheme;
    };
    return ThemesService;
}());
ThemesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ThemesService);

//# sourceMappingURL=themes.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/translator/translator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TranslatorService = (function () {
    function TranslatorService(translate) {
        this.translate = translate;
        this.defaultLanguage = 'en';
        this.availablelangs = [
            { code: 'en', text: 'English' },
            { code: 'es_AR', text: 'Spanish' }
        ];
        if (!translate.getDefaultLang())
            translate.setDefaultLang(this.defaultLanguage);
        this.useLanguage();
    }
    TranslatorService.prototype.useLanguage = function (lang) {
        if (lang === void 0) { lang = null; }
        this.translate.use(lang || this.translate.getDefaultLang());
    };
    TranslatorService.prototype.getAvailableLanguages = function () {
        return this.availablelangs;
    };
    return TranslatorService;
}());
TranslatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], TranslatorService);

var _a;
//# sourceMappingURL=translator.service.js.map

/***/ }),

/***/ "../../../../../src/app/layout/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<span>&copy; {{settings.app.year}} - {{ settings.app.name }}</span>"

/***/ }),

/***/ "../../../../../src/app/layout/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FooterComponent = (function () {
    function FooterComponent(settings) {
        this.settings = settings;
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: '[app-footer]',
        template: __webpack_require__("../../../../../src/app/layout/footer/footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/footer/footer.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], FooterComponent);

var _a;
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START Top Navbar-->\r\n<nav class=\"navbar topnavbar\" role=\"navigation\">\r\n    <!-- START navbar header-->\r\n    <div class=\"navbar-header\">\r\n        <a class=\"navbar-brand\" href=\"#/\">\r\n            <div class=\"brand-logo\">\r\n                <img class=\"img-responsive\" src=\"assets/img/logo.png\" alt=\"App Logo\" />\r\n            </div>\r\n            <div class=\"brand-logo-collapsed\">\r\n                <img class=\"img-responsive\" src=\"assets/img/logo-single.png\" alt=\"App Logo\" />\r\n            </div>\r\n        </a>\r\n    </div>\r\n    <!-- END navbar header-->\r\n    <!-- START Nav wrapper-->\r\n    <div class=\"nav-wrapper\">\r\n        <!-- START Left navbar-->\r\n        <ul class=\"nav navbar-nav\">\r\n            <li>\r\n                <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->\r\n                <a class=\"hidden-xs\" trigger-resize=\"\" (click)=\"toggleCollapsedSideabar()\" *ngIf=\"!isCollapsedText()\">\r\n                    <em class=\"fa fa-navicon\"></em>\r\n                </a>\r\n                <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->\r\n                <a class=\"visible-xs sidebar-toggle\" (click)=\"settings.layout.asideToggled =! settings.layout.asideToggled; $event.stopPropagation()\">\r\n                    <em class=\"fa fa-navicon\"></em>\r\n                </a>\r\n            </li>\r\n            <!-- START User avatar toggle-->\r\n            <li>\r\n                <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->\r\n                <!--<a (click)=\"toggleUserBlock($event)\">\r\n                    <em class=\"icon-user\"></em>\r\n                </a>-->\r\n            </li>\r\n            <!-- END User avatar toggle-->\r\n            <!-- START lock screen-->\r\n            <!-- <li>\r\n                <a  title=\"Lock screen\" (click)=\"goToSmartManage()\">\r\n                    <em class=\"icon-lock\"></em>\r\n                </a>\r\n                \r\n            </li> -->\r\n            \r\n            <!-- END lock screen-->\r\n        </ul>\r\n        <!-- END Left navbar-->\r\n        <!-- START Right Navbar-->\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <!-- Search icon-->\r\n            <!--<li>\r\n                <a (click)=\"openNavSearch($event)\">\r\n                    <em class=\"icon-magnifier\"></em>\r\n                </a>\r\n            </li>-->\r\n            <!-- Fullscreen (only desktops)-->\r\n            <!-- <li class=\"visible-lg\">\r\n                <a #fsbutton (click)=\"toggleFullScreen($event)\">\r\n                    <em class=\"fa fa-expand\"></em>\r\n                </a>\r\n            </li> -->\r\n            <li>\r\n                <a  title=\"Lock screen\" (click)=\"goToSmartManage()\">\r\n                    <i class=\"fa fa-fw fa-sign-out\"></i>Logout\r\n                </a>\r\n                \r\n            </li>\r\n            <!-- START Alert menu-->\r\n            <li class=\"dropdown dropdown-list\" dropdown>\r\n                <!--<a dropdownToggle>\r\n                    <em class=\"icon-bell\"></em>\r\n                    <div class=\"label label-danger\">11</div>\r\n                </a>-->\r\n                <!-- START Dropdown menu-->\r\n                <ul *dropdownMenu class=\"dropdown-menu animated flipInX\">\r\n                    <li>\r\n                        <!-- START list group-->\r\n                        <div class=\"list-group\">\r\n                            <!-- list item-->\r\n                            <a class=\"list-group-item\">\r\n                                <div class=\"media-box\">\r\n                                    <div class=\"pull-left\">\r\n                                        <em class=\"fa fa-twitter fa-2x text-info\"></em>\r\n                                    </div>\r\n                                    <div class=\"media-box-body clearfix\">\r\n                                        <p class=\"m0\">New followers</p>\r\n                                        <p class=\"m0 text-muted\">\r\n                                            <small>1 new follower</small>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                            </a>\r\n                            <!-- list item-->\r\n                            <a class=\"list-group-item\">\r\n                                <div class=\"media-box\">\r\n                                    <div class=\"pull-left\">\r\n                                        <em class=\"fa fa-envelope fa-2x text-warning\"></em>\r\n                                    </div>\r\n                                    <div class=\"media-box-body clearfix\">\r\n                                        <p class=\"m0\">New e-mails</p>\r\n                                        <p class=\"m0 text-muted\">\r\n                                            <small>You have 10 new emails</small>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                            </a>\r\n                            <!-- list item-->\r\n                            <a class=\"list-group-item\">\r\n                                <div class=\"media-box\">\r\n                                    <div class=\"pull-left\">\r\n                                        <em class=\"fa fa-tasks fa-2x text-success\"></em>\r\n                                    </div>\r\n                                    <div class=\"media-box-body clearfix\">\r\n                                        <p class=\"m0\">Pending Tasks</p>\r\n                                        <p class=\"m0 text-muted\">\r\n                                            <small>11 pending task</small>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                            </a>\r\n                            <!-- last list item-->\r\n                            <a class=\"list-group-item\">\r\n                                <small translate=\"topbar.notification.MORE\">More notifications</small>\r\n                                <span class=\"label label-danger pull-right\">14</span>\r\n                            </a>\r\n                        </div>\r\n                        <!-- END list group-->\r\n                    </li>\r\n                </ul>\r\n                <!-- END Dropdown menu-->\r\n            </li>\r\n            <!-- END Alert menu-->\r\n            <!-- START Offsidebar button-->\r\n            <!-- <li>\r\n                <a (click)=\"toggleOffsidebar(); $event.stopPropagation()\">\r\n                    <em class=\"icon-notebook\"></em>\r\n                </a>\r\n            </li> -->\r\n            <!-- END Offsidebar menu-->\r\n        </ul>\r\n        <!-- END Right Navbar-->\r\n    </div>\r\n    <!-- END Nav wrapper-->\r\n\r\n    <app-navsearch [visible]=\"getNavSearchVisible()\" (onclose)=\"setNavSearchVisible(false)\"></app-navsearch>\r\n\r\n</nav>\r\n<!-- END Top Navbar-->\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_userblock_userblock_service__ = __webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__ = __webpack_require__("../../../../../src/app/core/menu/menu.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var screenfull = __webpack_require__("../../../../screenfull/dist/screenfull.js");
var browser = __webpack_require__("../../../../jquery.browser/dist/jquery.browser.js");



var HeaderComponent = (function () {
    function HeaderComponent(menu, userblockService, settings) {
        this.menu = menu;
        this.userblockService = userblockService;
        this.settings = settings;
        this.navCollapsed = true; // for horizontal layout
        this.menuItems = []; // for horizontal layout
        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isNavSearchVisible = false;
        if (browser.msie) {
            this.fsbutton.nativeElement.style.display = 'none';
        }
    };
    HeaderComponent.prototype.goToSmartManage = function () {
        document.location.href = "/XCEL_PROD/SmartManage/";
    };
    HeaderComponent.prototype.toggleUserBlock = function (event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    };
    HeaderComponent.prototype.openNavSearch = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    };
    HeaderComponent.prototype.setNavSearchVisible = function (stat) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    };
    HeaderComponent.prototype.getNavSearchVisible = function () {
        return this.isNavSearchVisible;
    };
    HeaderComponent.prototype.toggleOffsidebar = function () {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    };
    HeaderComponent.prototype.toggleCollapsedSideabar = function () {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    };
    HeaderComponent.prototype.isCollapsedText = function () {
        return this.settings.layout.isCollapsedText;
    };
    HeaderComponent.prototype.toggleFullScreen = function (event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        var el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    };
    return HeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fsbutton'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "fsbutton", void 0);
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/layout/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/header/header.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__["a" /* MenuService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__sidebar_userblock_userblock_service__["a" /* UserblockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sidebar_userblock_userblock_service__["a" /* UserblockService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__core_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_settings_settings_service__["a" /* SettingsService */]) === "function" && _c || Object])
], HeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/header/navsearch/navsearch.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START Search form-->\r\n<form class=\"navbar-form\" role=\"search\" action=\"search.html\" [class.open]=\"visible\" (submit)=\"handleForm()\">\r\n    <div class=\"form-group has-feedback\">\r\n        <input [(ngModel)]=\"term\" name=\"term\" class=\"form-control\" type=\"text\" placeholder=\"{{'header.search.PLACEHOLDER' | translate}}\" />\r\n        <div class=\"fa fa-times form-control-feedback\" (click)=\"closeNavSearch()\"></div>\r\n    </div>\r\n    <button class=\"hidden btn btn-default\" type=\"submit\">Submit</button>\r\n</form>\r\n<!-- END Search form-->\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/header/navsearch/navsearch.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/header/navsearch/navsearch.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavsearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavsearchComponent = (function () {
    function NavsearchComponent(elem) {
        this.elem = elem;
        this.onclose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    NavsearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(document)
            .on('keyup', function (event) {
            if (event.keyCode === 27) {
                _this.closeNavSearch();
            }
        })
            .on('click', function (event) {
            if (!$.contains(_this.elem.nativeElement, event.target)) {
                _this.closeNavSearch();
            }
        });
    };
    NavsearchComponent.prototype.closeNavSearch = function () {
        this.visible = false;
        this.onclose.emit();
    };
    NavsearchComponent.prototype.ngOnChanges = function (changes) {
        // console.log(changes['visible'].currentValue)
        if (changes['visible'].currentValue === true) {
            this.elem.nativeElement.querySelector('input').focus();
        }
    };
    NavsearchComponent.prototype.handleForm = function () {
        console.log('Form submit: ' + this.term);
    };
    return NavsearchComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], NavsearchComponent.prototype, "visible", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], NavsearchComponent.prototype, "onclose", void 0);
NavsearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navsearch',
        template: __webpack_require__("../../../../../src/app/layout/header/navsearch/navsearch.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/header/navsearch/navsearch.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], NavsearchComponent);

var _a;
//# sourceMappingURL=navsearch.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n    <!-- top navbar-->\r\n    <app-header class=\"topnavbar-wrapper\"></app-header>\r\n    <!-- sidebar-->\r\n    <app-sidebar class=\"aside\"></app-sidebar>\r\n    <!-- offsidebar-->\r\n    <app-offsidebar class=\"offsidebar\"></app-offsidebar>\r\n    <!-- Main section-->\r\n    <section>\r\n        <!-- Page content-->\r\n        <div class=\"content-wrapper\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </section>\r\n    <!-- Page footer-->\r\n    <!-- <footer app-footer></footer> -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LayoutComponent = (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () {
    };
    return LayoutComponent;
}());
LayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-layout',
        template: __webpack_require__("../../../../../src/app/layout/layout.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/layout.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], LayoutComponent);

//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_sidebar_component__ = __webpack_require__("../../../../../src/app/layout/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_header_component__ = __webpack_require__("../../../../../src/app/layout/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__header_navsearch_navsearch_component__ = __webpack_require__("../../../../../src/app/layout/header/navsearch/navsearch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__offsidebar_offsidebar_component__ = __webpack_require__("../../../../../src/app/layout/offsidebar/offsidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sidebar_userblock_userblock_component__ = __webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sidebar_userblock_userblock_service__ = __webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__ = __webpack_require__("../../../../../src/app/layout/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var LayoutModule = (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__sidebar_userblock_userblock_service__["a" /* UserblockService */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__layout_component__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_2__sidebar_sidebar_component__["a" /* SidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_6__sidebar_userblock_userblock_component__["a" /* UserblockComponent */],
            __WEBPACK_IMPORTED_MODULE_3__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_4__header_navsearch_navsearch_component__["a" /* NavsearchComponent */],
            __WEBPACK_IMPORTED_MODULE_5__offsidebar_offsidebar_component__["a" /* OffsidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__layout_component__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_2__sidebar_sidebar_component__["a" /* SidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_6__sidebar_userblock_userblock_component__["a" /* UserblockComponent */],
            __WEBPACK_IMPORTED_MODULE_3__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_4__header_navsearch_navsearch_component__["a" /* NavsearchComponent */],
            __WEBPACK_IMPORTED_MODULE_5__offsidebar_offsidebar_component__["a" /* OffsidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */]
        ]
    })
], LayoutModule);

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/offsidebar/offsidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<tabset [justified]=\"true\">\r\n    <tab>\r\n        <ng-template tabHeading>\r\n            <em class=\"icon-equalizer fa-lg\"></em>\r\n        </ng-template>\r\n        <h3 class=\"text-center text-thin\" [innerHTML]=\"'offsidebar.setting.SETTINGS' | translate\"></h3>\r\n        <div class=\"p\">\r\n            <h4 class=\"text-muted text-thin\">Themes</h4>\r\n            <div class=\"table-grid mb\">\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"A\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-info\"></span>\r\n                            <span class=\"color bg-info-light\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-white\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"B\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-green\"></span>\r\n                            <span class=\"color bg-green-light\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-white\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"C\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-purple\"></span>\r\n                            <span class=\"color bg-purple-light\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-white\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"D\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-danger\"></span>\r\n                            <span class=\"color bg-danger-light\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-white\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"table-grid mb\">\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"E\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-info-dark\"></span>\r\n                            <span class=\"color bg-info\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-gray-dark\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"F\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-green-dark\"></span>\r\n                            <span class=\"color bg-green\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-gray-dark\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"G\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-purple-dark\"></span>\r\n                            <span class=\"color bg-purple\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-gray-dark\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col mb\">\r\n                    <div class=\"setting-color\">\r\n                        <label>\r\n                            <input type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"H\" />\r\n                            <span class=\"icon-check\"></span>\r\n                            <span class=\"split\">\r\n                  <span class=\"color bg-danger-dark\"></span>\r\n                            <span class=\"color bg-danger\"></span>\r\n                            </span>\r\n                            <span class=\"color bg-gray-dark\"></span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"p\">\r\n            <h4 class=\"text-muted text-thin\">Layout</h4>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Fixed</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.isFixed\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Boxed</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.isBoxed\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <!--\r\n    <div class=\"clearfix\">\r\n      <p class=\"pull-left\">RTL</p>\r\n      <div class=\"pull-right\">\r\n         <label class=\"switch\">\r\n            <input type=\"checkbox\" [(ngModel)]=\"layoutRTL\"/>\r\n            <span></span>\r\n         </label>\r\n      </div>\r\n    </div>\r\n    -->\r\n        </div>\r\n        <div class=\"p\" *ngIf=\"!settings.layout.horizontal\">\r\n            <h4 class=\"text-muted text-thin\">Aside</h4>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Collapsed</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.isCollapsed\" [disabled]=\"settings.layout.isCollapsedText\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Collapsed Text</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.isCollapsedText\" [disabled]=\"settings.layout.isCollapsed\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Float</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.isFloat\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Hover</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.asideHover\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <p class=\"pull-left\">Show Scrollbar</p>\r\n                <div class=\"pull-right\">\r\n                    <label class=\"switch\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"settings.layout.asideScrollbar\" />\r\n                        <span></span>\r\n                    </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"p\">\r\n            <h4 class=\"text-muted text-thin\">Language</h4>\r\n            <select class=\"form-control\" [ngModel]=\"selectedLanguage\" (ngModelChange)=\"setLang($event)\">\r\n                <option [value]=\"lang.code\" *ngFor=\"let lang of getLangs()\">{{lang.text}}</option>\r\n            </select>\r\n        </div>\r\n    </tab>\r\n    <tab>\r\n        <ng-template tabHeading>\r\n            <em class=\"icon-user fa-lg\"></em>\r\n        </ng-template>\r\n        <h3 class=\"text-center text-thin\">Connections</h3>\r\n        <ul class=\"nav\">\r\n            <!-- START list title-->\r\n            <li class=\"p\">\r\n                <small class=\"text-muted\">ONLINE</small>\r\n            </li>\r\n            <!-- END list title-->\r\n            <li>\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-success circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/05.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Juan Sims</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Designeer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-success circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/06.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Maureen Jenkins</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Designeer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-danger circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/07.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Billie Dunn</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Designeer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-warning circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/08.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Tomothy Roberts</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Designer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n            </li>\r\n            <!-- START list title-->\r\n            <li class=\"p\">\r\n                <small class=\"text-muted\">OFFLINE</small>\r\n            </li>\r\n            <!-- END list title-->\r\n            <li>\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/09.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Lawrence Robinson</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Developer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n                <!-- START User status-->\r\n                <a href=\"#\" class=\"media-box p mt0\">\r\n                    <span class=\"pull-right\">\r\n                                 <span class=\"circle circle-lg\"></span>\r\n                    </span>\r\n                    <span class=\"pull-left\">\r\n                                 <!-- Contact avatar-->\r\n                                 <img src=\"assets/img/user/10.jpg\" alt=\"Image\" class=\"media-box-object img-circle thumb48\">\r\n                              </span>\r\n                    <!-- Contact info-->\r\n                    <span class=\"media-box-body\">\r\n                                 <span class=\"media-box-heading\">\r\n                                    <strong>Tyrone Owens</strong>\r\n                                    <br>\r\n                                    <small class=\"text-muted\">Designer</small>\r\n                                 </span>\r\n                    </span>\r\n                </a>\r\n                <!-- END User status-->\r\n            </li>\r\n            <li>\r\n                <div class=\"p-lg text-center\">\r\n                    <!-- Optional link to list more users-->\r\n                    <a href=\"#\" title=\"See more contacts\" class=\"btn btn-purple btn-sm\">\r\n                        <strong>Load more..</strong>\r\n                    </a>\r\n                </div>\r\n            </li>\r\n        </ul>\r\n        <!-- Extra items-->\r\n        <div class=\"p\">\r\n            <p>\r\n                <small class=\"text-muted\">Tasks completion</small>\r\n            </p>\r\n            <div class=\"progress progress-xs m0\">\r\n                <div role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-success progress-80\">\r\n                    <span class=\"sr-only\">80% Complete</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"p\">\r\n            <p>\r\n                <small class=\"text-muted\">Upload quota</small>\r\n            </p>\r\n            <div class=\"progress progress-xs m0\">\r\n                <div role=\"progressbar\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-warning progress-40\">\r\n                    <span class=\"sr-only\">40% Complete</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </tab>\r\n</tabset>\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/offsidebar/offsidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/offsidebar/offsidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffsidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_themes_themes_service__ = __webpack_require__("../../../../../src/app/core/themes/themes.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_translator_translator_service__ = __webpack_require__("../../../../../src/app/core/translator/translator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OffsidebarComponent = (function () {
    function OffsidebarComponent(settings, themes, translator) {
        this.settings = settings;
        this.themes = themes;
        this.translator = translator;
        this.clickEvent = 'click.offsidebar';
        this.$doc = null;
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }
    OffsidebarComponent.prototype.ngOnInit = function () {
        this.anyClickClose();
    };
    OffsidebarComponent.prototype.setTheme = function () {
        this.themes.setTheme(this.currentTheme);
    };
    OffsidebarComponent.prototype.getLangs = function () {
        return this.translator.getAvailableLanguages();
    };
    OffsidebarComponent.prototype.setLang = function (value) {
        this.translator.useLanguage(value);
    };
    OffsidebarComponent.prototype.anyClickClose = function () {
        var _this = this;
        this.$doc = $(document).on(this.clickEvent, function (e) {
            if (!$(e.target).parents('.offsidebar').length) {
                _this.settings.layout.offsidebarOpen = false;
            }
        });
    };
    OffsidebarComponent.prototype.ngOnDestroy = function () {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    };
    return OffsidebarComponent;
}());
OffsidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-offsidebar',
        template: __webpack_require__("../../../../../src/app/layout/offsidebar/offsidebar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/offsidebar/offsidebar.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_themes_themes_service__["a" /* ThemesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_themes_themes_service__["a" /* ThemesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__core_translator_translator_service__["a" /* TranslatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_translator_translator_service__["a" /* TranslatorService */]) === "function" && _c || Object])
], OffsidebarComponent);

var _a, _b, _c;
//# sourceMappingURL=offsidebar.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START Sidebar (left)-->\r\n<div class=\"aside-inner\">\r\n        \r\n    <nav class=\"sidebar\" sidebar-anyclick-close=\"\" [class.show-scrollbar]=\"settings.layout.asideScrollbar\">\r\n\r\n        <!-- START sidebar nav-->\r\n        <ul class=\"nav\">\r\n\r\n            <!-- START user info-->\r\n            <li class=\"has-user-block\">\r\n                <app-userblock></app-userblock>\r\n            </li>\r\n            <!-- END user info-->\r\n\r\n            <li *ngFor='let item of menuItems' [ngClass]=\"{'nav-heading': item.heading}\" [routerLinkActive]=\"['active']\">\r\n                <!-- menu heading -->\r\n                <span *ngIf=\"item.heading\">{{(item.translate | translate) || item.text}}</span>\r\n                <!-- external links -->\r\n                <a *ngIf=\"!item.heading && !item.submenu && item.elink\" [attr.target]=\"item.target\" [attr.href]=\"item.elink\" title=\"{{item.text}}\">\r\n                    <span class=\"pull-right\" *ngIf=\"item.alert\" [ngClass]=\"item.label || 'label label-success'\">{{item.alert}}</span>\r\n                    <em class=\"{{item.icon}}\" *ngIf=\"item.icon\"></em>\r\n                    <span>{{(item.translate | translate) || item.text}}</span>\r\n                </a>\r\n                <!-- single menu item -->\r\n                <a *ngIf=\"!item.heading && !item.submenu && !item.elink\" [routerLink]=\"item.link\" [attr.route]=\"item.link\" title=\"{{item.text}}\"\r\n                    (click)=\"toggleSubmenuClick($event)\" (mouseenter)=\"toggleSubmenuHover($event)\">\r\n                    <span class=\"pull-right\" *ngIf=\"item.alert\" [ngClass]=\"item.label || 'label label-success'\">{{item.alert}}</span>\r\n                    <em class=\"{{item.icon}}\" *ngIf=\"item.icon\"></em>\r\n                    <span>{{(item.translate | translate) || item.text}}</span>\r\n                </a>\r\n                <!-- has submenu -->\r\n                <a *ngIf=\"!item.heading && item.submenu\" title=\"{{item.text}}\"\r\n                    (click)=\"toggleSubmenuClick($event)\" (mouseenter)=\"toggleSubmenuHover($event)\">\r\n                        <span class=\"pull-right\" *ngIf=\"item.alert\" [ngClass]=\"item.label || 'label label-success'\">{{item.alert}}</span>\r\n                        <em class=\"{{item.icon}}\" *ngIf=\"item.icon\"></em>\r\n                        <span>{{(item.translate | translate) || item.text}}</span>\r\n                </a>\r\n                <!-- SUBLEVEL -->\r\n                <ul *ngIf=\"item.submenu\" class=\"nav sidebar-subnav\" [routerLinkActive]=\"['opening']\">\r\n                    <li class=\"sidebar-subnav-header\">{{(item.translate | translate) || item.text}}</li>\r\n                    <li *ngFor='let subitem of item.submenu' [routerLinkActive]=\"['active']\">\r\n                        <!-- sublevel: external links -->\r\n                        <a *ngIf=\"!subitem.heading && !subitem.submenu && subitem.elink\" [attr.target]=\"subitem.target\" [attr.href]=\"subitem.elink\" title=\"{{subitem.text}}\">\r\n                            <span class=\"pull-right\" *ngIf=\"subitem.alert\" [ngClass]=\"subitem.label || 'label label-success'\">{{subitem.alert}}</span>\r\n                            <em class=\"{{subitem.icon}}\" *ngIf=\"subitem.icon\"></em>\r\n                            <span>{{(subitem.translate | translate) || subitem.text}}</span>\r\n                        </a>\r\n                        <!-- sublevel: single menu item  -->\r\n                        <a *ngIf=\"!subitem.submenu && !subitem.elink\" [routerLink]=\"subitem.link\" [attr.route]=\"subitem.link\" title=\"{{subitem.text}}\">\r\n                            <span class=\"pull-right\" *ngIf=\"subitem.alert\" [ngClass]=\"subitem.label || 'label label-success'\">{{subitem.alert}}</span>\r\n                            <em class=\"{{subitem.icon}}\" *ngIf=\"subitem.icon\"></em>\r\n                            <span>{{(subitem.translate | translate) || subitem.text}}</span>\r\n                        </a>\r\n                        <!-- sublevel: has submenu -->\r\n                        <a *ngIf=\"subitem.submenu\" title=\"{{subitem.text}}\"\r\n                            (click)=\"toggleSubmenuClick($event)\" (mouseenter)=\"toggleSubmenuHover($event)\">\r\n                                <span class=\"pull-right\" *ngIf=\"subitem.alert\" [ngClass]=\"subitem.label || 'label label-success'\">{{subitem.alert}}</span>\r\n                                <em class=\"{{subitem.icon}}\" *ngIf=\"subitem.icon\"></em>\r\n                                <span>{{(subitem.translate | translate) || subitem.text}}</span>\r\n                        </a>\r\n                        <!-- SUBLEVEL 2 -->\r\n                        <ul *ngIf=\"subitem.submenu\" class=\"nav sidebar-subnav level2\" [routerLinkActive]=\"['opening']\">\r\n                            <li *ngFor='let subitem2 of subitem.submenu' [routerLinkActive]=\"['active']\">\r\n                                <!-- sublevel 2: single menu item  -->\r\n                                <a *ngIf=\"!subitem2.submenu\" [routerLink]=\"subitem2.link\" [attr.route]=\"subitem2.link\" title=\"{{subitem2.text}}\">\r\n                                    <span class=\"pull-right\" *ngIf=\"subitem2.alert\" [ngClass]=\"subitem2.label || 'label label-success'\">{{subitem2.alert}}</span>\r\n                                    <em class=\"{{subitem2.icon}}\" *ngIf=\"subitem2.icon\"></em>\r\n                                    <span>{{(subitem2.translate | translate) || subitem2.text}}</span>\r\n                                </a>\r\n                                <!-- sublevel2: has submenu -->\r\n                                <a *ngIf=\"subitem2.submenu\" title=\"{{subitem2.text}}\"\r\n                                    (click)=\"toggleSubmenuClick($event)\" (mouseenter)=\"toggleSubmenuHover($event)\">\r\n                                        <span class=\"pull-right\" *ngIf=\"subitem2.alert\" [ngClass]=\"subitem2.label || 'label label-success'\">{{subitem2.alert}}</span>\r\n                                        <em class=\"{{subitem2.icon}}\" *ngIf=\"subitem2.icon\"></em>\r\n                                        <span>{{(subitem2.translate | translate) || subitem2.text}}</span>\r\n                                </a>\r\n                                <!-- SUBLEVEL 3 -->\r\n                                <ul *ngIf=\"subitem2.submenu\" class=\"nav sidebar-subnav level3\" [routerLinkActive]=\"['opening']\">\r\n                                    <li *ngFor='let subitem3 of subitem2.submenu' [routerLinkActive]=\"['active']\">\r\n                                        <!-- sublevel 2: single menu item  -->\r\n                                        <a *ngIf=\"!subitem3.submenu\" [routerLink]=\"subitem3.link\" [attr.route]=\"subitem3.link\" title=\"{{subitem3.text}}\">\r\n                                            <span class=\"pull-right\" *ngIf=\"subitem3.alert\" [ngClass]=\"subitem3.label || 'label label-success'\">{{subitem3.alert}}</span>\r\n                                            <em class=\"{{subitem3.icon}}\" *ngIf=\"subitem3.icon\"></em>\r\n                                            <span>{{(subitem3.translate | translate) || subitem3.text}}</span>\r\n                                        </a>\r\n                                        <!-- sublevel3: has submenu -->\r\n                                        <a *ngIf=\"subitem3.submenu\" title=\"{{subitem3.text}}\"\r\n                                            (click)=\"toggleSubmenuClick($event)\" (mouseenter)=\"toggleSubmenuHover($event)\">\r\n                                                <span class=\"pull-right\" *ngIf=\"subitem3.alert\" [ngClass]=\"subitem3.label || 'label label-success'\">{{subitem3.alert}}</span>\r\n                                                <em class=\"{{subitem3.icon}}\" *ngIf=\"subitem3.icon\"></em>\r\n                                                <span>{{(subitem3.translate | translate) || subitem3.text}}</span>\r\n                                        </a>\r\n                                        <!-- SUBLEVEL 4 -->\r\n                                        <ul *ngIf=\"subitem3.submenu\" class=\"nav sidebar-subnav level3\" [routerLinkActive]=\"['opening']\">\r\n                                            <li *ngFor='let subitem4 of subitem3.submenu' [routerLinkActive]=\"['active']\">\r\n                                                <!-- sublevel 2: single menu item  -->\r\n                                                <a *ngIf=\"!subitem4.submenu\" [routerLink]=\"subitem4.link\" [attr.route]=\"subitem4.link\" title=\"{{subitem4.text}}\">\r\n                                                    <span class=\"pull-right\" *ngIf=\"subitem4.alert\" [ngClass]=\"subitem4.label || 'label label-success'\">{{subitem4.alert}}</span>\r\n                                                    <em class=\"{{subitem4.icon}}\" *ngIf=\"subitem4.icon\"></em>\r\n                                                    <span>{{(subitem4.translate | translate) || subitem4.text}}</span>\r\n                                                </a>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </li>\r\n                                </ul>\r\n                            <li>\r\n                        </ul>\r\n                    <li>\r\n                </ul>\r\n            </li>\r\n\r\n        </ul>\r\n        <!-- END sidebar nav-->\r\n\r\n    </nav>\r\n        \r\n</div>\r\n<!-- END Sidebar (left)-->\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_menu_menu_service__ = __webpack_require__("../../../../../src/app/core/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_settings_settings_service__ = __webpack_require__("../../../../../src/app/core/settings/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidebarComponent = (function () {
    function SidebarComponent(menu, settings, injector) {
        this.menu = menu;
        this.settings = settings;
        this.injector = injector;
        this.sbclickEvent = 'click.sidebar-toggle';
        this.$doc = null;
        this.menuItems = menu.getMenu();
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router = this.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]);
        this.router.events.subscribe(function (val) {
            // close any submenu opened when route changes
            _this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
            // close sidebar on route change
            _this.settings.layout.asideToggled = false;
        });
        // enable sidebar autoclose from extenal clicks
        this.anyClickClose();
    };
    SidebarComponent.prototype.anyClickClose = function () {
        var _this = this;
        this.$doc = $(document).on(this.sbclickEvent, function (e) {
            if (!$(e.target).parents('.aside').length) {
                _this.settings.layout.asideToggled = false;
            }
        });
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        if (this.$doc)
            this.$doc.off(this.sbclickEvent);
    };
    SidebarComponent.prototype.toggleSubmenuClick = function (event) {
        var _this = this;
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            event.preventDefault();
            var target = $(event.target || event.srcElement || event.currentTarget);
            var ul_1, anchor = target;
            // find the UL
            if (!target.is('a')) {
                anchor = target.parent('a').first();
            }
            ul_1 = anchor.next();
            // hide other submenus
            var parentNav_1 = ul_1.parents('.sidebar-subnav');
            $('.sidebar-subnav').each(function (idx, el) {
                var $el = $(el);
                // if element is not a parent or self ul
                if (!$el.is(parentNav_1) && !$el.is(ul_1)) {
                    _this.closeMenu($el);
                }
            });
            // abort if not UL to process
            if (!ul_1.length) {
                return;
            }
            // any child menu should start closed
            ul_1.find('.sidebar-subnav').each(function (idx, el) {
                _this.closeMenu($(el));
            });
            // toggle UL height
            if (parseInt(ul_1.height(), 0)) {
                this.closeMenu(ul_1);
            }
            else {
                // expand menu
                ul_1.on('transitionend', function () {
                    ul_1.height('auto').off('transitionend');
                }).height(ul_1[0].scrollHeight);
                // add class to manage animation
                ul_1.addClass('opening');
            }
        }
    };
    // Close menu collapsing height
    SidebarComponent.prototype.closeMenu = function (elem) {
        elem.height(elem[0].scrollHeight); // set height
        elem.height(0); // and move to zero to collapse
        elem.removeClass('opening');
    };
    SidebarComponent.prototype.toggleSubmenuHover = function (event) {
        var self = this;
        if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
            event.preventDefault();
            this.removeFloatingNav();
            var target = $(event.target || event.srcElement || event.currentTarget);
            var ul = void 0, anchor = target;
            // find the UL
            if (!target.is('a')) {
                anchor = target.parent('a');
            }
            ul = anchor.next();
            if (!ul.length) {
                return; // if not submenu return
            }
            var $aside = $('.aside');
            var $asideInner = $aside.children('.aside-inner'); // for top offset calculation
            var $sidebar = $asideInner.children('.sidebar');
            var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            var itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();
            var floatingNav_1 = ul.clone().appendTo($aside);
            var vwHeight = $(window).height();
            // let itemTop = anchor.position().top || anchor.offset().top;
            floatingNav_1
                .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
                .addClass('nav-floating')
                .css({
                position: this.settings.layout.isFixed ? 'fixed' : 'absolute',
                top: itemTop,
                bottom: (floatingNav_1.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });
            floatingNav_1
                .on('mouseleave', function () { floatingNav_1.remove(); })
                .find('a').on('click', function (e) {
                e.preventDefault(); // prevents page reload on click
                // get the exact route path to navigate
                var routeTo = $(this).attr('route');
                if (routeTo)
                    self.router.navigate([routeTo]);
            });
            this.listenForExternalClicks();
        }
    };
    SidebarComponent.prototype.listenForExternalClicks = function () {
        var _this = this;
        var $doc = $(document).on('click.sidebar', function (e) {
            if (!$(e.target).parents('.aside').length) {
                _this.removeFloatingNav();
                $doc.off('click.sidebar');
            }
        });
    };
    SidebarComponent.prototype.removeFloatingNav = function () {
        $('.nav-floating').remove();
    };
    SidebarComponent.prototype.isSidebarCollapsed = function () {
        return this.settings.layout.isCollapsed;
    };
    SidebarComponent.prototype.isSidebarCollapsedText = function () {
        return this.settings.layout.isCollapsedText;
    };
    SidebarComponent.prototype.isEnabledHover = function () {
        return this.settings.layout.asideHover;
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar',
        template: __webpack_require__("../../../../../src/app/layout/sidebar/sidebar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/sidebar/sidebar.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__core_menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_menu_menu_service__["a" /* MenuService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_settings_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]) === "function" && _c || Object])
], SidebarComponent);

var _a, _b, _c;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/userblock/userblock.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"item user-block\" *ngIf=\"userBlockIsVisible()\" style=\"display:none\">\r\n    <!-- User picture-->\r\n    <div class=\"user-block-picture\">\r\n        <div class=\"user-block-status\">\r\n            <img class=\"img-thumbnail img-circle\" [src]=\"user.picture\" alt=\"Avatar\" />\r\n            <div class=\"circle circle-success circle-lg\"></div>\r\n        </div>\r\n    </div>\r\n    <!-- Name and Job-->\r\n    <div class=\"user-block-info\">\r\n        <span class=\"user-block-name\">{{ 'sidebar.WELCOME' | translate }}  John</span>\r\n        <span class=\"user-block-role\">Programmer</span>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/userblock/userblock.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/userblock/userblock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserblockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userblock_service__ = __webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserblockComponent = (function () {
    function UserblockComponent(userblockService) {
        this.userblockService = userblockService;
        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }
    UserblockComponent.prototype.ngOnInit = function () {
    };
    UserblockComponent.prototype.userBlockIsVisible = function () {
        return this.userblockService.getVisibility();
    };
    return UserblockComponent;
}());
UserblockComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-userblock',
        template: __webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/sidebar/userblock/userblock.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__userblock_service__["a" /* UserblockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__userblock_service__["a" /* UserblockService */]) === "function" && _a || Object])
], UserblockComponent);

var _a;
//# sourceMappingURL=userblock.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/sidebar/userblock/userblock.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserblockService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserblockService = (function () {
    function UserblockService() {
        // initially visible
        this.userBlockVisible = true;
    }
    UserblockService.prototype.getVisibility = function () {
        return this.userBlockVisible;
    };
    UserblockService.prototype.setVisibility = function (stat) {
        if (stat === void 0) { stat = true; }
        this.userBlockVisible = stat;
    };
    UserblockService.prototype.toggleVisibility = function () {
        this.userBlockVisible = !this.userBlockVisible;
    };
    return UserblockService;
}());
UserblockService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UserblockService);

//# sourceMappingURL=userblock.service.js.map

/***/ }),

/***/ "../../../../../src/app/routes/menu.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return menu; });
/* const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
}; */
var Home = {
    text: 'Home',
    link: '/gridStatus',
    icon: 'icon-home'
};
var Elements = {
    text: 'Elements',
    link: '/elements',
    icon: 'icon-chemistry',
    submenu: [
        {
            text: 'Buttons',
            link: '/elements/buttons'
        },
        {
            text: 'Interaction',
            link: '/elements/interaction'
        },
        {
            text: 'Notification',
            link: '/elements/notification'
        },
        {
            text: 'SweetAlert',
            link: '/elements/sweetalert'
        },
        {
            text: 'Spinners',
            link: '/elements/spinners'
        },
        {
            text: 'Dropdown',
            link: '/elements/dropdown'
        },
        {
            text: 'Nav Tree',
            link: '/elements/navtree'
        },
        {
            text: 'Sortable',
            link: '/elements/sortable'
        },
        {
            text: 'Grid',
            link: '/elements/grid'
        },
        {
            text: 'Grid Masonry',
            link: '/elements/gridmasonry'
        },
        {
            text: 'Typography',
            link: '/elements/typography'
        },
        {
            text: 'Font Icons',
            link: '/elements/iconsfont'
        },
        {
            text: 'Weahter Icons',
            link: '/elements/iconsweather'
        },
        {
            text: 'Colors',
            link: '/elements/colors'
        },
        {
            text: 'Infinite Scroll',
            link: '/elements/infinitescroll'
        }
    ]
};
var DataMapViewer = {
    text: 'Data Map Viewer',
    link: '/dataMapViewer',
    icon: 'icon-map'
};
var headingMain = {
    text: 'Main Navigation',
    heading: true
};
var Pages = {
    text: 'Pages',
    link: '/pages',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Maintenance',
            link: '/maintenance'
        }
    ]
};
var WorkAllocation = {
    text: 'Work Allocation',
    link: '/workAllocation',
    icon: 'icon-note',
    submenu: [
        {
            text: 'JobAllocation',
            link: '/workAllocation/jobAllocation'
        }
    ]
};
var Configuration = {
    text: 'Configuration',
    link: '/configuration',
    icon: 'icon-briefcase',
    submenu: [
        {
            text: 'Data Integrity Checks',
            link: '/configuration/dataIntegrityChecks'
        }
    ]
};
var ProductionStatus = {
    text: 'Production Status',
    link: '/productionStatus',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Field Production Status',
            link: '/productionStatus/fieldProductionStatus'
        },
        {
            text: 'Field & Back office Schedule',
            link: '/productionStatus/fieldBacofficeSchedule'
        },
        {
            text: 'Grid History',
            link: '/productionStatus/gridHistory'
        }
    ]
};
/* const Reports = {
    text: 'Reports',
    link: '/reports',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Feeder Summary',
            link: '/reports/feederSummary'
        },
         {
            text: 'Feature Counts WIP',
            link: '/reports/featureCountsWIP'
        },
        {
            text: 'Feature Counts Summary',
            link: '/reports/featureCountsSummary'
        },
        {
            text: 'Feature Counts by Feeder',
            link: '/reports/featureCountsbyFeeder'
        },
        {
            text: 'Feature-wise field vs GIS',
            link: '/reports/featurewisefieldvsGIS'
        },
        {
            text: 'Planned Vs Actual',
            link: '/reports/plannedVsActual'
        }
    ]
}; */
var FeederSummary = {
    text: 'Feeder Summary',
    link: '/reports/feederSummary',
    icon: 'icon-grid'
};
var FeaturewisefieldvsGIS = {
    text: 'Field vs GIS',
    link: '/reports/featurewisefieldvsGIS',
    icon: 'icon-grid'
};
var PlannedVsActual = {
    text: 'Planned vs Actual',
    link: '/reports/plannedVsActual',
    icon: 'icon-grid'
};
var Invoice = {
    text: 'Invoice',
    link: '/reports/invoice',
    icon: 'icon-grid'
};
var GridStatus = {
    text: 'Grid Status',
    link: '/reports/gridStatus',
    icon: 'icon-grid'
};
var safetyStatistics = {
    text: 'Safety Statistics',
    link: '/safetyStatistics',
    icon: 'icon-basket-loaded',
    submenu: [
        {
            text: 'OSHA Status & DART Rate Trend',
            link: '/safetyStatistics/oSHAStatusDARTRateTrend'
        },
        {
            text: 'Incident Reporting & Trend graph',
            link: '/safetyStatistics/incidentReportingTrendgraph'
        },
        {
            text: 'Safety Audits & Analysis',
            link: '/safetyStatistics/safetyAuditsAnalysis'
        },
        {
            text: 'Quality',
            link: '/safetyStatistics/quality'
        }
    ]
};
var Clarification = {
    text: 'Clarification',
    link: '/clarification',
    icon: 'icon-cup'
};
var Communication = {
    text: 'Communication',
    link: '/communication',
    icon: 'icon-graph'
};
var PlantSafetyConditions = {
    text: 'Plant Safety Conditions',
    link: '/plantSafetyConditions',
    icon: 'icon-doc'
};
var DATViewer = {
    text: 'DAT Viewer',
    link: '/dATViewer',
    icon: 'icon-map'
};
var JOBS = {
    text: 'Validations',
    link: '/job-management',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Execute Validations',
            link: '/job-management/job-execution'
        },
        {
            text: 'Validation Results',
            link: '/job-management/job-list'
        }
    ]
};
var menu = [
    Home,
    DataMapViewer,
    //WorkAllocation,
    //Configuration,
    //ProductionStatus,
    //Reports,
    //safetyStatistics,
    //Clarification,
    //Communication,
    //PlantSafetyConditions
    FeederSummary,
    FeaturewisefieldvsGIS,
    PlannedVsActual,
    Invoice,
    JOBS
    //GridStatus
];
//# sourceMappingURL=menu.js.map

/***/ }),

/***/ "../../../../../src/app/routes/pages/maintenance/maintenance.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n    <div class=\"text-center mv-lg\">\r\n        <h1 class=\"mb-lg\">\r\n            <sup>\r\n                <em class=\"fa fa-cog fa-2x text-muted fa-spin text-info\"></em>\r\n            </sup>\r\n            <em class=\"fa fa-cog fa-5x text-muted fa-spin text-purple\"></em>\r\n            <em class=\"fa fa-cog fa-lg text-muted fa-spin text-success\"></em>\r\n        </h1>\r\n        <div class=\"text-bold text-lg mb-lg\">THIS PAGE IS UNDER DEVELOPMENT</div>\r\n        \r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/pages/maintenance/maintenance.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/pages/maintenance/maintenance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MaintenanceComponent = (function () {
    function MaintenanceComponent() {
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
    };
    return MaintenanceComponent;
}());
MaintenanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-maintenance',
        template: __webpack_require__("../../../../../src/app/routes/pages/maintenance/maintenance.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/pages/maintenance/maintenance.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], MaintenanceComponent);

//# sourceMappingURL=maintenance.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/pages/pages.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__maintenance_maintenance_component__ = __webpack_require__("../../../../../src/app/routes/pages/maintenance/maintenance.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Use this routes definition in case you want to make them lazy-loaded */
/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/
var PagesModule = (function () {
    function PagesModule() {
    }
    return PagesModule;
}());
PagesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
            // RouterModule.forChild(routes)
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__maintenance_maintenance_component__["a" /* MaintenanceComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ],
        providers: []
    })
], PagesModule);

//# sourceMappingURL=pages.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/routes.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_translator_translator_service__ = __webpack_require__("../../../../../src/app/core/translator/translator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__ = __webpack_require__("../../../../../src/app/core/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_pages_module__ = __webpack_require__("../../../../../src/app/routes/pages/pages.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu__ = __webpack_require__("../../../../../src/app/routes/menu.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__("../../../../../src/app/routes/routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RoutesModule = (function () {
    function RoutesModule(menuService, tr) {
        this.menuService = menuService;
        menuService.addMenu(__WEBPACK_IMPORTED_MODULE_6__menu__["a" /* menu */]);
    }
    return RoutesModule;
}());
RoutesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__pages_pages_module__["a" /* PagesModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */])
        ],
        declarations: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_menu_menu_service__["a" /* MenuService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_translator_translator_service__["a" /* TranslatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_translator_translator_service__["a" /* TranslatorService */]) === "function" && _b || Object])
], RoutesModule);

var _a, _b;
//# sourceMappingURL=routes.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout_layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_maintenance_maintenance_component__ = __webpack_require__("../../../../../src/app/routes/pages/maintenance/maintenance.component.ts");


var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__layout_layout_component__["a" /* LayoutComponent */],
        children: [
            { path: '', redirectTo: '/gridStatus', pathMatch: 'full' },
            { path: 'gridStatus', loadChildren: './gridStatus/gridStatus.module#HomeModule' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'dataMapViewer', loadChildren: './dataMapViewer/dataMapViewer.module#DataMapViewerModule' },
            { path: 'dATViewer', loadChildren: './dATViewer/dATViewer.module#DATViewerModule' },
            { path: 'map', loadChildren: './esriMap/esri-map.module#EsriMapModule' },
            { path: 'maintenance', component: __WEBPACK_IMPORTED_MODULE_1__pages_maintenance_maintenance_component__["a" /* MaintenanceComponent */] },
            { path: 'job-management', loadChildren: './jobs/jobs.module#JobsModule' }
        ]
    },
    // Not found
    { path: '**', redirectTo: 'maintenance' }
];
//# sourceMappingURL=routes.js.map

/***/ }),

/***/ "../../../../../src/app/shared/colors/colors.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorsService = (function () {
    function ColorsService() {
        this.APP_COLORS = {
            'primary': '#5d9cec',
            'success': '#27c24c',
            'info': '#23b7e5',
            'warning': '#ff902b',
            'danger': '#f05050',
            'inverse': '#131e26',
            'green': '#37bc9b',
            'pink': '#f532e5',
            'purple': '#7266ba',
            'dark': '#3a3f51',
            'yellow': '#fad732',
            'gray-darker': '#232735',
            'gray-dark': '#3a3f51',
            'gray': '#dde6e9',
            'gray-light': '#e4eaec',
            'gray-lighter': '#edf1f2'
        };
    }
    ColorsService.prototype.byName = function (name) {
        // console.log(name +' -> ' + this.APP_COLORS[name])
        return (this.APP_COLORS[name] || '#fff');
    };
    return ColorsService;
}());
ColorsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ColorsService);

//# sourceMappingURL=colors.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/checkall/checkall.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckallDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CheckallDirective = (function () {
    function CheckallDirective(el) {
        this.el = el;
        var $element = $(el.nativeElement);
        $element.on('change', function () {
            var index = $element.index() + 1, checkbox = $element.find('input[type="checkbox"]'), table = $element.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                .prop('checked', checkbox[0].checked);
        });
    }
    return CheckallDirective;
}());
CheckallDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[checkAll]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], CheckallDirective);

var _a;
//# sourceMappingURL=checkall.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/easypiechart/easypiechart.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EasypiechartDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EasypiechartDirective = (function () {
    function EasypiechartDirective(element) {
        this.element = element;
        /**
         * default easy pie chart options
         * @type {Object}
         */
        this.defaultOptions = {
            barColor: '#ef1e25',
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true
            }
        };
        this.percent = this.percent || 0;
        this.options = $.extend({}, this.defaultOptions, this.options);
    }
    EasypiechartDirective.prototype.ngOnInit = function () {
        if (EasyPieChart) {
            this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
            this.pieChart.update(this.percent);
        }
    };
    EasypiechartDirective.prototype.ngOnChanges = function (changes) {
        if (this.pieChart && changes['percent']) {
            this.pieChart.update(this.percent);
        }
    };
    return EasypiechartDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EasypiechartDirective.prototype, "percent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EasypiechartDirective.prototype, "options", void 0);
EasypiechartDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[easypiechart]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], EasypiechartDirective);

var _a;
//# sourceMappingURL=easypiechart.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/flot/flot.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlotDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FlotDirective = (function () {
    function FlotDirective(el) {
        this.el = el;
        this.ready = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.element = $(this.el.nativeElement);
        if (!$.plot) {
            console.log('Flot chart no available.');
        }
        this.plot = null;
    }
    FlotDirective.prototype.ngOnInit = function () { };
    FlotDirective.prototype.ngOnChanges = function (changes) {
        if (!$.plot) {
            return;
        }
        if (changes['dataset']) {
            this.onDatasetChanged(this.dataset);
        }
        if (changes['series']) {
            this.onSerieToggled(this.series);
        }
    };
    FlotDirective.prototype.init = function () {
        var heightDefault = 220;
        this.width = this.attrWidth || '100%';
        this.height = this.height || heightDefault;
        this.element.css({
            width: this.width,
            height: this.height
        });
        var plotObj;
        if (!this.dataset || !this.options) {
            return;
        }
        plotObj = $.plot(this.el.nativeElement, this.dataset, this.options);
        if (this.ready) {
            this.ready.next({ plot: plotObj });
        }
        return plotObj;
    };
    FlotDirective.prototype.onDatasetChanged = function (dataset) {
        if (this.plot) {
            this.plot.setData(dataset);
            this.plot.setupGrid();
            return this.plot.draw();
        }
        else {
            this.plot = this.init();
            this.onSerieToggled(this.series);
            return this.plot;
        }
    };
    FlotDirective.prototype.onSerieToggled = function (series) {
        if (!this.plot || !series) {
            return;
        }
        var someData = this.plot.getData();
        for (var sName in series) {
            series[sName].forEach(toggleFor(sName));
        }
        this.plot.setData(someData);
        this.plot.draw();
        function toggleFor(sName) {
            return function (s, i) {
                if (someData[i] && someData[i][sName]) {
                    someData[i][sName].show = s;
                }
            };
        }
    };
    FlotDirective.prototype.ngOnDestroy = function () {
        if (this.plot) {
            this.plot.shutdown();
        }
    };
    return FlotDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FlotDirective.prototype, "dataset", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FlotDirective.prototype, "options", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FlotDirective.prototype, "attrWidth", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], FlotDirective.prototype, "height", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FlotDirective.prototype, "series", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FlotDirective.prototype, "ready", void 0);
FlotDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[flot]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], FlotDirective);

var _a;
//# sourceMappingURL=flot.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/jqcloud/jqcloud.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JqcloudDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JqcloudDirective = (function () {
    function JqcloudDirective(element) {
        this.initialized = false; // flag to not update before plugin was initialized
        this.$elem = $(element.nativeElement);
        this.options = $.fn.jQCloud.defaults.get();
    }
    JqcloudDirective.prototype.ngOnInit = function () {
        var opts = {};
        if (this.width) {
            opts.width = this.width;
        }
        if (this.height) {
            opts.height = this.height;
        }
        if (this.steps) {
            opts.steps = this.steps;
        }
        $.extend(this.options, opts);
        this.$elem.jQCloud(this.words, opts);
        this.initialized = true;
    };
    JqcloudDirective.prototype.ngOnChanges = function (changes) {
        if (this.initialized && this.words && changes['words']) {
            this.$elem.jQCloud('update', this.words);
        }
    };
    JqcloudDirective.prototype.ngOnDestroy = function () {
        this.$elem.jQCloud('destroy');
    };
    return JqcloudDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], JqcloudDirective.prototype, "words", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], JqcloudDirective.prototype, "width", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], JqcloudDirective.prototype, "height", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], JqcloudDirective.prototype, "steps", void 0);
JqcloudDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[jqcloud]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], JqcloudDirective);

var _a;
//# sourceMappingURL=jqcloud.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/now/now.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NowDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NowDirective = (function () {
    function NowDirective(element) {
        this.element = element;
    }
    NowDirective.prototype.ngOnInit = function () {
        this.updateTime();
        this.intervalId = setInterval(this.updateTime.bind(this), 1000);
    };
    NowDirective.prototype.updateTime = function () {
        var dt = __WEBPACK_IMPORTED_MODULE_1_moment__().format(this.format);
        this.element.nativeElement.innerHTML = dt;
    };
    NowDirective.prototype.ngOnDestroy = function () {
        clearInterval(this.intervalId);
    };
    return NowDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NowDirective.prototype, "format", void 0);
NowDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[now]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], NowDirective);

var _a;
//# sourceMappingURL=now.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/scrollable/scrollable.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollableDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScrollableDirective = (function () {
    function ScrollableDirective(element) {
        this.element = element;
        this.defaultHeight = 250;
    }
    ScrollableDirective.prototype.ngOnInit = function () {
        $(this.element.nativeElement).slimScroll({
            height: (this.height || this.defaultHeight)
        });
    };
    return ScrollableDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ScrollableDirective.prototype, "height", void 0);
ScrollableDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'scrollable'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], ScrollableDirective);

var _a;
//# sourceMappingURL=scrollable.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/sparkline/sparkline.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparklineDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SparklineDirective = (function () {
    function SparklineDirective(el) {
        this.el = el;
        // generate a unique resize event so we can detach later
        this.resizeEventId = 'resize.sparkline' + 1324;
        this.$element = $(el.nativeElement);
    }
    SparklineDirective.prototype.ngOnInit = function () {
        this.initSparkLine();
    };
    SparklineDirective.prototype.initSparkLine = function () {
        var _this = this;
        var options = this.sparkline, data = this.$element.data();
        if (!options) {
            options = data;
        }
        else {
            if (data) {
                options = $.extend({}, options, data);
            }
        }
        options.type = options.type || 'bar'; // default chart is bar
        options.disableHiddenCheck = true;
        this.runSparkline(options);
        if (options.resize) {
            $(window).on(this.resizeEventId, function () {
                _this.runSparkline(options);
            });
        }
    };
    SparklineDirective.prototype.runSparkline = function (options) {
        if (this.values) {
            if (typeof this.values === 'string')
                this.values = this.values.split(','); // assume comma separated string
            this.$element.sparkline(this.values, options);
        }
        else {
            this.$element.sparkline('html', options);
        }
    };
    SparklineDirective.prototype.ngOnDestroy = function () {
        $(window).off(this.resizeEventId);
    };
    return SparklineDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SparklineDirective.prototype, "sparkline", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SparklineDirective.prototype, "values", void 0);
SparklineDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[sparkline]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], SparklineDirective);

var _a;
//# sourceMappingURL=sparkline.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directives/vectormap/vectormap.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VectormapDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VectormapDirective = (function () {
    function VectormapDirective(element) {
        this.element = element;
    }
    VectormapDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.$element = $(this.element.nativeElement);
        this.$element.css('height', this.mapHeight);
        if (!this.$element.vectorMap) {
            return;
        }
        this.$element.vectorMap({
            map: this.mapName,
            backgroundColor: this.mapOptions.bgColor,
            zoomMin: 1,
            zoomMax: 8,
            zoomOnScroll: false,
            regionStyle: {
                initial: {
                    'fill': this.mapOptions.regionFill,
                    'fill-opacity': 1,
                    'stroke': 'none',
                    'stroke-width': 1.5,
                    'stroke-opacity': 1
                },
                hover: {
                    'fill-opacity': 0.8
                },
                selected: {
                    fill: 'blue'
                },
                selectedHover: {}
            },
            focusOn: { x: 0.4, y: 0.6, scale: this.mapOptions.scale },
            markerStyle: {
                initial: {
                    fill: this.mapOptions.markerColor,
                    stroke: this.mapOptions.markerColor
                }
            },
            onRegionLabelShow: function (e, el, code) {
                if (_this.seriesData && _this.seriesData[code]) {
                    el.html(el.html() + ': ' + _this.seriesData[code] + ' visitors');
                }
            },
            markers: this.markersData,
            series: {
                regions: [{
                        values: this.seriesData,
                        scale: this.mapOptions.scaleColors,
                        normalizeFunction: 'polynomial'
                    }]
            },
        });
    };
    return VectormapDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], VectormapDirective.prototype, "mapHeight", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VectormapDirective.prototype, "mapName", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VectormapDirective.prototype, "mapOptions", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VectormapDirective.prototype, "seriesData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VectormapDirective.prototype, "markersData", void 0);
VectormapDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[vectormap]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], VectormapDirective);

var _a;
//# sourceMappingURL=vectormap.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_toaster_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_accordion__ = __webpack_require__("../../../../ngx-bootstrap/accordion/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_alert__ = __webpack_require__("../../../../ngx-bootstrap/alert/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_buttons__ = __webpack_require__("../../../../ngx-bootstrap/buttons/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_carousel__ = __webpack_require__("../../../../ngx-bootstrap/carousel/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_collapse__ = __webpack_require__("../../../../ngx-bootstrap/collapse/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_bootstrap_pagination__ = __webpack_require__("../../../../ngx-bootstrap/pagination/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_progressbar__ = __webpack_require__("../../../../ngx-bootstrap/progressbar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_rating__ = __webpack_require__("../../../../ngx-bootstrap/rating/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_timepicker__ = __webpack_require__("../../../../ngx-bootstrap/timepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_tooltip__ = __webpack_require__("../../../../ngx-bootstrap/tooltip/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap_typeahead__ = __webpack_require__("../../../../ngx-bootstrap/typeahead/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_bootstrap_datepicker__ = __webpack_require__("../../../../ngx-bootstrap/datepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__directives_flot_flot_directive__ = __webpack_require__("../../../../../src/app/shared/directives/flot/flot.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__directives_sparkline_sparkline_directive__ = __webpack_require__("../../../../../src/app/shared/directives/sparkline/sparkline.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__directives_easypiechart_easypiechart_directive__ = __webpack_require__("../../../../../src/app/shared/directives/easypiechart/easypiechart.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__colors_colors_service__ = __webpack_require__("../../../../../src/app/shared/colors/colors.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_checkall_checkall_directive__ = __webpack_require__("../../../../../src/app/shared/directives/checkall/checkall.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__directives_vectormap_vectormap_directive__ = __webpack_require__("../../../../../src/app/shared/directives/vectormap/vectormap.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__directives_now_now_directive__ = __webpack_require__("../../../../../src/app/shared/directives/now/now.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__directives_scrollable_scrollable_directive__ = __webpack_require__("../../../../../src/app/shared/directives/scrollable/scrollable.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__directives_jqcloud_jqcloud_directive__ = __webpack_require__("../../../../../src/app/shared/directives/jqcloud/jqcloud.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























// https://angular.io/styleguide#!#04-10
var SharedModule = SharedModule_1 = (function () {
    // https://github.com/ocombe/ng2-translate/issues/209
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1
        };
    };
    return SharedModule;
}());
SharedModule = SharedModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_alert__["a" /* AlertModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_buttons__["a" /* ButtonsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_carousel__["a" /* CarouselModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_collapse__["a" /* CollapseModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_20_ngx_bootstrap_datepicker__["a" /* DatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_modal__["b" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_13_ngx_bootstrap_pagination__["a" /* PaginationModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_progressbar__["a" /* ProgressbarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_rating__["a" /* RatingModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_timepicker__["a" /* TimepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_tooltip__["a" /* TooltipModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap_typeahead__["a" /* TypeaheadModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_angular2_toaster_angular2_toaster__["a" /* ToasterModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__colors_colors_service__["a" /* ColorsService */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_21__directives_flot_flot_directive__["a" /* FlotDirective */],
            __WEBPACK_IMPORTED_MODULE_22__directives_sparkline_sparkline_directive__["a" /* SparklineDirective */],
            __WEBPACK_IMPORTED_MODULE_23__directives_easypiechart_easypiechart_directive__["a" /* EasypiechartDirective */],
            __WEBPACK_IMPORTED_MODULE_25__directives_checkall_checkall_directive__["a" /* CheckallDirective */],
            __WEBPACK_IMPORTED_MODULE_26__directives_vectormap_vectormap_directive__["a" /* VectormapDirective */],
            __WEBPACK_IMPORTED_MODULE_27__directives_now_now_directive__["a" /* NowDirective */],
            __WEBPACK_IMPORTED_MODULE_28__directives_scrollable_scrollable_directive__["a" /* ScrollableDirective */],
            __WEBPACK_IMPORTED_MODULE_29__directives_jqcloud_jqcloud_directive__["a" /* JqcloudDirective */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_accordion__["a" /* AccordionModule */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_alert__["a" /* AlertModule */],
            __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_buttons__["a" /* ButtonsModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_carousel__["a" /* CarouselModule */],
            __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_collapse__["a" /* CollapseModule */],
            __WEBPACK_IMPORTED_MODULE_20_ngx_bootstrap_datepicker__["a" /* DatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
            __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_modal__["b" /* ModalModule */],
            __WEBPACK_IMPORTED_MODULE_13_ngx_bootstrap_pagination__["a" /* PaginationModule */],
            __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_progressbar__["a" /* ProgressbarModule */],
            __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_rating__["a" /* RatingModule */],
            __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_tabs__["a" /* TabsModule */],
            __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_timepicker__["a" /* TimepickerModule */],
            __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_tooltip__["a" /* TooltipModule */],
            __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap_typeahead__["a" /* TypeaheadModule */],
            __WEBPACK_IMPORTED_MODULE_5_angular2_toaster_angular2_toaster__["a" /* ToasterModule */],
            __WEBPACK_IMPORTED_MODULE_21__directives_flot_flot_directive__["a" /* FlotDirective */],
            __WEBPACK_IMPORTED_MODULE_22__directives_sparkline_sparkline_directive__["a" /* SparklineDirective */],
            __WEBPACK_IMPORTED_MODULE_23__directives_easypiechart_easypiechart_directive__["a" /* EasypiechartDirective */],
            __WEBPACK_IMPORTED_MODULE_25__directives_checkall_checkall_directive__["a" /* CheckallDirective */],
            __WEBPACK_IMPORTED_MODULE_26__directives_vectormap_vectormap_directive__["a" /* VectormapDirective */],
            __WEBPACK_IMPORTED_MODULE_27__directives_now_now_directive__["a" /* NowDirective */],
            __WEBPACK_IMPORTED_MODULE_28__directives_scrollable_scrollable_directive__["a" /* ScrollableDirective */],
            __WEBPACK_IMPORTED_MODULE_29__directives_jqcloud_jqcloud_directive__["a" /* JqcloudDirective */]
        ]
    })
    // https://github.com/ocombe/ng2-translate/issues/209
], SharedModule);

var SharedModule_1;
//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-a.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #fff; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #23b7e5 0%, #51c6ea 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF23B7E5', endColorstr='#FF51C6EA', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #23b7e5; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #23b7e5; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #117391; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #23b7e5;\n    background-image: linear-gradient(to right, #23b7e5 0%, #51c6ea 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF23B7E5', endColorstr='#FF51C6EA', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #23b7e5;\n    background-image: linear-gradient(to right, #23b7e5 0%, #51c6ea 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF23B7E5', endColorstr='#FF51C6EA', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #117391; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #fff; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #515253; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #23b7e5; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #fcfcfc;\n    color: #23b7e5; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #23b7e5; }\n  .sidebar .nav > li.active {\n    border-left-color: #23b7e5; }\n\n.sidebar-subnav {\n  background-color: #fff; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #515253; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #515253; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #23b7e5; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #23b7e5; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #23b7e5;\n      background-color: #23b7e5; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-b.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #fff; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #37bc9b 0%, #58ceb1 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF37BC9B', endColorstr='#FF58CEB1', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #37bc9b; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #37bc9b; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #206d5a; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #37bc9b;\n    background-image: linear-gradient(to right, #37bc9b 0%, #58ceb1 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF37BC9B', endColorstr='#FF58CEB1', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #37bc9b;\n    background-image: linear-gradient(to right, #37bc9b 0%, #58ceb1 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF37BC9B', endColorstr='#FF58CEB1', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #206d5a; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #fff; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #515253; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #37bc9b; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #fcfcfc;\n    color: #37bc9b; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #37bc9b; }\n  .sidebar .nav > li.active {\n    border-left-color: #37bc9b; }\n\n.sidebar-subnav {\n  background-color: #fff; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #515253; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #515253; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #37bc9b; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #37bc9b; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #37bc9b;\n      background-color: #37bc9b; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-c.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #fff; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #7266ba 0%, #9289ca 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF7266BA', endColorstr='#FF9289CA', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #7266ba; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #7266ba; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #443a80; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #7266ba;\n    background-image: linear-gradient(to right, #7266ba 0%, #9289ca 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF7266BA', endColorstr='#FF9289CA', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #7266ba;\n    background-image: linear-gradient(to right, #7266ba 0%, #9289ca 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF7266BA', endColorstr='#FF9289CA', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #443a80; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #fff; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #515253; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #7266ba; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #fcfcfc;\n    color: #7266ba; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #7266ba; }\n  .sidebar .nav > li.active {\n    border-left-color: #7266ba; }\n\n.sidebar-subnav {\n  background-color: #fff; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #515253; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #515253; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #7266ba; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #7266ba; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #7266ba;\n      background-color: #7266ba; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-d.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #fff; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #f05050 0%, #f47f7f 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFF05050', endColorstr='#FFF47F7F', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #f05050; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #f05050; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #c91111; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #f05050;\n    background-image: linear-gradient(to right, #f05050 0%, #f47f7f 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFF05050', endColorstr='#FFF47F7F', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #f05050;\n    background-image: linear-gradient(to right, #f05050 0%, #f47f7f 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFF05050', endColorstr='#FFF47F7F', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #c91111; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #fff; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #515253; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #f05050; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #fcfcfc;\n    color: #f05050; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #f05050; }\n  .sidebar .nav > li.active {\n    border-left-color: #f05050; }\n\n.sidebar-subnav {\n  background-color: #fff; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #515253; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #515253; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #f05050; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #f05050; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #f05050;\n      background-color: #f05050; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-e.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #3a3f51; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #1797be 0%, #23b7e5 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF1797BE', endColorstr='#FF23B7E5', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #1797be; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #1797be; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #0c4f63; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #1797be;\n    background-image: linear-gradient(to right, #1797be 0%, #23b7e5 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF1797BE', endColorstr='#FF23B7E5', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #1797be;\n    background-image: linear-gradient(to right, #1797be 0%, #23b7e5 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF1797BE', endColorstr='#FF23B7E5', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #0c4f63; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #3a3f51; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #1797be; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #383d4e;\n    color: #1797be; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #1797be; }\n  .sidebar .nav > li.active {\n    border-left-color: #1797be; }\n\n.sidebar-subnav {\n  background-color: #3a3f51; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #e1e2e3; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #1797be; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #1797be; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #1797be;\n      background-color: #1797be; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-f.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #3a3f51; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #2b957a 0%, #37bc9b 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF2B957A', endColorstr='#FF37BC9B', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #2b957a; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #2b957a; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #144639; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #2b957a;\n    background-image: linear-gradient(to right, #2b957a 0%, #37bc9b 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF2B957A', endColorstr='#FF37BC9B', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #2b957a;\n    background-image: linear-gradient(to right, #2b957a 0%, #37bc9b 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF2B957A', endColorstr='#FF37BC9B', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #144639; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #3a3f51; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #2b957a; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #383d4e;\n    color: #2b957a; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #2b957a; }\n  .sidebar .nav > li.active {\n    border-left-color: #2b957a; }\n\n.sidebar-subnav {\n  background-color: #3a3f51; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #e1e2e3; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #2b957a; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #2b957a; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #2b957a;\n      background-color: #2b957a; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-g.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #3a3f51; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #564aa3 0%, #7266ba 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF564AA3', endColorstr='#FF7266BA', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #564aa3; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #564aa3; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #312a5d; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #564aa3;\n    background-image: linear-gradient(to right, #564aa3 0%, #7266ba 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF564AA3', endColorstr='#FF7266BA', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #564aa3;\n    background-image: linear-gradient(to right, #564aa3 0%, #7266ba 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF564AA3', endColorstr='#FF7266BA', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #312a5d; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #3a3f51; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #9289ca; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #383d4e;\n    color: #9289ca; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #9289ca; }\n  .sidebar .nav > li.active {\n    border-left-color: #9289ca; }\n\n.sidebar-subnav {\n  background-color: #3a3f51; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #e1e2e3; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #9289ca; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #9289ca; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #9289ca;\n      background-color: #9289ca; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/styles/themes/theme-h.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n/* ========================================================================\r\n   Component: layout\r\n ========================================================================== */\nbody,\n.wrapper > section {\n  background-color: #f5f7fa; }\n\n.wrapper > .aside {\n  background-color: #3a3f51; }\n\n/* ========================================================================\r\n   Component: top-navbar\r\n ========================================================================== */\n.topnavbar {\n  background-color: #fff; }\n  .topnavbar .navbar-header {\n    background-color: transparent;\n    background-image: linear-gradient(to right, #ec2121 0%, #f05050 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEC2121', endColorstr='#FFF05050', GradientType=1); }\n    @media only screen and (min-width: 768px) {\n      .topnavbar .navbar-header {\n        background-image: none; } }\n  .topnavbar .navbar-nav > li > .navbar-text {\n    color: #ec2121; }\n  .topnavbar .navbar-nav > li > a,\n  .topnavbar .navbar-nav > .open > a {\n    color: #ec2121; }\n    .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n    .topnavbar .navbar-nav > .open > a:hover,\n    .topnavbar .navbar-nav > .open > a:focus {\n      color: #9a0d0d; }\n  .topnavbar .navbar-nav > .active > a, .topnavbar .navbar-nav > .active > a:hover, .topnavbar .navbar-nav > .active > a:focus,\n  .topnavbar .navbar-nav > .open > a,\n  .topnavbar .navbar-nav > .open > a:hover,\n  .topnavbar .navbar-nav > .open > a:focus {\n    background-color: transparent; }\n  .topnavbar .navbar-nav > li > [data-toggle='navbar-search'] {\n    color: #fff; }\n  .topnavbar .nav-wrapper {\n    background-color: #ec2121;\n    background-image: linear-gradient(to right, #ec2121 0%, #f05050 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEC2121', endColorstr='#FFF05050', GradientType=1); }\n\n@media only screen and (min-width: 768px) {\n  .topnavbar {\n    background-color: #ec2121;\n    background-image: linear-gradient(to right, #ec2121 0%, #f05050 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEC2121', endColorstr='#FFF05050', GradientType=1); }\n    .topnavbar .navbar-nav > .open > a, .topnavbar .navbar-nav > .open > a:hover, .topnavbar .navbar-nav > .open > a:focus {\n      box-shadow: 0 -3px 0 rgba(255, 255, 255, 0.5) inset; }\n    .topnavbar .navbar-nav > li > .navbar-text {\n      color: #fff; }\n    .topnavbar .navbar-nav > li > a,\n    .topnavbar .navbar-nav > .open > a {\n      color: #fff; }\n      .topnavbar .navbar-nav > li > a:hover, .topnavbar .navbar-nav > li > a:focus,\n      .topnavbar .navbar-nav > .open > a:hover,\n      .topnavbar .navbar-nav > .open > a:focus {\n        color: #9a0d0d; } }\n\n/* ========================================================================\r\n   Component: sidebar\r\n ========================================================================== */\n.sidebar {\n  background-color: #3a3f51; }\n  .sidebar .nav-heading {\n    color: #919DA8; }\n  .sidebar .nav > li > a,\n  .sidebar .nav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar .nav > li > a:focus, .sidebar .nav > li > a:hover,\n    .sidebar .nav > li > .nav-item:focus,\n    .sidebar .nav > li > .nav-item:hover {\n      color: #f05050; }\n    .sidebar .nav > li > a > em,\n    .sidebar .nav > li > .nav-item > em {\n      color: inherits; }\n  .sidebar .nav > li.active,\n  .sidebar .nav > li.active > a,\n  .sidebar .nav > li.active .nav, .sidebar .nav > li.open,\n  .sidebar .nav > li.open > a,\n  .sidebar .nav > li.open .nav {\n    background-color: #383d4e;\n    color: #f05050; }\n  .sidebar .nav > li.active > a > em, .sidebar .nav > li.open > a > em {\n    color: #f05050; }\n  .sidebar .nav > li.active {\n    border-left-color: #f05050; }\n\n.sidebar-subnav {\n  background-color: #3a3f51; }\n  .sidebar-subnav > .sidebar-subnav-header {\n    color: #e1e2e3; }\n  .sidebar-subnav > li > a,\n  .sidebar-subnav > li > .nav-item {\n    color: #e1e2e3; }\n    .sidebar-subnav > li > a:focus, .sidebar-subnav > li > a:hover,\n    .sidebar-subnav > li > .nav-item:focus,\n    .sidebar-subnav > li > .nav-item:hover {\n      color: #f05050; }\n  .sidebar-subnav > li.active > a,\n  .sidebar-subnav > li.active > .nav-item {\n    color: #f05050; }\n    .sidebar-subnav > li.active > a:after,\n    .sidebar-subnav > li.active > .nav-item:after {\n      border-color: #f05050;\n      background-color: #f05050; }\n\n/* ========================================================================\r\n   Component: offsidebar\r\n ========================================================================== */\n.offsidebar {\n  border-left: 1px solid greyscale(#cccccc);\n  background-color: #fff;\n  color: #515253; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vendor_ts__ = __webpack_require__("../../../../../src/vendor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
var p = Object(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
p.then(function () { window.appBootstrap && window.appBootstrap(); });
// .catch(err => console.error(err));
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/modernizr.js":
/***/ (function(module, exports) {

/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-borderradius-cssanimations-csscalc-csstransforms-csstransforms3d-csstransitions-flexboxtweener-fontface-inlinesvg-localstorage-multiplebgs-preserve3d-sessionstorage-smil-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-websqldatabase-setclasses-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

  var classes = [];
  

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  ;

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;
/*!
{
  "name": "Background Position Shorthand",
  "property": "bgpositionshorthand",
  "tags": ["css"],
  "builderAliases": ["css_backgroundposition_shorthand"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en/CSS/background-position"
  }, {
    "name": "W3 Spec",
    "href": "https://www.w3.org/TR/css3-background/#background-position"
  }, {
    "name": "Demo",
    "href": "https://jsfiddle.net/Blink/bBXvt/"
  }]
}
!*/
/* DOC
Detects if you can use the shorthand method to define multiple parts of an
element's background-position simultaniously.

eg `background-position: right 10px bottom 10px`
*/

  Modernizr.addTest('bgpositionshorthand', function() {
    var elem = createElement('a');
    var eStyle = elem.style;
    var val = 'right 10px bottom 10px';
    eStyle.cssText = 'background-position: ' + val + ';';
    return (eStyle.backgroundPosition === val);
  });


  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  

  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  


  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return getComputedStyle(node, null).position == 'absolute';
      });
    }
    return undefined;
  }
  ;

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;
  

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;
  
/*!
{
  "name": "Background Position XY",
  "property": "bgpositionxy",
  "tags": ["css"],
  "builderAliases": ["css_backgroundposition_xy"],
  "authors": ["Allan Lei", "Brandom Aaron"],
  "notes": [{
    "name": "Demo",
    "href": "https://jsfiddle.net/allanlei/R8AYS/"
  }, {
    "name": "Adapted From",
    "href": "https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js"
  }]
}
!*/
/* DOC
Detects the ability to control an element's background position using css
*/

  Modernizr.addTest('bgpositionxy', function() {
    return testAllProps('backgroundPositionX', '3px', true) && testAllProps('backgroundPositionY', '5px', true);
  });

/*!
{
  "name": "Background Repeat",
  "property": ["bgrepeatspace", "bgrepeatround"],
  "tags": ["css"],
  "builderAliases": ["css_backgroundrepeat"],
  "authors": ["Ryan Seddon"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat"
  }, {
    "name": "Test Page",
    "href": "https://jsbin.com/uzesun/"
  }, {
    "name": "Demo",
    "href": "https://jsfiddle.net/ryanseddon/yMLTQ/6/"
  }]
}
!*/
/* DOC
Detects the ability to use round and space as properties for background-repeat
*/

  // Must value-test these
  Modernizr.addTest('bgrepeatround', testAllProps('backgroundRepeat', 'round'));
  Modernizr.addTest('bgrepeatspace', testAllProps('backgroundRepeat', 'space'));

/*!
{
  "name": "Background Size Cover",
  "property": "bgsizecover",
  "tags": ["css"],
  "builderAliases": ["css_backgroundsizecover"],
  "notes": [{
    "name" : "MDN Docs",
    "href": "https://developer.mozilla.org/en/CSS/background-size"
  }]
}
!*/

  // Must test value, as this specifically tests the `cover` value
  Modernizr.addTest('bgsizecover', testAllProps('backgroundSize', 'cover'));

/*!
{
  "name": "Border Radius",
  "property": "borderradius",
  "caniuse": "border-radius",
  "polyfills": ["css3pie"],
  "tags": ["css"],
  "notes": [{
    "name": "Comprehensive Compat Chart",
    "href": "https://muddledramblings.com/table-of-css3-border-radius-compliance"
  }]
}
!*/

  Modernizr.addTest('borderradius', testAllProps('borderRadius', '0px', true));

/*!
{
  "name": "CSS Animations",
  "property": "cssanimations",
  "caniuse": "css-animation",
  "polyfills": ["transformie", "csssandpaper"],
  "tags": ["css"],
  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
  "notes": [{
    "name" : "Article: 'Dispelling the Android CSS animation myths'",
    "href": "https://goo.gl/OGw5Gm"
  }]
}
!*/
/* DOC
Detects whether or not elements can be animated using CSS
*/

  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));


  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  
/*!
{
  "name": "CSS Calc",
  "property": "csscalc",
  "caniuse": "calc",
  "tags": ["css"],
  "builderAliases": ["css_calc"],
  "authors": ["@calvein"]
}
!*/
/* DOC
Method of allowing calculated values for length units. For example:

```css
//lem {
  width: calc(100% - 3em);
}
```
*/

  Modernizr.addTest('csscalc', function() {
    var prop = 'width:';
    var value = 'calc(10px);';
    var el = createElement('a');

    el.style.cssText = prop + prefixes.join(value + prop);

    return !!el.style.length;
  });

/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransforms', function() {
    // Android < 3.0 is buggy, so we sniff and blacklist
    // http://git.io/hHzL7w
    return navigator.userAgent.indexOf('Android 2.') === -1 &&
           testAllProps('transform', 'scale(1)', true);
  });


  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  
/*!
{
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
}
!*/

  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
  var oldSyntax = 'supportsCSS' in window;
  Modernizr.addTest('supports', newSyntax || oldSyntax);

/*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/

  Modernizr.addTest('csstransforms3d', function() {
    var ret = !!testAllProps('perspective', '1px', true);
    var usePrefix = Modernizr._config.usePrefixes;

    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
    //   some conditions. As a result, Webkit typically recognizes the syntax but
    //   will sometimes throw a false positive, thus we must do a more thorough check:
    if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {
      var mq;
      var defaultStyle = '#modernizr{width:0;height:0}';
      // Use CSS Conditional Rules if available
      if (Modernizr.supports) {
        mq = '@supports (perspective: 1px)';
      } else {
        // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
        // `@media (transform-3d),(-webkit-transform-3d){ ... }`
        mq = '@media (transform-3d)';
        if (usePrefix) {
          mq += ',(-webkit-transform-3d)';
        }
      }

      mq += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}';

      testStyles(defaultStyle + mq, function(elem) {
        ret = elem.offsetWidth === 7 && elem.offsetHeight === 18;
      });
    }

    return ret;
  });

/*!
{
  "name": "CSS Transform Style preserve-3d",
  "property": "preserve3d",
  "authors": ["edmellum"],
  "tags": ["css"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/762"
  }]
}
!*/
/* DOC
Detects support for `transform-style: preserve-3d`, for getting a proper 3D perspective on elements.
*/

  Modernizr.addTest('preserve3d', testAllProps('transformStyle', 'preserve-3d'));

/*!
{
  "name": "CSS Transitions",
  "property": "csstransitions",
  "caniuse": "css-transitions",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

/*!
{
  "name": "Flexbox (tweener)",
  "property": "flexboxtweener",
  "tags": ["css"],
  "polyfills": ["flexie"],
  "notes": [{
    "name": "The _inbetween_ flexbox",
    "href": "https://www.w3.org/TR/2011/WD-css3-flexbox-20111129/"
  }],
  "warnings": ["This represents an old syntax, not the latest standard syntax."]
}
!*/

  Modernizr.addTest('flexboxtweener', testAllProps('flexAlign', 'end', true));

/*!
{
  "name": "@font-face",
  "property": "fontface",
  "authors": ["Diego Perini", "Mat Marquis"],
  "tags": ["css"],
  "knownBugs": [
    "False Positive: WebOS https://github.com/Modernizr/Modernizr/issues/342",
    "False Postive: WP7 https://github.com/Modernizr/Modernizr/issues/538"
  ],
  "notes": [{
    "name": "@font-face detection routine by Diego Perini",
    "href": "http://javascript.nwbox.com/CSSSupport/"
  },{
    "name": "Filament Group @font-face compatibility research",
    "href": "https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.p"
  },{
    "name": "Filament Grunticon/@font-face device testing results",
    "href": "https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0"
  },{
    "name": "CSS fonts on Android",
    "href": "https://stackoverflow.com/questions/3200069/css-fonts-on-android"
  },{
    "name": "@font-face and Android",
    "href": "http://archivist.incutio.com/viewlist/css-discuss/115960"
  }]
}
!*/

  var blacklist = (function() {
    var ua = navigator.userAgent;
    var wkvers = ua.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1);
    var webos = ua.match(/w(eb)?osbrowser/gi);
    var wppre8 = ua.match(/windows phone/gi) && ua.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9;
    var oldandroid = wkvers < 533 && ua.match(/android/gi);
    return webos || oldandroid || wppre8;
  }());
  if (blacklist) {
    Modernizr.addTest('fontface', false);
  } else {
    testStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
      var style = document.getElementById('smodernizr');
      var sheet = style.sheet || style.styleSheet;
      var cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
      var bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
      Modernizr.addTest('fontface', bool);
    });
  }
;
/*!
{
  "name": "SVG",
  "property": "svg",
  "caniuse": "svg",
  "tags": ["svg"],
  "authors": ["Erik Dahlstrom"],
  "polyfills": [
    "svgweb",
    "raphael",
    "amplesdk",
    "canvg",
    "svg-boilerplate",
    "sie",
    "dojogfx",
    "fabricjs"
  ]
}
!*/
/* DOC
Detects support for SVG in `<embed>` or `<object>` elements.
*/

  Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);


  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  


   // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        /* jshint -W053 */
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      /* jshint -W041 */
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
      /* jshint +W041 */

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  

/*!
{
  "name": "SVG as an <img> tag source",
  "property": "svgasimg",
  "caniuse" : "svg-img",
  "tags": ["svg"],
  "authors": ["Chris Coyier"],
  "notes": [{
    "name": "HTML5 Spec",
    "href": "http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
  }]
}
!*/


  // Original Async test by Stu Cox
  // https://gist.github.com/chriscoyier/8774501

  // Now a Sync test based on good results here
  // http://codepen.io/chriscoyier/pen/bADFx

  // Note http://www.w3.org/TR/SVG11/feature#Image is *supposed* to represent
  // support for the `<image>` tag in SVG, not an SVG file linked from an `<img>`
  // tag in HTML – but it’s a heuristic which works
  Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));


  /**
   * Object.prototype.toString can be used with every object and allows you to
   * get its class easily. Abstracting it off of an object prevents situations
   * where the toString property has been overridden
   *
   * @access private
   * @function toStringFn
   * @returns {function} An abstracted toString function
   */

  var toStringFn = ({}).toString;
  
/*!
{
  "name": "SVG clip paths",
  "property": "svgclippaths",
  "tags": ["svg"],
  "notes": [{
    "name": "Demo",
    "href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"
  }]
}
!*/
/* DOC
Detects support for clip paths in SVG (only, not on HTML content).

See [this discussion](https://github.com/Modernizr/Modernizr/issues/213) regarding applying SVG clip paths to HTML content.
*/

  Modernizr.addTest('svgclippaths', function() {
    return !!document.createElementNS &&
      /SVGClipPath/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')));
  });

/*!
{
  "name": "SVG filters",
  "property": "svgfilters",
  "caniuse": "svg-filters",
  "tags": ["svg"],
  "builderAliases": ["svg_filters"],
  "authors": ["Erik Dahlstrom"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/SVG11/filters.html"
  }]
}
!*/

  // Should fail in Safari: https://stackoverflow.com/questions/9739955/feature-detecting-support-for-svg-filters.
  Modernizr.addTest('svgfilters', function() {
    var result = false;
    try {
      result = 'SVGFEColorMatrixElement' in window &&
        SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
    }
    catch (e) {}
    return result;
  });

/*!
{
  "name": "SVG foreignObject",
  "property": "svgforeignobject",
  "tags": ["svg"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/SVG11/extend.html"
  }]
}
!*/
/* DOC
Detects support for foreignObject tag in SVG.
*/

  Modernizr.addTest('svgforeignobject', function() {
    return !!document.createElementNS &&
      /SVGForeignObject/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));
  });

/*!
{
  "name": "Inline SVG",
  "property": "inlinesvg",
  "caniuse": "svg-html5",
  "tags": ["svg"],
  "notes": [{
    "name": "Test page",
    "href": "https://paulirish.com/demo/inline-svg"
  }, {
    "name": "Test page and results",
    "href": "https://codepen.io/eltonmesquita/full/GgXbvo/"
  }],
  "polyfills": ["inline-svg-polyfill"],
  "knownBugs": ["False negative on some Chromia browsers."]
}
!*/
/* DOC
Detects support for inline SVG in HTML (not within XHTML).
*/

  Modernizr.addTest('inlinesvg', function() {
    var div = createElement('div');
    div.innerHTML = '<svg/>';
    return (typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
  });

/*!
{
  "name": "SVG SMIL animation",
  "property": "smil",
  "caniuse": "svg-smil",
  "tags": ["svg"],
  "notes": [{
  "name": "W3C Synchronised Multimedia spec",
  "href": "https://www.w3.org/AudioVideo/"
  }]
}
!*/

  // SVG SMIL animation
  Modernizr.addTest('smil', function() {
    return !!document.createElementNS &&
      /SVGAnimate/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'animate')));
  });

/*!
{
  "name": "Local Storage",
  "property": "localstorage",
  "caniuse": "namevalue-storage",
  "tags": ["storage"],
  "knownBugs": [],
  "notes": [],
  "warnings": [],
  "polyfills": [
    "joshuabell-polyfill",
    "cupcake",
    "storagepolyfill",
    "amplifyjs",
    "yui-cacheoffline"
  ]
}
!*/

  // In FF4, if disabled, window.localStorage should === null.

  // Normally, we could not test that directly and need to do a
  //   `('localStorage' in window) && ` test first because otherwise Firefox will
  //   throw bugzil.la/365772 if cookies are disabled

  // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
  // will throw the exception:
  //   QUOTA_EXCEEDED_ERROR DOM Exception 22.
  // Peculiarly, getItem and removeItem calls do not throw.

  // Because we are forced to try/catch this, we'll go aggressive.

  // Just FWIW: IE8 Compat mode supports these features completely:
  //   www.quirksmode.org/dom/html5.html
  // But IE8 doesn't support either with local files

  Modernizr.addTest('localstorage', function() {
    var mod = 'modernizr';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Session Storage",
  "property": "sessionstorage",
  "tags": ["storage"],
  "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
}
!*/

  // Because we are forced to try/catch this, we'll go aggressive.

  // Just FWIW: IE8 Compat mode supports these features completely:
  //   www.quirksmode.org/dom/html5.html
  // But IE8 doesn't support either with local files
  Modernizr.addTest('sessionstorage', function() {
    var mod = 'modernizr';
    try {
      sessionStorage.setItem(mod, mod);
      sessionStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Web SQL Database",
  "property": "websqldatabase",
  "caniuse": "sql-storage",
  "tags": ["storage"]
}
!*/

  // Chrome incognito mode used to throw an exception when using openDatabase
  // It doesn't anymore.
  Modernizr.addTest('websqldatabase', 'openDatabase' in window);

/*!
{
  "name": "CSS Multiple Backgrounds",
  "caniuse": "multibackgrounds",
  "property": "multiplebgs",
  "tags": ["css"]
}
!*/

  // Setting multiple images AND a color on the background shorthand property
  // and then querying the style.background property value for the number of
  // occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

  Modernizr.addTest('multiplebgs', function() {
    var style = createElement('a').style;
    style.cssText = 'background:url(https://),url(https://),red url(https://)';

    // If the UA supports multiple backgrounds, there should be three occurrences
    // of the string "url(" in the return value for elemStyle.background
    return (/(url\s*\(.*?){3}/).test(style.background);
  });


  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);

/***/ }),

/***/ "../../../../../src/vendor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modernizr_js__ = __webpack_require__("../../../../../src/modernizr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modernizr_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modernizr_js__);
 // 'npm run modernizr' to create this file
//# sourceMappingURL=vendor.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map