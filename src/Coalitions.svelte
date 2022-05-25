<div class="ep-coalitions">
   <div class="ep-coalitions-mobile-nav nav-prev" on:click="scroll('prev')">&laquo;</div> 
   <div class="ep-coalitions-wrapper" ref:wrapper>
      {{#each coalitions as coalition}}
         <div class="ep-coalition-box">
            <div class="flex-wrapper">
               <h3 class="ep-coalition-title" style="border-bottom: 3px solid {{coalition.color}};">{{coalition.label}}</h3>
               <div class="data-display" style="flex-direction: {{coalition.percent2 ? 'column':'row'}}">
                  <div class="percent-wrapper">
                     <small>{{branch}}</small>
                     <div class="percent">
                        {{coalition.percent.toString().replace('.',',')}}{{#if coalition.percent2}}-{{coalition.percent2.toString().replace('.',',')}}{{/if}}%
                     </div>
                  </div>
                  {{#if bothBranches}}
                  <span class="data-display-separator"></span>
                  <div class="percent-wrapper">
                  <small>Senato</small>
                     <div class="percent">
                     {{coalition.percentB.toString().replace('.',',')}}{{#if coalition.percent2B}}-{{coalition.percent2B.toString().replace('.',',')}}{{/if}}%
                     </div>
                  </div>
               {{/if}}
               </div>
               <div class="logo-wrapper">
                  {{#each coalition.lists as list}}
                     <div class="coalition-logo" style="background-image:url({{imagePath}}{{list.id}}.png);">
                     </div>
                  {{/each}}
               </div>
            </div>
         </div>
      {{/each}}
   </div> 
   <div class="ep-coalitions-mobile-nav nav-next" on:click="scroll('next')">&raquo;</div> 
   {{#if dataSource}}<small class="data-source">{{dataSource}}</small>{{/if}}
</div>
<script>
export default {
   oncreate: function() {
      // amp iframe resize ----------------
      window.parent.postMessage({
         sentinel: 'amp',
         type: 'embed-size',
         height: document.body.scrollHeight
      }, '*');
      // ----------------------------------
   },
   computed:{
      bothBranches: function(type){
         return type ? false : true
      },
      branch: function(type){
         return type  ? type : 'Camera';
      },
      coalitions: function(figures, figures2, configList, limit){
         const out = figures.map(el =>{
            el.color = configList[el.id].color;
            el.label = configList[el.id].label;
            if(figures2){
               var listObjectB = figures2.filter(list => list.id===el.id)[0];
               el.percentB = listObjectB ? listObjectB.percent : '';
               el.percent2B = listObjectB ? listObjectB.percent2 : '';
            }
            var displayLists = el.lists.map(list => {
               var listId = Object.keys(list)[0];
               list.id = listId;
               list.percent = list[listId];
               list.label = configList[listId].short_label;
               list.color = configList[listId].color;
               // list.logo = ??? TO DO
               return list;
            }).sort(function(a,b){
               return b.percent-a.percent;
            });
            el.lists = displayLists;
            return el;
         }).filter((el, i)=>{
            if(limit > 0){
               return i<limit
            }else{
               return true
            }
         })
         return out;
      }
   },

   methods:{
      scroll: function(dir){
         var wrap = this.refs.wrapper,
         w = wrap.clientWidth/2,
         currentScroll = wrap.scrollLeft,
         newPos;
         if(dir === 'prev'){
            newPos = currentScroll-w > 0 ? currentScroll-w : 0;
         }else{
            newPos = currentScroll+w < w*2 ? currentScroll+w : w*2;
         }
         this.animate(wrap, newPos, 400);
      },
      animate: function(wrap, newPos, duration){
         // wrap.scrollLeft = newPos;
         var easing = this.easing;
         var start = wrap.scrollLeft,
         change = newPos - start,
         currentTime = 0,
         increment = 20;
         var animateScroll = function(){        
            currentTime += increment;
            var val = easing(currentTime, start, change, duration);
            wrap.scrollLeft = val;
            if(currentTime < duration) {
               setTimeout(animateScroll, increment);
            }
         };
         animateScroll();
      },
      easing: function(t, b, c, d){
         t /= d/2;
         if (t < 1) return c/2*t*t + b;
         t--;
         return -c/2 * (t*(t-2) - 1) + b;
      }
   }
}
</script>
<style>
   .ep-coalitions{font-family: 'open sans condensed'; position:relative; border-bottom:3px solid #ddd; padding-bottom:1em; margin-bottom:1em;}
   .ep-coalitions-wrapper,
   .ep-more-lists{display:flex; justify-content:space-between; flex-wrap:wrap; position:relative;}
   .ep-coalitions-mobile-nav{display:none;}
   .ep-coalition-box {
      box-sizing:border-box;
      flex: 1 0 10%;
      border: 1px solid #ddd;
      margin: 0.3em;
      border-radius: 5px;
      background: #f9f9f9;
      box-shadow: 10px 0px 14px -8px #ccc;
      overflow:hidden;
   }
   .data-display{display:flex; justify-content:space-evenly; flex-direction:column; position:relative; padding: .5em .3em;}
   .data-display-separator {
      width: 2px;
      height: 2em;
      top:3px;
      background: #ddd;
      position: relative;
      align-self: center;
   }
.percent-wrapper{text-align:center;}
   .logo-wrapper{display:flex; justify-content:center; padding:.2em;}
   .coalition-logo{width:35px; height:35px; background-color:#efefef; display:inline-block; border-radius:50%; margin:4px; border:1px solid #ddd; background-size:cover; background-position:center; background-repeat:no-repeat;}
   h3.ep-coalition-title {text-align: center; margin: 0; padding: .4em; background: #ddd; font-size:1em; text-transform:uppercase;
    background: #efefef;}
   .ep-horizontal-bar-table{width:100%; font-size:.8em; box-sizing:border-box; padding: .5em .2em;}
   .ep-horizontal-bar-table td{border-bottom:1px solid #ddd; padding:.1em;}
   .ep-horizontal-bar-graph{position:relative;}
   .graph{height:12px; overflow:visible;}
   .graph > span{position:absolute; right:0;}
   .ep-horizontal-bar-list{width:1%; white-space:nowrap; text-align:right;}
   .percent{font-size:1.8em; text-align:center; line-height:1;}
   .percent small{display:block; font-size:.4em; line-height:1; color:#999;}
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: sans-serif; padding: .5em;}

   @media screen and (max-width:820px){.ep-coalition-box {flex: 0 1 48%; min-width:48%;}}
   @media screen and (max-width:610px){
      .ep-coalitions-wrapper{flex-wrap:nowrap; overflow:auto;}
      .ep-coalition-box { min-width:47%;}
      .coalition-logo{idth:30px; height:30px;}
      .bar-wrapper{display:none;}
      .ep-coalitions-mobile-nav {
         display: inline-block;
         z-index: 2;
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         font-size: 1.7em;
         line-height: 1;
         background: rgba(0,0,0,0.4);
         border-radius: 50%;
         color: #fff;
         width: 34px;
         height: 34px;
         text-align: center;
         border: 1px solid rgba(255,255,255,0.9);
      }
      .nav-prev{left:0}
      .nav-next{right:0}
      }
      @media (max-width:700px){
         .data-display{flex-direction:column}
         .data-display-separator { display:none;}
      }
</style>
