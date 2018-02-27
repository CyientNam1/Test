define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'jimu/utils',
    'esri/dijit/util/busyIndicator',
    "workflowmanager/WMJobTask",
    "dojo/_base/lang",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dojo/store/Memory",
    "dijit/form/Button",
    "workflowmanager/WMWorkflowTask",
    "dijit/form/Select",
    "workflowmanager/supportclasses/JobUpdateParameters",
    "esri/request",
    "dojo/request",
    "dijit/Tooltip",
    "dojo/dom",
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/tasks/GeometryService",
    "esri/tasks/ProjectParameters",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "dojox/grid/enhanced/plugins/Filter",
    "dojox/grid/EnhancedGrid",
    'dojo/data/ItemFileWriteStore',
    "dojo/on",
    "dijit/form/ToggleButton"

],
    function (declare, BaseWidget, utils, busyUtil, WMJobTask, lang, Grid, Selection, Memory, Button, WMWorkflowTask, Select, JobUpdateParameters, esriRequest, dojoRequest, Tooltip, dom, map, FeatureLayer, query, GeometryService, ProjectParameters, graphic, Point, Polygon,filter,enhancedGrid,itemFileWriteStore, on, togglebutton) {

        return declare([BaseWidget], {


            baseClass: 'jimu-widget-WFM-Job-MGT',
            grid: null,
            jobID: null,
            users: null,
            busy: null,
            handle: null,
            testmap: null,
            selectedgrids:null, 

            postCreate: function () {

                this.inherited(arguments);
                console.log('postCreate');
            },

            startup: function () {
                //startup	
                this.busy = utils.processUrlInWidgetConfig(this.config.mapprogressimage, this.folderUrl);
                this.handle = busyUtil.create({
                    target: this.WFMmgmt,
                    imageUrl: this.busy,
                    fadeDuration: 200,
                    backgroundOpacity: 0.01
                });

                this.inherited(arguments);  
                    
                var selectedReport=this;
                dojo.connect(this.ddljobstatus, 'onchange', function (evt) {
                    selectedReport.closejobs(evt.target.value);
                 
                });
                selectedReport.closejobs(this.ddljobstatus.value);
                console.log('startup');
                
            },

           
            executeQuery: function () {

                var LoginRole = sessionStorage.getItem('loginuserrole');
                var LoginUserName = sessionStorage.getItem('loginUser');
                this.config.WFMUsername = LoginUserName;
                if (LoginRole == 'undefined') {
                    this.config.WFMUsername = 'Debangshu';
                }
                var wmjobTask = new WMJobTask(this.config.WFMURL);
               
                wmjobTask.queryJobsByID(this.config.queryID, this.config.WFMUsername, lang.hitch(this, lang.hitch(this, this.querySuccess)), lang.hitch(this, this.queryFail));
               
            },
            closejobs: function(value){
                var LoginRole = sessionStorage.getItem('loginuserrole');
                var LoginUserName = sessionStorage.getItem('loginUser');             
                this.config.WFMUsername = LoginUserName;
                var wmjobTask = new WMJobTask(this.config.WFMURL);
                wmjobTask.queryJobsByID(this.config.queryID, this.config.WFMUsername, lang.hitch(this, lang.hitch(this, this.querySuccess)), lang.hitch(this, this.queryFail));
                this.grid.refresh();
                this.executeQuery();
            },

            getSteps: function (jobID) {

                console.log(jobID);
                this.jobID = jobID;

                var wmWorkflowTask = new WMWorkflowTask(this.config.WFMURL);

                wmWorkflowTask.getCurrentSteps(jobID, lang.hitch(this, this.currentStep), lang.hitch(this, this.currentStepFailure));

            },

            currentStepFailure: function (data) {

                console.log("Current Step Retrieval Failed");
                console.log(data);

            },

            currentStep: function (data) {
                var workGridUrl = "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/FeatureServer/0";
                var fishneurl = "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/FISHNET_XCELADB/FeatureServer/0";
                
                var LoginRole = sessionStorage.getItem('loginuserrole');

                var steps = new Array();

                steps = data;


                //var layerUrl = this.config.WFMURL + "/jobs/" + this.jobID + "/workflow/steps/execute";
                var layerUrl = this.config.WFMURL + "/jobs/" + this.jobID + "/workflow/steps/" + steps[0].id + "/moveNext";

                var LoginUserName = sessionStorage.getItem('loginUser');
                this.config.WFMUsername = LoginUserName;
                var stepreturnCode;

                if (LoginRole == "CA") {
                    if ((steps[0].stepType.name).Trim() == "CA Approves") {
                        require(["dijit/ConfirmDialog"], function (ConfirmDialog) {

                            // create instance
                            var dialog = new ConfirmDialog({
                                title: "Next Step",
                                content: "You want to Close are Reassign JOB",
                                style: "width: 300px"
                            });

                            dialog.set("buttonOk", "Close JOB");
                            dialog.set("buttonCancel", "Reassign");

                            dialog.on('execute', function () { stepreturnCode = 1 });
                            dialog.on('cancel', function () { stepreturnCode = 0 });

                            dialog.show();
                        });

                    }
                    var layersRequest = esriRequest({
                        url: layerUrl,
                        content: { f: "json", user: this.config.WFMUsername, returncode: stepreturnCode },
                        handleAs: "json",
                        callbackParamName: "callback"
                    });
                    layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));

                }
                else
                    if (LoginRole == "CE") {
                        if ((steps[0].stepType.name).Trim() == "CE QC Check Inprogress") {
                            alert("Please reassign job to Admin")
                        }

                        var layerUrl = this.config.WFMURL + "/jobs/" + this.jobID + "/workflow/steps/execute";
                        var layersRequest = esriRequest({
                            url: layerUrl,
                            content: { f: "json", steps: steps[0].id, user: this.config.WFMUsername },
                            handleAs: "json",
                            callbackParamName: "callback"
                        });
                        layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));

                    }
                    else
                    if (LoginRole == "BOE") {

                        var queryTask = new esri.tasks.QueryTask(fishneurl);
                        var query = new esri.tasks.Query();
                        query.returnGeometry = false;
                        query.outFields = ["*"];
                        query.where = "JOB_ID = " + this.jobID;
                        queryTask.execute(query, function (resultfeat) {
                            var selectedgrids = [];
                            var UDCWorkGridData = [];
                            var features = resultfeat.features;
                            var jobidupdate = [];
                            for (var j = 0; j < features.length; j++) {
                                var graphic_upd = "'" + features[j].attributes.NAME + "'";
                                selectedgrids.push(graphic_upd);
                            }

                            var queryTask1 = new esri.tasks.QueryTask(workGridUrl);
                            var query1 = new esri.tasks.Query();
                            query1.returnGeometry = true;
                            query1.outFields = ["*"];
                            query1.where = "Name IN (" + selectedgrids + ")";
                            queryTask1.execute(query1, function (results) {

                                var resfeatures = results.features;
                                if ((steps[0].stepType.name).trim() == "Back Office QC and Fixes") {
                                    require(["dijit/ConfirmDialog"], function (ConfirmDialog) {

                                        // create instance
                                        var dialog = new ConfirmDialog({
                                            title: "Next Step",
                                            content: "Click OK for next step - Validation Fixes Completion, Back for previous Step - In Progress",
                                            style: "width: 300px"
                                        });

                                        dialog.set("buttonOk", "OK");
                                        dialog.set("buttonCancel", "Back");

                                        dialog.on('execute', function () {
                                            var queryTask1 = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/XCEL_ADMS_ELECTRIC_XCELADB/FeatureServer/19");
                                            var query1 = new esri.tasks.Query();
                                            query1.returnGeometry = false;                                            
                                             query1.where ="jobunit in (" + selectedgrids + ") and pats <> 9 and pats <> 2"
                                            query1.outFields = ["*"];
                                            queryTask1.execute(query1,   lang.hitch(this, function (results) {
                                                var gridfeatures = results.features;        
                                            
                                                if(results.features.length>0)
                                                
                                                {   
                                                   var errormsg =  "Your work is pending for the grid. Please check";
                                                   alert(errormsg);
                                                   
                                                }
                                                else
                                                {
                                            for (var j = 0; j < resfeatures.length; j++) {
                                                var udcworkgridattributes = resfeatures[j];
                                                stepreturnCode = 1;
                                                udcworkgridattributes.attributes["BACKOFFICE_QC_FIXES_COMPLETION"] = 1;
                                                UDCWorkGridData.push(udcworkgridattributes);
                                            }
                                            var UdcWorkgriddataupdate = new FeatureLayer(workGridUrl, {
                                                mode: FeatureLayer.MODE_SNAPSHOT,
                                                outFields: ["*"]
                                            });

                                            UdcWorkgriddataupdate.applyEdits(null, UDCWorkGridData, null);
                                            var layersRequest = esriRequest({
                                                url: layerUrl,
                                                content: { f: "json", user: LoginUserName, returncode: 1},
                                                handleAs: "json",
                                                callbackParamName: "callback"
                                            });
                                            layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
                                        }
                                                       
                       
                                    }));

                                        });
                                        dialog.on('cancel', function () {
                                            for (var j = 0; j < resfeatures.length; j++) {
                                                stepreturnCode = 0;
                                                var udcworkgridattributes = resfeatures[j];
                                                udcworkgridattributes.attributes["PHOTO_ATTRIBUTE_COMPLETION"] = 2;
                                                UDCWorkGridData.push(udcworkgridattributes);
                                            }
                                            var UdcWorkgriddataupdate = new FeatureLayer(workGridUrl, {
                                                mode: FeatureLayer.MODE_SNAPSHOT,
                                                outFields: ["*"]
                                            });

                                            UdcWorkgriddataupdate.applyEdits(null, UDCWorkGridData, null);                                          
                                                var layersRequest = esriRequest({
                                                    url: layerUrl,
                                                    content: { f: "json", user: LoginUserName, returncode: 0 },
                                                    handleAs: "json",
                                                    callbackParamName: "callback"
                                                });
                                                layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));


                                        });

                                        dialog.show();
                                    });
                                   

                                }
                                else if ((steps[0].stepType.name).trim() == "Import into Source System") {
                                    require(["dijit/ConfirmDialog"], function (ConfirmDialog) {

                                        // create instance
                                        var dialog = new ConfirmDialog({
                                            title: "Next Step",
                                            content: "Click OK for next step - Final Process and Delivery, Back for previous Step - In Progress.",
                                            style: "width: 300px"
                                        });

                                        dialog.set("buttonOk", "OK");
                                        dialog.set("buttonCancel", "Back");

                                        dialog.on('execute', function () {


                                          
                                                    for (var j = 0; j < resfeatures.length; j++) {
                                                        var udcworkgridattributes = resfeatures[j];
                                                        stepreturnCode = 1;
                                                    }
                                                    var UdcWorkgriddataupdate = new FeatureLayer(workGridUrl, {
                                                        mode: FeatureLayer.MODE_SNAPSHOT,
                                                        outFields: ["*"]
                                                    });
        
                                                    UdcWorkgriddataupdate.applyEdits(null, UDCWorkGridData, null);
                                                    var layersRequest = esriRequest({
                                                        url: layerUrl,
                                                        content: { f: "json", user: LoginUserName, returncode: 1 },
                                                        handleAs: "json",
                                                        callbackParamName: "callback"
                                                    });
                                                    layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
        
                                                                                          

                                        });
                                        dialog.on('cancel', function () {
                                            for (var j = 0; j < resfeatures.length; j++) {
                                                stepreturnCode = 0;
                                                var udcworkgridattributes = resfeatures[j];
                                                udcworkgridattributes.attributes["PHOTO_ATTRIBUTE_COMPLETION"] = 2;
                                                udcworkgridattributes.attributes["VALIDATION_FIXES_COMPLETION"] = 2;
                                                udcworkgridattributes.attributes["BACKOFFICE_QC_FIXES_COMPLETION"] = 2;
                                                UDCWorkGridData.push(udcworkgridattributes);
                                            }
                                            var UdcWorkgriddataupdate = new FeatureLayer(workGridUrl, {
                                                mode: FeatureLayer.MODE_SNAPSHOT,
                                                outFields: ["*"]
                                            });

                                            UdcWorkgriddataupdate.applyEdits(null, UDCWorkGridData, null);                                           
                                                var layersRequest = esriRequest({
                                                    url: layerUrl,
                                                    content: { f: "json", user: LoginUserName, returncode: 0 },
                                                    handleAs: "json",
                                                    callbackParamName: "callback"
                                                });
                                                layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));

                                        });

                                        dialog.show();
                                    });

                                }
                                else {

                                    for (var j = 0; j < resfeatures.length; j++) {
                                        var udcworkgridattributes = resfeatures[j];

                                        if ((steps[0].stepType.name).trim() == "Photo or Attribute Completed") {
                                            udcworkgridattributes.attributes["PHOTO_ATTRIBUTE_COMPLETION"] = 1;
                                        }

                                        else if ((steps[0].stepType.name).trim() == "Validation Fixes Completion") {
                                            udcworkgridattributes.attributes["VALIDATION_FIXES_COMPLETION"] = 1;

                                        }
                                        else if ((steps[0].stepType.name).trim() == "Final Process and Delivery") {
                                            udcworkgridattributes.attributes["FINAL_PROCESS_AND_DELIVERY"] = 1;
                                            udcworkgridattributes.attributes["PLAN_TO_DELIVER"] = 1;
                                            udcworkgridattributes.attributes["DELIVER_TO_XCEL"] = 1;

                                        }
                                        UDCWorkGridData.push(udcworkgridattributes);
                                        var UdcWorkgriddataupdate = new FeatureLayer(workGridUrl, {
                                            mode: FeatureLayer.MODE_SNAPSHOT,
                                            outFields: ["*"]
                                        });                                            

                                        UdcWorkgriddataupdate.applyEdits(null, UDCWorkGridData, null);
                                                                           

                                    }
                                    // var layersRequest = esriRequest({
                                    //     url: layerUrl,
                                    //     content: { f: "json", user: LoginUserName, returncode: 1 },
                                    //     handleAs: "json",
                                    //     callbackParamName: "callback"
                                    // });
                                    // layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
                                    
                                }
                                

                            });

                            
                        });
                        if (((steps[0].stepType.name).trim() == "Back Office QC and Fixes")|| ((steps[0].stepType.name).trim() == "Import into Source System")) 
                        {
                          if(stepreturnCode==1){
                         var layersRequest = esriRequest({
                            url: layerUrl,
                            content: { f: "json", user: LoginUserName, returncode: 1 },
                            handleAs: "json",
                            callbackParamName: "callback"
                        });
                        layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
                         }
                         else if (stepreturnCode==0)
                         {
                            var layersRequest = esriRequest({
                                url: layerUrl,
                                content: { f: "json", user: LoginUserName, returncode: 0 },
                                handleAs: "json",
                                callbackParamName: "callback"
                            }); 
                            layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
                         }
                        
                        }
                        else{
                            var layersRequest = esriRequest({
                                url: layerUrl,
                                content: { f: "json", user: LoginUserName, returncode: stepreturnCode },
                                handleAs: "json",
                                callbackParamName: "callback"
                            });
                            layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail)); 
                        }
                    }
                    else {

                        var layerUrl = this.config.WFMURL + "/jobs/" + this.jobID + "/workflow/steps/execute";
                        var layersRequest = esriRequest({
                            url: layerUrl,
                            content: { f: "json", steps: steps[0].id, user: this.config.WFMUsername },
                            handleAs: "json",
                            callbackParamName: "callback"
                        });
                        layersRequest.then(lang.hitch(this, this.executeStepSuccess), lang.hitch(this, this.executeStepFail));
                    }


        },
            executeStepSuccess: function (result) {

                console.log("Executed Step Successfully");
                console.log(result);
                this.jobID = null;
                this.grid.refresh();
                this.executeQuery();
                if (result.success == true) {
                    console.log("The Workflow step executed successfully");
                    this.grid.refresh();
                    this.executeQuery();
                }
                if (result.executeInfo[0].executionResult == 1) {

                    console.log("The Workflow step executed successfully");
                    this.grid.refresh();
                    this.executeQuery();

                } else if (result.executeInfo[0].executionResult == 2) {

                    alert("Workflow Step not executed: Dependent on a step in another job");

                } else if (result.executeInfo[0].executionResult == 3) {

                    alert("Workflow Step not executed:  Dependent on a stage in another job");

                } else if (result.executeInfo[0].executionResult == 4) {

                    alert("Workflow Step not executed: Dependent on a status in another job");

                } else if (result.executeInfo[0].executionResult == 5) {

                    alert("Workflow Step not executed: Blocked by an active job hold");

                } else if (result.executeInfo[0].executionResult == 6) {

                    alert("Workflow Step not executed: Dependent on a previous step in this job's workflow");

                } else if (result.executeInfo[0].executionResult == 7) {

                    alert("Workflow Step not executed: The step was marked as complete");

                } else if (result.executeInfo[0].executionResult == 8) {

                    alert("Workflow Step not executed: The step is assigned to another user");

                } else if (result.executeInfo[0].executionResult == 9) {

                    alert("Workflow Step not executed: The step is assigned to another group");

                } else if (result.executeInfo[0].executionResult == 10) {

                    alert("Workflow Step not executed: The job is assigned to another user/group");

                } else if (result.executeInfo[0].executionResult == 11) {

                    alert("Workflow Step not executed: The job is closed");

                } else if (result.executeInfo[0].executionResult == 12) {

                    alert("Workflow Step not executed: The step is configured for a different platform (desktop vs. server)");

                } else if (result.executeInfo[0].executionResult == 13) {

                    alert("Workflow Step not executed: Invalid step");

                } else if (result.executeInfo[0].executionResult == 14) {

                    alert("Workflow Step not executed: Dependent on another job");

                } else if (result.executeInfo[0].executionResult == 15) {

                    alert("Workflow Step not executed: The step is not the current workflow step");

                }



            },

            executeStepFail: function (result) {

                console.log("Step Not Executed");
                console.log(result);
                this.jobID = null;

            },

            exportToExternal: function (jobid) {
                console.log("EXPORT EXTERNAL");
                this.handle.show();
                var exportReq = dojoRequest(this.config.exportURL, {
                    handleAs: "json",
                    method: "GET",
                    query: "JOBID=" + jobid
                }).then(lang.hitch(this, function (results) {

                    console.log("Exported Data");
                    console.log(results);
                    this.handle.hide();
                    alert("Extract:" + results.description);

                    this.grid.refresh();

                    this.executeQuery();

                }));

            },
            

            exportDataColumn: function (object, value, node, options) {
                console.log("job object");
                console.log(object);


                //Only Initiate Export on Specified job Type & Job is Complete					
                //if(object["JTX_JOBS.JOB_TYPE_ID"] == this.config.exportJobType){
                //if(object["JTX_JOBS.PERC_COMPLETE"] == 100){
                if (object["JTX_JOBS.JOB_TYPE_ID"] == this.config.exportJobType && object["JTX_JOBS.PERC_COMPLETE"] == 95) {
                    var executeButton = new Button({

                        baseClass: "SF_WorkflowExportButton",
                        iconClass: "SF_WorkflowExportButtonIcon",
                        onClick: lang.hitch(this, function (state) {
                            var jobID = object["JTX_JOBS.JOB_ID"];

                            console.log("EXECUTE BUTTON");
                            this.exportToExternal(jobID);

                        })
                    });

                    executeButton.placeAt(node);

                    new Tooltip({
                        connectId: [node],
                        label: "Click to export completed workflow data"
                    });

                }
            },

            executeWFButton: function (object, value, node, options) {

                var executeButton = new Button({

                    baseClass: "SF_WorkflowExecuteButton",
                    iconClass: "SF_WorkflowExecuteButtonIcon",
                    onClick: lang.hitch(this, function (state) {
                        var jobID = object["JTX_JOBS.JOB_ID"];
                        var LoginRole = sessionStorage.getItem('loginuserrole');
                        var currentstep = object["JTX_JOB_STEP.STEP_NAME"];
                        // var selectedgrids = object["JTX_JOBS.JOB_NAME"].replace("JOB_", "").replace("QC_","");                        
                        this.getSteps(jobID);

                    })
                });

                executeButton.placeAt(node);

                new Tooltip({
                    connectId: [node],
                    label: "Click to mark workflow step as done"
                });


            },

            DeleteWFButton: function (object, value, node, options) {

                var executeButton = new Button({

                    baseClass: "SF_WorkflowExecuteButton",
                    iconClass: "SF_WorkflowDelteButtonIcon",

                    onClick: lang.hitch(this, function (event) {

                        var jobid = object["JTX_JOBS.JOB_ID"];
                        var username = sessionStorage.getItem('loginUser');
                        var token = "";
                        var xhttpAgs = new XMLHttpRequest();
                        xhttpAgs.onreadystatechange = lang.hitch(this, function () {
                            if (xhttpAgs.readyState == 4 && xhttpAgs.status == 200) {
                                var res = xhttpAgs.responseText;
                                var a = res.split(',');
                                var b = a[0].split(':');
                                var c = b[1].replace(/"/g, "");
                                token = c;

                                if (token) {

                                    var params = "user=" + username + "&jobs=" + jobid + "&f=pjson" + "&token=" + token;
                                    var xhttp = new XMLHttpRequest();
                                    xhttp.onreadystatechange = lang.hitch(this, function () {
                                        if (xhttp.readyState == XMLHttpRequest.DONE) {
                                            var jsonResponse = JSON.parse(xhttp.responseText);
                                            alert("Job" + " " + jobid + " " + " Deleted successfully");
                                            this.grid.refresh();
                                            this.executeQuery();

                                            var UpdateFishnetJObid = [];
                                            queryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/FISHNET_XCELADB/FeatureServer/0");
                                            var query = new esri.tasks.Query();
                                            query.returnGeometry = false;
                                            query.outFields = ["*"];
                                            query.where = "JOB_ID = " + jobid;

                                            queryTask.execute(query, function (resultfeat) {

                                                var features = resultfeat.features;

                                                for (var j = 0; j < features.length; j++) {

                                                    var graphic_upd = features[j];
                                                    graphic_upd.attributes["JOB_ID"] = 0;
                                                    UpdateFishnetJObid.push(graphic_upd);

                                                }
                                                var landuseLineLayer = new FeatureLayer("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/FISHNET_XCELADB/FeatureServer/0", {
                                                    mode: FeatureLayer.MODE_SNAPSHOT,
                                                    outFields: ["*"]
                                                });
                                                landuseLineLayer.applyEdits(null, UpdateFishnetJObid, null);

                                            });


                                        }

                                    });
                                    xhttp.open("POST", "https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/WFM/WMServer/jobs/delete", true);
                                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    xhttp.send(params);

                                }


                            }
                        });

                        var paramsAgs = "username=siteadmin&password=Info9tech&f=json&client id=Request IP";
                        xhttpAgs.open("POST", this.config.Servicetoken, true);
                        xhttpAgs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttpAgs.send(paramsAgs);
                    })


                });

                executeButton.placeAt(node);

                new Tooltip({
                    connectId: [node],
                    label: "Click to Delete Job"
                });


            },


            assignUser: function (jobID, user) {
                var LoginUserName = sessionStorage.getItem('loginUser');
                this.config.WFMUsername = LoginUserName;

                console.log("Assign User");
                console.log(jobID);


                var parameters = {
                    assignedType: 1,
                    assignedTo: user
                }
                var layerUrl = this.config.WFMURL + "/jobs/" + jobID + "/update";

                var LoginUserName = sessionStorage.getItem('loginUser');
                this.config.WFMUsername = LoginUserName;

                var layersRequest = esriRequest({

                    url: layerUrl,
                    content: { f: "json", properties: JSON.stringify(parameters), user: this.config.WFMUsername },
                    handleAs: "json",
                    callbackParamName: "callback"
                });

                layersRequest.then(lang.hitch(this, this.wfUpdateSuccess), lang.hitch(this, this.wfUpdateFail));

            },

            wfUpdateSuccess: function (result) {
                console.log("WF Update Success");
                console.log(result);

                this.grid.refresh();
                this.executeQuery();
                alert("Successfully Job Reassigned to User");
            },

            wfUpdateFail: function (result) {
                console.log("WF Update Fail");
                console.log(result);
                alert("Please Select Back office Engineer Only");

            },

            assignToUserWFSelect: function (object, value, node, options) {
                var LoginUserName = sessionStorage.getItem('loginUser');
                var LoginRole = sessionStorage.getItem('loginuserrole');
                this.config.WFMUsername = LoginUserName;
                var assignDropdown = new Select({
                    label: "Assign To",
                    onChange: lang.hitch(this, function (state) {

                        console.log(LoginUserName);
                        console.log(state);
                        var jobID = object["JTX_JOBS.JOB_ID"];
                        var createduser = object["JTX_JOBS.CREATED_BY"];
                        // if (createduser == state) {
                        //     alert("Please select another User")
                        // } else {

                        this.assignUser(jobID, state);
                        // this.executeWFButton(object, value, node, options);
                        //}

                    })
                });


                var usersReq = dojoRequest(this.config.identityService, {
                    handleAs: "json",
                    method: "GET",
                    query: "ACTION=GetRoles"
                }).then(lang.hitch(this, function (results) {

                    // for(var i=0; i < results.length;i++){

                    // 	assignDropdown.addOption({ value: results[i].uid, label: results[i].cn, selected: false });								


                    // }

                    if (LoginRole == 'BOA') {
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].cn == "boe" || results[i].cn == "ca") {
                                for (var j = 0; j < results[i].members.length; j++) {
                                    var username = results[i].members[j].member.split(',')[0].split('=')[1];
                                    assignDropdown.addOption({ value: username, label: username, selected: false });
                                }
                            }

                        }
                    }

                    else if (LoginRole == 'BOE') {
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].cn == "boa") {
                                for (var j = 0; j < results[i].members.length; j++) {
                                    var username = results[i].members[j].member.split(',')[0].split('=')[1];
                                    assignDropdown.addOption({ value: username, label: username, selected: false });
                                }
                            }

                        }
                    }
                    else if (LoginRole == 'CA') {
                        for (var i = 0; i < results.length; i++) {
                            if ((results[i].cn == "ce")) {
                                for (var j = 0; j < results[i].members.length; j++) {
                                    var username = results[i].members[j].member.split(',')[0].split('=')[1];
                                    assignDropdown.addOption({ value: username, label: username, selected: false });
                                }
                            }
                            else if (results[i].cn == "boa") {
                                for (var j = 0; j < results[i].members.length; j++) {
                                    var username = results[i].members[j].member.split(',')[0].split('=')[1];
                                    if (username == "Ravi.B") {
                                        assignDropdown.addOption({ value: username, label: username, selected: false });
                                    }
                                }

                            }

                        }
                    }
                    else {
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].cn == "ca") {
                                for (var j = 0; j < results[i].members.length; j++) {
                                    var username = results[i].members[j].member.split(',')[0].split('=')[1];
                                    assignDropdown.addOption({ value: username, label: username, selected: false });
                                }
                            }

                        }
                    }

                    assignDropdown.addOption({ value: " ", label: " ", selected: true });

                    assignDropdown.placeAt(node);

                    new Tooltip({
                        connectId: [node],
                        label: "Select name to change assignment of job to another user"
                    });

                }


                ));



            },

            querySuccess: function (result) {

                console.log("Query Succeeded");

                var columns = [];
                console.log(result);

                for (i = 0; i < result.fields.length; i++) {

                    var column = { id: result.fields[i].name, field: result.fields[i].name, label: result.fields[i].alias };

                    columns.push(column);

                }


                if (this.config.allowExecute) {
                    var executeColumn = { field: 'WorkflowExecute', label: 'Next Step', renderCell: lang.hitch(this, this.executeWFButton) };
                    columns.push(executeColumn);
                }

                if (this.config.allowExport) {
                    var exportColumn = { field: 'ExportData', label: 'Sync to GESW', renderCell: lang.hitch(this, this.exportDataColumn) };
                    columns.push(exportColumn);
                }

                if (this.config.allowDeletion) {
                    var Deletecolumn = { field: 'WorkflowDelete', label: 'Delete JOB', renderCell: lang.hitch(this, this.DeleteWFButton) };
                    columns.push(Deletecolumn);
                }

                if (this.config.allowReassign) {
                    var assignColumn = { field: 'WorkflowAssign', label: 'Reassign Job To User', renderCell: lang.hitch(this, this.assignToUserWFSelect) };
                    columns.push(assignColumn);
                }


                window.localStorage.setItem("currentmap3", this.map);
                sessionStorage.setItem("currentmap4", this.map);
                
                var gridData = [];
                var gdata = [];

                for (var j = 0; j < result.rows.length; j++) {

                    var data = {};

                    for (var k = 0; k < result.rows[j].length; k++) {

                        data[columns[k].field] = result.rows[j][k];

                    }


                    gdata.push(data);
                }
                var LoginRole = sessionStorage.getItem('loginuserrole');
                var loggeduser = sessionStorage.getItem('loginUser');
                var LoginUserName = loggeduser.toLowerCase();
                var ddljobselectedvalue = this.ddljobstatus.selectedIndex;
                if (LoginRole == "BOA") {
             
                    for (var j = 0; j < gdata.length; j++) {  
                        var jobstatus = gdata[j]["JTX_JOB_STEP.STEP_NAME"];
                        if(ddljobselectedvalue==1) 
                        {
                            var jobcompletestatus = gdata[j]["JTX_JOBS.PERC_COMPLETE"];
                            if(jobcompletestatus == 100){
                                gridData.push(gdata[j]);
                                
                            }
                        }
                        else if(ddljobselectedvalue==2) 
                        {
                           
                            if((jobstatus.trim() == 'Assigned') || (jobstatus.trim() == 'BOA Assigns to BOE')){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==3) 
                        {
                            if((jobstatus.trim() == 'In Progress') || (jobstatus.trim() == 'BOE work in Progress')){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==4) 
                        {
                               if(jobstatus.trim() == 'Photo or Attribute Completed'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==5) 
                        {
                            if(jobstatus.trim() == 'Back Office QC and Fixes'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==6) 
                        {
                           
                            if(jobstatus.trim() == 'Validation Fixes Completion'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==7) 
                        {
                           
                            if(jobstatus.trim() == 'Deliver to Source System'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==8) 
                        {
                          
                            if(jobstatus.trim() == 'Import into Source System'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==9) 
                        {
                           
                            if(jobstatus.trim() == 'Final Process and Delivery'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else if(ddljobselectedvalue==10) 
                        {
                           
                            if( gdata[j]["JTX_JOB_TYPES.JOB_TYPE_NAME"]== 'Customer'){
                                gridData.push(gdata[j]);
                            }
                        }
                        else
                        {
                            gridData.push(gdata[j]); 
                          
                        }
                   
                      }
                 
                }

                else if ((LoginRole == 'BOE') || (LoginRole == 'CE')) {   
                    for (var j = 0; j < gdata.length; j++) {
                        var assignto = gdata[j]["JTX_JOBS.ASSIGNED_TO"];
                        var assigntouser = assignto.toLowerCase();
                        //  var jobid =  gdata[j]["JTX_JOBS.JOB_ID"];   
                        var jobcompletestatus = gdata[j]["JTX_JOBS.PERC_COMPLETE"];
                        if ((assigntouser == LoginUserName) && (jobcompletestatus != 100)) {
                            gridData.push(gdata[j]);

                        }
                    }

                } else if (LoginRole == 'CA') {
                   
                    for (var j = 0; j < gdata.length; j++) {
                        var jobtype = gdata[j]["JTX_JOB_TYPES.JOB_TYPE_NAME"];
                        if ((jobtype == "Customer") && (jobcompletestatus != 100)) {
                            gridData.push(gdata[j]);
                        }

                    }
                }

                console.log(JSON.stringify(gridData));

                console.log(columns);
               // var store = new dojo.data.ItemFileWriteStore({data: data});
                this.grid = new Grid(

                    {
                        columns: columns,
                        queryOptions: {
                            sort: [{ attribute: "JTX_JOBS.JOB_ID" }]
                        },
                        //store: store,
                        selectionMode: "single",
                        cellNavigation: false,
                        className: "SFJobMGTGrid"                        

                    }, this.resultsGrid);

                this.grid._setClass("SFJobMGTGrid");
                this.grid.renderArray(gridData);
                this.grid.set('sort', 'JTX_JOBS.JOB_ID');
                document.getElementById(this.id + "_panel").style.width = "1200px";
                document.getElementById(this.id + "_panel").style.height = "480px";
                
                if((LoginRole != "BOA")) 
                {
                // dojo.style(dijit.byId(jobstatus), { 'display': 'none' });
                 //dojo.style(dojo.byId(jobstatus), "display", "none");
                  document.getElementById("jobstatus").style.display = "none";
                } 
                testmap = this.map;
                //this.testmap= this.map
                
                this.grid.on('.dgrid-row:click', function (event) {
                    var rowind = event.selectorTarget.rowIndex;
                    var row = gridData[rowind];
                    var jobid = row["JTX_JOBS.JOB_ID"];
                    var jname = row["JTX_JOBS.JOB_NAME"];
                  //  sessionStorage.setItem("Gridname", jname);
                    if (jname.includes("QC")) {
                        var queryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/XCEL_ADMS_ELECTRIC_DAT_XCELADB/MapServer/1");
                        var query = new esri.tasks.Query();
                        query.returnGeometry = false;
                        query.outFields = ["*"];
                        var fname = jname.split("_");
                        query.where = "CIRCUIT_ID = '" +fname[1]+"'";
                        //query.where = "CIRCUIT_ID = 'ENGL1687'";
                        queryTask.execute(query, function (resultfeat) {

                            //var features = resultfeat.features;
                            var cnd = "";
                            for (var cnt = 0; cnt < resultfeat.features.length; cnt++) {
                                cnd = cnd + "Name = '" + resultfeat.features[cnt].attributes.GRID_ID + "'"
                                if (cnt != (resultfeat.features.length - 1)) {
                                    cnd = cnd + " or ";
                                }
                            }

                            var gridqueryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/MapServer/0");
                            var gridquery = new esri.tasks.Query();
                            gridquery.returnGeometry = true;
                            gridquery.outFields = ["*"];
                            gridquery.where = cnd;
                            gridqueryTask.execute(gridquery, function (resultfeat) {

                                var features = resultfeat.features;
                                var graphic = features[0];

                                maps = testmap;
                                var spatialRef = new esri.SpatialReference({ wkid: 102100 });
                                var polyExtent = resultfeat.features[0].geometry;
                                var params = new ProjectParameters();
                                params.geometries = [polyExtent];
                                params.inSR = new esri.SpatialReference({ wkid: 26913 });
                                params.outSR = maps.spatialReference;
                                var ext = new esri.geometry.Extent(polyExtent, maps.spatialReference);
                                maps.setExtent(ext.expand(500.0));

                                var geometryService = new GeometryService("https://framework-dev.cyient-fiops.com/server/rest/services/Utilities/Geometry/GeometryServer");
                                geometryService.project(params, function (convertedObj) {
                                    maps.setExtent((convertedObj[0].getExtent()).expand(1.10));
                                });
                            });


                        });
                    }
                    else {

                        // var queryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/WFM_AOI_XCELADB/MapServer/0");
                        // var query = new esri.tasks.Query();
                        // query.returnGeometry = true;
                        // query.outFields = "*";
                        //query.where = "WFM.JTX_JOBS.JOB_ID = " + jobid;

                        var queryTask = new esri.tasks.QueryTask("https://framework-dev.cyient-fiops.com/server/rest/services/XCELADB/UDC_WorkGrids_XCELADB/MapServer/0");
                        var query = new esri.tasks.Query();
                        query.returnGeometry = true;
                        query.where = "NAME = '" +jname.split("JOB_")[1] +"'";

                        queryTask.execute(query, function (resultfeat) {

                            var features = resultfeat.features;
                            var graphic = features[0];

                            maps = testmap;
                            var spatialRef = new esri.SpatialReference({ wkid: 102100 });
                                var polyExtent = resultfeat.features[0].geometry;
                                var params = new ProjectParameters();
                                params.geometries = [polyExtent];
                                params.inSR = new esri.SpatialReference({ wkid: 26913 });
                                params.outSR = maps.spatialReference;
                                var ext = new esri.geometry.Extent(polyExtent, maps.spatialReference);
                                maps.setExtent(ext.expand(500.0));

                                var geometryService = new GeometryService("https://framework-dev.cyient-fiops.com/server/rest/services/Utilities/Geometry/GeometryServer");
                                geometryService.project(params, function (convertedObj) {
                                    maps.setExtent((convertedObj[0].getExtent()).expand(1.10));
                                });
                            //maps.setExtent((graphic.geometry.getExtent()).expand(1.1));
                        });

                        
                    }
                });

            },
            // FetchClosedJobs: function (evt) {
            //     alert("123");
            // },

            queryFail: function (data) {
                console.log("Query Failed");
                console.log(data);

            },

            onOpen: function () {

                document.getElementById(this.id + "_panel").style.width = "380px";
                document.getElementById(this.id + "_panel").style.height = "480px";
                var LoginRole = sessionStorage.getItem('loginuserrole');  
                
                if (this.grid) {

                    this.grid.refresh();

                }

                this.executeQuery();
                if((LoginRole != "BOA")) 
                {
                 dojo.style(dijit.byId(jobstatus), { 'display': 'none' });
                 //dojo.style(dojo.byId(jobstatus), "display", "none");
                } 

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
            },


        });
    });