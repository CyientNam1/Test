///////////////////////////////////////////////////////////////////////////
// Robert Scheitlin WAB eSearch Widget
///////////////////////////////////////////////////////////////////////////
/*global define, dojo, console, window, setTimeout, jimuConfig*/
define([
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'jimu/dijit/TabContainer',
    './List',
    './Parameters',
    './RelateChooser',
    'jimu/dijit/Message',
    'jimu/utils',
    'esri/urlUtils',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/tasks/RelationshipQuery',
    'esri/layers/CodedValueDomain',
    'esri/layers/Domain',
    'esri/layers/GraphicsLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/FeatureType',
    'esri/layers/Field',
    'esri/layers/RangeDomain',
    'esri/tasks/BufferParameters',
    'esri/tasks/GeometryService',
    'esri/config',
    'esri/graphic',
    'esri/graphicsUtils',
    'esri/geometry/Point',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/geometry/Polyline',
    'esri/symbols/SimpleLineSymbol',
    'esri/geometry/Polygon',
    'esri/geometry/Multipoint',
    'esri/geometry/Extent',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/jsonUtils',
    'esri/renderers/SimpleRenderer',
    'esri/renderers/jsonUtils',
    'esri/toolbars/draw',
    'esri/dijit/PopupTemplate',
    'esri/request',
    'esri/Color',
    'dojo/Deferred',
    'dijit/ProgressBar',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/html',
    'dojo/_base/array',
    'dojo/promise/all',
    'dojo/date',
    'dojo/date/locale',
    'dijit/form/Select',
    'dijit/form/TextBox',
    'dijit/form/NumberTextBox',
    'jimu/dijit/DrawBox',
    'jimu/dijit/LoadingShelter',
    'dojo/io-query',
    'dojo/query',
    'esri/SpatialReference',
    'jimu/WidgetManager',
    'jimu/PanelManager',
    'dojo/aspect',
    'esri/domUtils',
    'jimu/LayerInfos/LayerInfos',
    'jimu/CSVUtils',
    'jimu/BaseFeatureAction',
    'jimu/FeatureActionManager',
    'jimu/dijit/PopupMenu',
    'esri/tasks/FeatureSet',
    'dojo/dom-construct',
    'dojo/dom-class',
    'jimu/dijit/CheckBox',
    'dijit/form/DropDownButton',
    'dijit/Menu',
    'dijit/MenuItem'
  ],
  function (
    declare, _WidgetsInTemplateMixin, BaseWidget, TabContainer, List, Parameters, RelateChooser, Message, jimuUtils, urlUtils, Query, QueryTask,
    RelationshipQuery, CodedValueDomain, Domain, GraphicsLayer, FeatureLayer, FeatureType, Field, RangeDomain, BufferParameters, GeometryService,
    esriConfig, Graphic, graphicsUtils, Point, SimpleMarkerSymbol, PictureMarkerSymbol, Polyline, SimpleLineSymbol, Polygon, Multipoint, Extent,
    SimpleFillSymbol, symUtils, SimpleRenderer, jsonUtil, Draw, PopupTemplate, esriRequest, Color, Deferred, ProgressBar, lang, on, html, array,
    all, date, locale, Select, TextBox, NumberTextBox, DrawBox, LoadingShelter, ioquery, dojoQuery, SpatialReference, WidgetManager,
    PanelManager, aspect, domUtils, LayerInfos, CSVUtils, BaseFeatureAction, FeatureActionManager, PopupMenu, FeatureSet, domConstruct, domClass
  ) { /*jshint unused: true*/
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'eSearch',
      label:'Enhanced Search',
      baseClass: 'widget-esearch',
      resultLayers: [],
      operationalLayers: [],
      graphicLayerIndex: 0,
      AttributeLayerIndex: 0,
      spatialLayerIndex: 0,
      expressIndex: 0,
      progressBar: null,
      tabContainer: null,
      list: null,
      selTab: null,
      garr: [],
      pointSearchTolerance: 6,
      polygonsToDiscard: [],
      autozoomtoresults: false,
      layerautozoomtoresults: false,
      keepgraphicalsearchenabled: false,
      layerDomainsCache: {},
      layerUniqueCache: null,
      graphicsLayerBuffer: null,
      bufferWKID: null,
      initiator: null,
      currentLayerIndex: null,
      lastWhere: null,
      wManager: null,
      pManager: null,
      attTableOpenedbySearch: false,
      oidArray: null,
      disabledTabs: null,
      shapeTab: true,
      attribTab: true,
      spatTab: true,
      rsltsTab: true,
      mouseovergraphics: false,
      lastDrawCommonType: null,
      lastDrawTool: null,
      zoomAttempt: 0,
      tempResultLayer: null,
      currentSearchLayer: null,
      currentFeatures: null,
      eLocateGLFound: false,
      locateGraphicsLayer: null,
      mapLayerAddResultEvent: null,
      eLocateEnabled: true,
      gSelectTypeVal: 'new',
      aSelectTypeVal: 'new',
      serviceFailureNames: [],
      resultFormatString: "",
      operLayerInfos: null,
      sumResultArr: [],
      sumFields: [],
      currentCSVResults: null,
      popupMenu: null,
      autoactivatedtool: null,

      postCreate: function () {
        this.inherited(arguments);
        this.popupMenu = PopupMenu.getInstance();
        this.featureActionManager = FeatureActionManager.getInstance();
        if(this.config.graphicalsearchoptions.autoactivatedtool){
          this.autoactivatedtool = this.config.graphicalsearchoptions.autoactivatedtool;
        }
        if (this.map.itemId) {
          LayerInfos.getInstance(this.map, this.map.itemInfo)
            .then(lang.hitch(this, function(operLayerInfos) {
              this.operLayerInfos = operLayerInfos;
            }));
        } else {
          var itemInfo = this._obtainMapLayers();
          LayerInfos.getInstance(this.map, itemInfo)
            .then(lang.hitch(this, function(operLayerInfos) {
              this.operLayerInfos = operLayerInfos;
            }));
        }
        html.empty(this.divResultMessage);
        this.resultLayers = [];
        this.layerUniqueCache = {};
        this._initResultFormatString();
        this._initTabContainer();
        this._initBufferUnits();
        this._initSpatialRelationships();
        this._initLayerSelect();
        this._initProgressBar();
        this._initDrawBox();
        this._initCheckForSupportedWidgets();
        this._combineRadioCheckBoxWithLabel();
        this.garr = [];
        this.polygonsToDiscard = [];
        this._addBufferLayer();
        this.wManager = WidgetManager.getInstance();
        this.pManager = PanelManager.getInstance();
        aspect.before(this, "onClose", this.closeDDs);
        this.own(on(this.domNode, 'mousedown', lang.hitch(this, function (event) {
          event.stopPropagation();
          if (event.altKey) {
            var msgStr = this.nls.widgetverstr + ': ' + this.manifest.version;
            msgStr += '\n' + this.nls.wabversionmsg + ': ' + this.manifest.wabVersion;
            msgStr += '\n' + this.manifest.description;
            new Message({
              titleLabel: this.nls.widgetversion,
              message: msgStr
            });
          }
        })));
      },

      _obtainMapLayers: function() {
        // summary:
        //    obtain basemap layers and operational layers if the map is not webmap.
        var basemapLayers = [],
          operLayers = [];
        // emulate a webmapItemInfo.
        var retObj = {
          itemData: {
            baseMap: {
              baseMapLayers: []
            },
            operationalLayers: []
          }
        };
        array.forEach(this.map.graphicsLayerIds, function(layerId) {
          var layer = this.map.getLayer(layerId);
          if (layer.isOperationalLayer) {
            operLayers.push({
              layerObject: layer,
              title: layer.label || layer.title || layer.name || layer.id || " ",
              id: layer.id || " "
            });
          }
        }, this);
        array.forEach(this.map.layerIds, function(layerId) {
          var layer = this.map.getLayer(layerId);
          if (layer.isOperationalLayer) {
            operLayers.push({
              layerObject: layer,
              title: layer.label || layer.title || layer.name || layer.id || " ",
              id: layer.id || " "
            });
          } else {
            basemapLayers.push({
              layerObject: layer,
              id: layer.id || " "
            });
          }
        }, this);

        retObj.itemData.baseMap.baseMapLayers = basemapLayers;
        retObj.itemData.operationalLayers = operLayers;
        return retObj;
      },

      _initCheckForSupportedWidgets: function () {
        if(this.eLocateEnabled){
          array.forEach(this.map.graphicsLayerIds, lang.hitch(this, function(glId){
            var layer = this.map.getLayer(glId);
            if(layer.name && layer.name.toLowerCase() === "elocate results"){
              this.locateGraphicsLayer = layer;

              on(this.locateGraphicsLayer, 'graphic-add', lang.hitch(this, this.checkeLocateNumGras));
              on(this.locateGraphicsLayer, 'graphic-remove', lang.hitch(this, this.checkeLocateNumGras));
              on(this.locateGraphicsLayer, 'graphic-clear',  lang.hitch(this, this.checkeLocateNumGras));
              this.eLocateGLFound = true;

              //Add the button
              var itemsDiv = dojoQuery('.draw-items', this.drawBox.domNode);
              var eLocateButton = html.create('div', {
                'style': 'display:none;',
                'class': 'draw-item',
                'data-gratype': 'ELOCATE',
                'title': this.nls.eLocateTip
              }, itemsDiv[0]);
              html.addClass(eLocateButton, 'elocate-icon');
              this.own(on(eLocateButton, 'click', lang.hitch(this, this._eLocateButtonOnClick)));

              if(this.locateGraphicsLayer.graphics.length > 0){
                this.checkeLocateNumGras();
              }
            }
          }));
          if(!this.eLocateGLFound){
            this.own(this.mapLayerAddResultEvent = this.map.on('layer-add-result', lang.hitch(this, this.checkForeLocateGL)));
          }
        }
      },

      _initResultFormatString: function () {
        this.list._wrapResults = this.config.resultFormat.wrap || false;
        var tBold = false, tItalic = false, tUnder = false, tColorHex = "#000000";
        var vBold = false, vItalic = false, vUnder = false, vColorHex = "#000000";
        this.resultFormatString = "";
        if(this.config.resultFormat){
          var attribName = '[attribname]';
          tBold = this.config.resultFormat.attTitlesymbol.bold;
          tItalic = this.config.resultFormat.attTitlesymbol.italic;
          tUnder = this.config.resultFormat.attTitlesymbol.underline;
          if(this.config.resultFormat.attTitlesymbol.color){
            tColorHex = new Color(this.config.resultFormat.attTitlesymbol.color).toHex();
          }
          if(tBold){
            attribName = "<strong>" + attribName + "</strong>";
          }
          if(tItalic){
            attribName = "<em>" + attribName + "</em>";
          }
          if(tUnder){
            attribName = "<u>" + attribName + "</u>";
          }
          if(tColorHex){
            attribName = "<font color='" + tColorHex + "'>" + attribName + "</font>";
          }
          var attribValue = '[attribvalue]';
          vBold = this.config.resultFormat.attValuesymbol.bold;
          vItalic = this.config.resultFormat.attValuesymbol.italic;
          vUnder = this.config.resultFormat.attValuesymbol.underline;
          if(this.config.resultFormat.attValuesymbol.color){
            vColorHex = new Color(this.config.resultFormat.attValuesymbol.color).toHex();
          }
          if(vBold){
            attribValue = "<strong>" + attribValue + "</strong>";
          }
          if(vItalic){
            attribValue = "<em>" + attribValue + "</em>";
          }
          if(vUnder){
            attribValue = "<u>" + attribValue + "</u>";
          }
          if(vColorHex){
            attribValue = "<font color='" + vColorHex + "'>" + attribValue + "</font>";
          }
          this.resultFormatString = attribName + ": " + attribValue + '<br>';
        }else{
          this.resultFormatString = '<font><em>[attribname]</em></font>: <font>[attribvalue]</font><br>';
        }
      },

      startup: function(){
        this.inherited(arguments);
        this.fetchData();
        this.list.parentWidget = this;
      },

      onReceiveData: function(name, widgetId, data) {
        if(data.message && data.message === "Deactivate_DrawTool"){
          this.drawBox.deactivate();
        }
      },

      _getFeatureSet: function(){
        var layer = this.currentSearchLayer;
        var featureSet = new FeatureSet();
        featureSet.fields = lang.clone(layer.fields);
        featureSet.features = [].concat(layer.graphics);
        featureSet.geometryType = layer.geometryType;
        featureSet.fieldAliases = {};
        array.forEach(featureSet.fields, lang.hitch(this, function(fieldInfo){
          var fieldName = fieldInfo.name;
          var fieldAlias = fieldInfo.alias || fieldName;
          featureSet.fieldAliases[fieldName] = fieldAlias;
        }));
        return featureSet;
      },

      _onBtnMenuClicked: function(evt){
        var position = html.position(evt.target || evt.srcElement);
        var featureSet = this._getFeatureSet();

        var layer = this.currentSearchLayer;
        if(!layer.fields){
          layer.fields = [];
        }
        if(!featureSet.geometryType){
          var geomType = "";
          switch(layer.graphics[0].geometry.type){
            case "point":
            case "multipoint":
              geomType = "esriGeometryPoint";
              break;
            case "polygon":
            case "extent":
              geomType = "esriGeometryPolygon";
              break;
            case "polyline":
              geomType = "esriGeometryPolyline";
              break;
          }
          featureSet.geometryType = geomType;
          featureSet.fields = [];
        }
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var noStats = this.getNoStatFieldNames(layerConfig);
        this.featureActionManager.getSupportedActions(featureSet, layer).then(lang.hitch(this, function(actions){
          array.forEach(actions, lang.hitch(this, function(action){
            //console.info(action);
            if(action.name === "eShowStatistics"){
              if(noStats.length > 0){
                var gFlds = array.filter(featureSet.fields, lang.hitch(this, function(field){
                  return noStats.indexOf(field.name) === -1;
                }));
                //console.info(gFlds);
                featureSet.fields = gFlds;
              }
              action.data = featureSet;
            }else{
              action.data = featureSet;
            }
          }));

          // if(layerConfig.relates && layerConfig.relates.relate && this.list.getSelectedItem){
          //   var showRelateAction = new BaseFeatureAction({
          //     name: "eShowRelate",
          //     iconClass: 'icon-show-related-record',
          //     label: this.nls._featureAction_eShowRelate,
          //     iconFormat: 'svg',
          //     map: this.map,
          //     onExecute: lang.hitch(this, function(){
          //       this._relateResultItem(0, this.list.getSelectedItem());
          //     })
          //   });
          //   showRelateAction.name = "eShowRelate";
          //   showRelateAction.data = featureSet;
          //   actions.push(showRelateAction);
          // }

          if(!layerConfig.export2Geo){
            actions = array.filter(actions, lang.hitch(this, function(action){
              return action.name !== 'ExportToGeoJSON';
            }));
          }

          if(!layerConfig.export2FC){
            actions = array.filter(actions, lang.hitch(this, function(action){
              return action.name !== 'ExportToFeatureCollection';
            }));
          }

          actions = array.filter(actions, lang.hitch(this, function(action){
            return action.name !== 'CreateLayer' && action.name !== 'ShowStatistics' && action.name !== 'ExportToCSV';
          }));

          if(layerConfig.export2Csv){
            var exportCSVAction = new BaseFeatureAction({
              name: "eExportToCSV",
              iconClass: 'icon-export',
              label: this.nls._featureAction_eExportToCSV,
              iconFormat: 'svg',
              map: this.map,
              onExecute: lang.hitch(this, function(){
                CSVUtils.exportCSV(this.currentSearchLayer.name, this.currentCSVResults.data, this.currentCSVResults.columns);
              })
            });
            exportCSVAction.name = "eExportToCSV";
            exportCSVAction.data = featureSet;
            actions.push(exportCSVAction);
          }

          if(this.initiator && this.initiator === 'attribute' && this.config.exportsearchurlchecked){
            var exportUrlAction = new BaseFeatureAction({
              name: "exportSearchUrl",
              iconClass: 'icon-export',
              label: this.nls.exporturl,
              iconFormat: 'svg',
              map: this.map,
              onExecute: lang.hitch(this, this.exportURL)
            });
            exportUrlAction.name = "exportSearchUrl";
            exportUrlAction.data = featureSet;
            actions.push(exportUrlAction);
          }

          if(this.graphicsLayerBuffer && this.graphicsLayerBuffer.graphics.length > 0){
            var removeBufferAction = new BaseFeatureAction({
              name: "RemoveBufferResult",
              iconClass: 'icon-close',
              label: this.nls.clearBuffer,
              iconFormat: 'svg',
              map: this.map,
              onExecute: lang.hitch(this, this.clearbuffer)
            });
            removeBufferAction.name = "RemoveBufferResult";
            removeBufferAction.data = featureSet;
            actions.push(removeBufferAction);
          }

          var removeAction = new BaseFeatureAction({
            name: "CleareSearchResult",
            iconClass: 'icon-close',
            label: this.nls.clearResults,
            iconFormat: 'svg',
            map: this.map,
            onExecute: lang.hitch(this, this.clear)
          });
          removeAction.name = "CleareSearchResult";
          removeAction.data = featureSet;
          actions.push(removeAction);

          this.popupMenu.setActions(actions);
          this.popupMenu.show(position);
        }));
      },

      getNoStatFieldNames: function(layerConfig){
        var retval = [];
        array.forEach(layerConfig.fields.field, lang.hitch(this, function(fld){
          if(fld.excludestat){
            retval.push(fld.name);
          }
        }));
        return retval;
      },

      checkForeLocateGL: function (result) {
        if(result.layer.name && result.layer.name.toLowerCase() === "elocate results"){
          this.locateGraphicsLayer = result.layer;
          on(this.locateGraphicsLayer, 'graphic-add', lang.hitch(this, this.checkeLocateNumGras));
          on(this.locateGraphicsLayer, 'graphic-remove', lang.hitch(this, this.checkeLocateNumGras));
          on(this.locateGraphicsLayer, 'graphic-clear',  lang.hitch(this, this.checkeLocateNumGras));
          this.mapLayerAddResultEvent.remove();

          //Add the button
          var itemsDiv = dojoQuery('.draw-items', this.drawBox.domNode);
          var eLocateButton = html.create('div', {
            'style': 'display:none;',
            'class': 'draw-item',
            'data-gratype': 'ELOCATE',
            'title': this.nls.eLocateTip
          }, itemsDiv[0]);
          html.addClass(eLocateButton, 'elocate-icon');
          this.own(on(eLocateButton, 'click', lang.hitch(this, this._eLocateButtonOnClick)));
        }
      },

      checkeLocateNumGras: function (){
        if(this.locateGraphicsLayer){
          var eLocateButton = dojoQuery('.draw-item.elocate-icon', this.drawBox.domNode);
          if(this.locateGraphicsLayer.graphics.length > 0){
            //show the button
            html.setStyle(eLocateButton[0], 'display', 'block');
          }else{
            //hide the button
            html.setStyle(eLocateButton[0], 'display', 'none');
          }
        }
      },

      _eLocateButtonOnClick: function() {
        var graLayGras = this.locateGraphicsLayer.graphics;
        if (graLayGras.length > 1){
          this.processInputs(this.unionGeoms(graLayGras));
        }else if (graLayGras.length == 1){
          this.processInputs(graLayGras[0].geometry);
        }
      },

      processInputs: function (geom) {
        if (geom === Polygon && geom.isSelfIntersecting(geom)){
          esriConfig.defaults.geometryService.simplify([geom], lang.hitch(this, function (result) {
            if (this.cbxBufferGraphic.getValue()) {
              this._bufferGeometries([geom], new SpatialReference({
                wkid: this.bufferWKID
              }), [parseFloat(this.txtBufferValue.get('value'))], this.bufferUnits.get('value'), true);
            } else {
              this.search(result[0], this.graphicLayerIndex);
            }
          }));
        }else{
          //create extent around map point to improve search results
          if (geom.type === "point" && this.cbxAddTolerance.getValue()) {
            geom = this.pointToExtent(geom, this.pointSearchTolerance);
          }
          if (this.cbxBufferGraphic.getValue()) {
            this._bufferGeometries([geom], new SpatialReference({
              wkid: this.bufferWKID
            }), [parseFloat(this.txtBufferValue.get('value'))], this.bufferUnits.get('value'), true);
          } else {
            this.search(geom, this.graphicLayerIndex);
          }
        }
      },

      _addBufferLayer: function () {
        if (this.config.bufferDefaults.addtolegend) {
          //new a feature layer
          var layerInfo = {
            "type" : "Feature Layer",
            "description" : "",
            "definitionExpression" : "",
            "name": "Search Buffer Results",
            "geometryType": "esriGeometryPolygon",
            "objectIdField": "ObjectID",
            "drawingInfo": {
              "renderer": {
                "type": "simple",
                "label": "Buffer",
                "description" : "Buffer",
                "symbol": this.config.bufferDefaults.simplefillsymbol
              }
            },
            "fields": [{
              "name": "ObjectID",
              "alias": "ObjectID",
              "type": "esriFieldTypeOID"
            }, {
              "name": "bufferdist",
              "alias": "Buffer Distance",
              "type": "esriFieldTypeString"
            }]
          };

          var featureCollection = {
            layerDefinition: layerInfo,
            featureSet: null
          };
          this.graphicsLayerBuffer = new FeatureLayer(featureCollection);
          this.graphicsLayerBuffer.name = "Search Buffer Results";
        } else {
          //use graphics layer
          this.graphicsLayerBuffer = new GraphicsLayer();
          this.graphicsLayerBuffer.name = "Search Buffer Results";
          this.map.addLayer(this.graphicsLayerBuffer);
        }
      },

      closeDDs: function () {
        this.selectLayerAttribute.closeDropDown();
        this.selectLayerGraphical.closeDropDown();
        this.selectExpression.closeDropDown();
        this.selectLayerSpatial.closeDropDown();
        this.gSelectType.closeDropDown();
        this.aSelectType.closeDropDown();
      },

      onDeactivate: function() {
        this.drawBox.deactivate();
      },

      onClose: function () {
        this.drawBox.deactivate();
        this._hideInfoWindow();
        this.inherited(arguments);
        if (!this.config.bufferDefaults.addtolegend) {
          if (this.graphicsLayerBuffer) {
            this.graphicsLayerBuffer.hide();
          }
        }
        if (this.tempResultLayer) {
          this.tempResultLayer.hide();
        }
      },

      onOpen: function () {
        if (!this.config.bufferDefaults.addtolegend) {
          if (this.graphicsLayerBuffer) {
            this.graphicsLayerBuffer.show();
          }
        }
        if (this.tempResultLayer) {
          this.tempResultLayer.show();
        }
      },

      _resetDrawBox: function () {
        this.drawBox.deactivate();
        this.drawBox.clear();
      },

      destroy: function () {
        this._hideInfoWindow();
        this._resetDrawBox();
        this._removeAllResultLayers();
        this.inherited(arguments);
      },

      _removeAllResultLayers: function () {
        this._hideInfoWindow();
        this._removeTempResultLayer();
        this._removeAllOperatonalLayers();
      },

      _removeAllOperatonalLayers: function () {
        var layers = this.operationalLayers;
        while (layers.length > 0) {
          var layer = layers[0];
          if (layer) {
            this.map.removeLayer(layer);
          }
          layers[0] = null;
          layers.splice(0, 1);
        }
        this.operationalLayers = [];
      },

      _addOperationalLayer: function (resultLayer) {
        this.operationalLayers.push(resultLayer);
        this.map.addLayer(resultLayer);
      },

      _resetAndAddTempResultLayer: function (layerIndex) {
        this._removeTempResultLayer();
        this.tempResultLayer = new GraphicsLayer();
        this.tempResultLayer.name = "Search Results";
        var layerConfig = this.config.layers[layerIndex];
        var lyrDisablePopupsAndTrue = (layerConfig.hasOwnProperty("disablePopups") && layerConfig.disablePopups)?true:false;
        if(!this.config.disablePopups && !lyrDisablePopupsAndTrue){
          this.tempResultLayer.infoTemplate = new PopupTemplate();
        }
        this.map.addLayer(this.tempResultLayer);
      },

      _removeTempResultLayer: function () {
        if (this.tempResultLayer) {
          this.map.removeLayer(this.tempResultLayer);
        }
        this.tempResultLayer = null;
      },

      onSpatialLayerChange: function (newValue) {
        this.spatialLayerIndex = newValue;
      },

      onGraphicalLayerChange: function (newValue) {
        this.graphicLayerIndex = newValue;
        //determine if this layer has any expressions
        if(this.config.layers[newValue].expressions.expression.length > 0){
          this.cbxAddTextQuery.setStatus(true);
        }else{
          this.cbxAddTextQuery.setStatus(false);
        }
        //determine if this layer has any sum field(s)
        this._getSumFields(newValue);
        if(this.sumFields.length > 0){
          html.addClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', '');
        }else{
          html.removeClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', 'none');
        }
      },

      onAttributeLayerChange: function (newValue) {
        this.AttributeLayerIndex = newValue;
        this._initSelectedLayerExpressions();
        var valuesObj = lang.clone(this.config.layers[newValue].expressions.expression[0].values.value);
        html.empty(this.textsearchlabel);
        if(this.config.layers[newValue].expressions.expression[0].textsearchlabel !== ""){
          html.place(html.toDom(this.config.layers[newValue].expressions.expression[0].textsearchlabel), this.textsearchlabel);
          html.style(this.textsearchlabel, 'display', 'block');
        }else{
          html.style(this.textsearchlabel, 'display', 'none');
        }
        this.paramsDijit.clear();
        this.paramsDijit.build(valuesObj, this.resultLayers[newValue], this.config.layers[newValue].url,
                               this.config.layers[newValue].definitionexpression);
        this.paramsDijit.setFocusOnFirstParam();
        this.expressIndex = 0;
        //set the graphical layer to be the same
        this.graphicLayerIndex = newValue;
        this.selectLayerGraphical.set('value', newValue);
        //this.selectLayerGraphical.set('value', 2);
        //determine if this layer has any sum field(s)
        this._getSumFields(newValue);
        if(this.sumFields.length > 0){
          html.addClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', '');
        }else{
          html.removeClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', 'none');
        }
      },

      onAttributeLayerExpressionChange: function (newValue) {
        this.expressIndex = newValue;
        var valuesObj = lang.clone(this.config.layers[this.AttributeLayerIndex].expressions.expression[newValue].values.value);
        html.empty(this.textsearchlabel);
        if(this.config.layers[this.AttributeLayerIndex].expressions.expression[newValue].textsearchlabel !== ""){
          html.place(html.toDom(this.config.layers[this.AttributeLayerIndex].expressions.expression[newValue].textsearchlabel), this.textsearchlabel);
          html.style(this.textsearchlabel, 'display', 'block');
        }else{
          html.style(this.textsearchlabel, 'display', 'none');
        }
        this.paramsDijit.clear();
        this.paramsDijit.build(valuesObj, this.resultLayers[this.AttributeLayerIndex], this.config.layers[this.AttributeLayerIndex].url,
                               this.config.layers[this.AttributeLayerIndex].definitionexpression);
        this.paramsDijit.setFocusOnFirstParam();
      },

      _initBufferUnits: function () {
        if(this.config.bufferDefaults.maxBufferValue){
          this.txtBufferValue.constraints.max = this.config.bufferDefaults.maxBufferValue;
          this.txtBufferValueSpat.constraints.max = this.config.bufferDefaults.maxBufferValue;
        }

        var options = [];
        var len = this.config.bufferDefaults.bufferUnits.bufferUnit.length;
        for (var i = 0; i < len; i++) {
          var option = {
            value: this.config.bufferDefaults.bufferUnits.bufferUnit[i].name,
            label: this.config.bufferDefaults.bufferUnits.bufferUnit[i].label
          };
          options.push(option);
          if (i === 0) {
            options[i].selected = true;
          }
        }
        this.bufferUnits.addOption(options);
        this.bufferUnitsSpat.addOption(options);
      },

      _initSpatialRelationships: function () {
        var len = this.config.spatialrelationships.spatialrelationship.length;
        for (var i = 0; i < len; i++) {
          var iClass = this._getSpatialIconClass(this.config.spatialrelationships.spatialrelationship[i].name);
          var spatButton = html.create('div', {
            'class': 'spatial-item',
            'data-spatialtype': this.config.spatialrelationships.spatialrelationship[i].name,
            'title': this.config.spatialrelationships.spatialrelationship[i].label
          }, this.spatialItems);
          html.addClass(spatButton, iClass);
          this.own(on(spatButton, 'click', lang.hitch(this, this._spatButtonOnClick)));
        }
      },

      _spatButtonOnClick: function (event) {
        event.stopPropagation();
        this._intersectResults(event.target.getAttribute('data-spatialtype'));
      },

      _intersectResults: function (dataSpatialType) {
        this.garr = [];
        var intersectGeom;
        if (this.graphicsLayerBuffer && this.graphicsLayerBuffer.graphics.length > 0 && this.currentLayerAdded && this.currentLayerAdded.graphics.length > 0) {
          var qMessage = new Message({
            type: 'question',
            titleLabel: this.nls.spatialchoicetitle,
            message: this.nls.spatialchoicemsg,
            buttons: [{
              label: this.nls.buffergraphics,
              onClick: lang.hitch(this, lang.hitch(this, function () {
                qMessage.close();
                var g = this.graphicsLayerBuffer.graphics[0];
                intersectGeom = g.geometry;
                this.search(intersectGeom, this.spatialLayerIndex, null, null, dataSpatialType);
              }))
            }, {
              label: this.nls.selectiongraphics,
              onClick: lang.hitch(this, lang.hitch(this, function () {
                qMessage.close();
                intersectGeom = this.unionGeoms(this.currentLayerAdded.graphics);
                this.search(intersectGeom, this.spatialLayerIndex, null, null, dataSpatialType);
              }))
            }]
          });
          return;
        }
        var gra;
        if (this.graphicsLayerBuffer && this.graphicsLayerBuffer.graphics.length > 0) {
          gra = this.graphicsLayerBuffer.graphics[0];
          intersectGeom = gra.geometry;
//          console.info("spatial layer index: " + this.spatialLayerIndex);
          this.search(intersectGeom, this.spatialLayerIndex, null, null, dataSpatialType);
        } else if (this.currentLayerAdded && this.currentLayerAdded.graphics.length > 0) {
          intersectGeom = this.unionGeoms(this.currentLayerAdded.graphics);
          if (intersectGeom === Polygon && (intersectGeom.isSelfIntersecting(intersectGeom) || intersectGeom.rings.length > 1)) {
            esriConfig.defaults.geometryService.simplify([intersectGeom], lang.hitch(this,
              function (result) {
//                console.info("spatial layer index: " + this.spatialLayerIndex);
                this.search(result[0], this.spatialLayerIndex, null, null, dataSpatialType);
              }));
          } else {
//            console.info("spatial layer index: " + this.spatialLayerIndex);
            this.search(intersectGeom, this.spatialLayerIndex, null, null, dataSpatialType);
          }
        } else {
          new Message({
            titleLabel: this.nls.spatialSearchErrorTitle,
            message: this.nls.intersectMessage
          });
        }
      },

      _getSpatialIconClass: function (spatRel) {
        var iClass;
        switch (spatRel) {
        case 'esriSpatialRelContains':
          iClass = 'contain-icon';
          break;
        case 'esriSpatialRelIntersects':
          iClass = 'intersect-icon';
          break;
        case 'esriSpatialRelEnvelopeIntersects':
          iClass = 'envintersects-icon';
          break;
        case 'esriSpatialRelCrosses':
          iClass = 'crosses-icon';
          break;
        case 'esriSpatialRelIndexIntersects':
          iClass = 'indexintersects-icon';
          break;
        case 'esriSpatialRelOverlaps':
          iClass = 'overlaps-icon';
          break;
        case 'esriSpatialRelTouches':
          iClass = 'touches-icon';
          break;
        case 'esriSpatialRelWithin':
          iClass = 'within-icon';
          break;
        default:
          iClass = 'contain-icon';
        }
        return iClass;
      },

      _combineRadioCheckBoxWithLabel: function () {
        this.own(on(this.bufferGraphicLabel, 'click', lang.hitch(this, function () {
          this.cbxBufferGraphic.setValue(!this.cbxBufferGraphic.getValue());
        })));
        this.own(on(this.multiGraphicLabel, 'click', lang.hitch(this, function () {
          this.cbxMultiGraphic.setValue(!this.cbxMultiGraphic.getValue());
        })));
      },

      _initTabContainer: function () {
        if (this.config.hasOwnProperty('disabledtabs')) {
          this.disabledTabs = this.config.disabledtabs;
        } else {
          this.disabledTabs = [];
        }
        this.limitMapExtentCbx.setValue(this.config.limitsearch2mapextentchecked || false);
        this.eLocateEnabled = this.config.graphicalsearchoptions.enableeLocateselect || false;
        this.txtBufferValue.set('value', this.config.bufferDefaults.bufferDefaultValue || 2);
        this.txtBufferValueSpat.set('value', this.config.bufferDefaults.bufferDefaultValue || 2);
        this.bufferWKID = this.config.bufferDefaults.bufferWKID;
        this.keepgraphicalsearchenabled = this.config.graphicalsearchoptions.keepgraphicalsearchenabled || false;
        this.autozoomtoresults = this.config.autozoomtoresults || false;
        this.mouseovergraphics = this.config.mouseovergraphics || false;
        var initView = this.config.initialView || "text";
        this.pointSearchTolerance = this.config.graphicalsearchoptions.toleranceforpointgraphicalselection || 6;
        this.cbxAddTolerance.setValue(this.config.graphicalsearchoptions.addpointtolerancechecked || false);
        this.cbxMultiGraphic.setValue(this.config.graphicalsearchoptions.multipartgraphicsearchchecked || false);
        this.cbxBufferGraphic.setValue(false);
        if (this.config.graphicalsearchoptions.showmultigraphicsgraphicaloption) {
          html.setStyle(this.multiGraDiv, 'display', '');
        } else {
          html.setStyle(this.multiGraDiv, 'display', 'none');
        }
        if (this.config.graphicalsearchoptions.showaddtolerancegraphicaloption) {
          html.setStyle(this.addToleranceDiv, 'display', '');
        } else {
          html.setStyle(this.addToleranceDiv, 'display', 'none');
        }
        if (this.config.graphicalsearchoptions.showaddsqltextgraphicaloption) {
          html.setStyle(this.addSqlTextDiv, 'display', '');
        } else {
          html.setStyle(this.addSqlTextDiv, 'display', 'none');
        }
        if (this.config.graphicalsearchoptions.showbuffergraphicaloption) {
          html.setStyle(this.bufferGraDiv, 'display', '');
        } else {
          html.setStyle(this.bufferGraDiv, 'display', 'none');
        }
        this.cbxBufferGraphic.setValue(this.config.graphicalsearchoptions.buffercheckedbydefaultgraphicaloption);

        this.cbxMultiGraphic.onChange = lang.hitch(this, this._onCbxMultiGraphicClicked);

        array.map(this.disabledTabs, lang.hitch(this, function (dTab) {
          if (dTab === 'graphic') {
            this.shapeTab = false;
          }
          if (dTab === 'text') {
            this.attribTab = false;
          }
          if (dTab === 'spatial') {
            this.spatTab = false;
          }
          if (dTab === 'result') {
            this.rsltsTab = false;
          }
        }));

        //determine if this layer has any expressions
        if(this.config.layers[0].expressions.expression.length > 0){
          this.cbxAddTextQuery.setStatus(true);
        }else{
          this.cbxAddTextQuery.setStatus(false);
        }

        if (this.cbxMultiGraphic.getValue()) {
          html.setStyle(this.btnGraSearch, 'display', 'inline-block');
        } else {
          html.setStyle(this.btnGraSearch, 'display', 'none');
        }
        var len = this.config.layers.length;
        if (initView === "text" && this.attribTab) {
          this.selTab = this.nls.selectByAttribute;
        } else if (initView === "graphical" && this.shapeTab) {
          this.selTab = this.nls.selectFeatures;
          if(this.autoactivatedtool){
            this.drawBox.activate(this.autoactivatedtool.toUpperCase());
          }
        }
        var tabs = [];
        if (this.shapeTab) {
          tabs.push({
            title: this.nls.selectFeatures,
            content: this.tabNode1
          });
          html.replaceClass(this.tabNode1, 'search-tab-node', 'search-tab-node-hidden');
        }
        if (this.attribTab) {
          for (var a = 0; a < len; a++) {
            if (this.config.layers[a].expressions.expression.length > 0) {
              tabs.push({
                title: this.nls.selectByAttribute,
                content: this.tabNode2
              });
              html.replaceClass(this.tabNode2, 'search-tab-node', 'search-tab-node-hidden');
              break;
            }
          }
        }
        if (this.spatTab) {
          for (var i = 0; i < len; i++) {
            if (this.config.layers[i].spatialsearchlayer) {
              tabs.push({
                title: this.nls.selectSpatial,
                content: this.tabNode3
              });
              html.replaceClass(this.tabNode3, 'search-tab-node', 'search-tab-node-hidden');
              break;
            }
          }
        }
        if (this.rsltsTab) {
          tabs.push({
            title: this.nls.results,
            content: this.tabNode4
          });
          html.replaceClass(this.tabNode4, 'search-tab-node', 'search-tab-node-hidden');
        }
        this.tabContainer = new TabContainer({
          tabs: tabs,
          selected: this.selTab
        }, this.tabSearch);

        this.tabContainer.startup();
        this.own(on(this.tabContainer, "tabChanged", lang.hitch(this, function (title) {
          if (title !== this.nls.results) {
            this.selTab = title;
          }
          if(title === this.nls.selectFeatures) {
            if(this.autoactivatedtool){
              this.drawBox.activate(this.autoactivatedtool.toUpperCase());
            }
          }else{
            if (title === this.nls.selectByAttribute || title === this.nls.selectSpatial) {
              this.drawBox.deactivate();
            }else if(title === this.nls.results && !this.keepgraphicalsearchenabled) {
              this.drawBox.deactivate();
            }
          }
        })));
        jimuUtils.setVerticalCenter(this.tabContainer.domNode);
      },

      _getSumFields: function(index) {
        this.sumFields = [];
        array.map(this.config.layers[index].fields.field, lang.hitch(this,function(field){
          if(field.sumfield){
            this.sumFields.push({field: field.name, sumlabel: field.sumlabel});
          }
        }));
      },

      _initLayerSelect: function () {
        this.serviceFailureNames = [];
        if(!this.currentFeatures){
          this.currentFeatures = [];
        }
        var options = [];
        var spatialOptions = [];
        var attribOptions = [];
        var len = this.config.layers.length;
        for (var i = 0; i < len; i++) {
          var option = {
            value: i,
            label: this.config.layers[i].name
          };
          options.push(option);
          if (this.config.layers[i].spatialsearchlayer) {
            spatialOptions.push(option);
          }
          if(this.config.layers[i].expressions.expression.length > 0){
            attribOptions.push(option);
          }
        }
        //select the first layer in the lists
        if (options.length > 0) {
          options[0].selected = true;
        }
        if (spatialOptions.length > 0) {
          spatialOptions[0].selected = true;
        }
        if (attribOptions.length > 0) {
          attribOptions[0].selected = true;
        }else{
          html.setStyle(this.addSqlTextDiv, 'display', 'none');
        }

        if (len > 0) {
          this.paramsDijit = new Parameters({
            nls: this.nls,
            layerUniqueCache: this.layerUniqueCache,
            disableuvcache: this.config.disableuvcache,
            selectFilterType: this.config.selectfilter
          });
          this.paramsDijit.placeAt(this.parametersDiv);
          this.paramsDijit.startup();
          this.paramsDijit.on('enter-pressed', lang.hitch(this, function () {
            this.search(null, this.AttributeLayerIndex, this.expressIndex);
          }));
          this.shelter.show();

          var defs = array.map(this.config.layers, lang.hitch(this, function (layerConfig) {
            return this._getLayerInfoWithRelationships(layerConfig.url);
          }));

          all(defs).then(lang.hitch(this, function (results) {
            this.shelter.hide();
            array.forEach(results, lang.hitch(this, function (result, j) {
              if(result.state === 'success'){
                var layerInfo = result.value;
                //console.info(layerInfo);
                var layerConfig = this.config.layers[j];

                if (layerInfo.objectIdField) {
                  layerConfig.objectIdField = layerInfo.objectIdField;
                } else {
                  var fields = layerInfo.fields;
                  var oidFieldInfos = array.filter(fields, lang.hitch(this, function (fieldInfo) {
                    return fieldInfo.type === 'esriFieldTypeOID';
                  }));
                  if (oidFieldInfos.length > 0) {
                    var oidFieldInfo = oidFieldInfos[0];
                    layerConfig.objectIdField = oidFieldInfo.name;
                  }
                }
                layerConfig.existObjectId = array.some(layerConfig.fields.field, lang.hitch(this, function (element) {
                  return element.name === layerConfig.objectIdField;
                }));
                layerConfig.typeIdField = layerInfo.typeIdField;
                //ImageServiceLayer doesn't have drawingInfo
                if (!layerInfo.drawingInfo) {
                  layerInfo.drawingInfo = {};
                }
                layerInfo.name = this.nls.search + ' ' + this.nls.results + ': ' + layerConfig.name;
                layerInfo._titleForLegend = layerInfo.name;
                layerInfo.minScale = 0;
                layerInfo.maxScale = 0;
                layerInfo.effectiveMinScale = 0;
                layerInfo.effectiveMaxScale = 0;
                layerInfo.defaultVisibility = true;
                this.resultLayers.push(layerInfo);
              }else{
                //remove this layer from the options list
                var oIndex = -1;
                array.some(options, lang.hitch(this, function(option,o){
                  if(option.label === this.config.layers[j].name){
                    oIndex = o;
                    return true;
                  }
                  return false;
                }));
                options.splice(oIndex, 1);
                if (this.config.layers[j].spatialsearchlayer) {
                  spatialOptions.splice(spatialOptions.indexOf(this.config.layers[j].spatialsearchlayer), 1);
                }
                this.serviceFailureNames.push(this.config.layers[j].name);
                this.resultLayers.push({});
              }
            }));

            this.selectLayerGraphical.addOption(options);
            this.selectLayerAttribute.addOption(attribOptions);
            this.selectLayerSpatial.addOption(spatialOptions);
            if(spatialOptions.length > 0){
              this.spatialLayerIndex = spatialOptions[0].value;
            }

            //now check if there is a url search to do
            var myObject = this.getUrlParams();
            if (myObject.esearch) {
              if(myObject.esearch === "last48"){
                var today = new Date();
                var priorDate = new Date(today.getTime() - (((24 * 60 * 60 * 1000) - 1000) * 2));
                var priorDateStr = this._formatDate(priorDate.getTime(), 'yyyy/MM/dd');
                myObject.esearch = priorDateStr + "~" + this._formatDate(new Date().getTime(), 'yyyy/MM/dd');
              }
              if(myObject.esearch === "thismonth"){
                var today = new Date();
                today.setDate(1);
                var thisMonthStr = this._formatDate(today.getTime(), 'yyyy/MM/dd');
                myObject.esearch = thisMonthStr + "~" + this._formatDate(new Date().getTime(), 'yyyy/MM/dd');
              }
              if(myObject.esearch === "thisyear"){
                var today = new Date();
                today.setMonth(0,1);
                var thisMonthStr = this._formatDate(today.getTime(), 'yyyy/MM/dd');
                myObject.esearch = thisMonthStr + "~" + this._formatDate(new Date().getTime(), 'yyyy/MM/dd');
              }
              if(this.config.layers[myObject.slayer].expressions.expression.length > 0){
                var valuesObj1 = lang.clone(this.config.layers[myObject.slayer].expressions.expression[myObject.exprnum || 0].values.value);
                var values = myObject.esearch.split("|");
                array.forEach(values, lang.hitch(this, function(val, index){
                  if (val.indexOf('~') > -1){
                    var ranges = val.split("~");
                    valuesObj1[index].valueObj.value1 = ranges[0];
                    valuesObj1[index].valueObj.value2 = ranges[1];
                  }else{
                    valuesObj1[index].valueObj.value = val;
                  }
                }));
                html.empty(this.textsearchlabel);
                if(this.config.layers[myObject.slayer].expressions.expression[myObject.exprnum || 0].textsearchlabel !== ""){
                  html.place(html.toDom(this.config.layers[myObject.slayer].expressions.expression[myObject.exprnum || 0].textsearchlabel), this.textsearchlabel);
                  html.style(this.textsearchlabel, 'display', 'block');
                }else{
                  html.style(this.textsearchlabel, 'display', 'none');
                }
                //console.info(valuesObj1);
                this.paramsDijit.build(valuesObj1, this.resultLayers[myObject.slayer], this.config.layers[myObject.slayer].url,
                                     this.config.layers[myObject.slayer].definitionexpression);
                on.once(this.paramsDijit, 'param-ready', lang.hitch(this, function () {
                  this._queryFromURL(myObject.esearch, myObject.slayer, myObject.exprnum || 0, myObject.close || false);
                }));
              }
              /*this.publishData({
                message: myObject.slayer
              });*/
            } else {
              //init the first available attrib layers paramsDijit
              if(attribOptions.length > 0){
                var aIndex = attribOptions[0].value;
                this.AttributeLayerIndex = aIndex;
                this._initSelectedLayerExpressions();
                if(this.config.layers[aIndex].expressions.expression.length > 0){
                  var valuesObj = lang.clone(this.config.layers[aIndex].expressions.expression[0].values.value);
                  html.empty(this.textsearchlabel);
                  if(this.config.layers[aIndex].expressions.expression[0].textsearchlabel !== ""){
                    html.place(html.toDom(this.config.layers[aIndex].expressions.expression[0].textsearchlabel), this.textsearchlabel);
                    html.style(this.textsearchlabel, 'display', 'block');
                  }else{
                    html.style(this.textsearchlabel, 'display', 'none');
                  }
                  this.paramsDijit.build(valuesObj, this.resultLayers[aIndex], this.config.layers[aIndex].url,
                                       this.config.layers[aIndex].definitionexpression);
                  on.once(this.paramsDijit, 'param-ready', lang.hitch(this, function () {
                    this.paramsDijit.setFocusOnFirstParam();
                  }));
                }
                //determine if this layer has any sum field(s)
                this._getSumFields(aIndex);
                if(this.sumFields.length > 0){
                  html.addClass(this.list.domNode, 'sum');
                  html.setStyle(this.divSum, 'display', '');
                }else{
                  html.removeClass(this.list.domNode, 'sum');
                  html.setStyle(this.divSum, 'display', 'none');
                }
              }
            }

            if(this.serviceFailureNames.length > 0){
              console.info("service failed", this.serviceFailureNames);
              new Message({
                titleLabel: this.nls.mapServiceFailureTitle,
                message: this.nls.mapServicefailureMsg + this.serviceFailureNames.join(", ") + this.nls.mapServicefailureMsg2
              });
            }
          }), lang.hitch(this, function (err) {
            this.shelter.hide();
            this.selectLayerGraphical.addOption(options);
            this.selectLayerAttribute.addOption(options);
            this.selectLayerSpatial.addOption(spatialOptions);
            console.error(err);
            for (var j = 0; j < this.config.layers.length; j++) {
              var layer = new GraphicsLayer();
              this.resultLayers.push(layer);
            }
          }));
        }
        this.own(on(this.selectLayerGraphical, "change", lang.hitch(this, this.onGraphicalLayerChange)));
        this.own(on(this.selectLayerAttribute, "change", lang.hitch(this, this.onAttributeLayerChange)));
        this.own(on(this.selectLayerSpatial, "change", lang.hitch(this, this.onSpatialLayerChange)));
        this.own(on(this.selectExpression, "change", lang.hitch(this, this.onAttributeLayerExpressionChange)));
        this.own(on(this.list, 'remove', lang.hitch(this, this._removeResultItem)));
        // setTimeout(lang.hitch(this, function(){
        //   this.selectLayerGraphical.set('value', 2);
        // }), 500);
      },

      _relateResultItem: function(index, item) {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var oidField = layerConfig.objectIdField;
        var sResult = item;
        //console.info(sResult);
        //console.info(this.currentSearchLayer.relationships);
        var relArray = [];
        for(var r=0; r < layerConfig.relates.relate.length; r++){
          var relRslt = {
            id: layerConfig.relates.relate[r].id,
            name: layerConfig.relates.relate[r].label,
            fields: layerConfig.relates.relate[r].fields,
            oid: sResult.graphic.attributes[oidField],
            icon: layerConfig.relates.relate[r].icon
          };
          relArray.push(relRslt);
        }

        if (this.wManager) {
          var widgetCfg = this._getWidgetConfig('AttributeTable');
          if(widgetCfg){
            var attWidget = this.wManager.getWidgetByLabel(widgetCfg.label);
            if(attWidget){
              this.attTableOpenedbySearch = !attWidget.showing;
              this.wManager.openWidget(attWidget);
              if(relArray.length === 1){
                //var ofl = new FeatureLayer(this.resultLayers[this.currentLayerIndex]._origLayerURL);
                var layerInfo = this.operLayerInfos.getLayerInfoById(this.currentSearchLayer.id);
                attWidget.showRelatedRecordsFromPopup(layerInfo, [relArray[0].oid]);
                // var relQuery = new RelationshipQuery();
                // relQuery.outSpatialReference = this.map.spatialReference;
                // relQuery.outFields = ["*"];
                // relQuery.relationshipId = relArray[0].id;
                // relQuery.objectIds = [relArray[0].oid];
                // var queryTask = new QueryTask(layerConfig.url);
                // queryTask.executeRelationshipQuery(relQuery, lang.hitch(this, this._onRelSearchFinish));
              }else{
                new RelateChooser({
                  relatesArr: relArray,
                  height: 400,
                  titleLabel: this.nls.chooserelate,
                  folderurl: this.folderUrl
                });
              }
            }
          }
        }
      },

      _onRelSearchFinish: function (result) {
        console.info(result);
      },

      _removeResultItem: function (index, item) {
        //console.info(item);
        array.some(this.currentCSVResults.data, lang.hitch(this, function(csvRow){
          if(csvRow.OID === item.OID){
            this.currentCSVResults.data.splice(this.currentCSVResults.data.indexOf(csvRow), 1);
            return true;
          }
          return false;
        }));
        var sResult = item;
        var layerConfig = this.config.layers[this.currentLayerIndex];
        this.currentFeatures.splice(this.currentFeatures.indexOf(sResult.graphic), 1);
        if(this.currentFeatures.length === 0){
          this.clear();
          if (this.isSelTabVisible()) {
            this.tabContainer.selectTab(this.selTab);
          }
          return;
        }
        this.currentSearchLayer.remove(sResult.graphic);
        this.currentSearchLayer.refresh();
        html.empty(this.divResultMessage);
        html.place(html.toDom("<label>" + this.nls.featuresSelected + this.currentFeatures.length + "</label>"), this.divResultMessage);
        this.list.remove(index);
        this._hideInfoWindow();
        if (layerConfig.shareResult && layerConfig.addToAttrib) {
          if (this.wManager) {
            var widgetCfg = this._getWidgetConfig('AttributeTable');
            if(widgetCfg){
              var attWidget = this.wManager.getWidgetByLabel(widgetCfg.label);
              if(attWidget){
                this.attTableOpenedbySearch = !attWidget.showing;
                this.wManager.openWidget(attWidget);
                attWidget._activeTable.refresh();
              }
            }
          }
        }
      },

      _getServiceUrlByLayerUrl: function (layerUrl) {
        var lastIndex = layerUrl.lastIndexOf("/");
        var serviceUrl = layerUrl.slice(0, lastIndex);
        return serviceUrl;
      },

      _isServiceSupportsOrderBy: function(layerInfo){
        var isSupport = false;
        if(layerInfo.advancedQueryCapabilities){
          if(layerInfo.advancedQueryCapabilities.supportsOrderBy){
            isSupport = true;
          }
        }
        return isSupport;
      },

      _getLayerInfoWithRelationships: function (layerUrl) {
        var def = new Deferred();
        esriRequest({
          url: layerUrl,
          content: {
            f: 'json'
          },
          handleAs: 'json',
          callbackParamName: 'callback'
        }).then(lang.hitch(this, function (layerInfo) {
          if (!layerInfo.relationships) {
            layerInfo.relationships = [];
          }
          layerInfo._origLayerURL = layerUrl;
          var serviceUrl = this._getServiceUrlByLayerUrl(layerUrl);
          layerInfo._origServiceURL = serviceUrl
          var defs = array.map(layerInfo.relationships, lang.hitch(this, function (relationship) {
            return esriRequest({
              url: serviceUrl + '/' + relationship.relatedTableId,
              content: {
                f: 'json'
              },
              handleAs: 'json',
              callbackParamName: 'callback'
            });
          }));
          all(defs).then(lang.hitch(this, function (results) {
            array.forEach(results, lang.hitch(this, function (relationshipInfo, index) {
              var relationship = layerInfo.relationships[index];
              relationship.name = relationshipInfo.name;
              //ignore shape field
              relationship.fields = array.filter(relationshipInfo.fields,
                lang.hitch(this, function (relationshipFieldInfo) {
                  return relationshipFieldInfo.type !== 'esriFieldTypeGeometry';
                }));
            }));
            def.resolve({state: 'success', value: layerInfo});
          }), lang.hitch(this, function (err) {
            def.resolve({state: 'failure', value: err});
          }));
          def.resolve({state: 'success', value: layerInfo});
        }), lang.hitch(this, function (err) {
          def.resolve({state: 'failure', value: err});
        }));
        return def;
      },

      _queryFromURL: function (value, slayerId, exprNum, close) {
        slayerId = typeof slayerId !== 'undefined' ? slayerId : 0;
        exprNum = typeof exprNum !== 'undefined' ? exprNum : 0;
        this.AttributeLayerIndex = slayerId;
        this.expressIndex = exprNum;
//make sure the form reflects what was searched
        this.selectLayerAttribute.set('value', slayerId);
        setTimeout(lang.hitch(this, function(){
          this.selectExpression.set('value', exprNum || 0);
          setTimeout(lang.hitch(this, function(){
            var valuesObj = lang.clone(this.config.layers[slayerId].expressions.expression[exprNum || 0].values.value);
            this.paramsDijit.setSingleParamValues(valuesObj, value);
          }), 200);
        }), 200);

        var valsArr = this._buildSearchValues(value);
        //determine if this layer has any sum field(s)
        this._getSumFields(slayerId);
        if(this.sumFields.length > 0){
          html.addClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', '');
        }else{
          html.removeClass(this.list, 'sum');
          html.setStyle(this.divSum, 'display', 'none');
        }
        this.search(null, slayerId, exprNum, valsArr, null, close);
      },

      _createSearchResultLayer: function (layerIndex) {
        var resultLayer = null;
        var layerConfig = this.config.layers[layerIndex];
        var layerInfo = lang.clone(this.resultLayers[layerIndex]);
        var _hasInfoTemplate = false;
        var _infoTemplate = null;
        var _popupNeedFields = [];

        //now setup the infoTemplate
        //check if this layer is part of map and if it has a popup defined already
        var lyrDisablePopupsAndTrue = (layerConfig.hasOwnProperty("disablePopups") && layerConfig.disablePopups)?true:false;
        if(!this.config.disablePopups && !lyrDisablePopupsAndTrue){
          if(layerConfig.popupfrom && layerConfig.popupfrom === "webmap"){
            array.forEach(this.operLayerInfos.getLayerInfoArray(), function(layerInfo2) {
              //console.info(layerInfo2);
              if(layerInfo2.layerObject && layerInfo2.layerObject.url === layerInfo._origServiceURL || layerInfo2.layerObject.url === layerInfo._origLayerURL){
                //console.info(layerInfo2);
                if(layerInfo2.controlPopupInfo.hasOwnProperty("infoTemplates")){
                  if(layerInfo2.controlPopupInfo.infoTemplates[layerInfo.id]){
                    //console.info(layerInfo2.controlPopupInfo.infoTemplates[layerInfo.id].infoTemplate);
                    if(layerInfo2.controlPopupInfo.infoTemplates[layerInfo.id].infoTemplate._fieldLabels){
                      _popupNeedFields = this._addPopupFields(layerInfo2.controlPopupInfo.infoTemplates[layerInfo.id].infoTemplate._fieldLabels);
                    }
                    _infoTemplate = layerInfo2.controlPopupInfo.infoTemplates[layerInfo.id].infoTemplate;
                    _hasInfoTemplate = true;
                  }else{
                    _hasInfoTemplate = false;
                  }
                }else{
                  if(layerInfo2.controlPopupInfo.infoTemplate._fieldLabels){
                    _popupNeedFields = this._addPopupFields(layerInfo2.controlPopupInfo.infoTemplate._fieldLabels);
                  }
                  _infoTemplate = layerInfo2.controlPopupInfo.infoTemplate;
                  _hasInfoTemplate = true;
                }
              }
            }, this);
          }else{
            _hasInfoTemplate = false;
          }
        }

        if (layerConfig.shareResult) {
          //only keep necessary fields
          var necessaryFieldNames = this._getOutputFields(layerIndex, _popupNeedFields);
          layerInfo.fields = array.filter(layerInfo.fields, lang.hitch(this, function (fieldInfo) {
            if(!layerConfig.fields.all){
              return necessaryFieldNames.indexOf(fieldInfo.name) >= 0;
            }else{
              return true;
            }
          }));
/*Adjust field aliases to those configured in the json*/
          array.map(layerInfo.fields, lang.hitch(this, function (fieldInfo){
            if(necessaryFieldNames.indexOf(fieldInfo.name) >= 0){
              var cnfgFldObj = this._getConfigFieldObject(fieldInfo.name, layerIndex);
              if(cnfgFldObj && cnfgFldObj.alias !== fieldInfo.alias){
                fieldInfo.alias = cnfgFldObj.alias;
              }
            }
          }));
          var featureCollection = {
            layerDefinition: layerInfo,
            featureSet: null
          };
          resultLayer = new FeatureLayer(featureCollection);
        } else {
          //use graphics layer
          this._resetAndAddTempResultLayer(layerIndex);
          resultLayer = this.tempResultLayer;
        }
        if(_hasInfoTemplate){
          resultLayer._hasInfoTemplate = true;
          resultLayer.infoTemplate = _infoTemplate;
        }else{
          resultLayer._hasInfoTemplate = false;
        }
        return resultLayer;
      },

      _addPopupFields: function(fields) {
        var popFldArr = [];
        for(var fld in fields){
          popFldArr.push(fields[fld]);
        }
        return popFldArr;
      },

      _getConfigFieldObject: function (fldName, layerIndex) {
//        console.info(fldName, layerIndex);
        var layerConfig = this.config.layers[layerIndex];
        var fields = layerConfig.fields.field;
        var retFldObj = null;
        array.some(fields, lang.hitch(this, function (fieldInfo) {
          if(fieldInfo.name === fldName){
            retFldObj = fieldInfo;
            return true;
          }else{
            return false;
          }
        }));
        return retFldObj;
      },

      _getOutputFields: function (layerIndex, popupFieldName) {
        var layerConfig = this.config.layers[layerIndex];
        var fields = layerConfig.fields.field;
        var outFields = array.map(fields, lang.hitch(this, function (fieldInfo) {
          return fieldInfo.name;
        }));
        //we need to add objectIdField into outFields because relationship query
        //needs objectId infomation
        var objectIdField = layerConfig.objectIdField;
        if (array.indexOf(outFields, objectIdField) < 0) {
          outFields.push(objectIdField);
        }

        //Make sure the title field is added to the fields array
        var title = layerConfig.titlefield;
        if (array.indexOf(outFields, title) < 0) {
          outFields.push(title);
        }

        var allFieldInfos = this.resultLayers[layerIndex].fields;
        var allFieldNames = array.map(allFieldInfos, lang.hitch(this, function (fieldInfo) {
          return fieldInfo.name;
        }));
        //make sure every fieldName of outFields exists in fieldInfo
        outFields = array.filter(outFields, lang.hitch(this, function (fieldName) {
          return allFieldNames.indexOf(fieldName) >= 0;
        }));
        //make sure every popupfield is added
        array.map(popupFieldName, lang.hitch(this, function(fldname){
          if (array.indexOf(outFields, fldname) < 0) {
            outFields.push(fldname);
            //console.info("Added popup field: " + fldname);
          }
        }));
        if(layerConfig.fields.all){
          outFields = allFieldNames;
        }
        //console.info(outFields);
        return outFields;
      },

      _bufferGeometries: function (geomArr, sr, dist, unit, isGraphicalBufferOp) {
        if (geomArr) {
          var bufferParameters = new BufferParameters();
          var resultEvent;
          bufferParameters.geometries = geomArr;
          bufferParameters.bufferSpatialReference = sr;
          bufferParameters.unit = GeometryService[unit];
          bufferParameters.distances = dist;
          bufferParameters.unionResults = true;
          bufferParameters.geodesic = true;
          bufferParameters.outSpatialReference = this.map.spatialReference;
          esriConfig.defaults.geometryService.buffer(bufferParameters, lang.hitch(this, function (evt) {
            resultEvent = evt[0];
            var graphic = new Graphic();
            graphic.geometry = resultEvent;
            graphic.symbol = new SimpleFillSymbol(this.config.bufferDefaults.simplefillsymbol);

            this.graphicsLayerBuffer.clear();
            this.graphicsLayerBuffer.add(graphic);
            html.setStyle(this.btnClearBuffer2, 'display', 'block');
            html.setStyle(this.btnClearBuffer3, 'display', 'block');
            if (isGraphicalBufferOp) {
              this.search(resultEvent, this.graphicLayerIndex);
            }
          }));
        }
      },

      _buildSearchValues: function (value) {
        var valArray = [];
        var values = value.split("|");
        array.forEach(values, lang.hitch(this, function (val) {
          var retValueObj = {};
          if (val.indexOf('~') > -1) {
            var ranges = val.split("~");
            retValueObj.value1 = ranges[0];
            retValueObj.value2 = ranges[1];
          } else {
            retValueObj.value = val;
          }
          valArray.push(retValueObj);
        }));
        return valArray;
      },

      getUrlParams: function () {
        var s = window.location.search,
          p;
        if (s === '') {
          return {};
        }
        p = ioquery.queryToObject(s.substr(1));
        return p;
      },

      _initProgressBar: function () {
        this.progressBar = new ProgressBar({
          indeterminate: true
        }, this.progressbar);
        html.setStyle(this.progressBar.domNode, 'display', 'none');
      },

      _initSelectedLayerExpressions: function () {
        this.selectExpression.removeOption(this.selectExpression.getOptions());
        var express = [];
        //now loop through the expressions
        var elen = this.config.layers[this.AttributeLayerIndex].expressions.expression.length;
        for (var e = 0; e < elen; e++) {
          var eoption = {
            value: e,
            label: this.config.layers[this.AttributeLayerIndex].expressions.expression[e].alias
          };
          express.push(eoption);
          if (e === 0) {
            express[e].selected = true;
          }
        }
        this.selectExpression.addOption(express);
        if (elen === 1) {
          domUtils.hide(this.expressionDiv);
        } else {
          domUtils.show(this.expressionDiv);
        }
      },

      _initDrawBox: function () {
        aspect.before(this.drawBox, "_activate", lang.hitch(this, function(){
          this.publishData({message: "Deactivate_DrawTool"});
        }));
        this.drawBox.setMap(this.map);
        var enabledButtons = [];
        if (this.config.graphicalsearchoptions.enablepointselect) {
          enabledButtons.push('POINT');
        }
        if (this.config.graphicalsearchoptions.enablelineselect) {
          enabledButtons.push('LINE');
        }
        if (this.config.graphicalsearchoptions.enablepolylineselect) {
          enabledButtons.push('POLYLINE');
        }
        if (this.config.graphicalsearchoptions.enablefreehandlineselect) {
          enabledButtons.push('FREEHAND_POLYLINE');
        }
        if (this.config.graphicalsearchoptions.enabletriangleselect) {
          enabledButtons.push('TRIANGLE');
        }
        if (this.config.graphicalsearchoptions.enableextentselect) {
          enabledButtons.push('EXTENT');
        }
        if (this.config.graphicalsearchoptions.enablecircleselect) {
          enabledButtons.push('CIRCLE');
        }
        if (this.config.graphicalsearchoptions.enableellipseselect) {
          enabledButtons.push('ELLIPSE');
        }
        if (this.config.graphicalsearchoptions.enablepolyselect) {
          enabledButtons.push('POLYGON');
        }
        if (this.config.graphicalsearchoptions.enablefreehandpolyselect) {
          enabledButtons.push('FREEHAND_POLYGON');
        }
        this.drawBox.geoTypes = enabledButtons;
        this.drawBox._initTypes();
        if(this.keepgraphicalsearchenabled){
          this.drawBox.deactivateAfterDrawing = false;
        }
        this.own(on(this.drawBox, 'IconSelected', lang.hitch(this, function (tool, geotype, commontype) {
          if (this.lastDrawCommonType && this.lastDrawCommonType !== commontype && this.garr.length > 0) {
            var qMessage = new Message({
              type: 'question',
              titleLabel: this.nls.warning,
              message: this.nls.graphicgeomtypemsg1 + "\n\n" + this.nls.graphicgeomtypemsg2,
              buttons: [{
                label: this.nls._continue,
                onClick: lang.hitch(this, lang.hitch(this, function () {
                  qMessage.close();
                  this.lastDrawCommonType = commontype;
                  this.lastDrawTool = geotype;
                  this.drawBox.clear();
                  this.garr = [];
                }))
              }, {
                label: this.nls.cancel,
                onClick: lang.hitch(this, lang.hitch(this, function () {
                  qMessage.close();
                  this.drawBox.activate(this.lastDrawTool);
                }))
              }]
            });
          }else{
            this.lastDrawCommonType = commontype;
            this.lastDrawTool = geotype;
          }
        })));
        this.own(on(this.drawBox, 'DrawEnd', lang.hitch(this, function (graphic) {
          if (!this.cbxMultiGraphic.getValue()) {
            if (graphic.geometry.type === "point" && this.cbxAddTolerance.getValue()) {
              var ext = this.pointToExtent(graphic.geometry, this.pointSearchTolerance);
              this.search(ext, this.graphicLayerIndex);
            } else {
              if (this.cbxBufferGraphic.getValue()) {
                this._bufferGeometries([graphic.geometry], new SpatialReference({
                  wkid: this.bufferWKID
                }), [parseFloat(this.txtBufferValue.get('value'))], this.bufferUnits.get('value'), true);
              } else {
                this.search(graphic.geometry, this.graphicLayerIndex);
              }
            }
          } else {
            this.garr.push(graphic);
          }
        })));
        this.own(on(this.btnClear2, "click", lang.hitch(this, this.clear, true)));
        this.own(on(this.btnClear3, "click", lang.hitch(this, this.clear, true)));
        this.own(on(this.btnClear4, "click", lang.hitch(this, this.clearFields, true)));
        this.own(on(this.btnClearBuffer2, "click", lang.hitch(this, this.clearbuffer)));
        this.own(on(this.btnClearBuffer3, "click", lang.hitch(this, this.clearbuffer)));
        html.setStyle(this.btnClearBuffer2, 'display', 'none');
        html.setStyle(this.btnClearBuffer3, 'display', 'none');
        html.setStyle(this.btnClear2, 'display', 'none');
        html.setStyle(this.btnClear3, 'display', 'none');
      },

      exportURL: function () {
        var useSeparator, eVal;
        var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
        var urlObject = urlUtils.urlToObject(window.location.href);
        urlObject.query = urlObject.query || {};
        var content = this.paramsDijit.getSingleParamValues();
        for (var s = 0; s < content.length; s++) {
          eVal = content[s].value.toString();
        }
        urlObject.query.esearch = eVal;
        urlObject.query.slayer = this.AttributeLayerIndex.toString();
        urlObject.query.exprnum = this.expressIndex.toString();
        // each param
        for (var i in urlObject.query) {
          if (urlObject.query[i] && urlObject.query[i] !== 'config') {
            // use separator
            if (useSeparator) {
              url += '&';
            } else {
              url += '?';
              useSeparator = true;
            }
            url += i + '=' + urlObject.query[i];
          }
        }
        /*new Message({
          titleLabel: "eSearch widget url search string.",
          message: url
        });*/
        window.prompt(this.nls.copyurlprompt, url);
      },

      _bufferFeatures: function () {
        if (this.currentLayerAdded && this.currentLayerAdded.graphics.length > 0) {
          var geoms = array.map(this.currentLayerAdded.graphics, function (gra) {
            return gra.geometry;
          });
          this._bufferGeometries(geoms, new SpatialReference({
            wkid: this.bufferWKID
          }), [parseFloat(this.txtBufferValueSpat.get('value'))], this.bufferUnitsSpat.get('value'), false);
        } else {
          new Message({
            titleLabel: this.nls.bufferSearchErrorTitle,
            message: this.nls.bufferMessage
          });
        }
      },

      onSearch: function () {
        var content = this.paramsDijit.getSingleParamValues();
        if (!content || content.length === 0 || !this.config.layers.length) {
          return;
        }
        this.search(null, this.AttributeLayerIndex, this.expressIndex);
      },

      _onBtnGraSearchClicked: function () {
        if (this.garr.length > 0) {
          if (!this.keepgraphicalsearchenabled) {
            this.map.enableMapNavigation();
          }
          this.lastDrawCommonType = null;
          this.lastDrawTool = null;
          if (this.cbxBufferGraphic.getValue()) {
            var geoms = array.map(this.garr, function (gra) {
              return gra.geometry;
            });
            this._bufferGeometries(geoms, new SpatialReference({
              wkid: this.bufferWKID
            }), [parseFloat(this.txtBufferValue.get('value'))], this.bufferUnits.get('value'), true);
          } else {
            this.search(this.unionGeoms(this.garr), this.graphicLayerIndex);
          }
        }
      },

      _onCbxMultiGraphicClicked: function () {
        if (this.cbxMultiGraphic.getValue()) {
          html.setStyle(this.btnGraSearch, 'display', 'inline-block');
        } else {
          html.setStyle(this.btnGraSearch, 'display', 'none');
        }
      },

      unionGeoms: function (gArray) {
        var retGeom;
        var mPoint = new Multipoint(this.map.spatialReference);
        var mPoly = new Polygon(this.map.spatialReference);
        var mPolyL = new Polyline(this.map.spatialReference);
        var rType;
        this.polygonsToDiscard = [];
        if (gArray.length > 0 && gArray[0].geometry.type === "polygon") {
          //For each polygon, test if another polgon exists that contains the first polygon.
          //If it does, the polygon will not be included in union operation and it will added to the polygonsToDiscard array.
          dojo.forEach(gArray, lang.hitch(this, function (graphic) {
            var poly1 = graphic.geometry;
            dojo.forEach(this.gArray, lang.hitch(this, function (aGraphic) {
              var aPoly = aGraphic.geometry;
              if (aPoly.extent.contains(this.graphic.geometry) && (aPoly.extent.center.x !== poly1.extent.center.x ||
                                                                   aPoly.extent.center.y !== poly1.extent.center.y)) {
                this.polygonsToDiscard.push(poly1);
              }
            }));
          }));
        }
        //globals
        var poly, ext, j, mp, ringArray;
        dojo.forEach(gArray, lang.hitch(this, function (graphic) {
          if (graphic.geometry.type === "point" && !this.cbxAddTolerance.getValue()) {
            mPoint.addPoint(graphic.geometry);
            rType = "point";
          } else if (graphic.geometry.type === "point" && this.cbxAddTolerance.getValue()) {
            ext = this.pointToExtent(graphic.geometry, this.pointSearchTolerance);
            ringArray = this.extentToMPArray(ext);
            mPoly.addRing(ringArray);
            rType = "poly";
            mPoly.spatialReference = ext.spatialReference;
          }
          if (graphic.geometry.type === "multipoint") {
            var mp1 = graphic.geometry;
            for (var p = 0; p < mp1.points.length; p++) {
              mPoint.addPoint(mp1.points[p]);
            }
            rType = "point";
          }
          if (graphic.geometry.type === "polyline") {
            var polyl = graphic.geometry;
            for (var l = polyl.paths.length - 1; l >= 0; l--) {
              var pathArray = [];
              for (j = 0; j < polyl.paths[l].length; j++) {
                mp = polyl.getPoint(l, j);
                mp.spatialReference = polyl.spatialReference;
                pathArray.push(mp);
              }
              mPolyL.addPath(pathArray);
            }
            rType = "line";
          }
          if (graphic.geometry.type === "extent") {
            ext = graphic.geometry;
            ringArray = this.extentToMPArray(ext);
            mPoly.addRing(ringArray);
            rType = "poly";
            mPoly.spatialReference = ext.spatialReference;
          }
          if (graphic.geometry.type === "polygon") {
            poly = graphic.geometry;
            //Consider only the rings that not coincide with any polygon ring on polygonsToDiscard array.
            var targetRings = [];
            for (var m = 0; m < poly.rings.length; m++) {
              var polygonToDiscard;
              var targetRing = [];
              var targetPolygon = new Polygon([poly.rings[m]], poly.spatialReference);
              var add = true;
              if (this.polygonsToDiscard.length > 0) {
                for (polygonToDiscard in this.polygonsToDiscard) {
                  add = true;
                  if (targetPolygon.extent.center.x === polygonToDiscard.extent.center.x &&
                      targetPolygon.extent.center.y === polygonToDiscard.extent.center.y) {
                    add = false;
                    break;
                  }
                }
                if (add) {
                  targetRing[0] = m;
                  targetRing[1] = poly.rings[m];
                  targetRings.push(targetRing);
                }
              } else {
                targetRing[0] = m;
                targetRing[1] = poly.rings[m];
                targetRings.push(targetRing);
              }
            }
            for (var i2 = targetRings.length - 1; i2 >= 0; i2--) {
              ringArray = [];
              for (var j1 = 0; j1 < targetRings[i2][1].length; j1++) {
                var mp2 = poly.getPoint(i2, j1);
                mp2.spatialReference = poly.spatialReference;
                ringArray.push(mp2);
              }
              mPoly.addRing(ringArray);
            }
            rType = "poly";
            mPoly.spatialReference = poly.spatialReference;
          }
        }));

        switch (rType) {
        case "point":
          {
            retGeom = mPoint;
            break;
          }
        case "poly":
          {
            retGeom = mPoly;
            break;
          }
        case "line":
          {
            retGeom = mPolyL;
            break;
          }
        }
        this.garr = [];
        return retGeom;
      },

      pointToExtent: function (objPoint, distance) {
        var clickOffset = distance || 6;
        var centerPoint = new Point(objPoint.x, objPoint.y, objPoint.spatialReference);
        var mapWidth = this.map.extent.getWidth();
        var pixelWidth = mapWidth / this.map.width;
        var tolerance = clickOffset * pixelWidth;
        var queryExtent = new Extent(1, 1, tolerance, tolerance, objPoint.spatialReference);
        return queryExtent.centerAt(centerPoint);
      },

      extentToPolygon: function (extent) {
        var polygon = new Polygon([extent.xmax, extent.ymax], [extent.xmax, extent.ymin], [extent.xmin, extent.ymin],
                                  [extent.xmin, extent.ymax], [extent.xmax, extent.ymax]);
        polygon.setSpatialReference(this.map.spatialReference);
        return polygon;
      },

      extentToMPArray: function (extent) {
        var MPArr = [[extent.xmax, extent.ymax], [extent.xmax, extent.ymin], [extent.xmin, extent.ymin],
                     [extent.xmin, extent.ymax], [extent.xmax, extent.ymax]];
        return MPArr;
      },

      checkforenterkey: function (evt) {
        var keyNum = evt.keyCode !== undefined ? evt.keyCode : evt.which;
        if (keyNum === 13) {
          this.search(null, this.AttributeLayerIndex, this.expressIndex);
        }
      },

      onNewSelection: function(){
        html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
        html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'addSelIcon');
        this.gSelectTypeVal = 'new';
      },

      onAddSelection: function(){
        html.replaceClass(this.gSelectType.iconNode, 'addSelIcon', 'newSelIcon');
        html.replaceClass(this.gSelectType.iconNode, 'addSelIcon', 'removeSelIcon');
        this.gSelectTypeVal = 'add';
      },

      onRemoveSelection: function(){
        html.replaceClass(this.gSelectType.iconNode, 'removeSelIcon', 'newSelIcon');
        html.replaceClass(this.gSelectType.iconNode, 'removeSelIcon', 'addSelIcon');
        this.gSelectTypeVal = 'rem';
      },

      onNewSelection2: function(){
        html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
        html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'addSelIcon');
        this.aSelectTypeVal = 'new';
      },

      onAddSelection2: function(){
        html.replaceClass(this.aSelectType.iconNode, 'addSelIcon', 'newSelIcon');
        html.replaceClass(this.aSelectType.iconNode, 'addSelIcon', 'removeSelIcon');
        this.aSelectTypeVal = 'add';
      },

      onRemoveSelection2: function(){
        html.replaceClass(this.aSelectType.iconNode, 'removeSelIcon', 'newSelIcon');
        html.replaceClass(this.aSelectType.iconNode, 'removeSelIcon', 'addSelIcon');
        this.aSelectTypeVal = 'rem';
      },

      search: function (geometry, layerIndex, /* optional */ expressIndex, theValue, spatialRelationship, closeOnComplete) {
        var adding = false,
            removing = false;
        if (typeof closeOnComplete === 'undefined') {
          closeOnComplete = false;
        }
        this.oidArray = [];
        if (!this.config.layers) {
          return;
        }
        if (this.config.layers.length === 0) {
          return;
        }

        if (geometry) {
          //get the adding or removing
          if(this.gSelectTypeVal === 'add'){
            adding = true;
          }
          if(this.gSelectTypeVal === 'rem'){
            removing = true;
          }
        }else{
          //get the adding or removing
          if(this.aSelectTypeVal === 'add'){
            adding = true;
          }
          if(this.aSelectTypeVal === 'rem'){
            removing = true;
          }
        }
        var queryParams = new Query();
        if(!adding && !removing){
          this.clear();
        }else{
          this._clearLayers();
          this.drawBox.clear();
          this.garr = [];
          this.lastDrawCommonType = null;
          this.lastDrawTool = null;
        }
        this.currentSearchLayer = this._createSearchResultLayer(layerIndex || 0);
        this.currentLayerIndex = layerIndex;

        var layerConfig = this.config.layers[layerIndex];

        if (geometry) {
          this.initiator = 'graphic';
          queryParams.geometry = geometry;
          queryParams.spatialRelationship = spatialRelationship || Query.SPATIAL_REL_INTERSECTS;
          if (this.cbxAddTextQuery.getValue()) {
            var gwhere = this.buildWhereClause(layerIndex, this.expressIndex, theValue);
            queryParams.where = this.lastWhere = gwhere;
            if(!gwhere){
              console.info('No SQL expression found');
            }else{
              console.info(gwhere);
            }
          }
          if (layerConfig.definitionexpression) {
            queryParams.where = layerConfig.definitionexpression;
            if (this.lastWhere) {
              queryParams.where += ' AND ' + this.lastWhere;
            }
            console.info('SQL Where with layers definition expression: ', queryParams.where);
          }
        } else {
          this.initiator = 'attribute';
          var where = this.buildWhereClause(layerIndex, expressIndex, theValue);
          queryParams.where = this.lastWhere = where;
          if (this.limitMapExtentCbx.getValue()) {
            queryParams.geometry = this.map.extent;
          }
          if (layerConfig.definitionexpression && this.lastWhere.indexOf(layerConfig.definitionexpression) === -1) {
            queryParams.where = layerConfig.definitionexpression + ' AND ' + this.lastWhere;
          }
          console.info('SQL Where with layers definition expression: ', queryParams.where);
        }

        //check for required fields
        if(this.initiator === 'attribute' || this.initiator === 'graphic' && this.cbxAddTextQuery.getValue()){
          if(!this.checkForRequiredFieldsEntered()){
            new Message({
              titleLabel: this.nls.requiredWarning,
              message: this.nls.requiredErrorMessage
            });
            return;
          }
        }

        if (this.rsltsTab) {
          this.tabContainer.selectTab(this.nls.results);
        }
        html.setStyle(this.progressBar.domNode, 'display', 'block');
        html.setStyle(this.divOptions, 'display', 'none');
        var fields = [];
        if (this.config.layers[layerIndex].fields.all) {
          fields[0] = "*";
        } else {
          for (var i = 0, len = this.config.layers[layerIndex].fields.field.length; i < len; i++) {
            fields[i] = this.config.layers[layerIndex].fields.field[i].name;
          }
        }
        if (!this.config.layers[layerIndex].existObjectId && fields.indexOf(this.config.layers[layerIndex].objectIdField) < 0) {
          if(!this.config.layers[layerIndex].fields.all){
            fields.push(this.config.layers[layerIndex].objectIdField);
          }
        }

        queryParams.returnGeometry = true;
        queryParams.outSpatialReference = this.map.spatialReference;
        queryParams.outFields = fields;

        if(this._isServiceSupportsOrderBy(this.resultLayers[layerIndex])){
          //set sorting info
          var orderByFields = this.config.layers[layerIndex].orderByFields;   //Need to feed in my orderby field array

          if(orderByFields && orderByFields.length > 0){
            queryParams.orderByFields = orderByFields;

            var orderFieldNames = array.map(orderByFields, lang.hitch(this, function(orderByField){
              var splits = orderByField.split(' ');
              return splits[0];
            }));

            //make sure orderFieldNames exist in outFields, otherwise the query will fail
            array.forEach(orderFieldNames, lang.hitch(this, function(orderFieldName){
              if(queryParams.outFields.indexOf(orderFieldName) < 0){
                queryParams.outFields.push(orderFieldName);
              }
            }));
          }
        }

        var queryTask = new QueryTask(layerConfig.url);
        html.empty(this.divResultMessage);
        html.place(html.toDom(this.nls.searching), this.divResultMessage);
        queryTask.execute(queryParams, lang.hitch(this, this._onSearchFinish, layerIndex, closeOnComplete, removing, adding),
          lang.hitch(this, this._onSearchError));
      },

      checkForRequiredFieldsEntered: function() {
        var content = this.paramsDijit.getSingleParamValues();
        //console.info(content);
        if (!content || content.length === 0 || !this.config.layers.length) {
          return false;
        }
        //loop though the single params
        for (var s = 0; s < content.length; s++) {
          var spRequired = this.config.layers[this.AttributeLayerIndex].expressions.expression[this.expressIndex].values.value[s].required || false;

          //console.info("Is required:", spRequired, "Single Param Value:", content[s].value);
          var hasAValue = false;
          if (!content[s].hasOwnProperty('value') || content[s].value === null) {
            if(!content[s].hasOwnProperty('value1') || content[s].value1 === null){
              continue;
            }
            if (content[s].value1.toString() !== "NaN" && content[s].value2.toString() !== "NaN") {
              hasAValue = false;
            }
          }else{
            if(content[s].value === "" || content[s].value.toString().toLowerCase() === "nan"){
              hasAValue = false;
            }else{
              hasAValue = true;
            }
          }
          //console.info("Is required:", spRequired, "Has a value:", hasAValue);
          if(spRequired && !hasAValue){
             return false;
          }
        }
        return true;
      },

      isSelTabVisible: function () {
        switch (this.selTab) {
        case this.nls.selectByAttribute:
          return this.attribTab;
        case this.nls.selectFeatures:
          return this.shapeTab;
        case this.nls.selectSpatial:
          return this.spatTab;
        case this.nls.results:
          return this.rsltsTab;
        }
      },

      clearFields: function () {
        if(this.AttributeLayerIndex || this.AttributeLayerIndex === 0){
          var exInd = this.expressIndex || 0;
          if(exInd > 0){
            this.onAttributeLayerExpressionChange(this.expressIndex);
          }else{
            this.onAttributeLayerChange(this.AttributeLayerIndex);
          }
          var valuesObj = lang.clone(this.config.layers[this.AttributeLayerIndex].expressions.expression[exInd].values.value);
          //console.info(valuesObj);
          array.map(valuesObj, lang.hitch(this, function(valObj){
            if(valObj.operation.toLowerCase().indexOf('date') > -1){
              if(valObj.valueObj.hasOwnProperty('value')){
                valObj.valueObj.value = "";
              }
              if(valObj.valueObj.hasOwnProperty('value1')){
                valObj.valueObj.value1 = "";
              }
              if(valObj.valueObj.hasOwnProperty('value2')){
                valObj.valueObj.value2 = "";
              }
              this.paramsDijit.setSingleParamValues(valuesObj, "");
            }
          }));
        }
      },

      clear: function ( /* optional */ closeAtt) {
        if(this.sumDivEvt){
          this.sumDivEvt.remove();
        }
        html.removeClass(this.list.domNode, 'sum');
        html.setStyle(this.divSum, 'display', 'none');
        html.setStyle(this.divOptions, 'display', 'none');
        this.currentLayerIndex = null;
        this.currentCSVResults = null;
        this.initiator = null;
        this.lastWhere = null;
        this.oidArray = [];
        this.currentFeatures = [];
        this._hideInfoWindow();
        this._clearLayers();
        this.divSum.innerHTML = '';
        this.zoomAttempt = 0;
        this.gSelectTypeVal = 'new';
        this.aSelectTypeVal = 'new';
        this.sumResultArr = [];
        html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
        html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'addSelIcon');
        html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
        html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'addSelIcon');
        if (closeAtt) {
          if (this.list.items.length > 0 && this.isSelTabVisible()) {
            this.tabContainer.selectTab(this.selTab);
          }
        }
        this.list.clear();
        html.empty(this.divResultMessage);
        this.drawBox.clear();
        this.garr = [];
        this.lastDrawCommonType = null;
        this.lastDrawTool = null;
        if (closeAtt) {
          if (this.wManager && this.attTableOpenedbySearch) {
            var widgetCfg = this._getWidgetConfig('AttributeTable');
            if(widgetCfg){
              var attWidget = this.wManager.getWidgetByLabel(widgetCfg.label);
              if (attWidget) {
                attWidget._closeTable();
              }
              this.attTableOpenedbySearch = false;
            }
          }
        }
        return false;
      },

      clearbuffer: function () {
        this.garr = [];
        this.graphicsLayerBuffer.clear();
        html.setStyle(this.btnClearBuffer2, 'display', 'none');
        html.setStyle(this.btnClearBuffer3, 'display', 'none');
        return false;
      },

      buildWhereClause: function (layerIndex, expressIndex, /* optional */ theValue) {
        var myPattern = /\[value\]/g;
        var myPattern1 = /\[value1\]/g;
        var myPattern2 = /\[value2\]/g;
        var myPattern3 = /\[value\]/;
        var expr = "";
        var eVal;
        var eVal1;
        var eVal2;
        var criteriaFromValue;
        var content = theValue || this.paramsDijit.getSingleParamValues();
        if (!content || content.length === 0 || !this.config.layers.length) {
          return;
        }
        //loop though the SPs and assemble the where clause
        for (var s = 0; s < content.length; s++) {
          var tOperator = (this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s] &&
            typeof this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s].operator !== 'undefined') ? this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s].operator : 'OR';
          var tOperation = this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s].operation;
          var queryExpr = this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s].sqltext;
          if (!content[s].hasOwnProperty('value') || content[s].value === null) {
            if(!content[s].hasOwnProperty('value1') || content[s].value1 === null){
              continue;
            }
            if (content[s].value1.toString() !== "NaN" && content[s].value2.toString() !== "NaN") {
              eVal1 = content[s].value1.toString();
              eVal2 = content[s].value2.toString();
              criteriaFromValue = queryExpr.replace(myPattern1, eVal1);
              criteriaFromValue = criteriaFromValue.replace(myPattern2, eVal2);
              expr = this.AppendTo(expr, criteriaFromValue, tOperator);
              continue;
            } else {
              continue;
            }
          }

          if (tOperation === 'stringOperatorContains') {
            var sa = content[s].value.toString().split(" "), word;
            for(w=0; w < sa.length; w++){
              word = sa[w];
              criteriaFromValue = queryExpr.replace(myPattern, word);
              expr = this.AppendTo(expr, criteriaFromValue, "AND");
            }
            continue;
          }

          if (tOperation === 'dateOperatorIsOn' || tOperation === 'dateOperatorIsNotOn') {
            eVal = content[s].value.toString();
            criteriaFromValue = queryExpr.replace(myPattern3, eVal);
            criteriaFromValue = criteriaFromValue.replace(myPattern3, eVal.replace('00:00:00', '23:59:59'));
            expr = this.AppendTo(expr, criteriaFromValue, tOperator);
            continue;
          } else if (tOperation === 'dateOperatorIsAfter') {
            eVal = content[s].value.toString();
            criteriaFromValue = queryExpr.replace(myPattern, eVal.replace('00:00:00', '23:59:59'));
            expr = this.AppendTo(expr, criteriaFromValue, tOperator);
            continue;
          }

          if (queryExpr === "[value]" || queryExpr.toLowerCase().indexOf(" in (") > 0) {
            //meaning an open SQL expression or an SQL with an IN Statement
            eVal = content[s].value.toString();
          } else {
            eVal = content[s].value.toString().replace(/'/g, "''");
          }

          /*If the expression is an IN Statement and the the value is a string then
          replace the user defines comma seperated values with single quoted values*/
          if (queryExpr.toLowerCase().indexOf(" in (") > 0 && queryExpr.toLowerCase().indexOf("'[value]'") > -1) {
            //replace the begining and trailing single qoutes if they exist
            eVal = eVal.replace(/^'|'$/g, "").replace(/,|','/g, "','");
          }

          if (content[s].value.toString().toLowerCase().trim() === "all") {
            var mExpr;
            if (queryExpr.indexOf("=") > -1) {
              mExpr = queryExpr.replace("=", "IN(") + ")";
            } else {
              mExpr = queryExpr;
            }
            var uList = this.config.layers[layerIndex].expressions.expression[expressIndex].values.value[s].userlist;
            var myPat;
            var uaList;
            if (uList.indexOf("','") > -1) {
              myPat = /,\s*'all'/gi;
              uList = uList.replace(myPat, "");
              uaList = this.trimArray(uList.split("','"));
              if (String(uaList[0]).substring(0, 1) === "'") {
                uaList[0] = String(uaList[0]).substring(1);
              }
              var lVal = String(uaList[uaList.length - 1]);
              if (lVal.substring(lVal.length - 1) === "'") {
                uaList[uaList.length - 1] = lVal.substring(0, lVal.length - 1);
              }
            } else {
              myPat = /,\s*all/gi;
              uList = uList.replace(myPat, "");
              uaList = this.trimArray(uList.split(","));
            }

            if (mExpr.indexOf("'[value]'") > -1) {
              uList = uaList.join("','");
            }
            criteriaFromValue = mExpr.replace(myPattern, uList);
            expr = this.AppendTo(expr, criteriaFromValue, tOperator);
          } else if (content[s].value.toString().toLowerCase() === "allu") {
            expr = this.AppendTo(expr, "1=1", tOperator);
          } else if (content[s].value.toString().toLowerCase() === "null" || content[s].value.toString().toLowerCase() === "nan"){
            //console.info(content[s].value.toString().toLowerCase());
            if (content[s].isValueRequired === true){
              var mExpr2 = queryExpr.substr(0, queryExpr.indexOf("=")) + " is null";
              expr = this.AppendTo(expr, mExpr2, tOperator);
            }
          } else {
            //don't add the expression if there is no user input
            if (eVal !== "") {
              criteriaFromValue = queryExpr.replace(myPattern, eVal);
              expr = this.AppendTo(expr, criteriaFromValue, tOperator);
            }
            //unless we are using isblank or notisblank
            if (tOperation === 'stringOperatorIsBlank' ||
                tOperation === 'stringOperatorIsNotBlank' ||
                tOperation === 'numberOperatorIsBlank' ||
                tOperation === 'numberOperatorIsNotBlank' ||
                tOperation === 'dateOperatorIsBlank' ||
                tOperation === 'dateOperatorIsNotBlank') {
              expr = this.AppendTo(expr, queryExpr, tOperator);
            }
          }
        }
        return expr;
      },

      AppendTo: function (string1, string2, operator) {
        if (string1.length > 0) {
          return string1 + " " + operator + " " + string2;
        } else {
          return string2;
        }
      },

      trimArray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].replace(/^\s*/, '').replace(/\s*$/, '');
        }
        return arr;
      },

      zoomall: function () {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var zoomScale = layerConfig.zoomScale || 10000;
        if (!this.currentLayerAdded) {
          return false;
        }
        if (this.currentLayerAdded.graphics.length === 1 && this.currentLayerAdded.graphics[0].geometry.type === "point") {
          var mp = this.currentLayerAdded.graphics[0].geometry;
          this.map.setScale(zoomScale);
          this.map.centerAt(mp);
        } else {
          if (this.currentLayerAdded.graphics.length === 0) {
            if (this.zoomAttempt <= 10) {
              setTimeout(lang.hitch(this, function () {
                this.zoomall();
              }), 300);
              this.zoomAttempt++;
            } else {
              this.zoomAttempt = 0;
              new Message({
                titleLabel: this.nls.warning,
                message: this.nls.zoomErrorMessage
              });
            }
          }
          var gExt = graphicsUtils.graphicsExtent(this.currentLayerAdded.graphics);
          if (gExt) {
            this.map.setExtent(gExt.expand(1.5), true);
          } else {
            var mp2 = this.currentLayerAdded.graphics[0].geometry;
            this.map.setScale(zoomScale);
            this.map.centerAt(mp2);
          }
        }
        return false;
      },

      _clearLayers: function () {
        this._removeAllResultLayers();
        html.setStyle(this.btnClear2, 'display', 'none');
        html.setStyle(this.btnClear3, 'display', 'none');
      },

      _onSearchError: function (error) {
        this.clear();
        html.setStyle(this.progressBar.domNode, 'display', 'none');
        //html.setStyle(this.divOptions, 'display', 'block');
        new Message({
          message: this.nls.searchError
        });
        console.debug(error);
      },

      _substitute: function (string, Attribs, currentLayer) {
        var lfields = this._getFieldsfromLink(string);
        for (var lf = 0; lf < lfields.length; lf++) {
          if (Attribs[lfields[lf]]) {
            var fld = this._getField(currentLayer, lfields[lf]);
            if (fld.type === "esriFieldTypeString") {
              string = string.replace(new RegExp('{' + lang.trim(lfields[lf]) + '}', 'g'), lang.trim(Attribs[lfields[lf]]));
            } else {
              string = string.replace(new RegExp('{' + lang.trim(lfields[lf]) + '}', 'g'), Attribs[lfields[lf]]);
            }
          }
        }
        return string;
      },

      _getFieldsfromLink: function (strLink) {
        var retArr = [];
        var b1 = 0;
        var e1 = 0;
        var fldName = '';
        do {
          b1 = strLink.indexOf("{", e1);
          if (b1 === -1) {
            break;
          }
          e1 = strLink.indexOf("}", b1);
          fldName = strLink.substring(b1 + 1, e1);
          retArr.push(fldName);
        } while (e1 < strLink.length - 1);
        return retArr;
      },

      _getAllLyrFields: function(){
        var tempFlds = array.filter(this.resultLayers[this.currentLayerIndex].fields, lang.hitch(this, function (fieldInfo) {
          return fieldInfo.type !== 'esriFieldTypeGeometry';
        }));
        return tempFlds;
      },

      _onSearchFinish: function (layerIndex, closeOnComplete, removing, adding, results) {
        var layerConfig = this.config.layers[layerIndex];
        var currentLayer;
        array.map(this.currentSearchLayer.fields, lang.hitch(this, function (element) {
          if(layerConfig.fields.all){
            element.show = true;
          }else{
            element.show = false;
            for (var f = 0; f < layerConfig.fields.field.length; f++) {
              if (layerConfig.fields.field[f].name == element.name) {
                element.show = true;
              }
            }
          }
        }));
        currentLayer = this.currentSearchLayer;
        if (layerConfig.layersymbolfrom === 'server') {
          currentLayer.setRenderer(this._setCurentLayerRenderer('server'));
        } else if(layerConfig.layersymbolfrom === 'layer') {
          currentLayer.setRenderer(this._setCurentLayerRenderer('layer'));
        } else{
          currentLayer.setRenderer(this._setCurentLayerRenderer('config'));
        }
        if (this.rsltsTab) {
          this.tabContainer.selectTab(this.nls.results);
        }
        html.setStyle(this.progressBar.domNode, 'display', 'none');
        html.setStyle(this.divOptions, 'display', 'block');

        var title = "";
        var titlefield = layerConfig.titlefield;
        var sumfield = layerConfig.sumfield || null;
        var objectIdField = layerConfig.objectIdField;
        var existObjectId = layerConfig.existObjectId;
        var typeIdField = layerConfig.typeIdField;

//modify the currentFeatures with the new results
        var csvData;
        if(adding && this.currentFeatures && this.currentFeatures.length > 0){
          csvData = this.currentCSVResults.data || [];
          array.forEach(results.features, lang.hitch(this, function(gra){
            if(this.currentFeatures.indexOf(gra) < 0){
              this.currentFeatures.push(gra);
            }
          }));
        }else if (removing && this.currentFeatures && this.currentFeatures.length > 0){
          csvData = this.currentCSVResults.data || [];
          array.forEach(results.features, lang.hitch(this, function(gra){
            for (var g = this.currentFeatures.length - 1; g >= 0; g--){
              if(this.currentFeatures[g].attributes[objectIdField] == gra.attributes[objectIdField]){
                this.currentFeatures.splice(g, 1);
                break;
              }
            }
            for (var g1 = csvData.length - 1; g1 >= 0; g1--){
              var csvRowRem = csvData[g1];
              if(csvRowRem.OID == gra.attributes[objectIdField]){
                csvData.splice(g1, 1);
                break;
              }
            }
          }));
        }else{
          csvData = [];
          this.currentCSVResults = null;
          this.currentFeatures = results.features;
        }

        var listLen = this.list.items.length;
        var len = results.features.length;
        if (this.currentFeatures.length === 0) {
          html.empty(this.divResultMessage);
          html.place(html.toDom(this.nls.noResults), this.divResultMessage);
          this.list.clear();
          this.gSelectTypeVal = 'new';
          this.aSelectTypeVal = 'new';
          html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
          html.replaceClass(this.gSelectType.iconNode, 'newSelIcon', 'addSelIcon');
          html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'removeSelIcon');
          html.replaceClass(this.aSelectType.iconNode, 'newSelIcon', 'addSelIcon');
          html.setStyle(this.divOptions, 'display', 'none');
          return;
        } else {
          html.empty(this.divResultMessage);
          html.place(html.toDom("<label>" + this.nls.featuresSelected + this.currentFeatures.length + "</label>"), this.divResultMessage);
        }
        var i, slen, sumTotal, numFormat, currFormat, args, sValue, args2;
        //determine if this layer has any sum field(s)
        this._getSumFields(layerIndex);
        if(this.sumFields.length > 0){
          html.addClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', '');
        }else{
          html.removeClass(this.list.domNode, 'sum');
          html.setStyle(this.divSum, 'display', 'none');
        }
        if(this.sumFields.length > 0){
          this.sumResultArr = [];
          if(this.sumDivEvt){
            this.sumDivEvt.remove();
          }
          array.map(this.sumFields, lang.hitch(this, function(sumfield){
            sumTotal = 0;
            for ( i = 0, slen = this.currentFeatures.length; i < slen; i++) {
              var feature = this.currentFeatures[i];
              sumTotal += Number(feature.attributes[sumfield.field]);
            }

            numFormat = this._getNumberFormat(sumfield.field, layerIndex);
            if (numFormat) {
              args = numFormat.split("|");
              /*value,percision,symbol,thousands,decimal*/
              sValue = this._formatNumber(sumTotal, args[0] || null, args[1] || null, args[2] || null);
            }
            currFormat = this._getCurrencyFormat(sumfield.field, layerIndex);
            if (currFormat) {
              args2 = currFormat.split("|");
              /*value,percision,symbol,thousands,decimal*/
              sValue = this._formatCurrency(sumTotal, args2[1] || null, args2[0] || null, args2[2] || null, args2[3] || null);
            }
            this.sumResultArr.push(sumfield.sumlabel + ' ' + sValue);
          }));
          if(this.sumFields.length > 1){
            this.divSum.innerHTML = this.sumResultArr[0] + '&nbsp;&nbsp;' + this.nls.more + '...';
            html.setStyle(this.divSum, 'cursor', 'pointer');
            this.sumDivEvt = on(this.divSum, 'click', lang.hitch(this, function(){
              new Message({titleLabel: this.nls.summaryresults, message: this.sumResultArr.join('<br>')});
            }));
          }else if(this.sumFields.length === 1){
            html.setStyle(this.divSum, 'cursor', 'default');
            this.divSum.innerHTML = this.sumResultArr[0];
          }
        }
        var csvColumns = [];
        for (i = 0; i < len; i++) {
          var featureAttributes = results.features[i].attributes;
          //console.info(results.features[i]);
          //work with the links now
          var qLinks = [];
          if (layerConfig.links && layerConfig.links.link) {
            qLinks = layerConfig.links.link;
          }
          var lyrQLinks = [];
          for (var a = 0; a < qLinks.length; a++) {
            var link = "",
              alias = "",
              linkicon = "",
              linkFieldNull = false,
              disableInPopUp = false,
              popupType;
            if (qLinks[a].disableinpopup) {
              disableInPopUp = true;
            }
            if (qLinks[a].disablelinksifnull) {
              var lfields = this._getFieldsfromLink(qLinks[a].content);
              for (var lf = 0; lf < lfields.length; lf++) {
                if (!featureAttributes[lfields[lf]] || featureAttributes[lfields[lf]] === "") {
                  linkFieldNull = true;
                  break;
                }
              }
            }
            if (linkFieldNull) {
              link = "";
            } else {
              link = this._substitute(qLinks[a].content, featureAttributes, results);
            }
            var sub = this._substitute(qLinks[a].alias, featureAttributes, results);
            alias = (sub) ? sub : qLinks[a].alias;
            linkicon = this._substitute((qLinks[a].icon || this.folderUrl + 'images/w_link.png'), featureAttributes, results);
            popupType = qLinks[a].popuptype;
            var lObj = {
              link: link,
              icon: linkicon,
              alias: alias,
              disableinpopup: disableInPopUp,
              popuptype: popupType
            };
            if(!linkFieldNull){
              lyrQLinks.push(lObj);
            }
          }

          var content = "",
            rsltcontent = "",
            value = "",
            csvRow = {},
            oidVal;
          csvColumns = [];
          //ensure fields are ordered the same way they are configuraed in the json (this is an issue for ArcGIS Server 10.2.x)
          var tempFlds = lang.clone(this.config.layers[layerIndex].fields.field);
          if(this.config.layers[layerIndex].fields.all){
            var tempFlds = this._getAllLyrFields();
          }
          if(!existObjectId && objectIdField && tempFlds.indexOf({"name": objectIdField}) < 0){
            tempFlds.push(
              {"name": objectIdField}
            );
          }
          array.map(tempFlds, lang.hitch(this, function (attr) {
            var att = attr.name;
            var fld = this._getField(results, att);
            if(!fld){
              console.info(att, results);
            }
            if (fld.name === objectIdField) {
              oidVal = featureAttributes[att];
              if(existObjectId){
                csvColumns.push(this._getAlias(att, layerIndex));
                csvRow[this._getAlias(att, layerIndex)] = oidVal;
              }
              csvRow["OID"] = oidVal;
            }else{
              csvColumns.push(this._getAlias(att, layerIndex));
            }
            if (this.initiator && (this.initiator === 'graphic' || this.limitMapExtentCbx.getValue())) {
              if (fld.name === objectIdField) {
                this.oidArray.push(oidVal);
              }
            }

            if (!existObjectId && fld.name === objectIdField) {
              //continue;
              return;
            }
            var fieldValue = featureAttributes[att];
            value = fieldValue !== null ? String(fieldValue) : "";
            if (value !== "") {
              var isDateField;
              if (fld) {
                isDateField = fld.type === "esriFieldTypeDate";
              }
              if (isDateField) {
                var dateMS = Number(fieldValue);
                if (!isNaN(dateMS)) {
                  if (this._getDateFormat(att, layerIndex) !== "") {
                    value = this._formatDate(dateMS, this._getDateFormat(att, layerIndex));
                  } else {
                    value = this._formatDate(dateMS, 'MM/dd/yyyy');
                  }
                }
              }
              numFormat = this._getNumberFormat(att, layerIndex);
              if (numFormat) {
                args = numFormat.split("|");
                /*value,percision,symbol,thousands,decimal*/
                value = this._formatNumber(fieldValue, args[0] || null, args[1] || null, args[2] || null);
              }
              currFormat = this._getCurrencyFormat(att, layerIndex);
              if (currFormat) {
                args2 = currFormat.split("|");
                /*value,percision,symbol,thousands,decimal*/
                value = this._formatCurrency(fieldValue, args2[1] || null, args2[0] || null, args2[2] || null, args2[3] || null);
              }
              var typeID = typeIdField ? featureAttributes[typeIdField] : null;
              if (att === typeIdField) {
                var featureType = this._getFeatureType(this.resultLayers[layerIndex], typeID);
                if (featureType && featureType.name) {
                  value = featureType.name;
                }
              } else {
                var codedValue = this._getCodedValue(this.resultLayers[layerIndex], att, fieldValue, null);
                if (codedValue) {
                  value = codedValue.name;
                }
              }
            }

            var upperCaseFieldName = att.toUpperCase();
            if (titlefield && upperCaseFieldName === titlefield.toUpperCase()) {
              title = value;
              csvRow[this._getAlias(att, layerIndex)] = value;
            } else {
              if (this._isVisible(att, layerIndex)) {
                content = content + this.resultFormatString.replace('[attribname]', this._getAlias(att, layerIndex)).replace('[attribvalue]', value);
                if (!this._isPopupOnly(att, layerIndex)) {
                  rsltcontent = rsltcontent + this.resultFormatString.replace('[attribname]',
                                                                              this._getAlias(att, layerIndex)).replace('[attribvalue]', value);
                }
                csvRow[this._getAlias(att, layerIndex)] = value;
              }
            }
          }));
          if (content.lastIndexOf('<br>') === (content.length - 4)) {
            content = content.substr(0, content.length - 4);
          } else {
            content = content;
          }
          if (rsltcontent.lastIndexOf('<br>') === (rsltcontent.length - 4)) {
            rsltcontent = rsltcontent.substr(0, rsltcontent.length - 4);
          } else {
            rsltcontent = rsltcontent;
          }
          var symbol = currentLayer.renderer.getSymbol(results.features[i]);

          // var ofl = new FeatureLayer(this.resultLayers[this.currentLayerIndex]._origLayerURL);
          // ofl.queryAttachmentInfos(oidVal, lang.hitch(this, function(evt){
          //   console.info(evt);
          // }));

          if(!removing){
            csvData.push(csvRow);
            this.list.add({
              id: "id_" + i + listLen,
              OID: oidVal,
              title: title,
              content: content,
              rsltcontent: rsltcontent,
              alt: (i % 2 === 0),
              sym: symbol,
              links: lyrQLinks,
              removeResultMsg: this.nls.removeResultMsg
            });
            // ,
            // showRelate: layerConfig.relates && layerConfig.relates.relate,
            // relalias: this.nls.showrelates
          }else{
            var index = this._returnListIndexFromOID(oidVal);
            if(index > -1){
              this.list.remove(index);
            }
          }
        }
        this.list.addComplete();
        this.currentCSVResults = {
          data: csvData,
          columns: csvColumns
        }
        html.setStyle(this.btnClear2, 'display', 'block');
        html.setStyle(this.btnClear3, 'display', 'block');
        this._drawResults(layerIndex, results, currentLayer, closeOnComplete);
      },

      _returnListIndexFromOID: function (OID) {
        var retVal = -1;
        array.some(this.list.items, lang.hitch(this, function(item, index){
          if (item.OID === OID) {
            retVal = index;
            return true;
          }
        }));
        return retVal;
      },

      _setCurentLayerRenderer: function (symFromWhere) {
        if (symFromWhere === 'server') {
          return jsonUtil.fromJson(this.resultLayers[this.currentLayerIndex].drawingInfo.renderer);
        } else {
          var symbol,
            type = this.resultLayers[this.currentLayerIndex].geometryType;

          if(symFromWhere === 'layer'){
            var layerConfig = this.config.layers[this.currentLayerIndex];
            if(layerConfig.symbology){
              symbol = symUtils.fromJson(layerConfig.symbology);
              var sRend = new SimpleRenderer(symbol);
              sRend.label = sRend.description = this.config.layers[this.currentLayerIndex].name;
              return sRend;
            }
          }

          //Determine the geometry type to set the symbology
          switch (type) {
          case "esriGeometryMultipoint":
          case "esriGeometryPoint":
            if (this.config.symbols && this.config.symbols.simplemarkersymbol) {
              symbol = new SimpleMarkerSymbol(this.config.symbols.simplemarkersymbol);
            } else {
              if (this.config.symbols && this.config.symbols.picturemarkersymbol) {
                var pms = lang.clone(this.config.symbols.picturemarkersymbol);
                pms.url = this.folderUrl + pms.url;
                symbol = new PictureMarkerSymbol(pms);
              } else {
                symbol = new SimpleMarkerSymbol();
              }
            }
            break;
          case "esriGeometryPolyline":
            if (this.config.symbols && this.config.symbols.simplelinesymbol) {
              symbol = new SimpleLineSymbol(this.config.symbols.simplelinesymbol);
            } else {
              symbol = new SimpleLineSymbol();
            }
            break;
          case "esriGeometryEnvelope":
          case "esriGeometryPolygon":
            if (this.config.symbols && this.config.symbols.simplefillsymbol) {
              symbol = new SimpleFillSymbol(this.config.symbols.simplefillsymbol);
            } else {
              symbol = new SimpleFillSymbol();
            }
            break;
          default:
            break;
          }
          var simpRend = new SimpleRenderer(symbol);
          simpRend.label = simpRend.description = this.config.layers[this.currentLayerIndex].name;
          return simpRend;
        }
      },

      _openResultInAttributeTable: function (currentLayer) {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var lyrZoomExistsAndTrue = (layerConfig.hasOwnProperty("autozoomtoresults") && !layerConfig.autozoomtoresults)?false:true;
        if (this.autozoomtoresults && lyrZoomExistsAndTrue) {
          setTimeout(lang.hitch(this, function () {
            this.zoomall();
          }), 300);
        }
        var layerInfo = this.operLayerInfos.getLayerInfoById(currentLayer.id);
        this.publishData({
          'target': 'AttributeTable',
          'layer': layerInfo
        });
      },

      _getFeatureType: function (layer, typeID) {
        var result;
        if (layer) {
          for (var t = 0; t < layer.types.length; t++) {
            var featureType = layer.types[t];
            if (typeID === featureType.id) {
              result = featureType;
              break;
            }
          }
        }
        return result;
      },

      _getCodedValue: function (layer, fieldName, fieldValue, typeID) {
        var result;
        var codedValueDomain;
        if (typeID) {
          var featureType = this._getFeatureType(layer, typeID);
          if (featureType) {
            codedValueDomain = featureType.domains[fieldName];
          }
        } else {
          var field = this._getField(layer, fieldName);
          if (field) {
            codedValueDomain = field.domain;
          }
        }
        if (codedValueDomain) {
          if (codedValueDomain.type === 'codedValue') {
            for (var cv = 0; cv < codedValueDomain.codedValues.length; cv++) {
              var codedValue = codedValueDomain.codedValues[cv];
              if (fieldValue === codedValue.code) {
                result = codedValue;
                break;
              }
            }
          }
        }
        return result;
      },

      _getField: function (layer, fieldName) {
        var result;
        if (layer) {
          for (var f = 0; f < layer.fields.length; f++) {
            var field = layer.fields[f];
            if (fieldName === field.name) {
              result = field;
              break;
            }
          }
        }
        return result;
      },

      _formatDate: function (value, dateFormat) {
        if (dateFormat) {
          dateFormat = dateFormat.replace(/D/g, "d").replace(/Y/g, "y");
        }
        var inputDate = new Date(value);
        return locale.format(inputDate, {
          selector: 'date',
          datePattern: dateFormat
        });
      },

      _getAlias: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase() && item.alias) {
            return item.alias;
          }
        }
        return att;
      },

      _isVisible: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase()) {
            if (item.hasOwnProperty('visible') && item.visible === false) {
              return false;
            } else {
              return true;
            }
          }
        }
        return true;
      },

      _isPopupOnly: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase()) {
            if (item.hasOwnProperty('popuponly') && item.popuponly === true) {
              return true;
            } else {
              return false;
            }
          }
        }
        return false;
      },

      _getDateFormat: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase() && item.dateformat) {
            return item.dateformat;
          }
        }
        return "";
      },

      _getCurrencyFormat: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase() && item.currencyformat) {
            return item.currencyformat;
          }
        }
        return null;
      },

      _formatCurrency: function (value, percision, symbol, thousand, decimal) {
        value = value || 0;
        percision = !isNaN(percision = Math.abs(percision)) ? percision : 2;
        symbol = symbol !== undefined ? symbol : "$";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = value < 0 ? "-" : "",
          i = parseInt(value = Math.abs(+value || 0).toFixed(percision), 10) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
          (percision ? decimal + Math.abs(value - i).toFixed(percision).slice(2) : "");
      },

      _getNumberFormat: function (att, layerIndex) {
        var field = this.config.layers[layerIndex].fields.field;
        var item;
        for (var i in field) {
          item = field[i];
          if (item && item.name && item.name.toLowerCase() === att.toLowerCase() && item.numberformat) {
            return item.numberformat;
          }
        }
        return null;
      },

      _formatNumber: function (value, percision, thousand, decimal) {
        value = value || 0;
        percision = !isNaN(percision = Math.abs(percision)) ? percision : 2;
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = value < 0 ? "-" : "",
          i = parseInt(value = Math.abs(+value || 0).toFixed(percision), 10) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
        return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
          (percision ? decimal + Math.abs(value - i).toFixed(percision).slice(2) : "");
      },

      _drawResults: function (layerIndex, results, currentLayer, closeOnComplete) {
        var layerConfig = this.config.layers[layerIndex];
        if (this.graphicsLayerBuffer instanceof FeatureLayer) {
          this._addOperationalLayer(this.graphicsLayerBuffer);
        }
        if (currentLayer instanceof FeatureLayer) {
          this._addOperationalLayer(currentLayer);
        }

        var type, centerpoint;
        for (var i = 0, len = this.currentFeatures.length; i < len; i++) {
          var feature = this.currentFeatures[i];
          var listItem = this.list.items[this._returnListIndexFromOID(feature.attributes[layerConfig.objectIdField])];
          type = feature.geometry.type;
          switch (type) {
          case "multipoint":
          case "point":
            centerpoint = feature.geometry;
            break;
          case "polyline":
            centerpoint = feature.geometry.getPoint(0, 0);
            break;
          case "extent":
          case "polygon":
            centerpoint = feature.geometry.getExtent().getCenter();
            break;
          default:
            break;
          }
          listItem.centerpoint = centerpoint;
          var lyrDisablePopupsAndTrue = (layerConfig.hasOwnProperty("disablePopups") && layerConfig.disablePopups)?true:false;
          if((!this.config.disablePopups && !lyrDisablePopupsAndTrue) && !currentLayer._hasInfoTemplate){
            feature.setInfoTemplate(this._configurePopupTemplate(listItem));
          }
          feature.setSymbol(listItem.sym);
          if (feature.geometry) {
            currentLayer.add(feature);
            listItem.graphic = feature;
          }
        }
        this.zoomAttempt = 0;
        if (layerConfig.shareResult && layerConfig.addToAttrib) {
          if (this.wManager) {
            var widgetCfg = this._getWidgetConfig('AttributeTable');
            if(widgetCfg){
              var attWidget = this.wManager.getWidgetByLabel(widgetCfg.label);
              if(attWidget){
                this.attTableOpenedbySearch = !attWidget.showing;
                this.wManager.openWidget(attWidget);
                attWidget._openTable().then(lang.hitch(this, this._openResultInAttributeTable, currentLayer));
              }else{
                /*Attribute Table Widget is not loaded*/
                this.wManager.loadWidget(widgetCfg).then(lang.hitch(this, function(widget){
                  if(widget){
                    this.attTableOpenedbySearch = true;
                    widget.setPosition(this.getOffPanelWidgetPosition(widget));
                    this.wManager.openWidget(widget);
                    widget._openTable().then(lang.hitch(this, this._openResultInAttributeTable, currentLayer));
                  }
                }));
              }
            }else{
              console.warn('The Attribute Table Widget is not configured in this app.');
              this._zoomAndClose(closeOnComplete);
            }
          }
          if (closeOnComplete) {
            setTimeout(lang.hitch(this, function () {
              this.pManager.closePanel(this.id + '_panel');
            }), 500);
          }
        } else {
          this._zoomAndClose(closeOnComplete);
        }

        if (this.mouseovergraphics) {
          on(currentLayer, 'mouse-over', lang.hitch(this, this.onMouseOverGraphic));
        }
        this.currentLayerAdded = currentLayer;
      },

      _zoomAndClose: function (closeOnComplete) {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var lyrZoomExistsAndTrue = (layerConfig.hasOwnProperty("autozoomtoresults") && !layerConfig.autozoomtoresults)?false:true;
        if (this.autozoomtoresults && lyrZoomExistsAndTrue) {
          setTimeout(lang.hitch(this, function () {
            this.zoomall();
          }), 300);
        }
        if (closeOnComplete) {
          setTimeout(lang.hitch(this, function () {
            this.pManager.closePanel(this.id + '_panel');
          }), 500);
        }
      },

      _getWidgetConfig: function(widgetName){
        var widgetCnfg = null;
        array.some(this.wManager.appConfig.widgetPool.widgets, function(aWidget) {
          if(aWidget.name == widgetName) {
            widgetCnfg = aWidget;
            return true;
          }
          return false;
        });
        if(!widgetCnfg){
          /*Check OnScreen widgets if not found in widgetPool*/
          array.some(this.wManager.appConfig.widgetOnScreen.widgets, function(aWidget) {
            if(aWidget.name == widgetName) {
              widgetCnfg = aWidget;
              return true;
            }
            return false;
          });
        }
        return widgetCnfg;
      },

      getOffPanelWidgetPosition: function(widget){
        var position = {
          relativeTo: widget.position.relativeTo
        };
        var pbox = html.getMarginBox(this.domNode);
        var sbox = this.widgetManager.getWidgetMarginBox(widget);
        var containerBox = html.getMarginBox(position.relativeTo === 'map'?
          this.map.id: jimuConfig.layoutId);

        var top = pbox.t + pbox.h + 1;//put under icon by default
        if(top + sbox.h > containerBox.h){
          position.bottom = containerBox.h - pbox.t + 1;
        }else{
          position.top = top;
        }

        if (window.isRTL) {
          if(pbox.l + pbox.w - sbox.w < 0){
            position.right = 0;
          }else{
            position.right = pbox.l + pbox.w - sbox.w;
          }
        } else {
          if(pbox.l + sbox.w > containerBox.w){
            position.right = 0;
          }else{
            position.left = pbox.l;
          }
        }
        return position;
      },

      _searchResultListByOID: function (OID) {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var lyrHasPopupDisabled = (layerConfig.hasOwnProperty("disablePopups") && layerConfig.disablePopups)?true:false;
        for (var i = 0; i < this.list.items.length; i++) {
          var item = this.list.items[i];
          var point = item.centerpoint;
          if (item.OID === OID) {
            var itemDom = dojo.byId(this.list.id.toLowerCase() + item.id);
            if(itemDom){
              itemDom.scrollIntoView(false);
            }
            this.list.setSelectedItem(this.list.id.toLowerCase() + item.id);
            if ((this.map.infoWindow && this.config.enablePopupsOnResultClick) && !lyrHasPopupDisabled) {
              this.map.infoWindow.setFeatures([item.graphic]);
              if (this.map.infoWindow.reposition) {
                this.map.infoWindow.reposition();
              }
              if(layerConfig.showattachments){
                this._addAttachment(item.OID);
              }
              this.map.infoWindow.show(point);
            }
          }
        }
      },

      onMouseOverGraphic: function (evt) {
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var oidField = layerConfig.objectIdField;
        this._searchResultListByOID(evt.target.e_graphic.attributes[oidField]);
      },

      _configurePopupTemplate: function (listItem) {
        var popUpInfo = {
          title: listItem.title,
          description: listItem.content,
          showAttachments: true
        };
        var pminfos = [];
        var popUpMediaInfo;

        for (var l = 0; l < listItem.links.length; l++) {
          if (listItem.links[l].link) {
            var pos = listItem.links[l].link.length - 4;
            var sfx = String(listItem.links[l].link).substr(pos, 4).toLowerCase();
            if (((sfx === ".jpg") || (sfx === ".png") || (sfx === ".gif")) && listItem.links[l].popuptype !== "text") {
              // use PopUpMediaInfo if it is an image
              if (!listItem.links[l].disableinpopup) {
                popUpMediaInfo = {};
                popUpMediaInfo.type = "image";
                var val = {};
                val.sourceURL = listItem.links[l].link;
                val.linkURL = listItem.links[l].link;
                popUpMediaInfo.value = val;
                popUpMediaInfo.caption = listItem.links[l].alias;
                pminfos.push(popUpMediaInfo);
              }
            } else if (listItem.links[l].icon !== "" && listItem.links[l].popuptype !== "text") {
              if (!listItem.links[l].disableinpopup) {
                popUpMediaInfo = {};
                popUpMediaInfo.type = 'image';
                popUpMediaInfo.value = {};
                popUpMediaInfo.value.sourceURL = listItem.links[l].icon;
                popUpMediaInfo.value.linkURL = listItem.links[l].link;
                popUpMediaInfo.caption = listItem.links[l].alias;
                pminfos.push(popUpMediaInfo);
              }
            } else {
              if (!listItem.links[l].disableinpopup) {
                var lText = (listItem.links[l].alias !== "") ? listItem.links[l].alias : listItem.links[l].link;
                popUpInfo.description += "<br><a href='" + listItem.links[l].link + "'>" + lText + "</a>";
              }
            }
          }
        }
        if (pminfos.length > 0) {
          popUpInfo.mediaInfos = pminfos;
        }
        var pt = new PopupTemplate(popUpInfo);
        return pt;
      },

      _selectResultItem: function (index, item) {
        var FeatLyr = new FeatureLayer(this.resultLayers[this.currentLayerIndex]._origLayerURL);
        var point = item.centerpoint;
        var layerConfig = this.config.layers[this.currentLayerIndex];
        var lyrHasPopupDisabled = (layerConfig.hasOwnProperty("disablePopups") && layerConfig.disablePopups)?true:false;
        var zoomScale = layerConfig.zoomScale || 10000;
        if (item.graphic.geometry.type === "point") {
          if ((this.map.getScale() > zoomScale || layerConfig.forceZoomScale) && !lyrHasPopupDisabled) {
            this.map.setScale(zoomScale).then(lang.hitch(this, this.map.centerAt(point).then(lang.hitch(this, function () {
              if (this.map.infoWindow && this.config.enablePopupsOnResultClick) {
                this.map.infoWindow.setFeatures([item.graphic]);
                if (this.map.infoWindow.reposition) {
                  this.map.infoWindow.reposition();
                }
                if(layerConfig.showattachments){
                  this._addAttachment(item.OID);
                }
                this.map.infoWindow.show(point);
              }
            }))));
          } else {
            this.map.centerAt(point).then(lang.hitch(this, function () {
              if ((this.map.infoWindow && this.config.enablePopupsOnResultClick) && !lyrHasPopupDisabled) {
                this.map.infoWindow.setFeatures([item.graphic]);
                if (this.map.infoWindow.reposition) {
                  this.map.infoWindow.reposition();
                }
                if(layerConfig.showattachments){
                  this._addAttachment(item.OID);
                }
                this.map.infoWindow.show(point);
              }
            }));
          }
        } else {
          var gExt = graphicsUtils.graphicsExtent([item.graphic]);
          if (gExt && !layerConfig.forceZoomScale) {
            this.map.setExtent(gExt.expand(1.5), true).then(lang.hitch(this, function () {
              if ((this.map.infoWindow && this.config.enablePopupsOnResultClick) && !lyrHasPopupDisabled) {
                this.map.infoWindow.setFeatures([item.graphic]);
                if (this.map.infoWindow.reposition) {
                  this.map.infoWindow.reposition();
                }
                if(layerConfig.showattachments){
                  this._addAttachment(item.OID);
                }
                this.map.infoWindow.show(point);
              }
            }));
          } else {
            if (this.map.getScale() > zoomScale || layerConfig.forceZoomScale) {
              this.map.setScale(zoomScale).then(lang.hitch(this, this.map.centerAt(point).then(lang.hitch(this, function () {
                if ((this.map.infoWindow && this.config.enablePopupsOnResultClick) && !lyrHasPopupDisabled) {
                  this.map.infoWindow.setFeatures([item.graphic]);
                  if (this.map.infoWindow.reposition) {
                    this.map.infoWindow.reposition();
                  }
                  if(layerConfig.showattachments){
                    this._addAttachment(item.OID);
                  }
                  this.map.infoWindow.show(point);
                }
              }))));
            } else {
              this.map.centerAt(point).then(lang.hitch(this, function () {
                if ((this.map.infoWindow && this.config.enablePopupsOnResultClick) && !lyrHasPopupDisabled) {
                  this.map.infoWindow.setFeatures([item.graphic]);
                  if (this.map.infoWindow.reposition) {
                    this.map.infoWindow.reposition();
                  }
                  if(layerConfig.showattachments){
                    this._addAttachment(item.OID);
                  }
                  this.map.infoWindow.show(point);
                }
              }));
            }
          }
        }
      },

      _addAttachment: function(OID) {
        var ofl = new FeatureLayer(this.resultLayers[this.currentLayerIndex]._origLayerURL);
        ofl.queryAttachmentInfos(OID, lang.hitch(this, function(info){
          if(info.length > 0){
            var domAttSec = dojoQuery(".attachmentsSection", this.map.infoWindow.domNode)[0];
            var aWidget = dijit.getEnclosingWidget(domAttSec);
            array.map(info, lang.hitch(this, function(att){
              var attLi = domConstruct.toDom('<li><a href="' + att.url + '" target="_blank">' + att.name +'</a></li>');
              domConstruct.place(attLi, aWidget._attachmentsList);
            }));
            domClass.remove(domAttSec,'hidden');
            aWidget = null;
          }
        }));
        ofl = null;
      },

      _hideInfoWindow: function () {
        if (this.map && this.map.infoWindow) {
          this.map.infoWindow.hide();
        }
      }

    });
  });
