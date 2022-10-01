function reCalcValues() {

	this.recalc = function(RORTableArray, newVal, cgId) {
		console.log('RECALC FUNCTION...');
        var idx = (RORTableArray.length / 6);
        console.log("TOT Number of fields in RORTableArray: " + RORTableArray.length, "Idx=" + idx);
        var newSumOfYields = 0, sumAnnPay = 0, avgAnnPay = 0;
        console.log("newVal = " + newVal);
		newVal = Number(newVal);
		var newBalance = Number(RORTableArray[2]);
		$('#'+theTable).html(""); // clear the old table

		for (i=0; i < idx; i++) {
			var yr = i+1;
			var rowIdx = i*6;
			var thisRate = Number(RORTableArray[3+rowIdx] / 100);
			var totMngFee = Number((Number(RORTableArray[2 + rowIdx]) + Number(RORTableArray[4 + rowIdx])) * mngFee);


			// insert new values into array
			RORTableArray[5+rowIdx] = Math.abs(totMngFee^0);
			// insert new value into array
			if ( i == cgId ) { RORTableArray[4+rowIdx] = newVal };
			if ( i > 0 ) RORTableArray[2+rowIdx] = newBalance;

			// calc a newBalance to carry over
			newBalance = Number((mathfuncts.balEOY(Number(RORTableArray[2 + rowIdx]), Number(RORTableArray[4 + rowIdx]), mngFee, thisRate, tyrs)) - totMngFee) ^ 0;

			// check to see if values are negative and adjust colors
			if (thisRate < 0) {
				var rateColor = "red";
			} else {
				var rateColor = 'black';
			};

			if (Number(RORTableArray[4 + rowIdx]) < 0) {
				var newValColor = "red";
			} else {
				var newValColor = 'black';
			};

			if (newBalance < 0) {
				var newBalColor = "red";
			} else {
				var newBalColor = 'black';
			};


			//Display the new table
			var yrAdj = Number(yr-1);
			this.displayTable(rowIdx, yrAdj, newBalance, rateColor, newValColor, newBalColor);

		    newSumOfYields += Number(RORTableArray[3+rowIdx]);
			sumAnnPay += Number(RORTableArray[4+rowIdx]);

		};

		// get Average Yield
		avgAnnPay = sumAnnPay / numYears;
		//console.log(newVal + ", " + newSumOfYields + ", "+ numYears + ", "+ theTable + ", " + avgAnnPay + ", " + RORTableArray[2]);
		mathfuncts.averageYield( $, newSumOfYields, numYears, theTable, avgAnnPay, RORTableArray[2] );

		// calculate the ACTUAL YIELD here...
		//mathfuncts.actualYield(theTable, idx);

		//clear out the values for the next calculations...
		newBalance = 0;
        recalcFlag = true;
		console.log("END RECALC.");
	};

	this.displayTable = function (rowIdx, idx, newBalance, rateColor, newValColor, newBalColor) {
		//display array in console
		//console.log("theTable="+theTable);
			console.log("RORTableArray values: " + RORTableArray[0+rowIdx] + " || " + RORTableArray[1+rowIdx] + " | " + RORTableArray[2+rowIdx] + " | " + RORTableArray[3+rowIdx] + " | " + RORTableArray[4+rowIdx] + " | " + RORTableArray[5+rowIdx] + " || " + newBalance );

			var outputTableHeader = "<tr class='output-table-header'><th class='output-header-data'><span>Years From Start</span></th><th class='output-header-data'><span>Year</span></th><th class='output-header-data'><span>Balance BOY</span></th><th class='output-header-data'><span>Percent Yield</span></th><th class='output-header-data'><span>Annual Payment</span></th><th class='output-header-data'><span>Management Fee</span></th><th class='output-header-data'><span>Balance EOY</span></th></tr>";

		// The changing cell for the Annual Payment column
		var changingValCell = "<table class='ann-pay-table'><tr><td style='padding-right: 2px !important;'>$</td><td style='padding-left: 0px !important; padding-right: 0px !important;'><span id='annPayAmt-" + idx + "'  class='ann-pay' style='color: " + newValColor + ";'>" + RORTableArray[4 + rowIdx].toLocaleString() + "</span><span><input type='text' name='annual_payment' id='annPayInput-" + idx + "' class='ann-pay-entry-field' onchange='mathfuncts.changeVal(this.value, this.id);' autocomplete='off' value='" + RORTableArray[4 + rowIdx].toLocaleString() + "' style='text-align: center; width: 50px;'></input></span></td><td style='padding-left: 2px !important;'><span id='editBtn-" + idx + "' class='edit-btn roll fa fa-fw fas' aria-hidden='true' onClick='mathfuncts.toggleBtn(" + idx + ")'>&#xf044;</span><span id='recalcBtn-" + idx + "' class='recalc-btn roll fa' aria-hidden='true' onClick='mathfuncts.recalcBtn()'>&#xf021;</span></td></tr></table>";



					// the values placed in table rows
					// with the changing cell inserted into AnnPayment cell
					var outputTableRow = "<tr class='output-data-row'><td class='yrs-from-start center'><span>"+RORTableArray[0+rowIdx]+"</span></td><td class='year center'><span>"+ RORTableArray[1+rowIdx] +"</span></td><td class='bal-BOY'><span>$"
			+ RORTableArray[2 + rowIdx].toLocaleString() + "</span></td><td class='int-rate'><span style='color: " + rateColor + "'>" + RORTableArray[3 + rowIdx] + "%</span></td><td id='AnnPayment-" + idx + "'class='ann-pymt center'>" + changingValCell + "</td><td class='mgmt-fee right' style='padding-right: 5%;'><span>$" + (RORTableArray[5 + rowIdx].toFixed(2)).toLocaleString() + "</span></td><td class='output-data data-label-" + i + " bold'><span>/<span></td></tr>";


					if (idx == 0) {
						$('#'+theTable).html(outputTableHeader + outputTableRow);
					} else {
						$('#'+theTable).append(outputTableRow);
					}

					dispNewBal = newBalance^0;
		$('#' + theTable + ' .data-label-' + i + ' span').css({ color: newBalColor }).html("$" + dispNewBal.toLocaleString());
	};


}
