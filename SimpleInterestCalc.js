import './SimpleInterestCalc.css';
import RATE from './helpers/rate.js';
import Finance from 'financejs';
import ToolTip from './snippets/tooltip.js';
import React from 'react';
import { Component } from 'react';
import { withStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const finance = new Finance();
var _this;

class SimpleInterestCalc extends Component {
      constructor() {
        super();
        this.def = {  presVal: 0,
                      futureVal: 1000000,
                      annualContributions: 1200,
                      numYears: 40
                    };
        this.RATE = RATE;
        _this = this;
      }

      changed(event) {
        _this.def.presVal = (document.getElementById('presVal').value == "")   ? _this.def.presVal : convert(document.getElementById('presVal').value);

        _this.def.futureVal = (document.getElementById('futureVal').value == "")   ? _this.def.futureVal : convert(document.getElementById('futureVal').value);

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
          case "futureVal" :
            val = _this.def.futureVal;
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
        var per =   _this.def.numYears,
            cont =  _this.def.annualContributions * -1,
            pv =    _this.def.presVal,
            fv =    _this.def.futureVal;
        console.log(per, cont, pv, fv);
        var rate = (_this.RATE(per, cont, pv, fv, 1, 1) * 100).toFixed(2);
        var calcResult = document.getElementById("CalcResult");
        var calcLabel = document.getElementById("CalcLabel");
        calcLabel.innerHTML = "The Interest Rate is"
        calcResult.innerHTML = rate + "%";
      }


      render() {
        var ids = ['#presVal','#futureVal', '#annualContributions', '#numYears' ]

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
                              className="num"
                              placeholder={this.def.presVal.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'presVal')}
                              />
                    </td>
                    <td>
                      <label>Future Value <ToolTip /></label>
                      <input  type="text"
                              id="futureVal"
                              className="num"
                              placeholder={this.def.futureVal.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'futureVal')}
                              />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Annual Contributions <ToolTip /></label>
                      <input  type="text"
                              id="annualContributions"
                              className="num"
                              placeholder={this.def.annualContributions.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'annualContributions')}
                              />
                    </td>
                    <td>
                      <label>Number of Years <ToolTip /></label>
                      <input  type="text"
                              id="numYears"
                              className="num"
                              placeholder={this.def.numYears.toLocaleString()}
                              onChange={(event)=>this.changed(event)}
                              onBlur={(event)=>this.format(event, 'numYears')}
                              />
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


export default SimpleInterestCalc;
