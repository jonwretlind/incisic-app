
/* =========================================================
   ================= GOAL SEEKING FUNCTIONS ================
   ========================================================= */

   class GSeek extends MathFuncts {
	   
	   constructor(myCalcPVonIR) {
		   super();
	   }
	   
			goalSeek(oParams) {
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