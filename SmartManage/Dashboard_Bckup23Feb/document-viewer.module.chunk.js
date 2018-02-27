webpackJsonp(["document-viewer.module"],{

/***/ "../../../../../src/app/routes/document-viewer/document-viewer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"document-repository-module\">\n  <div class=\"row page-header\">\n    <div class=\"col-12\">\n      <h4>Reports</h4>\n    </div>\n  </div>\n\n  <div class=\"page-content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"panel map-panel\">\n          <div class=\"panel-heading\">\n            <span class=\"panel-title\">Feeder Reports</span>\n          </div>\n\n          <div class=\"panel-body\">\n            <div *ngIf=\"isLoading\" class=\"text-center\">\n              <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n              <span class=\"sr-only\">Loading...</span>\n            </div>\n            <div *ngIf=\"showDocsTable\" class=\"text-right padding-bottom-10\">\n              <button class=\"btn btn-primary\" (click)=\"showFolderTable()\">\n                <i class=\"fa fa-arrow-left\"></i> Back</button>\n            </div>\n            <table *ngIf=\"!isLoading && !showDocsTable\">\n              <thead>\n                <th>\n                  Name\n                </th>\n                <th>\n                  Last Modified\n                </th>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let item of reports\">\n                  <td>\n                    <span class=\"folder-item\" (click)=\"onFolderSelect(item);\">\n                      <span class=\"icon-folder\">\n                      </span>\n                      {{item.folderName}}\n                    </span>\n                  </td>\n                  <td>\n                    {{item.lastModified | date: 'MM/dd/yyyy hh:mm:ss a'}}\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <table *ngIf=\"showDocsTable\">\n              <thead>\n                <th>Name</th>\n                <th>Last Modified</th>\n                <th>Download</th>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let item of reportDocuments\">\n                  <td>\n                    <span class=\"text-green\" *ngIf=\"item.fileType === 'XLSX' || item.fileType === 'CSV'\">\n                      <i class=\"fa fa-file-excel-o\"></i>\n                    </span>\n                    <span class=\"text-primary\" *ngIf=\"item.fileType === 'WORD'\">\n                      <i class=\"fa fa-file-word-o\"></i>\n                    </span>\n                    <span class=\"paddling-left-5\">{{item.fileName}}</span>\n                  </td>\n                  <td>\n                    {{item.lastModified | date: 'MM-dd-yyyy hh:mm:ss a'}}\n                  </td>\n                  <td>\n                    <a class=\"btn btn-xs\" [href]=\"'./'+item.url\">\n                      <i class=\"fa fa-download\"></i>\n                    </a>\n                  </td>\n\n                </tr>\n              </tbody>\n            </table>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/routes/document-viewer/document-viewer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".page-header {\n  padding: 0 20px;\n  margin: 0 -20px;\n  border-bottom: 1px solid lightgray; }\n\n.page-content {\n  margin-top: 10px;\n  margin-bottom: 10px; }\n\n.panel {\n  border: 1px solid lightgray;\n  margin: 2rem 0 0 0 !important; }\n\n.panel-heading {\n  border-bottom: 1px solid lightgray !important;\n  background: rgba(197, 196, 196, 0.2); }\n\n.padding-x-0 {\n  padding-left: 0 !important;\n  padding-right: 0 !important; }\n\n.padding-y-10 {\n  padding-top: 10px;\n  padding-bottom: 10px; }\n\n.padding-bottom-10 {\n  padding-bottom: 10px; }\n\n.paddling-left-5 {\n  padding-left: 5px; }\n\ntable {\n  width: 100%;\n  border: 1px solid lightgray; }\n\ntable > thead {\n  border-bottom: 1px solid lightgray; }\n\ntable > thead th,\ntable > tbody td {\n  padding: 10px 10px;\n  border-bottom: 1px solid lightgray; }\n\n.table-pager {\n  padding: 10px; }\n\n.table-pager > div {\n  display: inline-block; }\n\n.pager-items {\n  float: right; }\n\n.panel-body {\n  overflow-y: auto;\n  max-height: 460px; }\n\n.folder-item {\n  cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/routes/document-viewer/document-viewer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentViewerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__document_viewer_service__ = __webpack_require__("../../../../../src/app/routes/document-viewer/document-viewer.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocumentViewerComponent = (function () {
    function DocumentViewerComponent(_docService) {
        this._docService = _docService;
        this.reports = [];
        this.isLoading = true;
        this.reportDocuments = [];
        this.showDocsTable = false;
    }
    DocumentViewerComponent.prototype.ngOnInit = function () {
        this.getReports();
    };
    DocumentViewerComponent.prototype.getReports = function () {
        var _this = this;
        this.isLoading = true;
        this._docService.getDocumentReports().subscribe(function (res) {
            _this.reports = res.feederReports;
            _this.isLoading = false;
        });
    };
    DocumentViewerComponent.prototype.onFolderSelect = function (selectedFolder) {
        this.reportDocuments = this.reports.filter(function (x) { return x.folderName === selectedFolder.folderName; })[0].files;
        this.showDocsTable = true;
    };
    DocumentViewerComponent.prototype.showFolderTable = function () {
        this.showDocsTable = false;
    };
    DocumentViewerComponent.prototype.downloadFile = function (item) {
        this._docService.getFile('assets/data/Reports/Bharath Konaganti.doc').subscribe(function (res) {
            var blob = new Blob(res);
        });
    };
    return DocumentViewerComponent;
}());
DocumentViewerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-document-viewer',
        template: __webpack_require__("../../../../../src/app/routes/document-viewer/document-viewer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/routes/document-viewer/document-viewer.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__document_viewer_service__["a" /* DocumentViewerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__document_viewer_service__["a" /* DocumentViewerService */]) === "function" && _a || Object])
], DocumentViewerComponent);

var _a;
//# sourceMappingURL=document-viewer.component.js.map

/***/ }),

/***/ "../../../../../src/app/routes/document-viewer/document-viewer.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentViewerModule", function() { return DocumentViewerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__document_viewer_component__ = __webpack_require__("../../../../../src/app/routes/document-viewer/document-viewer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__document_viewer_service__ = __webpack_require__("../../../../../src/app/routes/document-viewer/document-viewer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DocumentViewerModule = (function () {
    function DocumentViewerModule() {
    }
    return DocumentViewerModule;
}());
DocumentViewerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild([
                {
                    path: '', redirectTo: 'feeder-reports', pathMatch: 'full'
                },
                {
                    path: 'feeder-reports', component: __WEBPACK_IMPORTED_MODULE_2__document_viewer_component__["a" /* DocumentViewerComponent */]
                }
            ])
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__document_viewer_component__["a" /* DocumentViewerComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__document_viewer_service__["a" /* DocumentViewerService */]]
    })
], DocumentViewerModule);

//# sourceMappingURL=document-viewer.module.js.map

/***/ }),

/***/ "../../../../../src/app/routes/document-viewer/document-viewer.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentViewerService; });
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


var DocumentViewerService = (function () {
    function DocumentViewerService(_http) {
        this._http = _http;
    }
    DocumentViewerService.prototype.getDocumentReports = function () {
        return this._http.get('./assets/data/feeder-reports.json');
    };
    DocumentViewerService.prototype.getFile = function (url) {
        return this._http.get(url);
    };
    return DocumentViewerService;
}());
DocumentViewerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], DocumentViewerService);

var _a;
//# sourceMappingURL=document-viewer.service.js.map

/***/ })

});
//# sourceMappingURL=document-viewer.module.chunk.js.map