webpackJsonp(["home.module"],{

/***/ "../../../../../src/app/routes/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/routes/home/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__esriMap_esri_map_module__ = __webpack_require__("../../../../../src/app/routes/esriMap/esri-map.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
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
            __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */]
        ]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/home/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div *ngIf=\"kpiDiv\" id=\"Div1\" ></div>\r\n    <div class=\"col p-lr-10\">\r\n        <div class=\"panel widget bg-primary\">\r\n            <div class=\"row row-table\">\r\n                <div class=\"col-xs-4 text-center bg-primary-dark pv-lg\">\r\n                    <em class=\"icon-share fa-3x\"></em>\r\n                </div>\r\n                <div class=\"col-xs-8 pv-lg\">\r\n                    <div class=\"h2 mt0\">\r\n                        <span style=\"color: white;\">{{totalFeeders}}</span>\r\n                    </div>\r\n                    <!--  <div class=\"h2 mt0\" style=\"color: rgb(255, 255, 255);\" id=\"tFeeders-viz\">\r\n                        \r\n                    </div> -->\r\n                    <div class=\"text-uppercase\">Total Feeders</div>\r\n                </div>\r\n            </div>\r\n            <!--  <a class=\"panel-footer bg-gray-dark bt0 clearfix btn-block\" href=\"#\">\r\n                <span class=\"pull-left\">View Details</span>\r\n                <span class=\"pull-right\">\r\n               <em class=\"fa fa-chevron-circle-right\"></em>\r\n            </span>\r\n            </a> -->\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col p-lr-10\">\r\n        <div class=\"panel widget bg-green\">\r\n            <div class=\"row row-table\">\r\n                <div class=\"col-xs-4 text-center bg-green-dark pv-lg\">\r\n                    <em class=\"fa fa-archive fa-3x\"></em>\r\n                </div>\r\n                <div class=\"col-xs-8 pv-lg\">\r\n                    <div class=\"h2 mt0\">\r\n                        <span style=\"color: white;\">{{delivered}}</span>\r\n                    </div>\r\n                    <div class=\"text-uppercase\">Delivered </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"col p-lr-10\">\r\n        <div class=\"panel widget bg-purple\">\r\n            <div class=\"row row-table\">\r\n                <div class=\"col-xs-4 text-center bg-purple-dark pv-lg\">\r\n                    <em class=\"fa fa-bars fa-3x\"></em>\r\n                </div>\r\n                <div class=\"col-xs-8 pv-lg\">\r\n                    <div class=\"h2 mt0\">\r\n                        <span style=\"color: white;\">{{backOffice}}</span>\r\n                    </div>\r\n                    <div class=\"text-uppercase\">Back office</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"col p-lr-10\">\r\n        <div class=\"panel widget bg-info\">\r\n            <div class=\"row row-table\">\r\n                <div class=\"col-xs-4 text-center bg-info-dark pv-lg\">\r\n                    <em class=\"icon-briefcase fa-3x\"></em>\r\n                </div>\r\n                <div class=\"col-xs-8 pv-lg\">\r\n                    <div class=\"h2 mt0\">\r\n                        <span style=\"color: white;\">{{fcInProgress}}</span>\r\n                    </div>\r\n                    <div class=\"text-uppercase\">FC In-Progress</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col p-lr-10\">\r\n        <div class=\"panel widget bg-warning\">\r\n            <div class=\"row row-table\">\r\n                <div class=\"col-xs-4 text-center bg-warning-dark pv-lg\">\r\n                    <em class=\"icon-briefcase fa-3x\"></em>\r\n                </div>\r\n                <div class=\"col-xs-8 pv-lg\">\r\n                    <div class=\"h2 mt0\">\r\n                        <span style=\"color: white;\">{{fcToStart}}</span>\r\n                    </div>\r\n                    <div class=\"text-uppercase\">FC to Start </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- START chart-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"feederDiv\">\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"feeder-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Feeder-wise Completion Status</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('feederWisePanelCollapseBtnClass')\" data-target=\"#reportFeederPanel\">\r\n                            <i [class]=\"feederWisePanelCollapseBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t-viz','feeder-header-panel','feederDiv')\">\r\n                            <em [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportFeederPanel\" class=\"collapse in\">\r\n                    <div id=\"t-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-lg-12\" id=\"gridwiseDiv\">\r\n        <!-- START widget-->\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"Grid-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Grid wise Completion Status</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('gridWisePanelCollapBtnClass')\" data-target=\"#reportPanelGridwiseCompletionStatus\">\r\n                            <i [class]=\"gridWisePanelCollapBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('gridwiseCompletionStatus-viz','Grid-header-panel','gridwiseDiv')\">\r\n                            <em style=\"color: #5d9cec\" [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportPanelGridwiseCompletionStatus\" class=\"collapse in\">\r\n                    <div id=\"gridwiseCompletionStatus-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- END widget-->\r\n    </div>\r\n    <!-- <div class=\"col-lg-6\" id=\"qualityDiv\">\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"Quality-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Quality</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('qualityPanelCollapseBtnClass')\" data-target=\"#reportQualityPanel\">\r\n                            <i [class]=\"qualityPanelCollapseBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t1-viz','Quality-header-panel','qualityDiv')\">\r\n                            <em style=\"color: #5d9cec\" [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportQualityPanel\" class=\"collapse in\">\r\n                    <div id=\"t1-viz\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-6\" id=\"safetyDiv\">\r\n        <div class=\"panel panel-default\" id=\"panelChart9\">\r\n            <div class=\"panel-heading\" id=\"Sefety-header-panel\">\r\n                <div class=\"panel-title\">\r\n                    <span>Safety Matrics</span>\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"onExpandCollapseClick('sefetyMatricsCollapseBtnClass')\" data-target=\"#reportSefetyMatricsPanel\">\r\n                            <i [class]=\"sefetyMatricsCollapseBtnClass\"></i>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right padding-right\">\r\n                        <a (click)=\"toggleFullScreen('t2-viz','Safety-header-panel','safetyDiv')\">\r\n                            <em style=\"color: #5d9cec\" [class]=\"expandButtonClass\"></em>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div id=\"reportSefetyMatricsPanel\" class=\"collapse in\">\r\n                    <div id=\"t2-viz\">\r\n                        <img src=\"assets/img/SefetyMatrics.PNG\" height=\"400vh\" width=\"100%\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div> -->\r\n</div>\r\n<!-- <div class=\"panel\">\r\n    <tabset class=\"bg-white p0\" justified=\"true\">\r\n        <tab>\r\n            <ng-template tabHeading>\r\n                <em class=\"fa fa-clock-o fa-fw\"></em>Dashboard Map\r\n            </ng-template>\r\n            <div>\r\n                \r\n                <div class=\"container-fluid\">\r\n\r\n                    <div class=\"row\">\r\n                        <div id=\"example\" class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\r\n                            <div id=\"map-panel\" class=\"panel panel-default\">\r\n                                <div class=\"panel-heading\" role=\"tab\" id=\"mapPanel\">\r\n                                    <h4 class=\"panel-title\">\r\n                                        Map\r\n                                        <div class=\"pull-right\">\r\n                                            <a role=\"button\" data-toggle=\"collapse\" (click)=\"panelClickForMap(item)\" data-parent=\"#accordion\" href=\"#collapsibleMapPanel\"\r\n                                                aria-expanded=\"true\" aria-controls=\"collapsibleMapPanel\">\r\n                                                <div class=\"pull-right\">\r\n                                                    <i class=\"{{mapPanelCollapsableButtonClass}}\"></i>\r\n                                                </div>\r\n                                            </a>\r\n                                        </div>\r\n                                        <div class=\"pull-right paddingRight\">\r\n                                            <a role=\"button\" data-toggle=\"tooltip\" title=\"FullScreen\" (click)=\"fullScreen()\">\r\n                                                <div class=\"pull-right\">\r\n                                                    <i [class]=\"expandButtonClass\"></i>\r\n                                                </div>\r\n                                            </a>\r\n                                        </div>\r\n                                    </h4>\r\n                                </div>\r\n\r\n                                <div id=\"collapsibleMapPanel\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"mapPanel\">\r\n                                    <div class=\"panel-body\">\r\n                                        <app-esri-map (onDataSave)=\"onErrorDataSave($event)\" #myMap mapId=\"custom-map\" [baseMap]=\"selectedBaseMap.value\"></app-esri-map>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                \r\n                <div class=\"panel-footer text-right\"><a class=\"btn btn-default btn-sm\" href=\"#\">View All Activity </a>\r\n                </div>\r\n            </div>\r\n        </tab>\r\n        <tab>\r\n            <ng-template tabHeading>\r\n                <em class=\"fa fa-money fa-fw\"></em>Grid wise Completion Status\r\n            </ng-template>\r\n            <div>\r\n                \r\n                <div class=\"table-responsive\">\r\n                    <div class=\"panel-body\">\r\n                        <div id=\"reportPanelGridwiseCompletionStatus\" class=\"collapse in\">\r\n                            <div id=\"gridwiseCompletionStatus-viz\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n                <div class=\"panel-footer text-right\"><a class=\"btn btn-default btn-sm\" href=\"#\">View All Transactions</a>\r\n                </div>\r\n            </div>\r\n        </tab>\r\n    </tabset>\r\n</div> -->\r\n<!-- END chart-->\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/routes/home/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ========================================================================\r\n     Component: media-queries\r\n ========================================================================== */\n.home-container {\n  margin: 0 auto;\n  max-width: 970px; }\n  .home-container .home-logo {\n    width: 240px; }\n  @media only screen and (max-width: 768px) {\n    .home-container .home-text {\n      text-align: center; } }\n\n.padding-right {\n  padding-right: 20px; }\n\n#custom-map {\n  height: 500px; }\n\nul.basemap-dropdown {\n  max-width: 220px; }\n\nli.no-padding {\n  padding: 0 !important; }\n\n.padding-10 {\n  padding: 10px !important; }\n\n.panelDefault {\n  z-index: 9999;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0; }\n\n.panel-fullscreen {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  top: 0;\n  left: 0;\n  padding: 0; }\n\n.layout-fixed .wrapper .topnavbar-wrapper {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 112; }\n\n.wrapper > .aside {\n  z-index: 100; }\n\n.map-height {\n  height: 100% !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/home/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__esriMap_esriMap_esri_map_component__ = __webpack_require__("../../../../../src/app/routes/esriMap/esriMap/esri-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    /* getFeederData() {
        var sheet = this.tableauViz1.getWorkbook().getActiveSheet(),
            
            options = {
                maxRows: 0, // Max rows to return. Use 0 to return all rows
                ignoreAliases: false,
                ignoreSelection: true,
                includeAllColumns: false
            };

        sheet.getUnderlyingDataAsync(options).then(function (t) {

            alert(JSON.stringify(t.getData()));
        });
    } */
    function HomeComponent(router) {
        this.router = router;
        this.gridWisePanelCollapBtnClass = 'fa fa-minus';
        this.feederWisePanelCollapseBtnClass = 'fa fa-minus';
        this.qualityPanelCollapseBtnClass = 'fa fa-minus';
        this.sefetyMatricsCollapseBtnClass = 'fa fa-minus';
        this.customMap = 'custom-map';
        this.availableBaseMaps = [
            { text: 'Hybrid', value: 'hybrid', imgSrc: '../assets/img/basemaps/hybrid.jpg' },
            { text: 'Streets', value: 'streets', imgSrc: '../assets/img/basemaps/streets.jpg' },
            { text: 'Topo', value: 'topo', imgSrc: '../assets/img/basemaps/topo.jpg' },
            { text: 'Dark-gray', value: 'dark-gray', imgSrc: '../assets/img/basemaps/dark-gray.jpg' }
        ];
        this.selectedBaseMap = this.availableBaseMaps[0];
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
        this.kpiDiv = false;
    }
    HomeComponent.prototype.onBaseMapSelect = function (selectedBaseMap) {
        this.selectedBaseMap = selectedBaseMap;
    };
    HomeComponent.prototype.fixedDuration = function () {
        if (this.map) {
            this.map.fixedDuration();
        }
    };
    HomeComponent.prototype.onExpandCollapseClick = function (classToChange) {
        switch (classToChange) {
            case 'gridWisePanelCollapBtnClass':
                this.gridWisePanelCollapBtnClass = this.gridWisePanelCollapBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
                break;
            case 'feederWisePanelCollapseBtnClass':
                this.feederWisePanelCollapseBtnClass = this.feederWisePanelCollapseBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
                break;
            case 'qualityPanelCollapseBtnClass':
                this.qualityPanelCollapseBtnClass = this.qualityPanelCollapseBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
                break;
            case 'sefetyMatricsCollapseBtnClass':
                this.sefetyMatricsCollapseBtnClass = this.sefetyMatricsCollapseBtnClass === 'fa fa-minus' ? 'fa fa-plus' : 'fa fa-minus';
                break;
            default:
                break;
        }
    };
    HomeComponent.prototype.toggleFullScreen = function (elementId, headerId, divId) {
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
    HomeComponent.prototype.getKpiData = function () {
        var _this = this;
        var sheet = this.tFeedersViz.getWorkbook().getActiveSheet(), 
        // If the active sheet is not a dashboard, then you can just enter:
        // viz.getWorkbook().getActiveSheet();
        options = {
            maxRows: 10,
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };
        sheet.getUnderlyingDataAsync(options).then((function (t) {
            _this.totalFeeders = t.getData()[0][4].value;
            _this.delivered = t.getData()[0][1].value;
            _this.backOffice = t.getData()[0][0].value;
            _this.fcInProgress = t.getData()[0][2].value;
            _this.fcToStart = t.getData()[0][3].value;
        }));
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.loadTableauReports();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.tableauViz != undefined ? this.tableauViz.dispose() : "";
        this.tableauViz1 != undefined ? this.tableauViz1.dispose() : "";
        this.tFeedersViz != undefined ? this.tFeedersViz.dispose() : "";
    };
    HomeComponent.prototype.loadTableauReports = function () {
        var _this = this;
        var placeholderDiv1 = document.getElementById('t-viz');
        var url1 = 'https://reporting.cyient.com/t/UGNAMPOC/views/FeederwiseCompletionStatus/Completionstatus?:embed=y&:display_count=no&:showVizHome=no&:showAppBanner=false&:showShareOptions=false&:tab=no&:toolbar=no&:display_count=false&:showVizHome=false&toolbar=no';
        var options = {
            hideTabs: true,
            width: '100%',
            height: '35vh',
            onFirstInteractive: (function () {
                _this.getKPIdata();
                _this.loadGridWiseCompletionStatus();
                //this.getFeederData();
            })
        };
        this.tableauViz = new tableau.Viz(placeholderDiv1, url1, options);
    };
    /* summaryData() {
        var sheet = this.tableauViz1.getWorkbook().getActiveSheet().getWorksheets().get("Summary Details"),

            options = {
                maxRows: 0, // Max rows to return. Use 0 to return all rows
                ignoreAliases: false,
                ignoreSelection: true,
                includeAllColumns: false
            };

        sheet.getFiltersAsync(options).then(((t) => {
            //alert();
        }));

        sheet.getUnderlyingDataAsync(options).then(((t) => {

            alert(t.getData().length);
        }));
    } */
    /* listenToFeaturesSelection() {
        this.tableauViz1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, () => {
            this.onSummarySelection();
        });
    }

    onSummarySelection() {
        //return summaryEvent.getMarksAsync().then(this.summaryData());
        this.summaryData();
    } */
    HomeComponent.prototype.loadGridWiseCompletionStatus = function () {
        var placeholderDiv = document.getElementById('gridwiseCompletionStatus-viz'), url = 'https://reporting.cyient.com/t/UGNAMPOC/views/LandingPage/GridwiseCompletionStatus?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no&:toolbar=no';
        this.tableauViz1 = new tableau.Viz(placeholderDiv, url, {
            hideTabs: true,
            width: '100%',
            height: '35vh',
            onFirstInteractive: (function () {
                //this.listenToFeaturesSelection();
            }),
        });
    };
    HomeComponent.prototype.getKPIdata = function () {
        var _this = this;
        var containerDiv = document.getElementById('Div1');
        var testGetDataURL = 'https://reporting.cyient.com/t/UGNAMPOC/views/KPI/kpi';
        this.tFeedersViz = new tableau.Viz(containerDiv, testGetDataURL, {
            hideTabs: true,
            width: 0,
            height: 0,
            onFirstInteractive: (function () {
                _this.getKpiData();
            })
        });
    };
    return HomeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myMap'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__esriMap_esriMap_esri_map_component__["a" /* EsriMapComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__esriMap_esriMap_esri_map_component__["a" /* EsriMapComponent */]) === "function" && _a || Object)
], HomeComponent.prototype, "map", void 0);
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/routes/home/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/home/home/home.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ })

});
//# sourceMappingURL=home.module.chunk.js.map