/*
  Javascript function to calulate future value
  of an annuity
*/

function FV(int, per, cont, pv) {
  var pow = Math.pow(1 + int, per),
     fv;
  if (int) {
   fv = (cont*(1+int)*(1-pow)/int)-pv*pow;
  } else {
   fv = -1 * (pv + cont * per);
  }
  return fv;
}

export default FV;
