
<style>
    .referendum-wrapper {
        margin: 15px auto;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        padding: 15px 0 10px;
    }
    
    .referendum-wrapper h4 {
        font-size: 18px;
        line-height: 22px;
        font-family: 'TT Norms Pro Regular', sans-serif;
        margin-top: 0;
        font-weight: 400;
        text-align: center;
    }
    .referendum-risultati {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .referendum-wrapper .risultati-details {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .referendum-wrapper .risultati-details {
        border-top: 1px solid #f2f2f2;
        padding: 10px 0 0;
        margin: 5px 0 0;
    }
    .referendum-risultati h3 {
        font-size: 80px;
        font-weight: bold;
        font-family: 'TT Norms Pro Bold', sans-serif;
        text-transform: uppercase;
        margin: 0;
        color: #e2e2e2;
    }
    .referendum-risultati h4 {
        font-size: 13px;
        font-weight: 400;
        font-family: 'TT Norms Pro Regular', sans-serif;
        text-transform: uppercase;
        margin: 0;
        flex-basis: 100%;
        text-align: center;
      
    }
    .referendum-risultati h4 span {
        font-weight: bold;
        font-family: 'TT Norms Pro Bold', sans-serif;
        color: #8E0000;
    }
    .referendum-risultati .bar-wrapper {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        justify-content: center;
        align-items: center;
    }
    .referendum-risultati .bar-wrapper .bar-yes,
    .referendum-risultati .bar-wrapper .bar-no {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex-basis: 35%;
        justify-content: center;
    }
    .referendum-risultati .bar-wrapper .bar-yes {
        margin-right: -20px;
    }
    .referendum-risultati .bar-wrapper p {
        font-size: 47px;
        font-family: 'Playfair Display', serif;
        text-align: center;
        font-weight: bold;
        color: #8E0000;
        margin: auto 15px;
        line-height: 52px;
    }
    .referendum-risultati .bar-wrapper .bar-yes p {
        margin-right: 0;
    }

    .referendum-risultati .bar-wrapper .results {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .referendum-risultati .bar-wrapper .bar-no p {
        margin-left: 0;
    }
  
    .referendum-wrapper .risultati-details h5 span {
        font-weight: bold;
        font-family: 'TT Norms Pro Bold', sans-serif;
        color: #8E0000;
    }
 
    .referendum-wrapper .risultati-details h5 {
        font-size: 13px;
        font-weight: 400;
        font-family: 'TT Norms Pro Regular', sans-serif;
        text-transform: uppercase;
        margin: 0 15px 0 0;
        border-right: 1px solid;
        padding-right: 15px;
    }
    .referendum-wrapper .risultati-details h5:last-child {
        padding-right: 0;
        border: 0;
    }
    .referendum-wrapper .bar-wrapper h5 {
        flex-basis: 100%;
        margin: 0 auto;
        text-align: center;
        font-size: 10px;
        font-family: 'Playfair Display', serif;
        font-style: italic;
        font-weight: 300;
    }
    .referendum-wrapper .bar-wrapper h2 {
        color: #9c9c9c;
        font-size: 26px;
        line-height: 22px;
        margin: 0;
        flex-basis: 26%;
        font-weight: 300;
        text-align: center;
        font-family: 'TT Norms Pro Thin', sans-serif;
        text-transform: uppercase;
        text-decoration: none;
        padding: 10px;
    }
    .referendum-wrapper .bar-wrapper  h2 span {
        font-size: 16px; 
        display: block;
        line-height: 22px;
        margin-top: 10px;
    }
    @media screen and (max-width: 1024px) { 
        .referendum-risultati .bar-wrapper .bar-yes,
        .referendum-risultati .bar-wrapper .bar-no {
            flex-basis: 50%;
        }
        
        .referendum-risultati .bar-wrapper .bar-yes {
            margin-right: -20px;
        }
        .referendum-wrapper .bar-wrapper h2 {
            order: -2;
            flex-basis: 100%;
            padding: 5px 0;
        }
        .referendum-wrapper .bar-wrapper h5 {
            order: -1;
            margin-bottom: 0;
        }
    }
    @media screen and (max-width: 768px) {
        .referendum-risultati h4 {
            font-size: 11px;
        }
        .referendum-wrapper .risultati-details h5 {
            border: 0;
        }
        .referendum-risultati .bar-wrapper {
            width: calc(100% - 40px);
            justify-content: space-between;
        }
        .referendum-wrapper .bar-wrapper  h2 span {
            margin-top: 5px;
        }
        .referendum-wrapper {
            padding-bottom: 5px;
        }
        .referendum-risultati .bar-wrapper p {
            font-size: 35px;
            margin: auto 10px;
            line-height: 37px;
        }
        .referendum-risultati .bar-wrapper h5 {
            font-size: 12px;
        }
        .referendum-risultati h3 {
            font-size: 40px;
        }
        .referendum-wrapper .risultati-details h5 {
            padding-bottom: 5px;
        }
    }
    @media screen and (max-width: 450px) { 
        .referendum-risultati .bar-wrapper p {
            font-size: 22px;
            margin: auto 10px;
            line-height: 24px;
        }
        .referendum-risultati .bar-wrapper {
            width: 100%;
        }
        .referendum-risultati h4 {
            font-size: 12px;
            display: none;
        }
        
    }

    @media screen and (max-width: 350px) {  
        .referendum-risultati h3 {
            font-size: 25px;
        }
    }

</style>

<div class="referendum-wrapper">
    <div class="referendum-risultati referendum-risultati--dsk">
        <div class="bar-wrapper">
            <div class="bar-yes">
                <h3>SÌ</h3>
                <div class="result">
                    <p>{{yesPerc}}</p>
                    <h4>Voti: <span>{{yesVotes}}</span></h4>
                </div>
            </div>
            <h2>Referendum <span>Taglio dei parlamentari</span></h2>
            <div class="bar-no">
                <div class="result">
                    <p>{{noPerc}}</p>
                    <h4>Voti: <span>{{noVotes}}</span></h4>
                </div>
                <h3>No</h3>
            </div>
           
            <h5>{{#if dataSource}}Fonte: <span>{{dataSource}}</span>{{/if}}</h5> 
        </div>
    </div>
    <div class="risultati-details">
        <h5>{{#if influx}}Affluenza: <span>{{influx}}</span>{{/if}}</h5>
        <h5>{{#if sectionTot}}Sezioni: <span>{{sectionCurrent}}</span> su <span>{{sectionTot}}</span>{{/if}}</h5> 
       
    </div>
   
</div>

 