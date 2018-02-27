// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/iso/base/GmiDocumentType","dojo/_base/declare dojo/_base/lang dojo/has ./IsoDocumentType ./GmiRoot dojo/i18n!../../../nls/i18nIso ../../../../../kernel".split(" "),function(a,c,d,e,f,b,g){a=a(e,{caption:b.documentTypes.gmi.caption,description:b.documentTypes.gmi.description,key:"iso-19115-2",isService:!1,isGmi:!0,metadataStandardName:"ISO 19115-2 Geographic Information - Metadata Part 2 Extensions for imagery and gridded data",metadataStandardVersion:"ISO 19115-2:2009(E)",
initializeNamespaces:function(){this.addNamespace("gmi","http://www.isotc211.org/2005/gmi");this.addNamespace("gmd","http://www.isotc211.org/2005/gmd");this.addNamespace("gco","http://www.isotc211.org/2005/gco");this.addNamespace("srv","http://www.isotc211.org/2005/srv");this.addNamespace("gss","http://www.isotc211.org/2005/gss");this.addNamespace("gml","http://www.opengis.net/gml/3.2");this.addNamespace("xlink","http://www.w3.org/1999/xlink")},newRootDescriptor:function(){return new f}});d("extend-esri")&&
c.setObject("dijit.metadata.types.iso.base.GmiDocumentType",a,g);return a});