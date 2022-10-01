// +++++++++++++++++++++++++ //
// Mathematical Calculations //
// +++++++++++++++++++++++++ //

function MathFuncts()  {

			//calc management fee
			this.mngFee = function(pBOY, pannPay, pmngFee) {
				return (pBOY + pannPay) * pmngFee;
			}

			// End-of-Year Balance Calculation //
			this.balEOY = function(pBOY, pannPay, pmngFee, pEconData, tyrs) {
				if ( tyrs < 1 ) {tyrs = 1};
				// take out management fee at END of the year
				this.myBalance = ((pBOY + pannPay) * Math.pow((1 + (pEconData / 1)), tyrs)) - ((pBOY+pannPay) * pmngFee);
				//console.log("myBalance is: " + myBalance + " | Year: " + tyrs);
				return this.myBalance;
			};

			this.averageYield = function( $, sumOfYields, numYears, theTable, annPay, BOYBalance ) {
				if (debug) console.log("CALCULATE AVERAGE YIELD: ", sumOfYields, numYears, theTable, annPay, BOYBalance);

				avgYield = sumOfYields / numYears;
				$('.'+theTable+'-yields div.avgYield').html("<p>Average Yield: " + avgYield.toFixed(2) + "% </p>");
				if (avgYield <= 0) {
					$('.'+theTable+'-yields div.avgYield').css({ backgroundColor: '#f2a2a2'});
				};

					this.fantasyPVonIR(avgYield, annPay, numYears, BOYBalance[0]);
					$('.'+theTable+'-yields div.avgYield').append("<p style='font-size:0.7em;'>If True, Total Value Would Be: $" + this.fantasyPV.toLocaleString() + " </p>");
			};



			this.fantasyPVonIR = function(avgROR, annPay, numYears, pBOYBalance) {
					// calculate the value of the account,
					// IF Average ROR was true...
					var avgROR = avgROR/100;
					this.fantasyPV = Math.round((1+avgROR)*annPay*(Math.pow((1+avgROR),numYears)-1)/avgROR + pBOYBalance * Math.pow((1+avgROR),numYears));
					return this.fantasyPV;
			};


			this.calcReturn = function(initVal, endVal) {
				this.theReturn = Math.abs((initVal - endVal) / initVal);
				return this.theReturn;
			};

			this.calcPVonIR = function(IR, annPay, numYears, pBOYBalance) {
				this.myCalcPVonIR = Math.round((1+IR)*annPay*((Math.pow((1+IR),numYears)-1)/IR)  + pBOYBalance*Math.pow((1+IR/1),numYears));
				//alert(Number(this.myCalcPVonIR));
				return this.myCalcPVonIR;
			};

			this.calcSimpleFV  = function(IR, annPay, numYears, pBOYBalance) {
				this.mySimpleFV = Math.round(pBOYBalance*Math.pow((1+IR),numYears))+(annPay*numYears);
				return this.mySimpleFV;
			};

			this.calcSimpleFVBOY  = function(IR, annPay, numYears, pBOYBalance, i) {
				if (i == 0) { pBOYBalance += annPay; numYears--; };
				this.mySimpleFVBOY = (annPay) + Math.round(pBOYBalance*((1+IR)**numYears));
				return this.mySimpleFVBOY;
			};


			// generate a random number within a range
			this.randomGen = function(hi, lo) {
				var guess = Math.random() * (hi - lo) + lo;
				return guess;
			};


			// these functions recalculate table values
			// when annual contribution/payment has been changed

				//add a function to handle refresh buttons
				this.recalcBtn = function() {
					console.log('RECALC');
					recalcvalues.recalc(RORTableArray);
				};

				this.toggleBtn = function(x) {
					var selector = ".ann-pay-table .recalc-btn, #annPayInput-" + x + ", #annPayAmt-" + x + ", #editBtn-" + x + ", #recalcBtn-" + x;
					$(selector).toggle();
				}

				this.changeVal = function(newVal, id) {
					console.log("Value Changed to: " + newVal + " in field: " + id);
					var idArr = id.split("-");
					console.log('Row: ' + idArr[1]);
					RORTableArray[4+(6*idArr[1])] = newVal;

					recalcvalues.recalc(RORTableArray, newVal, idArr[1]);
				};

				this.clearTable = function(pBOYBalance) {
					dispNewBal = pBOYBalance^0;
					totMngFee = (dispNewBal + annPay) * mngFee;
					$('.output-data-row').remove();
				};

				this.clearValues = function() {
					 newBalance = new Number(BOY);
					 myBalance = new Number(0);
					 BOYBalance = [];
					 EOYBalance = [];
					 sumOfYields = null;
					 dispNewBal = null;
           yrFromStart = null;
				};

				this.weightedAvg = function() {

				};

			// ++++++++++++++++++++++ //
			// Goal-Seeking Functions //
			// ++++++++++++++++++++++ //

			this.actualYield = function(theTable, idx) {
				//console.log ("actualYield() called by: " + this.actualYield.caller);

				if (BOYBalance.length) {
					var BOYidx = BOYBalance.length-1;
					var BOYBal = Number(BOYBalance[0]);
				};

			  console.log("idx=" + idx, "BOYBal=" + BOYBal);

				// deal with "zero" bug....
				if ( BOYBal <= 1 ) BOYBal = 1;
				if ( BOYBal <= 10 && numYears >= 10 ) {
					BOYBal = 10; // seed a number so that larger calcs work
				};
				//endif "zero" bug

				var IR = 0;

				// let's tweak accuracy depending on total of account values
				// tolerance is a percentage of the target.
				var tolerance = Number();
				switch (true) {

					case ( newBalance >= 1 && newBalance < 5000 ) :
						tolerance = .001;
						break;

					case ( newBalance >= 5000 && newBalance < 10000 ) :
						tolerance = .005;
						break;

					case ( newBalance >= 10000 && newBalance < 50000 ) :
						tolerance = .007;
						break;

					case ( newBalance >= 50000 && newBalance < 200000 ) :
						tolerance = .02;
						break;

					case ( newBalance >= 200000 && newBalance < 500000 ) :
						tolerance = .025;
						break;

					case ( newBalance >= 500000 && newBalance < 1000000 ) :
						tolerance = .03;
						break;

					case ( newBalance >= 1000000 && newBalance < 2500000 ) :
						tolerance = .04;
						break;

					case ( newBalance >= 2500000 && newBalance < 5000000 ) :
						tolerance = .05;
						break;

					case ( newBalance > 5000000 ) :
						tolerance = .055;
						break;

					default :
						tolerance = .007;
						break;
				}; // end switch


					var guessCounter = 0; // set a counter to track number of guesses
					var guessLimit = 0.25;
					var hi = guessLimit, lo = guessLimit * -1; //set initial range of random numbers to test

					GSResult = null;

				do {
					// first, store the values for lo and hi into hiTest and loTest to compare
					var hiTest = hi, loTest = lo;
					var flag = true; //reset flag each guess

					var median = (hi + lo)/2;

					// generate a new random IR within a range to test
					//console.log(mathfuncts.randomGen(hi, lo));
					IR = mathfuncts.randomGen(hi, lo)

					// prevent hi and lo from switching places...
					switch (true) {
						case ( hi < lo ) :
							flag = false;
							hi = hiTest;
							break;
						case ( lo > hi ) :
							flag = false;
							lo = loTest;
							break;
					};

					// need to tweak things for big, ridiculous numbers
					switch (true) {
						case (newBalance >= 100000 && numYears < 500000) :
							var adj = .0000001;
							break;

						case (newBalance >= 500000 && numYears < 1000000) :
							var adj = .00000001;
							break;

						case (newBalance >= 1000000 && numYears < 5000000) :
							var adj = .000000001;
							break;

						case (newBalance >= 5000000 && numYears < 10000000) :
							var adj = .0000000001;
							break;

						case (newBalance >= 10000000) :
							var adj = .00000000001;
							break;

						default:
							var adj = .0000001;
							break;
					 }

					var breakFlag = 0;

					// only run the calculations if the guess is in proper range
					if ( flag === true ) {
						GSResultTest = GSResult;

						// run the goalSeek on beginning balance
						// to test IR | pass null to the beginning balance
						mathfuncts.goalSeekROR(IR, annPay, numYears, null);

						if ( ( GSResult > 0 && GSResultTest > 0) && ( !isNaN(GSResult) ) ) { //  we don't count it if GSResult < 0, NaN
							guessCounter += 1;
							var targetNumberLowerLimit = BOYBal - (newBalance.toFixed(2) * ((tolerance/100) + (numYears * adj)));
							var targetNumberUpperLimit = BOYBal + (newBalance.toFixed(2) * ((tolerance/100) + (numYears * adj)));

							if ( GSResultTest !== null) GSResultTest = GSResultTest.toFixed(4);
							if (GSResult !== null) {
								if (GSResult.toFixed(4) == GSResultTest) breakFlag = 1;
							};

							function debugMsg() {
								var whichTable;

								// For Debugging..
								switch (idx) {
									case 0:
										whichTable = "STOCKS";
										break;
									case 1:
										whichTable = "BONDS";
										break;
									case 2:
										whichTable = "TREASURIES";
										break;
									case 3:
										whichTable = "COMPOSITE";
										break;

									default :
										//
									break;
								}; // / debugging...

								try {console.log(guessCounter + " : [" + whichTable + "] IR: " + (IR*100).toFixed(2) + " -> GSResult: " + GSResult.toFixed(4) + " || Hi: " + (hi*100).toFixed(4) + " | Lo: " + (lo*100).toFixed(4) + " | distance: " + (hiTest - loTest).toFixed(4) + " --> BREAKFLAG = " + breakFlag  ); } catch(e) { console.log("----> ERROR in GSResult: " + GSResult + " or IR: " + (IR*100) + ">>>> || Hi: " + (hi*100).toFixed(4) + " | Lo: " + (lo*100).toFixed(4) ); }

								console.log("GSResultTest: " + GSResultTest + " | targetLow: " + targetNumberLowerLimit + ",  targetHi: " + targetNumberUpperLimit  + " || median: " + (median*100).toFixed(4) + " hiTest: " + (hiTest*100).toFixed(4) + ", loTest: " + (loTest*100).toFixed(4));
								console.log('----------------------------------------------------------------------------------------------------------------------');
							};
							if ( debug ) debugMsg();

							// narrow hi/lo range of random numbers to generate on next iteration based on guessed number
							if ( IR < median ) {
								if (GSResult > targetNumberLowerLimit && IR > loTest && IR < hiTest )  { lo = IR };
								} else {
									if (GSResult < targetNumberUpperLimit && IR < hiTest && IR > loTest )  { hi = IR };
							};

								// check to see if the hi and lo are too close and need to be adjusted upwards to find the target zone,
								// no further than the limits
								if ( (hiTest - loTest) < 0.001 && (hi - lo) > -0.001 ) { lo -= .005; hi += .005; console.log('too close!')};
								if ( hi > guessLimit ) hi = guessLimit;
								if ( lo < guessLimit * -1 ) lo = guessLimit * -1;
						};
					};

					var inRange = false;
					if ((( !(GSResult > targetNumberLowerLimit && GSResult < targetNumberUpperLimit) || isNaN(GSResult) || GSResult === null) && guessCounter < 5000 ) ) {
						inRange = true;
					};

				} while (
						inRange == true || ( inRange == true && breakFlag == 1 )
				); // end do/while loop

				hi = guessLimit, lo = guessLimit * -1; //reset initial range of random numbers to test


				actROR = IR*100;
				console.log("===========================================================");
				console.log("ACTUAL ROR = " + actROR.toFixed(2) + "%");
				console.log("===========================================================");
				console.log(" ");

				$('.'+theTable+'-yields div.actYield').html("<p style='font-weight: bold;'>ACTUAL Yield: " + actROR.toFixed(2) + "% </p>");
				if (actROR <= 0) {
					$('.'+theTable+'-yields div.actYield').css({ backgroundColor: '#f2a2a2' });
				};

				return actROR;
			};

			this.goalSeekROR = function(IR, annPay, numYears, pBeginningBal) {
				 const GS = new GSeek();

				// need to tweak things for big, ridiculous numbers
				switch (true) {
					case (numYears > 20 && numYears < 40) :
						var tol = 1.5;
						var maxIt = 10000000;
						break;

					case (numYears >= 40) :
						var tol = 3;
						var maxIt = 100000000;
						break;

					default:
						var tol = .75;
						var maxIt = 100000;
						break;
				 }

				 GSResult = GS.goalSeek({
					Func: mathfuncts.calcPVonIR,
					aFuncParams: [IR, annPay, numYears, pBeginningBal],
					oFuncArgTarget: {
					  Position: 3
					},
					Goal: newBalance,
					Tol: tol,
					maxIter: maxIt
				  });

				return GSResult;

			};


} // end class MathFuncts


/* =========================================================
   ================= GOAL SEEKING FUNCTIONS ================
   ========================================================= */

   function GSeek() {


			this.goalSeek = function(oParams) {
				var g, Y, Y1, OldTarget;

				oParams.Tol = (oParams.Tol || 0.001 * Goal);
				oParams.maxIter = (oParams.maxIter || 1000);


					//Iterate through the guesses
					for (var i = 0; i < oParams.maxIter; i++) {
						//define the root of the function as the error
						Y = oParams.Func.apply(oParams.This, oParams.aFuncParams) - oParams.Goal;
						//was our initial guess a good one?
						if (Math.abs(Y) <= oParams.Tol) {
							return oParams.aFuncParams[oParams.oFuncArgTarget.Position];
						} else {
							OldTarget = oParams.aFuncParams[oParams.oFuncArgTarget.Position];
							oParams.aFuncParams[oParams.oFuncArgTarget.Position] = OldTarget + Y;
							Y1 = oParams.Func.apply(oParams.This, oParams.aFuncParams) - oParams.Goal;
							g = (Y1 - Y) / Y;

							if (g === 0) {
								g = 0.0001;
							};

							oParams.aFuncParams[oParams.oFuncArgTarget.Position] = OldTarget - Y / g;
						};

					};
					if (Math.abs(Y) > oParams.Tol) {
						return null;
					};
				};


   }// end class GSeek
