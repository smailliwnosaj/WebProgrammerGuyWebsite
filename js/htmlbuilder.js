

// SQUIRRELY version 7

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).Sqrl={})}(this,function(e){"use strict";var n={},r={},t=/{{ *?(?:(?:([\w$]+) *?\((.*?)\) *?([\w$]*))|(?:([\w$]+) *?\((.*?)\) *?\/)|(?:([\w$@].*?) *?((?:\| *?[\w$]+ *)*))|(?:\/ *?([\w$]+))|(?:# *?([\w$]+))|(?:!--[^]+?--)) *?}}\n?/g,i={s:"{{",e:"}}"},a=/@(?:((?:\.\.\/)+)|([\w$]+):)?/g,l=t,o=i;function s(e,n){var r=e+l.source.slice(o.s.length,0-(o.e.length+3))+n+"\\n?",t=l.lastIndex;o={s:e,e:n},(l=RegExp(r,"g")).lastIndex=t}function f(e,n,r){return e.replace(a,function(e,t,i){return"hvals"+(t&&t.length?n[r-t.length/3-1].id:i||"")+"."})}var u={if:{helperStart:function(e){return"if("+e+"){"},helperEnd:function(){return"}"},blocks:{else:function(){return"}else{"}}},each:{helperStart:function(e,n){return"for(var i=0;i<"+e+".length; i++){tR+=(function(hvals){var tR='';var hvals"+n+"=hvals;"},helperEnd:function(e){return"return tR})({this:"+e+"[i],index:i})};"}},foreach:{helperStart:function(e,n){return"for(var key in "+e+"){if(!"+e+".hasOwnProperty(key)) continue;tR+=(function(hvals){var tR='';var hvals"+n+"=hvals;"},helperEnd:function(e){return"return tR})({this:"+e+"[key], key: key})};"}},log:{selfClosing:function(e){return"console.log("+e+");"}},tags:{selfClosing:function(e){return s(e.slice(0,e.indexOf(",")).trim(),e.slice(e.indexOf(",")+1).trim()),""}},js:{selfClosing:function(e){return e+";"}}},c={"&":"&amp;","<":"&lt;",'"':"&quot;","'":"&#39;"};function v(e){return c[e]}var d=/[&<"']/g,h=/[&<"']/,p={e:function(e){var n=String(e);return h.test(n)?n.replace(d,v):n}},g={},y={start:"",end:""};var x=!0;function R(e,n){var r,t=!1,i="",a="";if(n&&""!==n){r=n.split("|");for(var l=0;l<r.length;l++)r[l]=r[l].trim(),""!==r[l]&&("safe"!==r[l]?(i="Sqrl.F."+r[l]+"("+i,a+=")"):t=!0)}return i+=y.start,a+=y.end,!t&&x&&(i+="Sqrl.F.e(",a+=")"),i+e+a}function w(e){var n,a=0,s="var tR='';",c=[],v=-1,d=0,h={};function p(n){a!==n&&(s+="tR+='"+e.slice(a,n).replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"';")}function g(e,n){var r=f(e,c,v);return"@"===e[0]?R(r,n):R("options."+r,n)}for(o=i,(l=t).lastIndex=0;null!==(n=l.exec(e));)if(p(n.index),a=n[0].length+n.index,n[1]){var y=n[3];""!==y&&null!==y||(y=d,d++);var x=u.hasOwnProperty(n[1]);v+=1;var w=n[2]||"";w=f(w,c,v),x||(w="["+w+"]");var m={name:n[1],id:y,params:w,native:x};c[v]=m,x?(s+=u[n[1]].helperStart(w,y),a=l.lastIndex):s+="tR+=Sqrl.H."+n[1]+"("+w+",function(hvals){var hvals"+y+"=hvals;var tR='';"}else if(n[4]){var P=n[5]||"";if(P=f(P,c,v),"include"===n[4]){var S=e.slice(0,n.index),F=e.slice(n.index+n[0].length),O=P.replace(/'|"/g,""),$=r[O];e=S+$+F,a=l.lastIndex=n.index}else u.hasOwnProperty(n[4])&&u[n[4]].hasOwnProperty("selfClosing")?(s+=u[n[4]].selfClosing(P),a=l.lastIndex):s+="tR+=Sqrl.H."+n[4]+"("+P+");"}else if(n[6])s+="tR+="+g(n[6],n[7])+";";else if(n[8]){var k=c[v];k&&k.name===n[8]?(v-=1,!0===k.native?s+=u[k.name].helperEnd(k.params,k.id):h[k.id]?s+="return tR}});":s+="return tR});"):console.error("Helper beginning & end don't match.")}else if(n[9]){var q=c[v];if(q.native){var H=u[q.name];H.blocks&&H.blocks[n[9]]?(s+=H.blocks[n[9]](q.id),a=l.lastIndex):console.warn("Native helper '%s' doesn't accept that block.",q.name)}else h[q.id]?s+="return tR},"+n[9]+":function(hvals){var hvals"+q.id+"=hvals;var tR='';":(s+="return tR},{"+n[9]+":function(hvals){var hvals"+q.id+"=hvals;var tR='';",h[q.id]=!0)}return p(e.length),s+="return tR",new Function("options","Sqrl",s.replace(/\n/g,"\\n").replace(/\r/g,"\\r"))}var m={};function P(e,n){var r=e.$file,t=e.$name,i=e.$cache;if(r){var a=require("fs");return!1!==i?(m.hasOwnProperty(r)||(m[r]=w(a.readFileSync(r,"utf8"))),m[r]):w(a.readFileSync(r,"utf8"))}return"string"==typeof n?t&&!1!==i?(m.hasOwnProperty(t)||(m[t]=w(n)),m[t]):!0===i?(m.hasOwnProperty(n)||(m[n]=w(n)),m[n]):w(n):t&&!1!==i&&m.hasOwnProperty(t)?m[t]:"No template"}function S(e,t){return t.$file=e,P(t)(t,{H:n,F:p,P:r})}e.Compile=w,e.F=p,e.H=n,e.P=r,e.Render=function(e,t){return"function"==typeof e?e(t,{H:n,F:p,P:r}):"string"==typeof e?P(t,e)(t,{H:n,F:p,P:r}):void 0},e.__express=function(e,n,r){return r(null,S(e,n))},e.autoEscaping=function(e){return x=e},e.defaultTags=function(e){s(e[0],e[1]),t=l,i=o},e.defineFilter=function(e,n){p[e]=n},e.defineHelper=function(e,r){n[e]=r},e.defineNativeHelper=function(e,n){u[e]=n},e.definePartial=function(e,n){r[e]=n},e.load=P,e.renderFile=S,e.setDefaultFilters=function(e){if("clear"===e)g={};else for(var n in e)e.hasOwnProperty(n)&&(g[n]=e[n]);!function(){for(var e in y={start:"",end:""},g)g.hasOwnProperty(e)&&g[e]&&(y.start+="Sqrl.F."+e+"(",y.end+=")")}()},Object.defineProperty(e,"__esModule",{value:!0})});



// HTML BUILDER FOR SQUIRRELY
var htmlBuilder = {
    _templates: [],
	_getTemplate: function(id) {
		for	(var i=0; i < htmlBuilder._templates.length; i++) {
			if (htmlBuilder._templates[i].id == id) 
				return htmlBuilder._templates[i].html;
		}
		var html = document.getElementById(id).innerHTML;
		htmlBuilder._templates.push({id:id,html:html});
		return html;
	},
	append: function(targetId, dataArray) {
		var html = "";
		for	(var i=0; i < dataArray.length; i++) {
			html += Sqrl.Render(htmlBuilder._getTemplate(dataArray[i].template), dataArray[i]);
		}	
		document.getElementById(targetId).innerHTML = document.getElementById(targetId).innerHTML + html;
	},
	insert: function(element, parent, templateId) {
		var peers = parent.children;
		var index = 0;
		for	(var i=0; i < peers.length; i++) {
			if (peers[i] == element) {
				break;
			}
			index++;
		}
		
		var template = htmlBuilder._getTemplate(templateId);
		parser = new DOMParser();
		var html = Sqrl.Render(template, []);
		var parsedHtml = parser.parseFromString(html,"text/html");
		var newElement = parsedHtml.all[3];
		
		parent.insertBefore(newElement, peers[index]);
	},
	update: function(element, dataObject) {
		var template = htmlBuilder._getTemplate(dataObject.template);
		var html = Sqrl.Render(template, dataObject);
		element.outerHTML = html;
	},
	delete: function(element) {
		element.outerHTML = "";
	}
}



