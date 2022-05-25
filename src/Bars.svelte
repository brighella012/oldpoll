<div class="ep-horizontal-bar">
   <div class="ep-horizontal-bar-wrapper" id="ep18-bar-percententuali">
      <div class="ep-horizontal-bar-table-wrapper"  style="max-width:{{bothBranches ? '48%':'100%'}}">
         <h3>{{title}}</h3>
         <div class="table-wrapper">
         <table class="ep-horizontal-bar-table">
            <tbody>
               {{#each percents[0] as list}}
               <tr>
                  <td class="ep-horizontal-bar-list">{{list.label}}</td>
                  <td class="ep-horizontal-bar-graph">
                     <div class="graph" style="width:{{(list.percent*1.4)+'%'}}; background:{{list.color}}; transition-delay:{{list.delay}}">
                        {{#if list.percent}}<span>{{list.percent.toString().replace('.',',')}}{{#if list.percent2}}-{{list.percent2.toString().replace('.',',')}}{{/if}}% </span>{{/if}}
                     </div>
                  </td>
               </tr>
               {{/each}}
            </tbody>
         </table>
         </div>
      </div>
      {{#if bothBranches}}
      <div class="ep-horizontal-bar-table-wrapper" style="max-width:{{bothBranches ? '48%':'100%'}}">
         <h3>{{title2 ? title2 : title}}</h3>
         <div class="table-wrapper">
            <table class="ep-horizontal-bar-table">
               <tbody>
                  {{#each percents[1] as list}}
                  <tr>
                     <td class="ep-horizontal-bar-list">{{list.label}}</td>
                     <td class="ep-horizontal-bar-graph">
                        <div class="graph" style="width:{{(list.percent*1.4)+'%'}}; background:{{list.color}}; transition-delay:{{list.delay}}">
                           {{#if list.percent}}<span>{{list.percent.toString().replace('.',',')}}{{#if list.percent2}}-{{list.percent2.toString().replace('.',',')}}{{/if}}% </span>{{/if}}
                        </div>
                     </td>
                  </tr>
                  {{/each}}
               </tbody>
            </table>
         </div>
      </div>
      {{/if}}
   </div>
   {{#if dataSource}}<small class="data-source">{{dataSource}}</small>{{/if}}
</div>

<script>
export default {
   oncreate: function() {
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
   data: function(){
      return{
         init:false
      }
   },
   computed:{
      bothBranches: function(figures2){
         return figures2 ? true : false
      },
      percents: function(figures, figures2, configList, limit, init){
         const tempArr = [figures, figures2];
         function returnPercents(data){
            if(!data) return null;
            return data.map(function(list, i){
               list.label = configList[list.id].label;
               list.color = configList[list.id].color;
               if(!init){
                  list.percent = 0;
                  list.percent2 = 0;
                  list.varClass = '';
               }else{
                  list.percent = list.perc;
                  list.percent2 = list.perc2;
                  list.delay = i*100+'ms';
               }
               return list;
            }).filter(function(el, i){
               if(limit && limit > 0){
                  return i < limit
               }else{
                  return true
               }
            })
         }
         return [figures, figures2].map(el=>returnPercents(el));
      }
   },
   methods: {
      initialRendering:function(){
         this.set({init:true});
      }
   }
}
</script>
<style>
   .ep-horizontal-bar{font-family: 'open sans condensed'; border-bottom:3px solid #ddd; padding-bottom:1em; margin-bottom:1em;}
   .ep-horizontal-bar-wrapper{display:flex; justify-content:space-between}
   .ep-horizontal-bar-table-wrapper{width:100%;}
   .table-wrapper{
      padding: 10px;
      border: 1px solid #efefef;
      background:#f9f9f9;
      border-radius: 5px;
      box-shadow: 4px 6px 14px -10px #999;
   }
   .ep-horizontal-bar-table{width: 100%; font-family: 'open sans condensed'; font-size: .8em;}
   .ep-horizontal-bar-table td{padding: 3px 5px; white-space:nowrap; border-bottom: 1px solid #ddd;}
   .ep-horizontal-bar-table th{padding: 3px 5px; white-space:nowrap; text-align-last: left; background: #f2f2f2;}
   .ep-horizontal-bar-graph{width: 100%;}
   .ep-horizontal-bar-graph .graph{height: 22px; position: relative; line-height: 22px; width: 0; transition:all 250ms ease-in-out;}
   .ep-horizontal-bar-graph .graph > span{position: absolute; left:100%; display: inline-block; padding: 0 4px;}
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: sans-serif; padding: .5em;}
   @media (max-width:800px){
      .ep-horizontal-bar-wrapper{flex-direction:column}
      .ep-horizontal-bar-table-wrapper{max-width:100%!important;}
   }

</style>
