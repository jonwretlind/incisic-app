function displayComposite() {

  this.createCompTable = function() {
    var outputCompTableHeader = "<div class='tablewindow'><table id='compositeView' class='container' ><tr class='output-table-header'><th class='output-header-data'><span>Years From Start</span></th><th class='output-header-data'><span>Year</span></th><th class='output-header-data'><span>Weighted Yield</span></th><th class='output-header-data'><span>Portfolio Balance EOY</span></th></tr>";
    var outputCompTableFooter = "</table></div>";
    $('.caloutputComp').html(outputCompTableHeader + outputCompTableFooter);
  };

  this.disp = function( numYear, year, totalComp ) {
    //console.log("DISPLAY COMPOSITE VIEW | AVG VS ACTUAL");
    //console.log("Composite Total " + i + "=" + totalComp.toFixed(2) );

    var outputCompTableRow = "<tr class='output-data-row'><td class='yrs-from-start center'><span>" + numYear + "</span></td><td class='year center'><span>"+ year +"</span></td><td class='weighted-avg'></td><td class='portfolio center bold'><span>$"+ (totalComp.toFixed(2)).toLocaleString() +"</span></td></tr>"
    ;


    $('#compositeView').append(outputCompTableRow);

  };

  this.avg = function($, sumOfYields, numYears, theTable, annPay, BOYBalance) {
    var theTable = 'outputTableComp';
    var outputYields = "<div class='container center "+theTable+"-yields'><div class='avgYield'></div><div class='actYield'></div><div style='clear:both;' class='ironLaw'></div></div>";
    $('.caloutputComp').prepend(outputYields);

    // get Average Yield
    mathfuncts.averageYield($, sumOfYields, numYears, theTable, annPay, BOYBalance );

    // calculate the ACTUAL YIELD here...
    //mathfuncts.actualYield(theTable, idx+1);

    //clear out the values for the next calculations...
    mathfuncts.clearValues();
  }
}
