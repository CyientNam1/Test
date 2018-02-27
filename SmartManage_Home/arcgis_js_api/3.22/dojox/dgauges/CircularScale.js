//>>built
define("dojox/dgauges/CircularScale",["dojo/_base/declare","dojox/gfx","./ScaleBase","./_circularUtils"],function(t,q,u,d){return t("dojox.dgauges.CircularScale",u,{originX:50,originY:50,radius:50,startAngle:0,endAngle:180,orientation:"clockwise",constructor:function(){this.labelPosition="inside";this.addInvalidatingProperties("originX originY radius startAngle endAngle orientation".split(" "))},_getOrientationNum:function(){return"cclockwise"==this.orientation?-1:1},positionForValue:function(a){var b=
d.computeTotalAngle(this.startAngle,this.endAngle,this.orientation);a=this.scaler.positionForValue(a);return d.modAngle(this.startAngle+this._getOrientationNum()*b*a,360)},_positionForTickItem:function(a){var b=d.computeTotalAngle(this.startAngle,this.endAngle,this.orientation);return d.modAngle(this.startAngle+this._getOrientationNum()*b*a.position,360)},valueForPosition:function(a){if(this.positionInRange(a))var b=d.modAngle(this._getOrientationNum()*(a-this.startAngle),360),e=d.computeTotalAngle(this.startAngle,
this.endAngle,this.orientation),b=b/e;else b=d.modAngle(this.startAngle-a,360),e=360-b,a=d.modAngle(this.endAngle-a,360),b=Math.min(b,e)<Math.min(a,360-a)?0:1;return this.scaler.valueForPosition(b)},positionInRange:function(a){if(this.startAngle==this.endAngle)return!0;a=d.modAngle(a,360);return 1==this._getOrientationNum()?this.startAngle<this.endAngle?a>=this.startAngle&&a<=this.endAngle:!(a>this.endAngle&&a<this.startAngle):this.startAngle<this.endAngle?!(a>this.startAngle&&a<this.endAngle):a>=
this.endAngle&&a<=this.startAngle},_distance:function(a,b,e,g){return Math.sqrt((e-a)*(e-a)+(g-b)*(g-b))},_layoutLabel:function(a,b,e,g,d,f,k){var l=this._getFont();b=q._base._getTextBox(b,{font:q.makeFontString(q.makeParameters(q.defaultFont,l))}).w;var l=q.normalizedLength(l.size),m=e+Math.cos(f)*d-b/2,n=g-Math.sin(f)*d-l/2,c,p=[];c=m;var h;h=-Math.tan(f)*c+g+Math.tan(f)*e;h>=n&&h<=n+l&&p.push({x:c,y:h});c=m+b;h=-Math.tan(f)*c+g+Math.tan(f)*e;h>=n&&h<=n+l&&p.push({x:c,y:h});c=n;h=-1/Math.tan(f)*
c+e+1/Math.tan(f)*g;h>=m&&h<=m+b&&p.push({x:h,y:c});c=n+l;h=-1/Math.tan(f)*c+e+1/Math.tan(f)*g;h>=m&&h<=m+b&&p.push({x:h,y:c});if("inside"==k)for(k=0;k<p.length;k++){if(c=p[k],c=this._distance(c.x,c.y,e,g)-d,0<=c){m=e+Math.cos(f)*(d-c)-b/2;n=g-Math.sin(f)*(d-c)-l/2;break}}else for(k=0;k<p.length;k++)if(c=p[k],c=this._distance(c.x,c.y,e,g)-d,0>=c){m=e+Math.cos(f)*(d-c)-b/2;n=g-Math.sin(f)*(d-c)-l/2;break}a&&a.setTransform([{dx:m+b/2,dy:n+l}])},refreshRendering:function(){this.inherited(arguments);
if(this._gfxGroup&&this.scaler){this.startAngle=d.modAngle(this.startAngle,360);this.endAngle=d.modAngle(this.endAngle,360);this._ticksGroup.clear();for(var a,b,e=this.scaler.computeTicks(),g,r=0;r<e.length;r++){b=e[r];a=this.tickShapeFunc(this._ticksGroup,this,b);g=this._gauge._computeBoundingBox(a);var f;f=b.position?this._positionForTickItem(b):this.positionForValue(b.value);a&&a.setTransform([{dx:this.originX,dy:this.originY},q.matrix.rotateg(f),{dx:this.radius-g.width-2*g.x,dy:0}]);if(b=this.tickLabelFunc(b)){a=
this._ticksGroup.createText({x:0,y:0,text:b,align:"middle"}).setFont(this._getFont()).setFill(this._getFont().color?this._getFont().color:"black");var k=this.radius,k="inside"==this.labelPosition?k-(g.width+this.labelGap):k+this.labelGap;this._layoutLabel(a,b,this.originX,this.originY,k,d.toRadians(360-f),this.labelPosition)}}for(var l in this._indicatorsIndex)this._indicatorsRenderers[l]=this._indicatorsIndex[l].invalidateRendering()}}})});