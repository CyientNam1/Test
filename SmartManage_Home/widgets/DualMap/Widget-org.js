define([
  'dojo/_base/declare',
 'jimu/BaseWidget',
 'esri/request',
 "dojo/parser",
 'dijit/_WidgetsInTemplateMixin',
 'dojo/_base/lang',
 "dijit/Toolbar",
 "dijit/ToolbarSeparator",
 "dijit/form/ToggleButton",
 "dijit/form/Button",
 "esri/map",
  "esri/config", 
 "esri/Color", 
 "dojo/dom", 
 "dojo/domReady!",
 "esri/geometry/geometryEngine",
 "esri/tasks/GeometryService", 
 "esri/geometry/webMercatorUtils",
 'esri/geometry/Multipoint',
 'esri/geometry/Point',
 'esri/geometry/Polyline',
 "esri/SpatialReference",
 'dojo/on',
 'dojo/dom-construct',
 'dojo/dom-attr',
 'dojo/string',
 "dijit/Dialog",
 "esri/geometry/mathUtils",
 "dojo/Deferred",
 "dijit/ConfirmDialog",
 'dijit/ProgressBar',
 'dojo/_base/html',
 'jimu/dijit/DrawBox',
 "dijit/form/CheckBox",
 "dijit/layout/BorderContainer",
 "dijit/layout/ContentPane",
 "esri/urlUtils",
 "esri/arcgis/utils"
 

 ],
function(
  declare,
  BaseWidget,
  esriRequest,
  parser,
 _WidgetsInTemplateMixin,
  lang,
  Toolbar,
  ToolbarSeparator,
  ToggleButton,
  Button,
  Map,
  esriConfig, Color, dom,
  ready,
  geometryEngine,
  GeometryService,
  webMercatorUtils,
  Multipoint,
  Point,
  Polyline,
  SpatialReference,
  on,
  domConstruct,
  domAttr,
  string,
  Dialog,
  mathUtils,
  Deferred,
  ConfirmDialog,
  ProgressBar,
  html,
  CheckBox,
  BorderContainer,
  ContentPane,
  urlUtils,
  arcgisUtils

   
  
  ) 
{
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget,_WidgetsInTemplateMixin], {
    

    baseClass: 'jimu-widget-DualMap',
    featLayer : null,
    progressBar: null,
    duMap : null,
    duMapsync : 0,
    mapExtentChangeEvent: null,
    originalMap :null,
    origmapSync:0,
    originalMapExtChangeEvent: null,

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      this.FeaturesList = [];
      this._initProgressBar();
    },

    startup: function() {
      this.inherited(arguments);
     
      console.log('startup');

      this._initiateMap();
      
      this.LinkwithMainMap.on('click',lang.hitch(this,this.SyncExtentsFunc));

    },


    onOpen: function(){
      console.log('onOpen');

      this.map.infoWindow.hide();


      // if there is valid second map then add map extents change event.
       if (this.duMap != null)
       {
            this.mapExtentChangeEvent =  this.duMap.on("extent-change",lang.hitch(this,this.mapExtentChange));
       }
       if (this.map != null)
       {
          this.originalMapExtChangeEvent = this.map.on("extent-change",lang.hitch(this,this.mapExtentChange));
       }

    },

    onClose: function(){
      console.log('onClose');
    
      // remove the event.
      if (this.mapExtentChangeEvent)
      {
        this.mapExtentChangeEvent.remove();
      }

      if (this.originalMapExtChangeEvent)
      {
        this.originalMapExtChangeEvent.remove();
      }

    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },
   
    _initProgressBar: function () {
        this.progressBar = new ProgressBar({
          indeterminate: true
        }, this.progressbar);
        html.setStyle(this.progressBar.domNode, 'display', 'none');
      },

    showDialog: function(title, content){
    var myDialog = new ConfirmDialog({
                        title: title,           
                        content: content,
                        style: "width: 300px"
                    });
                   myDialog.show();
    },

    _initiateMap : function ()
    {
         var deferred = esri.arcgis.utils.createMap(this.config.WebMap, "map2", {
                      mapOptions: {
                      autoResize: true     
             
                      }
                  });

           deferred.then(lang.hitch(this,function (response) {

            this.duMap = response.map; 
            this.mapExtentChangeEvent =  this.duMap.on("extent-change",lang.hitch(this,this.mapExtentChange));
    

          }));
    },
    mapExtentChange: function(evt)
    {
        var chkid = evt.target.id;
        var curextent = evt.extent;
      
        if (chkid === "map2")
        {
            // if (this.map.extent.xmin != curextent.xmin && 
            //   this.map.extent.ymin != curextent.ymin && 
            //   this.map.extent.xmax != curextent.xmax && 
            //   this.map.extent.ymax != curextent.ymax)
            // {
            //   this.map.setExtent(curextent);
            // }
            if (this.origmapSync === 0)
            {
              this.map.setExtent(curextent);
              this.origmapSync = 1;
              this.duMapsync = 1;
            }
            else
            {
               this.origmapSync = 0;
               this.duMapsync = 0;
            }
        }
        else
        {
            if (this.duMapsync === 0)
            {
              this.duMap.setExtent(curextent);
              this.origmapSync = 1;
              this.duMapsync = 1;
            }
            else
            {
               this.origmapSync = 0;
              this.duMapsync = 0;
            }
            // if (this.duMap.extent.xmin != curextent.xmin && 
            //   this.duMap.extent.ymin != curextent.ymin && 
            //   this.duMap.extent.xmax != curextent.xmax && 
            //   this.duMap.extent.ymax != curextent.ymax)
            // {
            //   this.duMap.setExtent(curextent);
            // }
        }
        // if (this.origmapSync === 0)
        // {
        //   this.map.setExtent(curextent);
        //   this.origmapSync = 1;
        // }
        // else
        // {
        //   this.origmapSync = 0;
        //  // this.duMapsync = 1;
        // }
       
    },

    // OriginalmapExtentChange: function(evt)
    // {
    //     var curextent = evt.extent;
    //     if (this.duMapsync === 0)
    //     {
    //        this.duMap.setExtent(curextent);
    //        this.duMapsync = 1;
    //     }
    //     else
    //     {
    //        this.duMapsync = 0;
    //       }
    // },

    SyncExtentsFunc: function(evt)
    {
      if (this.mapExtentChangeEvent)
      {
          this.mapExtentChangeEvent.remove();
          this.mapExtentChangeEvent = null;

          // remove originalMap event
          this.originalMapExtChangeEvent.remove();
          this.originalMapExtChangeEvent = null;
      }
      else
      {
          this.mapExtentChangeEvent =  this.duMap.on("extent-change",lang.hitch(this,this.mapExtentChange));
           this.originalMapExtChangeEvent =  this.map.on("extent-change",lang.hitch(this,this.OriginalmapExtentChange));
      }

    }
  

  


      






  });
});