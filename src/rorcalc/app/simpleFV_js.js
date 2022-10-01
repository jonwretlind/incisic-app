/* ==================================================
   ========== SIMPLE FV CALCULATOR JS ===============
   ================================================== */

// === GLOBALS AND CONSTRUCTORS ===
const fvfuncts = new FVFuncts();

var tableArray = new Array();
var dispNewBal, resultBal, totMngFee, rateColor, rate, sumOfYields, yrFromStart, pBOYBalance;
var thePane = '.caloutput';
var theTable = 'outputTable';
var BOYContributionFlag = 1; // flag sets whether the annual payments are at BOY; 1 if BOY.

// === FUNCTIONS AND CLASSES ==
function doSimpleFV(IR, annPay, numYears, mngFee, pBOYBalance) {


		idx = numYears
		yrFromStart = 0;
		rate = IR / 100; // convert to decimal percentage
		sumOfYields = pBOYBalance;
		dispNewBal = pBOYBalance^0;

	console.log('Called doSimpleFV()...');

		//put table header and footer into variables...
		var outputTableHeader = "<div class='tablewindow'><table id='"+theTable+"' class='container' ><tr class='output-table-header'><th class='output-header-data'><div class='tri'></div><span>Years From Start</span></th><th class='output-header-data'><div class='tri'></div><span>Balance BOY</span></th><th class='output-header-data'><div class='tri'></div><span>Percent Yield</span></th><th class='output-header-data'><div class='tri'></div><span>Annual Payment</span></th><!--<th class='output-header-data'><div class='tri'></div><span>Management Fee</span></th>--><th class='output-header-data'><div class='tri'></div><span>Balance EOY</span></th></tr>";

		var outputTableFooter = "</table></div>";

		//insert the header and footer for table
		$(thePane).html(outputTableHeader + outputTableFooter);


		// Build the table of results with a loop
		for (i = 0; i < idx; i++){
			var resultColor = "black";
			yrFromStart ++ ;
			dispAnnPay = annPay^0;
			//console.log('mngFee = ' + mngFee);
			//totMngFee = (dispNewBal + annPay) * mngFee;

			tableArray.push(yrFromStart, dispNewBal.toFixed(0), IR.toFixed(2), dispAnnPay.toFixed(0));
      //totMngFee.toFixed(0);
      totMngFee = 0;
			var rcFlag = false;
			fvfuncts.calculateFVals(rcFlag, i);

			var rowIdx = i*4;
			if (resultBal <= 0) { var resultColor = "red"; } else { var resultColor = "black"; };
			fvfuncts.displayFVals(i, rowIdx, resultColor);

		}; // end FOR loop
};

function FVFuncts() {

				// function to calculate the values
				this.calculateFVals = function(rcFlag, rowIdx, nextRowIdx) {
					if ( BOYContributionFlag ) {
						console.log("BOY Contrubution");
						if (! rcFlag) mathfuncts.calcSimpleFVBOY(IR, annPay, 1, dispNewBal, i);
						if (rcFlag) mathfuncts.calcSimpleFVBOY(IR, tableArray[3+rowIdx], 1, dispNewBal, i);
						dispNewBal = mathfuncts.mySimpleFVBOY^0;
						resultBal = dispNewBal;
					} else {
						console.log("EOY Contrubution");
						if (! rcFlag) mathfuncts.calcSimpleFV(IR, annPay, 1, dispNewBal);
						if (rcFlag) mathfuncts.calcSimpleFV(IR, tableArray[3+rowIdx], 1, dispNewBal);
						dispNewBal = mathfuncts.mySimpleFV^0;
						resultBal = dispNewBal;
					};

					if (rcFlag) tableArray[1+nextRowIdx] = resultBal;
					return resultBal;
				};

				this.reCalculateFVals = function(pBOYBalance) {
					fvfuncts.clearTable(pBOYBalance); // clear the displayed table before re-displaying, NOT the array
					// recalculate the values in the updated array
					for (i = 0; i < idx; i++){
						var rowIdx = i*4;
						var nextRowIdx = (i+1)*4;
						var rcFlag = true;
						fvfuncts.calculateFVals(rcFlag, rowIdx, nextRowIdx);
						if (resultBal <= 0) { var resultColor = "red"; } else { var resultColor = "black"; };
						fvfuncts.displayFVals(i, rowIdx, resultColor);
					};// end for loop
				};

				this.clearTable = function(pBOYBalance) {
					dispNewBal = pBOYBalance^0;
					//totMngFee = (dispNewBal + annPay) * mngFee;
					$('.output-data-row').remove();
				};

				this.displayFVals = function(i, rowIdx, resultColor) {

					//put table data into variables...
					var outputTableRow = "<tr class='output-data-row'><td class='yrs-from-start center'><span>"+tableArray[0+rowIdx]+"</span></td><td class='bal-BOY'><span>$"
					+tableArray[1+rowIdx].toLocaleString()+"</span></td><td class='int-rate'><span>"+tableArray[2+rowIdx]*100+"%</span></td><td class='ann-pymt center'>";

					outputTableRow += "<table class='ann-pay-table'><tr><td style='padding-right: 2px !important;'>$</td><td style='padding-left: 0px !important; padding-right: 0px !important;'><span id='annPayAmt-"+i+"'  class='ann-pay'>" + tableArray[3+rowIdx].toLocaleString() + "</span><span><input type='text' name='annual_payment' id='annPayInput-"+i+"' class='ann-pay-entry-field' onchange='fvfuncts.changeVal(this.value, this.id);' autocomplete='off' value='"+ tableArray[3+rowIdx].toLocaleString() +"' style='text-align: center; width: 50px;'></input></span></td><td style='padding-left: 2px !important;'><span id='editBtn-"+i+"' class='edit-btn roll fa fa-fw fas' aria-hidden='true' onClick='fvfuncts.toggleBtn("+i+")'>&#xf044;</span><span id='recalcBtn-"+i+"' class='recalc-btn roll fa' aria-hidden='true' onClick='fvfuncts.recalcBtn()'>&#xf021;</span></td></tr></table>";

					//outputTableRow += "</td><td class='mgmt-fee center' style='padding-right: 5%;'><span>$"+ tableArray[4+rowIdx].toLocaleString() +"</span></td><td class='output-data data-label-"+i+" bold'><span style='color: "+resultColor+"'>/<span></td></tr>";

          outputTableRow += "</td><td class='output-data data-label-"+i+" bold'><span style='color: "+resultColor+"'>/<span></td></tr>";

					//display stuff
					$('#'+theTable).append(outputTableRow);
					$('#'+theTable+' .data-label-'+i+' span').html("$" + resultBal.toFixed(0).toLocaleString());

					//display in console
					console.log(tableArray[0+rowIdx] + "|" + tableArray[1+rowIdx] + "|" + tableArray[2+rowIdx] + "|" + tableArray[3+rowIdx] );

				};

				//add a function to handle refresh buttons
				this.recalcBtn = function() {
					console.log('RECALC');
					fvfuncts.reCalculateFVals(BOY);
				};

				this.toggleBtn = function(x) {
					var selector = ".ann-pay-table .recalc-btn, #annPayInput-" + x + ", #annPayAmt-" + x + ", #editBtn-" + x + ", #recalcBtn-" + x;
					$(selector).toggle();
				}

				this.changeVal = function(newVal, id) {
					console.log("Value Changed to: " + newVal + " in field: " + id);
					var idArr = id.split("-");
					console.log('Row: ' + idArr[1]);

					tableArray[3+(4*idArr[1])] = newVal;
					fvfuncts.reCalculateFVals(BOY);

				};


};
