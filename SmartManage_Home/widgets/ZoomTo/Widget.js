/*global define, dojo, dijit, require, esri, console, setTimeout*/
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/html',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/dom-class', 'dojo/_base/array', 'dojo/_base/lang',
  "esri/geometry/scaleUtils"
],
  function (declare, BaseWidget, html, on, domConstruct, domClass, array, lang, scaleUtils) {
    var clazz = declare([BaseWidget], {
      name: 'RefreshMap',
      label: 'Refresh',
      baseClass: 'jimu-widget-RefreshMap',

      startup: function () {
        this.inherited(arguments);
        var pnode = domConstruct.toDom("<div title='Zoom To'></div>");
        var node = domConstruct.toDom("<div style='float: left;height: 19px;line-height: 15px;font-size: 11px !important; color: #fff !important; background-color: rgba(0,0,0,0.5); overflow: hidden;'>&nbsp;Zoom Scale <input disabled='disabled' type='text' style='width: 12px;color:rgba(0,0,0,1);' value='1'/> :&nbsp;</div><input id='zoomScale' type='text' style='width: 75px;color:rgba(0,0,0,1);'/>");
        html.place(node, pnode);
        html.place(pnode, this.domNode);
        on(this.map, 'extent-change', lang.hitch(this, function (evt) {
          var scale = scaleUtils.getScale(this.map);
          dijit.byId(zoomScale).value = Math.round(scale);
        }));
        on(dijit.byId(zoomScale), 'keypress', lang.hitch(this, function (e) {
          if (e.keyCode == 13) {
            var extent = scaleUtils.getExtentForScale(this.map, dijit.byId(zoomScale).value);
            this.map.setExtent(extent);
          }
        }));

        var scale = scaleUtils.getScale(this.map);
        dijit.byId(zoomScale).value = Math.round(scale);
      }
    });

    clazz.hasStyle = false;
    clazz.hasUIFile = false;
    clazz.hasLocale = false;
    clazz.hasConfig = false;
    clazz.inPanel = false;
    return clazz;
  });