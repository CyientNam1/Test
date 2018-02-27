///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
    'dojo',
    'dijit',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/when',
    'dojo/on',
    'dojo/aspect',
    'dojo/query',
    'dojo/i18n!esri/nls/jsapi',
    'dojo/keys',
    'dojo/Deferred',
    'dojo/promise/all',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/topic',
    'jimu/BaseWidget',
    'jimu/LayerInfos/LayerInfos',
    'jimu/utils',
    'jimu/portalUrlUtils',
    'jimu/portalUtils',
    'jimu/Role',
    'jimu/dijit/Message',
    "jimu/dijit/Popup",
    "esri/dijit/AttributeInspector",
    "dijit/form/CheckBox",
    'esri/dijit/Search',
    'esri/tasks/locator',
    'esri/layers/FeatureLayer',
    "esri/graphic",
    'esri/InfoTemplate',
    'esri/lang',
    "esri/toolbars/edit",
    "esri/tasks/query",
  "esri/tasks/QueryTask",
    "./SEutils",
    './utils',
    "./smartAttributes",
    "./attributeInspectorTools",
    './PrivilegeUtil',
    'dijit/_WidgetsInTemplateMixin',
    "dojox/html/entities",
    'dojo/NodeList-dom',
    'jimu/dijit/LoadingShelter'
  ],
  function(
    dojo,
    dijit,declare, lang, array, html, when, on, aspect, query, esriBundle, keys, Deferred, all, domConstruct, 
    domClass, topic,
    BaseWidget, LayerInfos, jimuUtils, portalUrlUtils, portalUtils, Role,
    Message, Popup,
    AttributeInspector, CheckBox, Search, Locator,
    FeatureLayer, Graphic, InfoTemplate, esriLang, Edit, Query, QueryTask, editUtils, utils,
    smartAttributes,
    attributeInspectorTools,
    PrivilegeUtil, _WidgetsInTemplateMixin,entities) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'UnitTableEditior',
      baseClass: 'jimu-widget-UnitTableEditior',
      searchDijit: null,
      searchResults: null,
      attributeInspector: null,
      _LayerInfos : LayerInfos,
            editor: null,
            _configEditor: null,
      

      _startWidth: null,

      _defaultStartStr: "",
      _defaultAddPointStr: "",
      _jimuLayerInfos: null,
      _mapClick: null,

      settings: null,
      templatePicker: null,
      attrInspector: null,
      editToolbar: null,
      _isDirty: false,
      updateFeatures: [],
      currentFeature: null,
      currentLayerInfo: null,
      _attrInspIsCurrentlyDisplayed: false,
      _ignoreEditGeometryToggle: false,
      _editingEnabled: false,
      _usePresetValues: false,
      _creationDisabledOnAll: false,
      _editGeomSwitch: null,
      _autoSaveRuntime: false,
      _userHasPrivilege: false,
      _eventHandler: null,

      postCreate: function() {
        if (this.closeable || !this.isOnScreen) {
          html.addClass(this.searchNode, 'default-width-for-openAtStart');
        }

        this.listenWidgetIds.push('framework');
      },
      onOpen: function () {
        if (this._userHasPrivilege === true) {
          // this.widgetManager.activateWidget(this);
          this._configEditor = lang.clone(this.config.editor);
        }
      },
      onClose: function () {
        this.inherited(arguments);

        if (this.attrInspector) {
          this.attrInspector.destroy();
        }
        this.attrInspector = null;

        if (this.searchDijit) {
          this.searchDijit.clear();
        }
        query(".jimu-widget-UnitTableEditior .templatePickerMainDiv")[0].style.display = "block";
          query(".jimu-widget-UnitTableEditior .attributeInspectorMainDiv")[0].style.display = "none";
      },

      startup: function() {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this._progressDiv = domConstruct.create("div", { "class": "processing-indicator-panel" });
        var parentDom = this.getParent().domNode.parentNode;
        parentDom.insertBefore(this._progressDiv, parentDom.LastChild);

      //   //start
      //   topic.subscribe("UnitTableEditior/validate", lang.hitch(this, this._validateEventHandler));
      //   this._progressDiv = domConstruct.create("div", { "class": "processing-indicator-panel" });
      //   var parentDom = this.getParent().domNode.parentNode;
      //   parentDom.insertBefore(this._progressDiv, parentDom.firstChild);

      //   this.widgetActiveIndicator = domConstruct.create("div", { "class": "widgetActive widgetIndicator" });
      //   parentDom.insertBefore(this.widgetActiveIndicator, parentDom.firstChild);

      //   if (this.config.editor.editDescription === undefined || this.config.editor.editDescription === null) {
      //     this.config.editor.editDescription = '';
      //   }
      //   this._orignls = esriBundle.widgets.attachmentEditor.NLS_attachments;

      //    this.editToolbar = new Edit(this.map);

      //    this.own(on(this.editToolbar,
      //     "graphic-move-stop, rotate-stop, scale-stop, vertex-move-stop, vertex-click",
      //     lang.hitch(this, function () {
      //       this.geometryChanged = true;
      //       this._enableAttrInspectorSaveButton(this._validateAttributes());
      //       //this._enableAttrInspectorSaveButton(true);
      //       this._isDirty = true;
      //     })));

      //     this.privilegeUtil = PrivilegeUtil.getInstance();
      //   //<div class="processing-indicator-panel"></div>
      //   this.nls = lang.mixin(this.nls, window.jimuNls.common);
      //   this._setTheme();
      //   this.shelter.show();

      //    LayerInfos.getInstance(this.map, this.map.itemInfo)
      //  .then(lang.hitch(this, function (operLayerInfos) {

      //    var timeoutValue;
      //    if (this.appConfig.theme.name === "BoxTheme") {
      //      timeoutValue = 1050;

      //    } else {
      //      timeoutValue = 1;
      //    }
      //    setTimeout(lang.hitch(this, function () {

      //      this.privilegeUtil.loadPrivileges(this._getPortalUrl()).then(lang.hitch(this, function (status) {
      //        var valid = true;
      //        this._user = null;
      //        if (!status) {
      //          valid = this._initControl(LayerInfos.getInstanceSync(this.map, this.map.itemInfo));
      //        } else {
      //          var userInfo = this.privilegeUtil.getUser();
      //          if (userInfo) {
      //            this._user = userInfo.username;
      //          }

      //          if (this.privilegeUtil.userRole.canEditFeatures() === true) {
      //            valid = this._initControl(LayerInfos.getInstanceSync(this.map, this.map.itemInfo));

      //          }
      //          else if (this.privilegeUtil.userRole.canEditFeaturesFullControl === true) {
      //            valid = this._initControl(LayerInfos.getInstanceSync(this.map, this.map.itemInfo));

      //          }
      //          else {
      //           this.shelter.hide();
      //          }
      //        }

      //        this.shelter.hide();

      //      }), lang.hitch(this, function () {

      //        this.shelter.hide();
      //      }));
      //      this.shelter.hide();
      //     //  this._workBeforeCreate();
      //    }), timeoutValue);
      //  }));

      //   //end

        if (!(this.config && this.config.sources)) {
          this.config.sources = [];
        }

        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function(layerInfosObj) {
            this.layerInfosObj = layerInfosObj;
            this.own(this.layerInfosObj.on(
            'layerInfosFilterChanged',
            lang.hitch(this, this.onLayerInfosFilterChanged)));

            utils.setMap(this.map);
            utils.setLayerInfosObj(this.layerInfosObj);
            utils.setAppConfig(this.appConfig);
            when(utils.getConfigInfo(this.config)).then(lang.hitch(this, function(config) {
              return all(this._convertConfig(config)).then(function(searchSouces) {
                return array.filter(searchSouces, function(source) {
                  return source;
                });
              });
            })).then(lang.hitch(this, function(searchSouces) {
              if (!this.domNode) {
                return;
              }

              this.searchDijit = new Search({
                activeSourceIndex: searchSouces.length === 1 ? 0 : 'all',
                allPlaceholder: jimuUtils.stripHTML(esriLang.isDefined(this.config.allPlaceholder) ?
                  this.config.allPlaceholder : ""),
                autoSelect: true,
                enableButtonMode: false,
                enableLabel: false,
                enableInfoWindow: true,
                enableHighlight: esriLang.isDefined(this.config.showInfoWindowOnSelect) ?
                  !!this.config.showInfoWindowOnSelect : true,
                showInfoWindowOnSelect: esriLang.isDefined(this.config.showInfoWindowOnSelect) ?
                  !!this.config.showInfoWindowOnSelect : true,
                map: this.map,
                sources: searchSouces,
                theme: 'arcgisSearch'
              });
              html.place(this.searchDijit.domNode, this.searchNode);
              this.searchDijit.startup();

              this._resetSearchDijitStyle();

              this.own(
                this.searchDijit.watch(
                  'activeSourceIndex',
                  lang.hitch(this, '_onSourceIndexChange')
                )
              );

              this.own(
                on(this.searchDijit.domNode, 'click', lang.hitch(this, '_onSearchDijitClick'))
              );
              this.own(on(this.searchDijit.inputNode, "keyup", lang.hitch(this, function(e) {
                if (e.keyCode !== keys.ENTER) {
                  this._onClearSearch();
                }
              })));
              this.own(
                aspect.before(this.searchDijit, 'select', lang.hitch(this, '_captureSelect'))
                );
              this.own(
                on(this.searchDijit, 'search-results', lang.hitch(this, '_onSearchResults'))
              );
              this.own(
                on(this.searchDijit, 'suggest-results', lang.hitch(this, '_onSuggestResults'))
              );
              this.own(
                on(this.searchDijit, 'select-result', lang.hitch(this, '_onSelectResult'))
              );
              this.own(
                on(this.searchResultsNode, 'li:click', lang.hitch(this, '_onSelectSearchResult'))
              );
              // //start
              // this.own(
              //   on(this.searchResultsNode, 'li:click', lang.hitch(this, '_onMapClick'))
              // );
              // //end
              this.own(on(
                this.searchResultsNode,
                '.show-all-results:click',
                lang.hitch(this, '_showResultMenu')
              ));
              this.own(
                on(window.document, 'click', lang.hitch(this, function(e) {
                  if (!html.isDescendant(e.target, this.searchResultsNode)) {
                    this._hideResultMenu();
                    this._resetSelectorPosition('.show-all-results');
                  }
                }))
              );
              this.own(
                on(this.searchDijit, 'clear-search', lang.hitch(this, '_onClearSearch'))
              );
              this.own(
                aspect.after(this.map.infoWindow, 'show', lang.hitch(this, function() {
                  if (this.searchDijit &&
                    this.map.infoWindow.getSelectedFeature() !==
                    this.searchDijit.highlightGraphic) {
                    this.searchDijit.clearGraphics();
                    query('li', this.searchResultsNode).removeClass('result-item-selected');
                  }
                }))
              );
              this.own(
                on(this.map.infoWindow, 'show,hide', lang.hitch(this, function() {
                  if (this.searchDijit &&
                    this.map.infoWindow.getSelectedFeature() ===
                    this.searchDijit.highlightGraphic) {
                    this.searchDijit.clearGraphics();
                    query('li', this.searchResultsNode).removeClass('result-item-selected');
                  }
                }))
              );

              this.fetchData('framework');
            }));
          }));
      },

      _onMapClick: function (evt) {
        if (this._byPass && this._byPass === true) {
          this._byPass = false;
          return;
        }
        if (!this._attrInspIsCurrentlyDisplayed)  {
          this._processOnMapClick(evt);
          // this._addGraphicToLocalLayer(evt);
        }
      },
      _CreateATI(evt){
        // var sourceIndex = this.searchDijit.activeSourceIndex;
        // if (sourceIndex === 'all') {
        //   sourceIndex = this._getSourceIndexOfResult(e);
        // }
        var target = evt.target;
        while(!(html.hasAttr(target, 'data-source-index') && html.getAttr(target, 'data-index'))) {
          target = target.parentNode;
        }
        var result = null;
        var dataSourceIndex = html.getAttr(target, 'data-source-index');
        var dataIndex = parseInt(html.getAttr(target, 'data-index'), 10);
        // var sources = this.searchDijit.get('sources');

        if (dataSourceIndex !== 'all') {
          dataSourceIndex = parseInt(dataSourceIndex, 10);
        }
        if (this.searchResults && this.searchResults[dataSourceIndex] &&
          this.searchResults[dataSourceIndex][dataIndex]) {
          result = this.searchResults[dataSourceIndex][dataIndex];
          //this.searchDijit.select(result);
        }
        var sourceIndex = dataSourceIndex;
        if (isFinite(sourceIndex) && esriLang.isDefined(sourceIndex)) {
          var source = this.searchDijit.sources[sourceIndex];
        }
        var layer = source.featureLayer;

        var layerIDInfo = this.layerInfosObj.getTableInfoArray().filter(lang.hitch(this, function (lyr) {//var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.title === source.featureLayer.name) {
            return array.some(this.config.editor.tableInfos, function (configInfo) {
              if (configInfo.featureLayer.id === lyr.id) { 
                lyr.fieldInfo = configInfo.fieldInfos;
                return true;
              }
              else {
                return false;
              }
            });
          }
          else {
            return false;
          }
        }));
        layer.id = layerIDInfo[0].id;

        var layerFieldInfo = this.config.editor.tableInfos.filter(lang.hitch(this, function (lyr) {//var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.featureLayer.id === layerIDInfo[0].id) {
            return true;
          }
          else {
            return false;
          }
        }));

        var layerInfos = [
        {
          'featureLayer': layer,
          'showAttachments': false,
          'isEditable': true,
          'fieldInfos': layerFieldInfo[0].fieldInfos
        }
      ];
        this._createAttributeInspector(layerInfos);

        var updateFeatures = [];
        var deferreds = [];
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;

        var selectQuery = new Query();
        var objectIdField = layer.objectIdField;
          selectQuery.where = objectIdField + " = " + result.feature.attributes.OBJECTID;
          var deferred = layer.selectFeatures(selectQuery,
            FeatureLayer.SELECTION_NEW,
            lang.hitch(this, function (features) {
              var OIDsToRemove = [];
              var validFeatures = [];
              array.forEach(features, function (feature) {
                var featureValid = true;
                 feature.allowDelete = true;

                //The below is the preferred way, but this fails on public services and the user is logged in

                if (!layer.getEditCapabilities({ feature: feature }).canUpdate) {
                  //feature.allowDelete = false;
                  OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                  featureValid = false;
                }
                else if (!layer.getEditCapabilities({ feature: feature }).canDelete) {
                  feature.allowDelete = false;
                }
                if (featureValid === true) {
                  feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
                  validFeatures.push(feature);
                }
              }, this);
              if (OIDsToRemove.length > 0) {
                var subQuery = new Query();
                subQuery.objectIds = OIDsToRemove;
                var subDef = layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
                  lang.hitch(this, function (features) {
                    console.log(features.length);
                  }));
                deferreds.push(subDef);
              }
              updateFeatures = updateFeatures.concat(validFeatures);

            }));
            deferreds.push(deferred);
            if (deferreds.length === 0) {
          this._byPass = true;
          // this.map.popupManager._showPopup(evt);
          this._byPass = false;
        }
        else {
          all(deferreds).then(lang.hitch(this, function () {
            this.updateFeatures = updateFeatures;
            // this.currentFeature = this.updateFeatures[0];
            
            if (this.updateFeatures.length > 0) {
              this._showTemplate(false);
            }
            else {
              this._byPass = true;
              // this.map.popupManager._showPopup(evt);
              this._byPass = false;
            }
          }));
        }
      }
      ,

      _processOnMapClick: function (evt) {
        // viewing/editing existing features
        // The logic of adding new feature to local layer is handled
        // in the draw end event of the draw tool

        this.map.infoWindow.hide();
        // recreate the attr inspector if needed
        this._createAttributeInspector(this.config.editor.configInfos);
        var tableInfos = [];

        array.forEach(this.map.getLayersVisibleAtScale(), lang.hitch(this, function (lyr) {
          if (lyr.type && lyr.type === "Feature Layer" && lyr.url) {
            if(this._jimuLayerInfos.getTableInfoById(lyr.id)){
            tableInfos.push(this._jimuLayerInfos.getTableInfoById(lyr.id));
            }
          var operationDataFromPopup =
                            lang.getObject('_wabProperties.popupInfo.operationDataForListRelatedRecords', false, lyr);
          if (operationDataFromPopup && operationDataFromPopup.destJimuLayerInfo) {
            tableInfos.push(operationDataFromPopup.destJimuLayerInfo);
          }                  
          }
        }));

        var layers = this._jimuLayerInfos.getTableInfoArray().filter(lang.hitch(this, function (lyr) {//var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.originOperLayer.selfType && lyr.originOperLayer.selfType === "table" && lyr.originOperLayer.url) {//if (lyr.type && lyr.type === "Feature Layer" && lyr.url) {
            return array.some(this.config.editor.configInfos, function (configInfo) {
              if (configInfo.layerInfo.id === lyr.id) { // &&
                // configInfo.allowUpdateOnly === true) {//configInfo.configFeatureLayer.layerAllowsUpdate === true) {
                return true;
              }
              else {
                return false;
              }
            });
          }
          else {
            return false;
          }
        }));

        var updateFeatures = [];
        var deferreds = [];
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        array.forEach(layers, lang.hitch(this, function (layer) {
          // // set selection symbol
          // layer.setSelectionSymbol(this._getSelectionSymbol(layer.geometryType, false));
           var selectQuery = new Query();
           var jimuLayer = this._jimuLayerInfos.getTableInfoById(layer.id)
          // selectQuery.geometry = editUtils.pointToExtent(this.map, evt.mapPoint, 20);
          var deferred = jimuLayer.layerObject.selectFeatures(selectQuery,
            FeatureLayer.SELECTION_NEW,
            lang.hitch(this, function (features) {
              var OIDsToRemove = [];
              var validFeatures = [];
              array.forEach(features, function (feature) {
                var featureValid = true;
                feature.allowDelete = true;

                //The below is the preferred way, but this fails on public services and the user is logged in

                if (!layer.getEditCapabilities({ feature: feature }).canUpdate) {
                  //feature.allowDelete = false;
                  OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                  featureValid = false;
                }
                else if (!layer.getEditCapabilities({ feature: feature }).canDelete) {
                  feature.allowDelete = false;
                }
                if (featureValid === true) {
                  feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
                  validFeatures.push(feature);
                }
              }, this);
              if (OIDsToRemove.length > 0) {
                var subQuery = new Query();
                subQuery.objectIds = OIDsToRemove;
                var subDef = layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
                  lang.hitch(this, function (features) {
                    console.log(features.length);
                  }));
                deferreds.push(subDef);
              }
              updateFeatures = updateFeatures.concat(validFeatures);

            }));
          // var query = new Query();
          // var queryTask = new QueryTask(layer.originOperLayer.url);
          //   var objectIdField = "OBJECTID";//layerObject.objectIdField;
          //   query.where = objectIdField + " = " + this.searchResults[0][0].feature.attributes.OBJECTID;//query.where = objectIdField + " = " + addedResult.objectId;
          //   query.outFields = ["*"];
          //   var deferred = queryTask.execute(query, lang.hitch(this, function (features) {
              
          //     var OIDsToRemove = [];
          //     var validFeatures = [];
          //     array.forEach(features.features, function (feature) {
          //       var featureValid = true;
          //       feature.allowDelete = true;
          //       feature.featureLayerid = layer.id;

          //       //The below is the preferred way, but this fails on public services and the user is logged in

          //       // if (!layer.getEditCapabilities({ feature: feature }).canUpdate) {
          //       //   //feature.allowDelete = false;
          //       //   OIDsToRemove.push(feature.attributes[layer.objectIdField]);
          //       //   featureValid = false;
          //       // }
          //       // else if (!layer.getEditCapabilities({ feature: feature }).canDelete) {
          //       //   feature.allowDelete = false;
          //       // }
          //       if (featureValid === true && this.searchResults[0][0].name === feature.attributes.ID) {
          //         feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
          //         validFeatures.push(feature);
          //       }
          //     }, this);
          //     if (OIDsToRemove.length > 0) {
          //       var subQuery = new Query();
          //       subQuery.objectIds = OIDsToRemove;
          //       var subDef = layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
          //         lang.hitch(this, function (features) {
          //           console.log(features.length);
          //         }));
          //       deferreds.push(subDef);
          //     }
          //     updateFeatures = updateFeatures.concat(validFeatures);
          //   }));
          deferreds.push(deferred);
        }));
        if (deferreds.length === 0) {
          this._byPass = true;
          // this.map.popupManager._showPopup(evt);
          this._byPass = false;
        }
        else {
          all(deferreds).then(lang.hitch(this, function () {
            this.updateFeatures = updateFeatures;
            //this.currentFeature = this.updateFeatures[0];
            
            if (this.updateFeatures.length > 0) {
              this._showTemplate(false);
            }
            else {
              this._byPass = true;
              // this.map.popupManager._showPopup(evt);
              this._byPass = false;
            }
          }));
        }

      },

      _showTemplate: function (showTemplate) {
        this._attrInspIsCurrentlyDisplayed = !showTemplate;
        if (showTemplate) {
          //this._mapClickHandler(true);
          this._showTemplatePicker();

          // esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls;
        } else {
          //esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls + " " + this.nls.attachmentSaveDeleteWarning;
          //this._mapClickHandler(false);
          //show attribute inspector
          query(".jimu-widget-UnitTableEditior .templatePickerMainDiv")[0].style.display = "none";
          query(".jimu-widget-UnitTableEditior .attributeInspectorMainDiv")[0].style.display = "block";

          if (this.attrInspector) {

            if (!this.currentFeature) {
              this.attrInspector.first();
            }
          this._createSmartAttributes();
            this._createAttributeInspectorTools();
            this.attrInspector.refresh();
            dojo.style(this.attrInspector.deleteBtn.domNode, "display", "none");
            this._attributeInspectorTools.triggerFormValidation();
            //this._sytleFields(this.attrInspector);
            if (this.currentFeature.getLayer().originalLayerId) {
              this._enableAttrInspectorSaveButton(this._validateAttributes());
            } else {
              this._enableAttrInspectorSaveButton(false);
            }
            if (this.currentLayerInfo.editDescription && this.currentLayerInfo.editDescription !== null) {
              this.editDescription.innerHTML = this.currentLayerInfo.editDescription;
              this.editDescription.style.display = "block";
            }
            else {
              this.editDescription.style.display = "none";
            }
            // if (this.currentLayerInfo.isCache && this.currentLayerInfo.isCache === true) {
            //   this._toggleEditGeoSwitch(false);
            // }
            // else {
            //   this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
            //         !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
            //   //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM

            // }
            //this._addWarning();
          }
          this._recordLoadeAttInspector();
        }


      },
      _showTemplatePicker: function () {

        // hide the attr inspector and show the main template picker div
        query(".jimu-widget-UnitTableEditior .attributeInspectorMainDiv")[0].style.display = "none";
        query(".jimu-widget-UnitTableEditior .templatePickerMainDiv")[0].style.display = "block";

        // if (this.templatePicker) {
        //   if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
        //     if (this.config.editor.keepTemplateSelected !== true) {
        //       this.templatePicker.clearSelection();
        //     }
        //   } else {
        //     this.templatePicker.clearSelection();
        //   }
        //   if (this.templatePicker) {
        //     this.templatePicker.update();
        //   }
        // }
        this._resetEditingVariables();

        var layersRefresh = [];
        // if (this.updateFeatures) {
        //   array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
        //     var layer = feature.getLayer();
        //     if (layersRefresh && layersRefresh.indexOf(layer.id) === -1) {
        //       layersRefresh.push(layer.id);
        //       layer.clearSelection();
        //       layer.refresh();
        //     }

        //   }));
        // }
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        //this.updateFeatures = [];// this._removeLocalLayers();
        if (this._recreateOnNextShow === true) {
          this._recreateOnNextShow = false;
          this._createEditor();
        }
        if (this._creationDisabledOnAll) {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "none");
          }

        } else {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "block");
          }
        }

        //this._activateTemplateToolbar();
        //this.templatePicker.update();
      },

      _getLayerInfoByID: function (id) {

        if (id.indexOf("_lfl") > 0) {
          id = id.replace("_lfl", "");
        }
        var result = null;
        this.config.editor.configInfos.some(function (configInfo) {
          return configInfo.featureLayer.id === id ? ((result = configInfo), true) : false;
        });
        return result;

      },
      _recordLoadeAttInspector: function () {
        if (this.editDescription.style.display === "block") {
          if (this.updateFeatures.length > 1) {
            dojo.style(this.editDescription, "padding-top", "20px");
          } else {
            dojo.style(this.editDescription, "padding-top", "0");
          }
        } else {
          if (this.updateFeatures.length > 1) {
            dojo.style(query(".attributeInspectorDiv")[0], "padding-top", "20px");
          } else {
            dojo.style(query(".attributeInspectorDiv")[0], "padding-top", "8px");
          }

        }
      },
      _addWarning: function () {
        if (query(".attwarning").length === 0) {
          var txt = domConstruct.create("div", { 'class': 'attwarning' });
          txt.innerHTML = this.nls.attachmentSaveDeleteWarning;
          if (this.attrInspector._attachmentEditor !== undefined &&
             this.attrInspector._attachmentEditor !== null) {
            this.attrInspector._attachmentEditor.domNode.appendChild(txt);
          }

        }
      },
      _validateAttributes: function () {
        var rowsWithGDBRequiredFieldErrors = this._validateRequiredFields();
        var rowsWithSmartErrors = [];
        var formValid = true;
        if (this._smartAttributes !== undefined) {
          if (this._smartAttributes !== null) {
            rowsWithSmartErrors = this._smartAttributes.toggleFields();
          }
        }
        if (this._attributeInspectorTools !== undefined) {
          if (this._attributeInspectorTools !== null) {
            formValid = this._attributeInspectorTools.formValid();
          }
        }
        return (editUtils.isObjectEmpty(rowsWithGDBRequiredFieldErrors) &&
          rowsWithSmartErrors.length === 0 && formValid);

      },

      // todo: modify to feature as input parameter?
      _validateRequiredFields: function () {
        var errorObj = {};

        if (!this.currentFeature) { return errorObj; }

        var layer = this.currentFeature.getLayer();

        var filteredFields = array.filter(layer.fieldInfos, lang.hitch(this, function (field) {
          return field.editable === true;
        }));

        array.forEach(filteredFields, lang.hitch(this, function (f) {
          if (this.currentFeature.attributes[f.name] === "undefined") {
            errorObj[f.alias] = "undefined";
          }
          else if (this.currentFeature.attributes[f.name] === null) {
            errorObj[f.alias] = "null";
          }
          else {
            switch (f.type) {
              case "esriFieldTypeString":
                if (this.currentFeature.attributes[f.name] === "" ||
                    (this.currentFeature.attributes[f.name] &&
                    this.currentFeature.attributes[f.name].trim() === "")) {
                  errorObj[f.alias] = "Empty string";
                }
                break;
              default:
                break;
            }
          }
        }));
        return errorObj;
      },

      _enableAttrInspectorSaveButton: function (enable) {
        var saveBtn = query(".saveButton")[0];
        if (!saveBtn) { return; }

        if (enable) {
          if (domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.remove(saveBtn, "jimu-state-disabled");
          }
        } else {
          if (!domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.add(saveBtn, "jimu-state-disabled");
          }
        }
      },
      _createAttributeInspectorTools: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var attributeInspectorToolsParams = {
          _attrInspector: this.attrInspector,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos
        };
        this._attributeInspectorTools = new attributeInspectorTools(attributeInspectorToolsParams);

      },
      _createSmartAttributes: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var fieldValidation = null;
        if (this.currentLayerInfo !== undefined && this.currentLayerInfo !== null) {
          if (this.currentLayerInfo.fieldValidations !== undefined &&
            this.currentLayerInfo.fieldValidations !== null) {
            fieldValidation = this.currentLayerInfo.fieldValidations;
          }
        }
        if (fieldValidation === null) {
          return;
        }

        var smartAttParams = {
          _attrInspector: this.attrInspector,
          _fieldValidation: fieldValidation,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos
        };
        this._smartAttributes = new smartAttributes(smartAttParams);

      },

      // this function also create a new attribute inspector for the local layer
      _addGraphicToLocalLayer: function (evt) {
        
        var newTempLayerInfos;
        var localLayerInfo = null;

        if (this.attrInspector) {
          this.attrInspector.destroy();
          this.attrInspector = null;
        }

        if (this._attachmentUploader && this._attachmentUploader !== null) {
          this._attachmentUploader.clear();
        }

        this.updateFeatures = [];


        localLayerInfo = this._getLayerInfoForLocalLayer(this.cacheLayer);
        newTempLayerInfos = [localLayerInfo];//this._converConfiguredLayerInfos([localLayerInfo]);

        this._createAttributeInspector([localLayerInfo]);

        if (this.config.editor.hasOwnProperty("editGeometryDefault") && this.config.editor.editGeometryDefault === true) {
          setTimeout(lang.hitch(this,function() {this._editGeomSwitch.set('checked', true);}),100);
        }

        var newAttributes = lang.clone(selectedTemp.template.prototype.attributes);
        if (this._usePresetValues) {
          this._modifyAttributesWithPresetValues(newAttributes, newTempLayerInfos[0]);
        }

        var newGraphic = new Graphic(evt.geometry, null, newAttributes);

        // store original attrs for later use
        newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
        this.cacheLayer.applyEdits([newGraphic], null, null, lang.hitch(this, function (e) {
          this._isDirty = true;
          var queryTask = new Query();
          queryTask.objectIds = [e[0].objectId];
          this.cacheLayer.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW);

          this.currentFeature = this.updateFeatures[0] = newGraphic;
          this.geometryChanged = false;
          this._editGeomSwitch.set('checked', true);
          if (this._attributeInspectorTools) {
            this._attributeInspectorTools.triggerFormValidation();
          }
          this._attachLayerHandler();
          this.currentLayerInfo = this._getLayerInfoByID(this.currentFeature._layer.id);
          this.currentLayerInfo.isCache = true;
          this._toggleDeleteButton(false);
          //this._toggleEditGeoSwitch(false);

          //this._createSmartAttributes();
          //
          this._enableAttrInspectorSaveButton(this._validateAttributes());

        }));

        this._showTemplate(false, false);

        if (this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true) {
          setTimeout(lang.hitch(this, function() {
            var saveBtn = query(".saveButton")[0];
            if (!saveBtn) {
              //do nothing
            } else {
              on.emit(saveBtn, 'click', { cancelable:true, bubbles: true});
            }
          }),100);
        }

      },
      _createAttributeInspector: function (layerInfos) {

        if (this.attrInspector) {
          this.attrInspector.destroy();
          this.attrInspector = null;
        }
        this.attrInspector = editUtils.ATI({//new AttributeInspector({
          layerInfos: layerInfos
        }, html.create("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }));
        this.attrInspector.placeAt(this.attributeInspectorNode);
        this.attrInspector.startup();
        //domConstruct.place(this.attrInspector.navMessage, this.attrInspector.nextFeatureButton.domNode, "before");

        // this.editSwitchDiv = domConstruct.create("div");
        // this.editSwitchDiv.appendChild(domConstruct.create("div", { "class": "spacer" }));
        // edit geometry toggle button
        // this._editGeomSwitch = new CheckBox({
        //   id: "editGeometrySwitch",
        //   checked: false,
        //   value: this.nls.editGeometry
        // }, null);

        // this.editSwitchDiv.appendChild(this._editGeomSwitch.domNode);

        // domConstruct.place(lang.replace(
        //  "<label for='editGeometrySwitch'>{replace}</label></br></br>",
        //  { replace: this.nls.editGeometry }), this._editGeomSwitch.domNode, "after");

        // domConstruct.place(this.editSwitchDiv, this.attrInspector.deleteBtn.domNode, "before");

        // this.own(on(this._editGeomSwitch, 'Change', lang.hitch(this, this._editGeometry)));


        //add close/cancel/switch to template button
        var cancelButton = domConstruct.create("div", {
          innerHTML: this.nls.back,
          "class": "cancelButton jimu-btn"
        }, this.attrInspector.deleteBtn.domNode, "after");

        // save button
        var saveButton = domConstruct.create("div", {
          innerHTML: this.nls.save,
          "class": "saveButton jimu-btn jimu-state-disabled"
        }, cancelButton, "after");

        //add another process indicator
        //domConstruct.create("div", {
        //  "class": "processing-indicator"
        //}, saveButton, "before");
        if (query(".jimu-widget-UnitTableEditior .deleteButton").length < 1) {
          this._deleteButton = domConstruct.create("div", {
            innerHTML: this.nls.deleteText,
            "class": "deleteButton jimu-btn jimu-btn-vacation"
          }, saveButton, "after");
          // query(".jimu-widget-smartEditor .topButtonsRowDiv")[0], "first");

          on(this._deleteButton, "click", lang.hitch(this, function () {
            //if (this.currentFeature) {
            if (this.map.infoWindow.isShowing) {
              this.map.infoWindow.hide();
            }

            if (this.config.editor.displayPromptOnDelete) {
              this._promptToDelete();

            } else {
              this._deleteFeature();
            }
            //}
          }));
        }

        //wire up the button events
        this.own(on(cancelButton, "click", lang.hitch(this, function () {
          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }

          if (this.config.editor.displayPromptOnSave && this._isDirty) {
            this._promptToResolvePendingEdit(true, null, true);
          } else {
            this._cancelEditingFeature(true);
            //this._activateTemplateToolbar();
          }

          //this._removeLayerVisibleHandler();
        })));

        this.own(on(saveButton, "click", lang.hitch(this, function () {
          if (!this._isDirty) {
            this._resetEditingVariables();
            return;
          }

          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          this._saveEdit(this.currentFeature);
        })));

        // edit geometry checkbox event

        // attribute inspector events
        this.own(on(this.attrInspector, "attribute-change", lang.hitch(this, function (evt) {
          if (this.currentFeature) {
            this.currentFeature.attributes[evt.fieldName] = evt.fieldValue;
            this._isDirty = true;

            this._enableAttrInspectorSaveButton(this._validateAttributes());
          }
        })));
        this.own(on(this.attrInspector, "next", lang.hitch(this, function (evt) {

          this._attributeInspectorChangeRecord(evt);
          this._addWarning();
        })));
          dojo.style(this.attrInspector.deleteBtn.domNode, "display", "none");
        // if (this._attachmentUploader && this._attachmentUploader !== null) {
        //   this._attachmentUploader.destroy();
        //   this._attachmentUploader = null;

        // }
        // if (layerInfos.length === 1) {
        //   if (layerInfos[0].featureLayer.hasOwnProperty('originalLayerId')) {
        //     var result = this._getLayerInfoByID(layerInfos[0].featureLayer.originalLayerId);
        //     if (result.featureLayer.hasAttachments === true) {
        //       this.attachNode = domConstruct.create("div");
        //       domConstruct.place(this.attachNode, this.attrInspector.attributeTable, "after");
        //       this._attachmentUploader = new AttachmentUploader({ 'class': 'atiAttachmentEditor' },
        //         this.attachNode);
        //       this._attachmentUploader.startup();
        //     }
        //   }
        // }
      },
      _attributeInspectorChangeRecord: function (evt) {
        //this._turnEditGeometryToggleOff();
        //this.getConfigDefaults();
        if (this._isDirty && this.currentFeature) {
          // do not show templatePicker after saving
          if (this.config.editor.displayPromptOnSave && this.config.editor.displayPromptOnSave === true) {
            this._promptToResolvePendingEdit(false, evt, false);
          }
        } else {
          this._postFeatureSave(evt);
        }
        this._recordLoadeAttInspector();
      },

      _postFeatureSave: function (evt) {
        if (this.updateFeatures && this.updateFeatures.length > 1) {
          array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
            feature.setSymbol(this._getSelectionSymbol(feature.getLayer().geometryType, false));
          }));
        }
        if (evt && evt.feature) {
          this.geometryChanged = false;
          this.currentFeature = evt.feature;
          // this._attachLayerHandler();
          this.currentLayerInfo = this.currentFeature.getLayer();//this._getLayerInfoByID(this.currentFeature.featureLayerid);
          this.currentLayerInfo.isCache = false;
          this.currentLayerInfo.allowDelete = true;
          this._createSmartAttributes();
          this._createAttributeInspectorTools();
          this._attributeInspectorTools.triggerFormValidation();
          this._validateAttributes();
          this._enableAttrInspectorSaveButton(false);
          if (this.currentFeature.hasOwnProperty("allowDelete")) {
            this._toggleDeleteButton(this.currentFeature.allowDelete && this.currentLayerInfo.allowDelete);
          }
          else {
            this._toggleDeleteButton(this.currentLayerInfo.allowDelete);
          }
          // this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
          //                    !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
          //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM
          // this.currentFeature.setSymbol(
          //   this._getSelectionSymbol(evt.feature.getLayer().geometryType, true));
          // if (this.currentLayerInfo.editDescription && this.currentLayerInfo.editDescription !== null) {
          //   this.editDescription.innerHTML = this.currentLayerInfo.editDescription;
          //   this.editDescription.style.display = "block";
          // }
          // else {
          //   this.editDescription.style.display = "none";
          // }
          this.editDescription.style.display = "block";
        }

      },
      _toggleDeleteButton: function (show) {
        if (show === true) {
          this._deleteButton.style.display = "block";
        } else {
          this._deleteButton.style.display = "none";
        }
      },

      _enableAttrInspectorSaveButton: function (enable) {
        var saveBtn = query(".saveButton")[0];
        if (!saveBtn) { return; }

        if (enable) {
          if (domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.remove(saveBtn, "jimu-state-disabled");
          }
        } else {
          if (!domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.add(saveBtn, "jimu-state-disabled");
          }
        }
      },

      // perform validation then post the changes or formatting the UI if errors
      // no confirm dialog involved
      _saveEdit: function (feature, switchToTemplate) {
        var deferred = new Deferred();
        // disable the save button even if the saving is done
        this._enableAttrInspectorSaveButton(false);
        // this._turnEditGeometryToggleOff();
        if (this._validateAttributes()) {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton")[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (!domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }
          // call applyEdit
          this._postChanges(feature).then(lang.hitch(this, function (e) {
            if (e === "failed") {
              deferred.resolve("failed");
            }
            else {
              // if currently only one selected feature
              if (this.config.editor.removeOnSave && this.updateFeatures.length === 1) {
                switchToTemplate = true;
              }
              if (switchToTemplate && switchToTemplate === true) {
                this._showTemplate(true);
              } else {
                this._resetEditingVariables();
                this.map.setInfoWindowOnClick(true);
                if (this.config.editor.removeOnSave === true) {
                  var layer = feature.getLayer();
                  // perform a new query
                  var query = new Query();
                  query.objectIds = [feature.attributes[layer.objectIdField]];
                  layer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT,
                    lang.hitch(this, function () {
                      this.updateFeatures.splice(this.updateFeatures.indexOf(feature), 1);
                      this.attrInspector.next();
                    }));
                } else {
                  // reselect the feature
                  if (this.currentFeature.hasOwnProperty("allowDelete")) {
                    this._toggleDeleteButton(this.currentFeature.allowDelete &&
                      this.currentLayerInfo.allowDelete);
                  }
                  else {
                    this._toggleDeleteButton(this.currentLayerInfo.allowDelete &&
                      this.currentLayerInfo.configFeatureLayer.layerAllowsDelete);
                  }
                  // this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                  //   !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
                  //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM

                  // feature.setSymbol(this._getSelectionSymbol(
                  //   feature.getLayer().geometryType, true));
                }
              }
              deferred.resolve("success");
            }
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
          }), lang.hitch(this, function () {
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
            //deferred.resolve("failed");
          }));
        }
        //else
        //{
        //  this._formatErrorFields(errorObj);

        //  deferred.resolve("failed");
        //}
        return deferred.promise;
      },
      // posts the currentFeature's changes
      _postChanges: function (feature) {
        var deferred = new Deferred();
        var ruleInfo;
        var k = null;
        if (feature) {
          if (this._smartAttributes !== undefined && this._smartAttributes !== null) {
            for (k in feature.attributes) {
              if (feature.attributes.hasOwnProperty(k) === true) {
                ruleInfo = this._smartAttributes.validateField(k);
                if (ruleInfo[1] === 'Hide' && ruleInfo[3] !== true) {
                  delete feature.attributes[k];
                }
              }
            }
          }
          for (k in feature.attributes) {
            if (feature.attributes.hasOwnProperty(k) === true) {
              if (feature.attributes[k] === "") {
                feature.attributes[k] = null;
              }
            }
          }
          feature.attributes = this._attributeInspectorTools._checkFeatureData(feature.attributes);
          var featureLayer = null;
          var postDef = null;
          if (feature.getLayer().originalLayerId) {
            // added feature
            featureLayer = this.map.getLayer(feature.getLayer().originalLayerId);
            if (featureLayer) {
              // modify some attributes before calling applyEdits
              delete feature.attributes[featureLayer.objectIdField];
              feature.symbol = null;

              postDef = featureLayer.applyEdits([feature], null, null);
              this.addDeferred(postDef, feature, featureLayer, deferred);
            } // if featureLayer not null
          } else {
            // update existing feature
            // only get the updated attributes
            var featureForUpdate = null;
            if (this.geometryChanged !== undefined &&
              this.geometryChanged !== null &&
              this.geometryChanged === true) {
              featureForUpdate = new Graphic(feature.geometry, null, null);
              //featureForUpdate.geometry = feature.geometry;
            }
            else {
              featureForUpdate = new Graphic(null, null, null);
            }
            featureLayer = feature.getLayer();
            feature.attributes = this._attributeInspectorTools._checkFeatureData(feature.attributes);
            feature.preEditAttrs = this._attributeInspectorTools._checkFeatureData(feature.preEditAttrs);
            var newAttrs = editUtils.filterOnlyUpdatedAttributes(
              feature.attributes, feature.preEditAttrs, featureLayer);

            if (newAttrs && !editUtils.isObjectEmpty(newAttrs)) {
              // there are changes in attributes
              featureForUpdate.attributes = newAttrs;
            } else {
              featureForUpdate.attributes = []; // ?
            }
            feature.symbol = null;
            postDef = feature.getLayer().applyEdits(null, [featureForUpdate], null);
            this.addDeferred(postDef, feature, featureLayer, deferred);
          }
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      },
      addDeferred: function (postDef, feature, featureLayer, deferred) {
        postDef.then(lang.hitch(this, function (added, updated) {
          // sometimes a successfully update returns an empty array
          if (updated && updated.length > 0 && updated[0].hasOwnProperty("error")) {
            Message({
              message: updated[0].error.toString()
            });
            deferred.resolve("failed");
          }
          else if (updated && updated.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            featureLayer.refresh();

            deferred.resolve("success");
          }
          else if (added && added.length > 0 && added[0].hasOwnProperty("error")) {

            Message({
              message: added[0].error.toString()
            });
            deferred.resolve("failed");
          }
          else if (added && added.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            var defs = null;
            if (this._attachmentUploader) {
              defs = this._attachmentUploader.postAttachments(featureLayer, added[0].objectId);
            }
            if (defs === undefined || defs === null || defs.length === 0) {
              this._completePost(featureLayer, added[0].objectId, deferred);
            }
            else {
              all(defs).then(lang.hitch(this,
                this._attachmentsComplete(featureLayer, added[0].objectId, deferred)));
            }
          }
        }), lang.hitch(this, function (err) {
          Message({
            message: err.message.toString() + "\n" + err.details
          });
          deferred.resolve("failed");
        }));
      },

      _resetEditingVariables: function () {
        this._isDirty = false;
        this._editingEnabled = false;
        if (this.editToolbar) {
          this.editToolbar.deactivate();
        }
        //this._turnEditGeometryToggleOff();
      },

      // cancel editing of the current feature
      _cancelEditingFeature: function (showTemplatePicker) {
        if (!this.currentFeature) { return; }

        if (showTemplatePicker) {

          this._showTemplate(true, false);
        } else { // show attr inspector

          // restore attributes & geometry
          if (this.currentFeature.preEditAttrs) {
            this.currentFeature.attributes = this.currentFeature.preEditAttrs;
          }
          if (this.currentFeature.origGeom) {
            this.currentFeature.geometry = geometryJsonUtil.fromJson(this.currentFeature.origGeom);
          }
          this.currentFeature.getLayer().refresh();
          this.attrInspector.refresh();

          //reset
          this._resetEditingVariables();

        }
      },
      _deleteFeature: function () {
        if (!this.currentFeature) { return; }

        this._resetEditingVariables();

        var layer = this.currentFeature.getLayer();
        if (layer.url === null) {
          layer.clear();
          this._showTemplate(true);

        } else {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton")[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (!domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }

          layer.applyEdits(null, null, [this.currentFeature],
            lang.hitch(this, function (adds, updates, deletes) {
              adds = adds;
              updates = updates;
              if (deletes && deletes.length > 0 && deletes[0].hasOwnProperty("error")) {
                Message({
                  message: deletes[0].error.toString()
                });

              }
              else {
                this.updateFeatures.splice(this.updateFeatures.indexOf(this.currentFeature), 1);

                if (this.updateFeatures && this.updateFeatures.length > 0) {
                  this.attrInspector.refresh();
                  this.attrInspector.first();
                } else {
                  this._showTemplate(true);
                }
              }
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }), lang.hitch(this, function (err) {
              Message({
                message: err.message.toString() + "\n" + err.details
              });
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }));
        }
      },

      _promptToDelete: function () {

        var dialog = new Popup({
          titleLabel: this.nls.deletePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.deletePrompt,
          buttons: [{
            label: this.nls.yes,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              this._deleteFeature();
              dialog.close();

            })
          }, {
            label: this.nls.no,
            classNames: ['jimu-btn'],

            onClick: lang.hitch(this, function () {

              dialog.close();

            })
          }

          ],
          onClose: lang.hitch(this, function () {

          })
        });
      },
      _promptToResolvePendingEdit: function (switchToTemplate, evt, showClose) {
        var disable = !this._validateAttributes();
        var buttons = [{
          label: this.nls.yes,
          classNames: ['jimu-btn'],
          disable: disable,
          onClick: lang.hitch(this, function () {
            this._saveEdit(this.currentFeature, switchToTemplate).then(function () {
            });
            this._postFeatureSave(evt);
            // this._activateTemplateToolbar();
            dialog.close();

          })
        }, {
          label: this.nls.no,
          classNames: ['jimu-btn'],

          onClick: lang.hitch(this, function () {
            this._cancelEditingFeature(switchToTemplate);
            this._postFeatureSave(evt);
            // this._activateTemplateToolbar();
            dialog.close();

          })
        }];
        if (showClose && showClose === true) {
          buttons.push({
            label: this.nls.back,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              dialog.close();
            })
          });
        }

        var dialog = new Popup({
          titleLabel: this.nls.savePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.savePrompt,
          buttons: buttons,
          onClose: lang.hitch(this, function () {

          })
        });

      },
      /*jshint unused:true */
      _setTheme: function () {
        //if (this.appConfig.theme.name === "BoxTheme" ||
        //    this.appConfig.theme.name === "DartTheme" ||
        //    this.appConfig.theme.name === "LaunchpadTheme") {
        var styleLink;
        if (this.appConfig.theme.name === "DartTheme") {
          jimuUtils.loadStyleLink('dartOverrideCSS', this.folderUrl + "/css/dartTheme.css", null);
        }
        else {
          styleLink = document.getElementById("dartOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
        if (this.appConfig.theme.name === "LaunchpadTheme") {
          jimuUtils.loadStyleLink('launchpadOverrideCSS', this.folderUrl + "/css/launchpadTheme.css", null);
        }
        else {
          styleLink = document.getElementById("launchpadOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
      },
      _getPortalUrl: function (url) {
        if (url) {
          return portalUrlUtils.getStandardPortalUrl(url);
        } else {
          return portalUrlUtils.getStandardPortalUrl(this.appConfig.portalUrl);
        }
      },
      _initControl: function (operLayerInfos) {
        this._userHasPrivilege = true;
        this._jimuLayerInfos = operLayerInfos;
        var onlyConfiged = false;
        if (this.config.editor && this.config.editor.layerInfos) {
          onlyConfiged = this.config.editor.layerInfos.length > 0;
        }
        this.config.editor.configInfos = editUtils.getConfigInfos(this._jimuLayerInfos,
          this.config.editor.layerInfos, true, onlyConfiged);
        if (onlyConfiged === true) {//if (onlyConfiged === false) {
          array.forEach(this.config.editor.configInfos, function (configInfo) {
            configInfo._editFlag = true;
          });
        }
        if (this.config.editor.configInfos === undefined || this.config.editor.configInfos === null) {
          return false;
        }
        else if (this.config.editor.configInfos.length === 0) {
          return false;
        }
        this._processConfig();

        array.forEach(this.config.editor.configInfos, function (configInfo) {
          configInfo.featureLayer.name = configInfo.layerInfo.title;
        }, this);

        if (this.config.editor.hasOwnProperty("autoSaveEdits")) {
          if (this.config.editor.autoSaveEdits) {
            this._autoSaveRuntime = this.config.editor.autoSaveEdits;
            if(this._autoSaveRuntime) {
              registry.byId("autoSaveSwitch").set('checked',true);
            } else {
              registry.byId("autoSaveSwitch").set('checked',false);
            }
          }
        }

        this._createEditor();
        // this.fetchDataByName('GroupFilter');
        this.widgetManager.activateWidget(this);
        return true;
      },

      _processConfig: function () {
        this.config.editor.configInfos = array.filter(this.config.editor.configInfos, function (configInfo) {
          if (configInfo._editFlag && configInfo._editFlag === true) {
            return true;
          } else {
            return false;
          }
        });
        array.forEach(this.config.editor.configInfos, function (configInfo) {

          var layerObject = configInfo.layerInfo.layerObject;
          if (layerObject &&
             layerObject.isEditable &&
             layerObject.isEditable()) {
            if (configInfo.allowUpdateOnly === false) {
              this.own(on(layerObject, "visibility-change, scale-visibility-change", lang.hitch(this, function () {
                //console.log("layer change" + state);
                this._createEditor();
              }
              )));
            }
            this._enableAttrInspectorSaveButton(this._validateAttributes());
            //this._enableAttrInspectorSaveButton(true);
            //this._isDirty = true;
            // modify templates with space in string fields
            this._removeSpacesInLayerTemplates(layerObject);
            this.processConfigForRuntime(configInfo);
            configInfo.configFeatureLayer = configInfo.featureLayer;
            configInfo.featureLayer = layerObject;
            configInfo.showDeleteButton = false;
          }
        }, this);
      },
      _createEditor: function () {
        var selectedTemplate = null;

        if (this.config.editor === undefined || this.config.editor === null) {
          return;
        }
        var layers = this._getEditableLayers(this.config.editor.configInfos, false);
        this._layerChangeOutside();
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
        }
        else {
          if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
            this._recreateOnNextShow = true;
            return;
          }
          
            this._createAutoSaveSwitch(this.config.editor.autoSaveEdits);
            this._createPresetTable(layers, this.config.editor.configInfos);

          
        }
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
        }
        else {
          this._creationDisabledOnAll = false;
        }
      },
      _getEditableLayers: function (layerInfos, allLayers) {
        var layers = [];
        array.forEach(layerInfos, function (layerInfo) {
          if (!layerInfo.allowUpdateOnly || allLayers) { //
            var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
            if (layerObject &&
               layerObject.visible &&
               layerObject.isVisibleAtScale(this.map.getScale()) &&
               layerObject.isEditable &&
               layerObject.isEditable()) {
              layers.push(layerObject);
            }
          }
        }, this);

        return layers;
      },
      _layerChangeOutside: function () {
        if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
          if (this.attrInspector) {
            if (this.attrInspector._numFeatures === 0) {
              this._showTemplate(true);

            }
          }
        }
      },
      _createAutoSaveSwitch: function(defaultState) {
        if (defaultState) {
          query(".autoSaveOptionDiv")[0].style.display = "block";
        } else {
          query(".autoSaveOptionDiv")[0].style.display = "none";
        }
      },
      _createPresetTable: function (layers, layerInfos) {
        // set preset values table
        var editLayerInfos = layerInfos;//this._getEditableLayersInfos(layerInfos)
        if (layers.length > 0 && this._hasPresetValueFields(editLayerInfos)) {
          this._initPresetFieldsTable();
          this._fillPresetValueTable(editLayerInfos);
          query(".presetFieldsTableDiv")[0].style.display = "block";
        } else {
          query(".presetFieldsTableDiv")[0].style.display = "none";
        }
      },
      _hasPresetValueFields: function (layerInfos) {
        return layerInfos.some(function (layerInfo) {
          if (layerInfo.allowUpdateOnly === false) {
            if (layerInfo.fieldInfos) {
              return layerInfo.fieldInfos.some(function (fi) {
                return fi.canPresetValue === true;
              });
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        }, this);

      },

      _initPresetFieldsTable: function () {
        var presetValueTableNode = domConstruct.create("div", { "class": "ee-presetValueTableDiv templatePicker" },
          this.presetFieldsTableNode);

        var bodyDiv = domConstruct.create("div", { "class": "bodyDiv" }, presetValueTableNode);
        var bodyTable = domConstruct.create("table",
          { "class": "ee-presetValueBodyTable" }, bodyDiv);

        domConstruct.create("tbody", { "class": "ee-presetValueBody", "id": "eePresetValueBody" },
          bodyTable, "first");
      },

      onReceiveData: function(name, widgetId, data) {
        if (name === 'framework' && widgetId === 'framework' && data && data.searchString) {
          this.searchDijit.set('value', data.searchString);
          this.searchDijit.search();
        }
      },

      setPosition: function(position) {
        this._resetSearchDijitStyle(position);
        this.inherited(arguments);
      },

      resize: function() {
        this._resetSearchDijitStyle();
      },

      onLayerInfosFilterChanged: function(changedLayerInfos) {
        array.some(changedLayerInfos, lang.hitch(this, function(info) {
          if (this.searchDijit && this.searchDijit.sources && this.searchDijit.sources.length > 0) {
            array.forEach(this.searchDijit.sources, function(s) {
              if (s._featureLayerId === info.id) {
                s.featureLayer.setDefinitionExpression(info.getFilter());
              }
            });
          }
        }));
      },

      _resetSearchDijitStyle: function() {
        html.removeClass(this.domNode, 'use-absolute');
        if (this.searchDijit && this.searchDijit.domNode) {
          html.setStyle(this.searchDijit.domNode, 'width', 'auto');
        }

        setTimeout(lang.hitch(this, function() {
          if (this.searchDijit && this.searchDijit.domNode) {
            var box = {
              w: !window.appInfo.isRunInMobile ? 274 : // original width of search dijit
                parseInt(html.getComputedStyle(this.domNode).width, 10)
            };
            var sourcesBox = html.getMarginBox(this.searchDijit.sourcesBtnNode);
            var submitBox = html.getMarginBox(this.searchDijit.submitNode);
            var style = null;
            if (box.w) {
              html.setStyle(this.searchDijit.domNode, 'width', box.w + 'px');
              html.addClass(this.domNode, 'use-absolute');

              if (isFinite(sourcesBox.w) && isFinite(submitBox.w)) {
                if (window.isRTL) {
                  style = {
                    left: submitBox.w + 'px',
                    right: sourcesBox.w + 'px'
                  };
                } else {
                  style = {
                    left: sourcesBox.w + 'px',
                    right: submitBox.w + 'px'
                  };
                }
                var inputGroup = query('.searchInputGroup', this.searchDijit.domNode)[0];

                if (inputGroup) {
                  html.setStyle(inputGroup, style);
                  var groupBox = html.getMarginBox(inputGroup);
                  var extents = html.getPadBorderExtents(this.searchDijit.inputNode);
                  html.setStyle(this.searchDijit.inputNode, 'width', groupBox.w - extents.w + 'px');
                }
              }
            }
          }
        }), 50);
      },

      _convertConfig: function(config) {
        var sourceDefs = array.map(config.sources, lang.hitch(this, function(source) {
          var def = new Deferred();
          if (source && source.url && source.type === 'locator') {
            var _source = {
              locator: new Locator(source.url || ""),
              outFields: ["*"],
              singleLineFieldName: source.singleLineFieldName || "",
              name: jimuUtils.stripHTML(source.name || ""),
              placeholder: jimuUtils.stripHTML(source.placeholder || ""),
              countryCode: source.countryCode || "",
              maxSuggestions: source.maxSuggestions,
              maxResults: source.maxResults || 6,
              zoomScale: source.zoomScale || 50000,
              useMapExtent: !!source.searchInCurrentMapExtent
            };

            if (source.enableLocalSearch) {
              _source.localSearchOptions = {
                minScale: source.localSearchMinScale,
                distance: source.localSearchDistance
              };
            }

            def.resolve(_source);
          } else if (source && source.url && source.type === 'query') {
            var searchLayer = new FeatureLayer(source.url || null, {
              outFields: ["*"]
            });

            this.own(on(searchLayer, 'load', lang.hitch(this, function(result) {
              var flayer = result.layer;
              var template = this._getInfoTemplate(flayer, source, source.displayField);
              var fNames = null;
              if (source.searchFields && source.searchFields.length > 0) {
                fNames = source.searchFields;
              } else {
                fNames = [];
                array.forEach(flayer.fields, function(field) {
                  if (field.type !== "esriFieldTypeOID" && field.name !== flayer.objectIdField &&
                    field.type !== "esriFieldTypeGeometry") {
                    fNames.push(field.name);
                  }
                });
              }
              var convertedSource = {
                featureLayer: flayer,
                outFields: ["*"],
                searchFields: fNames,
                displayField: source.displayField || "",
                exactMatch: !!source.exactMatch,
                name: jimuUtils.stripHTML(source.name || ""),
                placeholder: jimuUtils.stripHTML(source.placeholder || ""),
                maxSuggestions: source.maxSuggestions || 6,
                maxResults: source.maxResults || 6,
                zoomScale: source.zoomScale || 50000,
                infoTemplate: template,
                useMapExtent: !!source.searchInCurrentMapExtent,
                _featureLayerId: source.layerId
              };
              if (!template) {
                delete convertedSource.infoTemplate;
              }
              if (convertedSource._featureLayerId) {
                var layerInfo = this.layerInfosObj
                  .getLayerInfoById(convertedSource._featureLayerId);
                flayer.setDefinitionExpression(layerInfo.getFilter());
              }
              def.resolve(convertedSource);
            })));

            this.own(on(searchLayer, 'error', function() {
              def.resolve(null);
            }));
          } else {
            def.resolve(null);
          }
          return def;
        }));

        return sourceDefs;
      },

      _getInfoTemplate: function(fLayer, source, displayField) {
        var layerInfo = this.layerInfosObj.getLayerInfoById(source.layerId);
        var template = layerInfo && layerInfo.getInfoTemplate();
        var validTemplate = layerInfo && template;

        if (layerInfo && !validTemplate) { // doesn't enabled pop-up
          return null;
        } else if (validTemplate) {
          // configured media or attachments
          return template;
        } else { // (added by user in setting) or (only configured fieldInfo)
          template = new InfoTemplate();
          template.setTitle('&nbsp;');
          template.setContent(
            lang.hitch(this, '_formatContent', source.name, fLayer, displayField)
          );

          return template;
        }
      },

      _getSourcePopupInfo: function(source) {
        if (source._featureLayerId) {
          var layerInfo = this.layerInfosObj.getLayerInfoById(source._featureLayerId);
          if (layerInfo) {
            return layerInfo.getPopupInfo();
          }
        }
        return null;
      },

      _captureSelect: function(e) {
        var sourceIndex = this.searchDijit.activeSourceIndex;
        if (sourceIndex === 'all') {
          sourceIndex = this._getSourceIndexOfResult(e);
        }
        if (isFinite(sourceIndex) && esriLang.isDefined(sourceIndex)) {
          var source = this.searchDijit.sources[sourceIndex];
          if (source && 'featureLayer' in source) {
            var popupInfo = this._getSourcePopupInfo(source);
            var notFormatted = (popupInfo && popupInfo.showAttachments) ||
              (popupInfo && popupInfo.description &&
              popupInfo.description.match(/http(s)?:\/\//)) ||
              (popupInfo && popupInfo.mediaInfos && popupInfo.mediaInfos.length > 0);

            // set a private property for select-result to get original feature from layer.
            if (!e.feature.__attributes) {
              e.feature.__attributes = e.feature.attributes;
            }

            if (!notFormatted) {
              var formatedAttrs = this._getFormatedAttrs(
                lang.clone(e.feature.attributes),
                source.featureLayer.fields,
                source.featureLayer.typeIdField,
                source.featureLayer.types,
                popupInfo
              );

              e.feature.attributes = formatedAttrs;
            }
          }
        }
        //this._CreateATI(e);

        return [e];
      },

      _getSourceIndexOfResult: function(e) {
        if (this.searchResults){
          for (var i in this.searchResults) {
            var sourceResults = this.searchResults[i];
            var pos = array.indexOf(sourceResults, e);
            if (pos > -1) {
              return parseInt(i, 10);
            }
          }
        }

        return null;
      },

      _formatContent: function(title, fLayer, displayField, graphic) {
        var content = "";
        if (graphic && graphic.attributes && fLayer && fLayer.url) {
          var aliasAttrs = {};
          array.forEach(fLayer.fields, lang.hitch(this, function(field) {
            if (field.name in graphic.attributes){
              aliasAttrs[field.alias || field.name] = graphic.attributes[field.name];
            }
          }));
          var displayValue = graphic.attributes[displayField];
          content += '<div class="esriViewPopup">' +
            '<div class="mainSection">' +
            (esriLang.isDefined(displayValue) ?
              ('<div class="header">' + title + ': ' + displayValue + '</div>') : "") +
            '<div class="hzLine"></div>' +
            '<div>' +
            '<table class="attrTable" cellpading="0" cellspacing="0">' +
            '<tbody>';
          for (var p in aliasAttrs) {
            if (aliasAttrs.hasOwnProperty(p)) {
              content += '<tr valign="top">' +
                '<td class="attrName">' + p + '</td>' +
                '<td class="attrValue">' + aliasAttrs[p] + '</td>' +
                '</tr>';
            }
          }
          content += '</tbody>' +
            '</table>' +
            '</div>' +
            '<div class="break"></div>' +
            '</div>';
        }

        return content;
      },

      _getFormatedAttrs: function(attrs, fields, typeIdField, types, popupInfo) {
        function getFormatInfo(fieldName) {
          if (popupInfo && esriLang.isDefined(popupInfo.fieldInfos)) {
            for (var i = 0, len = popupInfo.fieldInfos.length; i < len; i++) {
              var f = popupInfo.fieldInfos[i];
              if (f.fieldName === fieldName) {
                return f.format;
              }
            }
          }

          return null;
        }

        var aliasAttrs = {};
        array.forEach(fields, lang.hitch(this, function(_field, i) {
          if (!attrs[_field.name]) {
            return;
          }
          var isCodeValue = !!(_field.domain && _field.domain.type === 'codedValue');
          var isDate = _field.type === "esriFieldTypeDate";
          var isTypeIdField = typeIdField && (_field.name === typeIdField);
          var fieldAlias = _field.name;

          if (fields[i].type === "esriFieldTypeDate") {
            aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getFormattedDate(
              attrs[_field.name], getFormatInfo(_field.name)
              );
          } else if (fields[i].type === "esriFieldTypeDouble" ||
            fields[i].type === "esriFieldTypeSingle" ||
            fields[i].type === "esriFieldTypeInteger" ||
            fields[i].type === "esriFieldTypeSmallInteger") {
            aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getFormattedNumber(
              attrs[_field.name], getFormatInfo(_field.name)
              );
          }

          if (isCodeValue) {
            aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getCodedValue(
              _field.domain, attrs[_field.name]
              );
          } else if (isTypeIdField) {
            aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getTypeName(
              attrs[_field.name], types
              );
          } else if (!isCodeValue && !isDate && !isTypeIdField) {
            // Not A Date, Domain or Type Field
            // Still need to check for codedType value
            aliasAttrs[fieldAlias] = fieldAlias in aliasAttrs ?
              aliasAttrs[fieldAlias] : attrs[_field.name];
            aliasAttrs[fieldAlias] = this.getCodeValueFromTypes(
              _field,
              typeIdField,
              types,
              attrs,
              aliasAttrs
            );
          }
        }));
        return aliasAttrs;
      },

      getCodeValueFromTypes: function(field, typeIdField, types, obj, aliasAttrs) {
        var codeValue = null;
        if (typeIdField && types && types.length > 0) {
          var typeChecks = array.filter(types, lang.hitch(this, function(item) {
            // value of typeIdFild has been changed above
            return item.name === obj[typeIdField];
          }));
          var typeCheck = (typeChecks && typeChecks[0]) || null;

          if (typeCheck && typeCheck.domains &&
            typeCheck.domains[field.name] && typeCheck.domains[field.name].codedValues) {
            codeValue = jimuUtils.fieldFormatter.getCodedValue(
              typeCheck.domains[field.name],
              obj[field.name]
            );
          }
        }
        var fieldAlias = field.name;
        var _value = codeValue !== null ? codeValue : aliasAttrs[fieldAlias];
        return _value || isFinite(_value) ? _value : "";
      },

      _resetSelectorPosition: function(cls) {
        var layoutBox = html.getMarginBox(window.jimuConfig.layoutId);
        query(cls, this.domNode).forEach(lang.hitch(this, function(menu) {
          var menuPosition = html.position(menu);
          if (html.getStyle(menu, 'display') === 'none') {
            return;
          }
          var dijitPosition = html.position(this.searchDijit.domNode);
          var up = dijitPosition.y - 2;
          var down = layoutBox.h - dijitPosition.y - dijitPosition.h;
          if ((down > menuPosition.y + menuPosition.h) || (up > menuPosition.h)) {
            html.setStyle(
              menu,
              'top',
              (
                (down > menuPosition.y + menuPosition.h) ?
                dijitPosition.h : -menuPosition.h - 2
              ) + 'px'
            );
          } else {
            html.setStyle(menu, 'height', Math.max(down, up) + 'px');
            html.setStyle(menu, 'top', (down > up ? dijitPosition.h : -up - 2) + 'px');
          }
        }));
      },

      _onSourceIndexChange: function() {
        if (this.searchDijit.value) {
          this.searchDijit.search(this.searchDijit.value);
        }
      },

      _onSearchDijitClick: function() {
        this._resetSelectorPosition('.searchMenu');
      },

      _onSearchResults: function(evt) {
        var sources = this.searchDijit.get('sources');
        var activeSourceIndex = this.searchDijit.get('activeSourceIndex');
        var value = this.searchDijit.get('value');
        var htmlContent = "";
        var results = evt.results;
        var _activeSourceNumber = null;
        if (results && evt.numResults > 0) {
          html.removeClass(this.searchDijit.containerNode, 'showSuggestions');

          this.searchResults = results;
          htmlContent += '<div class="show-all-results jimu-ellipsis" title="' +
            this.nls.showAll + '">' +
            this.nls.showAllResults + '<strong >' + value + '</strong></div>';
          htmlContent += '<div class="searchMenu" role="menu">';
          for (var i in results) {
            if (results[i] && results[i].length) {
              var name = sources[parseInt(i, 10)].name;
              if (sources.length > 1 && activeSourceIndex === 'all') {
                htmlContent += '<div title="' + name + '" class="menuHeader">' + name + '</div>';
              }
              htmlContent += "<ul>";
              var partialMatch = value;
              var r = new RegExp("(" + partialMatch + ")", "gi");
              var maxResults = sources[i].maxResults;

              for (var j = 0, len = results[i].length; j < len && j < maxResults; j++) {
                var text = esriLang.isDefined(results[i][j].name) ?
                  results[i][j].name : this.nls.untitled;

                htmlContent += '<li title="' + text + '" data-index="' + j +
                  '" data-source-index="' + i + '" role="menuitem" tabindex="0">' +
                  text.toString().replace(r, "<strong >$1</strong>") + '</li>';
              }
              htmlContent += '</url>';

              if (evt.numResults === 1) {
                _activeSourceNumber = i;
              }
            }
          }
          htmlContent += "</div>";
          this.searchResultsNode.innerHTML = htmlContent;

          this._showResultMenu();

          this._resetSelectorPosition('.searchMenu');
        } else {
          this._onClearSearch();
        }
        // publish search results to other widgets
        this.publishData({
          'searchResults': evt
        });
      },

      _onSuggestResults: function(evt) {
        this._resetSelectorPosition('.searchMenu');

        this._hideResultMenu();
        // publish suggest results to other widgets
        this.publishData({
          'suggestResults': evt
        });
      },

      _onSelectSearchResult: function(evt) {
        // var target = evt.target;
        // while(!(html.hasAttr(target, 'data-source-index') && html.getAttr(target, 'data-index'))) {
        //   target = target.parentNode;
        // }
        // var result = null;
        // var dataSourceIndex = html.getAttr(target, 'data-source-index');
        // var dataIndex = parseInt(html.getAttr(target, 'data-index'), 10);
        // // var sources = this.searchDijit.get('sources');

        // if (dataSourceIndex !== 'all') {
        //   dataSourceIndex = parseInt(dataSourceIndex, 10);
        // }
        // if (this.searchResults && this.searchResults[dataSourceIndex] &&
        //   this.searchResults[dataSourceIndex][dataIndex]) {
        //   result = this.searchResults[dataSourceIndex][dataIndex];
        //   //this.searchDijit.select(result);
        // }
        //start
        // if (this.updateFeatures.length > 0) {
        //       this._showTemplate(false);
        //     }
        //     else {
        //       this._byPass = true;
        //       // this.map.popupManager._showPopup(evt);
        //       this._byPass = false;
        //     }
        this._CreateATI(evt);
          //end
      },

      _onSelectResult: function(e) {
        var result = e.result;
        if (!(result && result.name)) {
          return;
        }
        var dataSourceIndex = e.sourceIndex;
        var sourceResults = this.searchResults[dataSourceIndex];
        var dataIndex = 0;
        var that = this;

        var getGraphics = function(layer, fid) {
          var graphics = layer.graphics;
          var gs = array.filter(graphics, function(g) {
            return g.attributes[layer.objectIdField] === fid;
          });
          return gs;
        };
        var showPopupByFeatures = function(features) {
          var location = null;
          that.map.infoWindow.setFeatures(features);
          if (features[0].geometry.type === "point") {
            location = features[0].geometry;
          } else {
            location = features[0].geometry.getExtent().getCenter();
          }
          that.map.infoWindow.show(location, {
            closetFirst: true
          });
        };

        for (var i = 0, len = sourceResults.length; i < len; i++) {
          if (jimuUtils.isEqual(sourceResults[i], result)) {
            dataIndex = i;
            break;
          }
        }
        query('li', this.searchResultsNode)
          .forEach(lang.hitch(this, function(li) {
            html.removeClass(li, 'result-item-selected');
            var title = html.getAttr(li, 'title');
            var dIdx = html.getAttr(li, 'data-index');
            var dsIndex = html.getAttr(li, 'data-source-index');

            if (title === result.name &&
              dIdx === dataIndex.toString() &&
              dsIndex === dataSourceIndex.toString()) {
              html.addClass(li, 'result-item-selected');
            }
          }));

        var layer = this.map.getLayer(e.source._featureLayerId);

        if (layer && this.config.showInfoWindowOnSelect) {
          var gs = getGraphics(layer, e.result.feature.__attributes[layer.objectIdField]);
          if (gs.length > 0) {
            showPopupByFeatures(gs);
          } else {
            var handle = on(layer, 'update-end', lang.hitch(this, function() {
              if (this.domNode) {
                var gs = getGraphics(layer, e.result.feature.__attributes[layer.objectIdField]);
                if (gs.length > 0) {
                  showPopupByFeatures(gs);
                }
              }

              if (handle && handle.remove) {
                handle.remove();
              }
            }));
            this.own(handle);
          }
        }
        // publish select result to other widgets
        this.publishData({
          'selectResult': e
        });
      },

      _onClearSearch: function() {
        html.setStyle(this.searchResultsNode, 'display', 'none');
        this.searchResultsNode.innerHTML = "";
        this.searchResults = null;
      },

      _hideResultMenu: function() {
        query('.show-all-results', this.searchResultsNode).style('display', 'block');
        query('.searchMenu', this.searchResultsNode).style('display', 'none');
      },

      _showResultMenu: function() {
        html.setStyle(this.searchResultsNode, 'display', 'block');
        query('.show-all-results', this.searchResultsNode).style('display', 'none');
        query('.searchMenu', this.searchResultsNode).style('display', 'block');

        var groupNode = query('.searchInputGroup', this.searchDijit.domNode)[0];
        if (groupNode) {
          var groupBox = html.getMarginBox(groupNode);
          var style = {
            width: groupBox.w + 'px'
          };
          if (window.isRTL) {
            var box = html.getMarginBox(this.searchDijit.domNode);
            style.right = (box.w - groupBox.l - groupBox.w) + 'px';
          } else {
            style.left = groupBox.l + 'px';
          }
          query('.show-all-results', this.searchResultsNode).style(style);
          query('.searchMenu', this.searchResultsNode).style(style);
        }
      },
      
      /***************************************
             * Methods for data handle. EDIT Start
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
              /***************************************
             * 
             * EDIT End
             ***************************************/

      destroy: function() {
        utils.setMap(null);
        utils.setLayerInfosObj(null);
        utils.setAppConfig(null);
        if (this.searchDijit) {
          this.searchDijit.clear();
        }

        this.inherited(arguments);

        if (this.attrInspector) {
          this.attrInspector.destroy();
        }
        this.attrInspector = null;
      }
    });
  });