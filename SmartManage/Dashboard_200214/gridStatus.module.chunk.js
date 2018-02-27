webpackJsonp(["gridStatus.module"],{

/***/ "../../../../../src/app/routes/gridStatus/gridStatus.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gridStatus_gridStatus_component__ = __webpack_require__("../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__esriMap_esri_map_module__ = __webpack_require__("../../../../../src/app/routes/esriMap/esri-map.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_popover__ = __webpack_require__("../../../../ng2-popover/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_popover___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_popover__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_smart_table__ = __webpack_require__("../../../../ng2-smart-table/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_export_service__ = __webpack_require__("../../../../../src/app/core/services/export.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__gridStatus_gridStatus_component__["a" /* GridStatusComponent */] },
];
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__esriMap_esri_map_module__["EsriMapModule"],
            __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_popover__["PopoverModule"],
            __WEBPACK_IMPORTED_MODULE_7_ng2_smart_table__["a" /* Ng2SmartTableModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__gridStatus_gridStatus_component__["a" /* GridStatusComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__core_services_export_service__["a" /* ExportToCsvService */]]
    })
], HomeModule);

//# sourceMappingURL=gridStatus.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n            <div class=\"panel widget bg-primary\" style=\"height:80px; \">\r\n                <div class=\"row row-table\">\r\n                    <div class=\"col-xs-4 text-center bg-primary-dark pv-lg\">\r\n                        <em class=\"icon-share fa-3x\"></em>\r\n                    </div>\r\n                    <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <a style=\"color: white;\" data-toggle=\"modal\" data-target=\"#totalModal\">{{totalFeeders}}</a>\r\n                        </div>\r\n\r\n                        <div class=\"text-uppercase\">Total Feeders </div>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n            <div class=\"panel widget bg-green\" style=\"height:80px;\">\r\n                <div class=\"row row-table\">\r\n                    <div class=\" col-xs-4 text-center bg-green-dark pv-lg\">\r\n                        <em class=\"fa fa-archive fa-3x\"></em>\r\n                    </div>\r\n                    <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <a style=\"color: white;\" data-toggle=\"modal\" data-target=\"#deliveredModal\">{{delivered}}</a>\r\n                        </div>\r\n                        <div class=\"text-uppercase\">Delivered </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n            <div class=\"panel widget bg-purple\" style=\"height:80px;\">\r\n                <div class=\"row row-table\">\r\n                    <div class=\"col-xs-4 text-center bg-purple-dark pv-lg\">\r\n                        <em class=\"fa fa-bars fa-3x\"></em>\r\n                    </div>\r\n                    <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <a style=\"color: white;\" data-toggle=\"modal\" data-target=\"#backOfficeModal\">{{backOffice}}</a>\r\n                        </div>\r\n                        <div class=\"text-uppercase\">Back office</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n            <div class=\"panel widget bg-info\" style=\"height:80px;\">\r\n                <div class=\"row row-table\">\r\n                    <div class=\"col-xs-4 text-center bg-info-dark pv-lg\">\r\n                        <em class=\"icon-briefcase fa-3x\"></em>\r\n                    </div>\r\n                    <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <a style=\"color: white;\" data-toggle=\"modal\" data-target=\"#inProgressModal\">{{fcInProgress}}</a>\r\n                        </div>\r\n                        <div class=\"text-uppercase\">In-Progress</div>\r\n                    </div>\r\n                    <!-- <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <span style=\"color: white;\">{{fcInProgress}}</span>\r\n                        </div>\r\n                        <div class=\"text-uppercase\">In-Progress</div>\r\n                    </div> -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!--  <div class=\"col-lg-3 col-md-6 col-sm-8\">\r\n            <div class=\"panel widget bg-warning\" style=\"height:110px;\">\r\n                <div class=\"row row-table\">\r\n                    <div class=\"col-xs-4 text-center bg-warning-dark pv-lg\">\r\n                        <em class=\"icon-briefcase fa-3x\"></em>\r\n                    </div>\r\n                    <div class=\"col-xs-8 pv-lg\">\r\n                        <div class=\"h2 mt0\">\r\n                            <span style=\"color: white;\">{{fcToStart}}</span>\r\n                        </div>\r\n                        <div class=\"text-uppercase\">To Start </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>  -->\r\n\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- <div class=\"col-sm-12\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-7 col-md-6 five-three\"> \r\n            <div class=\"row\">\r\n              <div class=\"col-sm-4\">\r\n              \r\n              <div class=\"panel widget bg-primary\" style=\"height:110px; \"> \r\n                    <div class=\"row row-table\">\r\n                        <div class=\"col-xs-4 text-center bg-primary-dark pv-lg\">\r\n                            <em class=\"icon-share fa-3x\"></em>\r\n                        </div>\r\n                        <div class=\"col-xs-8 pv-lg\">\r\n                            <div class=\"h2 mt0\">\r\n                                <span style=\"color: white;\">{{totalFeeders}}</span>\r\n                            </div> \r\n                           \r\n                            <div class=\"text-uppercase\">Total Feeders </div>\r\n                        </div>\r\n                    </div>\r\n                   \r\n                </div> \r\n              </div>\r\n              <div class=\"col-sm-4\">\r\n             \r\n              <div class=\"panel widget bg-green\" style=\"height:110px;\">\r\n                    <div class=\"row row-table\">\r\n                        <div class=\" col-xs-4 text-center bg-green-dark pv-lg\">\r\n                            <em class=\"fa fa-archive fa-3x\"></em>\r\n                        </div>\r\n                        <div class=\"col-xs-8 pv-lg\">\r\n                            <div class=\"h2 mt0\">\r\n                                <span style=\"color: white;\">{{delivered}}</span>\r\n                            </div>\r\n                            <div class=\"text-uppercase\">Delivered </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-4\">\r\n              \r\n              <div class=\"panel widget bg-purple\" style=\"height:110px;\">\r\n                    <div class=\"row row-table\">\r\n                        <div class=\"col-xs-4 text-center bg-purple-dark pv-lg\">\r\n                            <em class=\"fa fa-bars fa-3x\"></em>\r\n                        </div>\r\n                        <div class=\"col-xs-8 pv-lg\">\r\n                            <div class=\"h2 mt0\">\r\n                                <span style=\"color: white;\">{{backOffice}}</span>\r\n                            </div>\r\n                            <div class=\"text-uppercase\">Back office</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-5 five-two\">\r\n            <div class=\"row\">\r\n              <div class=\"col-sm-6\">\r\n                \r\n                <div class=\"panel widget bg-info\" style=\"height:110px;\">\r\n                        <div class=\"row row-table\">\r\n                            <div class=\"col-xs-4 text-center bg-info-dark pv-lg\">\r\n                                <em class=\"icon-briefcase fa-3x\"></em>\r\n                            </div>\r\n                            <div class=\"col-xs-8 pv-lg\">\r\n                                <div class=\"h2 mt0\">\r\n                                    <span style=\"color: white;\">{{fcInProgress}}</span>\r\n                                </div>\r\n                                <div class=\"text-uppercase\">In-Progress</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n              </div>\r\n              <div class=\"col-sm-6\">\r\n             \r\n              <div class=\"panel widget bg-warning\" style=\"height:110px;\">\r\n                    <div class=\"row row-table\">\r\n                        <div class=\"col-xs-4 text-center bg-warning-dark pv-lg\">\r\n                            <em class=\"icon-briefcase fa-3x\"></em>\r\n                        </div>\r\n                        <div class=\"col-xs-8 pv-lg\">\r\n                            <div class=\"h2 mt0\">\r\n                                <span style=\"color: white;\">{{fcToStart}}</span>\r\n                            </div>\r\n                            <div class=\"text-uppercase\">To Start </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>​\r\n     </div> -->\r\n\r\n\r\n\r\n<!-- START chart-->\r\n\r\n<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n        <!-- START widget-->\r\n\r\n\r\n        <div class=\"panel panel-default\" id=\"panelChart9\" style=\"margin-bottom:0;\">\r\n            <!-- <div class=\"panel-heading\" id=\"gridStatus-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    \r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('gridStatusCollapBtnClass')\" data-target=\"#reportPanelgridStatus\">\r\n                            <i [class]=\"gridStatusCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','gridStatus-header-panel','gridStatusyDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div> -->\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"inProgressModal\" class=\"modal fade\" role=\"dialog\">\r\n                    <div class=\"modal-dialog\">\r\n\r\n                        <!-- Modal content-->\r\n                        <div class=\"modal-content\">\r\n                            <div class=\"modal-header\">\r\n                                <!--  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\r\n                                <!-- <h4 class=\"modal-title\">Feeders Selected</h4> -->\r\n                                <div class=\"pull-right paddingRight\" *ngIf=\"itemsInProgress.length != 0\">\r\n                                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel('inProgress')\">\r\n                                        <span class=\"fa fa-download\"></span>\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"modal-body\">\r\n                                <ng2-smart-table [settings]=\"settings\" [source]=\"itemsInProgress\"></ng2-smart-table>\r\n                            </div>\r\n                            <div class=\"modal-footer\">\r\n                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div id=\"backOfficeModal\" class=\"modal fade\" role=\"dialog\">\r\n                    <div class=\"modal-dialog\">\r\n\r\n                        <!-- Modal content-->\r\n                        <div class=\"modal-content\">\r\n                            <div class=\"modal-header\">\r\n                                <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\r\n                                <!--  <h4 class=\"modal-title\">Feeders Selected</h4> -->\r\n                                <div class=\"pull-right paddingRight\" *ngIf=\"itemsBackOffice.length != 0\">\r\n                                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel('backOffice')\">\r\n                                        <span class=\"fa fa-download\"></span>\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"modal-body\">\r\n                                <ng2-smart-table [settings]=\"settings\" [source]=\"itemsBackOffice\"></ng2-smart-table>\r\n                            </div>\r\n                            <div class=\"modal-footer\">\r\n                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div id=\"deliveredModal\" class=\"modal fade\" role=\"dialog\">\r\n                    <div class=\"modal-dialog\">\r\n\r\n                        <!-- Modal content-->\r\n                        <div class=\"modal-content\">\r\n                            <div class=\"modal-header\">\r\n                                <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\r\n                                <!-- <h4 class=\"modal-title\">Feeders Selected</h4> -->\r\n                                <div class=\"pull-right paddingRight\" *ngIf=\"itemsDelivered.length != 0\">\r\n                                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel('delivered')\">\r\n                                        <span class=\"fa fa-download\"></span>\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"modal-body\">\r\n                                <ng2-smart-table [settings]=\"settings\" [source]=\"itemsDelivered\"></ng2-smart-table>\r\n                            </div>\r\n                            <div class=\"modal-footer\">\r\n                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div id=\"totalModal\" class=\"modal fade\" role=\"dialog\">\r\n                    <div class=\"modal-dialog\">\r\n\r\n                        <!-- Modal content-->\r\n                        <div class=\"modal-content\">\r\n\r\n                            <div class=\"modal-header\">\r\n                                <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\r\n                                <!-- <h4 class=\"modal-title\">Feeders Selected</h4> -->\r\n                                <div class=\"pull-right paddingRight\" *ngIf=\"itemsTotal.length != 0\">\r\n                                    <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel('total')\">\r\n                                        <span class=\"fa fa-download\"></span>\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"modal-body\">\r\n                                <ng2-smart-table [settings]=\"settings\" [source]=\"itemsTotal\"></ng2-smart-table>\r\n\r\n                            </div>\r\n\r\n                            <!-- <div class=\"panel panel-default\" id=\"panelChart9\" style=\"height:85vh\">\r\n                                                <div class=\"panel-heading\">\r\n                                                    <div class=\"panel-title\">\r\n                                                        <span>Features Selected</span>\r\n                                                    </div>\r\n                                                    <div class=\"pull-right paddingRight\" *ngIf=\"items.length != 0\">\r\n                                                        <button type=\"button\" data-toggle=\"tooltip\" title=\"Export to csv\" class=\"btn btn-info btn-xs\" (click)=\"excel()\">\r\n                                                            <span class=\"fa fa-download\"></span>\r\n                                                        </button>\r\n                                                    </div>\r\n                                                </div>\r\n                                                 <div class=\"panel-body\" >\r\n                                                    <ng2-smart-table [settings]=\"settings\" [source]=\"items\"></ng2-smart-table>\r\n                                                </div> \r\n                                            </div> -->\r\n\r\n                            <div class=\"modal-footer\">\r\n                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div>\r\n                    <!-- <div id=\"t-viz\"></div>\r\n                    <div id=\"t1-viz\"></div> -->\r\n\r\n                    <div class=\"container-fluid\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6 col-sm-6\" id=\"gridStatusyDiv\">\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\" id=\"gridStatus-header-panel\">\r\n                                        <div class=\"panel-title\">\r\n                                            <span>Feeder Status</span>\r\n                                            <div class=\"pull-right\">\r\n                                                <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('gridStatusCollapBtnClass')\" data-target=\"#reportPanelgridStatus\">\r\n                                                    <i [class]=\"gridStatusCollapBtnClass\"></i>\r\n                                                </a>\r\n                                            </div>\r\n                                            <!--  <div class=\"pull-right padding-right\">\r\n                                                <a (click)=\"toggleFullScreen('t-viz','gridStatus-header-panel','gridStatusyDiv')\">\r\n                                                    <em [class]=\"expandButtonClass\"></em>\r\n                                                </a>\r\n                                            </div> -->\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"panel-body\" id=\"reportPanelgridStatus\" class=\"collapse in\">\r\n                                        <div id=\"t-viz\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 col-sm-6\">\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\">\r\n                                        <div class=\"panel-title\">\r\n                                            <span>Feeder Grid Status</span>\r\n                                            <div class=\"pull-right\">\r\n                                                <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('feederGridStatusCollapBtnClass')\" data-target=\"#reportPanelFeedergridStatus\">\r\n                                                    <i [class]=\"feederGridStatusCollapBtnClass\"></i>\r\n                                                </a>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"panel-body\" id=\"reportPanelFeedergridStatus\" class=\"collapse in\">\r\n                                        <div id=\"t1-viz\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"panel panel-default\">\r\n                            <div class=\"panel-heading\">\r\n                                <div class=\"panel-title\">\r\n                                    <span>Feeder Grid Summary</span>\r\n                                    <div class=\"pull-right\">\r\n                                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('summaryCollapBtnClass')\" data-target=\"#reportPanelSummary\">\r\n                                            <i [class]=\"summaryCollapBtnClass\"></i>\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"panel-body\" id=\"reportPanelSummary\" class=\"collapse in\">\r\n                                <div id=\"t2-viz\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"panel panel-default\">\r\n                            <div class=\"panel-heading\">\r\n                                <div class=\"panel-title\">\r\n                                    <span>Gridwise Completion Status</span>\r\n                                    <div class=\"pull-right\">\r\n                                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('completionCollapBtnClass')\" data-target=\"#reportPanelCompletion\">\r\n                                            <i [class]=\"completionCollapBtnClass\"></i>\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"panel-body\" id=\"reportPanelCompletion\" class=\"collapse in\">\r\n                                <div id=\"t3-viz\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- END widget-->\r\n        </div>\r\n    </div>"

/***/ }),

/***/ "../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding-right {\n  padding-right: 20px; }\n\n/* .col-xs-15,\r\n.col-sm-15,\r\n.col-md-15,\r\n.col-lg-15 {\r\n    position: relative;\r\n    min-height: 1px;\r\n    padding-right: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.col-xs-15 {\r\n    width: 20%;\r\n    float: left;\r\n}\r\n@media (min-width: 768px) {\r\n.col-sm-15 {\r\n        width: 20%;\r\n        float: left;\r\n    }\r\n}\r\n@media (min-width: 992px) {\r\n    .col-md-15 {\r\n        width: 20%;\r\n        float: left;\r\n    }\r\n}\r\n@media (min-width: 1200px) {\r\n    .col-lg-15 {\r\n        width: 20%;\r\n        float: left;\r\n    }\r\n} */\n/* @media  (min-width: 768px) {\r\n    div.col-sm-7.five-three {\r\n    width: 60% !important;\r\n    }\r\n\r\n    div.col-sm-5.five-two {\r\n    width: 40% !important;\r\n    }\r\n} */\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__ = __webpack_require__("../../../../../src/app/core/services/export.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GridStatusComponent = (function () {
    function GridStatusComponent(exportToCsvService) {
        this.exportToCsvService = exportToCsvService;
        this.itemsTotal = [];
        this.itemsDelivered = [];
        this.itemsBackOffice = [];
        this.itemsInProgress = [];
        this.gridStatusCollapBtnClass = 'fa fa-minus';
        this.feederGridStatusCollapBtnClass = 'fa fa-minus';
        this.summaryCollapBtnClass = 'fa fa-minus';
        this.completionCollapBtnClass = 'fa fa-minus';
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.kpiDiv = false;
        this.fullScreenTitle = 'Full Screen';
        this.settings = {
            columns: {
                id: {
                    title: 'Feeders Selected'
                }
            },
            attr: {
                class: "smart-size"
            },
            pager: {
                display: true,
                perPage: 10
            },
            actions: {
                add: false,
                edit: false,
                delete: false
            }
        };
        this.totalFeedersArray = [];
        this.deliveredArray = [];
        this.backOfficeArray = [];
        this.fcInProgressArray = [];
    }
    GridStatusComponent.prototype.excel = function (typeOfHeader) {
        var title = 'Feeders';
        if (typeOfHeader == 'inProgress') {
            this.exportToCsvService.exportFunction(this.itemsInProgress, title);
        }
        if (typeOfHeader == 'backOffice') {
            this.exportToCsvService.exportFunction(this.itemsBackOffice, title);
        }
        if (typeOfHeader == 'delivered') {
            this.exportToCsvService.exportFunction(this.itemsDelivered, title);
        }
        if (typeOfHeader == 'total') {
            this.exportToCsvService.exportFunction(this.itemsTotal, title);
        }
    };
    GridStatusComponent.prototype.onExpandCollapseClick = function (classToChange) {
        classToChange === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
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
            elem[0].children[0].style.height = '35vh';
        }
    };
    GridStatusComponent.prototype.getKpiData = function () {
        var _this = this;
        var sheet = this.tFeedersViz.getWorkbook().getActiveSheet(), 
        // If the active sheet is not a dashboard, then you can just enter:
        // viz.getWorkbook().getActiveSheet();
        options = {
            maxRows: 0,
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };
        sheet.getUnderlyingDataAsync(options).then((function (t) {
            t.getData().forEach(function (item) {
                if (item[0].value.includes("total")) {
                    _this.totalFeedersArray.push({ "id": item[0].value.split('_')[0] });
                }
                if (item[0].value.includes("delivered")) {
                    _this.deliveredArray.push({ "id": item[0].value.split('_')[0] });
                }
                if (item[0].value.includes("backoffice")) {
                    _this.backOfficeArray.push({ "id": item[0].value.split('_')[0] });
                }
                if (item[0].value.includes("inprogress")) {
                    _this.fcInProgressArray.push({ "id": item[0].value.split('_')[0] });
                }
            });
            _this.itemsTotal = _this.totalFeedersArray;
            _this.itemsDelivered = _this.deliveredArray;
            _this.itemsBackOffice = _this.backOfficeArray;
            _this.itemsInProgress = _this.fcInProgressArray;
            _this.totalFeeders = _this.totalFeedersArray.length;
            _this.delivered = _this.deliveredArray.length;
            _this.backOffice = _this.backOfficeArray.length;
            _this.fcInProgress = _this.fcInProgressArray.length;
            var gridStatusDiv = document.getElementById('t1-viz');
            var gridStatusURL = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridStatus/FeederGridstatus?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
            var options = {
                hideTabs: true,
                width: '100%',
                height: '25vh',
                onFirstInteractive: (function () {
                    _this.viewSummary();
                })
            };
            var gridStatusURL = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridStatus/FeederGridstatus?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
            _this.tGridStatusViz = new tableau.Viz(gridStatusDiv, gridStatusURL, options);
        }));
    };
    GridStatusComponent.prototype.viewSummary = function () {
        var _this = this;
        var summaryDiv = document.getElementById('t2-viz');
        var summaryUrl = 'https://reporting.cyient.com/t/UGNAMPOC/views/summary/FeederGridSummary?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridHistory/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no&:toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '20vh',
            onFirstInteractive: (function () {
                _this.getGridWiseCompletion();
            })
        };
        this.tSummaryViz = new tableau.Viz(summaryDiv, summaryUrl, options);
    };
    GridStatusComponent.prototype.getGridWiseCompletion = function () {
        var completionDiv = document.getElementById('t3-viz');
        var completionUrl = 'https://reporting.cyient.com/t/UGNAMPOC/views/gridWiseCompletion/GridwiseCompletionStatus?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridHistory/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no&:toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '30vh',
            onFirstInteractive: (function () {
            })
        };
        this.tCompletionViz = new tableau.Viz(completionDiv, completionUrl, options);
    };
    GridStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        var placeholderDiv = document.getElementById('t-viz');
        var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/FeederStatus/FeederStatus?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no';
        //var url = 'https://reporting.cyient.com/t/UGNAMPOC/views/GridHistory/Dashboard1?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no&:toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '25vh',
            onFirstInteractive: (function () {
                _this.getKPIdata();
            })
        };
        this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
    };
    /* getKPIdataBckp(): void {
        var containerDiv = document.getElementById('Div1');
        var testGetDataURL = 'https://reporting.cyient.com/t/UGNAMPOC/views/KPI/kpi';
        this.tFeedersViz = new tableau.Viz(containerDiv, testGetDataURL, {
            hideTabs: true,
            width: 0,
            height: 0,
            onFirstInteractive: (() => {
                this.getKpiData();
            })
        });

    } */
    GridStatusComponent.prototype.getKPIdata = function () {
        var _this = this;
        var containerDiv = document.getElementById('Div1');
        var testGetDataURL = 'https://reporting.cyient.com/t/UGNAMPOC/views/KPINEW/kpiData';
        this.tFeedersViz = new tableau.Viz(containerDiv, testGetDataURL, {
            hideTabs: true,
            width: 0,
            height: 0,
            onFirstInteractive: (function () {
                _this.getKpiData();
            })
        });
    };
    GridStatusComponent.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
        this.tFeedersViz != undefined ? this.tFeedersViz.dispose() : "";
        this.tGridStatusViz != undefined ? this.tGridStatusViz.dispose() : "";
        this.tSummaryViz != undefined ? this.tSummaryViz.dispose() : "";
    };
    return GridStatusComponent;
}());
GridStatusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-gridStatus',
        template: __webpack_require__("../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/gridStatus/gridStatus/gridStatus.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__["a" /* ExportToCsvService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_export_service__["a" /* ExportToCsvService */]) === "function" && _a || Object])
], GridStatusComponent);

var _a;
//# sourceMappingURL=gridStatus.component.js.map

/***/ }),

/***/ "../../../../ng2-popover/Popover.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PopoverContent_1 = __webpack_require__("../../../../ng2-popover/PopoverContent.js");
var Popover = (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function Popover(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.PopoverComponent = PopoverContent_1.PopoverContent;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    Popover.prototype.showOrHideOnClick = function () {
        if (this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.toggle();
    };
    Popover.prototype.showOnHover = function () {
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.show();
    };
    Popover.prototype.hideOnHover = function () {
        if (this.popoverCloseOnMouseOutside)
            return; // don't do anything since not we control this
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.hide();
    };
    Popover.prototype.ngOnChanges = function (changes) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    Popover.prototype.toggle = function () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    Popover.prototype.show = function () {
        var _this = this;
        if (this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            var factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;
            this.popover = this.viewContainerRef.createComponent(factory);
            var popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
        }
        else {
            var popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            popover.show();
        }
        this.onShown.emit(this);
    };
    Popover.prototype.hide = function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.popover)
            this.popover.destroy();
        if (this.content instanceof PopoverContent_1.PopoverContent)
            this.content.hideFromPopover();
        this.onHidden.emit(this);
    };
    Popover.prototype.getElement = function () {
        return this.viewContainerRef.element.nativeElement;
    };
    Popover.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[popover]",
                    exportAs: "popover"
                },] },
    ];
    /** @nocollapse */
    Popover.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    Popover.propDecorators = {
        'content': [{ type: core_1.Input, args: ["popover",] },],
        'popoverDisabled': [{ type: core_1.Input },],
        'popoverAnimation': [{ type: core_1.Input },],
        'popoverPlacement': [{ type: core_1.Input },],
        'popoverTitle': [{ type: core_1.Input },],
        'popoverOnHover': [{ type: core_1.Input },],
        'popoverCloseOnClickOutside': [{ type: core_1.Input },],
        'popoverCloseOnMouseOutside': [{ type: core_1.Input },],
        'popoverDismissTimeout': [{ type: core_1.Input },],
        'onShown': [{ type: core_1.Output },],
        'onHidden': [{ type: core_1.Output },],
        'showOrHideOnClick': [{ type: core_1.HostListener, args: ["click",] },],
        'showOnHover': [{ type: core_1.HostListener, args: ["focusin",] }, { type: core_1.HostListener, args: ["mouseenter",] },],
        'hideOnHover': [{ type: core_1.HostListener, args: ["focusout",] }, { type: core_1.HostListener, args: ["mouseleave",] },],
    };
    return Popover;
}());
exports.Popover = Popover;
//# sourceMappingURL=Popover.js.map

/***/ }),

/***/ "../../../../ng2-popover/PopoverContent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PopoverContent = (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function PopoverContent(element, cdr, renderer) {
        var _this = this;
        this.element = element;
        this.cdr = cdr;
        this.renderer = renderer;
        this.placement = "bottom";
        this.animation = true;
        this.closeOnClickOutside = false;
        this.closeOnMouseOutside = false;
        this.onCloseFromOutside = new core_1.EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.isIn = false;
        this.displayType = "none";
        // -------------------------------------------------------------------------
        // Anonymous 
        // -------------------------------------------------------------------------
        /**
         * Closes dropdown if user clicks outside of this directive.
         */
        this.onDocumentMouseDown = function (event) {
            var element = _this.element.nativeElement;
            if (!element || !_this.popover)
                return;
            if (element.contains(event.target) || _this.popover.getElement().contains(event.target))
                return;
            _this.hide();
            _this.onCloseFromOutside.emit(undefined);
        };
    }
    PopoverContent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.closeOnClickOutside)
            this.listenClickFunc = this.renderer.listenGlobal("document", "mousedown", function (event) { return _this.onDocumentMouseDown(event); });
        if (this.closeOnMouseOutside)
            this.listenMouseFunc = this.renderer.listenGlobal("document", "mouseover", function (event) { return _this.onDocumentMouseDown(event); });
        this.show();
        this.cdr.detectChanges();
    };
    PopoverContent.prototype.ngOnDestroy = function () {
        if (this.closeOnClickOutside)
            this.listenClickFunc();
        if (this.closeOnMouseOutside)
            this.listenMouseFunc();
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    PopoverContent.prototype.show = function () {
        if (!this.popover || !this.popover.getElement())
            return;
        var p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = "block";
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
    };
    PopoverContent.prototype.hide = function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    };
    PopoverContent.prototype.hideFromPopover = function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    PopoverContent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        var positionStrParts = positionStr.split("-");
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || "center";
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        var shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        var shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        var targetElPos;
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    PopoverContent.prototype.position = function (nativeEl) {
        var offsetParentBCR = { top: 0, left: 0 };
        var elBCR = this.offset(nativeEl);
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    PopoverContent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    PopoverContent.prototype.getStyle = function (nativeEl, cssProp) {
        if (nativeEl.currentStyle)
            return nativeEl.currentStyle[cssProp];
        if (window.getComputedStyle)
            return window.getComputedStyle(nativeEl)[cssProp];
        // finally try and get inline style
        return nativeEl.style[cssProp];
    };
    PopoverContent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    };
    PopoverContent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    PopoverContent.prototype.getEffectivePlacement = function (placement, hostElement, targetElement) {
        var placementParts = placement.split(" ");
        if (placementParts[0] !== "auto") {
            return placement;
        }
        var hostElBoundingRect = hostElement.getBoundingClientRect();
        var desiredPlacement = placementParts[1] || "bottom";
        if (desiredPlacement === "top" && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return "bottom";
        }
        if (desiredPlacement === "bottom" && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return "top";
        }
        if (desiredPlacement === "left" && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return "right";
        }
        if (desiredPlacement === "right" && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return "left";
        }
        return desiredPlacement;
    };
    PopoverContent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "popover-content",
                    template: "\n<div #popoverDiv class=\"popover {{ effectivePlacement }}\"\n     [style.top]=\"top + 'px'\"\n     [style.left]=\"left + 'px'\"\n     [class.in]=\"isIn\"\n     [class.fade]=\"animation\"\n     style=\"display: block\"\n     role=\"popover\">\n    <div [hidden]=\"!closeOnMouseOutside\" class=\"virtual-area\"></div>\n    <div class=\"arrow\"></div> \n    <h3 class=\"popover-title\" [hidden]=\"!title\">{{ title }}</h3>\n    <div class=\"popover-content\">\n        <ng-content></ng-content>\n        {{ content }}\n    </div> \n</div>\n",
                    styles: ["\n.popover .virtual-area {\n    height: 11px;\n    width: 100%;\n    position: absolute;\n}\n.popover.top .virtual-area {\n    bottom: -11px; \n}\n.popover.bottom .virtual-area {\n    top: -11px; \n}\n.popover.left .virtual-area {\n    right: -11px; \n}\n.popover.right .virtual-area {\n    left: -11px; \n}\n"]
                },] },
    ];
    /** @nocollapse */
    PopoverContent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.Renderer, },
    ]; };
    PopoverContent.propDecorators = {
        'content': [{ type: core_1.Input },],
        'placement': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'animation': [{ type: core_1.Input },],
        'closeOnClickOutside': [{ type: core_1.Input },],
        'closeOnMouseOutside': [{ type: core_1.Input },],
        'popoverDiv': [{ type: core_1.ViewChild, args: ["popoverDiv",] },],
    };
    return PopoverContent;
}());
exports.PopoverContent = PopoverContent;
//# sourceMappingURL=PopoverContent.js.map

/***/ }),

/***/ "../../../../ng2-popover/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var Popover_1 = __webpack_require__("../../../../ng2-popover/Popover.js");
var PopoverContent_1 = __webpack_require__("../../../../ng2-popover/PopoverContent.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
__export(__webpack_require__("../../../../ng2-popover/Popover.js"));
__export(__webpack_require__("../../../../ng2-popover/PopoverContent.js"));
var PopoverModule = (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        PopoverContent_1.PopoverContent,
                        Popover_1.Popover,
                    ],
                    exports: [
                        PopoverContent_1.PopoverContent,
                        Popover_1.Popover,
                    ],
                    entryComponents: [
                        PopoverContent_1.PopoverContent
                    ]
                },] },
    ];
    /** @nocollapse */
    PopoverModule.ctorParameters = function () { return []; };
    return PopoverModule;
}());
exports.PopoverModule = PopoverModule;
//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=gridStatus.module.chunk.js.map