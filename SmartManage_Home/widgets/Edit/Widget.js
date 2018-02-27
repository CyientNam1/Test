///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2016 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/i18n!esri/nls/jsapi',
    'dojo/on',
    'dojo/query',
    'dojo/json',
    'dojo/Deferred',
    'dojo/aspect',
    'dojo/promise/all',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/WidgetManager',
    'jimu/BaseWidget',
    'jimu/MapManager',
    'jimu/LayerInfos/LayerInfos',
    'jimu/dijit/LoadingShelter',
    'jimu/utils',
    'jimu/portalUrlUtils',
    'jimu/portalUtils',
    'jimu/SelectionManager',
    'jimu/Role',
    'esri/undoManager',
    'esri/dijit/editing/Editor',
    'esri/dijit/Popup',
    "esri/dijit/editing/TemplatePicker",
    "esri/map",
    "esri/geometry/Extent",
    'esri/graphic',
    "esri/Color",
    "esri/tasks/GeometryService",
	"esri/tasks/ProjectParameters", 
    "esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/webMercatorUtils",
    "esri/geometry/geometryEngine",
    "esri/renderers/jsonUtils",
    'esri/layers/FeatureLayer',
    "esri/tasks/query",
    "dijit/form/Button",
    "./utils",
    './FilterEditor',
    './RelatedRecordsEditor',
    "dijit/Dialog",
    "dojo/dnd/Moveable"
],
    function (declare, lang, array, html, esriBundle, on, query, Json, Deferred, aspect, all,
        _WidgetsInTemplateMixin, WidgetManager, BaseWidget, MapManager, LayerInfos, LoadingShelter,
        jimuUtils, portalUrlUtils, portalUtils, SelectionManager, Role, undoManager, Editor, Popup, TemplatePicker, map,
        Extent, Graphic, Color, GeometryService, ProjectParameters, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Point, Polygon, webMercatorUtils, geometryEngine, rendererJsonUtils,  FeatureLayer, Query, Button, editUtils, FilterEditor, RelatedRecordsEditor, Dialog, Moveable) {
        return declare([BaseWidget, _WidgetsInTemplateMixin], {
            name: 'Edit',
            baseClass: 'jimu-widget-edit',
            editor: null,
            _defaultStartStr: "",
            _defaultAddPointStr: "",
            _mapInfoStorage: null,
            _jimuLayerInfos: null,
            editPopup: null,
            _configEditor: null,
            _layerObjectsParaForTempaltePicker: null,
            _createOverDef: null,
            _releaseEventArrayAfterActive: null,
            _releaseEventArrayAfterClose: null,
            _canCreateLayersAreAllInvisibleFlag: null,
            _layerInfoParamArrayUseForRervertRenderre: null,
            layerInfosParam: null,
            tableInfosParam: null,
            layerInfosParamClone: null,
            tableInfosParamClone: null,
            _tableInfoParamDef: null,
            _hasEditPrivilege: null,
            Loginusername: null,
            query: null,
            selectedFeats:null,
            layerUrls : null,
            maps:null,
            gsvc: null,
            featsCnt : null,
            featsSelCnt :null,
            selectedLayerNames:null,
            _lyrExist:null,
            //union1:null,   
            startup: function () {

                this.inherited(arguments);
                Loginusername = sessionStorage.getItem('loginUser');
                 queryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/WFM_AOI_XCELADB/MapServer/0");
                this.editPopup = new Popup(null, html.create("div", { "class": "jimu-widget-edit-infoWindow" },
                    null,
                    this.map.root));
              
                this.loading = new LoadingShelter({

                    hidden: true
                });
                this.loading.placeAt(this.domNode);
                this.editPopup.dockEnabled = true;
                maps = this.map;
                this.featsCnt = [];
                this.featsSelCnt = [];
                this.featsCnt.push("Test");
                this.featsSelCnt.push("Test");
                sessionStorage.setItem('selectedFID', "null");
                gsvc = new GeometryService(this.config.editor.geomSeviceUrl);
                //  this.openWidgetById('widgets_PhotoViewer_Widget_43').then(lang.hitch(this, function (widget) { }));
                
            },

            _init: function () {
                this._mapInfoStorage = {
                    resetInfoWindow: null,
                    snappingTolerance: null,
                    editorATIonLayerSelectionChange: null
                };
                maps = this.map;
                this._editorMapClickHandlers = [];
                this._layerObjectsParaForTempaltePicker = [];
                this._configEditor = lang.clone(this.config.editor);
                this._releaseEventArrayAfterActive = [];
                this._releaseEventArrayAfterClose = [];
                this._canCreateLayersAreAllInvisibleFlag = false;
                this._layerInfoParamArrayUseForRervertRenderre = [];
                this._createOverDef = new Deferred();
                this._tableInfoParamDef = new Deferred();
                
                this.layerUrls = {};
                //this.layerUrls = {"Anchor Guy":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_ELECTRIC_XCELADB/FeatureServer/0","Electric XY":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_REF_XCELADB/FeatureServer/22","Lot Centroid":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_ELECTRIC_XCELADB/FeatureServer/9","Pole":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_ELECTRIC_XCELADB/FeatureServer/19","Primary Structure Node":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_REF_XCELADB/FeatureServer/4","Secondary Structure Node":"https://apigateway.cyient-fiops.com/server/rest/services/XCELADB/XCEL_TEST_REF_XCELADB/FeatureServer/6"};
                
                this.selectedFeats = {};
                this.selectedLayerNames = [];
                this._lyrExist = false;
                this.getLayerIdUrl();
            },
            getLayerIdUrl :function()
            {
                for(var ll = 0; ll < this.map.itemInfo.itemData.operationalLayers.length; ll++){
                    this.layerUrls[this.map.itemInfo.itemData.operationalLayers[ll].title] = this.map.itemInfo.itemData.operationalLayers[ll].url;
                }
                //sessionStorage.setItem('layerIdsUrl', JSON.stringify(this.this.layerUrls));
            },
            
            _initEditPrivilege: function (user) {

                this._hasEditPrivilege = true;

                if (user) {
                    var userRole = new Role({
                        id: (user.roleId) ? user.roleId : user.role,
                        role: user.role
                    });
                    if (user.privileges) {
                        userRole.setPrivileges(user.privileges);
                    }

                    this._hasEditPrivilege = userRole.canEditFeatures();

                }
                return this._hasEditPrivilege;

            },
            showDialog: function (title, content) {
                var myDialog = new Dialog({
                    title: "Edit functionatlity access",
                    content: "Your account does not have permission to create or modify data. Grid is assigned to another User",
                    style: "width: 300px"
                });
                myDialog.show();
            },
            NojobDialog:function (title, content) {
                var myDialog = new Dialog({
                    title: "Edit functionatlity access",
                    content: "You dont have any Jobs to edit data.",
                    style: "width: 300px"
                });
                myDialog.show();
            },
            
             DeleteDialog: function (title, content) {
                var myDialog = new Dialog({
                    title: "Delete",
                    content: "You are trying to delte this feature. if dont want please do Undo",
                    style: "width: 300px"
                });
                myDialog.show();
            },
            onOpen: function () {

                var userDef = new Deferred();
                var portal = portalUtils.getPortal(window.portalUrl);
                portal.getUser().then(lang.hitch(this, function (user) {
                    userDef.resolve(user);
                }), lang.hitch(this, function () {
                    userDef.resolve(null);
                }));

                // beginEditingByFeatures can be called from outside,
                // so _init must be called before userDef resolved.
                this._init();
             

                userDef.then(lang.hitch(this, function (user) {

                      this._initEditPrivilege(user);
                     
                      var query = new esri.tasks.Query();
                      query.returnGeometry = false;                     
                      query.where = "WFM.JTX_JOBS.ASSIGNED_TO = '" + Loginusername + "'";
                      query.outFields = ["*"];
                      queryTask.execute(query, lang.hitch(this, function(resultfeat) {

                        var features = resultfeat.features;

                        if (features.length == 0) {
                            this._hasEditPrivilege = false;
                            //alert("Your account does not have permission to create or modify data/You dont have any jobs to edit");
                            this.NojobDialog("Heading ", "Content.");
                            this.editWidgetTitle.innerHTML = window.jimuNls.noEditPrivileges;
                            widgetId = this.widgetManager.activeWidget.domNode.id
                            WidgetManager.getInstance().closeWidget(widgetId);
                            return;
                        } else {
                            this._initEditPrivilege(user);
                        }

                    }));

                    if (!this._hasEditPrivilege) {
                      this.editWidgetTitle.innerHTML = window.jimuNls.noEditPrivileges;
                      return;
                    }

                    this._jimuLayerInfos = LayerInfos.getInstanceSync(this.map, this.map.itemInfo);
                    var timeoutValue;
                    if (this.appConfig.theme.name === "BoxTheme") {
                        timeoutValue = 1050;
                        this.loading.show();
                    } else {
                        timeoutValue = 1;
                    }
                    setTimeout(lang.hitch(this, function () {
                        if (!this.loading.hidden) {
                            this.loading.hide();
                        }
                        this.widgetManager.activateWidget(this);
                        this._createEditor();
                    }), timeoutValue);

                    //prepare tableInfosParam data for relatedRecordsEditor
                    this._getTableInfosParam().then(lang.hitch(this, function (tableInfosParam) {
                        this.tableInfosParam = tableInfosParam;
                        this.tableInfosParamClone = this._cloneLayerOrTableInfosParam(this.tableInfosParam);
                        this._tableInfoParamDef.resolve();
                    }));
                }));


            },

            /*******************************
             * Public methods
             * *****************************/

            beginEditingByFeatures: function (features, featureLayer) {
                // features probably is empty.
                if (!featureLayer) {
                    return;
                }

                var firstFeaturePoint = null;
                var firstFeature = features[0];
                var firstFeatureGeometry = (firstFeature && firstFeature.geometry) ||
                    (featureLayer._wabProperties &&
                        featureLayer._wabProperties.popupInfo.originalFeature.geometry);
                if (firstFeatureGeometry) {
                    if (firstFeatureGeometry.type === 'point') {

                        firstFeaturePoint = firstFeatureGeometry;
                    } else {

                        firstFeaturePoint = firstFeatureGeometry.getExtent().getCenter();
                    }
                }

                this._createOverDef.then(lang.hitch(this, function () {
                    // active if state is deactive
                    if (this.state !== 'active') {
                        this.widgetManager.activateWidget(this);
                    }

                    // clear selection for all featureLayers.
                    array.forEach(this._jimuLayerInfos.getLayerInfoArray(), function (jimuLayerInfo) {
                        if (jimuLayerInfo.layerObject && jimuLayerInfo.layerObject.clearSelection) {
                            SelectionManager.getInstance().clearSelection(jimuLayerInfo.layerObject);
                        }
                    }, this);

                    if (firstFeature && firstFeature.geometry) {
                        // var query = new Query();
                        // query.where = prepareWhereExpression();
                        // featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, lang.hitch(this, function(features) {
                        // }));
                        SelectionManager.getInstance().setSelection(featureLayer, features).then(lang.hitch(this, function () {
                            var selectedFeatures = featureLayer.getSelectedFeatures();
                            this.editor._updatePopupButtons(selectedFeatures);
                            this.editor._onEditFeature(selectedFeatures, firstFeaturePoint);

                        }));
                    } else {
                        // features without geometry
                        this.editPopup.show(firstFeaturePoint);
                        /*
                        var popupTitle;
                        var featuresCount = features.length;
                        this.editor._updatePopupButtons(features);
                        if(featuresCount === 1) {
                          popupTitle = featureLayer.name;
                        } else {
                          popupTitle = "(1 of " + featuresCount + ")";
                        }
                        this.editPopup.setTitle(popupTitle);
                        */
                        var originalFeature =
                            lang.getObject('_wabProperties.popupInfo.originalFeature', false, featureLayer);
                        var operationDataFromPopup =
                            lang.getObject('_wabProperties.popupInfo.operationDataForListRelatedRecords', false, featureLayer);
                        this._createRelatedRecordsEditor(originalFeature).then(lang.hitch(this, function () {
                            if (!operationDataFromPopup && firstFeature) {
                                // show showInspector
                                this._relatedRecordsEditor.showInspector(this._relatedRecordsEditor._createOperationData(
                                    null,
                                    null,
                                    this._jimuLayerInfos.getTableInfoById(featureLayer.id),
                                    firstFeature));
                            } else {
                                //show relatedRecords
                                this._relatedRecordsEditor.showRelatedRecords(this._relatedRecordsEditor._createOperationData(
                                    operationDataFromPopup.feature,
                                    operationDataFromPopup.oriJimuLayerInfo,
                                    operationDataFromPopup.destJimuLayerInfo
                                ));
                            }
                        }));
                    }
                  
                }));

                /*
                function prepareWhereExpression() {
                  var endMark;
                  var whereExpression = " ";
                  array.forEach(features, function(feature, index) {
                    if(index === features.length - 1) {
                      endMark = " ";
                    } else {
                      endMark = " OR ";
                    }
                    whereExpression += featureLayer.objectIdField + " = " +
                                       feature.attributes[featureLayer.objectIdField] +
                                       endMark;
                  }, this);
                  return whereExpression;
                }
                */
            },



            /*******************************
             * Methods for control popup
             *******************************/
            onActive: function () {
                if (this._hasEditPrivilege) {
                    this.disableWebMapPopup();
                    this._bindEventAfterActive();
                }
            },

            onDeActive: function () {

                if (this._hasEditPrivilege) {
                    this.enableWebMapPopup();
                    this._releaseEventAfterActive();
                }
            },

            disableWebMapPopup: function () {
                var mapManager = MapManager.getInstance();
                mapManager.disableWebMapPopup();
                // hide map's infoWindow
                //this.map.infoWindow.hide();
                // instead of map's infowindow by editPopup
                this.map.setInfoWindow(this.editPopup);
                this._enableMapClickHandler();

                // instead of Mapmanager.resetInfoWindow by self resetInfoWindow
                if (this._mapInfoStorage.resetInfoWindow === null) {
                    this._mapInfoStorage.resetInfoWindow = mapManager.resetInfoWindow;
                    this.own(on(this.map.infoWindow, "show", lang.hitch(this, function () {
                        if (window.appInfo.isRunInMobile) {
                            this.map.infoWindow.maximize();
                            setTimeout(lang.hitch(this, function () {
                                // cannot add class 'esriPopupMaximized' while calling maximize() immediately after call show().
                                html.addClass(this.editPopup.domNode, 'esriPopupMaximized');
                            }), 1);
                        }
                    })));
                }
                mapManager.resetInfoWindow = lang.hitch(this, function () { });

                // backup map snappingTolerance and reset it.
                if (this.map.snappingManager && this._configEditor.snappingTolerance !== undefined) {
                    this._mapInfoStorage.snappingTolerance = this.map.snappingManager.tolerance;
                    // default value is 15 pixels, compatible with old version app.
                    this.map.snappingManager.tolerance = this._configEditor.snappingTolerance;
                }
            },

            enableWebMapPopup: function () {
                var mapManager = MapManager.getInstance();
                var mapInfoWindow = mapManager.getMapInfoWindow();
                // revert restInfoWindow when close widget.
                if (this._mapInfoStorage.resetInfoWindow) {
                    this.map.setInfoWindow(mapInfoWindow.bigScreen);
                    mapManager.isMobileInfoWindow = false;

                    mapManager.resetInfoWindow =
                        lang.hitch(mapManager, this._mapInfoStorage.resetInfoWindow);
                    this._mapInfoStorage.resetInfoWindow = null;
                    mapManager.resetInfoWindow();
                    this._disableMapClickHandler();
                    // hide popup and delete selection
                    //this.editPopup.hide();
                    // this.editor._clearSelection();
                    // recall enableWebMap
                    mapManager.enableWebMapPopup();
                }
                // revert map snappingTolerance.
                if (this.map.snappingManager && this._mapInfoStorage.snappingTolerance !== null) {
                    this.map.snappingManager.tolerance = this._mapInfoStorage.snappingTolerance;
                }
            },

            _enableMapClickHandler: function () {
                if (this.editor) {
                    this._editorMapClickHandlers.push(this.editor._mapClickHandler);
                    this.editor._enableMapClickHandler();
                    this._editorMapClickHandlers.push(this.editor._mapClickHandler);
                }
            },

            _disableMapClickHandler: function () {
                if (this.editor) {
                    this.editor._disableMapClickHandler();
                    array.forEach(this._editorMapClickHandlers, function (editorMapClickHandler) {
                        if (editorMapClickHandler && editorMapClickHandler.remove) {
                            editorMapClickHandler.remove();
                        }
                    }, this);
                    this._editorMapClickHandlers = [];
                }
            },

            /***************************************
             * Methods for data handle.
             ***************************************/

            _cloneLayerOrTableInfosParam: function (layerOrTableInfosParam) {
                var layerOrTableInfosParamClone = [];
                array.forEach(layerOrTableInfosParam, function (layerOrTableInfo) {
                    var featureLayerBK = layerOrTableInfo.featureLayer;
                    layerOrTableInfo.featureLayer = null;
                    var newLayerOrTableInfo = lang.clone(layerOrTableInfo);
                    newLayerOrTableInfo.featureLayer = featureLayerBK;
                    layerOrTableInfo.featureLayer = featureLayerBK;
                    layerOrTableInfosParamClone.push(newLayerOrTableInfo);
                }, this);
                return layerOrTableInfosParamClone;
            },

            /***************************************
             * Methods for prepare to create Editor.
             ***************************************/
            _getDefaultFieldInfos: function (layerId) {
                // summary:
                //  filter webmap fieldInfos.
                // description:
                //   return null if fieldInfos has not been configured in webmap.
                var fieldInfos = editUtils.getFieldInfosFromWebmap(layerId, this._jimuLayerInfos);
                if (fieldInfos) {
                    fieldInfos = array.filter(fieldInfos, function (fieldInfo) {
                        return fieldInfo.visible || fieldInfo.isEditable;
                    });
                }
                return fieldInfos;
            },


            _getDefaultLayerInfoById: function (layerId) {
                var fieldInfos;
                var layerInfo = {
                    featureLayer: {}
                };
                layerInfo.featureLayer.id = layerId;
                layerInfo.disableGeometryUpdate = false;
                fieldInfos = this._getDefaultFieldInfos(layerId);
                //If nothing is specified all fields, except the ObjectId and GlobalId are displayed.
                if (fieldInfos && fieldInfos.length > 0) {
                    layerInfo.fieldInfos = fieldInfos;
                }
                return layerInfo;
            },

            _getDefaultTableInfos: function () {
                var defaultTableInfos = [];
                var tableInfoArray = this._jimuLayerInfos.getTableInfoArray();
                array.forEach(tableInfoArray, function (tableInfo) {
                    var defaultTableInfo = this._getDefaultLayerInfoById(tableInfo.id);
                    defaultTableInfos.push(defaultTableInfo);
                }, this);
                return defaultTableInfos;
            },

            _getDefaultLayerInfos: function () {
                var defaultLayerInfos = [];
                for (var i = this.map.graphicsLayerIds.length - 1; i >= 0; i--) {
                    var layerObject = this.map.getLayer(this.map.graphicsLayerIds[i]);
                    if (layerObject.type === "Feature Layer" && layerObject.url) {
                        /*
                        var layerInfo = {
                          featureLayer: {}
                        };
                        layerInfo.featureLayer.id = layerObject.id;
                        layerInfo.disableGeometryUpdate = false;
                        fieldInfos = this._getDefaultFieldInfos(layerObject.id);
                        //If nothing is specified all fields, except the ObjectId and GlobalId are displayed.
                        if(fieldInfos && fieldInfos.length > 0) {
                          layerInfo.fieldInfos = fieldInfos;
                        }
                        */
                        var layerInfo = this._getDefaultLayerInfoById(layerObject.id);
                        defaultLayerInfos.push(layerInfo);
                    }
                }
                return defaultLayerInfos;
            },

            _converConfiguredLayerInfos: function (layerInfos) {
                array.forEach(layerInfos, function (layerInfo) {
                    // convert layerInfos to compatible with old version
                    if (!layerInfo.featureLayer.id && layerInfo.featureLayer.url) {
                        var layerObject = getLayerObjectFromMapByUrl(this.map, layerInfo.featureLayer.url);
                        if (layerObject) {
                            layerInfo.featureLayer.id = layerObject.id;
                        }
                    }

                    // convert fieldInfos
                    var newFieldInfos = [];
                    var webmapFieldInfos =
                        editUtils.getFieldInfosFromWebmap(layerInfo.featureLayer.id, this._jimuLayerInfos);
                    array.forEach(layerInfo.fieldInfos, function (fieldInfo) {
                        // compitible with old version of config,
                        // to decide which field will display in the inspector.
                        var webmapFieldInfo = getFieldInfoFromWebmapFieldInfos(webmapFieldInfos, fieldInfo);
                        if (fieldInfo.visible === undefined) {
                            // compatible with old version fieldInfo that does not defined
                            // the visible attribute.
                            if (webmapFieldInfo) {
                                if (webmapFieldInfo.isEditable ||
                                    webmapFieldInfo.isEditableSettingInWebmap ||
                                    webmapFieldInfo.visible) {
                                    newFieldInfos.push(webmapFieldInfo);
                                }
                            } else {
                                newFieldInfos.push(fieldInfo);
                            }
                        } else {
                            // the fieldInfo has defined the visble attribute(since online4.1).
                            if (fieldInfo.visible || fieldInfo.isEditable) {
                                //push to newFieldInfos
                                if (webmapFieldInfo) {
                                    newFieldInfos.push(webmapFieldInfo);
                                } else {
                                    newFieldInfos.push(fieldInfo);
                                }
                            }
                        }
                    }, this);

                    if (newFieldInfos.length !== 0) {
                        layerInfo.fieldInfos = newFieldInfos;
                    }
                }, this);
                return layerInfos;

                function getFieldInfoFromWebmapFieldInfos(webmapFieldInfos, fieldInfo) {
                    var resultFieldInfo = null;
                    if (webmapFieldInfos) {
                        for (var i = 0; i < webmapFieldInfos.length; i++) {
                            if (fieldInfo.fieldName === webmapFieldInfos[i].fieldName) {
                                webmapFieldInfos[i].label = fieldInfo.label;
                                webmapFieldInfos[i].isEditableSettingInWebmap = webmapFieldInfos[i].isEditable;
                                webmapFieldInfos[i].isEditable = fieldInfo.isEditable;
                                resultFieldInfo = webmapFieldInfos[i];
                                // resultFieldInfo.label = fieldInfo.label;
                                // resultFieldInfo.isEditableSettingInWebmap = webmapFieldInfos[i].isEditable;
                                // resultFieldInfo.isEditable = fieldInfo.isEditable;
                                break;
                            }
                        }
                    }
                    return resultFieldInfo;
                }

                function getLayerObjectFromMapByUrl(map, layerUrl) {
                    var resultLayerObject = null;
                    for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                        var layerObject = map.getLayer(map.graphicsLayerIds[i]);
                        if (layerObject &&
                            layerObject.url &&
                            (portalUrlUtils.removeProtocol(layerObject.url.toLowerCase()) ===
                                portalUrlUtils.removeProtocol(layerUrl.toLowerCase()))) {
                            resultLayerObject = layerObject;
                            break;
                        }
                    }
                    return resultLayerObject;
                }
            },

            _getLayerInfosParam: function () {
                var layerInfos;
                var resultLayerInfosParam = [];

                if (!this._configEditor.layerInfos) {
                    // configured in setting page and no layers checked.
                    layerInfos = [];
                } else if (this._configEditor.layerInfos.length > 0) {
                    // configured and has been checked.
                    layerInfos = this._converConfiguredLayerInfos(this._configEditor.layerInfos);
                } else {
                    // has not been configured.
                    layerInfos = this._getDefaultLayerInfos();
                }

                //according to conditions to filter
                array.forEach(layerInfos, function (layerInfo) {
                    var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
                    if (layerObject &&
                        layerObject.visible &&
                        layerObject.isEditable &&
                        layerObject.isEditable()) {
                        layerInfo.featureLayer = layerObject;
                        resultLayerInfosParam.push(layerInfo);
                    }

                    // update this._canCreateLayersAreAllInvisibleFlag
                    if (!this._canCreateLayersAreAllInvisibleFlag &&
                        layerObject &&
                        layerObject.isEditable &&
                        layerObject.isEditable() &&
                        layerObject.getEditCapabilities &&
                        layerObject.getEditCapabilities().canCreate &&
                        !layerObject.visible) {
                        this._canCreateLayersAreAllInvisibleFlag = true;
                    }
                }, this);
                this.layerInfosParam = resultLayerInfosParam;
                this.layerInfosParamClone = this._cloneLayerOrTableInfosParam(this.layerInfosParam);
                return resultLayerInfosParam;
            },

            _getTemplatePicker: function (layerInfos) {
                this._layerObjectsParaForTempaltePicker = [];

                array.forEach(layerInfos, function (layerInfo) {
                    if (layerInfo.featureLayer &&
                        layerInfo.featureLayer.getEditCapabilities &&
                        layerInfo.featureLayer.getEditCapabilities().canCreate) {
							array.forEach(layerInfo.featureLayer.types, function (type) {
                            if (type.templates[0].name.length < 3) {
                                type.templates[0].name = type.templates[0].name + " - " + layerInfo.featureLayer.name;
                            }
                        })
                        this._layerObjectsParaForTempaltePicker.push(layerInfo.featureLayer);
                    }
                }, this);

                // change string of templatePicker is empty
                this._defaultTempaltePickerEmpeyStr =
                    esriBundle.widgets.templatePicker.creationDisabled;
                if (this._canCreateLayersAreAllInvisibleFlag) {
                    esriBundle.widgets.templatePicker.creationDisabled =
                        this.nls.noCanCreateLayerAreCurrentlyVisible;
                }

                var bottomStyle = this._configEditor.toolbarVisible ? "" : "bottom: 0px";
                var topStyle = this._configEditor.useFilterEdit ? "top: 115px" : "top: 18px";
                var templatePicker = new TemplatePicker({
                    featureLayers: this._layerObjectsParaForTempaltePicker,
                    grouping: true,
                    rows: "auto",
                    columns: "auto",
                    style: bottomStyle + ";" + topStyle
                }, html.create("div", {}, this.domNode));
                templatePicker.startup();
                return templatePicker;
            },

            _getSettingsParam: function () {
                var settings = {
                    map: this.map,
                    createOptions: {
                        polygonDrawTools: [
                            Editor.CREATE_TOOL_ARROW,
                            Editor.CREATE_TOOL_AUTOCOMPLETE,
                            Editor.CREATE_TOOL_CIRCLE,
                            Editor.CREATE_TOOL_ELLIPSE,
                            Editor.CREATE_TOOL_RECTANGLE,
                            Editor.CREATE_TOOL_TRIANGLE,
                            Editor.CREATE_TOOL_POLYGON,
                            Editor.CREATE_TOOL_FREEHAND_POLYGON
                        ],
                        polylineDrawTools: [
                            Editor.CREATE_TOOL_POLYLINE,
                            Editor.CREATE_TOOL_FREEHAND_POLYLINE
                        ]
                    }
                };
                for (var attr in this._configEditor) {
                    settings[attr] = this._configEditor[attr];
                }
                settings.layerInfos = this._getLayerInfosParam();
                settings.templatePicker = this._getTemplatePicker(settings.layerInfos);
                // set popup tolerance
                if (this._configEditor.popupTolerance !== undefined) {
                    settings.singleSelectionTolerance = this._configEditor.popupTolerance;
                }

                return settings;
            },

            _createEditor: function () {
                var params = {
                    settings: this._getSettingsParam()
                };
                this._worksBeforeCreate(params.settings);
                this.editor = new Editor(params, html.create("div", {}, this.domNode));
                this.undomanager = new undoManager();
                this.editor.startup();
                this._worksAfterCreate(params.settings);
            },

            /***************************************
             * Methods for extra works
             ****************************************/
            _addButtonToInspector: function () {
                var closeButton = new Button({
                    label: this.nls.close,
                    "class": " atiButton closeButton"
                }, html.create("div"));

                html.place(closeButton.domNode,
                    this.editor.attributeInspector.deleteBtn.domNode,
                    "before");

                this.own(on(closeButton, 'click', lang.hitch(this, function () {
                    this.editPopup.hide();

                })));
                //var handle = on(attributeInspector, 'delete', lang.hitch(this, this.showDialog, operationData));

                this.own(on(this.editor.attributeInspector.deleteBtn, 'click', lang.hitch(this, function () {
                    this.DeleteDialog("Heading ", "Content.");
                })));

            },

            _addFilterEditor: function (settings) {
                if (this._configEditor.useFilterEdit) {
                    this._filterEditor = new FilterEditor({
                        _settings: settings,
                        _editWidget: this
                    }, html.create("div", {}, this.domNode));
                }
            },

            _worksBeforeCreate: function (settings) {
                // change string of mouse tooltip
                var additionStr = "<br/>" + "(" + this.nls.pressStr + "<b>" +
                    this.nls.ctrlStr + "</b> " + this.nls.snapStr + ")";
                this._defaultStartStr = esriBundle.toolbars.draw.start;
                this._defaultAddPointStr = esriBundle.toolbars.draw.addPoint;
                esriBundle.toolbars.draw.start =
                    esriBundle.toolbars.draw.start + additionStr;
                esriBundle.toolbars.draw.addPoint =
                    esriBundle.toolbars.draw.addPoint + additionStr;

                /*
                // hide label layer.
                var labelLayer = this.map.getLayer("labels");
                if(labelLayer) {
                  labelLayer.hide();
                }
                */

                // change render to service render if renderer has been changed.
                this._changeToServiceRenderer(settings);
            },

            _worksAfterCreate: function (settings) {
                // add close button to atiInspector
                this._addButtonToInspector();

                // disable delete button in the toolbar
                if (this._configEditor.toolbarVisible) {
                    this._disableDeleteBtnInToolbar();
                }

                //  domStyle.set("this.editPopup",{
                //     position:"absolute",
                //     top:"700px",
                //     left:"1200px"
                // });
                // resize editPopup
                this.editPopup.resize(500, 250);
                // update templatePicker for responsive.
                this.editor.templatePicker.update(true);
                // // reset default selectionSymbol that change by Editor dijit.
                // array.forEach(this.editor.settings.layerInfos, function(layerInfo) {
                //   layerInfo.featureLayer.setSelectionSymbol();
                // }, this);

                // add FilterEditor
                this._addFilterEditor(settings);

                // bind events after create.
                this._bindEventsAfterCreate(settings);
              
                // last calling of _worksAfterCreate.
                this._createOverDef.resolve();
            },

            _worksAfterClose: function () {
                esriBundle.toolbars.draw.start = this._defaultStartStr;
                esriBundle.toolbars.draw.addPoint = this._defaultAddPointStr;
                esriBundle.widgets.templatePicker.creationDisabled =
                    this._defaultTempaltePickerEmpeyStr;

                // show lable layer.
                var labelLayer = this.map.getLayer("labels");
                if (labelLayer) {
                    labelLayer.show();
                }

                // destroy filterEditor.
                if (this._filterEditor) {
                    this._filterEditor.destroy();
                }

                // revert renderer to layer renderer.
                this._revertToLayerRenderer();

                // release event after close
                this._releaseEventAfterClose();
            },


            _bindEventsAfterCreate: function (settings) {
                /*
                this.own(on(this.editor.editToolbar,
                      'graphic-move-start',
                      lang.hitch(this, this._onGraphicMoveStart)));
                */
               
                this.own(on(this.editor.editToolbar,
                    'graphic-move-stop',
                    lang.hitch(this, this._onGraphicMoveStop)));

                this.own(on(this.editor.editToolbar,
                    'activate',
                    lang.hitch(this, function (evt) {
                        if (evt.tool != 31) {
                            this.editor.editToolbar.activate(1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 13 | 14 | 15 | 16, evt.graphic);

                        }
                    })));


                // prepare for editing related records
                this.own(on(this.editor.attributeInspector,
                    'next',
                    lang.hitch(this, this._onNextOfEditorATI)));

                var handle = on(this.editPopup,
                    'show',
                    lang.hitch(this, this._onEditorPopupShow));

                
                this._releaseEventArrayAfterClose.push(handle);
                handle = on(this.editPopup,
                    'hide',
                    lang.hitch(this, this._onEditorPopupHide));
                this._releaseEventArrayAfterClose.push(handle);

                // listen selection change event for every layer.
                // use for control delete button.
                array.forEach(settings.layerInfos, function (layerInfo) {
                    layerInfo.featureLayer._selectionSymbol.size = 40;
                    handle = on(layerInfo.featureLayer,
                        'selection-complete',
                        lang.hitch(this, this._onLayerSelectionChange));
                    this._releaseEventArrayAfterClose.push(handle);
                }, this);
          
            },

            _releaseEventAfterClose: function () {
                array.forEach(this._releaseEventArrayAfterClose, function (handle) {
                    handle.remove();
                }, this);
                this._releaseEventArrayAfterClose = [];
            },

            _bindEventAfterActive: function () {
                var handle = aspect.before(this.map,
                    'onClick',
                    lang.hitch(this, this._beforeMapClick));
                this._releaseEventArrayAfterActive.push(handle);

            },

            _releaseEventAfterActive: function () {
                array.forEach(this._releaseEventArrayAfterActive, function (handle) {
                    handle.remove();
                }, this);
                this._releaseEventArrayAfterActive = [];
            },

            _changeToServiceRenderer: function (settings) {
                array.forEach(settings.layerInfos, function (layerInfo) {
                    if (!layerInfo.featureLayer._json) {
                        return;
                    }
                    var layerRenderer = layerInfo.featureLayer.renderer;
                    var layerRendererJson = layerRenderer.toJson();
                    var serviceDefJson = Json.parse(layerInfo.featureLayer._json);
                    var serviceRendererJson = serviceDefJson.drawingInfo.renderer;
                    if (!jimuUtils.isEqual(layerRendererJson, serviceRendererJson)) {
                        layerInfo._layerRenderer = layerRenderer;
                        this._layerInfoParamArrayUseForRervertRenderre.push(layerInfo);
                        layerInfo.featureLayer.setRenderer(rendererJsonUtils.fromJson(serviceRendererJson));
                        layerInfo.featureLayer.redraw();
                    }
                }, this);
            },

            _revertToLayerRenderer: function () {
                array.forEach(this._layerInfoParamArrayUseForRervertRenderre, function (layerInfo) {
                    if (layerInfo._layerRenderer) {
                        layerInfo.featureLayer.setRenderer(layerInfo._layerRenderer);
                        layerInfo.featureLayer.redraw();
                    }
                }, this);
                this._layerInfoParamArrayUseForRervertRenderre = [];
            },

            /*****************************
             * Methods for control graphic
             ****************************/
            _updateSelectedFeature: function (selectedFeature) {
                if (selectedFeature) {
                    var operation = selectedFeature.getLayer().applyEdits(null, [selectedFeature]);
                    this.undomanager.add(operation);
                    this.editor._clearSelection();
                }
            },

            _autoApplyEditWhenGeometryIsModified: function ( /*graphicMoveStopEvent*/) {
                var editToolbarCurrentState = this.editor.editToolbar.getCurrentState();
                var selectedFeature = editToolbarCurrentState && editToolbarCurrentState.graphic;

                // if( this._configEditor.autoApplyEditWhenGeometryIsMoved &&
                //   graphicMoveStopEvent &&
                //   graphicMoveStopEvent.target &&
                //   graphicMoveStopEvent.target._modified) {

                if (this._configEditor.autoApplyEditWhenGeometryIsMoved) {
                    if (this._checkStickyMoveTolerance()) {
                        //this._updateSelectedFeature(selectedFeature);
                    } else {
                        // not sure the geometry has been changed or not except for 'point'
                        if (editToolbarCurrentState.isModified && selectedFeature.geometry.type !== "point") {
                            //this._updateSelectedFeature(selectedFeature);

                        }
                    }
                }
            },

            _checkStickyMoveTolerance: function (geometry) {

                var isOut = true;
                var editToolbarCurrentState = this.editor.editToolbar.getCurrentState();
                var selectedFeature = editToolbarCurrentState && editToolbarCurrentState.graphic;
               
                if (selectedFeature) {
                    if (!this._isOutStickyMoveToleranceCheckedByMoveTrack(selectedFeature)) {
                        this._revertGraphicPosition(selectedFeature);
                        isOut = false;
                    }

                    // delete position record after checked sticky move.
                    delete selectedFeature._moveTrack;
                    delete selectedFeature._originalGeometryAtMoveStart;
                }
                return isOut;
                //      });


            },

            _isOutStickyMoveToleranceCheckedByOriginalGeometry: function (selectedFeature) {
                var referencePoint;
                var movedReferencePoint;
                var mapWidth;
                var tolerancePerPixel;
                var toleranceMapUnit;
                var toleranceExtent;
                var isOut = true;
                // init referencePoint and movedReferencePoint
                if (selectedFeature.geometry.type === 'point') {
                    referencePoint = selectedFeature._originalGeometryAtMoveStart;
                    movedReferencePoint = selectedFeature.geometry;
                } else {
                    if (selectedFeature.geometry.getExtent &&
                        selectedFeature._originalGeometryAtMoveStart.getExtent) {
                        referencePoint = selectedFeature._originalGeometryAtMoveStart.getExtent().getCenter();
                        movedReferencePoint = selectedFeature.geometry.getExtent().getCenter();
                    }
                }

                if (this._configEditor.stickyMoveTolerance &&
                    referencePoint &&
                    movedReferencePoint) {
                    mapWidth = this.map.extent.getWidth();
                    tolerancePerPixel = mapWidth / this.map.width;
                    toleranceMapUnit = this._configEditor.stickyMoveTolerance * tolerancePerPixel;
                    toleranceExtent = new Extent(0,
                        0,
                        toleranceMapUnit,
                        toleranceMapUnit,
                        selectedFeature.spatialReference);
                    toleranceExtent = toleranceExtent.centerAt(referencePoint);
                    if (toleranceExtent.contains(movedReferencePoint)) {
                        isOut = false;
                    }
                }
                return isOut;
            },

            _isOutStickyMoveToleranceCheckedByMoveTrack: function (selectedFeature) {
                var isOut = true;
                var mapWidth;
                var tolerancePerPixel;
                var toleranceMapUnit;
                var toleranceExtent;
                var moveTrack = selectedFeature._moveTrack;
                var movedReferencePoint;

                if (moveTrack) {
                    movedReferencePoint = new Point(moveTrack.x,
                        moveTrack.y,
                        selectedFeature.spatialReference);
                }

                if (this._configEditor.stickyMoveTolerance &&
                    movedReferencePoint) {
                    mapWidth = this.map.extent.getWidth();
                    tolerancePerPixel = mapWidth / this.map.width;
                    toleranceMapUnit = this._configEditor.stickyMoveTolerance * tolerancePerPixel;
                    toleranceExtent = new Extent(-toleranceMapUnit / 2, -toleranceMapUnit / 2,
                        toleranceMapUnit,
                        toleranceMapUnit,
                        selectedFeature.spatialReference);
                    if (toleranceExtent.contains(movedReferencePoint)) {
                        isOut = false;
                    }
                }
                return isOut;
            },

            _revertGraphicPosition: function (selectedFeature) {

                // according to original geometry to revert .
                /*
                if(selectedFeature._originalGeometryAtMoveStart) {
                  selectedFeature.geometry = selectedFeature._originalGeometryAtMoveStart;
                  delete selectedFeature._originalGeometryAtMoveStart;
                }
                */

                var moveTrack = selectedFeature._moveTrack;
                // according to move track to revert .
                if (moveTrack) {
                    switch (selectedFeature.geometry.type) {
                        case 'point':
                            selectedFeature.geometry.x -= moveTrack.x;
                            selectedFeature.geometry.y += moveTrack.y;
                            break;
                        case 'polygon':
                            array.forEach(selectedFeature.geometry.rings, function (ring) {
                                array.forEach(ring, function (point) {
                                    point[0] -= moveTrack.x;
                                    point[1] += moveTrack.y;
                                });
                            });
                            break;
                        case 'polyline':
                            array.forEach(selectedFeature.geometry.paths, function (path) {
                                array.forEach(path, function (point) {
                                    point[0] -= moveTrack.x;
                                    point[1] += moveTrack.y;
                                });
                            });
                            break;
                        case 'multiPoint':
                            array.forEach(selectedFeature.geometry.points, function (point) {
                                point[0] -= moveTrack.x;
                                point[1] += moveTrack.y;
                            });
                            break;
                        default:
                            return;
                    }

                    //hide editing assistance geometry when !autoApplyEditWhenGeometryIsMoved.
                    if (!this._configEditor.autoApplyEditWhenGeometryIsMoved) {
                        array.forEach(this.editor.editToolbar._getAffectedTools("MOVE"), function (tool) {
                            tool.suspend();
                        }, this);
                    }

                    if (selectedFeature.geometry.type === "point") {
                        this.editor._clearSelection();
                    }

                    selectedFeature.draw();
                }
            },

            _recordsSelectedFeatureInfoWhenMoveStart: function (moveStartEvent) {
                var selectedFeature = moveStartEvent && moveStartEvent.graphic;
                if (selectedFeature && selectedFeature.geometry) {
                    selectedFeature._originalGeometryAtMoveStart = lang.clone(selectedFeature.geometry);
                }
            },

            _recordsSelectedFeatureInfoWhenMoveStop: function (moveStopEvetn) {
                var selectedFeature = moveStopEvetn && moveStopEvetn.graphic;
                var transform = moveStopEvetn && moveStopEvetn.transform;
                var mapWidth = this.map.extent.getWidth();
                var lengthPerPixel = mapWidth / this.map.width;

                if (selectedFeature && transform) {
                    if (!selectedFeature._moveTrack) {
                        // the first move at graphic edit period.
                        selectedFeature._moveTrack = { x: 0, y: 0 };
                    }
                    selectedFeature._moveTrack.x += transform.dx * lengthPerPixel;
                    selectedFeature._moveTrack.y += transform.dy * lengthPerPixel;
                }
            },

            _getSelectionFeatuers: function () {
                var selectionFeatures = [];
                array.forEach(this.layerInfosParam, function (layerInfo) {
                    var selection = layerInfo.featureLayer.getSelectedFeatures();
                    selectionFeatures = selectionFeatures.concat(selection);
                });
                return selectionFeatures;
            },

            _canDeleteSelectionFeatures: function () {
                // return ture if all features can be deleted,
                // else return false.
                var canDeleteFeatures = true;
                var selectionFeatures = this._getSelectionFeatuers();
                if (selectionFeatures.length === 0) {
                    canDeleteFeatures = false;
                } else {
                    array.some(selectionFeatures, function (feature) {
                        var featureLayer = feature.getLayer && feature.getLayer();
                        if (!featureLayer ||
                            !featureLayer.getEditCapabilities({ feature: feature }).canDelete
                        ) {
                            canDeleteFeatures = false;
                            return true;
                        }
                    }, this);
                }

                return canDeleteFeatures;
            },

            /******************************************
             * Methods for prepare edit related records
             ******************************************/
            _createRelatedRecordsEditor: function (feature) {
                this.openWidgetById('widgets_PhotoViewerGirdWise_Widget_49').then(lang.hitch(this, function (widget) { }));
                if (!feature) {
                    return;
                }
                

                 var loggeduser = sessionStorage.getItem('loginUser');
                 var LoginRole = sessionStorage.getItem('loginuserrole');
                 
                if (feature) {
                    var selectedFID = feature.attributes.ID;
                    if (selectedFID == null || selectedFID == 0) {

                       
                        selectedfeatureurl = feature._graphicsLayer.url;
                        selectedfeatureobjectid = feature.attributes.OBJECTID
                        queryTask = new esri.tasks.QueryTask(selectedfeatureurl);
                        var query = new esri.tasks.Query();
                        query.returnGeometry = true;
                        query.outFields = ["*"];
                        query.where = "OBJECTID = " + selectedfeatureobjectid;
                        
                       
                        queryTask.execute(query, lang.hitch(this, function (resultfeat) {

                            var features = resultfeat.features;
                            // feature.attributes.ID = features[0].attributes.ID;
                            // selectedFID = feature.attributes.ID;
                            this.editor.attributeInspector._selection[0].attributes.ID = features[0].attributes.ID;
                             var UpdateFishnetJObid  = [];
                            var featureForUpdate = null;
                             var  landuseLineLayer  =  feature.getLayer();
                             var sel_feats =sessionStorage.getItem('selectedFeatures');          
                             
                            
                            if (LoginRole == 'CE'){
                                if(feature._layer.name =="QC FLAG" && features[0].attributes.ID != "" && features[0].attributes.ID !=null){
                               
                                if(this.featsCnt.length != 0 && this.featsSelCnt.length != 0){
                                    this.editPopup.hide();
                                    featureForUpdate = features[0];
                                    UpdateFishnetJObid.push(featureForUpdate);
                                    landuseLineLayer.applyEdits(null, null,UpdateFishnetJObid);
                                    landuseLineLayer.refresh();
                               
                                // if(LoginRole != "CE" && feature._sourceLayer.name == "QC FLAG"){
                                    //alert("you are not the access to create new flag");
                                    handle = on(this.editPopup,'hide', lang.hitch(this, this._onEditorPopupHide));
                                    this._releaseEventArrayAfterClose.push(handle);
                                    //}
                                     alert("select features");
                                return;
                             }
                             else   {
                                if(feature._layer.name =="QC FLAG" && features[0].attributes.ID != null  && features[0].attributes.ID != "" && features[0].attributes.ID)
                                
                                        var selected_feats = JSON.parse(sessionStorage.getItem('selectedFeatures')); 
                                        var keylist = Object.keys(selected_feats);
                                        var keyscount = keylist.length;
                                        featureForUpdate = features[0];
                                        featureForUpdate.attributes.FEEDERNAME = "GREE1443"; 
                                        
                                        var selLayers = "";
                                       
                                        for(var lyrs = 0;lyrs < keyscount; lyrs++){
                                            var name = keylist[lyrs];
                                            var lname = selected_feats[name] ;
                                            if(name in selected_feats){
                                                if(lyrs!= 0){
                                                        selLayers = selLayers + "||" + name + ":" + selected_feats[name];
                                                }
                                                    else{
                                                        selLayers = name + ":" + selected_feats[name];
                                                    }
                                            }
                                        }
                                        var qTask = new esri.tasks.QueryTask(this.config.editor.workGridUrl);
                                        var query_grd = new esri.tasks.Query();
                                        query_grd.returnGeometry = false;;
                                        query_grd.geometry = features[0].geometry;
                                        query.outFields = ["*"];
                                        query_grd.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                                        qTask.execute(query_grd, lang.hitch(this, function (resultgrids) {
                                            featureForUpdate.attributes.GRIDNAME = resultgrids.features[0].attributes.NAME;
                                            featureForUpdate.attributes.STATUS=1;
                                            featureForUpdate.attributes.SEVERITY=100;
                                            featureForUpdate.attributes.CATEGORY=30;
                                            featureForUpdate.attributes.REMARKS = selLayers;
                                            UpdateFishnetJObid.push(featureForUpdate);
                                            landuseLineLayer.applyEdits(null,UpdateFishnetJObid, null);
                                            landuseLineLayer.refresh();
                                            this.featsCnt.push(feature._layer.name);

                                            this.editor.attributeInspector._selection[0].attributes.STATUS=1;
                                            this.editor.attributeInspector._selection[0].attributes.SEVERITY=100;
                                            this.editor.attributeInspector._selection[0].attributes.CATEGORY=30;
                                             this.editor.attributeInspector.refresh();
                                        }));
                                }  
                            }
                            
                            }
                            else {
                                if(feature._layer.name =="QC FLAG" && features[0].attributes.ID != "" && features[0].attributes.ID !=null){
                               
                                    this.editPopup.hide();
                                    featureForUpdate = features[0];
                                    UpdateFishnetJObid.push(featureForUpdate);
                                    landuseLineLayer.applyEdits(null, null,UpdateFishnetJObid);
                                    landuseLineLayer.refresh();
                               
                                // if(LoginRole != "CE" && feature._sourceLayer.name == "QC FLAG"){
                                    //alert("you are not the access to create new flag");
                                    handle = on(this.editPopup,'hide', lang.hitch(this, this._onEditorPopupHide));
                                    this._releaseEventArrayAfterClose.push(handle);
                                    //}
                                     alert("you don't have access to place new flag features");
                                return;
                            }
                        }
                           this.editor.attributeInspector.refresh();
                        }));

                    }
                    else{
                         if(feature.getLayer().name == "QC FLAG"){

                             var feat_list ={};
                             
                             feat_list= feature.attributes.REMARKS;
                             if(feat_list == null){
                                  console.log("Related feature data is null");
                                  return;
                              }
                              maps.graphics.clear();
                              var split_layerlist = [];
                              if(feat_list.includes("||")){
                                split_layerlist = feat_list.split("||"); 
                              }
                            else{
                               split_layerlist = feat_list.split(":"); 
                            }

                             for (lyrNames in split_layerlist) {
                                 var lyrName = (split_layerlist[lyrNames]).split(":");
                                 
                                 var lyrUrl = this.layerUrls[lyrName[0]];
                                 var lyrIds = lyrName[1];

                                  var idList = "";
                                 var ids_cnt = [];
                                 if(lyrIds.includes(",")){
                                     ids_cnt = lyrIds.split(",")
                                 }
                                    else{
                                         ids_cnt.push(lyrIds);
                                    }

                                 for(ids =0; ids < ids_cnt.length ; ids++){
                                        if((ids_cnt.length - 1) == ids){
                                            idList += "ID = "+ ids_cnt[ids];
                                        }
                                        else{
                                                idList += "ID = " +ids_cnt[ids] + " or ";
                                        }
                                }
                                
                                 
                                    var flagTask = new esri.tasks.QueryTask(lyrUrl);
                                    var flagQuery = new esri.tasks.Query();
                                    flagQuery.returnGeometry = true;
                                    flagQuery.outFields = ["*"];
                                    //flagQuery.where = "ID = " +lyrIds;
                                     flagQuery.where = idList;
                                    flagTask.execute(flagQuery, function (resultfeat) {
                                        
                                        var spatialRef = new esri.SpatialReference({ wkid: 102100 });
                                        var polyExtent = resultfeat.features[0].geometry;
                                        var params = new ProjectParameters();
                                        params.geometries = [polyExtent];
                                        params.inSR = new esri.SpatialReference({ wkid: 26913});
                                        params.outSR = spatialRef;
                                        var point_symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 25, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 4), new Color([0, 255, 255, 0.4]));

                                        var symbol = new SimpleFillSymbol(
                                            SimpleFillSymbol.STYLE_SOLID,
                                            SimpleFillSymbol.STYLE_SOLID,
                                                new SimpleLineSymbol(
                                                SimpleLineSymbol.STYLE_SOLID,
                                                new Color([255, 0, 0, 0.65]), 2
                                                ),
                                                new Color([255, 0, 0, 0.35])
                                            );

                                        gsvc.project(params, function (convertedObj) {
                                                maps.graphics.add(new Graphic(convertedObj[0], point_symbol));
                                            }, function (errors) {
                                            alert(errors);
                                        });
                                    });

                             }

                            
                   
                  }
                    }
            //    var testlyr = new FeatureLayer("https://framework-dev.cyient-fiops.com/server/rest/services/Temp/test/FeatureServer/0");
            //    feature.attributes.ID = 233778509;
            //    feature.attributes.STATUS = 10;
            //    testlyr.applyEdits(null,[feature],null);

                    var selectedFIDType = feature._graphicsLayer.name;
                    sessionStorage.setItem('selectedFID', selectedFID);
                    sessionStorage.setItem('selectedFIDType', selectedFIDType);
                    var num = 0;
                    if (selectedFID) {
                        var type = typeof (selectedFID);
                        if (type != "number") {
                            if (selectedFID.indexOf("span") > -1) {
                                var newSele = selectedFID.replace(/^<span class="jimu-numeric-value">+/i, '');
                                var newSFID = newSele.replace(/<\/?span[^>]*>/g, "");
                                selectedFID = newSFID;
                            }
                        }
                        WidgetManager.getInstance().closeWidget('widgets_PhotoViewerGirdWise_Widget_49');
                        WidgetManager.getInstance().openWidget('widgets_PhotoViewerGirdWise_Widget_49');
                    }

                }

                // prepare loading shelter
                var loadingDomNode = html.create('div', { style: "position: relative" });
                html.place(loadingDomNode, this.editor.attributeInspector.domNode, "after");                      
                var loading = new LoadingShelter({}).placeAt(loadingDomNode);

                // get tableInfosParam
                return this._tableInfoParamDef.then(lang.hitch(this, function () {
                    try {
                        if (this._relatedRecordsEditor) {
                            this._relatedRecordsEditor.destroy();
                            this._relatedRecordsEditor = null;
                        }
                        // create relatedRecordsEditor
                        this._relatedRecordsEditor = new RelatedRecordsEditor({
                            originalFeature: feature,
                            editorATI: this.editor.attributeInspector,
                            tableInfosParam: this.layerInfosParamClone.concat(this.tableInfosParamClone),
                            nls: lang.mixin(lang.clone(this.nls), window.jimuNls.common)
                        });
                        loading.destroy();
                    } catch (err) {
                        //console.warn(err.message);
                        loading.destroy();
                        this._enableToAnswerEventForEditorATI();
                    }
                    return;
                }));
                   
            },

            _disableToAnswerEventForEditorATI: function () {
                // disable to answer onSelctionChange for editor ATI.
                if (!this._mapInfoStorage.editorATIonLayerSelectionChange) {
                    this._mapInfoStorage.editorATIonLayerSelectionChange =
                        this.editor.attributeInspector.onLayerSelectionChange;
                    this.editor.attributeInspector.onLayerSelectionChange = lang.hitch(this, function () { });
                }
            },

            _enableToAnswerEventForEditorATI: function () {
                // enable to answer onSelctionChange for editor ATI.
                if (this._mapInfoStorage.editorATIonLayerSelectionChange) {
                    this.editor.attributeInspector.onLayerSelectionChange =
                        lang.hitch(this.editor.attributeInspector, this._mapInfoStorage.editorATIonLayerSelectionChange);
                    this._mapInfoStorage.editorATIonLayerSelectionChange = null;
                }
            },

            _getTableInfosParam: function () {
                var tableInfos;
                var defs = [];
                var resultTableInfosParam = [];

                if (!this._configEditor.tableInfos) {
                    // configured in setting page and no layers checked.
                    tableInfos = [];
                } else if (this._configEditor.tableInfos.length > 0) {
                    // configured and has been checked.
                    tableInfos = this._converConfiguredLayerInfos(this._configEditor.tableInfos);
                } else {
                    // has not been configured.
                    tableInfos = this._getDefaultTableInfos();
                }

                array.forEach(tableInfos, function (tableInfo) {
                    var jimuTableInfo = this._jimuLayerInfos.getTableInfoById(tableInfo.featureLayer.id);
                    if (jimuTableInfo) {
                        tableInfo.jimuTableInfo = jimuTableInfo;
                        defs.push(jimuTableInfo.getLayerObject());
                    }
                }, this);

                return all(defs).then(lang.hitch(this, function () {
                    array.forEach(tableInfos, function (tableInfo) {
                        if (!tableInfo.jimuTableInfo) {
                            return;
                        }
                        var tableObject = tableInfo.jimuTableInfo.layerObject;
                        var capabilities = tableInfo.jimuTableInfo.getCapabilitiesOfWebMap();
                        var isEditableInWebMap;
                        if (capabilities && capabilities.toLowerCase().indexOf('editing') === -1) {
                            isEditableInWebMap = false;
                        } else {
                            isEditableInWebMap = true;
                        }

                        if (tableObject &&
                            tableObject.visible && //??************
                            tableObject.isEditable &&
                            tableObject.isEditable() &&
                            isEditableInWebMap) { //todo ......
                            tableInfo.featureLayer = tableInfo.jimuTableInfo.layerObject;
                            delete tableInfo.jimuTableInfo;
                            resultTableInfosParam.push(tableInfo);
                        }
                    }, this);
                    return resultTableInfosParam;
                }));
            },



            /*************************
             * Methods for change UI
             ************************/

            _updateDeleteBtnInToolbar: function () {

                // if (this._canDeleteSelectionFeatures()) {
                //     this._enableDeleBtnInToolbar();
                // } else {
                //     this._disableDeleteBtnInToolbar();
                // }
                this._disableDeleteBtnInToolbar(); //Modified 8/17/17
            },

            _disableDeleteBtnInToolbar: function () {
                if (this._configEditor.toolbarVisible) {
                    query("[class~=deleteFeatureIcon]", this.editor.domNode).style("display", "none");
                }
            },

            _enableDeleBtnInToolbar: function () {
                if (this._configEditor.toolbarVisible) {
                    query("[class~=deleteFeatureIcon]", this.editor.domNode).style("display", "inline-block");
                }
            },

            /*************************
             * Response events
             ************************/
            _update: function () {
                if (this.editor) {
                    this.editor.templatePicker.update(true);
                }
            },

            resize: function () {
                this._update();
            },

            onClose: function () {

                if (this.editor) {
                    this.editPopup.hide();
                    this.editor._clearSelection();
                    this.editor.destroy();
                }
                this.editor = null;
                // close method will call onDeActive automaticlly
                // so do not need to call onDeActive();
                this._worksAfterClose();
            },

            onNormalize: function () {
                setTimeout(lang.hitch(this, this._update), 100);
            },

            onMinimize: function () { },

            onMaximize: function () {
                setTimeout(lang.hitch(this, this._update), 100);
            },

            reClickMap: function (clickEvt) {
                this._createOverDef.then(lang.hitch(this, function () {
                    this.map.onClick(clickEvt);
                }));
            },

            _onGraphicMoveStart: function (evt) {
                this._recordsSelectedFeatureInfoWhenMoveStart(evt);
            },

            _onGraphicMoveStop: function (evt) {
                this._recordsSelectedFeatureInfoWhenMoveStop(evt);
                this._autoApplyEditWhenGeometryIsModified(evt);
            },

            _onGraphicChangeStop: function (evt) {
                this._autoApplyEditWhenGeometryIsModified(evt);
            },

            _beforeMapClick: function (evt) {
                
                 if (!this._configEditor.autoApplyEditWhenGeometryIsMoved) {
                    this._checkStickyMoveTolerance();
                    var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
                    var query = new esri.tasks.Query();
                    query.geometry = mp;
                    query.returnGeometry = true;
                    query.where = "WFM.JTX_JOBS.ASSIGNED_TO = '" + Loginusername + "'";
                    query.outFields = ["*"];

                    queryTask.execute(query, lang.hitch(this, function(resultfeat) {

                        var features = resultfeat.features;

                        if (features.length == 0) {
                           
                            widgetId = this.widgetManager.activeWidget.domNode.id
                           // WidgetManager.getInstance().closeWidget(widgetId);
                            //alert("You are not authorized to edit this area/this is allocated to another user.") ;                         
                            WidgetManager.getInstance().openWidget(widgetId);
                            this.showDialog("Heading ", "Content.");
                            WidgetManager.getInstance().closeWidget(widgetId);
                        } else {
                            this._checkStickyMoveTolerance();
                       }


                   }));

                }
                   

            },

            _onEditorPopupShow: function () {
                // disable event for editorATI
                var currentFeature = this.editor.attributeInspector._currentFeature;
                
                
                    //var currentLayer = currentFeature.getLayer();
                        this._disableToAnswerEventForEditorATI();
                        this._createRelatedRecordsEditor(currentFeature);
                        //var dnd = new Moveable(this.editPopup.domNode); 
                        var handle = query(".title", this.editPopup.domNode);
                        var dnd = new Moveable(this.editPopup.domNode, {
                        handle: handle
                        });
                
               },
            
            _onEditorPopupHide: function () {
                // enable event for editorATI
                this._enableToAnswerEventForEditorATI();
            },

            _onNextOfEditorATI: function (evt) {
                this._createRelatedRecordsEditor(evt.feature);
            },

            _onLayerSelectionChange: function (evt) {
               
               var mp = evt.target._map.geographicExtent;
                var query = new esri.tasks.Query();
                query.geometry = mp;
                query.returnGeometry = true;
                query.where = "WFM.JTX_JOBS.ASSIGNED_TO = '" + Loginusername + "'";
                query.outFields = ["*"];

                queryTask.execute(query, lang.hitch(this, function(resultfeat) {

                    var features = resultfeat.features;

                    if (features.length == 0) {
                        this.editor._clearSelection();
                        widgetId = this.widgetManager.activeWidget.domNode.id;
                       // WidgetManager. getInstance().closeWidget(widgetId);          
                       WidgetManager.getInstance().openWidget(widgetId);
                       //this.showDialog("Heading ", "Content.");

                    } else {
                        if (this._configEditor.toolbarVisible) {
                            this._updateDeleteBtnInToolbar();
                        }
                    }

                }));


                if(evt.target.name == "QC FLAG"){
                    maps.graphics.clear();
                    this.selectedFeats= {};
                    this.featsSelCnt.push(evt.target.name);
                    this._lyrExist = true
                }
                 if(evt.features.length > 0 && evt.target.name != "QC FLAG"){
                     this.featsCnt = [];
                     this.featsSelCnt =[];
                     if(this._lyrExist){
                         this._lyrExist = false;
                         this.selectedLayerNames = [];
                     }
                     this.selectedLayerNames.push(evt.target.name);    

                     if(!(evt.features[0]._graphicsLayer.name in this.layerUrls)){
                         this.layerUrls[evt.features[0]._graphicsLayer.name] = evt.features[0]._graphicsLayer.url;
                     }
                    var geomType = evt.features[0].geometry.type;
                    if(geomType == "point"){
                    //sessionStorage.setItem('layerGeomTyp', JSON.stringify(this.selectedFeats));
                    for(lnt = 0; lnt < evt.features.length; lnt++){
                        // var vals = evt.features[lnt].attributes.ID+"%"+evt.features[lnt].geometry.type+"%"+evt.target.name;
                        var vals = evt.features[lnt].attributes.ID
                        if((evt.features[0]._graphicsLayer.name in this.selectedFeats)){
                            var existed = this.selectedFeats[evt.features[0]._graphicsLayer.name];
                            this.selectedFeats[evt.features[0]._graphicsLayer.name] = existed+","+ vals;
                        }
                        else{
                             this.selectedFeats[evt.features[0]._graphicsLayer.name] = vals;
                        }
                    }
                    // var store = JSON.parse(sessionStorage.getItem('selectedFeatures'));
                    // sessionStorage.setItem('selectedFeatures', JSON.stringify({}));
                    // if(store != null){
                    //     if(evt.target.name in store){
                    //     var store_data = this.selectedFeats[evt.target.name];
                    //     store[evt.target.name] = store_data;
                    //     sessionStorage.setItem('selectedFeatures', JSON.stringify(store));
                    //     }
                    //     else{
                    //         sessionStorage.setItem('selectedFeatures', JSON.stringify(this.selectedFeats));
                    //     }
                    // }
                    // else{
                        sessionStorage.setItem('selectedFeatures', JSON.stringify(this.selectedFeats));
                    //  }
                    }
                }
                 

                if (this._configEditor.toolbarVisible) {

                    this._updateDeleteBtnInToolbar();
                }
            }

        });
    });