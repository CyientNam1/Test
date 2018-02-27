webpackJsonp(["jobs.module"],{

/***/ "../../../../../src/app/routes/jobs/job-details/job-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jobs-module\">\n  <div class=\"row page-header\">\n    <div class=\"col-12\">\n      <h4>Job Details</h4>\n    </div>\n  </div>\n\n  <div class=\"page-content\">\n    <!-- KPI tiles row start-->\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-md-4 margin-bottom-10\">\n        <div class=\"row row-table\">\n          <div class=\"col-xs-4 text-center bg-green-dark pv-lg\">\n            <em class=\"fa fa-bars fa-3x\"></em>\n          </div>\n          <div class=\"col-xs-8 pv-lg bg-green\">\n            <div class=\"h2 mt0\">\n              <span style=\"color: white;\">{{kpiData?.numOfValidatedFeatures}}</span>\n            </div>\n            <div class=\"text-uppercase\">Total feature Validated</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-xs-12 col-md-4 margin-bottom-10\">\n        <div class=\"row row-table\">\n          <div class=\"col-xs-4 text-center bg-primary-dark pv-lg\">\n            <em class=\"fa fa-bars fa-3x\"></em>\n          </div>\n          <div class=\"col-xs-8 pv-lg bg-primary\">\n            <div class=\"h2 mt0\">\n              <span style=\"color: white;\">{{kpiData?.numOfErrors}}</span>\n            </div>\n            <div class=\"text-uppercase\">Total Errors Found</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-xs-12 col-md-4 margin-bottom-10\">\n        <div class=\"row row-table\">\n          <div class=\"col-xs-4 text-center bg-warning-dark pv-lg\">\n            <em class=\"fa fa-bars fa-3x\"></em>\n          </div>\n          <div class=\"col-xs-8 pv-lg bg-warning\">\n            <div class=\"h2 mt0\">\n              <span style=\"color: white;\">{{kpiData?.numOfRules}}</span>\n            </div>\n            <div class=\"text-uppercase\"># Rules</div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- KPI tiles row end-->\n\n    <!-- Map panel start -->\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"panel map-panel\">\n          <div class=\"panel-heading\">\n            <span class=\"panel-title\">Map</span>\n          </div>\n\n          <div class=\"panel-body\">\n            <app-esri-map #myMap mapId=\"custom-map\"></app-esri-map>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <!-- Map panel start -->\n\n    <!-- Error table start -->\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"panel error-details-panel\">\n          <div class=\"panel-heading\">\n            <span class=\"panel-title\">Error Details</span>\n          </div>\n\n          <div class=\"panel-body job-list-table\">\n            <table *ngIf=\"errorData.length > 0\">\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>Job Id</th>\n                  <th>Feature Class</th>\n                  <th>Feature ID</th>\n                  <th>Current Value</th>\n                  <th>Check Value</th>\n                  <th>Description</th>\n                </tr>\n\n              </thead>\n\n              <tbody>\n                <tr *ngFor=\"let item of errorData\">\n                  <td>\n                    <button class=\"btn btn-xs\" title=\"Locate\" (click)=\"locateFeature(item)\"><i class=\"fa fa-map-marker\"></i></button>\n                  </td>\n                  <td>\n                    {{item.properties?.JobID}}\n                  </td>\n                  <td>\n                    {{item.properties?.FeatureClass}}\n                  </td>\n                  <td>\n                    {{item.properties?.FeatureID}}\n                  </td>\n                  <td>\n                    {{item.properties?.CurrentValue}}\n                  </td>\n                  <td>\n                    {{item.properties?.CheckValue}}\n                  </td>\n                  <td>\n                    {{item.properties?.Description}}\n                  </td>\n                </tr>\n\n              </tbody>\n            </table>\n            <div *ngIf=\"errorData.length === 0\">\n              <strong>No errors found</strong>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- Error table end -->\n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/jobs/job-details/job-details.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".margin-bottom-10 {\n  margin-bottom: 10px; }\n\n.job-list-table table {\n  width: 100%;\n  border: 1px solid lightgray; }\n\n.job-list-table table > thead {\n  border-bottom: 1px solid lightgray; }\n\n.job-list-table table > thead th,\n.job-list-table table > tbody td {\n  padding: 10px 10px;\n  border-bottom: 1px solid lightgray; }\n\n.job-list-table {\n  max-height: 220px;\n  overflow-y: auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/jobs/job-details/job-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_job_service__ = __webpack_require__("../../../../../src/app/routes/jobs/service/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__esriMap_esriMap_esri_map_component__ = __webpack_require__("../../../../../src/app/routes/esriMap/esriMap/esri-map.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JobDetailsComponent = (function () {
    function JobDetailsComponent(_router, _jobService) {
        this._router = _router;
        this._jobService = _jobService;
        this.kpiData = {
            numOfValidatedFeatures: 0,
            numOfErrors: 0,
            numOfRules: 0
        };
        this.errorData = [];
    }
    JobDetailsComponent.prototype.ngOnInit = function () {
        this.selectedJobId = +this._router.snapshot.paramMap.get('jobId');
        this.getJobDetails();
        this.getKPIData();
    };
    JobDetailsComponent.prototype.getJobDetails = function () {
        var _this = this;
        this._jobService.getJobDetails(this.selectedJobId).subscribe(function (res) {
            _this.kpiData.numOfRules = res.fiopsJob.subJobs.length;
        });
    };
    JobDetailsComponent.prototype.getKPIData = function () {
        var _this = this;
        this._jobService.getJobKPIData(this.selectedJobId).subscribe(function (res) {
            _this.kpiData.numOfErrors = res.errors_written || 0;
            _this.kpiData.numOfValidatedFeatures = res.features_read || 0;
            if (_this.kpiData.numOfErrors > 0) {
                _this.getErrorData();
            }
        });
    };
    JobDetailsComponent.prototype.onMapLoad = function (mapView) {
        this.mapView = mapView;
    };
    JobDetailsComponent.prototype.getErrorData = function () {
        var _this = this;
        this._jobService.getReportDetails(this.selectedJobId).subscribe(function (res) {
            _this.errorData = res.features;
        });
    };
    JobDetailsComponent.prototype.locateFeature = function (feature) {
        var lat, long;
        if (Array.isArray(feature.geometry.coordinates[0])) {
            long = feature.geometry.coordinates[0][0];
            lat = feature.geometry.coordinates[0][1];
        }
        else {
            long = feature.geometry.coordinates[0];
            lat = feature.geometry.coordinates[1];
        }
        var graphic = {
            geometry: {
                type: "point",
                longitude: long,
                latitude: lat
            },
            symbol: {
                type: "picture-marker",
                url: "assets/img/pin.jpeg",
                height: "30px",
                width: "30px"
            }
        };
        this.map.addGraphic(graphic);
    };
    return JobDetailsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myMap'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__esriMap_esriMap_esri_map_component__["a" /* EsriMapComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__esriMap_esriMap_esri_map_component__["a" /* EsriMapComponent */]) === "function" && _a || Object)
], JobDetailsComponent.prototype, "map", void 0);
JobDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-job-details',
        template: __webpack_require__("../../../../../src/app/routes/jobs/job-details/job-details.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/jobs/job-details/job-details.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_job_service__["a" /* JobService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_job_service__["a" /* JobService */]) === "function" && _c || Object])
], JobDetailsComponent);

var _a, _b, _c;
//# sourceMappingURL=job-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/jobs/job-execution/job-execution.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jobs-module\">\n<div class=\"row page-header\">\n  <div class=\"col-xs-12 padding-x-0\">\n    <h4>Data Analytics Execution</h4>\n  </div>\n</div>\n\n  <div class=\"page-content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <form class=\"col-xs-12 col-md-4 form-inline padding-x-0\">\n          <div class=\"form-group col-xs-12\">\n            <label class=\"form-label col-2\" for=\"ruleCategory\">Category: </label>\n            <select class=\"form-control col-8\" id=\"ruleCategory\" name=\"category\" (change)=\"onCategoryChange($event)\" [(ngModel)]=\"selectedCategory\"\n              style=\"width:50%\">\n              <option *ngFor=\"let item of categories\" [value]=\"item.id\">{{item.description}}</option>\n            </select>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"panel\">\n          <div class=\"panel-heading\">\n\n            <span class=\"panel-title\">Rule Configuration</span>\n            <button class=\"btn btn-xs btn-primary\" style=\"float: right;\" [disabled]=\"!isJobsSelected\" (click)=\"showChildModal()\" title=\"Run Jobs\">\n              <i class=\"fa fa-play\"></i>\n            </button>\n          </div>\n\n          <div class=\"panel-body\">\n            <!-- <ng2-smart-table [settings]=\"settings\" [source]=\"ruleBaseData\"></ng2-smart-table> -->\n            <table class=\"rule-set-table\">\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>\n                    <div ng2-auto-complete [source]=\"ruleTypes\" (valueChanged)=\"onRuleTypeChange($event)\" placeholder=\"enter text\">\n                      <input class=\"form-control\" placeholder=\"Search rule type\" [ngModel]=\"selectedRuleType\" (ngModelChange)=\"onRuleTypeModelChange($event)\"\n                      />\n                    </div>\n                  </th>\n                  <th>\n                    <div ng2-auto-complete [source]=\"ruleNames\" (valueChanged)=\"onRuleNameChange($event)\" placeholder=\"enter text\">\n                      <input class=\"form-control\" placeholder=\"Search rule name\" [ngModel]=\"selectedRuleName\" (ngModelChange)=\"onRuleNameModelChange($event)\"\n                      />\n                    </div>\n\n                  </th>\n                </tr>\n                <tr>\n                  <th class=\"text-center\">\n                    <input type=\"checkbox\" class=\"header-checkbox\" [(ngModel)]=\"isAllRowsSelected\" (change)=\"onRowSelect($event)\">\n                  </th>\n                  <th>Rule Type</th>\n                  <th>Rule Name</th>\n                </tr>\n\n              </thead>\n\n              <tbody>\n                <tr *ngFor=\"let item of ruleBaseData\">\n                  <td class=\"text-center\">\n                    <input type=\"checkbox\" class=\"cell-checkbox\" [(ngModel)]=\"item.selected\" (change)=\"onRowSelect($event, item)\">\n                  </td>\n                  <td>\n                    {{item.businessRuleType}}\n                  </td>\n                  <td>\n                    {{item.businessRuleName}}\n                  </td>\n                </tr>\n\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div bsModal #childModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-md\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title pull-left\">Execute Job</h4>\n          <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hideChildModal()\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-xs-12 padding-x-0\">\n              <form class=\"form-inline\" #jobForm=\"ngForm\">\n                <div class=\"form-group col-xs-12\">\n                  <label class=\"col-xs-4 form-control-label\" for=\"street\">Description: </label>\n                  <!-- <div class=\"col-8\"> -->\n                  <input class=\"col-xs-8 form-control\" type=\"text\" id=\"street\" #spy [(ngModel)]=\"jobsModal.description\" name=\"street\" #desc=\"ngModel\"\n                    required>\n                  <!-- <div *ngIf=\"!(desc.valid || desc.pristine)\" class=\"col-12 text-danger\">\n                        <small>Description is required</small>\n                      </div>\n                    </div> -->\n                </div>\n                <div class=\"form-group col-xs-6\">\n                  <label class=\"col-xs-4 form-control-label\" for=\"feeder\">Feeder: </label>\n                  <select class=\"form-control col-xs-8 \" id=\"feeder\" name=\"feeder\" [disabled]=\"disableFeederDropdown\" (change)=\"onSelectionChange('Feeder')\"\n                    [(ngModel)]=\"jobsModal.feeder\" #feeder=\"ngModel\">\n                    <option [value]=\"'Select Feeder'\" selected>--Select Feeder--</option>\n                    <option *ngFor=\"let feeder of feeders\" [value]=\"feeder\">{{feeder}}</option>\n                  </select>\n                  <!-- <div *ngIf=\"!(feeder.valid)\" class=\"col-12 text-danger\">\n                          <small>feeder is required</small>\n                        </div> -->\n                </div>\n                <div class=\"form-group col-xs-6\">\n                  <label class=\"col-xs-4 form-control-label\" for=\"grid\">Grid:</label>\n                  <select class=\"form-control col-xs-8\" id=\"grid\" name=\"grid\" [disabled]=\"disableGridDropdown\" (change)=\"onSelectionChange('Grid')\"\n                    [(ngModel)]=\"jobsModal.grid\" #grid=\"ngModel\">\n                    <option [value]=\"'Select Grid'\" selected>--Select Grid--</option>\n                    <option *ngFor=\"let grid of grids\" [value]=\"grid\">{{grid}}</option>\n                  </select>\n                  <!-- <div *ngIf=\"!(grid.valid)\" class=\"col-12 text-danger\">\n                        <small>grid is required</small>\n                      </div> -->\n                </div>\n                <div class=\"col-xs-12 form-bottom text-right\">\n                  <button class=\"btn btn-primary\" [disabled]=\"jobForm.form.invalid\" (click)=\"executeJob()\">Execute Job</button>\n                </div>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/jobs/job-execution/job-execution.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".rule-set-panel {\n  margin-top: 30px; }\n\ntable {\n  width: 100%;\n  border: 1px solid lightgray; }\n\ntable > thead {\n  border-bottom: 1px solid lightgray; }\n\ntable > thead th,\ntable > tbody td {\n  padding: 10px 10px;\n  border-bottom: 1px solid lightgray;\n  border-right: 1px solid lightgray; }\n\n.panel-body {\n  overflow-y: auto;\n  max-height: 460px; }\n\n.form-group {\n  margin-bottom: 10px; }\n\n.jobs-form {\n  padding: 10px; }\n\n.form-bottom {\n  border-top: 1px solid lightgray;\n  padding-top: 10px; }\n\n.form-control-label {\n  margin-right: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/jobs/job-execution/job-execution.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobExecutionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_job_service__ = __webpack_require__("../../../../../src/app/routes/jobs/service/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_jobs_model__ = __webpack_require__("../../../../../src/app/routes/jobs/models/jobs-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var JobExecutionComponent = (function () {
    function JobExecutionComponent(_jobService, _sanitizer, toastr) {
        var _this = this;
        this._jobService = _jobService;
        this._sanitizer = _sanitizer;
        this.toastr = toastr;
        this.categories = [];
        this.ruleSetData = [];
        this.ruleBaseData = [];
        this.ruleTypes = [];
        this.ruleNames = [];
        this.feeders = [];
        this.grids = [];
        this.disableGridDropdown = false;
        this.disableFeederDropdown = false;
        this.isJobsSelected = false;
        this.input = '<input type="checkbox">';
        this.isAllRowsSelected = false;
        this.settings = {
            columns: {
                checkbox: {
                    title: 'Check Box',
                    type: 'html',
                    valuePrepareFunction: function (value) { return _this._sanitizer.bypassSecurityTrustHtml(_this.input); },
                    filter: false
                },
                businessRuleType: {
                    title: 'Rule Type'
                },
                businessRuleName: {
                    title: 'Rule Name'
                }
            },
            attr: {
                class: "smart-size"
            },
            pager: {
                display: true,
                perPage: 5
            },
            actions: {
                add: false,
                edit: false,
                delete: false
            }
        };
        this.jobsModal = new __WEBPACK_IMPORTED_MODULE_5__models_jobs_model__["a" /* Job */]('', 'Select Feeder', 'Select Grid');
    }
    JobExecutionComponent.prototype.ngOnInit = function () {
        this.getCategories();
        this.getFeedersAndGrids();
    };
    JobExecutionComponent.prototype.getCategories = function () {
        var _this = this;
        this._jobService.getCategories().subscribe(function (res) {
            _this.categories = res.rulesets;
            _this.selectedCategory = _this.categories[0].id;
            _this.getRules();
        });
    };
    JobExecutionComponent.prototype.onCategoryChange = function (e) {
        this.selectedRuleType = '';
        this.selectedRuleName = '';
        this.getRules();
    };
    JobExecutionComponent.prototype.onRuleTypeChange = function (e) {
        var _this = this;
        console.log(e);
        this.selectedRuleType = e;
        var rules = [];
        this.ruleSetData.forEach(function (x) {
            if (x.businessRuleType === _this.selectedRuleType && x.businessRuleName) {
                rules.push(x.businessRuleName);
            }
        });
        this.ruleNames = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniq"](rules);
        this.filterRuleBaseData();
    };
    JobExecutionComponent.prototype.onRowSelect = function (e, item) {
        if (item) {
            if (e.target.checked) {
                this.isAllRowsSelected = this.ruleBaseData.filter(function (x) { return x.selected; }).length === this.ruleBaseData.length;
            }
            else {
                this.isAllRowsSelected = false;
            }
        }
        else {
            this.ruleBaseData.forEach(function (item) { return item.selected = e.target.checked; });
        }
        this.isJobsSelected = this.ruleBaseData.filter(function (x) { return x.selected; }).length > 0;
    };
    JobExecutionComponent.prototype.onRuleTypeModelChange = function (e) {
        // console.log(e);
        if (!e) {
            this.selectedRuleType = '';
            console.log(this.selectedRuleType);
            this.filterRuleBaseData();
        }
    };
    JobExecutionComponent.prototype.onRuleNameChange = function (e) {
        this.selectedRuleName = e;
        this.filterRuleBaseData();
    };
    JobExecutionComponent.prototype.onRuleNameModelChange = function (e) {
        if (!e) {
            this.selectedRuleName = '';
            this.filterRuleBaseData();
        }
    };
    JobExecutionComponent.prototype.getRules = function () {
        var _this = this;
        this._jobService.getRuleSetByCategory(this.selectedCategory).subscribe(function (res) {
            console.log(res);
            _this.ruleSetData = res.ruleBase;
            _this.ruleBaseData = res.ruleBase;
            _this.isJobsSelected = false;
            _this.isAllRowsSelected = false;
            _this.fillRules();
        });
    };
    JobExecutionComponent.prototype.fillRules = function () {
        this.ruleTypes = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.ruleSetData, function (x) { return x.businessRuleType; }));
        this.ruleNames = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.ruleSetData, function (x) { return x.businessRuleName; }));
    };
    JobExecutionComponent.prototype.filterRuleBaseData = function () {
        var _this = this;
        var filteredData = [];
        if (this.selectedRuleType || this.selectedRuleName) {
            if (this.selectedRuleType) {
                filteredData = this.ruleSetData.filter(function (x) { return x.businessRuleType === _this.selectedRuleType; });
            }
            if (this.selectedRuleName) {
                if (filteredData.length > 0) {
                    filteredData = filteredData.filter(function (x) { return x.businessRuleName === _this.selectedRuleName; });
                }
                else {
                    filteredData = this.ruleSetData.filter(function (x) { return x.businessRuleName === _this.selectedRuleName; });
                }
            }
            this.ruleBaseData = filteredData;
        }
        else {
            this.ruleBaseData = this.ruleSetData;
        }
    };
    JobExecutionComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    JobExecutionComponent.prototype.hideChildModal = function () {
        this.jobsModal = new __WEBPACK_IMPORTED_MODULE_5__models_jobs_model__["a" /* Job */]('', 'Select Feeder', 'Select Grid');
        this.childModal.hide();
    };
    JobExecutionComponent.prototype.getFeedersAndGrids = function () {
        var _this = this;
        this._jobService.getFeedersAndGrids().subscribe(function (res) {
            _this.feeders = res.results.feeders;
            _this.grids = res.results.grids;
        });
    };
    JobExecutionComponent.prototype.onSelectionChange = function (type) {
        if (type === 'Feeder') {
            if (this.jobsModal.feeder === 'Select Feeder') {
                this.disableGridDropdown = false;
            }
            else {
                this.disableGridDropdown = true;
                this.jobsModal.grid === 'Select Grid';
            }
        }
        else {
            if (this.jobsModal.grid === 'Select Grid') {
                this.disableFeederDropdown = false;
            }
            else {
                this.disableFeederDropdown = true;
                this.jobsModal.feeder === 'Select Feeder';
            }
        }
    };
    JobExecutionComponent.prototype.executeJob = function () {
        var _this = this;
        var selectedRules = this.ruleBaseData.filter(function (x) { return x.selected; });
        var jobCount = 0;
        var femJobIds = [];
        selectedRules.forEach(function (item) {
            var publishParams = JSON.parse(item.publishedParameters);
            publishParams = publishParams.filter(function (x) { return x.name.toUpperCase() === 'FEEDER_JOBUNIT' || x.name.toUpperCase() === 'VALUE'; });
            if (_this.jobsModal.feeder !== 'Select Feeder') {
                publishParams[0].value = "@Value(FEEDER_NAME)";
                publishParams[1].value = _this.jobsModal.feeder;
            }
            else {
                publishParams[0].value = "@Value(JOBUNIT)";
                publishParams[1].value = _this.jobsModal.grid;
            }
            // console.log(JSON.stringify(publishParams));
            _this._jobService.submitFmeJob(item.url, publishParams).subscribe(function (res) {
                if (res) {
                    if (res.id) {
                        femJobIds.push({ 'jobid': Number(res.id) });
                        jobCount++;
                    }
                    if (jobCount === selectedRules.length) {
                        _this.postFiopsJob(femJobIds);
                    }
                }
            });
        });
    };
    JobExecutionComponent.prototype.postFiopsJob = function (jobIds) {
        var _this = this;
        var postData = { 'jobs': jobIds };
        var customDesc = this.jobsModal.description + '@' + (this.jobsModal.feeder !== 'Select Feeder' ? 'Feeder:' + this.jobsModal.feeder : 'Grid:' + this.jobsModal.grid);
        this._jobService.postFiopsJob(customDesc, postData).subscribe(function (res) {
            if (res.status.toUpperCase() === 'SUCCESS') {
                console.log("Job created successfully: " + res.fiopsJobID);
                _this.hideChildModal();
                _this.toastr.success("Job created successfully: " + res.fiopsJobID);
            }
        });
    };
    return JobExecutionComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('childModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _a || Object)
], JobExecutionComponent.prototype, "childModal", void 0);
JobExecutionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-job-execution',
        template: __webpack_require__("../../../../../src/app/routes/jobs/job-execution/job-execution.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/jobs/job-execution/job-execution.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_job_service__["a" /* JobService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_job_service__["a" /* JobService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__["b" /* ToastrService */]) === "function" && _d || Object])
], JobExecutionComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=job-execution.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jobs-module\">\n  <div class=\"row page-header\">\n    <div class=\"col-12 padding-x-0\">\n      <h4>Data Analytics Jobs</h4>\n    </div>\n  </div>\n\n  <div class=\"page-content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"panel\">\n          <div class=\"panel-heading\">\n            <span class=\"panel-title\">Job List</span>\n          </div>\n\n          <div class=\"panel-body\">\n            <table class=\"job-list-table\">\n              <thead>\n                <tr>\n                  <th>Job Id</th>\n                  <th>Feeder</th>\n                  <th>Grid</th>\n                  <th>Job Description</th>\n                  <th>Start Time</th>\n                  <th>Status</th>\n                </tr>\n\n              </thead>\n\n              <tbody>\n                <tr *ngFor=\"let item of jobs\">\n                  <td>\n                    <a routerLink=\"/job-management/job-details/{{item.jobId}}\">{{item.jobId}}</a>{{item.businessRuleType}}\n                  </td>\n                  <td>{{item.feeder}}</td>\n                  <td>{{item.grid}}</td>\n                  <td>\n                    {{item.description}}\n                  </td>\n                  <td>\n                    {{item.startTime | date: 'short'}}\n                  </td>\n                  <td>\n                    <span [class]=\"item.class\">{{item.status}}</span>\n                  </td>\n                </tr>\n              </tbody>\n              <!-- <tfoot>\n                <tr>\n                  <td colspan=\"6\">\n                    <div class=\"table-pager\">\n                      <div class=\"pager-controls\">\n                        <button class=\"pager-first-page-button\" class=\"btn btn-xs\" (click)=\"applyPagination('FIRST_PAGE')\">\n                          <i class=\"fa fa-angle-double-left\"></i>\n                        </button>\n                        <button class=\"pager-previous-page-button\" class=\"btn btn-xs\" (click)=\"applyPagination('PREV_PAGE')\">\n                          <i class=\"fa fa-angle-left\"></i>\n                        </button>\n                        <span>{{pagination.currentPage}}/{{pagination.totalPages}}</span>\n                        <button class=\"pager-next-page-button\" class=\"btn btn-xs\" (click)=\"applyPagination('NEXT_PAGE')\">\n                          <i class=\"fa fa-angle-right\"></i>\n                        </button>\n                        <button class=\"pager-last-page-button\" class=\"btn btn-xs\" (click)=\"applyPagination('LAST_PAGE')\">\n                          <i class=\"fa fa-angle-double-right\"></i>\n                        </button>\n                      </div>\n                      <div class=\"pager-items\">\n                        <span>{{pagination.itemsText}}</span>\n                      </div>\n                    </div>\n                  </td>\n                </tr>\n              </tfoot> -->\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".rule-set-panel {\n  margin-top: 30px; }\n\ntable {\n  width: 100%;\n  border: 1px solid lightgray; }\n\ntable > thead {\n  border-bottom: 1px solid lightgray; }\n\ntable > thead th,\ntable > tbody td {\n  padding: 10px 10px;\n  border-bottom: 1px solid lightgray; }\n\n.table-pager {\n  padding: 10px; }\n\n.table-pager > div {\n  display: inline-block; }\n\n.pager-items {\n  float: right; }\n\n.panel-body {\n  overflow-y: auto;\n  max-height: 460px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_job_service__ = __webpack_require__("../../../../../src/app/routes/jobs/service/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobsListComponent = (function () {
    function JobsListComponent(_jobService) {
        this._jobService = _jobService;
        this.allJobs = [];
        this.jobs = [];
        this.pagination = {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalRecords: 25,
            itemsText: ''
        };
    }
    JobsListComponent.prototype.ngOnInit = function () {
        this.getJobs();
    };
    JobsListComponent.prototype.getJobs = function () {
        var _this = this;
        this._jobService.getJobs().subscribe(function (res) {
            var jobsTemp = [];
            console.log(res);
            // this.allJobs = res.fiopsJobs;
            res.fiopsJobs.forEach(function (item) {
                var status, statusClass, description, feeder, grid;
                var customDesc = item.description.split('@');
                description = customDesc[0];
                if (customDesc.length > 1) {
                    var feederGrid = customDesc[1].split(':');
                    if (feederGrid[0] === 'Feeder') {
                        feeder = feederGrid[1];
                        grid = '';
                    }
                    else {
                        grid = feederGrid[1];
                        feeder = '';
                    }
                }
                if (item.subJobs.filter(function (x) { return x.subjob_status === 'PULLED'; }).length > 0) {
                    status = 'IN-PROGRESS';
                    statusClass = 'label label-info';
                }
                else if (item.subJobs.filter(function (x) { return x.subjob_status === 'QUEUED'; }).length > 0) {
                    status = 'QUEUED';
                    statusClass = 'label label-info';
                }
                else if (item.subJobs.filter(function (x) { return x.subjob_status === 'SUCCESS'; }).length === item.subJobs.length) {
                    status = 'SUCCESS';
                    statusClass = 'label label-success';
                }
                else {
                    status = item.subJobs.filter(function (x) { return x.subjob_status !== 'SUCCESS' && x.subjob_status !== 'QUEUED' && x.subjob_status !== 'PULLED'; })[0].subjob_status;
                    statusClass = 'label label-danger';
                }
                jobsTemp.push({
                    jobId: item.fiopsJobID,
                    description: description,
                    startTime: new Date(item.submissionTime),
                    userName: item.username,
                    status: status,
                    class: statusClass,
                    feeder: feeder,
                    grid: grid
                });
            });
            _this.allJobs = __WEBPACK_IMPORTED_MODULE_2_lodash__["sortBy"](jobsTemp, 'jobId').reverse();
            _this.jobs = _this.allJobs;
            //this.applyPagination();
        });
    };
    JobsListComponent.prototype.applyPagination = function (buttonType) {
        if (!buttonType) {
            this.pagination.currentPage = 1;
        }
        else {
            switch (buttonType) {
                case 'NEXT_PAGE':
                    this.pagination.currentPage += 1;
                    break;
                case 'PREV_PAGE':
                    this.pagination.currentPage -= 1;
                    break;
                case 'FIRST_PAGE':
                    this.pagination.currentPage = 1;
                    break;
                case 'LAST_PAGE':
                    this.pagination.currentPage = this.pagination.totalPages;
                    break;
            }
        }
        this.jobs = this.allJobs.slice((this.pagination.currentPage - 1) * 10, this.pagination.currentPage * 10);
        this.pagination.totalPages = Math.ceil(this.allJobs.length / 10);
        this.pagination.totalRecords = this.allJobs.length;
        this.pagination.itemsText = 'Displaying ' + (((this.pagination.currentPage - 1) * 10) + 1) + ' - ' + ((this.pagination.currentPage * 10) > this.allJobs.length ? this.allJobs.length : (this.pagination.currentPage * 10)) + ' of ' + this.allJobs.length;
    };
    return JobsListComponent;
}());
JobsListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-jobs-list',
        template: __webpack_require__("../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_job_service__["a" /* JobService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_job_service__["a" /* JobService */]) === "function" && _a || Object])
], JobsListComponent);

var _a;
//# sourceMappingURL=jobs-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/jobs/jobs.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobsModule", function() { return JobsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__job_execution_job_execution_component__ = __webpack_require__("../../../../../src/app/routes/jobs/job-execution/job-execution.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__job_details_job_details_component__ = __webpack_require__("../../../../../src/app/routes/jobs/job-details/job-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jobs_list_jobs_list_component__ = __webpack_require__("../../../../../src/app/routes/jobs/jobs-list/jobs-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_job_service__ = __webpack_require__("../../../../../src/app/routes/jobs/service/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_auto_complete__ = __webpack_require__("../../../../ng2-auto-complete/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_smart_table__ = __webpack_require__("../../../../ng2-smart-table/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__esriMap_esri_map_module__ = __webpack_require__("../../../../../src/app/routes/esriMap/esri-map.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var JobsModule = (function () {
    function JobsModule() {
    }
    return JobsModule;
}());
JobsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_10_ng2_smart_table__["a" /* Ng2SmartTableModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_auto_complete__["Ng2AutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_13__esriMap_esri_map_module__["EsriMapModule"],
            __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["b" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_12_ngx_toastr__["a" /* ToastrModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* RouterModule */].forChild([
                { path: 'job-execution', component: __WEBPACK_IMPORTED_MODULE_2__job_execution_job_execution_component__["a" /* JobExecutionComponent */] },
                { path: 'job-details/:jobId', component: __WEBPACK_IMPORTED_MODULE_3__job_details_job_details_component__["a" /* JobDetailsComponent */] },
                { path: 'job-list', component: __WEBPACK_IMPORTED_MODULE_4__jobs_list_jobs_list_component__["a" /* JobsListComponent */] }
            ]),
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__service_job_service__["a" /* JobService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__job_execution_job_execution_component__["a" /* JobExecutionComponent */], __WEBPACK_IMPORTED_MODULE_3__job_details_job_details_component__["a" /* JobDetailsComponent */], __WEBPACK_IMPORTED_MODULE_4__jobs_list_jobs_list_component__["a" /* JobsListComponent */]]
    })
], JobsModule);

//# sourceMappingURL=jobs.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/jobs/models/jobs-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Job; });
var Job = (function () {
    function Job(description, feeder, grid) {
        this.description = description;
        this.feeder = feeder;
        this.grid = grid;
    }
    return Job;
}());

//# sourceMappingURL=jobs-model.js.map

/***/ }),

/***/ "../../../../../src/app/routes/jobs/service/job.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobService; });
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
var JobService = (function () {
    function JobService(_http) {
        this._http = _http;
        this.apiUrl = 'https://dte-api.cyient-fiops.com/api/fiops/';
        this.accessToken = localStorage.getItem('access-token') || '';
        this.FME_TOKEN = '9df1738776a52a97d3888a7c39ccd1abd5f46921';
    }
    JobService.prototype.submitFmeJob = function (fmeUrl, publishParameter) {
        var url = fmeUrl;
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var tokentoSend = 'fmetoken token=' + this.FME_TOKEN;
        header = header.append('Authorization', tokentoSend);
        header = header.append('Content-Type', 'application/json');
        header = header.append('Accept', 'application/json');
        var body = {
            "publishedParameters": publishParameter,
            "subsection": "REST_SERVICE"
        };
        console.log(body);
        return this._http.post(url, JSON.stringify(body), { headers: header });
    };
    JobService.prototype.postFiopsJob = function (description, fme_job_ids) {
        var url = this.apiUrl + 'jobs';
        var body = {
            "description": description,
            "fme_job_ids": JSON.stringify(fme_job_ids),
            "username": "RaviTeja.Viswanadha"
        };
        return this._http.post(url, body, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    JobService.prototype.getCategories = function () {
        var url = this.apiUrl + 'rulesengine/ruleset';
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    JobService.prototype.getRuleSetByCategory = function (category) {
        var url = this.apiUrl + 'rulesengine/ruleset/' + category;
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    JobService.prototype.getFeedersAndGrids = function () {
        return this._http.get('./assets/data/data.json');
    };
    JobService.prototype.getJobs = function () {
        var url = this.apiUrl + 'jobs';
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    JobService.prototype.getJobDetails = function (id) {
        var url = this.apiUrl + 'jobs/' + id;
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    JobService.prototype.getJobKPIData = function (id) {
        var _this = this;
        var url = this.apiUrl + 'reports';
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) }).map(function (res) { return _this.filterReportByJob(id, res); });
    };
    JobService.prototype.filterReportByJob = function (jobId, res) {
        var filteredDataByJob = res.filter(function (x) { return +x.fiops_job_id === jobId; });
        var result = {
            errors_written: 0,
            features_read: 0
        };
        filteredDataByJob.forEach(function (element) {
            result.features_read += +element.features_read;
            result.errors_written += +element.errors_written || 0;
        });
        return result;
    };
    JobService.prototype.getReportDetails = function (jobId) {
        var url = this.apiUrl + 'reports/details/' + jobId;
        return this._http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'cyient-access-token': this.accessToken }) });
    };
    return JobService;
}());
JobService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], JobService);

var _a;
//# sourceMappingURL=job.service.js.map

/***/ }),

/***/ "../../../../ng2-auto-complete/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ng2_auto_complete_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.js");
exports.Ng2AutoComplete = ng2_auto_complete_1.Ng2AutoComplete;
var ng2_auto_complete_module_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.module.js");
exports.Ng2AutoCompleteModule = ng2_auto_complete_module_1.Ng2AutoCompleteModule;
var ng2_auto_complete_component_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.component.js");
exports.Ng2AutoCompleteComponent = ng2_auto_complete_component_1.Ng2AutoCompleteComponent;
var ng2_auto_complete_directive_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.directive.js");
exports.Ng2AutoCompleteDirective = ng2_auto_complete_directive_1.Ng2AutoCompleteDirective;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../ng2-auto-complete/dist/ng2-auto-complete.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ng2_auto_complete_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.js");
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
var Ng2AutoCompleteComponent = (function () {
    /**
     * constructor
     */
    function Ng2AutoCompleteComponent(elementRef, autoComplete) {
        var _this = this;
        this.autoComplete = autoComplete;
        this.minChars = 0;
        this.loadingText = "Loading";
        this.showInputTag = true;
        this.showDropdownOnInit = false;
        this.tabToSelect = true;
        this.matchFormatted = false;
        this.valueSelected = new core_1.EventEmitter();
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.minCharsEntered = false;
        this.itemIndex = 0;
        this.reloadListInDelay = function (evt) {
            var delayMs = _this.isSrcArr() ? 10 : 500;
            var keyword = evt.target.value;
            // executing after user stopped typing
            _this.delay(function () { return _this.reloadList(keyword); }, delayMs);
        };
        this.inputElKeyHandler = function (evt) {
            var totalNumItem = _this.filteredList.length;
            switch (evt.keyCode) {
                case 27:
                    break;
                case 38:
                    _this.itemIndex = (totalNumItem + _this.itemIndex - 1) % totalNumItem;
                    break;
                case 40:
                    _this.dropdownVisible = true;
                    _this.itemIndex = (totalNumItem + _this.itemIndex + 1) % totalNumItem;
                    break;
                case 13:
                    if (_this.filteredList.length > 0) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    evt.preventDefault();
                    break;
                case 9:
                    if (_this.tabToSelect && _this.filteredList.length > 0) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    break;
            }
        };
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.el = elementRef.nativeElement;
    }
    Ng2AutoCompleteComponent.prototype.isSrcArr = function () {
        return (this.source.constructor.name === "Array");
    };
    /**
     * user enters into input el, shows list to select, then select one
     */
    Ng2AutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
        this.autoComplete.listFormatter = this.listFormatter;
        setTimeout(function () {
            if (_this.autoCompleteInput) {
                _this.autoCompleteInput.nativeElement.focus();
            }
            if (_this.showDropdownOnInit) {
                _this.showDropdownList({ target: { value: '' } });
            }
        });
    };
    Ng2AutoCompleteComponent.prototype.showDropdownList = function (event) {
        this.dropdownVisible = true;
        this.reloadList(event.target.value);
    };
    Ng2AutoCompleteComponent.prototype.hideDropdownList = function () {
        this.dropdownVisible = false;
    };
    Ng2AutoCompleteComponent.prototype.findItemFromSelectValue = function (selectText) {
        var matchingItems = this.filteredList
            .filter(function (item) { return ('' + item) === selectText; });
        return matchingItems.length ? matchingItems[0] : null;
    };
    Ng2AutoCompleteComponent.prototype.reloadList = function (keyword) {
        var _this = this;
        this.filteredList = [];
        if (keyword.length < (this.minChars || 0)) {
            this.minCharsEntered = false;
            return;
        }
        else {
            this.minCharsEntered = true;
        }
        if (this.isSrcArr()) {
            this.isLoading = false;
            this.filteredList = this.autoComplete.filter(this.source, keyword, this.matchFormatted);
            if (this.maxNumList) {
                this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
        }
        else {
            this.isLoading = true;
            if (typeof this.source === "function") {
                // custom function that returns observable
                this.source(keyword).subscribe(function (resp) {
                    if (_this.pathToData) {
                        var paths = _this.pathToData.split(".");
                        paths.forEach(function (prop) { return resp = resp[prop]; });
                    }
                    _this.filteredList = resp;
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
            else {
                // remote source
                this.autoComplete.getRemoteData(keyword).subscribe(function (resp) {
                    _this.filteredList = resp;
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
        }
    };
    Ng2AutoCompleteComponent.prototype.selectOne = function (data) {
        this.valueSelected.emit(data);
    };
    ;
    Object.defineProperty(Ng2AutoCompleteComponent.prototype, "emptyList", {
        get: function () {
            return !(this.isLoading ||
                (this.minCharsEntered && !this.isLoading && !this.filteredList.length) ||
                (this.filteredList.length));
        },
        enumerable: true,
        configurable: true
    });
    Ng2AutoCompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "ng2-auto-complete",
                    template: "\n  <div class=\"ng2-auto-complete\">\n\n    <!-- keyword input -->\n    <input *ngIf=\"showInputTag\"\n           #autoCompleteInput class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList($event)\"\n           (blur)=\"hideDropdownList()\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay($event)\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\" [class.empty]=\"emptyList\">\n      <li *ngIf=\"isLoading\" class=\"loading\">{{loadingText}}</li>\n      <li *ngIf=\"minCharsEntered && !isLoading && !filteredList.length\"\n           (mousedown)=\"selectOne('')\"\n           class=\"no-match-found\">{{noMatchFoundText || 'No Result Found'}}</li>\n      <li *ngIf=\"blankOptionText && filteredList.length\"\n          (mousedown)=\"selectOne('')\"\n          class=\"blank-item\">{{blankOptionText}}</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHtml]=\"autoComplete.getFormattedListItem(item)\">\n      </li>\n    </ul>\n\n  </div>",
                    providers: [ng2_auto_complete_1.Ng2AutoComplete],
                    styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .ng2-auto-complete {\n    background-color: transparent;\n  }\n  .ng2-auto-complete > input {\n    outline: none;\n    border: 0;\n    padding: 2px; \n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .ng2-auto-complete > ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n  .ng2-auto-complete > ul.empty {\n    display: none;\n  }\n\n  .ng2-auto-complete > ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .ng2-auto-complete > ul li.selected {\n    background-color: #ccc;\n  }\n\n  .ng2-auto-complete > ul li:last-child {\n    border-bottom: none;\n  }\n\n  .ng2-auto-complete > ul li:hover {\n    background-color: #ccc;\n  }"
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: ng2_auto_complete_1.Ng2AutoComplete, },
    ];
    Ng2AutoCompleteComponent.propDecorators = {
        'listFormatter': [{ type: core_1.Input, args: ["list-formatter",] },],
        'source': [{ type: core_1.Input, args: ["source",] },],
        'pathToData': [{ type: core_1.Input, args: ["path-to-data",] },],
        'minChars': [{ type: core_1.Input, args: ["min-chars",] },],
        'placeholder': [{ type: core_1.Input, args: ["placeholder",] },],
        'blankOptionText': [{ type: core_1.Input, args: ["blank-option-text",] },],
        'noMatchFoundText': [{ type: core_1.Input, args: ["no-match-found-text",] },],
        'acceptUserInput': [{ type: core_1.Input, args: ["accept-user-input",] },],
        'loadingText': [{ type: core_1.Input, args: ["loading-text",] },],
        'maxNumList': [{ type: core_1.Input, args: ["max-num-list",] },],
        'showInputTag': [{ type: core_1.Input, args: ["show-input-tag",] },],
        'showDropdownOnInit': [{ type: core_1.Input, args: ["show-dropdown-on-init",] },],
        'tabToSelect': [{ type: core_1.Input, args: ["tab-to-select",] },],
        'matchFormatted': [{ type: core_1.Input, args: ["match-formatted",] },],
        'valueSelected': [{ type: core_1.Output },],
        'autoCompleteInput': [{ type: core_1.ViewChild, args: ['autoCompleteInput',] },],
    };
    return Ng2AutoCompleteComponent;
}());
exports.Ng2AutoCompleteComponent = Ng2AutoCompleteComponent;
//# sourceMappingURL=ng2-auto-complete.component.js.map

/***/ }),

/***/ "../../../../ng2-auto-complete/dist/ng2-auto-complete.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ng2_auto_complete_component_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.component.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var Ng2AutoCompleteDirective = (function () {
    function Ng2AutoCompleteDirective(resolver, renderer, viewContainerRef, parentForm) {
        var _this = this;
        this.resolver = resolver;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
        this.loadingText = "Loading";
        this.tabToSelect = true;
        this.matchFormatted = false;
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        //show auto-complete list below the current element
        this.showAutoCompleteDropdown = function (event) {
            var factory = _this.resolver.resolveComponentFactory(ng2_auto_complete_component_1.Ng2AutoCompleteComponent);
            _this.componentRef = _this.viewContainerRef.createComponent(factory);
            var component = _this.componentRef.instance;
            component.showInputTag = false; //Do NOT display autocomplete input tag separately
            component.pathToData = _this.pathToData;
            component.minChars = _this.minChars;
            component.source = _this.source;
            component.placeholder = _this.autoCompletePlaceholder;
            component.acceptUserInput = _this.acceptUserInput;
            component.maxNumList = parseInt(_this.maxNumList, 10);
            component.loadingText = _this.loadingText;
            component.listFormatter = _this.listFormatter;
            component.blankOptionText = _this.blankOptionText;
            component.noMatchFoundText = _this.noMatchFoundText;
            component.tabToSelect = _this.tabToSelect;
            component.matchFormatted = _this.matchFormatted;
            component.valueSelected.subscribe(_this.selectNewValue);
            _this.acDropdownEl = _this.componentRef.location.nativeElement;
            _this.acDropdownEl.style.display = "none";
            // if this element is not an input tag, move dropdown after input tag
            // so that it displays correctly
            if (_this.el.tagName !== "INPUT" && _this.acDropdownEl) {
                _this.inputEl.parentElement.insertBefore(_this.acDropdownEl, _this.inputEl.nextSibling);
            }
            _this.revertValue = typeof _this.ngModel !== "undefined" ? _this.ngModel : _this.inputEl.value;
            setTimeout(function () {
                component.reloadList(_this.inputEl.value);
                _this.styleAutoCompleteDropdown();
                component.dropdownVisible = true;
            });
        };
        this.hideAutoCompleteDropdown = function (event) {
            if (_this.componentRef) {
                var currentItem = void 0;
                var hasRevertValue = (typeof _this.revertValue !== "undefined");
                if (_this.inputEl && hasRevertValue && _this.acceptUserInput === false) {
                    currentItem = _this.componentRef.instance.findItemFromSelectValue(_this.inputEl.value);
                }
                _this.componentRef.destroy();
                _this.componentRef = undefined;
                if (_this.inputEl &&
                    hasRevertValue &&
                    _this.acceptUserInput === false &&
                    currentItem === null) {
                    _this.selectNewValue(_this.revertValue);
                }
            }
        };
        this.styleAutoCompleteDropdown = function () {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                var thisInputElBCR = _this.inputEl.getBoundingClientRect();
                var closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
                _this.acDropdownEl.style.width = thisInputElBCR.width + "px";
                _this.acDropdownEl.style.position = "absolute";
                _this.acDropdownEl.style.zIndex = "1";
                _this.acDropdownEl.style.left = "0";
                _this.acDropdownEl.style.display = "inline-block";
                if (closeToBottom) {
                    _this.acDropdownEl.style.bottom = thisInputElBCR.height + "px";
                }
                else {
                    _this.acDropdownEl.style.top = thisInputElBCR.height + "px";
                }
            }
        };
        this.selectNewValue = function (item) {
            // make displayable value
            if (item && typeof item === "object") {
                item = _this.setToStringFunction(item);
            }
            _this.inputEl && (_this.inputEl.value = '' + item);
            // make return value
            var val = item;
            if (_this.selectValueOf && item[_this.selectValueOf]) {
                val = item[_this.selectValueOf];
            }
            if ((_this.parentForm && _this.formControlName) || _this.extFormControl) {
                if (!!val) {
                    _this.formControl.patchValue(val);
                }
            }
            (val !== _this.ngModel) && _this.ngModelChange.emit(val);
            _this.valueChanged.emit(val);
            _this.hideAutoCompleteDropdown();
        };
        this.keydownEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.inputElKeyHandler(evt);
            }
        };
        this.inputEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.dropdownVisible = true;
                component.reloadListInDelay(evt);
            }
            else {
                _this.showAutoCompleteDropdown();
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    Ng2AutoCompleteDirective.prototype.ngOnInit = function () {
        // wrap this element with <div class="ng2-auto-complete">
        this.wrapperEl = document.createElement("div");
        this.wrapperEl.className = "ng2-auto-complete-wrapper";
        this.wrapperEl.style.position = "relative";
        this.el.parentElement.insertBefore(this.wrapperEl, this.el.nextSibling);
        this.wrapperEl.appendChild(this.el);
        //Check if we were supplied with a [formControlName] and it is inside a [form]
        //else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
        if (this.parentForm && this.formControlName) {
            if (this.parentForm['form']) {
                this.formControl = this.parentForm['form'].get(this.formControlName);
            }
            else if (this.parentForm instanceof forms_1.FormGroupName) {
                this.formControl = this.parentForm.control.controls[this.formControlName];
            }
        }
        else if (this.extFormControl) {
            this.formControl = this.extFormControl;
        }
        // apply toString() method for the object
        if (!!this.ngModel) {
            this.selectNewValue(this.ngModel);
        }
        else if (!!this.formControl && this.formControl.value) {
            this.selectNewValue(this.formControl.value[this.displayPropertyName]);
        }
    };
    Ng2AutoCompleteDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // if this element is not an input tag, move dropdown after input tag
        // so that it displays correctly
        this.inputEl = this.el.tagName === "INPUT" ?
            this.el : this.el.querySelector("input");
        this.inputEl.addEventListener('focus', function (e) { return _this.showAutoCompleteDropdown(e); });
        this.inputEl.addEventListener('blur', function (e) { return _this.hideAutoCompleteDropdown(e); });
        this.inputEl.addEventListener('keydown', function (e) { return _this.keydownEventHandler(e); });
        this.inputEl.addEventListener('input', function (e) { return _this.inputEventHandler(e); });
    };
    Ng2AutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
        }
    };
    Ng2AutoCompleteDirective.prototype.ngOnChanges = function (changes) {
        if (changes['ngModel']) {
            this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
        }
    };
    Ng2AutoCompleteDirective.prototype.setToStringFunction = function (item) {
        if (item && typeof item === "object") {
            var displayVal_1;
            if (typeof this.valueFormatter === 'string') {
                var matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
                var formatted_1 = this.valueFormatter;
                if (matches && typeof item !== 'string') {
                    matches.forEach(function (key) {
                        formatted_1 = formatted_1.replace(key, item[key]);
                    });
                }
                displayVal_1 = formatted_1;
            }
            else if (typeof this.valueFormatter === 'function') {
                displayVal_1 = this.valueFormatter(item);
            }
            else if (this.displayPropertyName) {
                displayVal_1 = item[this.displayPropertyName];
            }
            else if (typeof this.listFormatter === 'string' && this.listFormatter.match(/^\w+$/)) {
                displayVal_1 = item[this.listFormatter];
            }
            else {
                displayVal_1 = item.value;
            }
            item.toString = function () {
                return displayVal_1;
            };
        }
        return item;
    };
    Ng2AutoCompleteDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[auto-complete], [ng2-auto-complete]"
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteDirective.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Renderer, },
        { type: core_1.ViewContainerRef, },
        { type: forms_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf },] },
    ];
    Ng2AutoCompleteDirective.propDecorators = {
        'autoCompletePlaceholder': [{ type: core_1.Input, args: ["auto-complete-placeholder",] },],
        'source': [{ type: core_1.Input, args: ["source",] },],
        'pathToData': [{ type: core_1.Input, args: ["path-to-data",] },],
        'minChars': [{ type: core_1.Input, args: ["min-chars",] },],
        'displayPropertyName': [{ type: core_1.Input, args: ["display-property-name",] },],
        'acceptUserInput': [{ type: core_1.Input, args: ["accept-user-input",] },],
        'maxNumList': [{ type: core_1.Input, args: ["max-num-list",] },],
        'selectValueOf': [{ type: core_1.Input, args: ["select-value-of",] },],
        'listFormatter': [{ type: core_1.Input, args: ["list-formatter",] },],
        'loadingText': [{ type: core_1.Input, args: ["loading-text",] },],
        'blankOptionText': [{ type: core_1.Input, args: ["blank-option-text",] },],
        'noMatchFoundText': [{ type: core_1.Input, args: ["no-match-found-text",] },],
        'valueFormatter': [{ type: core_1.Input, args: ["value-formatter",] },],
        'tabToSelect': [{ type: core_1.Input, args: ["tab-to-select",] },],
        'matchFormatted': [{ type: core_1.Input, args: ["match-formatted",] },],
        'ngModel': [{ type: core_1.Input },],
        'formControlName': [{ type: core_1.Input, args: ['formControlName',] },],
        'extFormControl': [{ type: core_1.Input, args: ['formControl',] },],
        'ngModelChange': [{ type: core_1.Output },],
        'valueChanged': [{ type: core_1.Output },],
    };
    return Ng2AutoCompleteDirective;
}());
exports.Ng2AutoCompleteDirective = Ng2AutoCompleteDirective;
//# sourceMappingURL=ng2-auto-complete.directive.js.map

/***/ }),

/***/ "../../../../ng2-auto-complete/dist/ng2-auto-complete.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
/**
 * provides auto-complete related utility functions
 */
var Ng2AutoComplete = (function () {
    function Ng2AutoComplete(http) {
        this.http = http;
        // ...
    }
    Ng2AutoComplete.prototype.filter = function (list, keyword, matchFormatted) {
        var _this = this;
        return list.filter(function (el) {
            var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
            keyword = keyword.toLowerCase();
            //console.log(objStr, keyword, objStr.indexOf(keyword) !== -1);
            return objStr.indexOf(keyword) !== -1;
        });
    };
    Ng2AutoComplete.prototype.getFormattedListItem = function (data) {
        var formatted;
        var formatter = this.listFormatter || '(id) value';
        if (typeof formatter === 'function') {
            formatted = formatter.apply(this, [data]);
        }
        else if (typeof data !== 'object') {
            formatted = data;
        }
        else if (typeof formatter === 'string') {
            formatted = formatter;
            var matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
            if (matches && typeof data !== 'string') {
                matches.forEach(function (key) {
                    formatted = formatted.replace(key, data[key]);
                });
            }
        }
        return formatted;
    };
    /**
     * return remote data from the given source and options, and data path
     */
    Ng2AutoComplete.prototype.getRemoteData = function (keyword) {
        var _this = this;
        if (typeof this.source !== 'string') {
            throw "Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword";
        }
        else if (!this.http) {
            throw "Http is required.";
        }
        var matches = this.source.match(/:[a-zA-Z_]+/);
        if (matches === null) {
            throw "Replacement word is missing.";
        }
        var replacementWord = matches[0];
        var url = this.source.replace(replacementWord, keyword);
        return this.http.get(url)
            .map(function (resp) { return resp.json(); })
            .map(function (resp) {
            var list = resp.data || resp;
            if (_this.pathToData) {
                var paths = _this.pathToData.split(".");
                paths.forEach(function (prop) { return list = list[prop]; });
            }
            return list;
        });
    };
    ;
    Ng2AutoComplete.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Ng2AutoComplete.ctorParameters = [
        { type: http_1.Http, decorators: [{ type: core_1.Optional },] },
    ];
    return Ng2AutoComplete;
}());
exports.Ng2AutoComplete = Ng2AutoComplete;
//# sourceMappingURL=ng2-auto-complete.js.map

/***/ }),

/***/ "../../../../ng2-auto-complete/dist/ng2-auto-complete.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var ng2_auto_complete_component_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.component.js");
var ng2_auto_complete_directive_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.directive.js");
var ng2_auto_complete_1 = __webpack_require__("../../../../ng2-auto-complete/dist/ng2-auto-complete.js");
var Ng2AutoCompleteModule = (function () {
    function Ng2AutoCompleteModule() {
    }
    Ng2AutoCompleteModule.forRoot = function () {
        return {
            ngModule: Ng2AutoCompleteModule,
            providers: [ng2_auto_complete_1.Ng2AutoComplete]
        };
    };
    Ng2AutoCompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
                    exports: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
                    entryComponents: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent]
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteModule.ctorParameters = [];
    return Ng2AutoCompleteModule;
}());
exports.Ng2AutoCompleteModule = Ng2AutoCompleteModule;
//# sourceMappingURL=ng2-auto-complete.module.js.map

/***/ }),

/***/ "../../../../ngx-toastr/toastr.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ɵa */
/* unused harmony export ComponentPortal */
/* unused harmony export BasePortalHost */
/* unused harmony export Overlay */
/* unused harmony export OVERLAY_PROVIDERS */
/* unused harmony export OverlayContainer */
/* unused harmony export OverlayRef */
/* unused harmony export ToastContainerDirective */
/* unused harmony export ToastContainerModule */
/* unused harmony export Toast */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ToastrService; });
/* unused harmony export ToastPackage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastrModule; });
/* unused harmony export ToastRef */
/* unused harmony export ToastInjector */
/* unused harmony export TOAST_CONFIG */
/* unused harmony export ToastNoAnimation */
/* unused harmony export ToastNoAnimationModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");






/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = /** @class */ (function () {
    function ComponentPortal(component, injector) {
        this.component = component;
        this.injector = injector;
    }
    /** Attach this portal to a host. */
    ComponentPortal.prototype.attach = function (host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
    };
    /** Detach this portal from its host */
    ComponentPortal.prototype.detach = function () {
        var host = this._attachedHost;
        if (host) {
            this._attachedHost = undefined;
            return host.detach();
        }
    };
    Object.defineProperty(ComponentPortal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    ComponentPortal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return ComponentPortal;
}());
/**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 */
var BasePortalHost = /** @class */ (function () {
    function BasePortalHost() {
    }
    BasePortalHost.prototype.attach = function (portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
    };
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = undefined;
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = undefined;
        }
    };
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = /** @class */ (function (_super) {
    __extends(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    DomPortalHost.prototype.attachComponentPortal = function (portal, newestOnTop) {
        var _this = this;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the ChangeDetector for that component to the application (which
        // happens automatically when using a ViewContainer).
        componentRef = componentFactory.create(portal.injector);
        // When creating a component outside of a ViewContainer, we need to manually register
        // its ChangeDetector with the application. This API is unfortunately not yet published
        // in Angular core. The change detector must also be deregistered when the component
        // is destroyed to prevent memory leaks.
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn(function () {
            _this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        });
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        if (newestOnTop) {
            this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        }
        else {
            this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
    };
    /** Gets the root HTMLElement for an instantiated component. */
    DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    return DomPortalHost;
}(BasePortalHost));

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalHost) {
        this._portalHost = _portalHost;
    }
    OverlayRef.prototype.attach = function (portal, newestOnTop) {
        if (newestOnTop === void 0) { newestOnTop = true; }
        return this._portalHost.attach(portal, newestOnTop);
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = function () {
        return this._portalHost.detach();
    };
    return OverlayRef;
}());

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = /** @class */ (function () {
    function OverlayContainer() {
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    OverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return OverlayContainer;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = /** @class */ (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _appRef) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._paneElements = {};
    }
    /**
     * Creates an overlay.
     * @returns A reference to the created overlay.
     */
    Overlay.prototype.create = function (positionClass, overlayContainer) {
        // get existing pane if possible
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    };
    Overlay.prototype.getPaneElement = function (positionClass, overlayContainer) {
        if (positionClass === void 0) { positionClass = ''; }
        if (!this._paneElements[positionClass]) {
            this._paneElements[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements[positionClass];
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    Overlay.prototype._createPaneElement = function (positionClass, overlayContainer) {
        var pane = document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     */
    Overlay.prototype._createOverlayRef = function (pane) {
        return new OverlayRef(this._createPortalHost(pane));
    };
    Overlay = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [OverlayContainer,
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], Overlay);
    return Overlay;
}());
/** Providers for Overlay and its related injectables. */
var OVERLAY_PROVIDERS = [
    Overlay,
    OverlayContainer,
];

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ToastContainerDirective = /** @class */ (function () {
    function ToastContainerDirective(el) {
        this.el = el;
    }
    ToastContainerDirective.prototype.getContainerElement = function () {
        return this.el.nativeElement;
    };
    ToastContainerDirective = __decorate$1([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[toastContainer]',
            exportAs: 'toastContainer',
        }),
        __metadata$1("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ToastContainerDirective);
    return ToastContainerDirective;
}());
var ToastContainerModule = /** @class */ (function () {
    function ToastContainerModule() {
    }
    ToastContainerModule = __decorate$1([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [ToastContainerDirective],
            exports: [ToastContainerDirective],
        })
    ], ToastContainerModule);
    return ToastContainerModule;
}());

/**
 * Everything a toast needs to launch
 */
var ToastPackage = /** @class */ (function () {
    function ToastPackage(toastId, config, message, title, toastType, toastRef) {
        var _this = this;
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._onAction = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.toastRef.afterClosed().subscribe(function () {
            _this._onAction.complete();
            _this._onTap.complete();
        });
    }
    /** Fired on click */
    ToastPackage.prototype.triggerTap = function () {
        this._onTap.next();
        this._onTap.complete();
    };
    ToastPackage.prototype.onTap = function () {
        return this._onTap.asObservable();
    };
    /** available for use in custom toast */
    ToastPackage.prototype.triggerAction = function (action) {
        this._onAction.next(action);
    };
    ToastPackage.prototype.onAction = function () {
        return this._onAction.asObservable();
    };
    return ToastPackage;
}());

/**
 * Reference to a toast opened via the Toastr service.
 */
var ToastRef = /** @class */ (function () {
    function ToastRef(_overlayRef) {
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the toast has finished closing. */
        this._afterClosed = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        /** triggered when toast is activated */
        this._activate = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        /** notifies the toast that it should close before the timeout */
        this._manualClose = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
    }
    ToastRef.prototype.manualClose = function () {
        this._manualClose.next();
        this._manualClose.complete();
    };
    ToastRef.prototype.manualClosed = function () {
        return this._manualClose.asObservable();
    };
    /**
     * Close the toast.
     */
    ToastRef.prototype.close = function () {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
    };
    /** Gets an observable that is notified when the toast is finished closing. */
    ToastRef.prototype.afterClosed = function () {
        return this._afterClosed.asObservable();
    };
    ToastRef.prototype.isInactive = function () {
        return this._activate.isStopped;
    };
    ToastRef.prototype.activate = function () {
        this._activate.next();
        this._activate.complete();
    };
    /** Gets an observable that is notified when the toast has started opening. */
    ToastRef.prototype.afterActivate = function () {
        return this._activate.asObservable();
    };
    return ToastRef;
}());
/** Custom injector type specifically for instantiating components with a toast. */
var ToastInjector = /** @class */ (function () {
    function ToastInjector(_toastPackage, _parentInjector) {
        this._toastPackage = _toastPackage;
        this._parentInjector = _parentInjector;
    }
    ToastInjector.prototype.get = function (token, notFoundValue) {
        if (token === ToastPackage && this._toastPackage) {
            return this._toastPackage;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return ToastInjector;
}());

var TOAST_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('ToastConfig');

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ToastrService = /** @class */ (function () {
    function ToastrService(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        var defaultConfig = new token.defaults;
        this.toastrConfig = __assign$1({}, defaultConfig, token.config);
        this.toastrConfig.iconClasses = __assign$1({}, defaultConfig.iconClasses, token.config.iconClasses);
    }
    /** show toast */
    ToastrService.prototype.show = function (message, title, override, type) {
        if (override === void 0) { override = {}; }
        if (type === void 0) { type = ''; }
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show successful toast */
    ToastrService.prototype.success = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.success || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show error toast */
    ToastrService.prototype.error = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.error || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show info toast */
    ToastrService.prototype.info = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.info || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show warning toast */
    ToastrService.prototype.warning = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.warning || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /**
     * Remove all or a single toast by id
     */
    ToastrService.prototype.clear = function (toastId) {
        // Call every toastRef manualClose function
        for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
            var toast = _a[_i];
            if (toastId !== undefined) {
                if (toast.toastId === toastId) {
                    toast.toastRef.manualClose();
                    return;
                }
            }
            else {
                toast.toastRef.manualClose();
            }
        }
    };
    /**
     * Remove and destroy a single toast by id
     */
    ToastrService.prototype.remove = function (toastId) {
        var found = this._findToast(toastId);
        if (!found) {
            return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
            return false;
        }
        if (this.currentlyActive <= +this.toastrConfig.maxOpened && this.toasts[this.currentlyActive]) {
            var p = this.toasts[this.currentlyActive].toastRef;
            if (!p.isInactive()) {
                this.currentlyActive = this.currentlyActive + 1;
                p.activate();
            }
        }
        return true;
    };
    /**
     * Determines if toast message is already shown
     */
    ToastrService.prototype.isDuplicate = function (message) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].message === message) {
                return true;
            }
        }
        return false;
    };
    /** create a clone of global config and apply individual settings */
    ToastrService.prototype.applyConfig = function (override) {
        if (override === void 0) { override = {}; }
        return __assign$1({}, this.toastrConfig, override);
    };
    /**
     * Find toast object by id
     */
    ToastrService.prototype._findToast = function (toastId) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return null;
    };
    /**
     * Determines the need to run inside angular's zone then builds the toast
     */
    ToastrService.prototype._preBuildNotification = function (toastType, message, title, config) {
        var _this = this;
        if (config.onActivateTick) {
            return this.ngZone.run(function () { return _this._buildNotification(toastType, message, title, config); });
        }
        return this._buildNotification(toastType, message, title, config);
    };
    /**
     * Creates and attaches toast data to component
     * returns null if toast is duplicate and preventDuplicates == True
     */
    ToastrService.prototype._buildNotification = function (toastType, message, title, config) {
        var _this = this;
        if (!config.toastComponent) {
            throw new Error('toastComponent required');
        }
        // max opened and auto dismiss = true
        if (message && this.toastrConfig.preventDuplicates && this.isDuplicate(message)) {
            return null;
        }
        this.previousToastMessage = message;
        var keepInactive = false;
        if (this.toastrConfig.maxOpened && this.currentlyActive >= this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[this.toasts.length - 1].toastId);
            }
        }
        var overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        var sanitizedMessage = message;
        if (message && config.enableHtml) {
            sanitizedMessage = this.sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SecurityContext"].HTML, message);
        }
        var toastRef = new ToastRef(overlayRef);
        var toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        var toastInjector = new ToastInjector(toastPackage, this._injector);
        var component = new ComponentPortal(config.toastComponent, toastInjector);
        var ins = {
            toastId: this.index,
            message: message || '',
            toastRef: toastRef,
            onShown: toastRef.afterActivate(),
            onHidden: toastRef.afterClosed(),
            onTap: toastPackage.onTap(),
            onAction: toastPackage.onAction(),
            portal: overlayRef.attach(component, this.toastrConfig.newestOnTop),
        };
        if (!keepInactive) {
            setTimeout(function () {
                ins.toastRef.activate();
                _this.currentlyActive = _this.currentlyActive + 1;
            });
        }
        this.toasts.push(ins);
        return ins;
    };
    ToastrService = __decorate$3([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(TOAST_CONFIG)),
        __metadata$3("design:paramtypes", [Object, Overlay,
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], ToastrService);
    return ToastrService;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Toast = /** @class */ (function () {
    function Toast(toastrService, toastPackage) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        /** width of progress bar */
        this.width = -1;
        /** a combination of toast type and options.toastClass */
        this.toastClasses = '';
        /** controls animation */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in',
            },
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
    }
    Toast.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    Toast.prototype.activateToast = function () {
        var _this = this;
        this.state = __assign({}, this.state, { value: 'active' });
        if (this.options.timeOut) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
    };
    /**
     * updates progress bar width
     */
    Toast.prototype.updateProgress = function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        var now = new Date().getTime();
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    Toast.prototype.remove = function () {
        var _this = this;
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = __assign({}, this.state, { value: 'removed' });
        this.timeout = setTimeout(function () {
            return _this.toastrService.remove(_this.toastPackage.toastId);
        }, this.toastPackage.config.easeTime);
    };
    Toast.prototype.tapToast = function () {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    Toast.prototype.stickAround = function () {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    Toast.prototype.delayedHideToast = function () {
        var _this = this;
        if (this.options.extendedTimeOut === 0 || this.state.value === 'removed') {
            return;
        }
        this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata$2("design:type", Object)
    ], Toast.prototype, "toastClasses", void 0);
    __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('@flyInOut'),
        __metadata$2("design:type", Object)
    ], Toast.prototype, "state", void 0);
    __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], Toast.prototype, "tapToast", null);
    __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], Toast.prototype, "stickAround", null);
    __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], Toast.prototype, "delayedHideToast", null);
    Toast = __decorate$2([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[toast-component]',
            template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\">\n    &times;\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('flyInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('inactive', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({
                        display: 'none',
                        opacity: 0,
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('active', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('removed', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('inactive => active', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('{{ easeTime }}ms {{ easing }}')),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('active => removed', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('{{ easeTime }}ms {{ easing }}')),
                ]),
            ],
            preserveWhitespaces: false,
        }),
        __metadata$2("design:paramtypes", [ToastrService,
            ToastPackage])
    ], Toast);
    return Toast;
}());

var DefaultGlobalConfig = /** @class */ (function () {
    function DefaultGlobalConfig() {
        // Global
        this.maxOpened = 0;
        this.autoDismiss = false;
        this.newestOnTop = true;
        this.preventDuplicates = false;
        this.iconClasses = {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        };
        // Individual
        this.toastComponent = Toast;
        this.closeButton = false;
        this.timeOut = 5000;
        this.extendedTimeOut = 1000;
        this.enableHtml = false;
        this.progressBar = false;
        this.toastClass = 'toast';
        this.positionClass = 'toast-top-right';
        this.titleClass = 'toast-title';
        this.messageClass = 'toast-message';
        this.easing = 'ease-in';
        this.easeTime = 300;
        this.tapToDismiss = true;
        this.onActivateTick = false;
        this.progressAnimation = 'decreasing';
    }
    return DefaultGlobalConfig;
}());

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ToastrModule = /** @class */ (function () {
    function ToastrModule(parentModule) {
        if (parentModule) {
            throw new Error('ToastrModule is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    ToastrModule_1 = ToastrModule;
    ToastrModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastrModule_1,
            providers: [
                { provide: TOAST_CONFIG, useValue: { config: config, defaults: DefaultGlobalConfig } },
                OverlayContainer,
                Overlay,
                ToastrService,
            ],
        };
    };
    ToastrModule = ToastrModule_1 = __decorate$4([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"]],
            exports: [Toast],
            declarations: [Toast],
            entryComponents: [Toast],
        }),
        __param$1(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param$1(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()),
        __metadata$4("design:paramtypes", [ToastrModule])
    ], ToastrModule);
    return ToastrModule;
    var ToastrModule_1;
}());

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ToastNoAnimation = /** @class */ (function () {
    function ToastNoAnimation(toastrService, toastPackage, appRef) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.appRef = appRef;
        /** width of progress bar */
        this.width = -1;
        /** a combination of toast type and options.toastClass */
        this.toastClasses = '';
        /** controls animation */
        this.state = 'inactive';
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
    }
    ToastNoAnimation.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    ToastNoAnimation.prototype.activateToast = function () {
        var _this = this;
        this.state = 'active';
        if (this.options.timeOut) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
        if (this.options.onActivateTick) {
            this.appRef.tick();
        }
    };
    /**
     * updates progress bar width
     */
    ToastNoAnimation.prototype.updateProgress = function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        var now = new Date().getTime();
        var remaining = this.hideTime - now;
        this.width = remaining / this.options.timeOut * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    ToastNoAnimation.prototype.remove = function () {
        var _this = this;
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = 'removed';
        this.timeout = setTimeout(function () { return _this.toastrService.remove(_this.toastPackage.toastId); });
    };
    ToastNoAnimation.prototype.tapToast = function () {
        if (this.state === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    ToastNoAnimation.prototype.stickAround = function () {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    ToastNoAnimation.prototype.delayedHideToast = function () {
        var _this = this;
        if (this.options.extendedTimeOut === 0 || this.state === 'removed') {
            return;
        }
        this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata$5("design:type", Object)
    ], ToastNoAnimation.prototype, "toastClasses", void 0);
    __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata$5("design:type", Function),
        __metadata$5("design:paramtypes", []),
        __metadata$5("design:returntype", void 0)
    ], ToastNoAnimation.prototype, "tapToast", null);
    __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
        __metadata$5("design:type", Function),
        __metadata$5("design:paramtypes", []),
        __metadata$5("design:returntype", void 0)
    ], ToastNoAnimation.prototype, "stickAround", null);
    __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
        __metadata$5("design:type", Function),
        __metadata$5("design:paramtypes", []),
        __metadata$5("design:returntype", void 0)
    ], ToastNoAnimation.prototype, "delayedHideToast", null);
    ToastNoAnimation = __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[toast-component]',
            template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\">\n    &times;\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
        }),
        __metadata$5("design:paramtypes", [ToastrService,
            ToastPackage,
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], ToastNoAnimation);
    return ToastNoAnimation;
}());
var ToastNoAnimationModule = /** @class */ (function () {
    function ToastNoAnimationModule() {
    }
    ToastNoAnimationModule = __decorate$5([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"]],
            declarations: [ToastNoAnimation],
            exports: [ToastNoAnimation],
            entryComponents: [ToastNoAnimation],
        })
    ], ToastNoAnimationModule);
    return ToastNoAnimationModule;
}());

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=toastr.es5.js.map


/***/ })

});
//# sourceMappingURL=jobs.module.chunk.js.map