define(['dojo/_base/declare', 'jimu/BaseWidget'],
  function (declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // DemoWidget code goes here

      //please note that this property is be set by the framework when widget is loaded.
      //templateString: template,

      baseClass: 'jimu-widget-logout',

      postCreate: function () {
        this.inherited(arguments);
        console.log('postCreate');
      },

      startup: function () {
        this.inherited(arguments);
        console.log('startup');
      
        window.location.href = "https://www.cyient-fiops.com/XCEL_PROD/Smartmanage/";
       

      },

      onOpen: function () {
        console.log('onOpen');
        document.getElementById(this.id + "_panel").style.width = "0px";
        document.getElementById(this.id + "_panel").style.height = "0px";
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
      },

      showVertexCount: function (count) {
      }
    });
  });