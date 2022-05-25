"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Widget=function(){var e={scroll:function(e){var t,i=this.refs.wrapper,n=i.clientWidth/2,o=i.scrollLeft;t="prev"===e?0<o-n?o-n:0:o+n<2*n?o+n:2*n,this.animate(i,t,400)},animate:function(i,e,n){var o=this.easing,a=i.scrollLeft,l=e-a,r=0;!function e(){var t=o(r+=20,a,l,n);i.scrollLeft=t,r<n&&setTimeout(e,20)}()},easing:function(e,t,i,n){return(e/=n/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t}};function v(a,t){for(var n,o,l,r,c,s,p,d,u,f,h,v,m,g,b,_,x=t.coalition,y=(t.each_value,t.coalition_index,x.label),w=x.percent.toString().replace(".",","),k=x.percent2&&N(a,t),S=t.bothBranches&&B(a,t),e=x.lists,z=[],i=0;i<e.length;i+=1)z[i]=L(a,j(j({},t),{each_value_1:e,list:e[i],list_index:i}));return{c:function(){n=C("div"),o=C("div"),l=C("h3"),r=E(y),c=E("\r\n               "),s=C("div"),p=C("div"),d=C("small"),u=E(t.branch),f=E("\r\n                     "),h=C("div"),v=E(w),k&&k.c(),m=E("%"),g=E("\r\n                  "),S&&S.c(),b=E("\r\n               "),_=C("div");for(var e=0;e<z.length;e+=1)z[e].c();this.h()},h:function(){l.className="ep-coalition-title",H(l,"border-bottom","3px solid "+x.color),h.className="percent",p.className="percent-wrapper",s.className="data-display",H(s,"flex-direction",x.percent2?"column":"row"),_.className="logo-wrapper",o.className="flex-wrapper",n.className="ep-coalition-box"},m:function(e,t){O(n,e,t),P(o,n),P(l,o),P(r,l),P(c,o),P(s,o),P(p,s),P(d,p),P(u,d),P(f,p),P(h,p),P(v,h),k&&k.m(h,null),P(m,h),P(g,s),S&&S.m(s,null),P(b,o),P(_,o);for(var i=0;i<z.length;i+=1)z[i].m(_,null)},p:function(e,t){x=t.coalition,t.each_value,t.coalition_index,e.coalitions&&y!==(y=x.label)&&(r.data=y),e.coalitions&&H(l,"border-bottom","3px solid "+x.color),e.branch&&(u.data=t.branch),e.coalitions&&w!==(w=x.percent.toString().replace(".",","))&&(v.data=w),x.percent2?k?k.p(e,t):((k=N(a,t)).c(),k.m(h,m)):k&&(k.u(),k.d(),k=null),t.bothBranches?S?S.p(e,t):((S=B(a,t)).c(),S.m(s,null)):S&&(S.u(),S.d(),S=null),e.coalitions&&H(s,"flex-direction",x.percent2?"column":"row");var i=x.lists;if(e.imagePath||e.coalitions){for(var n=0;n<i.length;n+=1){var o=j(j({},t),{each_value_1:i,list:i[n],list_index:n});z[n]?z[n].p(e,o):(z[n]=L(a,o),z[n].c(),z[n].m(_,null))}for(;n<z.length;n+=1)z[n].u(),z[n].d();z.length=i.length}},u:function(){T(n),k&&k.u(),S&&S.u();for(var e=0;e<z.length;e+=1)z[e].u()},d:function(){k&&k.d(),S&&S.d(),W(z)}}}function N(e,t){var i,n,o=t.coalition,a=(t.each_value,t.coalition_index,o.percent2.toString().replace(".",","));return{c:function(){i=E("-"),n=E(a)},m:function(e,t){O(i,e,t),O(n,e,t)},p:function(e,t){o=t.coalition,t.each_value,t.coalition_index,e.coalitions&&a!==(a=o.percent2.toString().replace(".",","))&&(n.data=a)},u:function(){T(i),T(n)},d:l}}function f(e,t){var i,n,o=t.coalition,a=(t.each_value,t.coalition_index,o.percent2B.toString().replace(".",","));return{c:function(){i=E("-"),n=E(a)},m:function(e,t){O(i,e,t),O(n,e,t)},p:function(e,t){o=t.coalition,t.each_value,t.coalition_index,e.coalitions&&a!==(a=o.percent2B.toString().replace(".",","))&&(n.data=a)},u:function(){T(i),T(n)},d:l}}function B(e,t){var i,n,o,a,l,r,c,s,p=t.coalition,d=(t.each_value,t.coalition_index,p.percentB.toString().replace(".",",")),u=p.percent2B&&f(0,t);return{c:function(){i=C("span"),n=E("\r\n                  "),o=C("div"),(a=C("small")).textContent="Senato",l=E("\r\n                     "),r=C("div"),c=E(d),u&&u.c(),s=E("%"),this.h()},h:function(){i.className="data-display-separator",r.className="percent",o.className="percent-wrapper"},m:function(e,t){O(i,e,t),O(n,e,t),O(o,e,t),P(a,o),P(l,o),P(r,o),P(c,r),u&&u.m(r,null),P(s,r)},p:function(e,t){p=t.coalition,t.each_value,t.coalition_index,e.coalitions&&d!==(d=p.percentB.toString().replace(".",","))&&(c.data=d),p.percent2B?u?u.p(e,t):((u=f(0,t)).c(),u.m(r,s)):u&&(u.u(),u.d(),u=null)},u:function(){T(i),T(n),T(o),u&&u.u()},d:function(){u&&u.d()}}}function L(e,t){t.coalition,t.each_value,t.coalition_index;var i,n=t.list;t.each_value_1,t.list_index;return{c:function(){i=C("div"),this.h()},h:function(){i.className="coalition-logo",H(i,"background-image","url("+t.imagePath+n.id+".png)")},m:function(e,t){O(i,e,t)},p:function(e,t){t.coalition,t.each_value,t.coalition_index,n=t.list,t.each_value_1,t.list_index,(e.imagePath||e.coalitions)&&H(i,"background-image","url("+t.imagePath+n.id+".png)")},u:function(){T(i)},d:l}}function m(e,t){var i,n;return{c:function(){i=C("small"),n=E(t.dataSource),this.h()},h:function(){i.className="data-source"},m:function(e,t){O(i,e,t),P(n,i)},p:function(e,t){e.dataSource&&(n.data=t.dataSource)},u:function(){T(i)},d:l}}function t(e){var t,i,n;i=e,(t=this)._handlers=Object.create(null),t._bind=i._bind,t.options=i,t.root=i.root||t,t.store=t.root.store||i.store,this.refs={},this._state=j({},e.data),this._recompute({type:1,figures:1,figures2:1,configList:1,limit:1},this._state),document.getElementById("svelte-12lc74i-style")||((n=C("style")).id="svelte-12lc74i-style",n.textContent=".svelte-12lc74i.ep-coalitions,.svelte-12lc74i .ep-coalitions{font-family:'open sans condensed';position:relative;border-bottom:3px solid #ddd;padding-bottom:1em;margin-bottom:1em}.svelte-12lc74i.ep-coalitions-wrapper,.svelte-12lc74i .ep-coalitions-wrapper,.svelte-12lc74i.ep-more-lists,.svelte-12lc74i .ep-more-lists{display:flex;justify-content:space-between;flex-wrap:wrap;position:relative}.svelte-12lc74i.ep-coalitions-mobile-nav,.svelte-12lc74i .ep-coalitions-mobile-nav{display:none}.svelte-12lc74i.ep-coalition-box,.svelte-12lc74i .ep-coalition-box{box-sizing:border-box;flex:1 0 10%;border:1px solid #ddd;margin:0.3em;border-radius:5px;background:#f9f9f9;box-shadow:10px 0px 14px -8px #ccc;overflow:hidden}.svelte-12lc74i.data-display,.svelte-12lc74i .data-display{display:flex;justify-content:space-evenly;flex-direction:column;position:relative;padding:.5em .3em}.svelte-12lc74i.data-display-separator,.svelte-12lc74i .data-display-separator{width:2px;height:2em;top:3px;background:#ddd;position:relative;align-self:center}.svelte-12lc74i.percent-wrapper,.svelte-12lc74i .percent-wrapper{text-align:center}.svelte-12lc74i.logo-wrapper,.svelte-12lc74i .logo-wrapper{display:flex;justify-content:center;padding:.2em}.svelte-12lc74i.coalition-logo,.svelte-12lc74i .coalition-logo{width:35px;height:35px;background-color:#efefef;display:inline-block;border-radius:50%;margin:4px;border:1px solid #ddd;background-size:cover;background-position:center;background-repeat:no-repeat}h3.svelte-12lc74i.ep-coalition-title,.svelte-12lc74i h3.ep-coalition-title{text-align:center;margin:0;padding:.4em;background:#ddd;font-size:1em;text-transform:uppercase;background:#efefef}.svelte-12lc74i.ep-horizontal-bar-table,.svelte-12lc74i .ep-horizontal-bar-table{width:100%;font-size:.8em;box-sizing:border-box;padding:.5em .2em}.svelte-12lc74i.ep-horizontal-bar-table td,.svelte-12lc74i .ep-horizontal-bar-table td{border-bottom:1px solid #ddd;padding:.1em}.svelte-12lc74i.ep-horizontal-bar-graph,.svelte-12lc74i .ep-horizontal-bar-graph{position:relative}.svelte-12lc74i.graph,.svelte-12lc74i .graph{height:12px;overflow:visible}.svelte-12lc74i.graph > span,.svelte-12lc74i .graph > span{position:absolute;right:0}.svelte-12lc74i.ep-horizontal-bar-list,.svelte-12lc74i .ep-horizontal-bar-list{width:1%;white-space:nowrap;text-align:right}.svelte-12lc74i.percent,.svelte-12lc74i .percent{font-size:1.8em;text-align:center;line-height:1}.svelte-12lc74i.percent small,.svelte-12lc74i .percent small{display:block;font-size:.4em;line-height:1;color:#999}.svelte-12lc74i.data-source,.svelte-12lc74i .data-source{display:block;text-align:right;font-size:.8em;color:#999;font-family:sans-serif;padding:.5em}@media screen and (max-width:820px){.svelte-12lc74i.ep-coalition-box,.svelte-12lc74i .ep-coalition-box{flex:0 1 48%;min-width:48%}}@media screen and (max-width:610px){.svelte-12lc74i.ep-coalitions-wrapper,.svelte-12lc74i .ep-coalitions-wrapper{flex-wrap:nowrap;overflow:auto}.svelte-12lc74i.ep-coalition-box,.svelte-12lc74i .ep-coalition-box{min-width:47%}.svelte-12lc74i.coalition-logo,.svelte-12lc74i .coalition-logo{idth:30px;height:30px}.svelte-12lc74i.bar-wrapper,.svelte-12lc74i .bar-wrapper{display:none}.svelte-12lc74i.ep-coalitions-mobile-nav,.svelte-12lc74i .ep-coalitions-mobile-nav{display:inline-block;z-index:2;position:absolute;top:50%;transform:translateY(-50%);font-size:1.7em;line-height:1;background:rgba(0,0,0,0.4);border-radius:50%;color:#fff;width:34px;height:34px;text-align:center;border:1px solid rgba(255,255,255,0.9)}.svelte-12lc74i.nav-prev,.svelte-12lc74i .nav-prev{left:0}.svelte-12lc74i.nav-next,.svelte-12lc74i .nav-next{right:0}}@media(max-width:700px){.svelte-12lc74i.data-display,.svelte-12lc74i .data-display{flex-direction:column}.svelte-12lc74i.data-display-separator,.svelte-12lc74i .data-display-separator{display:none}}",P(n,document.head));var o=this;e.root||(this._oncreate=[]),this._fragment=function(a,e){var l,n,o,r,c,s,p;function t(e){a.scroll("prev")}for(var i=e.coalitions,d=[],u=0;u<i.length;u+=1)d[u]=v(a,j(j({},e),{each_value:i,coalition:i[u],coalition_index:u}));function f(e){a.scroll("next")}var h=e.dataSource&&m(0,e);return{c:function(){l=C("div"),(n=C("div")).textContent="«",o=E(" \r\n   "),r=C("div");for(var e=0;e<d.length;e+=1)d[e].c();c=E(" \r\n   "),(s=C("div")).textContent="»",p=E(" \r\n   "),h&&h.c(),this.h()},h:function(){g(n,"click",t),n.className="ep-coalitions-mobile-nav nav-prev",r.className="ep-coalitions-wrapper",g(s,"click",f),s.className="ep-coalitions-mobile-nav nav-next",l.className="ep-coalitions svelte-12lc74i"},m:function(e,t){O(l,e,t),P(n,l),P(o,l),P(r,l);for(var i=0;i<d.length;i+=1)d[i].m(r,null);a.refs.wrapper=r,P(c,l),P(s,l),P(p,l),h&&h.m(l,null)},p:function(e,t){var i=t.coalitions;if(e.coalitions||e.branch||e.bothBranches||e.imagePath){for(var n=0;n<i.length;n+=1){var o=j(j({},t),{each_value:i,coalition:i[n],coalition_index:n});d[n]?d[n].p(e,o):(d[n]=v(a,o),d[n].c(),d[n].m(r,null))}for(;n<d.length;n+=1)d[n].u(),d[n].d();d.length=i.length}t.dataSource?h?h.p(e,t):((h=m(0,t)).c(),h.m(l,null)):h&&(h.u(),h.d(),h=null)},u:function(){T(l);for(var e=0;e<d.length;e+=1)d[e].u();h&&h.u()},d:function(){b(n,"click",t),W(d),a.refs.wrapper===r&&(a.refs.wrapper=null),b(s,"click",f),h&&h.d()}}}(this,this._state),this.root._oncreate.push(function(){(function(){window.parent.postMessage({sentinel:"amp",type:"embed-size",height:document.body.scrollHeight},"*")}).call(o),o.fire("update",{changed:{type:1,figures:1,figures2:1,configList:1,limit:1,coalitions:1,branch:1,bothBranches:1,imagePath:1,dataSource:1},current:o._state})}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),a(this._oncreate))}function C(e){return document.createElement(e)}function P(e,t){t.appendChild(e)}function j(e,t){for(var i in t)e[i]=t[i];return e}function E(e){return document.createTextNode(e)}function g(e,t,i){e.addEventListener(t,i,!1)}function O(e,t,i){t.insertBefore(e,i)}function T(e){e.parentNode.removeChild(e)}function b(e,t,i){e.removeEventListener(t,i,!1)}function W(e){for(var t=0;t<e.length;t+=1)e[t]&&e[t].d()}function H(e,t,i){e.style.setProperty(t,i)}function l(){}function a(e){for(;e&&e.length;)e.shift()()}function i(e){this.destroy=l,this.fire("destroy"),!(this.set=this.get=l)!==e&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}return j(t.prototype,{destroy:i,get:function(e){return e?this._state[e]:this._state},fire:function(e,t){var i=e in this._handlers&&this._handlers[e].slice();if(!i)return;for(var n=0;n<i.length;n+=1){var o=i[n];o.__calling||(o.__calling=!0,o.call(this,t),o.__calling=!1)}},observe:function(t,e,i){var n=e.bind(this);i&&!1===i.init||n(this.get()[t],void 0);return this.on(i&&i.defer?"update":"state",function(e){e.changed[t]&&n(e.current[t],e.previous&&e.previous[t])})},on:function(e,t){if("teardown"===e)return this.on("destroy",t);var i=this._handlers[e]||(this._handlers[e]=[]);return i.push(t),{cancel:function(){var e=i.indexOf(t);~e&&i.splice(e,1)}}},set:function(e){if(this._set(j({},e)),this.root._lock)return;this.root._lock=!0,a(this.root._beforecreate),a(this.root._oncreate),a(this.root._aftercreate),this.root._lock=!1},teardown:i,_set:function(e){var t=this._state,i={},n=!1;for(var o in e)this._differs(e[o],t[o])&&(i[o]=n=!0);if(!n)return;this._state=j(j({},t),e),this._recompute(i,this._state),this._bind&&this._bind(i,this._state);this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:t}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:t}))},_mount:function(e,t){this._fragment[this._fragment.i?"i":"m"](e,t||null)},_unmount:function(){this._fragment&&this._fragment.u()},_differs:function(e,t){return e!=e?t==t:e!==t||e&&"object"===(void 0===e?"undefined":_typeof(e))||"function"==typeof e}}),j(t.prototype,e),t.prototype._recompute=function(e,t){var i,n,o,a;e.type&&(this._differs(t.bothBranches,t.bothBranches=!t.type)&&(e.bothBranches=!0),this._differs(t.branch,t.branch=t.type||"Camera")&&(e.branch=!0)),(e.figures||e.figures2||e.configList||e.limit)&&this._differs(t.coalitions,t.coalitions=(i=t.figures,n=t.figures2,o=t.configList,a=t.limit,i.map(function(t){if(t.color=o[t.id].color,t.label=o[t.id].label,n){var e=n.filter(function(e){return e.id===t.id})[0];t.percentB=e?e.percent:"",t.percent2B=e?e.percent2:""}var i=t.lists.map(function(e){var t=Object.keys(e)[0];return e.id=t,e.percent=e[t],e.label=o[t].short_label,e.color=o[t].color,e}).sort(function(e,t){return t.percent-e.percent});return t.lists=i,t}).filter(function(e,t){return!(0<a)||t<a})))&&(e.coalitions=!0)},t}();