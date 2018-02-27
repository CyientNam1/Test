define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  "dojo/parser",
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/on',
  "dijit/Dialog",
  "dijit/registry",
  "dijit/form/Button",
  "dojo/date/locale",
  'dojo/dom',
  "dojo/ready",
  "dojo/_base/array",
  "dijit/form/CheckBox",

  "esri/layers/ArcGISDynamicMapServiceLayer",
  'dojo/_base/Color',
  "esri/graphic",
  "esri/geometry/Extent",
  "esri/symbols/SimpleMarkerSymbol",
  'esri/symbols/SimpleLineSymbol',
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/renderers/ClassBreaksRenderer",
  "esri/layers/GraphicsLayer",
  "esri/SpatialReference",
  "esri/dijit/PopupTemplate",
  "esri/geometry/Point",
  "esri/geometry/webMercatorUtils",
  "esri/tasks/QueryTask",
  "esri/tasks/query",
  'dijit/ProgressBar',
  'dojo/_base/html',
  'dijit/layout/BorderContainer',
  'dijit/layout/ContentPane',
  "esri/layers/FeatureLayer",
  "esri/renderers/HeatmapRenderer",
  "jimu/dijit/FeatureSetChooserForSingleLayer"

]
  ,
  function (
    declare,
    BaseWidget,
    parser,
    _WidgetsInTemplateMixin,
    lang,
    on,
    Dialog,
    registry,
    Button,
    locale,
    dom,
    ready,
    array,
    CheckBox,
    ArcGISDynamicMapServiceLayer,
    Color,
    Graphic, Extent,
    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
    GraphicsLayer, SpatialReference,
    PopupTemplate, Point, webMercatorUtils,
    QueryTask,
    Query,
    ProgressBar,
    html,
    BorderContainer,
    ContentPane,
    FeatureLayer,
    HeatmapRenderer,
    FeatureSetChooserForSingleLayer
  ) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // DemoWidget code goes here

      //please note that this property is be set by the framework when widget is loaded.
      //templateString: template,

      baseClass: 'jimu-widget-Analytics',
      layers: null,
      heatmapFeatureLayer: null,
      isSelectionEnabled: false,
      featureSelector: null,
      selectedFeatures: null,

      postCreate: function () {
        this.inherited(arguments);
        console.log('postCreate');
        this._initProgressBar();
      },

      startup: function () {
        this.inherited(arguments);
    
        this.btnApply.on("click", lang.hitch(this, this.ApplyModel));
        this.btnReset.on("click", lang.hitch(this, this.ResetModel));
  
        console.log('startup');
      },

      _initProgressBar: function () {
        this.progressBar = new ProgressBar({
          indeterminate: true
        }, this.progressbar);
        html.setStyle(this.progressBar.domNode, 'display', 'none');
      },

      ApplyModel: function () {

    
          var heatLayersList = [];
            array.forEach(this.config.layers, lang.hitch(this, function(hlayer) {
            var grpObj = {};
            grpObj.layer = hlayer.layer;
            grpObj.Priotiy1MVfields = hlayer.Priotiy1MVfields;
            grpObj.Priotiy1LVfields = hlayer.Priotiy1LVfields;
            heatLayersList.push(grpObj);
            this.AddHeatMapLayer(grpObj);
          }));

        html.setStyle(this.progressBar.domNode, 'display', 'block');

        // var featureLayer = this.GetLayerByName("Pole_Predictive_Results");

        // // var defExpress = "Classifier = '" + selectedClassifier + "' and MODEL_ID = " + mdlID;
        // var defExpress = this.GetRiskCategory();
        // if (featureLayer != undefined) {
        //   // if (defExpress !== null)
        //   //   {
        //   featureLayer.setDefinitionExpression(defExpress);
        //   //   }
        //   featureLayer.setVisibility(true);
        // }
        // var poleFeatureLayer = this.GetLayerByName("Pole");
        // if (poleFeatureLayer != undefined) {
        //   poleFeatureLayer.setVisibility(false);
        // }
        // html.setStyle(this.progressBar.domNode, 'display', 'none');
       
       // this.AddHeatMapLayer(defExpress);
      },
      
      _onSelect: function(){
        if(this.isSelectionEnabled)
        this.featureSelector.enable();
        else 
        this.featureSelector.disable();
        this.isSelectionEnabled = !this.isSelectionEnabled;
      },

      _onShowDirections: function(){
         if (this.selectedFeatures !== null && this.selectedFeatures.length > 0) {
            this.publishData({ features: this.selectedFeatures, type:"directions" });
          }
         this.openWidgetById('widgets_Directions_Widget_37').then(lang.hitch(this, function (widget) {

         }));
        
      },

      AddHeatMapLayer: function (grpObj) {
        console.log('HeatMap');
        var featureLayer = this.GetLayerByName("HeatMap_Layer")
        if (featureLayer != undefined) {
          this.map.removeLayer(featureLayer);
        }
       // var serviceURL = this.config.PredictionLayer;

        var heatmapFeatureLayerOptions = {
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["ID"],
          infoTemplate: null
        };
        if (this.heatmapFeatureLayer === null) {
          this.heatmapFeatureLayer = new FeatureLayer(grpObj.layer, heatmapFeatureLayerOptions);
        }
        else {
          this.map.removeLayer(this.heatmapFeatureLayer);
        }

        var newDefExpress = "PATS > 2";   
        this.heatmapFeatureLayer.setDefinitionExpression(newDefExpress);
        this.heatmapFeatureLayer.setVisibility(true);

        //  colors: ["rgba(0, 0, 255, 0)","rgb(0, 0, 255)","rgb(255, 0, 255)", "rgb(255, 0, 0)"],
        var heatmapRenderer = new HeatmapRenderer({

          field: "PATS",
          blurRadius: 20,
          maxPixelIntensity: 100,
          minPixelIntensity: 20
        });

        this.heatmapFeatureLayer.setRenderer(heatmapRenderer);

        this.heatmapFeatureLayer.title = "HeatMap_Layer";
        // this.heatmapFeatureLayer.name = "HeatMap_Layer";

        this.map.addLayer(this.heatmapFeatureLayer);


      },

      ApplyThematic: function (results) {
        this.map.graphics.clear();

        var s1 = results;
        if (results.features.length > 0) {
          var features = results.features;
          var len = features.length;



          var passSymbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              new dojo.Color([247, 0, 171, 0.9]), 2),
            new dojo.Color([247, 0, 171, 0.5]));

          var failSymbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              new Color([123, 123, 234, 0.9]), 2),
            new Color([123, 123, 234, 0.5]));

          for (var i = 0; i < len; i++) {
            var feature = features[i];
            var preStatus = feature.attributes.PREDICTION_STATUS;
            var geom = feature.geometry;
            if (preStatus === 1) {
              var graphic = new Graphic(geom, failSymbol);
              this.map.graphics.add(graphic);
            }
            else {
              var graphic = new Graphic(geom, passSymbol);
              this.map.graphics.add(graphic);
            }


          }

          html.setStyle(this.progressBar.domNode, 'display', 'none');



        }

      },

      GetRiskCategory: function () {
        var selectedRisk = this.cboRiskCategory.value;
        var defExpress = null;


        if (selectedRisk === "High Risk") {
          defExpress = "Risk = 'High Risk'";
        }
        else if (selectedRisk === "Medium Risk") {
          defExpress = "Risk = 'Medium Risk'";
        }
        else if (selectedRisk === "Low Risk") {
          defExpress = "Risk = 'Low Risk'";
        }


        return defExpress;
      },

    
      getLayers: function () {

        var layerIds = this.map.layerIds;

        for (var i = 0; i < layerIds.length; i++) {

          var layer = this.map.getLayer(layerIds[i]);
          if (typeof layer.arcgisProps != "undefined") {
            if (layer.arcgisProps.title == "Poles Analytics") {
              return layer;
            }
          }
          console.log("No Analytics Poles layers");
        }
      },

      GetLayerByName: function (layerName) {

        var layerIds = this.map.graphicsLayerIds;

        for (var i = 0; i < layerIds.length; i++) {

          var layer = this.map.getLayer(layerIds[i]);

          if (layer.name == layerName) {
            return layer;
          }
        }
      },

      ResetModel: function () {
        var featureLayer = this.GetLayerByName("Pole_Predictive_Results")
        if (featureLayer != undefined) {
          featureLayer.setVisibility(false);
        }
        var poleFeatureLayer = this.GetLayerByName("Pole")
        if (poleFeatureLayer != undefined) {
          poleFeatureLayer.setVisibility(true);
        }
      },

      onOpen: function () {
        console.log('onOpen');
      },

      onClose: function () {
        console.log('onClose');
      },

      onMinimize: function () {
        console.log('onMinimize');
      },

      onMaximize: function () {
        console.log('onMaximize');
      },

      onSignIn: function (credential) {
        /* jshint unused:false*/
        console.log('onSignIn');
      },

      onSignOut: function () {
        console.log('onSignOut');
      } 
 
    });
  });