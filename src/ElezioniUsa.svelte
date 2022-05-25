
<div class="ep-horizontal-wrapper ep-election-usa2020">
   <a href="{{link}}" class="ep-horizontal-wrapper-link">
      <div class="ep-horizontal-stacked">
         <div class="candidates-wrapper">
            {{#each candidates as candidate, index}}
               <div class="candidate-info">
                  <span style="color: {{candidate.color}} ">{{candidate.totalVotes}}</span>
                  <div class="candidate-desc">
                     <h4>{{candidate.label}}</h4>
                     <h5>{{candidate.nameCoalition}}</h5>
                  </div>
               
               </div>
            {{/each}}
         </div>
         <div class="ep-horizontal-staked-median">{{seats/2 + 1}} per vincere</div>
         <div class="ep-horizontal-stacked-track show-median">
         {{#each rawList[0] as list, index}}
            {{#if list.votes > 0}}
               <div 
                  class="ep-horizontal-stacked-list {{'box-'+list.label}}"
                  style="background: {{list.color}}; width: {{list.perc}}%;">
                     {{#if list.votes > 10}}
                        <h4>
                           {{list.votes}}
                        </h4>
                     {{/if}}
               </div>
            {{/if}}
         {{/each}}
         </div>
         <!-- <div class="ep-stacked-source">
            <h4>{{fonte}}</h4>
         </div> -->
         <div class="ep-stacked-dashboard">
            <div class="ep-legend">
               {{#each rawList[0] as list, index}}
                  {{#if list.label == "In vantaggio" && list.votes > 0}} 
                     <div class="ep-legend-item">
                        <span class="ep-legend-color" style="background: {{list.color}}"></span>{{list.label}} <span class="ep-legened-votes">({{list.votes}})</span>
                     </div>
                  {{/if}}

                  {{#if list.label == "Da assegnare" && list.votes > 0}} 
                     <div class="ep-legend-item">
                        <span class="ep-legend-color" style="background: {{list.color}}"></span>{{list.label}} <span class="ep-legened-votes">({{list.votes}})</span>
                     </div>
                  {{/if}}

                  {{#if list.label != "In vantaggio" && list.label != "Da assegnare"}}
                     <div class="ep-legend-item">
                        <span class="ep-legend-color" style="background: {{list.color}}"></span>{{list.label}} <span class="ep-legened-votes">({{list.votes}})</span>
                     </div>
                  {{/if}}
               {{/each}}
            </div>
         </div>
      </div>
   </a>
</div>
<script>

export default {
      oncreate:function(){
         setTimeout(function(){
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
         candidates:function(candidates, info) {
            const out = Object.keys(candidates).map((candidate,index) =>{
               if(info[candidates[candidate].coalition] != undefined) {
                  candidates[candidate].totalVotes = info[candidates[candidate].coalition];
               }
               return candidates[candidate];
            })
            return out;
         },
         rawList: function(info, threshold, coalitions){
            function formatList(currentList){
               if(!currentList) return null;
               const out = Object.keys(currentList).map((list,index) =>{
                    currentList[list].coalitions.forEach((el)=>{
                        currentList[list].votes = parseInt(currentList[list].votes) + parseInt(info[el]);
                    })
                  return currentList[list];
               })
               return out;
            }
            return [coalitions].map(list=>formatList(list));
         },

         lists: function(seats, threshold, rawList, hideAll){
            return rawList.map((currentList, index)=>{
               if(currentList){
                  function getPercent(val){
                     var perc = (val/seats)*100;
                     var roundedPerc = parseFloat(perc.toFixed(2));
                     return roundedPerc;
                  }
                  function showList(list, i){
                     list.perc = getPercent(list.votes);
                     list.delay = i*50+'ms';
                     return list
                  }
                  return currentList.map(function(list, i){
                     return showList(list, i);
                  });
               }
            })
         },
      }
}
</script>
<style>
   .ep-horizontal-stacked .candidates-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
   }
   .ep-horizontal-wrapper-link {
      display: block;
   }
   .ep-horizontal-stacked .candidate-info {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -15px;
   }
   .ep-horizontal-stacked .candidate-info:last-of-type .candidate-desc {
      order: -1;
   }
   .ep-stacked-source h4 {
      color:rgb(67, 67, 67);
      font-family: "TT Norms Pro Thin",sans-serif;
      text-align: right;
      font-size: 13px;
      font-weight: 300;

   }
   .ep-horizontal-stacked .candidate-info:last-of-type span {
      margin-right: 0;
      margin-left: 10px;
   }
   .ep-horizontal-stacked .candidate-info .candidate-desc {
      margin-top: 9px;
   }
   .ep-horizontal-stacked .candidate-info h4 {
      font-family: "TT Norms Pro Bold",sans-serif;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 2px;
      padding-top: 0;
      margin-top: 0;
   }
   .ep-horizontal-stacked .candidate-info h5 {
      font-family: "TT Norms Pro Regular",sans-serif;
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 0;
   }
   .ep-horizontal-stacked .candidate-info span {
      font-size: 50px;
      font-family: "TT Norms Pro Bold",sans-serif;
      font-weight: bold;
      margin-right: 10px;
   }
   .ep-horizontal-stacked-track{
      position: relative;
      height: 41px;
      margin: 7px 0 1em;
      color: #fff;
      display: flex;
      background: #f2f2f2;
      justify-content: flex-start;
      align-items:stretch;
   }

   .ep-horizontal-stacked-track.show-median:before{
      content:'';
      position: absolute;
      top: 0;
      left:50%;
      bottom:0;
      border: 0;
      width: 1px;
      background: black;
      margin-left: -1px;
      z-index: 2;
   }
   .ep-horizontal-stacked-track.show-median:after{
      content:'';
      position: absolute;
      left:50%;
      bottom: -12px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 8px 6px;
      border-color: transparent transparent black transparent;
      margin-left: -6px;
   }
   .ep-horizontal-staked-median{
      display: inline-block;
      font-size: 15px;
      color:rgb(67, 67, 67);
      font-family: "TT Norms Pro Regular",sans-serif;
      padding: 0 6px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
   }
   .ep-horizontal-stacked-list{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 0%;
      transition: width 0.25s ease-out;
      position:relative;
   }
   .ep-horizontal-stacked-list h4 {
      font-weight: 500;
      font-size: 18px;
      text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.69);
      color: white;
      font-family: "TT Norms Pro Medium",sans-serif;
   }
   
   .ep-legend{
      display: flex;
      margin-top: 20px;
      margin-bottom: 15px;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
   }
   .ep-legend .ep-legened-votes {
      font-weight: 400;
      font-family: "TT Norms Pro Regular",sans-serif;
   }
   .ep-legend-item {
      display: inline-block;
      color: #33302e;
      font-family: "TT Norms Pro Medium",sans-serif;
      font-size: 18px;
      font-weight: 500;
      position: relative;
      padding-left: 25px;
      margin-right: 15px;
      margin-bottom: 10px;
   }
   .ep-legend-color{
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
   }
   .box-Solid:first-of-type h4 {
      margin-right: auto;
      margin-left: 15px;
   }

   .box-Solid:last-of-type h4 {
      margin-left: auto;
      margin-right: 15px;
   }
   
   @media screen and (max-width: 600px) {  
      .ep-legend-item {
         font-size: 14px;
         padding-left: 20px;
         margin-right: 10px;
      }
      .ep-legend-color{
         width: 15px;
         height: 15px;
      }
      .ep-horizontal-stacked-list h4 { 
         font-size: 12px;
      }
      .ep-horizontal-stacked .candidate-info .candidate-desc {
         margin-top: 0;
      }
      .ep-horizontal-stacked .candidate-info {
         margin-bottom: 10px;
         margin-top: 0;
         flex-direction: column;
      }
      .ep-horizontal-stacked .candidate-info h4 {
         font-size: 16px;
      }
      .ep-horizontal-stacked .candidate-info h5 {
         font-size: 10px;
      }
      .ep-horizontal-stacked .candidate-info span {
         font-size: 20px;
         margin-right: 0;
      }
      .ep-horizontal-stacked .candidate-info:last-of-type span {
         margin-left: 0;
         order: -1;
      }
   }

</style>
