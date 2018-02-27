define(['dojo/_base/declare',
        'dijit/_WidgetsInTemplateMixin',
        'jimu/BaseWidget',
        'jimu/dijit/TabContainer',
        'esri/tasks/IdentifyTask',
        'esri/tasks/IdentifyParameters',
        'esri/tasks/IdentifyResult',
        'jimu/dijit/Message',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/layers/CodedValueDomain',
        'esri/layers/Domain',
        'esri/layers/GraphicsLayer',
        'esri/layers/FeatureLayer',
        'esri/layers/FeatureType',
        'esri/layers/Field',
        'esri/layers/RangeDomain',
        'esri/tasks/GeometryService',
        'esri/config',
        'esri/graphic',
        'esri/graphicsUtils',
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/PictureMarkerSymbol',
        'esri/geometry/Polyline',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/geometry/Polygon',
        'esri/geometry/Multipoint',
        'esri/geometry/Extent',
        'esri/geometry/Geometry',
        'esri/symbols/SimpleFillSymbol',
        'esri/renderers/SimpleRenderer',
        'esri/toolbars/draw',
        'esri/dijit/PopupTemplate',
        'esri/request',
        'esri/TimeExtent',
        'dijit/ProgressBar',
        'dojo/_base/lang',
        'dojo/on',
        'dojo/aspect',
        'dojo/_base/array',
        'dojo/date',
        'dojo/date/locale',
        'jimu/dijit/DrawBox',
        'jimu/utils',
        'jimu/dijit/LoadingShelter',
        'dojo/io-query',
        'esri/SpatialReference',
        'esri/tasks/ProjectParameters',
        'esri/geometry/webMercatorUtils',
        'jimu/WidgetManager',
        'jimu/PanelManager',
        'jimu/LayerInfos/LayerInfos',
        'dojo/Deferred',
        'dojo/promise/all',
        'dojo/request/xhr',
        'dojo/_base/window',
        'dojo/store/Memory',
        'dijit/tree/ObjectStoreModel',
        'dijit/Tree',
        "dijit/Dialog",
        'dojo/store/Observable',
        'dojo/data/ObjectStore',
        'dojo/dom-construct',
        'dojo/json',
        "dojo/request",
        "dojo/html",
        'dijit/form/Form',
        'dojox/form/CheckedMultiSelect',
        'dijit/form/CheckBox',
        'dojo/dom',
        'dojo/domReady!',
        'dijit/form/Select'
    ],
    function(declare, _WidgetsInTemplateMixin, BaseWidget, TabContainer, IdentifyTask, IdentifyParameters,
        IdentifyResult, Message, Query, QueryTask, CodedValueDomain, Domain, GraphicsLayer, FeatureLayer, FeatureType, Field,
        RangeDomain, GeometryService, esriConfig, Graphic, graphicsUtils, Point, SimpleMarkerSymbol,
        PictureMarkerSymbol, Polyline, SimpleLineSymbol, Color, Polygon, Multipoint, Extent, Geometry, SimpleFillSymbol,
        SimpleRenderer, Draw, PopupTemplate, esriRequest, TimeExtent, ProgressBar, lang, on, aspect, array,
        date, locale, DrawBox, utils, LoadingShelter, ioquery, SpatialReference, ProjectParameters, webMercatorUtils,
        WidgetManager, PanelManager, LayerInfos, Deferred, all, Xhr, win, Memory, ObjectStoreModel, Tree, Dialog, Observable,
        DataStore, construct, JSON, request, html, Form,
        CheckedMultiSelect,
        checkBox, dom) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget, _WidgetsInTemplateMixin], {

            // Custom widget code goes here

            baseClass: 'jimu-widget-PhotoViewerGridWise',
            btn1: null,
            photosarray: null,
            photoindex: null,
            Grids: null,
            featureIDIndex: null,
            num: null,
            postCreate: function() {
                this.inherited(arguments);
            },

            startup: function() {
                this._getGrids();
                this._getLayersList();

                var grid = this;
                dojo.byId("Checkbox4").innerHTML = "0 of 0";
                dojo.connect(nextBtn1, "onclick", function(evt) {
                    if (photosarray.length > 1) {
                        photoindex = photoindex + 1;
                        if (photoindex > photosarray.length - 1) {
                            num++;
                            if (featureIDIndex > num) {
                                photosarray = [];
                                grid.getFeturePhotoDetails(Grids[num]);
                            }
                            photoindex = 0;
                        }
                        dojo.byId('photochanger').src = photosarray[photoindex];
                        dojo.byId('imageUrls').href = photosarray[photoindex];
                        dojo.byId("Checkbox4").innerHTML = photoindex + 1 + " of " + photosarray.length;

                    } else {
                        num++;
                        if (featureIDIndex >= num) {
                            photosarray = [];
                            photoindex = 0;
                            grid.getFeturePhotoDetails(Grids[num]);
                        }

                    }

                })

                dojo.connect(dijit.byId("prevBtn1"), "onClick", function(evt) {
                    if (photosarray.length > 1) {
                        photoindex = photoindex - 1;
                        if (photoindex == -1) {
                            num--;
                            if (featureIDIndex >= num) {
                                photosarray = [];
                                grid.getFeturePhotoDetails(Grids[num]);
                            }
                            photoindex = photosarray.length - 1;
                        }
                        dojo.byId('photochanger').src = photosarray[photoindex];
                        dojo.byId('imageUrls').href = photosarray[photoindex];
                        dojo.byId("Checkbox4").innerHTML = photoindex + 1 + " of " + photosarray.length;


                    } else {
                        num--;
                        if (featureIDIndex > num) {
                            photosarray = [];
                            photoindex = 0;
                            grid.getFeturePhotoDetails(Grids[num]);
                        }

                    }

                });

                this.on("keydown", function(event) {
                    var keyNum = event.keyCode !== undefined ? event.keyCode : event.which;
                    if (keyNum === 13) {
                        grid._onsearchBtnClicked(event);
                    }
                });

                dojo.connect(dijit.byId("searching"), "onClick", function(evt) {
                    var selectedLayerIds = sessionStorage.getItem('selectedLayer');
                    var selectedGirdIds = sessionStorage.getItem('selectedGrid');
                    if (selectedGirdIds.length > 0) {
                        var laystringwithoutspace = selectedLayerIds.replace(/ /g, '');
                        var gridstringwithoutspace = selectedGirdIds.replace(/ /g, '');
                        var querystring = "";
                        var layquerystring = "FCLASS";
                        var gridarray = gridstringwithoutspace.split(",");
                        var gridstring = "JOBUNIT";
                        if (selectedLayerIds.length > 0) {
                            var layarray = laystringwithoutspace.split(",");
                            if (layarray.length == 1) {
                                layquerystring += "=" + "'" + layarray[0] + "'";
                            } else {
                                layquerystring += "  IN ("
                                for (var i = 0; i < layarray.length - 1; i++) {
                                    layquerystring += "'" + layarray[i] + "'" + ',';
                                }

                                layquerystring += "'" + layarray[layarray.length - 1] + "'" + ")";
                            }
                        } else {
                            layquerystring += " IN ('DISTRIBUTED_GENERATION', 'DISTRIBUTED_STORAGE', 'EDIST_ANCHOR_GUY', 'EDIST_AREA_LIGHT', 'EDIST_BRACE', 'EDIST_BUSBAR', 'EDIST_CAPACITOR_RACK', 'EDIST_COGENERATION', 'EDIST_CUSTOMER_POINTER', 'EDIST_ELBOW', 'EDIST_FAULT_INDICATOR', 'EDIST_H_FIXTURE', 'EDIST_NONMETERED_FACILITY', 'EDIST_OH_ATO', 'EDIST_OH_FUSE', 'EDIST_OH_SECONDARY', 'EDIST_OH_SERVICE', 'EDIST_OH_SWITCH', 'EDIST_OH_TRANSFORMER_BANK', 'EDIST_PAD', 'EDIST_PEDESTAL', 'EDIST_POLE', 'EDIST_PRIMARY_METER', 'EDIST_PRIMARY_OPEN_POINT', 'EDIST_PRIMARY_SPLICE', 'EDIST_PRIMARY_STRUCTURE_NODE', 'EDIST_RECLOSER_BANK', 'EDIST_REGULATOR_BANK', 'EDIST_RISER', 'EDIST_SECONDARY_OPEN_POINT', 'EDIST_SECONDARY_STRUCTURE_NODE', 'EDIST_SECONDARY_TRANSFORMER', 'EDIST_SECTIONALIZER_BANK', 'EDIST_SPAN_GUY', 'EDIST_SPLICE_BOX', 'EDIST_STEP_TRANSFORMER_BANK', 'EDIST_STREET_LIGHT', 'EDIST_SWITCHING_FACILITY', 'EDIST_UG_ATO', 'EDIST_UG_FUSE', 'EDIST_UG_PRIMARY', 'EDIST_UG_SECONDARY', 'EDIST_UG_SERVICE', 'EDIST_UG_SWITCH', 'EDIST_UG_TRANSFORMER', 'ESUB_SUBSTATION', 'ETRAN_POLE')";
                        }


                        if (gridarray.length == 1) {
                            gridstring += "=" + "'" + gridarray[0] + "'";
                        } else {
                            gridstring += "  IN ("
                            for (var i = 0; i < gridarray.length - 1; i++) {
                                gridstring += "'" + gridarray[i] + "'" + ',';
                            }

                            gridstring += "'" + gridarray[gridarray.length - 1] + "'" + ")";
                        }

                        querystring = gridstring + " " + "AND" + " " + layquerystring;
                        grid._getResult(querystring);
                    } else {
                        if (selectedGirdIds.length === 0) {
                            grid.showDialog("Error ", "Please Select Grid");
                        }
                    }

                });
            },

            getFeturePhotoDetails: function(featureID) {
                if (featureID.fclass) {
                    var labelTitle = featureID.value + '  ' + '(' + featureID.fclass + ')';
                } else {
                    var labelTitle = featureID.value;
                }

                html.set(dom.byId("contenter"), labelTitle);
                dojo.byId('photochanger').src = "";
                photosarray = [];
                var grid = this;
                request.get("https://www.cyient-fiops.com/GetImageService/GetFileName/get/" + featureID.value).then(
                    function(response) {

                        var abcd = JSON.parse(response);
                        photosarray = abcd;

                        console.log(response);
                        if (photoindex == 0) {
                            dojo.query(".imageheader1").style("visibility", "visible");
                            dojo.byId("photochanger").src = photosarray[0];
                            dojo.byId('imageUrls').href = photosarray[0];
                            dojo.byId("Checkbox4").innerHTML = "1 " + " of " + photosarray.length;

                        }
                        if (photoindex == -1) {
                            photoindex = photosarray.length - 1;
                            dojo.query(".imageheader1").style("visibility", "visible");
                            dojo.byId("photochanger").src = photosarray[photoindex];
                            dojo.byId('imageUrls').href = photosarray[photoindex];
                            dojo.byId("Checkbox4").innerHTML = photosarray.length + " of " + photosarray.length;

                        }
                        if (photosarray.length == 0) {
                            dojo.query(".imageheader1").style("visibility", "visible");
                            dojo.byId("photochanger").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId('imageUrls').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                            dojo.byId("Checkbox4").innerHTML = "0 " + " of " + " 0";

                        }
                        if (featureID.geometry) {
                            if (featureID.geometry.type == "point") {
                                grid.map.centerAndZoom(featureID.geometry, 22);
                            } else {
                                grid.map.setExtent(featureID.geometry.expand(1.1));
                            }
                        }

                    },
                    function(error) {
                        dojo.byId("photochanger").src = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                        dojo.byId('imageUrls').href = "https://www.cyient-fiops.com/Images/imagenot.jpg";
                        console.log(error);
                    }
                );
                if (photosarray.length > 0) {
                    if (photoindex == 0) {
                        dojo.byId("photochanger").src = photosarray[0];
                        dojo.byId('imageUrls').href = photosarray[0];
                        dojo.byId("Checkbox4").innerHTML = "1 " + " of " + photosarray.length;
                    }
                }

            },
            _getLayersList: function() {
                var LayerListarray = [];
                var LayerList = ["DISTRIBUTED_GENERATION", "DISTRIBUTED_STORAGE", "EDIST_ANCHOR_GUY", "EDIST_AREA_LIGHT", "EDIST_BRACE", "EDIST_BUSBAR", "EDIST_CAPACITOR_RACK", "EDIST_CIRCUIT_BREAKER", "EDIST_COGENERATION", "EDIST_CUSTOMER_POINTER", "EDIST_ELBOW", "EDIST_FAULT_INDICATOR", "EDIST_H_FIXTURE", "EDIST_NONMETERED_FACILITY", "EDIST_OH_ATO", "EDIST_OH_FUSE", "EDIST_OH_PRIMARY", "EDIST_OH_SECONDARY", "EDIST_OH_SERVICE", "EDIST_OH_SWITCH", "EDIST_OH_TRANSFORMER_BANK", "EDIST_PAD", "EDIST_PEDESTAL", "EDIST_POLE", "EDIST_PRIMARY_METER", "EDIST_PRIMARY_OPEN_POINT", "EDIST_PRIMARY_SPLICE", "EDIST_PRIMARY_STRUCTURE_NODE", "EDIST_RECLOSER_BANK", "EDIST_REGULATOR_BANK", "EDIST_RISER", "EDIST_SECONDARY_OPEN_POINT", "EDIST_SECONDARY_STRUCTURE_NODE", "EDIST_SECONDARY_TRANSFORMER", "EDIST_SECTIONALIZER_BANK", "EDIST_SPAN_GUY", "EDIST_SPLICE_BOX", "EDIST_STEP_TRANSFORMER_BANK", "EDIST_STREET_LIGHT", "EDIST_SWITCHING_FACILITY", "EDIST_UG_ATO", "EDIST_UG_FUSE", "EDIST_UG_PRIMARY", "EDIST_UG_SECONDARY", "EDIST_UG_SERVICE", "EDIST_UG_SWITCH", "EDIST_UG_TRANSFORMER", "ESUB_SUBSTATION", "ETRAN_POLE"];


                for (var m = 0; m < LayerList.length; m++) {

                    LayerListarray.push({ value: LayerList[m], label: LayerList[m] });
                }

                if (LayerListarray.length > 0) {
                    var memoryStore = new Memory({
                        idProperty: "value",
                        data: LayerListarray
                    });
                    var dataStore = new DataStore({
                        objectStore: memoryStore,
                        labelProperty: "label"
                    });
                    var MyCheckedMultiSelect = declare(CheckedMultiSelect, {

                        startup: function() {
                            this.inherited(arguments);
                            setTimeout(lang.hitch(this, function() {
                                this.dropDownButton.set("label", this.label);
                            }));
                        },

                        _updateSelection: function() {
                            this.inherited(arguments);
                            if (this.dropDown && this.dropDownButton) {
                                var label = "";
                                array.forEach(this.options, function(option) {
                                    if (option.selected) {
                                        label += (label.length ? ", " : "") + option.label;
                                    }
                                });
                                this.selectedLayer = label;
                                sessionStorage.setItem('selectedLayer', this.selectedLayer);
                                this.dropDownButton.set("label", label.length ? label : this.label);
                            }
                        }

                    });

                    var checkedMultiSelect = new MyCheckedMultiSelect({
                        dropDown: true,
                        multiple: true,
                        label: "Select All",
                        store: dataStore
                    }, "placeholderForLayerList");

                    checkedMultiSelect.startup();

                }


            },
            showDialog: function(title, content) {
                var myDialog = new Dialog({
                    title: title,
                    content: content,
                    style: "width: 200px"
                });
                myDialog.show();
            },
            _getGrids: function() {
                var Grids = [];

                queryTasks = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/MapServer/0");
                var querys = new esri.tasks.Query();
                querys.returnGeometry = false;
                querys.outFields = ["NAME"];
                querys.where = "1=1";

                queryTasks.execute(querys, function(resultfeat) {

                    var features = resultfeat.features;
                    for (var m = 0; m < features.length; m++) {
                        var gridsId = resultfeat.features[m].attributes.NAME;
                        Grids.push({ value: gridsId, label: gridsId });
                    }

                    if (Grids.length > 0) {
                        var memoryStore = new Memory({
                            idProperty: "value",
                            data: Grids
                        });
                        var dataStore = new DataStore({
                            objectStore: memoryStore,
                            labelProperty: "label"
                        });
                        var MyCheckedMultiSelect = declare(CheckedMultiSelect, {

                            startup: function() {
                                this.inherited(arguments);
                                setTimeout(lang.hitch(this, function() {
                                    this.dropDownButton.set("label", this.label);
                                }));
                            },

                            _updateSelection: function() {
                                this.inherited(arguments);
                                if (this.dropDown && this.dropDownButton) {
                                    var label = "";
                                    array.forEach(this.options, function(option) {
                                        if (option.selected) {
                                            label += (label.length ? ", " : "") + option.label;
                                        }
                                    });
                                    this.selectedGrid = label;
                                    sessionStorage.setItem('selectedGrid', this.selectedGrid);
                                    this.dropDownButton.set("label", label.length ? label : this.label);
                                }
                            }


                        });

                        var checkedMultiSelect = new MyCheckedMultiSelect({
                            dropDown: true,
                            multiple: true,
                            label: "Select A Grid...",
                            store: dataStore
                        }, "placeholderForGridPhoto");

                        checkedMultiSelect.startup();
                        dojo.query(".dijitArrowButtonInner").style("visibility", "hidden");
                    }

                });
            },
            _getResult: function(querystring) {
                var sa = this;
                Grids = [];

                queryTasks = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/Temp/Grid_Wise_Photo/MapServer/0");
                var querys = new esri.tasks.Query();
                querys.returnGeometry = true;
                querys.outFields = ['*'];
                querys.outSpatialReference = new SpatialReference(102100);
                querys.where = querystring;

                queryTasks.execute(querys, function(resultfeat) {
                    var features = resultfeat.features;
                    for (var m = 0; m < features.length; m++) {
                        var gridsId = resultfeat.features[m].attributes.ID;
                        var geometry = resultfeat.features[m].geometry;
                        var fclass = resultfeat.features[m].attributes.FCLASS;
                        Grids.push({ value: gridsId, geometry: geometry, fclass: fclass });
                    }
                    if (Grids.length > 0) {
                        featureIDIndex = Grids.length;
                        num = 0;
                        photoindex = 0;
                        sa.getFeturePhotoDetails(Grids[0]);
                        dojo.query(".imageheader1").style("visibility", "visible");

                    } else {
                        dojo.query(".imageheader1").style("visibility", "hidden");
                        sa.showDialog("Error ", "No result found");
                    }
                });


            },
            _onsearchBtnClicked: function(evt) {
                var sa = this;
                var Grids = [];
                var querystring = "ID=" + this.searchtextbox.value;
                queryTasks = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/Temp/Grid_Wise_Photo/MapServer/0");
                var querys = new esri.tasks.Query();
                querys.returnGeometry = true;
                querys.outFields = ['*'];
                querys.outSpatialReference = new SpatialReference(102100);
                querys.where = querystring;

                queryTasks.execute(querys, function(resultfeat) {
                    var features = resultfeat.features;
                    for (var m = 0; m < features.length; m++) {
                        var gridsId = resultfeat.features[m].attributes.ID;
                        var geometry = resultfeat.features[m].geometry;
                        var fclass = resultfeat.features[m].attributes.FCLASS;
                        Grids.push({ value: gridsId, geometry: geometry, fclass: fclass });
                    }
                    if (Grids.length > 0) {
                        featureIDIndex = -1000;
                        num = 0;
                        photoindex = 0;
                        sa.getFeturePhotoDetails(Grids[0]);
                        dojo.query(".imageheader1").style("visibility", "visible");

                    } else {
                        dojo.query(".imageheader1").style("visibility", "hidden");
                        sa.showDialog("Error ", "No result found");
                    }

                });
                // this.getFeturePhotoDetails(featArray[0]);
            },
            onOpen: function() {
                photoindex = 0;
                photosarray = [];

                var fid = sessionStorage.getItem('selectedFID');
                var fidType = sessionStorage.getItem('selectedFIDType');
                console.log(fid);
                var featureSelected = fid ? fid : this.nls.selectedFID;
                var selectedFeatureIdType = fidType ? fidType : "";
                html.set(dom.byId("contenter"), featureSelected);
                var featArray = [{ value: featureSelected, geometry: "", fclass: selectedFeatureIdType }];
                if (featureSelected == "null") {
                    dojo.query(".imageheader1").style("visibility", "hidden");
                } else {
                    dojo.query(".imageheader1").style("visibility", "visible");
                    this.getFeturePhotoDetails(featArray[0]);
                }
                if (photosarray.length > 0) {
                    if (photoindex == 0) {
                        dojo.byId("photochanger").src = photosarray[0];
                        dojo.byId('imageUrls').href = photosarray[0];
                        dojo.byId("Checkbox4").innerHTML = "1 " + " of " + photosarray.length;

                    }

                }
                dojo.query(".dijitArrowButtonInner").style("visibility", "hidden");
                dojo.query(".imageheader1").style("visibility", "hidden");
            }
        });

    });