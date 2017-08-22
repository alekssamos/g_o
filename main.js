
function _objToHtml(_o){
if(typeof(_o)!="object"){ return false; }
var _tmp, dt;
_tmp="<ul class='for_in lvl1'>\n";
for (x in _o){
_typeof = typeof(_o[x]);
_tmp+="<li><span class='propname'>"+x+"</span> <span class='proptypeof'>"+_typeof+"</span> <span class='proplength'>"+(_o[x].length||0)+"</span> <span class='propq'>=&gt;</span> ";
if(_typeof!="object"){
if(_typeof=="string"){_tmp+='"';}
_tmp+="<span class='propvalue'>"+_o[x]+"</span>";
if(_typeof=="string"){_tmp+='"';}
_tmp+=" <span class='comment'>";
if(_typeof=="number"&&x=="date"){
dt = new Date(_o[x]*1000);
_tmp+=dt.getDate()+"."+parseInt(dt.getMonth()+1)+"."+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
}
if(_typeof=="string"&&(x=="url")){
_tmp+="<a target='_blank' href='"+_o[x]+"'>&gt;&gt;</a>";
}
_tmp+="</span>";
}
if(_typeof=="object"){ _tmp += _objToHtml(_o[x]); }
_tmp+="</li>\n";
}
return _tmp;
}

function _getElementByClass(_elem, _class){
return _elem.getElementsByClassName(_class)[0] || _elem.querySelector("."+_class);
}

function _appendHtml(_elem, _content){
if(_elem.nodeType!=1){return false;}
return _elem.innerHTML = _elem.innerHTML + _content;
}

window.onload=function(){
document.getElementById("frm1").onsubmit=function(){ subm(); return false; };
};
function subm(){
var el=document.getElementById("result1"), inp=document.getElementById("_txt_");
var tmp, strvalue1="", str1="", ex, str2="";
var re1 = /([a-z0-9_.-]{1,60})/i;
var re2 = /wall([\d-]{1,15}_[\d]{1,15})/i;
el.innerHTML="";
strvalue1=inp.value
strvalue1=strvalue1.replace(/(http.*?vk\.com\/|.*?vk\.com\/)/i,"");
if(re2.test(strvalue1)){
ex = re2.exec(strvalue1);
str2 = ex[1];
_appendHtml(el, "post: "+str2+"<br>");
VK.api("wall.getById", {"posts": str2.replace("wall", "")}, function (data) { 
_obj1 = data.response[0];
_appendHtml(el, _obj1.post_source.type ? "post_source.type: "+_obj1.post_source.type+"; " : "");
_appendHtml(el, _obj1.post_source.platform ? "post_source.platform: "+_obj1.post_source.platform+"; " : "");
_appendHtml(el, _obj1.post_source.url ? "post_source.url: <a target='_blank' href='"+_obj1.post_source.url+"'>"+_obj1.post_source.url+"</a>; " : "");
_appendHtml(el, _obj1.post_source.data ? "post_source.data: "+_obj1.post_source.data+"; " : "");
_appendHtml(el, "<div class='apiresponsesourceraw' style='display:none;'>"+ _objToHtml(_obj1) +"</div>");
_appendHtml(el, "<br><a href='javascript:void(0);' onclick='this.style.display=\"none\"; _getElementByClass(document, \"apiresponsesourceraw\").style.display=\"block\";'>показать все поля</a>");
});
return true;
}
if(re1.test(strvalue1)){
ex = re1.exec(strvalue1);
str1 = ex[1];
_appendHtml(el, "page: "+str1+"<br>");
VK.api("users.get", {"fields": "online", "user_ids": str1}, function (data) { 
_appendHtml(el, data.response[0].online ? "Online " : "Offline ");
_appendHtml(el, data.response[0].online_mobile ? "mobile " : "");
_appendHtml(el, data.response[0].online_app ? "<a target='_blank' href='https://vk.com/app"+data.response[0].online_app+"'>app"+data.response[0].online_app+"</a>" : "");
_appendHtml(el, "<div class='apiresponsesourceraw' style='display:none;'>"+ _objToHtml(_obj1) +"</div>");
_appendHtml(el, "<br><a href='javascript:void(0);' onclick='this.style.display=\"none\"; _getElementByClass(document, \"apiresponsesourceraw\").style.display=\"block\";'>показать все поля</a>");
});
return true;
}
el.innerHTML="Не поддерживается. Не правильный формат.";
return false;
}
