"use strict"

//global variables for ratio charts
let ratioChart1, ratioChart2, ratioChart3, ratioChart4, ratioChart5, ratioChart6;
let totalGrade1 , totalGrade2, totalGrade3, totalGrade4, totalGrade5, totalGrade6;
let finalGrade

//renders the information on the DOM

function displayResults(responseJson) {
 

  console.log(responseJson);

  //first part of conditional to catch an error message
  if (responseJson.ratios === undefined){
      console.log('stock not found')
      $('.js-error-message').html(`<p>Stock not found, please choose a valid Stock Symbol.</p>`)
  } else {

    //variables with empty arrays
    let date = [];
    let currentRatio = [];
    let quickRatio = [];
    let inventoryTurnover = [];
    let debtEquityRatio = [];
    let returnOnEquity = [];
    let netProfitMargin = [];

    //for loop to push data into empty arrays
    for (let i = 0; i < responseJson.ratios.length && i < 10; i++) {
      
      date.push(`${responseJson.ratios[i].date}`);
      currentRatio.push(`${responseJson.ratios[i].liquidityMeasurementRatios.currentRatio}`);
      quickRatio.push(`${responseJson.ratios[i].liquidityMeasurementRatios.quickRatio}`);
      inventoryTurnover.push(`${responseJson.ratios[i].operatingPerformanceRatios.inventoryTurnover}`);
      debtEquityRatio.push(`${responseJson.ratios[i].debtRatios.debtEquityRatio}`);
      returnOnEquity.push(`${responseJson.ratios[i].debtRatios.debtEquityRatio}`);
      netProfitMargin.push(`${responseJson.ratios[i].profitabilityIndicatorRatios.netProfitMargin}`);
  }

   //conditional to clear 

   if( ratioChart1 != undefined){
    ratioChart1.destroy();
    ratioChart2.destroy();
    ratioChart3.destroy();
    ratioChart4.destroy();
    ratioChart5.destroy();
    ratioChart6.destroy();
  }

  //Current Ratio Chart

  let myChart = document.getElementById('myChart').getContext('2d');
  
      


         ratioChart1 = new Chart(myChart,{
            type:'line',
            responsive: true,
            data:{
                labels:date,
                datasets:[{
                    label: 'Current Ratios',
                    data:currentRatio,
                    backgroundColor:'yellow'
                }]
            },
            options:{}
        });

        //Quick Ratio Chart
        let myChart2 = document.getElementById('myChart2').getContext('2d');

         ratioChart2 = new Chart(myChart2,{
            type:'line',
            data:{
                labels:date,
                datasets:[{
                    label: 'Quick Ratios',
                    data:quickRatio,
                    backgroundColor:'brown'
                }]
            },
            options:{}
        });

        //Invetory Turnover Ratio Chart
        let myChart3 = document.getElementById('myChart3').getContext('2d');

         ratioChart3 = new Chart(myChart3,{
            type:'line',
            data:{
                labels:date,
                datasets:[{
                    label: 'Inventory Turnover Ratio',
                    data:inventoryTurnover,
                    backgroundColor:'purple'
                }]
            },
            options:{}
        });


        //Debt-Equity Ratio Chart
        let myChart4 = document.getElementById('myChart4').getContext('2d');

         ratioChart4 = new Chart(myChart4,{
            type:'line',
            data:{
                labels:date,
                datasets:[{
                    label: 'Debt-Equity Ratio',
                    data:debtEquityRatio,
                    backgroundColor:'red'
                }]
            },
            options:{}
        });


        //Return on Equity Chart
        let myChart5 = document.getElementById('myChart5').getContext('2d');

         ratioChart5 = new Chart(myChart5,{
            type:'line',
            data:{
                labels:date,
                datasets:[{
                    label: 'Return on Equity',
                    data:returnOnEquity,
                    backgroundColor:'fuschia'
                }]
            },
            options:{}
        });





        //Return on Assets Chart
        let myChart6 = document.getElementById('myChart6').getContext('2d');

         ratioChart6 = new Chart(myChart6,{
            type:'line',
            data:{
                labels:date,
                datasets:[{
                    label: 'Net Profit Margin',
                    data:netProfitMargin,
                    backgroundColor:'blue'
                }]
            },
            options:{}
        });

  //Shows Ratio Info on DOM
  $('.info').show(400);
  
  //Calculates grade for Current Ratio in latest year
    if(`${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` > 1 && `${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` < 1.3 ){
      $('#Grade1').append(`<h4>Current Ratio Grade: </h4><p>A</p>`);
      totalGrade1 = 5;
    } else if(`${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` > 1.7 && `${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` < 3 ) {
      $('#Grade1').append(`<h4>Current Ratio Grade: </h4><p>B</p>`);
      totalGrade1 = 4;
    } else if(`${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` > 1.4 && `${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` < 1.6 ){
      $('#Grade1').append(`<h4>Current Ratio Grade: </h4><p>C</p>`);
      totalGrade1 = 3;
    } else if(`${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` > 3) {
      $('#Grade1').append(`<h4>Current Ratio Grade: </h4><p>D</p>`);
      totalGrade1 = 2;
    } else if (`${responseJson.ratios[0].liquidityMeasurementRatios.currentRatio}` < 1 ){
      $('#Grade1').append(`<h4>Current Ratio Grade: </h4><p>F</p>`);
      totalGrade1 = 1;
    }

    //Calculates grade for Quick ratio in latest year
     if(`${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` >= 1){
      $('#Grade2').append(`<h4>Quick Ratio Grade: </h4><p>A</p>`)
      totalGrade2 = 5;
    } else if (`${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` > .7  && `${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` < 1) {
      $('#Grade2').append(`<h4>Quick Ratio Grade: </h4><p>B</p>`)
      totalGrade2 = 4;
    } else if(`${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` > .5 && `${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` < .6) {
      $('#Grade2').append(`<h4>Quick Ratio Grade: </h4><p>C</p>`)
      totalGrade2 = 3;
    } else if (`${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` > .3 && `${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` < .4) {
      $('#Grade2').append(`<h4>Quick Ratio Grade: </h4><p>D</p>`)
      totalGrade2 = 2;
    } else if (`${responseJson.ratios[0].liquidityMeasurementRatios.quickRatio}` < .2) {
      $('#Grade2').append(`<h4>Quick Ratio Grade: </h4><p>F</p>`)
      totalGrade2 = 1;
    }

   //Calculates grade for Inventory Turnover ratio
   
   if(`${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` > 6 && `${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` < 500) {
    $('#Grade3').append(`<p>A</p>`)
    totalGrade3 = 5;
   } else if (`${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` > 4 && `${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` < 6) {
    $('#Grade3').append(`<p>B</p>`)
    totalGrade3 = 4;
   } else if (`${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` > 2 && `${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}`< 3 ) {
    $('#Grade3').append(`<p>C</p>`)
    totalGrade3 = 3;
   } else if (`${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` > 1 && `${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}`< 1.9) {
    $('#Grade3').append(`<p>D</p>`)
    totalGrade3 = 2;
   } else if(`${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` < 1 || `${responseJson.ratios[0].operatingPerformanceRatios.inventoryTurnover}` > 500) {
    $('#Grade3').append(`<p>A</p>`)
    totalGrade3 = 1;
   }


   //Calculates grade for debt equity ratio

   if(`${responseJson.ratios[0].debtRatios.debtEquityRatio}` > 1.5 && `${responseJson.ratios[0].debtRatios.debtEquityRatio}` < 2){
    $('#Grade4').append(`<p>A</p>`)
    totalGrade4 = 5;
   } else if(`${responseJson.ratios[0].debtRatios.debtEquityRatio}` > 1 && `${responseJson.ratios[0].debtRatios.debtEquityRatio}` < 1.4) {
    $('#Grade4').append(`<p>B</p>`)
    totalGrade4 = 4;
   } else if(`${responseJson.ratios[0].debtRatios.debtEquityRatio}` > 2 && `${responseJson.ratios[0].debtRatios.debtEquityRatio}` < 4) {
    $('#Grade4').append(`<p>C</p>`)
    totalGrade4 = 3;
   } else if(`${responseJson.ratios[0].debtRatios.debtEquityRatio}` > 4 && `${responseJson.ratios[0].debtRatios.debtEquityRatio}` < 7) {
    $('#Grade4').append(`<p>D</p>`)
    totalGrade4 = 2;
   } else if(`${responseJson.ratios[0].debtRatios.debtEquityRatio}` < 1 || `${responseJson.ratios[0].debtRatios.debtEquityRatio}` > 7) {
    $('#Grade4').append(`<p>F</p>`)
    totalGrade4 = 1;
   }

   //Calculates grade for return on equity ratio
   if(`${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` > .15){
    $('#Grade5').append(`<p>A</p>`)
    totalGrade5 = 5;
   } else if(`${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` > .10 && `${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` < .14) {
    $('#Grade5').append(`<p>B</p>`)
    totalGrade5 = 4;
   } else if (`${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` > .05 && `${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` < .10) {
    $('#Grade5').append(`<p>C</p>`)
    totalGrade5 = 3;
   } else if(`${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` > .01 && `${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}` < .05) {
    $('#Grade5').append(`<p>D</p>`)
    totalGrade5 = 2;
   } else if(`${responseJson.ratios[0].profitabilityIndicatorRatios.returnOnEquity}`< .01) {
    $('#Grade5').append(`<p>F</p>`)
    totalGrade5 = 1;
   }

   //Calculates grade for Net profit marginoi
  

    if(`${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` > .13 ) {
      $('#Grade6').append(`<p>A</p>`)
      totalGrade6 = 5;
    } else if(`${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` > .1  && `${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` < .13) {
      $('#Grade6').append(`<p>B</p>`)
      totalGrade6 = 4;
    } else if (`${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` > .06 && `${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` < .1) {
      $('#Grade6').append(`<p>C</p>`)
      totalGrade6 = 3;
    } else if (`${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` > .02 && `${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` < .06) {
      $('#Grade6').append(`<p>D</p>`)
      totalGrade6 = 2;
    } else if (`${responseJson.ratios[0].profitabilityIndicatorRatios.netProfitMargin}` < .02) {
      $('#Grade6').append(`<p>F</p>`)
      totalGrade6 = 1;
    }


    //Adds total Grades
    
    finalGrade = totalGrade1 + totalGrade2 + totalGrade3 + totalGrade4 + totalGrade5 + totalGrade6





    //Renders Final Grade
    if(finalGrade >= 27) {
      $('.finalGrade').append(` <p data-toggle="tooltip" title="	The final grade is a cumulative score based on sum of the 6 ratios listed below. Please check a larger screen size for the individual grades of each Ratio. " id='currentRatio'>Final Grade is: A &#9432;</p>`)
    } else if (finalGrade >= 24 && finalGrade <= 26) {
      $('.finalGrade').append(`<p data-toggle="tooltip" title="	The final grade is a cumulative score based on sum of the 6 ratios listed below. Please check a larger screen size for the individual grades of each Ratio. " id='currentRatio'>Final Grade is: B &#9432;</p>`)
    } else if(finalGrade >= 21 && finalGrade <=23) {
      $('.finalGrade').append(`<p data-toggle="tooltip" title="	The final grade is a cumulative score based on sum of the 6 ratios listed below. Please check a larger screen size for the individual grades of each Ratio. " id='currentRatio'>Final Grade is: C &#9432;</p>`)
    } else if(finalGrade >= 18 && finalGrade <=20) {
      $('.finalGrade').append(`<p data-toggle="tooltip" title="	The final grade is a cumulative score based on sum of the 6 ratios listed below. Please check a larger screen size for the individual grades of each Ratio. " id='currentRatio'>Final Grade is: D &#9432;</p>`)
    } else if (finalGrade < 18 ) {
      $('.finalGrade').append(`<p data-toggle="tooltip" title="	The final grade is a cumulative score based on sum of the 6 ratios listed below. Please check a larger screen size for the individual grades of each Ratio. " id='currentRatio'>Final Grade is: F &#9432;</p>`)
    }
    
    

  }

 

  console.log('run displayResults')
}






function grabRatios(symbol) {
  fetch(`https://financialmodelingprep.com/api/v3/financial-ratios/${symbol}`)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson))
  

  
}

function watchForm() {
  $('form').submit(e=> {
    e.preventDefault();
    const symbol = $('#searchTicker').val();
    $('.showRatios').empty();
    $('.js-error-message').empty();
    $('.Grade').empty();
    $('.finalGrade').empty();
    $('#searchTicker').val('');
    
    
    console.log(symbol);

    grabRatios(symbol);
  });
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});



        