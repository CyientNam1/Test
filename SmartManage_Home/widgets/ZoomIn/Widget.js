/*global define, dojo, dijit, require, esri, console, setTimeout*/
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/html',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/dom-class',
  'esri/toolbars/navigation'
],
function(declare, BaseWidget, html, on, domConstruct, domClass, Navigation) {
  var clazz = declare([BaseWidget], {
    name: 'ZoomIn',
    label: 'Zoom In',
    baseClass: 'jimu-widget-ZoomIn',
    
    startup: function() {
      this.inherited(arguments);
      var pnode = domConstruct.toDom("<div title='Zoom In' class='jimu-preload-widget-icon'></div>");
      var node = domConstruct.toDom("<img id='zoomInHover' src='widgets/ZoomIn/images/icon.png' style='width: 30px; height: 30px; margin-top: 5px;'></img>");
      html.place(node, pnode);
      html.place(pnode, this.domNode);
      var navToolbar = new Navigation(this.map);
      on(pnode, 'click', function(evt){
        if (domClass.contains(pnode, 'jimu-state-selected')){
          domClass.remove(pnode, "jimu-state-selected");
          navToolbar.deactivate();
          dijit.byId(zoomInHover).src = 'widgets/ZoomIn/images/icon.png';
        }else{
          domClass.add(pnode, "jimu-state-selected");
          navToolbar.activate(Navigation.ZOOM_IN);
          dijit.byId(zoomInHover).src = 'widgets/ZoomIn/images/icon-hover.png';
        }
        console.info('button clicked');
      });
    }
  });

  clazz.hasStyle = false;
  clazz.hasUIFile = false;
  clazz.hasLocale = false;
  clazz.hasConfig = false;
  clazz.inPanel = false;
  return clazz;
});