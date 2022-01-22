import './FutureValueCalc.css';
import FV from './helpers/fv.js';
import Finance from 'financejs';
import ToolTip from './snippets/tooltip.js';
import React from 'react';
import { Component } from 'react';
import { withStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
var _this;

class FutureValueCalc extends Component {
      constructor() {
        super();
        this.def = {  presVal: 1000,
                      interestRate: 2,
                      annualContributions: 1200,
                      numYears: 40
                    };
        this.FV = FV;
        _this = this;
      }

      changed(event) {
        _this.def.presVal = (document.getElementById('presVal').value == "")   ? _this.def.presVal : convert(document.getElementById('presVal').value);

        _this.def.interestRate = (document.getElementById('interestRate').value == "")   ? _this.def.interestRate : convert(document.getElementById('interestRate').value);

        _this.def.annualContributions = (document.getElementById('annualContributions').value == "")   ? _this.def.annualContributions  : convert(document.getElementById('annualContributions').value);

        _this.def.numYears = (document.getElementById('numYears').value == "")   ? _this.def.numYears : convert(document.getElementById('numYears').value);

        function convert(ele) {
          return Number(ele.replace(/[\,]+/g, ""));
        }
      }

      format(event, ID) {
        var val;
        switch (ID) {
          case "presVal" :
            val = _this.def.presVal;
            break;
          case "interestRate" :
            val = _this.def.interestRate;
            break;
          case "annualContributions" :
            val = _this.def.annualContributions;
            break;
          case "numYears" :
            val = _this.def.numYears;
            break;
        }

        console.log("The value of " + ID + " is: " + val);
        document.getElementById(ID).value = val.toLocaleString();
      }

      calculate() {
        // * @usage RATE($periods, $payment, $present, $future, $type, $guess)
        console.log(_this.def.numYears, _this.def.annualContributions, _this.def.presVal, _this.def.interestRate);
        var per =   _this.def.numYears,
            cont =  -(_this.def.annualContributions),
            pv =    _this.def.presVal,
            int =   _this.def.interestRate;
        console.log(per, cont, pv, int);
        var fv = (_this.FV(int/100, per, cont, pv)).toFixed(2);
        var calcResult = document.getElementById("CalcResult");
        var calcLabel = document.getElementById("CalcLabel");
        calcLabel.innerHTML = "The Future Value is"
        calcResult.innerHTML = "$" + fv.toLocaleString();
      }

      render() {
        return (
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
            >
            <div className="container">
              <div id="CalcDataEntry">
                <table className="mycurve-data">
                <tbody>
                  <tr>
                    <td>
                      <label>Present Value <ToolTip /></label>
                      <input  type="text"
                              id="presVal"
                              placeholder={this.def.presVal.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'presVal')}
                              />
                    </td>
                    <td>
                      <label>Interest Rate <ToolTip /></label>
                      <input  type="text"
                              id="interestRate"
                              placeholder={this.def.interestRate.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'interestRate')}
                              />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Annual Contributions <ToolTip /></label>
                      <input  type="text"
                              id="annualContributions"
                              placeholder={this.def.annualContributions.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'annualContributions')}
                              />
                    </td>
                    <td>
                      <label>Number of Years <ToolTip /></label>
                      <input  type="text"
                              id="numYears"
                              placeholder={this.def.numYears.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'numYears')}/>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <Button className="calc-btn"
                        variant="contained"
                        size="large"
                        onClick={this.calculate}
                >
                  Calculate
                </Button>
              </div>
              <div>
                <div id="CalcLabel"></div>
                <div id="CalcResult"></div>
              </div>
            </div>
          </Box>
        )
      }

  }


export default FutureValueCalc;
