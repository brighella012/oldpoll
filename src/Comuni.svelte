<div class="ep-comuni">
   <div class="ep-comuni-wrapper" ref:wrapper>
         {{#each regioni as regione}}
            <div class="ep-comuni-box {{regione.url ? 'clickable' : ''}}" 
               on:click='goToDetail(regione.url)'>
                  <div class="flex-wrapper">
                     <h3 class="ep-comuni-title" style="border-bottom: 3px solid #ddd;">
                        {{regione.ente.name}}
                     </h3>
                     <div class="list-wrapper">
                        {{#each regione.formattedFigures as lista, index}}
                        <div class="list">
                           <div class="img-wrapper" style="background-image:url({{lista.picture}}); color:{{lista.color}}"></div>
                           <div class="perc">{{lista.perc}}{{#if lista.perc2}}-{{lista.perc2}}{{/if}}%</div>
                           <h4>{{lista.name}} {{lista.surname}}</h4>
                           <h5>{{lista.coalizione}}</h5>
                        </div>
                        {{#if index < (limit-1)}}
                        <span class="data-display-separator"></span>
                        {{/if}}
                        {{/each}}
                     </div>
                  </div>
                  {{#if regione.sezioni}} <small class="data-source">Sezioni {{regione.sezioni.corrente}} su {{regione.sezioni.totali}} </small>{{/if}}
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
      regioni: function(entiData, configList, limit, imagePath){
         const out =  entiData.map(datiRegione => {
               datiRegione.formattedFigures = datiRegione.liste
            .filter((el, i) => i<limit)
            .map(el=>{
               el.name = (el.candidato != undefined) ? el.candidato.name : el.name;
               el.surname = (el.candidato != undefined) ? el.candidato.surname : el.surname;
               el.slug = (el.candidato != undefined) ? el.candidato.slug : el.slug;
               el.perc = el.percentuale.toString().replace('.',',');
               el.perc2 = el.percent2 ? el.percent2.toString().replace('.',',') : null;
               if(el.surname.slice(-1) == "'") {
                  var customNameWithoutApo = el.surname.slice(0, el.surname.length - 1);
                  el.picture = imagePath+customNameWithoutApo.toLowerCase().replace(' ','%20')+'.jpg';
               } else {
                  el.picture = imagePath+el.surname.toLowerCase().replace(' ','%20')+'.jpg';
               }
               el.color = (el.color) ? el.color : ((configList[el.slug]) ? configList[el.slug].color : '#fff');
               el.coalizione = configList[el.slug] ? configList[el.slug].label : '';
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

function sliderComuni() {
    head.load(['https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js'], function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css">')
         if($(window).width() >= 768)  {
            $('.ep-comuni-wrapper:not(.slick-initialized)').css('visibility', 'hidden');
         }
        var valueShowComuni;
         if($('comuni').attr('data-show') != undefined) {
           var convertToN = parseInt($('comuni').attr('data-show'));
           if(typeof convertToN == "number") {
            valueShowComuni = convertToN >= 3 ? 3 : convertToN;
            } else {
               valueShowComuni = 3;
            }
         }
        $('.ep-comuni-wrapper').slick({
        dots: false,
        infinite: (convertToN <= 2) ? false : true,
        speed: 300,
        slidesToShow: valueShowComuni,
        slidesToScroll: valueShowComuni,
        variableWidth : (convertToN <= 2) ? true : false,
        responsive: [
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false
            }
            }
        ]
        });
        if($(window).width() >= 768) {
            $('.ep-comuni-wrapper.slick-initialized').css('visibility',  'visible');
               if(convertToN == 2) {
                  $('.ep-comuni-wrapper .slick-slide').css('max-width', '350px');
               } else if(convertToN == 1) {
                  $('.ep-comuni-wrapper .slick-slide').css('width', '21%');
               }
        } 
        if($(window).width() <= 768) {
           if(convertToN == 1) {
               $('.ep-comuni-wrapper .slick-slide').css('width', '91vw');
           }
        }
        if($(window).width() >= 1080) {
         //   if(convertToN == 2) {
         //       $('.ep-comuni-wrapper .slick-slide').css('width', '5.1%');
         //    }
        }
        $('.ep-comuni-wrapper .slick-arrow').html("");
    });
}
sliderComuni();
</script>
<style>
   .ep-comuni-wrapper {
      visibility: hidden;
      max-height: 300px;
   }
   .ep-comuni-wrapper.slick-initialized {
      visibility: visible;
      max-height: inherit;
   }
   .ep-comuni{font-family: 'Playfair Display', serif; position:relative; border-bottom:3px solid #ddd; padding-bottom:1em; margin-bottom:1em;}
   .ep-more-lists{display:flex; justify-content:space-between; flex-wrap:wrap; position:relative;}
   .data-display{display:flex; justify-content:space-evenly; flex-direction:column; position:relative; padding: .5em .3em;}
   .data-display-separator {
      width: 2px;
      height: 2em;
      top:3px;
      background: #ddd;
      position: relative;
      align-self: center;
   }

  .ep-comuni-wrapper .slick-slide {
       margin: 0 10px;
       border: 1px solid #ddd;
       min-height: 220px;
   }
  .ep-comuni-wrapper .slick-arrow {
       position: absolute;
       top: 50%;
       border: 0;
       box-shadow: none;
       cursor: pointer;
       z-index: 1;
       background: rgba(0,0,0, 0.5);
       width: 25px;
   }
  .ep-comuni-wrapper .slick-next  {
       right: 0;
   }

   .ep-comuni-wrapper .slick-prev  {
       left: 0;
   }
  .ep-comuni-wrapper .slick-prev:after {
    content: "\00AB";
    color: white;
    font-size: 25px;
    }
   .ep-comuni-wrapper .slick-next:before {
    content: "\00BB";
    color: white;
    font-size: 25px;
    }
    .ep-comuni-wrapper .slick-arrow.slick-disabled {
      display: none;
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
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: 'TT Norms Pro Regular', sans-serif; padding: .5em;}
   @media screen and (max-width:610px){
      .coalition-logo{idth:30px; height:30px;}
      .bar-wrapper{display:none;}
    }
      @media (max-width:700px){
         .data-display{flex-direction:column}
         .data-display-separator { display:none;}
      }

    .ep-comuni{font-family: 'Playfair Display', serif; position:relative; border-bottom:3px solid #ddd; padding-bottom:1em; margin-bottom:1em;}
   .ep-comuni-wrapper,
   .ep-more-lists{display:flex; justify-content:space-between; flex-wrap:wrap; position:relative;}
   .ep-comuni-mobile-nav{display:none;}
   .ep-comuni-box {
      box-sizing:border-box;
      background: #f9f9f9;
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
   h3.ep-comuni-title {text-align: center; margin: 0; padding: .4em; background: #ddd; font-size:20px; text-transform:uppercase; 
      font-weight: bold;
      font-family: 'TT Norms Pro Bold', sans-serif; 
    background: #efefef;}
   .ep-comuni-title a{color:inherit}
   .data-source{display:block; text-align:right; font-size: .8em;color: #999; font-family: 'TT Norms Pro Regular', sans-serif; padding: .5em;}
   .list-wrapper{
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding:.2em 0;
   }
   .list{ text-align:center; padding: 0 10px; min-height: 180px; width: 50%;}
   .list h4, .list h5{margin:0; font-family: 'TT Norms Pro Regular', sans-serif; font-size: 17px; }
   .list h5{color:#999; font-size: 16px;}
   .list .perc{font-size: 20px; color: #8E0000; font-weight: bold; margin-bottom: 10px; }
   .img-wrapper{background-color:#ddd; width:70px; height:70px; border-radius:50%; margin: .5em auto; border:5px solid; box-shadow:-5px -7px 7px -6px #444 inset; background-position: center;
    background-size: cover;}
    @media screen and (max-width:1024px){
      .ep-comuni-wrapper .slick-arrow {display: none !important;}
    }
   @media screen and (max-width:820px){.ep-comuni-box {flex: 0 1 48%; min-width:48%;}}
   @media screen and (max-width:610px){
      .ep-comuni-wrapper{flex-wrap:nowrap; overflow:auto;}
      .ep-comuni-box { min-width:47%;}
      .coalition-logo{idth:30px; height:30px;}
      .bar-wrapper{display:none;}
      }
      @media (max-width:700px){
         .data-display-separator { display:none;}
         .ep-comuni-wrapper{flex-direction:column;}
      }
</style>
