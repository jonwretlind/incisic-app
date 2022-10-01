import './RORCalc.css';
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

class RORCalc extends Component {
  constructor() {
    super();
    this.def = {
      BOY:            1000,
      annPay:         1000,
      mngFee:         1.00,
      startYear:      1963,
      numYears:       5,
      percentStocks:  100,
      percentBonds:   0,
      percentTreas:   0,
    };
    this.RATE = RATE;
    _this = this;
  }

  changed(event) {
    _this.def.presVal = (document.getElementById('presVal').value == "") ? _this.def.presVal : Number(document.getElementById('presVal').value);
    _this.def.futureVal = (document.getElementById('futureVal').value == "") ? _this.def.futureVal : Number(document.getElementById('futureVal').value);
    _this.def.annualContributions = (document.getElementById('annualContributions').value == "") ? _this.def.annualContributions : Number(document.getElementById('annualContributions').value);
    _this.def.numYears = (document.getElementById('numYears').value == "") ? _this.def.numYears : Number(document.getElementById('numYears').value);
  }


  calculate() {
    // * @usage RATE($periods, $payment, $present, $future, $type, $guess)
    console.log(_this.def.numYears, _this.def.annualContributions, _this.def.presVal, _this.def.futureVal);
    var per = _this.def.numYears,
      cont = _this.def.annualContributions * -1,
      pv = _this.def.presVal,
      fv = _this.def.futureVal;
    var rate = (_this.RATE(per, cont, pv, fv, 0, 1) * 100).toFixed(2);
    var calcResult = document.getElementById("CalcResult");
    var calcLabel = document.getElementById("CalcLabel");
    calcLabel.innerHTML = "The Interest Rate is"
    calcResult.innerHTML = rate + "%";
  }

  render() {
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <div className="container">
          <div id="RORCalcWrapper">
            <div className="ror-data columns">
                <div class="col1">
                  <div id="input1">
                    <label>Present Value <ToolTip /></label>
                    <input type="number"
                      id="presVal"
                      placeholder={this.def.BOY}
                      onChange={(event) => this.changed(event)} />
                  </div>
                  <div id="input2">
                    <label>Annual Payment <ToolTip /></label>
                    <input type="number"
                      id="annPay"
                      placeholder={this.def.annPay}
                      onChange={(event) => this.changed(event)} />
                  </div>
                  <div id="input3">
                    <label>Management Fee <ToolTip /></label>
                    <input type="number"
                      id="mngFee"
                      placeholder={this.def.mngFee}
                      onChange={(event) => this.changed(event)} />
                  </div>
                  <div id="input4">
                    <label>Starting Year <ToolTip /></label>
                    <input type="number"
                      id="startYear"
                      placeholder={this.def.startYear}
                      onChange={(event) => this.changed(event)} />
                  </div>
                  <div id="input5">
                    <label>Number of Years <ToolTip /></label>
                    <input type="number"
                      id="numYears"
                      placeholder={this.def.numYears}
                      onChange={(event) => this.changed(event)} />
                  </div>
                </div>
                <div class="col2">
                  <div class="group">
                    <h5>PORTFOLIO ALLOCATION</h5>
                    <div>
                      <label>Stock Market (S&amp;P 500) <ToolTip /></label>
                      <input type="number"
                        id="stocksPortfolio"
                        placeholder={this.def.percentStocks}
                        onChange={(event) => this.changed(event)} />
                    </div>
                    <div>
                      <label>Corporate Bonds <ToolTip /></label>
                      <input type="number"
                        id="bondsPortfolio"
                        placeholder={this.def.percentBonds}
                        onChange={(event) => this.changed(event)} />
                    </div>
                    <div>
                      <label>Government Treasuries  <ToolTip /></label>
                      <input type="number"
                        id="treasPortfolio"
                        placeholder={this.def.percentTreas}
                        onChange={(event) => this.changed(event)} />
                    </div>
                  </div>
                </div>
            </div>
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


export default RORCalc;
