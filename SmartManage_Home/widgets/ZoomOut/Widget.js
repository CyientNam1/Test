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
    name: 'ZoomOut',
    label: 'Zoom Out',
    baseClass: 'jimu-widget-ZoomOut',
    
    startup: function() {
      this.inherited(arguments);
      var pnode = domConstruct.toDom("<div title='Zoom Out' class='jimu-preload-widget-icon'></div>");
      var node = domConstruct.toDom("<img id='zoomOutHover' src='widgets/ZoomOut/images/icon.png' style='width: 30px; height: 30px; margin-top: 10px;'></img>");
      html.place(node, pnode);
      html.place(pnode, this.domNode);
      var navToolbar = new Navigation(this.map);
      on(pnode, 'click', function(evt){
        if (domClass.contains(pnode, 'jimu-state-selected')){
          domClass.remove(pnode, "jimu-state-selected");
          navToolbar.deactivate();
          dijit.byId(zoomOutHover).src = 'widgets/ZoomOut/images/icon.png';
        }else{
          domClass.add(pnode, "jimu-state-selected");
          navToolbar.activate(Navigation.ZOOM_OUT);
          dijit.byId(zoomOutHover).src = 'widgets/ZoomOut/images/icon-hover.png';
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