define(['dojo/_base/declare', 'dojo/_base/array', "dojo/html", "dojo/dom", 'jimu/BaseWidget', "dijit/_WidgetsInTemplateMixin", "dojo/ready",
        "dojo/aspect", "dijit/registry", "dijit/form/Button", "dojo/on", "dojo/dom", "dojo/request", "dojo/domReady!",
        'esri/tasks/IdentifyParameters', 'esri/tasks/GeometryService', 'esri/geometry/Polyline',
        'esri/geometry/webMercatorUtils', 'esri/geometry/geodesicUtils', 'esri/units', 'dojo/_base/lang', "dijit/_AttachMixin", 'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore', 'dijit/form/TextBox'
    ],
    function(declare, array, html, dom, BaseWidget, _WidgetsInTemplateMixin, ready,
        aspect, registry, Button, on, dom, request, IdentifyParameters, GeometryService,
        Polyline, webMercatorUtils, geodesicUtils, Units, lang, _AttachMixin, DataGrid, ItemFileWriteStore, TextBox) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget, _WidgetsInTemplateMixin], {

            // Custom widget code goes here

            baseClass: 'jimu-widget-PhotoViewer',
            btn1: null,
            photosarray: null,
            photoindex: null,

            postCreate: function() {
                this.inherited(arguments);
            },

            startup: function() {
                var grid = this;
                dojo.byId("Checkbox2").innerHTML = "0 of 0";
                dojo.connect(nextBtn, "onclick", function(evt) {
                    if (photosarray.length > 1) {
                        photoindex = photoindex + 1;
                        if (photoindex > photosarray.length - 1) {
                            photoindex = 0;
                        }
                        dojo.byId('photochange').src = photosarray[photoindex];
                        dojo.byId('imageUrl').href = photosarray[photoindex];
                        dojo.byId("Checkbox2").innerHTML = photoindex + 1 + " of " + photosarray.length;


                    }

                })

                dojo.connect(dijit.byId("prevBtn"), "onClick", function(evt) {
                    if (photosarray.length > 1) {
                        photoindex = photoindex - 1;
                        if (photoindex == -1) {
                            photoindex = photosarray.length - 1;
                        }
                        dojo.byId('photochange').src = photosarray[photoindex];
                        dojo.byId('imageUrl').href = photosarray[photoindex];
                        dojo.byId("Checkbox2").innerHTML = photoindex + 1 + " of " + photosarray.length;


                    }

                });
                dojo.connect(dijit.byId("searchButton"), "onClick", function(evt) {
                    var box0 = registry.byId("value0Box");
                    var featureIDSerch = box0.get("value");
                    dojo.query(".imageheader").style("visibility", "visible");
                    html.set(dom.byId("content"), featureIDSerch);

                    dojo.byId('photochange').src = "";
                    photoindex = 0;
                    photosarray = [];
                    request.get("https://www.cyient-fiops.com/GetImageService/GetFileName/get/" + featureIDSerch).then(
                        function(response) {
                            // Display the text file content 
                            var abcd = JSON.parse(response);
                            photosarray = abcd;

                            console.log(response);
                            if (photoindex == 0) {
                                dojo.byId("photochange").src = photosarray[0];
                                dojo.byId('imageUrl').href = photosarray[photoindex];
                                dojo.byId("Checkbox2").innerHTML = "1 " + " of " + photosarray.length;

                            }
                            if (photosarray.length == 0) {
                                dojo.byId("photochange").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                                dojo.byId('imageUrl').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                                dojo.byId("Checkbox2").innerHTML = "0 " + " of " + " 0";

                            }
                        },

                        function(error) {
                            // Display the error returned
                            console.log(error);
                            dojo.byId("photochange").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId('imageUrl').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId("Checkbox2").innerHTML = "0 " + " of " + " 0";
                        }
                    );

                });
                this.on("keydown", function(event) {
                    var keyNum = event.keyCode !== undefined ? event.keyCode : event.which;
                    if (keyNum === 13) {
                        grid._onsearchBtnClicked(event);
                    }
                });
                // dojo.connect(dijit.byId("searchtextbox"), "keydown", function(evt) {
                //     var keyNum = evt.keyCode !== undefined ? evt.keyCode : evt.which;
                //     if (keyNum === 13) {
                //         this._onsearchBtnClicked();
                //     }
                // });

            },
            _onsearchBtnClicked: function(evt) {
                html.set(dom.byId("content"), this.searchtextbox.value);
                this.getFeturePhotoDetails(this.searchtextbox.value);
            },
            getFeturePhotoDetails: function(featureID) {
                dojo.byId('photochange').src = "";

                photoindex = 0;
                photosarray = [];
                request.get("https://www.cyient-fiops.com/GetImageService/GetFileName/get/" + featureID).then(
                    function(response) {

                        var abcd = JSON.parse(response);
                        photosarray = abcd;

                        console.log(response);
                        if (photoindex == 0) {
                            dojo.query(".imageheader").style("visibility", "visible");
                            dojo.byId("photochange").src = photosarray[0];
                            dojo.byId('imageUrl').href = photosarray[0];
                            dojo.byId("Checkbox2").innerHTML = "1 " + " of " + photosarray.length;

                        }
                        if (photosarray.length == 0) {
                            dojo.query(".imageheader").style("visibility", "visible");
                            dojo.byId("photochange").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId('imageUrl').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId("Checkbox2").innerHTML = "0 " + " of " + " 0";

                        }
                    },
                    function(error) {
                        dojo.byId("photochange").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                        dojo.byId('imageUrl').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                        console.log(error);
                    }
                );
                if (photosarray.length > 0) {
                    if (photoindex == 0) {
                        dojo.byId("photochange").src = photosarray[0];
                        dojo.byId('imageUrl').href = photosarray[0];
                        dojo.byId("Checkbox2").innerHTML = "1 " + " of " + photosarray.length;

                    }

                }
            },

            onOpen: function() {

                photoindex = 0;
                photosarray = [];

                var fid = sessionStorage.getItem('selectedFID');
                console.log(fid);
                var featureSelected = fid ? fid : this.nls.selectedFID;
                var box0 = registry.byId("value0Box");
                html.set(dom.byId("content"), featureSelected);

                if (featureSelected == "null") {
                    dojo.query(".imageheader").style("visibility", "hidden");
                } else {
                    dojo.query(".imageheader").style("visibility", "visible");
                    this.getFeturePhotoDetails(featureSelected);
                }
                if (photosarray.length > 0) {
                    if (photoindex == 0) {
                        dojo.byId("photochange").src = photosarray[0];
                        dojo.byId('imageUrl').href = photosarray[0];
                        dojo.byId("Checkbox2").innerHTML = "1 " + " of " + photosarray.length;

                    }

                }

            }
        });

    });