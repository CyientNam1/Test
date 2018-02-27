define(["dojo/_base/declare",
"jimu/BaseWidget",
"dijit/form/RadioButton",
"dojo/_base/lang",
"dojo/on",
"esri/layers/FeatureLayer",
"esri/dijit/FeatureTable",
"esri/toolbars/draw",
"esri/symbols/SimpleFillSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/tasks/query",	
"esri/Color",
"workflowmanager/WMJobTask",
"workflowmanager/supportclasses/JobCreationParameters",
"esri/geometry/webMercatorUtils",
"esri/geometry/geometryEngine",
"dijit/_WidgetsInTemplateMixin",
"esri/tasks/IdentifyParameters",
"esri/tasks/IdentifyTask",
"esri/request",
"dojo/i18n!esri/nls/jsapi",
 "dojo/request",
"esri/tasks/QueryTask",
"dijit/Tooltip",
'jimu/dijit/LoadingIndicator',
"dojo/dom-style",
"dojo/domReady!",
'dojo/_base/array'
],
function (declare, BaseWidget, RadioButton, lang, on, FeatureLayer,FeatureTable, Draw,
	SimpleFillSymbol, SimpleLineSymbol, Query, Color, WMJobTask, JobCreationParameters,
	webMercatorUtils, geometryEngine, _WidgetsInTemplateMixin, IdentifyParameters,
	IdentifyTask, esriRequest, esriBundle, dojoRequest, QueryTask, Tooltip, LoadingIndicator, domReady,array) {

	return declare([BaseWidget, _WidgetsInTemplateMixin], {

		baseClass: 'jimu-widget-JobAllocation',
		polygonLayer: null,
		selectionToolbar: null,
		unSelectionToolbar: null,
		selectQuery: null,
		selectListener: null,
		clearListener: null,
		selectionType: null,
		drawType: null,
		polyPoint: null,
		boeUserList:null,
		caUserList:null,
		ceUserList:null,
		selectedGroup:null,
		gridType:null,
		createDependency: false,
		feederNamesList:null,
		job:null,
		username:null,
		jobtypeid:null,
		jobname:null,
		assignedto:null,
		createflag:null,
		jobcreateflag:null,
		jobIDs:null,
		postCreate: function () {
			this.inherited(arguments);
			console.log('postCreate');
		},

		drawEnd: function (geometry) {

			this.selectQuery.geometry = geometry;
			this.polygonLayer.selectFeatures(this.selectQuery, this.selectionType);

		},



		activateDraw: function (evt) {
			esriBundle.toolbars.draw.addPoint = this.config.selectPolyTooltip;
			this.selectionType = FeatureLayer.SELECTION_ADD;
			this.startDraw();

		},

		activateUnSelectDraw: function (evt) {
			esriBundle.toolbars.draw.addPoint = this.config.unSelectPolyTooltip;
			this.selectionType = FeatureLayer.SELECTION_SUBTRACT;
			this.startDraw();

		},

		startDraw: function () {

			this.selectQuery = new Query();
			this.selectionToolbar.activate(this.drawType);
			this.drawStarted = true;

		},

		clearSelection: function (evt) {

			this.polygonLayer.clearSelection();
			this.selectionToolbar.deactivate();
			this.jobIDDiv.innerHTML = "";
			this.WFMJobName.set('value', "");

			this.linkWorkflowCheckbox.set('checked', false);
			var options = this.linkToWorkflow.getOptions();
			this.linkToWorkflow.removeOption(options);


			var option = { value: "", label: "", selected: true };

			this.linkToWorkflow.addOption(option);

		},

		startup: function () {
			this.ceUserList = [];
			this.boeUserList =[];
			this.caUserList = [];
			this.feederNamesList = [];
                        this.gridList = [];
			var layers = this.map.itemInfo.itemData.operationalLayers;
			this.linkWorkflowCheckbox.set('checked', true);
			

			for (var i = 0; i < layers.length; i++) {

				if (layers[i].title == this.config.polygonLayer) {
					this.polygonLayer = layers[i].layerObject;
				}
			}


			this.selectionToolbar = new Draw(this.map);
			this.selectQuery = new Query();
			this.drawType = Draw.EXTENT;
			on(this.selectionToolbar, "DrawEnd", lang.hitch(this, this.drawEnd));
			on(this.createJob, "click", lang.hitch(this, this.submitJob));
			on(this.linkWorkflowCheckbox, "change", lang.hitch(this, this.linkWorkflow));

			on(this.assignToGroup, "change", lang.hitch(this, this.selectGroup));
			on(this.assignToJobType, "change", lang.hitch(this, this.gridTypeChange));
			var workGridUrl= "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/FeatureServer/0"
		   // var workGridUrl = this.config.workGridUrl;
				 
			var fieldsSelectionSymbol =
				new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
						new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]));

		   this.polygonLayer.setSelectionSymbol(fieldsSelectionSymbol);
		   this.selectedGroup = "CYIENT";
		   var role = sessionStorage.getItem("loginuserrole");
		   dojo.style(dijit.byId(link), { 'display': 'none' }); 
		   if(role =="CA")
		   {
			   this.selectedGroup = "XCEL";
			  this.assignToGroup.addOption({ value: "XCEL", label: "XCEL", selected: false });
			   dojo.style(dijit.byId(GridType), { 'display': 'none' }); 
			   //dojo.style(dijit.byId(linkFeeder), { 'display': 'none' });
			   dojo.byId("createJob").innerHTML = "Assign Feeder";
		   }
		   else if(role =="BOA")
		   {
			   //adding Group
			   this.assignToGroup.addOption({ value: "CYIENT",  label: "CYIENT", selected: true });
			   this.assignToGroup.addOption({ value: "XCEL", label: "XCEL", selected: false });

				//adding Job type
				this.assignToJobType.addOption({ value: "FieldGrid",  label: "FieldGrid", selected: true });
				this.assignToJobType.addOption({ value: "QCGrid", label: "QCGrid", selected: false });
				this.gridType = "FieldGrid";
				dojo.style(dijit.byId(Feeder), { 'display': 'none' });
				var queryTask = new QueryTask(this.config.workGridUrl);
				var query = new Query();
				query.returnGeometry = false;				
				query.where = "FIELD_COLLECTION_COMPLETED <> 1 or FIELD_COLLECTION_COMPLETED is null";
				query.outFields = ["NAME"];
				//query.returnDistinctValues = true;
				queryTask.execute(query, lang.hitch(this, this._onSuccessfulgridCompletion), lang.hitch(this, this._onFailedQueryCompletion));
				var d = dijit.byId(this.assignTogrid);
				d.options = [];	
				for (var i=0; i< this.gridList.length; i++) {

					this.assignTogrid.addOption({ value: this.gridList[i], label: this.gridList[i], selected: false });
					
				}
		   }


			var usersReq = dojoRequest(this.config.identityService, {
				handleAs: "json", method: "GET", query: this.config.Users
			}).then(lang.hitch(this, function (results) {

				// for(var i=0; i < results.length;i++){

				// 	this.assignTo.addOption({ value: results[i].uid, label: results[i].cn, selected: false });
				// }
				this.boeUserList = [];
				this.ceUserList = [];
				this.caUserList = [];
				for (var i = 0; i < results.length; i++) {
					if (results[i].cn == "boe") {
						for (var j = 0; j < results[i].members.length; j++) {
							var username = results[i].members[j].member.split(',')[0].split('=')[1];
							this.boeUserList.push(username);
							if(this.selectedGroup =="CYIENT"){									
									this.assignTo.addOption({ value: username, label: username, selected: false });
								}
						}
					}
					if (results[i].cn == "ce") {
						for (var j = 0; j < results[i].members.length; j++) {
							var username = results[i].members[j].member.split(',')[0].split('=')[1];
							this.ceUserList.push(username);
							// if(this.selectedGroup =="XCEL"){									
							// 		this.assignTo.addOption({ value: username, label: username, selected: false });
							// }
						}
					}
					if (results[i].cn == "ca") {
						for (var j = 0; j < results[i].members.length; j++) {
							var username = results[i].members[j].member.split(',')[0].split('=')[1];
							this.caUserList.push(username);
							if(this.selectedGroup =="XCEL"){									
									this.assignTo.addOption({ value: username, label: username, selected: false });
							}
						}
					}
				}
				this.assignTo.addOption({ value: " ", label: " ", selected: true });
			}

		));

			new Tooltip({
				connectId: [this.selectPolysButton.id],
				label: this.nls.label7
			});

			new Tooltip({
				connectId: [this.unSelectPolysButton.id],
				label: this.nls.label6
			});

			new Tooltip({
				connectId: [this.clearPolysButton.id],
				label: this.nls.label5
			});

			new Tooltip({
				connectId: [this.createJob.id],
				label: this.nls.label4
			});

			// var queryTask = new QueryTask(this.config.CircuitURL);
			// var query = new Query();
			// query.returnGeometry = false;
			// query.where = "DELIVERED_TO_XCEL  !=3 ";
			// query.outFields = ["FEEDER_NAME"];
			// queryTask.execute(query, lang.hitch(this, this.getFeederListSuccess), lang.hitch(this, this.getFeederListFailed));

			console.log('startup');
		},


		submitJob: function (evt) {

			this.selectionToolbar.deactivate();
			//var selectedFeatures = this.polygonLayer.getSelectedFeatures();
             var selectedFeatures= this.assignTogrid.value;

			this.jobIDDiv.innerHTML = "Processing the Job Creation";

			if(this.selectedGroup == "CYIENT")
			{
				// if (selectedFeatures.length == 0) {
				// 		alert("Please select area");
				// 		return;
				// 	}
				if (this.gridType == "FieldGrid" ){
					
					//var selectedFeatures = this.polygonLayer.getSelectedFeatures();

					// var geoms = [];

					// for (var j = 0; j < selectedFeatures.length; j++) {

					// 	var geom = webMercatorUtils.webMercatorToGeographic(selectedFeatures[j].geometry);

					// 	var polygon = new esri.geometry.Polygon(geom, new esri.SpatialReference({ wkid: 4326 }));

					// 	var previousJobid = selectedFeatures[j].attributes.JOB_ID;
					// 	if (previousJobid !== 0) {
					// 		alert("Already Job created with selected polygon, Please select another polygon");
					// 		this.polygonLayer.clearSelection();
					// 		return;
					// 	}
					// 	geoms.push(polygon);

					// }
					// var union = geometryEngine.union(geoms);
					// this.polyPoint = union.getCentroid();

					var job = new WMJobTask(this.config.WFMURL);
					var username = sessionStorage.getItem('loginUser');
					//var jobname = "JOB_" + selectedFeatures[0].attributes.NAME;
					var jobname = "JOB_" + selectedFeatures;
					this.config.WFMUsername = username;
					var para = new JobCreationParameters();
					para.jobTypeId = this.config.jobType;
					para.assignedType = 1;
					para.priority = 1;
					para.ownedBy = this.config.WFMUsername;
					para.name = jobname;
					//para.name = "";				
					//para.loi = union;
					para.assignedTo = this.assignTo.value;

					var jobIDs = new Array();

					job.createJob(para, this.config.WFMUsername, lang.hitch(this, this.JobCreated));

				}
				else if (this.gridType == "QCGrid"){
					var fd = this.assignToFeeder.value;
					var geoms = [];

					for (var j = 0; j < selectedFeatures.length; j++) {
						var geom = webMercatorUtils.webMercatorToGeographic(selectedFeatures[j].geometry);
						var polygon = new esri.geometry.Polygon(geom, new esri.SpatialReference({ wkid: 4326 }));
						var previousJobid = selectedFeatures[j].attributes.JOB_ID;
						geoms.push(polygon);
					}
					var union = geometryEngine.union(geoms);
					//sthis.polyPoint = union.getCentroid();

					var job = new WMJobTask(this.config.WFMURL);
					var username = sessionStorage.getItem('loginUser');
					var jobname = "QC_" + fd;//selectedFeatures[0].attributes.NAME;
					this.config.WFMUsername = username;
					var para = new JobCreationParameters();
					para.jobTypeId =this.config.jobType_qc_boe;//QC-BOE this.config.jobType;
					para.assignedType = 1;
					para.priority = 1;
					para.ownedBy = this.config.WFMUsername;
					para.name = jobname;
					//para.name = "";				
					//para.loi = union;
					para.assignedTo = this.assignTo.value;

					var jobIDs = new Array();
					job.createJob(para, this.config.WFMUsername, lang.hitch(this, this.JobCreated));

				}

			}
			else if(this.selectedGroup == "XCEL")
			{
					var selectedFeederVal = this.assignToFeeder.value;                   
					var job = new WMJobTask(this.config.WFMURL);
					 username = sessionStorage.getItem('loginUser');
					var jobname = "QC_" + selectedFeederVal;//selectedFeatures[0].attributes.NAME;
					this.config.WFMUsername = username;
					jobtypeid= this.config.jobType_qc_ca;
					assignedto = this.assignTo.value;
					var para = new JobCreationParameters();
					para.jobTypeId =this.config.jobType_qc_ca;// qc - CA
					para.assignedType = 1;
					para.priority = 1;
					para.ownedBy = this.config.WFMUsername;
					para.name = jobname;
					//para.loi = union;
					para.assignedTo = this.assignTo.value;

					var jobIDs = new Array();
					var gdata = [];
					var queryTask = new QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/XCEL_ADMS_ELECTRIC_DAT_XCELADB/FeatureServer/1");
				    var query = new Query();
				    query.returnGeometry = false;
				    query.where = "CIRCUIT_ID = '"+ selectedFeederVal +"'";
				   query.outFields = ["*"];
				   queryTask.execute(query,  lang.hitch(this,  function (resultfeat) {
									var feederdgrids= [];
									var features = resultfeat.features;        
									// var gdata = [];
									for (var j = 0; j < features.length; j++) {
										var grid_feeder = "'"+features[j].attributes.GRID_ID+"'";  

										gdata.push(grid_feeder);
									} 
									var queryTask1 = new QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/FeatureServer/0");
									var query1 = new Query();
									query1.returnGeometry = false;
									//query1.where = "NAME = '"+ grid_feeder +"'";
								     query1.where ="Name IN (" + gdata + ") and (BACKOFFICE_QC_FIXES_COMPLETION <> 1 or BACKOFFICE_QC_FIXES_COMPLETION is null)"
									query1.outFields = ["*"];
									queryTask1.execute(query1,   lang.hitch(this, function (results) {
										var gridfeatures = results.features;        
									
										if(results.features.length>0)
										
										{  
											var grids_uncomplete=[]
											for(i=0;i<gridfeatures.lenght; i++)
											{
												uncompletegrids= results.features[i].attributes.NAME+" ";
												grids_uncomplete.push(uncompletegrids);
											}
											 
											var errormsg =  "Back office QC Fixes not completed for the grids" + " " +  grids_uncomplete;
										   alert(errormsg);
										   this.jobIDDiv.innerHTML= "Process failed"
										}
										else
										{
											job.createJob(para, username, lang.hitch(this, this.JobCreated));
											//this.jobcreateflag	= true;
										}
												
               
										 }));   
										
										
								}));	
									
			
			}
		},

		c: function () {

			var selectedFeatures = this.polygonLayer.getSelectedFeatures();

			var geoms = [];

			for (var j = 0; j < selectedFeatures.length; j++) {

				var geom = webMercatorUtils.webMercatorToGeographic(selectedFeatures[j].geometry);

				var polygon = new esri.geometry.Polygon(geom, new esri.SpatialReference({ wkid: 4326 }));

				geoms.push(polygon);
 

			}

			var union = geometryEngine.union(geoms);

			var identify = new IdentifyTask(this.config.parentJobAOI);

			var identifyParams = new IdentifyParameters();

			identifyParams.geometry = union;
			identifyParams.height = this.map.height;
			identifyParams.width = this.map.width;
			identifyParams.layerIds = [this.config.parentJobAOILayerID];


			identifyParams.mapExtent = this.map.extent;
			identifyParams.returnGeometry = true;
			identifyParams.spatialReference = { wkid: 4326 };
			identifyParams.tolerance = 1;

			identify.execute(identifyParams, lang.hitch(this, this.populateParentDropDown), lang.hitch(this, this.parentJobQueryFailed));


		},

		populateParentDropDown: function (evt) {

			console.log("Parent Job Query Succeeded ");
			console.log(evt);
			var validOption = false;
			if (evt.length > 0) {

				var options = this.linkToWorkflow.getOptions();
				this.linkToWorkflow.removeOption(options);


				for (var i = 0; i < evt.length; i++) {

					if (evt[i].feature.attributes.JOB_TYPE_ID == this.config.parentJobType) {

						validOption = true;

						var option = { value: evt[i].value, label: evt[i].feature.attributes.JOB_NAME, selected: true };
						console.log(evt[i]);

						this.linkToWorkflow.addOption(option);
					}
				}

				if (!validOption) {

					this.createDependency = false;
					this.linkWorkflowCheckbox.set('checked', false);
					alert("No Valid Parent jobs Found");

				}
			} else {

				alert("Parent JOB Not Found (hint: Polygons Must Intersect)");
				this.createDependency = false;
				this.linkWorkflowCheckbox.set('checked', false);
			}

		},

		parentJobQueryFailed: function (evt) {
			console.log("Parent Job Query Failed: ");
			console.log(evt);
			this.linkWorkflowCheckbox.set('checked', false);
			alert("Parent JOB Query Failed.  Contact system Administrator");
		},

		linkWorkflow: function (evt) {


			if (evt) {

				this.createDependency = true;
				//	this.queryParentJobs();

			} else {

				this.createDependency = false;

			}

		},
		selectGroup: function (group) {
			this.selectedGroup = group;	
			var d = dijit.byId(this.assignTo);
			d.options = [];							
			if(this.selectedGroup == "CYIENT")
			{
				this.gridType = "FieldGrid";
				for (var j = 0; j < this.boeUserList.length; j++) {
				  this.assignTo.addOption({ value: this.boeUserList[j], label: this.boeUserList[j], selected: false });
				}
				var queryTask = new QueryTask(this.config.workGridUrl);
				var query = new Query();
				query.returnGeometry = false;				
				query.where = "FIELD_COLLECTION_COMPLETED <> 1 or FIELD_COLLECTION_COMPLETED is null";
				query.outFields = ["NAME"];
				//query.returnDistinctValues = true;
				queryTask.execute(query, lang.hitch(this, this._onSuccessfulgridCompletion), lang.hitch(this, this._onFailedQueryCompletion));
				var d = dijit.byId(this.assignTogrid);
				d.options = [];	
				for (var i=0; i< this.gridList.length; i++) {

					this.assignTogrid.addOption({ value: this.gridList[i], label: this.gridList[i], selected: false });
					
				}
				 dojo.style(dijit.byId(GridType), { 'display': 'block' }); 
				 dojo.style(dijit.byId(linkFeeder), { 'display': 'block' });
				 dojo.style(dijit.byId(Feeder), { 'display': 'none' });
				 dojo.style(dijit.byId(Grids), { 'display': 'block' });
				 dojo.byId("createJob").innerHTML = "Assign Grid";
			}
			else if(this.selectedGroup == "XCEL")
			{
				this.gridType = "QCGrid";
				for (var i = 0; i < this.caUserList.length; i++) {
					this.assignTo.addOption({ value: this.caUserList[i], label: this.caUserList[i], selected: false });
				}

				var queryTask = new QueryTask(this.config.FeederTableURL);
				var query = new Query();
				query.returnGeometry = false;				
				//query.where = "BACKOFFICE_COMPLETED = 1";
				query.where = "DELIVERED_TO_XCEL <> 3 or DELIVERED_TO_XCEL is null";
				query.outFields = ["FEEDER_NAME"];
				//query.returnDistinctValues = true;
				queryTask.execute(query, lang.hitch(this, this._onSuccessfulQueryCompletion), lang.hitch(this, this._onFailedQueryCompletion));
				var d = dijit.byId(this.assignToFeeder);
				d.options = [];	
				for (var i=0; i< this.feederNamesList.length; i++) {
					

					this.assignToFeeder.addOption({ value: this.feederNamesList[i], label: this.feederNamesList[i], selected: false });
					//this.feederNamesList.push(results.features[i].attributes.FEEDER_NAME);
				}
				 dojo.style(dijit.byId(GridType), { 'display': 'none' }); 
				 dojo.style(dijit.byId(Feeder), { 'display': 'block' });
				 dojo.style(dijit.byId(linkFeeder), { 'display': 'none' });
                                 dojo.style(dijit.byId(Grids), { 'display': 'none' });
				 dojo.byId("createJob").innerHTML = "Assign Feeder";
			}
			
		},

		gridTypeChange :function(type){
			this.gridType = type;
			if(this.gridType == "FieldGrid"){
			   dojo.style(dijit.byId(Feeder), { 'display': 'none' });
				dojo.style(dijit.byId(linkFeeder), { 'display': 'block' });
			   var vals = dijit.byId(this.assignToFeeder);
			   vals.options = [];	
			}
			else if(this.gridType == "QCGrid"){
				dojo.style(dijit.byId(Feeder), { 'display': 'block' });
				dojo.style(dijit.byId(linkFeeder), { 'display': 'none' });

				var queryTask = new QueryTask(this.config.FeederTableURL);
				var query = new Query();
				query.returnGeometry = false;
				query.where = "DELIVERIED_TO_XCEL !=3";
				query.outFields = ["FEEDER_NAME"];
				//query.returnDistinctValues = true;
				queryTask.execute(query, lang.hitch(this, this._onSuccessfulQueryCompletion), lang.hitch(this, this._onFailedQueryCompletion));
			}
		},
		_onSuccessfulQueryCompletion: function(results) {
			if(results.features.length == 0){
				alert("no records found")
				return;
			}
			var d = dijit.byId(this.assignToFeeder);
			d.options = [];	
			for (var i=0; i< results.features.length; i++) {
				this.assignToFeeder.addOption({ value: results.features[i].attributes.FEEDER_NAME, label: results.features[i].attributes.FEEDER_NAME, selected: false });
				this.feederNamesList.push(results.features[i].attributes.FEEDER_NAME);
			}
		},
                _onSuccessfulgridCompletion: function(results) {
			if(results.features.length == 0){
				alert("no records found")
				return;
			}
			var d = dijit.byId(this.assignTogrid);
			d.options = [];	
			for (var i=0; i< results.features.length; i++) {
				this.assignTogrid.addOption({ value: results.features[i].attributes.NAME, label: results.features[i].attributes.NAME, selected: false });
				this.gridList.push(results.features[i].attributes.NAME);
			}
		},
		_onFailedQueryCompletion : function(error){
			alert(error);
		},

		checkoutReplica: function (jobID) {

			var layerUrl = this.config.checkoutURL;

			var layersRequest = esriRequest({
				url: layerUrl,
				content: { f: "json", File_GDB_Name: "SF_JOBID_" + jobID, Replica_Name: "SF_JOBID_" + jobID, JOB_ID: jobID },
				handleAs: "json",
				callbackParamName: "callback"
			});

			layersRequest.then(
				function (response) {
					console.log("Checkout Replica Success: ", response.layers);
				}, function (error) {
					console.log("Checkout Replica Error: ", error.message);
				});


		},

		

		JobCreated: function (data) {

			jobIDs = data;
			console.log("WFM JOBID:" + jobIDs);
			//this.loading.hide();
			 this.jobIDDiv.innerHTML = "WFM Job Create with JOB ID: " + jobIDs;

			var selectedFeederName = this.assignToFeeder.value;

			var d = dijit.byId(this.assignToFeeder);
			d.options = [];	
			for (var i=0; i< this.feederNamesList.length; i++) {
				if(this.feederNamesList[i] != selectedFeederName){
					this.assignToFeeder.addOption({ value: this.feederNamesList[i], label: this.feederNamesList[i], selected: false });
				}
				else
				{
					this.feederNamesList.splice(i,1);
				}
			}
                       // var udcgrids = dijit.byId(this.assignTogrid);
			// udcgrids.options = [];	
			// for (var i=0; i< this.gridList.length; i++) {
			// 	if(this.gridList[i] != selectedgrid){
			// 		this.assignTogrid.addOption({ value: this.gridList[i], label: this.gridList[i], selected: false });
			// 	}
			// 	else
			// 	{
			// 		this.gridList.splice(i,1);
			// 	}
			// }

			//for updating the attribute in UDC Workgrids - "DELIVERIED_TO_XCEL"
			if (this.gridType == "QCGrid"){
				var queryTask = new QueryTask(this.config.CircuitURL);
				var query = new Query();
				query.returnGeometry = false;
				query.where = "FEEDER_NAME = '"+ selectedFeederName +"'";
				query.outFields = ["*"];
				queryTask.execute(query, lang.hitch(this, this._onCircuitSuccess), lang.hitch(this, this._onCircuitFailedQueryCompletion));
			}
			else if (this.gridType == "FieldGrid") {

			// Update JOBId for Fishnet grid for INdentifying Assigned or not
			// Update JOBId for Fishnet grid for INdentifying Assigned or not
			//var selectedFeatures = this.polygonLayer.getSelectedFeatures();
			var selectedFeatures = this.assignTogrid.value;
			var ObjectIDS = [];
			var selectedgrids= [];
			// for (var j = 0; j < selectedFeatures.length; j++) {

			// 	var ObjectID = selectedFeatures[j].attributes.OBJECTID;
			// 	ObjectIDS.push(ObjectID);
			// 	var Selected_gridnames = "'"+selectedFeatures[j].attributes.NAME+"'";                        
			// 	selectedgrids.push(Selected_gridnames);
			// }
			  
			var ObjectID = selectedFeatures;
			ObjectIDS.push(ObjectID);
			var Selected_gridnames = "'"+selectedFeatures+"'";
			selectedgrids.push(Selected_gridnames);

			var UpdateJObid = [];
			UpdateJObid.attributes = new Array();

			for (var i = 0; i < ObjectIDS.length; i++) {
				var temp_item = ObjectIDS[i];

				UpdateJObid.attributes.push({
					"attributes": {
						"ObjectID": temp_item,
						"JOB_ID": jobIDs[0]
					}
				});
			}
			jsonString = JSON.stringify(UpdateJObid.attributes);
			var xhttpAgs = new XMLHttpRequest();
			xhttpAgs.onreadystatechange = lang.hitch(this, function () {
				if (xhttpAgs.readyState == 4 && xhttpAgs.status == 200) {
					var res = xhttpAgs.responseText;
					var a = res.split(',');
					var b = a[0].split(':');
					var c = b[1].replace(/"/g, "");
					token = c;

					if (token) {

						var params = "updates=" + jsonString + "&f=pjson" + "&token=" + token;
						var xhttp = new XMLHttpRequest();
						xhttp.onreadystatechange = lang.hitch(this, function () {
							if (xhttp.readyState == XMLHttpRequest.DONE) {
								var jsonResponse = JSON.parse(xhttp.responseText);
								this.polygonLayer.clearSelection();
								var layers = this.map.getLayersVisibleAtScale(this.map.getScale());
								array.forEach(layers,function(layer){
											  if ( layer.visible ) {
															  layer.refresh();
											  }              
								});
								
							}
						

						});
						xhttp.open("POST", "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/FISHNET_XCELADB/FeatureServer/0/applyEdits", true);
						xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xhttp.send(params);

					}


				}
			});
			//var paramsAgs = "username=siteadmin&password=Info9tech&f=json&client=HTTP referer&referer=https://www.cyient-fiops.com/smartmanage&expiration=100";
			var paramsAgs = "username=siteadmin&password=Info9tech&f=json&client id=Request IP";
			xhttpAgs.open("POST", "https://framework-dev.cyient-fiops.com/server/tokens/generateToken", true);
			xhttpAgs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttpAgs.send(paramsAgs);
			// end 
			
			 var workGridUrl= "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/FeatureServer/0",
			queryTask1 = new esri.tasks.QueryTask(workGridUrl);
			var query = new esri.tasks.Query();
			 query.returnGeometry = true;
			 query.outFields = ["*"];                             
			 query.where = "Name IN (" + selectedgrids + ")"; 
			 var UDCWorkGridDAta = [];			
								   
			queryTask1.execute(query, function (results) {
				var resfeatures = results.features;                         
				
				for (var j = 0; j < resfeatures.length; j++) {
				var FieldCompletedgrids = resfeatures[j];				
				FieldCompletedgrids.attributes["FIELD_COLLECTION_COMPLETED"] = 1;				
				 UDCWorkGridDAta.push(FieldCompletedgrids);
		   
				 }
				var  FieldcollectionLayer  =  new FeatureLayer(workGridUrl,  {
					mode:  FeatureLayer.MODE_SNAPSHOT,
					outFields:  ["*"]
				});                         
				
				 FieldcollectionLayer.applyEdits(null, UDCWorkGridDAta, null);  
				//this.polygonLayer.clearSelection();  
			});
	   
			//var resfeatures = results.features; 
			this.polygonLayer.clearSelection();
          var udcgrids = dijit.byId(this.assignTogrid);
			udcgrids.options = [];	
	      for (var i=0; i< this.gridList.length; i++) {
		   if(this.gridList[i] != selectedgrid){
			   this.assignTogrid.addOption({ value: this.gridList[i], label: this.gridList[i], selected: false });
		   }
		   else
		   {
			   this.gridList.splice(i,1);
		   }
	     }
			this.map.centerAt(this.polyPoint);

			this.checkoutReplica(jobIDs);


			//Now we need to create the dependency
			if (this.createDependency) {
				this.createDependency = false;
				var wfmTask = new WMJobTask(this.config.WFMURL)
				var username = sessionStorage.getItem('loginUser');
				this.config.WFMUsername = username;
				wfmTask.createDependency(this.linkToWorkflow.get('value'),
					this.config.heldOnType,
					this.config.heldOnValue,
					data,
					this.config.depOnType,
					this.config.depOnValue,
					this.config.WFMUsername,
					lang.hitch(this, this.dependencySuccess),
					lang.hitch(this, this.dependencyFailure));
			}

			//this.linkWorkflowCheckbox.set('checked', false);
			var options = this.linkToWorkflow.getOptions();
			this.linkToWorkflow.removeOption(options);
			var option = { value: "", label: "", selected: true };
			this.linkToWorkflow.addOption(option);
			this.WFMJobName.set('value', "");
		}
		},

		_onCircuitSuccess: function(results) {
			if(results.features.length == 0){
				//this.jobIDDiv.innerHTML = "";
				return;
			}
			var resultRow = results.features;
			var toUpdateRow = [];		
			resultRow[0].attributes["DELIVERED_TO_XCEL"] = 3;
			resultRow[0].attributes["BACKOFFICE_COMPLETED"] = 3;
			toUpdateRow.push(resultRow);
			var flayer = new FeatureLayer(this.config.CircuitURL);
			var circuitTable = new FeatureTable({
				featureLayer : flayer
			});
			circuitTable.editable = true;
			circuitTable.featureLayer.applyEdits(null, [toUpdateRow[0][0]],null)

		  
			
		},
		_onCircuitFailedQueryCompletion:function(error){
			this.jobIDDiv.innerHTML = "Job processing failed";
		},

		executeStepWorkaround: function (result) {
			console.log("This is executed as a workaround when WFM jobs first created, inital execute doesnt work. Error result here is correct");
			console.log(result);
		},

		dependencySuccess: function (data) {

			console.log("Dependency on Parent Job Created");
			console.log(data);

		},

		dependencyFailure: function (data) {

			//alert("Failed to Create Dependency on Parent Job");
			console.log("Failed to Create Dependency on Parent Job");
			console.log(data);

		},

		onOpen: function () {

			this.polygonLayer.setVisibility(true);

			this.unSelectListener = on(this.unSelectPolysButton, "click", lang.hitch(this, this.activateUnSelectDraw));
			this.selectListener = on(this.selectPolysButton, "click", lang.hitch(this, this.activateDraw));
			this.clearListener = on(this.clearPolysButton, "click", lang.hitch(this, this.clearSelection));			

			console.log('onOpen');
		},

		onClose: function () {

			this.polygonLayer.setVisibility(false);
			this.unSelectListener.remove();
			this.selectListener.remove();
			this.clearListener.remove();
			this.selectionToolbar.deactivate();
			this.jobIDDiv.innerHTML = "";

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


	});
});