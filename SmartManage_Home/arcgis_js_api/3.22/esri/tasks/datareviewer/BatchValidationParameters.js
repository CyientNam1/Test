// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/tasks/datareviewer/BatchValidationParameters",["dojo/_base/declare","dojo/json","dojo/has","dojo/_base/lang","../../kernel"],function(a,b,c,d,e){a=a(null,{declaredClass:"esri.tasks.datareviewer.BatchValidationParameters",createdBy:null,title:null,sessionString:"",fileItemId:null,batchJobFileName:null,userName:null,changedFeaturesOnly:null,analysisArea:null,productionWorkspace:null,productionWorkspaceVersion:null,cronExpression:null,executionsEndDate:null,maxNumberOfExecutions:null,constructor:function(){},
toJSONExecuteParameters:function(){return{batchValidationSettings:this._toJSONBVSettingsParameter(),batchValidationJobTitle:this.title,batchValidationJobCreatedBy:this.createdBy,f:"json"}},toJSONScheduleParameters:function(){return{batchValidationSettings:this._toJSONBVSettingsParameter(),schedule:this._toJSONBVScheduleParameter(),batchValidationJobTitle:this.title,batchValidationJobCreatedBy:this.createdBy,f:"json"}},toJSONEditParameters:function(){return{batchValidationSettings:this._toJSONBVSettingsParameter(),
schedule:this._toJSONBVScheduleParameter(),batchValidationJobTitle:this.title,batchValidationJobCreatedBy:this.createdBy,f:"json"}},_toJSONBVSettingsParameter:function(){return b.stringify(null!==this.analysisArea?{batchJobFileItemId:this.fileItemId,sessionId:this.sessionString,productionWorkspace:this.productionWorkspace,productionWorkspaceVersion:this.productionWorkspaceVersion,changedFeaturesOnly:this.changedFeaturesOnly,analysisArea:this.analysisArea}:{batchJobFileItemId:this.fileItemId,sessionId:this.sessionString,
productionWorkspace:this.productionWorkspace,productionWorkspaceVersion:this.productionWorkspaceVersion,changedFeaturesOnly:this.changedFeaturesOnly})},_toJSONBVScheduleParameter:function(){return b.stringify({cronExpression:this.cronExpression,endDate:this.executionEndDate,maxNumberOfExecutions:this.maxNumberOfExecutions})}});c("extend-esri")&&d.setObject("tasks.datareviewer.BatchValidationParameters",a,e);return a});