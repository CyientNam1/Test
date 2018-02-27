webpackJsonp(["reports.module"],{

/***/ "../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"feature-wise-div\">\r\n        <!-- START widget-->\r\n\r\n\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"feature-wise-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Feature-wise deviations in the Counts</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('featurewisefieldvsGISCollapBtnClass')\" data-target=\"#reportPanelFeaturewisefieldvsGIS\">\r\n                            <i [class]=\"featurewisefieldvsGISCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','feature-wise-header-panel','feature-wise-div')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportPanelFeaturewisefieldvsGIS\" class=\"collapse in\">\r\n                    <div id=\"t-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeaturewisefieldvsGIS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeaturewisefieldvsGIS = (function () {
    function FeaturewisefieldvsGIS(authenticationService) {
        this.authenticationService = authenticationService;
        this.featurewisefieldvsGISCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
    }
    FeaturewisefieldvsGIS.prototype.onExpandCollapseClick = function (classToChange) {
        this.featurewisefieldvsGISCollapBtnClass = this.featurewisefieldvsGISCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
    };
    FeaturewisefieldvsGIS.prototype.toggleFullScreen = function (elementId, headerId, divId) {
        var elem = $('#' + elementId), headerElement = $('#' + headerId), divPanel = $('#' + divId), bodyHeight = $('body')[0].clientHeight;
        if (headerElement.hasClass('panelDefault')) {
            headerElement.removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            headerElement.addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if (divPanel.hasClass('panel-fullscreen')) {
            divPanel.removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            divPanel.addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (elem[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            elem[0].children[0].style.height = ((bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            elem[0].children[0].style.height = '77.5vh';
        }
    };
    FeaturewisefieldvsGIS.prototype.ngOnInit = function () {
        this.authenticationService.getTableauToken();
        var placeholderDiv = document.getElementById('t-viz');
        var url = 'https://busrep.cyient.com/trusted/' + sessionStorage.getItem('tableauTokenId') + '/views/FieldvsGIS/Grid_Wise_Status_Report?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '77.5vh',
            onFirstInteractive: function () {
            }
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    FeaturewisefieldvsGIS.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
    };
    return FeaturewisefieldvsGIS;
}());
FeaturewisefieldvsGIS = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-featurewisefieldvsGIS',
        template: __webpack_require__("../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object])
], FeaturewisefieldvsGIS);

var _a;
//# sourceMappingURL=featurewisefieldvsGIS.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/feederSummary/feederSummary.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"feederSummaryDiv\">\r\n        <!-- START widget-->\r\n\r\n\r\n        <div class=\"panel panel-default\" id=\"panelChart9\" style=\"margin-bottom:0;\">\r\n            <div class=\"panel-heading\" id=\"feederSummary-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Feeder Summary Report</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('feederSummaryCollapBtnClass')\" data-target=\"#reportPanelFeederSummary\">\r\n                            <i [class]=\"feederSummaryCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','feederSummary-header-panel','feederSummaryDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportPanelFeederSummary\" class=\"collapse in\">\r\n                    <div id=\"t-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/reports/feederSummary/feederSummary.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/reports/feederSummary/feederSummary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeederSummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeederSummaryComponent = (function () {
    function FeederSummaryComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.feederSummaryCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
    }
    FeederSummaryComponent.prototype.onExpandCollapseClick = function (classToChange) {
        this.feederSummaryCollapBtnClass = this.feederSummaryCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
    };
    FeederSummaryComponent.prototype.toggleFullScreen = function (elementId, headerId, divId) {
        var elem = $('#' + elementId), headerElement = $('#' + headerId), divPanel = $('#' + divId), bodyHeight = $('body')[0].clientHeight;
        if (headerElement.hasClass('panelDefault')) {
            headerElement.removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            headerElement.addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if (divPanel.hasClass('panel-fullscreen')) {
            divPanel.removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            divPanel.addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (elem[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            elem[0].children[0].style.height = ((bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            elem[0].children[0].style.height = '77.5vh';
        }
    };
    FeederSummaryComponent.prototype.ngOnInit = function () {
        this.authenticationService.getTableauToken();
        var placeholderDiv = document.getElementById('t-viz');
        var url = 'https://busrep.cyient.com/trusted/' + sessionStorage.getItem('tableauTokenId') + '/views/FeederSummary/FIELDMANAGEMENTSERVICESDASHBOARD_?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '77.5vh',
            onFirstInteractive: function () {
            }
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    FeederSummaryComponent.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
    };
    return FeederSummaryComponent;
}());
FeederSummaryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feederSummary',
        template: __webpack_require__("../../../../../src/app/routes/reports/feederSummary/feederSummary.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/reports/feederSummary/feederSummary.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object])
], FeederSummaryComponent);

var _a;
//# sourceMappingURL=feederSummary.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/gridStatus/gridStatus.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"gridStatusyDiv\">\r\n        <!-- START widget-->\r\n\r\n\r\n        <div class=\"panel panel-default\" id=\"panelChart9\" style=\"margin-bottom:0;\">\r\n            <div class=\"panel-heading\" id=\"gridStatus-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Grid Status Report</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('gridStatusCollapBtnClass')\" data-target=\"#reportPanelgridStatus\">\r\n                            <i [class]=\"gridStatusCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','gridStatus-header-panel','gridStatusyDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportPanelgridStatus\" class=\"collapse in\">\r\n                    <div id=\"t-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/reports/gridStatus/gridStatus.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/reports/gridStatus/gridStatus.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GridStatusComponent = (function () {
    function GridStatusComponent() {
        this.gridStatusCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
    }
    GridStatusComponent.prototype.onExpandCollapseClick = function (classToChange) {
        this.gridStatusCollapBtnClass = this.gridStatusCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
    };
    GridStatusComponent.prototype.toggleFullScreen = function (elementId, headerId, divId) {
        var elem = $('#' + elementId), headerElement = $('#' + headerId), divPanel = $('#' + divId), bodyHeight = $('body')[0].clientHeight;
        if (headerElement.hasClass('panelDefault')) {
            headerElement.removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            headerElement.addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if (divPanel.hasClass('panel-fullscreen')) {
            divPanel.removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            divPanel.addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (elem[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            elem[0].children[0].style.height = ((bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            elem[0].children[0].style.height = '77.5vh';
        }
    };
    GridStatusComponent.prototype.ngOnInit = function () {
        var placeholderDiv = document.getElementById('t-viz');
        var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridHistory/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no&:toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '77.5vh',
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
            }
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    GridStatusComponent.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
    };
    return GridStatusComponent;
}());
GridStatusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-gridStatus',
        template: __webpack_require__("../../../../../src/app/routes/reports/gridStatus/gridStatus.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/reports/gridStatus/gridStatus.component.scss")]
    })
], GridStatusComponent);

//# sourceMappingURL=gridStatus.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/invoice/invoice.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-9\" id=\"invoiceDiv\">\r\n        <!-- START widget-->\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"invoice-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Invoice Report</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('invoiceCollapBtnClass')\" data-target=\"#reportPanelinvoice\">\r\n                            <i [class]=\"invoiceCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','invoice-header-panel','invoiceDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <!-- <div *ngIf=\"!isDataLoaded\" class=\"panel-body loader-demo\">\r\n                    <div class=\"square-spin\">\r\n                        <div></div>\r\n            </div>\r\n        </div> -->\r\n                <div id=\"reportPanelinvoice\" class=\"collapse in\">\r\n\r\n                    <div id=\"t-viz\">\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n    <div class=\"col-lg-3\">\r\n            <div class=\"panel panel-default\" id=\"panelChart9\" style=\"height:85vh\">\r\n                <div class=\"panel-heading\" id=\"invoice-header-panel\">\r\n                    <div class=\"panel-title\">\r\n                        <span>Features Selected</span>\r\n                    </div>\r\n                    <div class=\"pull-right paddingRight\" *ngIf=\"items.length != 0\">\r\n                        <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel()\">\r\n                            <span class=\"fa fa-download\"></span>\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\" >\r\n                    <ng2-smart-table [settings]=\"settings\" [source]=\"items\"></ng2-smart-table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</div>\r\n\r\n<!-- <div class=\"row\" *ngIf=\"showTable\">\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"invoice-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Invoice Report</span>\r\n                </div>\r\n                <div class=\"pull-right paddingRight\" *ngIf=\"items.length != 0\">\r\n                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel()\">\r\n                        <span class=\"fa fa-download\"></span>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <ng2-smart-table [settings]=\"settings\" [source]=\"items\"></ng2-smart-table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/routes/reports/invoice/invoice.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/reports/invoice/invoice.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoiceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__ = __webpack_require__("../../../../../src/app/core/services/export.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InvoiceComponent = (function () {
    function InvoiceComponent(exportToCsvService, authenticationService) {
        this.exportToCsvService = exportToCsvService;
        this.authenticationService = authenticationService;
        this.showTable = false;
        this.isDataLoaded = false;
        this.items = [];
        this.data = [];
        this.itemCount = 0;
        this.limit = 10;
        this.settings = {
            columns: {
                /*  feederName: {
                     title: 'Feeder Name'
                 },
                 stage: {
                     title: 'Stage'
                 },
                 type: {
                     title: 'Type'
                 }, */
                id: {
                    title: 'Feature ID'
                }
            },
            attr: {
                class: "smart-size"
            },
            pager: {
                display: true,
                perPage: 15
            },
            actions: {
                add: false,
                edit: false,
                delete: false
            }
        };
        this.invoiceCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
    }
    InvoiceComponent.prototype.reloadItems = function (params) {
        var _this = this;
        this.itemResource.query(params).then(function (items) { return _this.items = items; });
    };
    // special properties:
    InvoiceComponent.prototype.rowClick = function (rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    };
    InvoiceComponent.prototype.rowDoubleClick = function (rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    };
    InvoiceComponent.prototype.rowTooltip = function (item) { return item.feederName; };
    InvoiceComponent.prototype.excel = function () {
        var title = 'Planned vs Actual';
        this.exportToCsvService.exportFunction(this.data, title);
    };
    InvoiceComponent.prototype.onExpandCollapseClick = function (classToChange) {
        this.invoiceCollapBtnClass = this.invoiceCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
    };
    InvoiceComponent.prototype.toggleFullScreen = function (elementId, headerId, divId) {
        var elem = $('#' + elementId), headerElement = $('#' + headerId), divPanel = $('#' + divId), bodyHeight = $('body')[0].clientHeight;
        if (headerElement.hasClass('panelDefault')) {
            headerElement.removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            headerElement.addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if (divPanel.hasClass('panel-fullscreen')) {
            divPanel.removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            divPanel.addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (elem[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            elem[0].children[0].style.height = ((bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            elem[0].children[0].style.height = '75vh';
        }
    };
    InvoiceComponent.prototype.invoiceData = function () {
        var _this = this;
        this.tableauViz.addEventListener(tableau.TableauEventName.FILTER_CHANGE, __WEBPACK_IMPORTED_MODULE_2_underscore__["debounce"](function () {
            _this.data = [];
            _this.items = [];
            _this.showTable = false;
        }, 500, true));
        this.tableauViz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, __WEBPACK_IMPORTED_MODULE_2_underscore__["debounce"](function () {
            _this.onSummarySelection();
        }, 500, true));
    };
    InvoiceComponent.prototype.onSummarySelection = function () {
        this.summaryData();
    };
    InvoiceComponent.prototype.summaryData = function () {
        var _this = this;
        var sheet = this.tableauViz.getWorkbook().getActiveSheet().getWorksheets().get("summary"), options = {
            maxRows: 0,
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };
        sheet.getUnderlyingDataAsync(options).then((function (t) {
            _this.data = [];
            _this.items = [];
            _this.itemCount = 0;
            //this.isDataLoaded = false;
            //alert(t.getData().length);
            for (var i = 0; i < t.getTotalRowCount(); i++) {
                var obj = {
                    /* "feederName": t.getData()[i][1].value != '%null%' ? t.getData()[i][1].value : "",
                    "stage": t.getData()[i][0].value != '%null%' ? t.getData()[i][0].value : "",
                    "type": t.getData()[i][4].value != '%null%' ? t.getData()[i][4].value : "", */
                    "id": t.getData()[i][2].value != '%null%' ? t.getData()[i][2].value : ""
                };
                _this.data.push(obj);
                _this.items.push(obj);
            }
            _this.showTable = true;
            //this.isDataLoaded = true;
            //this.itemResource = new DataTableResource(this.items);
            //this.itemResource.count().then(count => this.itemCount = count);
        }));
    };
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* this.authenticationService.getToken().subscribe(results  =>  {
            console.info(results);
        }); */
        this.authenticationService.getTableauToken();
        var placeholderDiv = document.getElementById('t-viz');
        //var url = 'https://busrep.cyient.com/trusted/' + sessionStorage.getItem('tableauTokenId') + '/viewsInvoice_Final/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        var url = 'https://busrep.cyient.com/trusted/' + sessionStorage.getItem('tableauTokenId') + '/views/Invoice_Final/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/Invoicedashboard/Invoice?:embed=y&:display_count=no&:showAppBanner=false&:showShareOptions=true&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/final_Invoice/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '75vh',
            onFirstInteractive: (function () {
                _this.invoiceData();
            })
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    InvoiceComponent.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
    };
    return InvoiceComponent;
}());
InvoiceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-invoice',
        template: __webpack_require__("../../../../../src/app/routes/reports/invoice/invoice.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/reports/invoice/invoice.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__["a" /* ExportToCsvService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__["a" /* ExportToCsvService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], InvoiceComponent);

var _a, _b;
//# sourceMappingURL=invoice.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"plannedVsActualDiv\">\r\n        <!-- START widget-->\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"plannedVsActual-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Planned Vs Actual</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('plannedVsActualCollapBtnClass')\" data-target=\"#reportPanelPlannedVsActual\">\r\n                            <i [class]=\"plannedVsActualCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','plannedVsActual-header-panel','plannedVsActualDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportPanelPlannedVsActual\" class=\"collapse in\">\r\n                    <div id=\"t-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n</div>\r\n<!-- <div class=\"row\" *ngIf=\"showTable\">\r\n    <div class=\"col-xs-12\">\r\n            <div class=\"pull-right paddingRight\" *ngIf=\"items.length != 0\">\r\n                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel()\">\r\n                    <span class=\"fa fa-download\"></span>\r\n                    </button>\r\n                </div>\r\n\r\n        <data-table id=\"plannedVsActual-grid\" headerTitle=\"Planned Vs Actual\" [items]=\"items\" [limit]=\"limit\" [itemCount]=\"itemCount\" (reload)=\"reloadItems($event)\"\r\n            (rowClick)=\"rowClick($event)\" (rowDoubleClick)=\"rowDoubleClick($event)\" [rowTooltip]=\"rowTooltip\">\r\n            <data-table-column [property]=\"'feederName'\" [header]=\"'Feeder Name'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'plannedStartDate'\" [header]=\"'Planned Start Date'\" [sortable]=\"true\">\r\n                <template #dataTableCell let-item=\"item\">\r\n                    <span>{{item.plannedStartDate | date:'yyyy-MM-dd'}}</span>\r\n                </template>\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'plannedEndDate'\" [header]=\"'Planned End Date'\" [sortable]=\"true\">\r\n                <template #dataTableCell let-item=\"item\">\r\n                    <span>{{item.plannedEndDate | date:'yyyy-MM-dd'}}</span>\r\n                </template>\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'actualStartDate'\" [header]=\"'Actual Start Date'\" [sortable]=\"true\">\r\n                <template #dataTableCell let-item=\"item\">\r\n                    <span>{{item.actualStartDate | date:'yyyy-MM-dd'}}</span>\r\n                </template>\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'actualEndDate'\" [header]=\"'Actual End Date'\" [sortable]=\"true\">\r\n                <template #dataTableCell let-item=\"item\">\r\n                    <span>{{item.actualEndDate | date:'yyyy-MM-dd'}}</span>\r\n                </template>\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'totalAssets'\" [header]=\"'Total Assets'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'fieldAssets'\" [header]=\"'Field Assets'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'plannedDays'\" [header]=\"'Planned Days'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'plannedAssetsPerDay'\" [header]=\"'Planned Assets Per Day'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'actualDays'\" [header]=\"'Actual Days'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'actualAssetsPerDay'\" [header]=\"'Actual Assets Per Day'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n            <data-table-column [property]=\"'actualDaystoComplete'\" [header]=\"'Actual Days to Complete'\" [sortable]=\"true\" [resizable]=\"true\">\r\n            </data-table-column>\r\n        </data-table>\r\n    </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlannedVsActualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_4_data_table__ = __webpack_require__("../../../../angular-4-data-table/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_4_data_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_4_data_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_export_service__ = __webpack_require__("../../../../../src/app/core/services/export.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/authentication/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_report_service__ = __webpack_require__("../../../../../src/app/routes/reports/service/report.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlannedVsActualComponent = (function () {
    function PlannedVsActualComponent(exportToCsvService, authenticationService, reportService) {
        this.exportToCsvService = exportToCsvService;
        this.authenticationService = authenticationService;
        this.reportService = reportService;
        this.showTable = false;
        this.items = [];
        this.data = [];
        this.itemCount = 0;
        this.limit = 10;
        this.plannedVsActualCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
    }
    PlannedVsActualComponent.prototype.reloadItems = function (params) {
        var _this = this;
        this.itemResource.query(params).then(function (items) { return _this.items = items; });
    };
    // special properties:
    PlannedVsActualComponent.prototype.rowClick = function (rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    };
    PlannedVsActualComponent.prototype.rowDoubleClick = function (rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    };
    PlannedVsActualComponent.prototype.rowTooltip = function (item) { return item.feederName; };
    PlannedVsActualComponent.prototype.excel = function () {
        var title = 'Planned vs Actual';
        this.exportToCsvService.exportFunction(this.data, title);
    };
    PlannedVsActualComponent.prototype.onExpandCollapseClick = function (classToChange) {
        this.plannedVsActualCollapBtnClass = this.plannedVsActualCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
    };
    PlannedVsActualComponent.prototype.toggleFullScreen = function (elementId, headerId, divId) {
        var elem = $('#' + elementId), headerElement = $('#' + headerId), divPanel = $('#' + divId), bodyHeight = $('body')[0].clientHeight;
        if (headerElement.hasClass('panelDefault')) {
            headerElement.removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            headerElement.addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if (divPanel.hasClass('panel-fullscreen')) {
            divPanel.removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            divPanel.addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (elem[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            elem[0].children[0].style.height = ((bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            elem[0].children[0].style.height = '77.5vh';
        }
    };
    PlannedVsActualComponent.prototype.plannedVsActualData = function () {
        var _this = this;
        var sheet = this.tableauViz.getWorkbook().getActiveSheet().getWorksheets().get("Sheet 2"), options = {
            maxRows: 0,
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };
        sheet.getFiltersAsync(options).then((function (t) {
            //alert();
        }));
        sheet.getUnderlyingDataAsync(options).then((function (t) {
            for (var i = 0; i < t.getTotalRowCount(); i++) {
                var obj = {
                    "feederName": t.getData()[i][3].value != '%null%' ? t.getData()[i][3].value : "",
                    "plannedStartDate": t.getData()[i][6].value != '%null%' ? t.getData()[i][6].value : "",
                    "plannedEndDate": t.getData()[i][5].value != '%null%' ? t.getData()[i][5].value : "",
                    "actualStartDate": t.getData()[i][1].value != '%null%' ? t.getData()[i][1].value : "",
                    "actualEndDate": t.getData()[i][0].value != '%null%' ? t.getData()[i][0].value : "",
                    "totalAssets": t.getData()[i][13].value != '%null%' ? t.getData()[i][13].value : "",
                    "fieldAssets": t.getData()[i][10].value != '%null%' ? t.getData()[i][10].value : "",
                    "plannedDays": t.getData()[i][12].value != '%null%' ? t.getData()[i][12].value : "",
                    "plannedAssetsPerDay": t.getData()[i][11].value != '%null%' ? t.getData()[i][11].value : "",
                    "actualDays": t.getData()[i][8].value != '%null%' ? t.getData()[i][8].value : "",
                    "actualAssetsPerDay": t.getData()[i][7].value != '%null%' ? t.getData()[i][7].value : "",
                    "actualDaystoComplete": t.getData()[i][9].value != '%null%' ? t.getData()[i][9].value : ""
                };
                _this.data.push(obj);
                _this.items.push(obj);
            }
            _this.showTable = true;
            _this.itemResource = new __WEBPACK_IMPORTED_MODULE_1_angular_4_data_table__["DataTableResource"](_this.items);
            _this.itemResource.count().then(function (count) { return _this.itemCount = count; });
        }));
    };
    PlannedVsActualComponent.prototype.ngOnInit = function () {
        var placeholderDiv = document.getElementById('t-viz');
        this.authenticationService.getTableauToken();
        // this.authenticationService.getTableauToken().subscribe((res: any) => {
        //     console.log(res);
        // });
        /*  this.authenticationService.getToken().subscribe((res: any) => {
             console.log(res);
         }); */
        //zcs3M70WQW2ukdSTLCS2IA==:dkjFBNdDbPioG1Tpg9j3SL45
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/PlannedVsActual/PlannedVsActual?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        var url = 'https://busrep.cyient.com/trusted/' + sessionStorage.getItem('tableauTokenId') + '/views/PlannedVsActual/PlannedVsActual?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/'+sessionStorage.getItem('tableauTokenId')+'/views/PlannedVsActual/PlannedVsActual?:iid=2&:embed=y&:showVizHome=n&:toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '77.5vh',
            onFirstInteractive: (function () {
                //this.plannedVsActualData();
            })
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    return PlannedVsActualComponent;
}());
PlannedVsActualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-plannedVsActual',
        template: __webpack_require__("../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__core_services_export_service__["a" /* ExportToCsvService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_services_export_service__["a" /* ExportToCsvService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_report_service__["a" /* ReportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_report_service__["a" /* ReportService */]) === "function" && _c || Object])
], PlannedVsActualComponent);

var _a, _b, _c;
//# sourceMappingURL=plannedVsActual.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/reports.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_4_data_table_fix__ = __webpack_require__("../../../../angular-4-data-table-fix/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_4_data_table_fix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular_4_data_table_fix__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feederSummary_feederSummary_component__ = __webpack_require__("../../../../../src/app/routes/reports/feederSummary/feederSummary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plannedVsActual_plannedVsActual_component__ = __webpack_require__("../../../../../src/app/routes/reports/plannedVsActual/plannedVsActual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoice_invoice_component__ = __webpack_require__("../../../../../src/app/routes/reports/invoice/invoice.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__featurewisefieldvsGIS_featurewisefieldvsGIS_component__ = __webpack_require__("../../../../../src/app/routes/reports/featurewisefieldvsGIS/featurewisefieldvsGIS.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gridStatus_gridStatus_component__ = __webpack_require__("../../../../../src/app/routes/reports/gridStatus/gridStatus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_services_export_service__ = __webpack_require__("../../../../../src/app/core/services/export.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_smart_table__ = __webpack_require__("../../../../ng2-smart-table/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_report_service__ = __webpack_require__("../../../../../src/app/routes/reports/service/report.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    { path: '', redirectTo: 'reports' },
    { path: 'feederSummary', component: __WEBPACK_IMPORTED_MODULE_4__feederSummary_feederSummary_component__["a" /* FeederSummaryComponent */] },
    { path: 'plannedVsActual', component: __WEBPACK_IMPORTED_MODULE_5__plannedVsActual_plannedVsActual_component__["a" /* PlannedVsActualComponent */] },
    { path: 'invoice', component: __WEBPACK_IMPORTED_MODULE_6__invoice_invoice_component__["a" /* InvoiceComponent */] },
    { path: 'featurewisefieldvsGIS', component: __WEBPACK_IMPORTED_MODULE_7__featurewisefieldvsGIS_featurewisefieldvsGIS_component__["a" /* FeaturewisefieldvsGIS */] },
    { path: 'gridStatus', component: __WEBPACK_IMPORTED_MODULE_8__gridStatus_gridStatus_component__["a" /* GridStatusComponent */] }
];
var ReportsModule = (function () {
    function ReportsModule() {
    }
    return ReportsModule;
}());
ReportsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_3_angular_4_data_table_fix__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_10_ng2_smart_table__["a" /* Ng2SmartTableModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__feederSummary_feederSummary_component__["a" /* FeederSummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__plannedVsActual_plannedVsActual_component__["a" /* PlannedVsActualComponent */],
            __WEBPACK_IMPORTED_MODULE_6__invoice_invoice_component__["a" /* InvoiceComponent */],
            __WEBPACK_IMPORTED_MODULE_7__featurewisefieldvsGIS_featurewisefieldvsGIS_component__["a" /* FeaturewisefieldvsGIS */],
            __WEBPACK_IMPORTED_MODULE_8__gridStatus_gridStatus_component__["a" /* GridStatusComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__core_services_export_service__["a" /* ExportToCsvService */], __WEBPACK_IMPORTED_MODULE_11__service_report_service__["a" /* ReportService */]]
    })
], ReportsModule);

//# sourceMappingURL=reports.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/reports/service/report.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CATEGORIES = [
    { name: "ADMS Validation", value: "ADMS" }
];
var ReportService = (function () {
    function ReportService(_http) {
        this._http = _http;
        this.apiUrl = 'https://api.cyient-fiops.com/api/xcel/';
        this.accessToken = localStorage.getItem('access-token') || '';
    }
    ReportService.prototype.getMetaData = function () {
        var url = this.apiUrl + 'config/testData';
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    return ReportService;
}());
ReportService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ReportService);

var _a;
//# sourceMappingURL=report.service.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/column.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var DataTableColumn = (function () {
    function DataTableColumn() {
        this.sortable = false;
        this.resizable = false;
        this.visible = true;
        this.styleClassObject = {}; // for [ngClass]
    }
    DataTableColumn.prototype.getCellColor = function (row, index) {
        if (this.cellColors !== undefined) {
            return this.cellColors(row.item, row, this, index);
        }
    };
    DataTableColumn.prototype.ngOnInit = function () {
        this._initCellClass();
    };
    DataTableColumn.prototype._initCellClass = function () {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = (_a = {},
                _a[this.styleClass] = true,
                _a
            );
        }
        var _a;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableColumn.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "resizable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableColumn.prototype, "property", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableColumn.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DataTableColumn.prototype, "cellColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "visible", void 0);
    __decorate([
        core_1.ContentChild('dataTableCell'), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "cellTemplate", void 0);
    __decorate([
        core_1.ContentChild('dataTableHeader'), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "headerTemplate", void 0);
    DataTableColumn = __decorate([
        core_1.Directive({
            selector: 'data-table-column'
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
}());
exports.DataTableColumn = DataTableColumn;
//# sourceMappingURL=/components/column.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/header.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.component.js");
var header_template_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/header.template.js");
var header_style_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/header.style.js");
var DataTableHeader = (function () {
    function DataTableHeader(dataTable) {
        this.dataTable = dataTable;
        this.columnSelectorOpen = false;
    }
    DataTableHeader.prototype._closeSelector = function () {
        this.columnSelectorOpen = false;
    };
    DataTableHeader = __decorate([
        core_1.Component({
            selector: 'data-table-header',
            template: header_template_1.HEADER_TEMPLATE,
            styles: [header_style_1.HEADER_STYLE],
            host: {
                '(document:click)': '_closeSelector()'
            }
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))), 
        __metadata('design:paramtypes', [table_component_1.DataTable])
    ], DataTableHeader);
    return DataTableHeader;
}());
exports.DataTableHeader = DataTableHeader;
//# sourceMappingURL=/components/header.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/header.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.HEADER_STYLE = "\n.data-table-header {\n    min-height: 25px;\n    margin-bottom: 10px;\n}\n.title {\n    display: inline-block;\n    margin: 5px 0 0 5px;\n}\n.button-panel {\n    float: right;\n}\n.button-panel button {\n    outline: none !important;\n}\n\n.column-selector-wrapper {\n    position: relative;\n}\n.column-selector-box {\n    box-shadow: 0 0 10px lightgray;\n    width: 150px;\n    padding: 10px;\n    position: absolute;\n    right: 0;\n    top: 1px;\n    z-index: 1060;\n}\n.column-selector-box .checkbox {\n    margin-bottom: 4px;\n}\n.column-selector-fixed-column {\n    font-style: italic;\n}\n";
//# sourceMappingURL=/components/header.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/header.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.HEADER_TEMPLATE = "\n<div class=\"data-table-header\">\n    <h4 class=\"title\" [textContent]=\"dataTable.headerTitle\"></h4>\n    <div class=\"button-panel\">\n        <button type=\"button\" class=\"btn btn-default btn-sm refresh-button\"\n            (click)=\"dataTable.reloadItems()\">\n            <span class=\"glyphicon glyphicon-refresh\"></span>\n        </button>\n        <button type=\"button\" class=\"btn btn-default btn-sm column-selector-button\" [class.active]=\"columnSelectorOpen\"\n            (click)=\"columnSelectorOpen = !columnSelectorOpen; $event.stopPropagation()\" >\n            <span class=\"glyphicon glyphicon-list\"></span>\n        </button>\n        <div class=\"column-selector-wrapper\" (click)=\"$event.stopPropagation()\">\n            <div *ngIf=\"columnSelectorOpen\" class=\"column-selector-box panel panel-default\">\n                <div *ngIf=\"dataTable.expandableRows\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.expandColumnVisible\"/>\n                        <span>{{dataTable.translations.expandColumn}}</span>\n                    </label>\n                </div>\n                <div *ngIf=\"dataTable.indexColumn\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.indexColumnVisible\"/>\n                        <span>{{dataTable.translations.indexColumn}}</span>\n                    </label>\n                </div>\n                <div *ngIf=\"dataTable.selectColumn\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.selectColumnVisible\"/>\n                        <span>{{dataTable.translations.selectColumn}}</span>\n                    </label>\n                </div>\n                <div *ngFor=\"let column of dataTable.columns\" class=\"column-selector-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"column.visible\"/>\n                        <span [textContent]=\"column.header\"></span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
//# sourceMappingURL=/components/header.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/pagination.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.component.js");
var pagination_template_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/pagination.template.js");
var pagination_style_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/pagination.style.js");
var DataTablePagination = (function () {
    function DataTablePagination(dataTable) {
        this.dataTable = dataTable;
    }
    DataTablePagination.prototype.pageBack = function () {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    };
    DataTablePagination.prototype.pageForward = function () {
        this.dataTable.offset += this.dataTable.limit;
    };
    DataTablePagination.prototype.pageFirst = function () {
        this.dataTable.offset = 0;
    };
    DataTablePagination.prototype.pageLast = function () {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    };
    Object.defineProperty(DataTablePagination.prototype, "maxPage", {
        get: function () {
            return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "limit", {
        get: function () {
            return this.dataTable.limit;
        },
        set: function (value) {
            this.dataTable.limit = Number(value); // TODO better way to handle that value of number <input> is string?
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "page", {
        get: function () {
            return this.dataTable.page;
        },
        set: function (value) {
            this.dataTable.page = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagination = __decorate([
        core_1.Component({
            selector: 'data-table-pagination',
            template: pagination_template_1.PAGINATION_TEMPLATE,
            styles: [pagination_style_1.PAGINATION_STYLE]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))), 
        __metadata('design:paramtypes', [table_component_1.DataTable])
    ], DataTablePagination);
    return DataTablePagination;
}());
exports.DataTablePagination = DataTablePagination;
//# sourceMappingURL=/components/pagination.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/pagination.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.PAGINATION_STYLE = "\n.pagination-box {\n    position: relative;\n    margin-top: -10px;\n}\n.pagination-range {\n    margin-top: 7px;\n    margin-left: 3px;\n    display: inline-block;\n}\n.pagination-controllers {\n    float: right;\n}\n.pagination-controllers input {\n    min-width: 60px;\n    /*padding: 1px 0px 0px 5px;*/\n    text-align: right;\n}\n\n.pagination-limit {\n    margin-right: 25px;\n    display: inline-table;\n    width: 150px;\n}\n.pagination-pages {\n    display: inline-block;\n}\n.pagination-page {\n    width: 110px;\n    display: inline-table;\n}\n.pagination-box button {\n    outline: none !important;\n}\n.pagination-prevpage,\n.pagination-nextpage,\n.pagination-firstpage,\n.pagination-lastpage {\n    vertical-align: top;\n}\n.pagination-reload {\n    color: gray;\n    font-size: 12px;\n}\n";
//# sourceMappingURL=/components/pagination.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/pagination.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.PAGINATION_TEMPLATE = "\n<div class=\"pagination-box\">\n    <div class=\"pagination-range\">\n        {{dataTable.translations.paginationRange}}:\n        <span [textContent]=\"dataTable.offset + 1\"></span>\n        -\n        <span [textContent]=\"[dataTable.offset + dataTable.limit , dataTable.itemCount] | min\"></span>\n        /\n        <span [textContent]=\"dataTable.itemCount\"></span>\n    </div>\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-limit\">\n            <div class=\"input-group\">\n                <span class=\"input-group-addon\">{{dataTable.translations.paginationLimit}}:</span>\n                <input #limitInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\"\n                       [ngModel]=\"limit\" (blur)=\"limit = limitInput.value\"\n                       (keyup.enter)=\"limit = limitInput.value\" (keyup.esc)=\"limitInput.value = limit\"/>\n            </div>\n        </div>\n        <div class=\" pagination-pages\">\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageFirst()\" class=\"btn btn-default pagination-firstpage\">&laquo;</button>\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageBack()\" class=\"btn btn-default pagination-prevpage\">&lsaquo;</button>\n            <div class=\"pagination-page\">\n                <div class=\"input-group\">\n                    <input #pageInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" max=\"{{maxPage}}\"\n                           [ngModel]=\"page\" (blur)=\"page = pageInput.value\"\n                           (keyup.enter)=\"page = pageInput.value\" (keyup.esc)=\"pageInput.value = page\"/>\n                    <div class=\"input-group-addon\">\n                        <span>/</span>\n                        <span [textContent]=\"dataTable.lastPage\"></span>\n                    </div>\n                </div>\n            </div>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageForward()\" class=\"btn btn-default pagination-nextpage\">&rsaquo;</button>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageLast()\" class=\"btn btn-default pagination-lastpage\">&raquo;</button>\n        </div>\n    </div>\n</div>\n";
//# sourceMappingURL=/components/pagination.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/row.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.component.js");
var row_template_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/row.template.js");
var row_style_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/row.style.js");
var DataTableRow = (function () {
    function DataTableRow(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new core_1.EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    Object.defineProperty(DataTableRow.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.selectedChange.emit(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRow.prototype, "displayIndex", {
        // other:
        get: function () {
            if (this.dataTable.pagination) {
                return this.dataTable.displayParams.offset + this.index + 1;
            }
            else {
                return this.index + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableRow.prototype.getTooltip = function () {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    };
    DataTableRow.prototype.ngOnDestroy = function () {
        this.selected = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRow.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableRow.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTableRow.prototype, "selectedChange", void 0);
    DataTableRow = __decorate([
        core_1.Component({
            selector: '[dataTableRow]',
            template: row_template_1.ROW_TEMPLATE,
            styles: [row_style_1.ROW_STYLE]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))), 
        __metadata('design:paramtypes', [table_component_1.DataTable])
    ], DataTableRow);
    return DataTableRow;
}());
exports.DataTableRow = DataTableRow;
//# sourceMappingURL=/components/row.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/row.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.ROW_STYLE = "\n.select-column {\n    text-align: center;\n}\n\n.row-expand-button {\n    cursor: pointer;\n    text-align: center;\n}\n\n.clickable {\n    cursor: pointer;\n}\n";
//# sourceMappingURL=/components/row.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/row.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.ROW_TEMPLATE = "\n<tr\tclass=\"data-table-row\"\n    [title]=\"getTooltip()\"\n    [style.background-color]=\"dataTable.getRowColor(item, index, _this)\"\n    [class.row-odd]=\"index % 2 === 0\"\n    [class.row-even]=\"index % 2 === 1\"\n    [class.selected]=\"selected\"\n    [class.clickable]=\"dataTable.selectOnRowClick\"\n    (dblclick)=\"dataTable.rowDoubleClicked(_this, $event)\"\n    (click)=\"dataTable.rowClicked(_this, $event)\"\n    >\n    <td [hide]=\"!dataTable.expandColumnVisible\" (click)=\"expanded = !expanded; $event.stopPropagation()\" class=\"row-expand-button\">\n        <span class=\"glyphicon glyphicon-triangle-right\" [hide]=\"expanded\"></span>\n        <span class=\"glyphicon glyphicon-triangle-bottom\" [hide]=\"!expanded\"></span>\n    </td>\n    <td [hide]=\"!dataTable.indexColumnVisible\" class=\"index-column\" [textContent]=\"displayIndex\"></td>\n    <td [hide]=\"!dataTable.selectColumnVisible\" class=\"select-column\">\n        <input type=\"checkbox\" [(ngModel)]=\"selected\"/>\n    </td>\n    <td *ngFor=\"let column of dataTable.columns\" [hide]=\"!column.visible\" [ngClass]=\"column.styleClassObject\" class=\"data-column\"\n        [style.background-color]=\"column.getCellColor(_this, index)\">\n        <div *ngIf=\"!column.cellTemplate\" [textContent]=\"item[column.property]\"></div>\n        <div *ngIf=\"column.cellTemplate\" [ngTemplateOutlet]=\"column.cellTemplate\" [ngOutletContext]=\"{column: column, row: _this, item: item}\"></div>\n    </td>\n</tr>\n<tr *ngIf=\"dataTable.expandableRows\" [hide]=\"!expanded\" class=\"row-expansion\">\n    <td [attr.colspan]=\"dataTable.columnCount\">\n        <div [ngTemplateOutlet]=\"dataTable.expandTemplate\" [ngOutletContext]=\"{row: _this, item: item}\"></div>\n    </td>\n</tr>\n";
//# sourceMappingURL=/components/row.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/table.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var column_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/column.component.js");
var row_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/row.component.js");
var types_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/types.js");
var drag_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/utils/drag.js");
var table_template_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.template.js");
var table_style_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.style.js");
var DataTable = (function () {
    function DataTable() {
        this._items = [];
        this.header = true;
        this.pagination = true;
        this.indexColumn = true;
        this.indexColumnHeader = '';
        this.selectColumn = false;
        this.multiSelect = true;
        this.substituteRows = true;
        this.expandableRows = false;
        this.translations = types_1.defaultTranslations;
        this.selectOnRowClick = false;
        this.autoReload = true;
        this.showReloading = false;
        this._sortAsc = true;
        this._offset = 0;
        this._limit = 10;
        // Reloading:
        this._reloading = false;
        this.reload = new core_1.EventEmitter();
        this._displayParams = {}; // params of the last finished reload
        this._scheduledReload = null;
        // event handlers:
        this.rowClick = new core_1.EventEmitter();
        this.rowDoubleClick = new core_1.EventEmitter();
        this.headerClick = new core_1.EventEmitter();
        this.cellClick = new core_1.EventEmitter();
        this.selectedRows = [];
        this._selectAllCheckbox = false;
        // column resizing:
        this._resizeInProgress = false;
        this.resizeLimit = 30;
    }
    Object.defineProperty(DataTable.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items;
            this._onReloadFinished();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (value) {
            this._sortBy = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortAsc", {
        get: function () {
            return this._sortAsc;
        },
        set: function (value) {
            this._sortAsc = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (value) {
            this._limit = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "page", {
        // calculated property:
        get: function () {
            return Math.floor(this.offset / this.limit) + 1;
        },
        set: function (value) {
            this.offset = (value - 1) * this.limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "lastPage", {
        get: function () {
            return Math.ceil(this.itemCount / this.limit);
        },
        enumerable: true,
        configurable: true
    });
    // setting multiple observable properties simultaneously
    DataTable.prototype.sort = function (sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    };
    // init
    DataTable.prototype.ngOnInit = function () {
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    };
    DataTable.prototype._initDefaultValues = function () {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    };
    DataTable.prototype._initDefaultClickEvents = function () {
        var _this = this;
        this.headerClick.subscribe(function (tableEvent) { return _this.sortColumn(tableEvent.column); });
        if (this.selectOnRowClick) {
            this.rowClick.subscribe(function (tableEvent) { return tableEvent.row.selected = !tableEvent.row.selected; });
        }
    };
    Object.defineProperty(DataTable.prototype, "reloading", {
        get: function () {
            return this._reloading;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.reloadItems = function () {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    };
    DataTable.prototype._onReloadFinished = function () {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    };
    Object.defineProperty(DataTable.prototype, "displayParams", {
        get: function () {
            return this._displayParams;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._updateDisplayParams = function () {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    };
    // for avoiding cascading reloads if multiple params are set at once:
    DataTable.prototype._triggerReload = function () {
        var _this = this;
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout(function () {
            _this.reloadItems();
        });
    };
    DataTable.prototype.rowClicked = function (row, event) {
        this.rowClick.emit({ row: row, event: event });
    };
    DataTable.prototype.rowDoubleClicked = function (row, event) {
        this.rowDoubleClick.emit({ row: row, event: event });
    };
    DataTable.prototype.headerClicked = function (column, event) {
        if (!this._resizeInProgress) {
            this.headerClick.emit({ column: column, event: event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    };
    DataTable.prototype.cellClicked = function (column, row, event) {
        this.cellClick.emit({ row: row, column: column, event: event });
    };
    // functions:
    DataTable.prototype._getRemoteParameters = function () {
        var params = {};
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    };
    DataTable.prototype.sortColumn = function (column) {
        if (column.sortable) {
            var ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    };
    Object.defineProperty(DataTable.prototype, "columnCount", {
        get: function () {
            var count = 0;
            count += this.indexColumnVisible ? 1 : 0;
            count += this.selectColumnVisible ? 1 : 0;
            count += this.expandColumnVisible ? 1 : 0;
            this.columns.toArray().forEach(function (column) {
                count += column.visible ? 1 : 0;
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.getRowColor = function (item, index, row) {
        if (this.rowColors !== undefined) {
            return this.rowColors(item, row, index);
        }
    };
    Object.defineProperty(DataTable.prototype, "selectAllCheckbox", {
        get: function () {
            return this._selectAllCheckbox;
        },
        set: function (value) {
            this._selectAllCheckbox = value;
            this._onSelectAllChanged(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._onSelectAllChanged = function (value) {
        this.rows.toArray().forEach(function (row) { return row.selected = value; });
    };
    DataTable.prototype.onRowSelectChanged = function (row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            var index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            }
            else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        }
        else {
            if (row.selected) {
                this.selectedRow = row;
            }
            else if (this.selectedRow === row) {
                this.selectedRow = undefined;
            }
        }
        // unselect all other rows:
        if (row.selected && !this.multiSelect) {
            this.rows.toArray().filter(function (row_) { return row_.selected; }).forEach(function (row_) {
                if (row_ !== row) {
                    row_.selected = false;
                }
            });
        }
    };
    Object.defineProperty(DataTable.prototype, "substituteItems", {
        // other:
        get: function () {
            return Array.from({ length: this.displayParams.limit - this.items.length });
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.resizeColumnStart = function (event, column, columnElement) {
        var _this = this;
        this._resizeInProgress = true;
        drag_1.drag(event, {
            move: function (moveEvent, dx) {
                if (_this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            },
        });
    };
    DataTable.prototype._isResizeInLimit = function (columnElement, dx) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) ||
            !columnElement.nextElementSibling ||
            (dx >= 0 && (columnElement.nextElementSibling.offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "items", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "itemCount", void 0);
    __decorate([
        core_1.ContentChildren(column_component_1.DataTableColumn), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.ViewChildren(row_component_1.DataTableRow), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.ContentChild('dataTableExpand'), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataTable.prototype, "expandTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "headerTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "indexColumn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "indexColumnHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DataTable.prototype, "rowColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DataTable.prototype, "rowTooltip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selectColumn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "multiSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "substituteRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "expandableRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "translations", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selectOnRowClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "autoReload", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "showReloading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "sortBy", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "sortAsc", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "offset", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "limit", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "page", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "reload", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "rowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "rowDoubleClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "headerClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "cellClick", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'data-table',
            template: table_template_1.TABLE_TEMPLATE,
            styles: [table_style_1.TABLE_STYLE]
        }), 
        __metadata('design:paramtypes', [])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=/components/table.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/table.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.TABLE_STYLE = "\n/* bootstrap override: */\n\n:host /deep/ .data-table.table > tbody+tbody {\n    border-top: none;\n}\n:host /deep/ .data-table.table td {\n    vertical-align: middle;\n}\n\n:host /deep/ .data-table > thead > tr > th,\n:host /deep/ .data-table > tbody > tr > td {\n\toverflow: hidden;\n}\n\n/* I can't use the bootstrap striped table, because of the expandable rows */\n:host /deep/ .row-odd {\n    background-color: #F6F6F6;\n}\n:host /deep/ .row-even {\n}\n\n.data-table .substitute-rows > tr:hover,\n:host /deep/ .data-table .data-table-row:hover {\n    background-color: #ECECEC;\n}\n/* table itself: */\n\n.data-table {\n    box-shadow: 0 0 15px rgb(236, 236, 236);\n    table-layout: fixed;\n}\n\n/* header cells: */\n\n.column-header {\n    position: relative;\n}\n.expand-column-header {\n\twidth: 50px;\n}\n.select-column-header {\n\twidth: 50px;\n\ttext-align: center;\n}\n.index-column-header {\n\twidth: 40px;\n}\n.column-header.sortable {\n    cursor: pointer;\n}\n.column-header .column-sort-icon {\n\tfloat: right;\n}\n.column-header.resizable .column-sort-icon {\n    margin-right: 8px;\n}\n.column-header .column-sort-icon .column-sortable-icon {\n    color: lightgray;\n}\n.column-header .column-resize-handle {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0;\n    padding: 0;\n    width: 8px;\n    height: 100%;\n    cursor: col-resize;\n}\n\n/* cover: */\n\n.data-table-box {\n    position: relative;\n}\n\n.loading-cover {\n   position: absolute;\n   width: 100%;\n   height: 100%;\n   background-color: rgba(255, 255, 255, 0.3);\n   top: 0;\n}\n";
//# sourceMappingURL=/components/table.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/table.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.TABLE_TEMPLATE = "\n<div class=\"data-table-wrapper\">\n    <data-table-header *ngIf=\"header\"></data-table-header>\n\n    <div class=\"data-table-box\">\n        <table class=\"table table-condensed table-bordered data-table\">\n            <thead>\n                <tr>\n                    <th [hide]=\"!expandColumnVisible\" class=\"expand-column-header\">\n                    <th [hide]=\"!indexColumnVisible\" class=\"index-column-header\">\n                        <span [textContent]=\"indexColumnHeader\"></span>\n                    </th>\n                    <th [hide]=\"!selectColumnVisible\" class=\"select-column-header\">\n                        <input [hide]=\"!multiSelect\" type=\"checkbox\" [(ngModel)]=\"selectAllCheckbox\"/>\n                    </th>\n                    <th *ngFor=\"let column of columns\" #th [hide]=\"!column.visible\" (click)=\"headerClicked(column, $event)\"\n                        [class.sortable]=\"column.sortable\" [class.resizable]=\"column.resizable\"\n                        [ngClass]=\"column.styleClassObject\" class=\"column-header\" [style.width]=\"column.width | px\">\n                        <span *ngIf=\"!column.headerTemplate\" [textContent]=\"column.header\"></span>\n                        <span *ngIf=\"column.headerTemplate\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngOutletContext]=\"{column: column}\"></span>\n                        <span class=\"column-sort-icon\" *ngIf=\"column.sortable\">\n                            <span class=\"glyphicon glyphicon-sort column-sortable-icon\" [hide]=\"column.property === sortBy\"></span>\n                            <span [hide]=\"column.property !== sortBy\">\n                                <span class=\"glyphicon glyphicon-triangle-top\" [hide]=\"sortAsc\"></span>\n                                <span class=\"glyphicon glyphicon-triangle-bottom\" [hide]=\"!sortAsc\"></span>\n                            </span>\n                        </span>\n                        <span *ngIf=\"column.resizable\" class=\"column-resize-handle\" (mousedown)=\"resizeColumnStart($event, column, th)\"></span>\n                    </th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"let item of items; let index=index\" class=\"data-table-row-wrapper\"\n                   dataTableRow #row [item]=\"item\" [index]=\"index\" (selectedChange)=\"onRowSelectChanged(row)\">\n            </tbody>\n            <tbody class=\"substitute-rows\" *ngIf=\"pagination && substituteRows\">\n                <tr *ngFor=\"let item of substituteItems, let index = index\"\n                    [class.row-odd]=\"(index + items.length) % 2 === 0\"\n                    [class.row-even]=\"(index + items.length) % 2 === 1\"\n                    >\n                    <td [hide]=\"!expandColumnVisible\"></td>\n                    <td [hide]=\"!indexColumnVisible\">&nbsp;</td>\n                    <td [hide]=\"!selectColumnVisible\"></td>\n                    <td *ngFor=\"let column of columns\" [hide]=\"!column.visible\">\n                </tr>\n            </tbody>\n        </table>\n        <div class=\"loading-cover\" *ngIf=\"showReloading && reloading\"></div>\n    </div>\n\n    <data-table-pagination *ngIf=\"pagination\"></data-table-pagination>\n</div>\n";
//# sourceMappingURL=/components/table.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/components/types.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.defaultTranslations = {
    indexColumn: 'index',
    selectColumn: 'select',
    expandColumn: 'expand',
    paginationLimit: 'Limit',
    paginationRange: 'Results'
};
//# sourceMappingURL=/components/types.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/table.component.js");
exports.DataTable = table_component_1.DataTable;
var column_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/column.component.js");
exports.DataTableColumn = column_component_1.DataTableColumn;
var row_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/row.component.js");
exports.DataTableRow = row_component_1.DataTableRow;
var pagination_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/pagination.component.js");
exports.DataTablePagination = pagination_component_1.DataTablePagination;
var header_component_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/components/header.component.js");
exports.DataTableHeader = header_component_1.DataTableHeader;
var px_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/utils/px.js");
var hide_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/utils/hide.js");
var min_1 = __webpack_require__("../../../../angular-4-data-table-fix/dist/utils/min.js");
__export(__webpack_require__("../../../../angular-4-data-table-fix/dist/components/types.js"));
__export(__webpack_require__("../../../../angular-4-data-table-fix/dist/tools/data-table-resource.js"));
exports.DATA_TABLE_DIRECTIVES = [table_component_1.DataTable, column_component_1.DataTableColumn];
var DataTableModule = (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [
                table_component_1.DataTable, column_component_1.DataTableColumn,
                row_component_1.DataTableRow, pagination_component_1.DataTablePagination, header_component_1.DataTableHeader,
                px_1.PixelConverter, hide_1.Hide, min_1.MinPipe
            ],
            exports: [table_component_1.DataTable, column_component_1.DataTableColumn]
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableModule);
    return DataTableModule;
}());
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=/index.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/tools/data-table-resource.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DataTableResource = (function () {
    function DataTableResource(items) {
        this.items = items;
    }
    DataTableResource.prototype.query = function (params, filter) {
        var result = [];
        if (filter) {
            result = this.items.filter(filter);
        }
        else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }
        if (params.sortBy) {
            result.sort(function (a, b) {
                if (typeof a[params.sortBy] === 'string') {
                    return a[params.sortBy].localeCompare(b[params.sortBy]);
                }
                else {
                    return a[params.sortBy] - b[params.sortBy];
                }
            });
            if (params.sortAsc === false) {
                result.reverse();
            }
        }
        if (params.offset !== undefined) {
            if (params.limit === undefined) {
                result = result.slice(params.offset, result.length);
            }
            else {
                result = result.slice(params.offset, params.offset + params.limit);
            }
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(result); });
        });
    };
    DataTableResource.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.items.length); });
        });
    };
    return DataTableResource;
}());
exports.DataTableResource = DataTableResource;
//# sourceMappingURL=/tools/data-table-resource.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/utils/drag.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function drag(event, _a) {
    var move = _a.move, up = _a.up;
    var startX = event.pageX;
    var startY = event.pageY;
    var x = startX;
    var y = startY;
    var moved = false;
    function mouseMoveHandler(event) {
        var dx = event.pageX - x;
        var dy = event.pageY - y;
        x = event.pageX;
        y = event.pageY;
        if (dx || dy)
            moved = true;
        move(event, dx, dy, x, y);
        event.preventDefault(); // to avoid text selection
    }
    function mouseUpHandler(event) {
        x = event.pageX;
        y = event.pageY;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (up)
            up(event, x, y, moved);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}
exports.drag = drag;
//# sourceMappingURL=/utils/drag.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/utils/hide.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
function isBlank(obj) {
    return obj === undefined || obj === null;
}
var Hide = (function () {
    function Hide(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = null;
    }
    Object.defineProperty(Hide.prototype, "hide", {
        set: function (newCondition) {
            this.initDisplayStyle();
            if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
                this._prevCondition = true;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
            }
            else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
                this._prevCondition = false;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Hide.prototype.initDisplayStyle = function () {
        if (this._displayStyle === undefined) {
            var displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    };
    Hide = __decorate([
        core_1.Directive({ selector: '[hide]', inputs: ['hide'] }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], Hide);
    return Hide;
}());
exports.Hide = Hide;
//# sourceMappingURL=/utils/hide.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/utils/min.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var MinPipe = (function () {
    function MinPipe() {
    }
    MinPipe.prototype.transform = function (value, args) {
        return Math.min.apply(null, value);
    };
    MinPipe = __decorate([
        core_1.Pipe({
            name: 'min'
        }), 
        __metadata('design:paramtypes', [])
    ], MinPipe);
    return MinPipe;
}());
exports.MinPipe = MinPipe;
//# sourceMappingURL=/utils/min.js.map

/***/ }),

/***/ "../../../../angular-4-data-table-fix/dist/utils/px.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PixelConverter = (function () {
    function PixelConverter() {
    }
    PixelConverter.prototype.transform = function (value, args) {
        if (value === undefined) {
            return;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value + 'px';
        }
    };
    PixelConverter = __decorate([
        core_1.Pipe({
            name: 'px'
        }), 
        __metadata('design:paramtypes', [])
    ], PixelConverter);
    return PixelConverter;
}());
exports.PixelConverter = PixelConverter;
//# sourceMappingURL=/utils/px.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/column.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var DataTableColumn = (function () {
    function DataTableColumn() {
        this.sortable = false;
        this.resizable = false;
        this.visible = true;
        this.styleClassObject = {}; // for [ngClass]
    }
    DataTableColumn.prototype.getCellColor = function (row, index) {
        if (this.cellColors !== undefined) {
            return this.cellColors(row.item, row, this, index);
        }
    };
    DataTableColumn.prototype.ngOnInit = function () {
        this._initCellClass();
    };
    DataTableColumn.prototype._initCellClass = function () {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = (_a = {},
                _a[this.styleClass] = true,
                _a);
        }
        var _a;
    };
    return DataTableColumn;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableColumn.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "sortable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "resizable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableColumn.prototype, "property", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableColumn.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], DataTableColumn.prototype, "cellColors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "visible", void 0);
__decorate([
    core_1.ContentChild('dataTableCell'),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "cellTemplate", void 0);
__decorate([
    core_1.ContentChild('dataTableHeader'),
    __metadata("design:type", Object)
], DataTableColumn.prototype, "headerTemplate", void 0);
DataTableColumn = __decorate([
    core_1.Directive({
        selector: 'data-table-column'
    })
], DataTableColumn);
exports.DataTableColumn = DataTableColumn;
//# sourceMappingURL=/components/column.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/header.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.component.js");
var header_template_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/header.template.js");
var header_style_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/header.style.js");
var DataTableHeader = (function () {
    function DataTableHeader(dataTable) {
        this.dataTable = dataTable;
        this.columnSelectorOpen = false;
    }
    DataTableHeader.prototype._closeSelector = function () {
        this.columnSelectorOpen = false;
    };
    return DataTableHeader;
}());
DataTableHeader = __decorate([
    core_1.Component({
        moduleId: module.i,
        selector: 'data-table-header',
        template: header_template_1.HEADER_TEMPLATE,
        styles: [header_style_1.HEADER_STYLE],
        host: {
            '(document:click)': '_closeSelector()'
        }
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))),
    __metadata("design:paramtypes", [table_component_1.DataTable])
], DataTableHeader);
exports.DataTableHeader = DataTableHeader;
//# sourceMappingURL=/components/header.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/header.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_STYLE = "\n.data-table-header {\n    min-height: 25px;\n    margin-bottom: 10px;\n}\n.title {\n    display: inline-block;\n    margin: 5px 0 0 5px;\n}\n.button-panel {\n    float: right;\n}\n.button-panel button {\n    outline: none !important;\n}\n\n.column-selector-wrapper {\n    position: relative;\n}\n.column-selector-box {\n    box-shadow: 0 0 10px lightgray;\n    width: 150px;\n    padding: 10px;\n    position: absolute;\n    right: 0;\n    top: 1px;\n    z-index: 1060;\n}\n.column-selector-box .checkbox {\n    margin-bottom: 4px;\n}\n.column-selector-fixed-column {\n    font-style: italic;\n}\n";
//# sourceMappingURL=/components/header.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/header.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_TEMPLATE = "\n<div class=\"data-table-header\">\n    <h4 class=\"title\" [textContent]=\"dataTable.headerTitle\"></h4>\n    <div class=\"button-panel\">\n        <button type=\"button\" class=\"btn btn-default btn-sm refresh-button\"\n            (click)=\"dataTable.reloadItems()\">\n            <span class=\"glyphicon glyphicon-refresh\"></span>\n        </button>\n        <button type=\"button\" class=\"btn btn-default btn-sm column-selector-button\" [class.active]=\"columnSelectorOpen\"\n            (click)=\"columnSelectorOpen = !columnSelectorOpen; $event.stopPropagation()\" >\n            <span class=\"glyphicon glyphicon-list\"></span>\n        </button>\n        <div class=\"column-selector-wrapper\" (click)=\"$event.stopPropagation()\">\n            <div *ngIf=\"columnSelectorOpen\" class=\"column-selector-box panel panel-default\">\n                <div *ngIf=\"dataTable.expandableRows\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.expandColumnVisible\"/>\n                        <span>{{dataTable.translations.expandColumn}}</span>\n                    </label>\n                </div>\n                <div *ngIf=\"dataTable.indexColumn\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.indexColumnVisible\"/>\n                        <span>{{dataTable.translations.indexColumn}}</span>\n                    </label>\n                </div>\n                <div *ngIf=\"dataTable.selectColumn\" class=\"column-selector-fixed-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"dataTable.selectColumnVisible\"/>\n                        <span>{{dataTable.translations.selectColumn}}</span>\n                    </label>\n                </div>\n                <div *ngFor=\"let column of dataTable.columns\" class=\"column-selector-column checkbox\">\n                    <label>\n                        <input type=\"checkbox\" [(ngModel)]=\"column.visible\"/>\n                        <span [textContent]=\"column.header\"></span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
//# sourceMappingURL=/components/header.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/pagination.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.component.js");
var pagination_template_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/pagination.template.js");
var pagination_style_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/pagination.style.js");
var DataTablePagination = (function () {
    function DataTablePagination(dataTable) {
        this.dataTable = dataTable;
        this.show_range = false;
        this.show_limit = false;
        this.show_input = false;
        this.show_numbers = true;
    }
    DataTablePagination.prototype.pageBack = function () {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    };
    DataTablePagination.prototype.pageForward = function () {
        this.dataTable.offset += this.dataTable.limit;
    };
    DataTablePagination.prototype.pageFirst = function () {
        this.dataTable.offset = 0;
    };
    DataTablePagination.prototype.pageLast = function () {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    };
    Object.defineProperty(DataTablePagination.prototype, "maxPage", {
        get: function () {
            return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "limit", {
        get: function () {
            return this.dataTable.limit;
        },
        set: function (value) {
            this.dataTable.limit = Number(value); // TODO better way to handle that value of number <input> is string?
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "page", {
        get: function () {
            return this.dataTable.page;
        },
        set: function (value) {
            this.dataTable.page = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagination.prototype.hasPrevious = function (number, page) {
        var difference = this.getDifference();
        if ((page - difference) > 1) {
            return true;
        }
        return false;
    };
    DataTablePagination.prototype.hasNext = function (number, page) {
        var difference = this.getDifference();
        if ((number - page) > difference) {
            return true;
        }
        return false;
    };
    DataTablePagination.prototype.getDifference = function () {
        var difference = 2;
        return difference;
    };
    DataTablePagination.prototype.createPageRange = function (number, page) {
        var items = [];
        if (number > 1) {
            var difference = this.getDifference();
            var maxPage = number;
            var minPage = 1;
            if ((number - page) >= difference) {
                maxPage = page + difference;
            }
            if ((page - difference) >= 1) {
                minPage = page - difference;
            }
            for (var i = minPage; i <= maxPage; i++) {
                items.push(i);
            }
        }
        return items;
    };
    return DataTablePagination;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTablePagination.prototype, "show_range", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTablePagination.prototype, "show_limit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTablePagination.prototype, "show_input", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTablePagination.prototype, "show_numbers", void 0);
DataTablePagination = __decorate([
    core_1.Component({
        moduleId: module.i,
        selector: 'data-table-pagination',
        template: pagination_template_1.PAGINATION_TEMPLATE,
        styles: [pagination_style_1.PAGINATION_STYLE]
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))),
    __metadata("design:paramtypes", [table_component_1.DataTable])
], DataTablePagination);
exports.DataTablePagination = DataTablePagination;
//# sourceMappingURL=/components/pagination.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/pagination.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_STYLE = "\n.pagination-box {\n    position: relative;\n    margin-top: -10px;\n}\n.pagination-range {\n    margin-top: 7px;\n    margin-left: 3px;\n    display: inline-block;\n}\n.pagination-controllers {\n    float: right;\n}\n.pagination-controllers input {\n    min-width: 60px;\n    /*padding: 1px 0px 0px 5px;*/\n    text-align: right;\n}\n\n.pagination-limit {\n    margin-right: 25px;\n    display: inline-table;\n    width: 150px;\n}\n.pagination-pages {\n    display: inline-block;\n}\n.pagination-page {\n    width: 110px;\n    display: inline-table;\n}\n.pagination-box button {\n    outline: none !important;\n}\n.pagination-prevpage,\n.pagination-nextpage,\n.pagination-firstpage,\n.pagination-lastpage {\n    vertical-align: top;\n}\n.pagination-reload {\n    color: gray;\n    font-size: 12px;\n}\n";
//# sourceMappingURL=/components/pagination.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/pagination.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_TEMPLATE = "\n<div class=\"pagination-box\">\n    <div class=\"pagination-range\" *ngIf=\"show_range\">\n        {{dataTable.translations.paginationRange}}:\n        <span [textContent]=\"dataTable.offset + 1\"></span>\n        -\n        <span [textContent]=\"[dataTable.offset + dataTable.limit , dataTable.itemCount] | min\"></span>\n        /\n        <span [textContent]=\"dataTable.itemCount\"></span>\n    </div>\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-limit\" *ngIf=\"show_limit\">\n            <div class=\"input-group\">\n                <span class=\"input-group-addon\">{{dataTable.translations.paginationLimit}}:</span>\n                <input #limitInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\"\n                       [ngModel]=\"limit\" (blur)=\"limit = limitInput.value\"\n                       (keyup.enter)=\"limit = limitInput.value\" (keyup.esc)=\"limitInput.value = limit\"/>\n            </div>\n        </div>\n        <div class=\" pagination-pages\">\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageFirst()\" class=\"btn btn-default pagination-firstpage\">&laquo;</button>\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageBack()\" class=\"btn btn-default pagination-prevpage\">&lsaquo;</button>\n            <div class=\"pagination-page\" *ngIf=\"show_input\">\n                <div class=\"input-group\">\n                    <input #pageInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" max=\"{{maxPage}}\"\n                           [ngModel]=\"page\" (blur)=\"page = pageInput.value\"\n                           (keyup.enter)=\"page = pageInput.value\" (keyup.esc)=\"pageInput.value = page\"/>\n                    <div class=\"input-group-addon\">\n                        <span>/</span>\n                        <span [textContent]=\"dataTable.lastPage\"></span>\n                    </div>\n                </div>\n            </div>\n            <button *ngIf=\"hasPrevious(maxPage,page)\" [disabled]=\"true\" (click)=\"false\" class=\"btn btn-default hasPrevious\">...</button>\n            <div class=\"pagination-page\" *ngIf=\"show_numbers\">\n                <button *ngFor=\"let i of createPageRange(maxPage,page)\"\n                    [disabled]=\"i == page\"\n                    (click)=\"page = i\"\n                    class=\"btn btn-default\">{{ i }}</button>\n            </div>\n            <button *ngIf=\"hasNext(maxPage,page)\" [disabled]=\"true\" (click)=\"false\" class=\"btn btn-default hasNext\">...</button>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageForward()\" class=\"btn btn-default pagination-nextpage\">&rsaquo;</button>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageLast()\" class=\"btn btn-default pagination-lastpage\">&raquo;</button>\n        </div>\n    </div>\n</div>\n";
//# sourceMappingURL=/components/pagination.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/row.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.component.js");
var row_template_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/row.template.js");
var row_style_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/row.style.js");
var DataTableRow = (function () {
    function DataTableRow(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new core_1.EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    Object.defineProperty(DataTableRow.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.selectedChange.emit(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRow.prototype, "displayIndex", {
        // other:
        get: function () {
            if (this.dataTable.pagination) {
                return this.dataTable.displayParams.offset + this.index + 1;
            }
            else {
                return this.index + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableRow.prototype.getTooltip = function () {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    };
    DataTableRow.prototype.ngOnDestroy = function () {
        this.selected = false;
    };
    return DataTableRow;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableRow.prototype, "item", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableRow.prototype, "index", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTableRow.prototype, "selectedChange", void 0);
DataTableRow = __decorate([
    core_1.Component({
        moduleId: module.i,
        selector: '[dataTableRow]',
        template: row_template_1.ROW_TEMPLATE,
        styles: [row_style_1.ROW_STYLE]
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return table_component_1.DataTable; }))),
    __metadata("design:paramtypes", [table_component_1.DataTable])
], DataTableRow);
exports.DataTableRow = DataTableRow;
//# sourceMappingURL=/components/row.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/row.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ROW_STYLE = "\n.select-column {\n    text-align: center;\n}\n\n.row-expand-button {\n    cursor: pointer;\n    text-align: center;\n}\n\n.clickable {\n    cursor: pointer;\n}\n";
//# sourceMappingURL=/components/row.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/row.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ROW_TEMPLATE = "\n<tr\tclass=\"data-table-row\"\n    [title]=\"getTooltip()\"\n    [style.background-color]=\"dataTable.getRowColor(item, index, _this)\"\n    [class.row-odd]=\"index % 2 === 0\"\n    [class.row-even]=\"index % 2 === 1\"\n    [class.selected]=\"selected\"\n    [class.clickable]=\"dataTable.selectOnRowClick\"\n    (dblclick)=\"dataTable.rowDoubleClicked(_this, $event)\"\n    (click)=\"dataTable.rowClicked(_this, $event)\"\n    >\n    <td [hide]=\"!dataTable.expandColumnVisible\" (click)=\"expanded = !expanded; $event.stopPropagation()\" class=\"row-expand-button\">\n        <span class=\"glyphicon glyphicon-triangle-right\" [hide]=\"expanded\"></span>\n        <span class=\"glyphicon glyphicon-triangle-bottom\" [hide]=\"!expanded\"></span>\n    </td>\n    <td [hide]=\"!dataTable.indexColumnVisible\" class=\"index-column\" [textContent]=\"displayIndex\"></td>\n    <td [hide]=\"!dataTable.selectColumnVisible\" class=\"select-column\">\n        <input type=\"checkbox\" [(ngModel)]=\"selected\"/>\n    </td>\n    <td *ngFor=\"let column of dataTable.columns\" [hide]=\"!column.visible\" [ngClass]=\"column.styleClassObject\" class=\"data-column\"\n        [style.background-color]=\"column.getCellColor(_this, index)\">\n        <div *ngIf=\"!column.cellTemplate\" [textContent]=\"item[column.property]\"></div>\n        <div *ngIf=\"column.cellTemplate\" [ngTemplateOutlet]=\"column.cellTemplate\" [ngOutletContext]=\"{column: column, row: _this, item: item}\"></div>\n    </td>\n</tr>\n<tr *ngIf=\"dataTable.expandableRows\" [hide]=\"!expanded\" class=\"row-expansion\">\n    <td [attr.colspan]=\"dataTable.columnCount\">\n        <div [ngTemplateOutlet]=\"dataTable.expandTemplate\" [ngOutletContext]=\"{row: _this, item: item}\"></div>\n    </td>\n</tr>\n";
//# sourceMappingURL=/components/row.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/table.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var column_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/column.component.js");
var row_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/row.component.js");
var default_translations_type_1 = __webpack_require__("../../../../angular-4-data-table/dist/types/default-translations.type.js");
var drag_1 = __webpack_require__("../../../../angular-4-data-table/dist/utils/drag.js");
var table_template_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.template.js");
var table_style_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.style.js");
var DataTable = (function () {
    function DataTable() {
        this._items = [];
        this.header = true;
        this.pagination = true;
        this.pagination_range = false;
        this.pagination_limit = false;
        this.pagination_input = false;
        this.pagination_numbers = true;
        this.indexColumn = true;
        this.indexColumnHeader = '';
        this.selectColumn = false;
        this.multiSelect = true;
        this.substituteRows = true;
        this.expandableRows = false;
        this.translations = default_translations_type_1.defaultTranslations;
        this.selectOnRowClick = false;
        this.autoReload = true;
        this.showReloading = false;
        this._sortAsc = true;
        this._offset = 0;
        this._limit = 10;
        // Reloading:
        this._reloading = false;
        this.reload = new core_1.EventEmitter();
        this._displayParams = {}; // params of the last finished reload
        this._scheduledReload = null;
        // event handlers:
        this.rowClick = new core_1.EventEmitter();
        this.rowDoubleClick = new core_1.EventEmitter();
        this.headerClick = new core_1.EventEmitter();
        this.cellClick = new core_1.EventEmitter();
        this.selectedRows = [];
        this._selectAllCheckbox = false;
        // column resizing:
        this._resizeInProgress = false;
        this.resizeLimit = 30;
    }
    Object.defineProperty(DataTable.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items;
            this._onReloadFinished();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (value) {
            this._sortBy = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortAsc", {
        get: function () {
            return this._sortAsc;
        },
        set: function (value) {
            this._sortAsc = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (value) {
            this._limit = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "page", {
        // calculated property:
        get: function () {
            return Math.floor(this.offset / this.limit) + 1;
        },
        set: function (value) {
            this.offset = (value - 1) * this.limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "lastPage", {
        get: function () {
            return Math.ceil(this.itemCount / this.limit);
        },
        enumerable: true,
        configurable: true
    });
    // setting multiple observable properties simultaneously
    DataTable.prototype.sort = function (sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    };
    // init
    DataTable.prototype.ngOnInit = function () {
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    };
    DataTable.prototype._initDefaultValues = function () {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    };
    DataTable.prototype._initDefaultClickEvents = function () {
        var _this = this;
        this.headerClick.subscribe(function (tableEvent) { return _this.sortColumn(tableEvent.column); });
        if (this.selectOnRowClick) {
            this.rowClick.subscribe(function (tableEvent) { return tableEvent.row.selected = !tableEvent.row.selected; });
        }
    };
    Object.defineProperty(DataTable.prototype, "reloading", {
        get: function () {
            return this._reloading;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.reloadItems = function () {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    };
    DataTable.prototype._onReloadFinished = function () {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    };
    Object.defineProperty(DataTable.prototype, "displayParams", {
        get: function () {
            return this._displayParams;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._updateDisplayParams = function () {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    };
    // for avoiding cascading reloads if multiple params are set at once:
    DataTable.prototype._triggerReload = function () {
        var _this = this;
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout(function () {
            _this.reloadItems();
        });
    };
    DataTable.prototype.rowClicked = function (row, event) {
        this.rowClick.emit({ row: row, event: event });
    };
    DataTable.prototype.rowDoubleClicked = function (row, event) {
        this.rowDoubleClick.emit({ row: row, event: event });
    };
    DataTable.prototype.headerClicked = function (column, event) {
        if (!this._resizeInProgress) {
            this.headerClick.emit({ column: column, event: event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    };
    DataTable.prototype.cellClicked = function (column, row, event) {
        this.cellClick.emit({ row: row, column: column, event: event });
    };
    // functions:
    DataTable.prototype._getRemoteParameters = function () {
        var params = {};
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    };
    DataTable.prototype.sortColumn = function (column) {
        if (column.sortable) {
            var ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    };
    Object.defineProperty(DataTable.prototype, "columnCount", {
        get: function () {
            var count = 0;
            count += this.indexColumnVisible ? 1 : 0;
            count += this.selectColumnVisible ? 1 : 0;
            count += this.expandColumnVisible ? 1 : 0;
            this.columns.toArray().forEach(function (column) {
                count += column.visible ? 1 : 0;
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.getRowColor = function (item, index, row) {
        if (this.rowColors !== undefined) {
            return this.rowColors(item, row, index);
        }
    };
    Object.defineProperty(DataTable.prototype, "selectAllCheckbox", {
        get: function () {
            return this._selectAllCheckbox;
        },
        set: function (value) {
            this._selectAllCheckbox = value;
            this._onSelectAllChanged(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._onSelectAllChanged = function (value) {
        this.rows.toArray().forEach(function (row) { return row.selected = value; });
    };
    DataTable.prototype.onRowSelectChanged = function (row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            var index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            }
            else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        }
        else {
            if (row.selected) {
                this.selectedRow = row;
            }
            else if (this.selectedRow === row) {
                this.selectedRow = undefined;
            }
        }
        // unselect all other rows:
        if (row.selected && !this.multiSelect) {
            this.rows.toArray().filter(function (row_) { return row_.selected; }).forEach(function (row_) {
                if (row_ !== row) {
                    row_.selected = false;
                }
            });
        }
    };
    Object.defineProperty(DataTable.prototype, "substituteItems", {
        // other:
        get: function () {
            return Array.from({ length: this.displayParams.limit - this.items.length });
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.resizeColumnStart = function (event, column, columnElement) {
        var _this = this;
        this._resizeInProgress = true;
        drag_1.drag(event, {
            move: function (moveEvent, dx) {
                if (_this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            },
        });
    };
    DataTable.prototype._isResizeInLimit = function (columnElement, dx) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) ||
            !columnElement.nextElementSibling ||
            (dx >= 0 && (columnElement.nextElementSibling.offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    };
    return DataTable;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Array])
], DataTable.prototype, "items", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTable.prototype, "itemCount", void 0);
__decorate([
    core_1.ContentChildren(column_component_1.DataTableColumn),
    __metadata("design:type", core_1.QueryList)
], DataTable.prototype, "columns", void 0);
__decorate([
    core_1.ViewChildren(row_component_1.DataTableRow),
    __metadata("design:type", core_1.QueryList)
], DataTable.prototype, "rows", void 0);
__decorate([
    core_1.ContentChild('dataTableExpand'),
    __metadata("design:type", core_1.TemplateRef)
], DataTable.prototype, "expandTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTable.prototype, "headerTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "pagination", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "pagination_range", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "pagination_limit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "pagination_input", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "pagination_numbers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "indexColumn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "indexColumnHeader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], DataTable.prototype, "rowColors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], DataTable.prototype, "rowTooltip", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "selectColumn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "multiSelect", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "substituteRows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "expandableRows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "translations", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "selectOnRowClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "autoReload", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTable.prototype, "showReloading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTable.prototype, "sortBy", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTable.prototype, "sortAsc", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTable.prototype, "offset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTable.prototype, "limit", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTable.prototype, "page", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTable.prototype, "reload", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTable.prototype, "rowClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTable.prototype, "rowDoubleClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTable.prototype, "headerClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTable.prototype, "cellClick", void 0);
DataTable = __decorate([
    core_1.Component({
        moduleId: module.i,
        selector: 'data-table',
        template: table_template_1.TABLE_TEMPLATE,
        styles: [table_style_1.TABLE_STYLE]
    })
], DataTable);
exports.DataTable = DataTable;
//# sourceMappingURL=/components/table.component.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/table.style.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_STYLE = "\n/* bootstrap override: */\n\n:host /deep/ .data-table.table > tbody+tbody {\n    border-top: none;\n}\n:host /deep/ .data-table.table td {\n    vertical-align: middle;\n}\n\n:host /deep/ .data-table > thead > tr > th,\n:host /deep/ .data-table > tbody > tr > td {\n\toverflow: hidden;\n}\n\n/* I can't use the bootstrap striped table, because of the expandable rows */\n:host /deep/ .row-odd {\n    background-color: #F6F6F6;\n}\n:host /deep/ .row-even {\n}\n\n.data-table .substitute-rows > tr:hover,\n:host /deep/ .data-table .data-table-row:hover {\n    background-color: #ECECEC;\n}\n/* table itself: */\n\n.data-table {\n    box-shadow: 0 0 15px rgb(236, 236, 236);\n    table-layout: fixed;\n}\n\n/* header cells: */\n\n.column-header {\n    position: relative;\n}\n.expand-column-header {\n\twidth: 50px;\n}\n.select-column-header {\n\twidth: 50px;\n\ttext-align: center;\n}\n.index-column-header {\n\twidth: 40px;\n}\n.column-header.sortable {\n    cursor: pointer;\n}\n.column-header .column-sort-icon {\n\tfloat: right;\n}\n.column-header.resizable .column-sort-icon {\n    margin-right: 8px;\n}\n.column-header .column-sort-icon .column-sortable-icon {\n    color: lightgray;\n}\n.column-header .column-resize-handle {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0;\n    padding: 0;\n    width: 8px;\n    height: 100%;\n    cursor: col-resize;\n}\n\n/* cover: */\n\n.data-table-box {\n    position: relative;\n}\n\n.loading-cover {\n   position: absolute;\n   width: 100%;\n   height: 100%;\n   background-color: rgba(255, 255, 255, 0.3);\n   top: 0;\n}\n";
//# sourceMappingURL=/components/table.style.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/components/table.template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_TEMPLATE = "\n<div class=\"data-table-wrapper\">\n    <data-table-header *ngIf=\"header\"></data-table-header>\n\n    <div class=\"data-table-box\">\n        <table class=\"table table-condensed table-bordered data-table\">\n            <thead>\n                <tr>\n                    <th [hide]=\"!expandColumnVisible\" class=\"expand-column-header\">\n                    <th [hide]=\"!indexColumnVisible\" class=\"index-column-header\">\n                        <span [textContent]=\"indexColumnHeader\"></span>\n                    </th>\n                    <th [hide]=\"!selectColumnVisible\" class=\"select-column-header\">\n                        <input [hide]=\"!multiSelect\" type=\"checkbox\" [(ngModel)]=\"selectAllCheckbox\"/>\n                    </th>\n                    <th *ngFor=\"let column of columns\" #th [hide]=\"!column.visible\" (click)=\"headerClicked(column, $event)\"\n                        [class.sortable]=\"column.sortable\" [class.resizable]=\"column.resizable\"\n                        [ngClass]=\"column.styleClassObject\" class=\"column-header\" [style.width]=\"column.width | px\">\n                        <span *ngIf=\"!column.headerTemplate\" [textContent]=\"column.header\"></span>\n                        <span *ngIf=\"column.headerTemplate\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngOutletContext]=\"{column: column}\"></span>\n                        <span class=\"column-sort-icon\" *ngIf=\"column.sortable\">\n                            <span class=\"glyphicon glyphicon-sort column-sortable-icon\" [hide]=\"column.property === sortBy\"></span>\n                            <span [hide]=\"column.property !== sortBy\">\n                                <span class=\"glyphicon glyphicon-triangle-top\" [hide]=\"sortAsc\"></span>\n                                <span class=\"glyphicon glyphicon-triangle-bottom\" [hide]=\"!sortAsc\"></span>\n                            </span>\n                        </span>\n                        <span *ngIf=\"column.resizable\" class=\"column-resize-handle\" (mousedown)=\"resizeColumnStart($event, column, th)\"></span>\n                    </th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"let item of items; let index=index\" class=\"data-table-row-wrapper\"\n                   dataTableRow #row [item]=\"item\" [index]=\"index\" (selectedChange)=\"onRowSelectChanged(row)\">\n            </tbody>\n            <tbody class=\"substitute-rows\" *ngIf=\"pagination && substituteRows\">\n                <tr *ngFor=\"let item of substituteItems, let index = index\"\n                    [class.row-odd]=\"(index + items.length) % 2 === 0\"\n                    [class.row-even]=\"(index + items.length) % 2 === 1\"\n                    >\n                    <td [hide]=\"!expandColumnVisible\"></td>\n                    <td [hide]=\"!indexColumnVisible\">&nbsp;</td>\n                    <td [hide]=\"!selectColumnVisible\"></td>\n                    <td *ngFor=\"let column of columns\" [hide]=\"!column.visible\">\n                </tr>\n            </tbody>\n        </table>\n        <div class=\"loading-cover\" *ngIf=\"showReloading && reloading\"></div>\n    </div>\n\n    <data-table-pagination\n        *ngIf=\"pagination\"\n        [show_range]=\"pagination_range\"\n        [show_limit]=\"pagination_limit\"\n        [show_input]=\"pagination_input\"\n        [show_numbers]=\"pagination_numbers\"></data-table-pagination>\n</div>\n";
//# sourceMappingURL=/components/table.template.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var table_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/table.component.js");
exports.DataTable = table_component_1.DataTable;
var column_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/column.component.js");
exports.DataTableColumn = column_component_1.DataTableColumn;
var row_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/row.component.js");
exports.DataTableRow = row_component_1.DataTableRow;
var pagination_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/pagination.component.js");
exports.DataTablePagination = pagination_component_1.DataTablePagination;
var header_component_1 = __webpack_require__("../../../../angular-4-data-table/dist/components/header.component.js");
exports.DataTableHeader = header_component_1.DataTableHeader;
var px_1 = __webpack_require__("../../../../angular-4-data-table/dist/utils/px.js");
var hide_1 = __webpack_require__("../../../../angular-4-data-table/dist/utils/hide.js");
var min_1 = __webpack_require__("../../../../angular-4-data-table/dist/utils/min.js");
var default_translations_type_1 = __webpack_require__("../../../../angular-4-data-table/dist/types/default-translations.type.js");
exports.defaultTranslations = default_translations_type_1.defaultTranslations;
__export(__webpack_require__("../../../../angular-4-data-table/dist/tools/data-table-resource.js"));
exports.DATA_TABLE_DIRECTIVES = [table_component_1.DataTable, column_component_1.DataTableColumn];
var DataTableModule = (function () {
    function DataTableModule() {
    }
    return DataTableModule;
}());
DataTableModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [
            table_component_1.DataTable, column_component_1.DataTableColumn,
            row_component_1.DataTableRow, pagination_component_1.DataTablePagination, header_component_1.DataTableHeader,
            px_1.PixelConverter, hide_1.Hide, min_1.MinPipe
        ],
        exports: [table_component_1.DataTable, column_component_1.DataTableColumn]
    })
], DataTableModule);
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=/index.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/tools/data-table-resource.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataTableResource = (function () {
    function DataTableResource(items) {
        this.items = items;
    }
    DataTableResource.prototype.query = function (params, filter) {
        var result = [];
        if (filter) {
            result = this.items.filter(filter);
        }
        else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }
        if (params.sortBy) {
            result.sort(function (a, b) {
                if (typeof a[params.sortBy] === 'string') {
                    return a[params.sortBy].localeCompare(b[params.sortBy]);
                }
                else {
                    return a[params.sortBy] - b[params.sortBy];
                }
            });
            if (params.sortAsc === false) {
                result.reverse();
            }
        }
        if (params.offset !== undefined) {
            if (params.limit === undefined) {
                result = result.slice(params.offset, result.length);
            }
            else {
                result = result.slice(params.offset, params.offset + params.limit);
            }
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(result); });
        });
    };
    DataTableResource.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.items.length); });
        });
    };
    return DataTableResource;
}());
exports.DataTableResource = DataTableResource;
//# sourceMappingURL=/tools/data-table-resource.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/types/default-translations.type.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslations = {
    indexColumn: 'index',
    selectColumn: 'select',
    expandColumn: 'expand',
    paginationLimit: 'Limit',
    paginationRange: 'Results'
};
//# sourceMappingURL=/types/default-translations.type.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/utils/drag.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function drag(event, _a) {
    var move = _a.move, up = _a.up;
    var startX = event.pageX;
    var startY = event.pageY;
    var x = startX;
    var y = startY;
    var moved = false;
    function mouseMoveHandler(event) {
        var dx = event.pageX - x;
        var dy = event.pageY - y;
        x = event.pageX;
        y = event.pageY;
        if (dx || dy)
            moved = true;
        move(event, dx, dy, x, y);
        event.preventDefault(); // to avoid text selection
    }
    function mouseUpHandler(event) {
        x = event.pageX;
        y = event.pageY;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (up)
            up(event, x, y, moved);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}
exports.drag = drag;
//# sourceMappingURL=/utils/drag.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/utils/hide.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
function isBlank(obj) {
    return obj === undefined || obj === null;
}
var Hide = (function () {
    function Hide(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = null;
    }
    Object.defineProperty(Hide.prototype, "hide", {
        set: function (newCondition) {
            this.initDisplayStyle();
            if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
                this._prevCondition = true;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
            }
            else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
                this._prevCondition = false;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Hide.prototype.initDisplayStyle = function () {
        if (this._displayStyle === undefined) {
            var displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    };
    return Hide;
}());
Hide = __decorate([
    core_1.Directive({ selector: '[hide]', inputs: ['hide'] }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], Hide);
exports.Hide = Hide;
//# sourceMappingURL=/utils/hide.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/utils/min.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var MinPipe = (function () {
    function MinPipe() {
    }
    MinPipe.prototype.transform = function (value, args) {
        return Math.min.apply(null, value);
    };
    return MinPipe;
}());
MinPipe = __decorate([
    core_1.Pipe({
        name: 'min'
    })
], MinPipe);
exports.MinPipe = MinPipe;
//# sourceMappingURL=/utils/min.js.map

/***/ }),

/***/ "../../../../angular-4-data-table/dist/utils/px.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PixelConverter = (function () {
    function PixelConverter() {
    }
    PixelConverter.prototype.transform = function (value, args) {
        if (value === undefined) {
            return;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value + 'px';
        }
    };
    return PixelConverter;
}());
PixelConverter = __decorate([
    core_1.Pipe({
        name: 'px'
    })
], PixelConverter);
exports.PixelConverter = PixelConverter;
//# sourceMappingURL=/utils/px.js.map

/***/ }),

/***/ "../../../../underscore/underscore.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ })

});
//# sourceMappingURL=reports.module.chunk.js.map