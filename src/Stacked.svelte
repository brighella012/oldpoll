
<div class="ep-horizontal-wrapper">
   <div class="ep-horizontal-stacked">
      <h4>{{title}}</h4>
      {{#if type =='seats'}}
         <div class="ep-horizontal-staked-median">Maggioranza: {{seats/2+1}} seggi su {{seats}}</div>
      {{/if}}
      <div class="ep-horizontal-stacked-track {{type==='percent' ? '':'show-median' }}">
      {{#each lists[0] as list, index}}
         <div 
            on:mousemove="showTooltip(event, list.tt, index)" 
            on:mouseleave="hideTooltip()"
            class="ep-horizontal-stacked-list {{'box-'+list.id}} {{visibleTooltip===list.tt ? 'show-tooltip':''}}"
            style="background: {{list.color}}; width: {{list.percent}}; transition-delay: {{list.delay}}">
               {{list.val}}{{type==='percent' ? '%':''}}
               <div class="tooltip" 
                  style="
                  top:{{tooltipTop}}px; 
                  left:{{tooltipLeft}}px; 
                  ">
                  {{#if list.id !== 'unassigned' && list.id !== 'centro-destra' && list.id !== 'centro-sinistra'}}
                  <img src="{{imagePath}}/{{list.id}}.png" alt="{{list.label}}"/>
                  {{/if}}
                  <h4>
                  {{list.label}}
                  </h4>
               </div>
         </div>
      {{/each}}
      </div>
      {{#if bothBranches}}
         <h4>{{title2 ? title2 : ''}}</h4>
         {{#if type =='seats'}}
            <div class="ep-horizontal-staked-median">Maggioranza: {{Math.ceil(seats2/2)}} seggi su {{seats2}}</div>
         {{/if}}
         <div class="ep-horizontal-stacked-track {{type==='percent' ? '':'show-median' }}">
         {{#each lists[1] as list}}
            <div 
               on:mousemove="showTooltip(event, list.tt)" 
               on:mouseleave="hideTooltip()"
               class="ep-horizontal-stacked-list {{'box-'+list.id}} {{visibleTooltip===list.tt ? 'show-tooltip':''}}"
               style="background: {{list.color}}; width: {{list.percent}}; transition-delay: {{list.delay}}">
                  {{list.val}}{{type==='percent' ? '%':''}}
                  <div class="tooltip" 
                     style="
                     top:{{tooltipTop}}px; 
                     left:{{tooltipLeft}}px; 
                     ">
                     {{#if list.id !== 'unassigned' && list.id !== 'centro-destra' && list.id !== 'centro-sinistra'}}
                     <img src="{{imagePath}}/{{list.id}}.png" alt="{{list.label}}"/>
                     {{/if}}
                     <h4>
                     {{list.label}} 
                     </h4>
                  </div>
            </div>
         {{/each}}
      </div>
      {{/if}}
      <div class="ep-filter-coalitions">
         {{#if simulations.length>0}}
            <h4 class="tit">Possibili Coalizioni</h4>
            {{#each simulations as coalition}}
            <div class="ep-coalition-item" on:click="filterBy(coalition.code, filterList, hideAll)">{{coalition.label}}</div> 
            {{/each}}
            <div class="ep-coalition-item" on:click="set({filterList:[]})">Vedi tutti</div>
         {{/if}}
      </div>
      {{#if dataSource}}<small class="data-source">{{dataSource}}</small>{{/if}}
      <div class="ep-stacked-dashboard">
         <div class="ep-legend">
            {{#each lists[0] as list}}
            {{#if list.val >0}}
            <div class="ep-legend-item">
               <span class="ep-legend-color" style="background: {{list.color}}"></span>{{list.label}}
            </div>
            {{/if}}
            {{/each}}
         </div>
      </div>
   </div>
</div>

<script>

export default {
      data: function(){
         return {
            seats: 100,
            type:'percent',
            threshold:3,
            filterList:[],
            hideAll: true,
            visibleTooltip:false,
            tooltipTop:0,
            tooltipLeft:0
         }
      },
      oncreate:function(){
         // set initial animation
         var app = this;
         setTimeout(function(){
            app.initialRendering();
            // amp iframe resize ----------------
            window.parent.postMessage({
               sentinel: 'amp',
               type: 'embed-size',
               height: document.body.scrollHeight
            }, '*');
            // ----------------------------------
         }, 0)
      },
      computed:{
         actualSeats: function(type, seats){
            return type === 'seats' ? seats : 100;
         },
         bothBranches: function(figures2){
            return figures2 ? true : false
         },
         rawList: function(figures, figures2, configList, threshold){
            function formatList(currentList){
               if(!currentList) return null;
               const out = currentList.map(list =>{
                  // label, color, percent, list, delay
                  list.label = configList[list.id].label;
                  list.short_label = configList[list.id].short_label;
                  list.color = configList[list.id].color;
                  list.political_pos = configList[list.id].political_pos;
                  return list;
               }).sort(function(a,b){
                  return a.political_pos - b.political_pos;
               })
               return out;
            }
            return [figures, figures2].map(list=>formatList(list));
         },
         lists: function(actualSeats, threshold, rawList, filterList, hideAll){
            return rawList.map((currentList, index)=>{
               if(currentList){
                  // initial state :: empty bars
                  function hideList(list){
                     list.percent = '0%';
                     list.delay = 0+'ms';
                     return list;
                  }
                  if(hideAll) return currentList.map(list => hideList(list));
                  var partial = 0;
                  var partialPerc = 0;
                  function getPercent(val){
                     var perc = (val/actualSeats)*100;
                     var roundedPerc = parseFloat(perc.toFixed(2));
                     return roundedPerc;
                  }
                  // colored output with correct percents
                  function showList(list, i){
                     if(list.id ==='unassigned'){
                        // alt (ie. other lists) gets computed with difference from total value 
                        // and percentages to fill bar to 100%
                        list.val = parseFloat((actualSeats - partial).toFixed(2));
                        list.percent = parseFloat((100 - partialPerc).toFixed(2))+'%';
                     }else{
                        // if seat are below threshold set them as 0, 
                        // so actual value get counted in alt (other lists)
                        var thresholdValue = (list.seats>=threshold) ? list.seats : 0
                        list.val = thresholdValue;
                        list.percent = getPercent(thresholdValue)+'%';
                        partial += list.val;
                        partialPerc += getPercent(thresholdValue);
                     }
                     list.delay = i*50+'ms';
                     list.tt = list.id+'_'+index;
                     return list
                  }
                  return currentList.map(function(list, i){
                     var filterIsEnabled = filterList.length > 0;
                     var currentListIsFiltered = filterList.indexOf(list.id) === -1;
                     if(filterIsEnabled && currentListIsFiltered){
                        return hideList(list, i);
                     }else{
                        return showList(list, i);
                     }
                  });
               }
            })
         },
         simulations: function(rawList, coalitions){
            return coalitions.map(function(coalition){
               var coalitionObj={}
               coalitionObj.code = coalition.split(',');
               coalitionObj.label = coalitionObj.code.map(function(id){
                  var label = rawList[0].filter(function(list){
                     return list.id === id;
                  }).map(function(list){
                     return list.short_label
                  });
                  return label;
               }).join(' + ');
               return coalitionObj;
            })
         }
      },
      methods: {
         initialRendering:function(hideAll){
            this.set({hideAll:false});
         },
         filterBy: function(coalitions, filterList, hideAll){
            var app = this;
            // all this mess to have a smooth animation
            if(filterList.length > 0){
               app.set({hideAll:true})
            }
            setTimeout(function(){
               app.set({filterList: coalitions, hideAll:false})
            }, 250)
         },
         showTooltip: function(e, id, index){
            this.set({tooltipTop:e.offsetY+10, tooltipLeft: e.offsetX+10, visibleTooltip:id});
         },
         hideTooltip: function(){
            this.set({
               visibleTooltip: false
            });
         }
      }
}
</script>
<style>
   .ep-horizontal-wrapper{font-family: 'open sans condensed';}
   .ep-horizontal-stacked{border-bottom:3px solid #ddd; margin-bottom:1em; padding-bottom:1em;}
   .ep-horizontal-stacked h4{margin-bottom:-1em;}
   .ep-horizontal-stacked-track{
      position: relative;
      background: #efefef;
      border: 2px solid #999;
      height: 50px;
      padding: 2px;
      margin: 7px 0 1em;
      color: #fff;
      text-shadow: 1px 1px 2px rgba(0,0,0,.8);
      display: flex;
      justify-content: flex-start;
      align-items:stretch;
   }
   .ep-horizontal-stacked-track.show-median:after{
      content:'';
      position: absolute;
      top:-10px;
      left:50%;
      bottom:-10px;
      width: 0;
      border-left: 2px solid #999;
      outline: 2px solid #fff;
      margin-left: -1px;
   }
   .ep-horizontal-staked-median{
      display: inline-block;
      font-size: .7em;
      color: #999;
      padding: 0 6px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border: 2px solid #999;
      color: #666;
      border-radius: 4px;
      z-index: 2;
   }
   .ep-horizontal-stacked-list{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      outline:2px solid #fff;
      overflow: hidden;
      transition: all 250ms ease-out;
      transform-origin: top left;
      position:relative;
      overflow:hidden;
      cursor:pointer;
   }
   .ep-horizontal-stacked-list.show-tooltip{overflow:visible}
   .ep-stacked-dashboard{display: flex; justify-content: space-between;}
   .ep-filter-coalitions{ text-align: center; margin: 1em;}
   .ep-filter-coalitions .tit{ margin: 0;}
   .ep-coalition-item {
      font-size: .7em;
      display: inline-block;
      border: 1px solid #ddd;
      padding: 0 5px;
      margin: 0 4px;
      border-radius: 4px;
      text-transform: uppercase;
      background: #f2f2f2;
      cursor: pointer;
   }
   .ep-legend{
      box-sizing: border-box;
      padding: 1em;
      border: 1px solid #dfdfdf;
      text-align: justify;
      background: #f2f2f2;
      border-radius: 4px;
   }
   .ep-legend-item{
      display: inline-block;
      font-family: sans-serif;
      font-size: 11px;
      line-height: 15px;
      text-transform: uppercase;
      margin: 0;
      padding: 0px 15px 0 17px;
      position: relative;
   }
   .ep-legend-color{
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 5px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
   }
   .tooltip{
      position:absolute; 
      background:rgba(255,255,255,.9); 
      padding:.4em; 
      z-index:20;
      border-radius:3px; 
      opacity:0;
      transform:scale(0.5);
      transition: transform 150ms ease-in;
      text-align:center;
      box-shadow: 4px 5px 10px -7px #000;
   }
   .show-tooltip .tooltip{
      opacity:1;
      transform:scale(1);
   }
   .tooltip h4{
      white-space:nowrap;
      color:#444;
      text-shadow:none;
      margin:0;
   }
   .tooltip img{
      display:block;
      width:50px;
      margin:0 auto;
      border-radius:50%;
   }
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: sans-serif; padding: .5em;}
   @media (max-width:850px){
      .ep-horizontal-stacked h4{margin-bottom: auto;}
   }
</style>
