webpackJsonp(["dataMapViewer.module"],{

/***/ "../../../../../src/app/routes/dataMapViewer/dataMapViewer.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataMapViewerModule", function() { return DataMapViewerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataMapViewer_dataMapViewer_component__ = __webpack_require__("../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dataMapViewer_dataMapViewer_component__["a" /* DataMapViewerComponent */] },
];
var DataMapViewerModule = (function () {
    function DataMapViewerModule() {
    }
    return DataMapViewerModule;
}());
DataMapViewerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(routes)
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__dataMapViewer_dataMapViewer_component__["a" /* DataMapViewerComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */]
        ]
    })
], DataMapViewerModule);

//# sourceMappingURL=dataMapViewer.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div id=\"mapContent\" class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>\r\n        <div id=\"map-panel\" class=\"panel panel-default\" style=\"height:100%;\">\r\n            <div class=\"panel-heading\" role=\"tab\" id=\"mapPanel\">\r\n                <h4 class=\"panel-title\">\r\n                    <!-- Data Map Viewer -->\r\n                    <div class=\"pull-right\">\r\n                        <a role=\"button\" data-toggle=\"collapse\" (click)=\"featureTablePanelClickMeter(item)\" data-parent=\"#accordion\" data-target=\"#collapsibleMapPanel1\"\r\n                            aria-expanded=\"true\" aria-controls=\"collapsibleMapPanel1\">\r\n                            <div class=\"pull-right\">\r\n                                <i style=\"color: 5d9cec\" class=\"{{mapPanel}}\"></i>\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"pull-right paddingRight\">\r\n                        <a role=\"button\" data-toggle=\"tooltip\" title=\"FullScreen\" (click)=\"fullScreen()\">\r\n                            <div class=\"pull-right\">\r\n                                <i style=\"color: 5d9cec\" [class]=\"expandButtonClass\"></i>\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                    \r\n                </h4>\r\n            </div>\r\n            <div id=\"collapsibleMapPanel1\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"mapPanel\">\r\n                <div class=\"panel-body\">\r\n                    <div>\r\n                          <!-- <iframe style=\"width: 100%;height: 79vh;\" src=\"https://www.cyient-fiops.com/XCEL_PROD/SmartTiles/\"></iframe> -->\r\n                          <iframe style=\"width: 100%;height: 88vh;\" src=\"/XCEL_PROD/SmartTiles/index.html\"></iframe>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".paddingRight {\n  padding-right: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataMapViewerComponent; });
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

var DataMapViewerComponent = (function () {
    function DataMapViewerComponent() {
        this.fullScreenButtons = ['fa fa-expand', 'fa fa-compress'];
        this.expandButtonClass = this.fullScreenButtons[0];
        this.fullScreenTitle = 'Full Screen';
        this.minusButton = 'fa fa-minus mr-sm';
        this.plusButton = 'fa fa-plus mr-sm';
        this.mapPanel = this.minusButton;
    }
    DataMapViewerComponent.prototype.featureTablePanelClickMeter = function () {
        this.mapPanel = (this.mapPanel
            === this.plusButton) ? this.minusButton : this.plusButton;
    };
    DataMapViewerComponent.prototype.fullScreen = function () {
        var mapElement = $('#custom-map'), headerElement = $('#mapPanel'), bodyHeight = $('body')[0].clientHeight;
        if ($('#map-panel').hasClass('panelDefault')) {
            $('#map-panel').removeClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 112);
            this.expandButtonClass = this.fullScreenButtons[0];
            this.fullScreenTitle = 'Exit Full Screen';
        }
        else {
            $('#map-panel').addClass("panelDefault");
            $('.layout-fixed .wrapper .topnavbar-wrapper').css('z-index', 101);
            this.expandButtonClass = this.fullScreenButtons[1];
            this.fullScreenTitle = 'Full Screen';
        }
        if ($('#mapContent').hasClass('panel-fullscreen')) {
            $('#mapContent').removeClass("panel-fullscreen");
            $('body').css('overflow-y', 'auto');
        }
        else {
            $('#mapContent').addClass("panel-fullscreen");
            $('body').css('overflow-y', 'hidden');
        }
        if (mapElement[0].clientHeight + headerElement[0].clientHeight < bodyHeight - 20) {
            mapElement.css('height', (bodyHeight - headerElement[0].clientHeight - 20) + 'px');
        }
        else {
            mapElement.css('height', '500px');
        }
    };
    return DataMapViewerComponent;
}());
DataMapViewerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/dataMapViewer/dataMapViewer/dataMapViewer.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DataMapViewerComponent);

//# sourceMappingURL=dataMapViewer.component.js.map

/***/ })

});
//# sourceMappingURL=dataMapViewer.module.chunk.js.map