<div class="ep-regionali">
   <div class="ep-regionali-wrapper" ref:wrapper>
      {{#each regioni as regione}}
         <div class="ep-regionali-box {{regione.url ? 'clickable' : ''}}" 
            on:click='goToDetail(regione.url)'>
               <div class="flex-wrapper">
                  <h3 class="ep-regionali-title" style="border-bottom: 3px solid #ddd;">
                     {{regione.title}}
                  </h3>
                  <div class="list-wrapper">
                     {{#each regione.formattedFigures as candidato, index}}
                     <div class="list">
                        <div class="img-wrapper" style="background-image:url({{candidato.picture}}); color:{{candidato.color}}"></div>
                        <div class="perc">{{candidato.perc}}{{#if candidato.perc2}}-{{candidato.perc2}}{{/if}}%</div>
                        <h4>{{candidato.cognome}} {{candidato.nome}}</h4>
                        <h5>{{candidato.coalizione}}</h5>
                     </div>
                     {{#if index < (limit-1)}}
                     <span class="data-display-separator"></span>
                     {{/if}}
                     {{/each}}
                  </div>
               </div>
         </div>
      {{/each}}
   </div> 
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
      regioni: function(regionalData, configList, limit, imagePath){
         const out =  regionalData.map(datiRegione => {
            datiRegione.formattedFigures = datiRegione.figures
            .filter((el, i) => i<limit)
            .map(el=>{
               el.coalizione = configList[el.id] ? configList[el.id].label : '';
               el.perc = el.percent.toString().replace('.',',');
               el.perc2 = el.percent2 ? el.percent2.toString().replace('.',',') : null;
               el.picture = imagePath+el.cognome.toLowerCase()+'.jpg';
               el.color = configList[el.id] ? configList[el.id].color : '#fff';
               return el;
            })
            return datiRegione;
         })
         return out;
      }
   },
   methods:{
      goToDetail: function(url){
         if(url) location.href=url;
      }
   }
}
</script>

<style>
   .ep-regionali{font-family: 'open sans condensed'; position:relative; border-bottom:3px solid #ddd; padding-bottom:1em; margin-bottom:1em;}
   .ep-regionali-wrapper,
   .ep-more-lists{display:flex; justify-content:space-between; flex-wrap:wrap; position:relative;}
   .ep-regionali-mobile-nav{display:none;}
   .ep-regionali-box {
      box-sizing:border-box;
      flex: 1 0 10%;
      border: 1px solid #ddd;
      margin: 0.3em;
      border-radius: 5px;
      background: #f9f9f9;
      box-shadow: 10px 0px 14px -8px #ccc;
      overflow:hidden;
   }
   .clickable{cursor:pointer}
   .data-display-separator {
      width: 2px;
      height: 8em;
      top:3px;
      background: #ddd;
      position: relative;
      align-self: center;
   }
   h3.ep-regionali-title {text-align: center; margin: 0; padding: .4em; background: #ddd; font-size:1em; text-transform:uppercase;
    background: #efefef;}
   .ep-regionali-title a{color:inherit}
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: sans-serif; padding: .5em;}
   .list-wrapper{
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding:.2em 0;
   }
   .list{width: 30%; text-align:center;}
   .list h4, .list h5{margin:0;}
   .list h5{color:#999;}
   .list .perc{font-size:1.8em;}
   .img-wrapper{background-color:#ddd; width:70px; height:70px; border-radius:50%; margin: .5em auto; border:5px solid; box-shadow:-5px -7px 7px -6px #444 inset; background-position: center;
    background-size: cover;}
   
   @media screen and (max-width:820px){.ep-regionali-box {flex: 0 1 48%; min-width:48%;}}
   @media screen and (max-width:610px){
      .ep-regionali-wrapper{flex-wrap:nowrap; overflow:auto;}
      .ep-regionali-box { min-width:47%;}
      .coalition-logo{idth:30px; height:30px;}
      .bar-wrapper{display:none;}
      .ep-regionali-mobile-nav {
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
         .data-display-separator { display:none;}
         .ep-regionali-wrapper{flex-direction:column;}
      }
</style>
