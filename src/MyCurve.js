/* jshint esversion: 8 */
import './MyCurve.css';
import { withStyles } from '@mui/material/styles';
import React, { Component } from 'react';
import * as d3 from "d3";
import Finance from 'financejs';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const finance = new Finance();

class MyCurve extends Component {
  constructor() {
    super();
    this.def = {
      bal: 0,
      principal: 0,
      contrib: 5000,
      yrs: 80,
      retire: 30,
      rate: 5,
      w_rate: 4
    };
  }

  componentDidMount() {
    this.drawChart(this.def.principal, this.def.contrib, this.def.yrs, this.def.retire, this.def.rate, this.def.w_rate);
  }

  drawChart(principal, contrib, yrs, retire, rate, w_rate) {
    //compound curve 1
    //create a dataset
    // EOY contributions
    let dataSet = [];
    for (var n = 0; n < yrs; n++) {
      let r = rate / 100; // convert percentage
      let _bal = this.def.bal + principal + contrib;
      principal = finance.CI(r, 1, _bal, n);
      let dataBlock = {
        "Phase": "Accumulation Phase",
        "year": n,
        "contrib": contrib,
        "years": yrs,
        "principal": finance.FV(r, principal, n),
        "retirement": retire,
        "balance": _bal
      }
      dataSet.push(dataBlock);
    }
    //clear first
    d3.select("#Canvas").selectAll("path").remove();
    d3.select("#Canvas").selectAll("g").remove();
    d3.select("#Canvas").selectAll("rect").remove();

    //then draw chart canvas
    var vis = d3.select("#Canvas"),
      WIDTH = 800,
      HEIGHT = 400,
      MARGINS = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 60
      };
    const svg = d3.select("#Canvas")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    var dataGroup = d3.nest()
      .key(function (d) {
        return d.Phase;
      })
      .entries(dataSet);

    var lSpace = WIDTH / dataGroup.length; // length of each unit

    var xScale = d3.scaleLinear()
      .range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([d3.min(dataSet, function (d) {
        return d.year;
      }), d3.max(dataSet, function (d) {
        return d.year;
      })]);

    var yScale = d3.scaleLinear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([d3.min(dataSet, function (d) {
        return d.principal;
      }), d3.max(dataSet, function (d) {
        return d.principal;
      })]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var lineGen = d3.line()
      .x(function (d) {
        return xScale(d.year);
      })
      .y(function (d) {
        return yScale(d.principal);
      }).curve(d3.curveBasis);

    console.log("Retirement Year: " + retire)

    var Xwd = WIDTH - (MARGINS.right + MARGINS.left), // width of the chart area
      fudge = 5, // fudge about 5 px
      ltGreen = "#def7de";

    vis.append('rect')
      .attr("x", MARGINS.left)
      .attr("y", MARGINS.bottom)
      .attr("width", Xwd * (retire / yrs) + fudge)
      .attr("height", HEIGHT - (MARGINS.top + MARGINS.bottom))
      .attr("fill", ltGreen);

    dataGroup.forEach(function (d, i) {
      var theKey = d.key;
      console.log(theKey, d.values);
      vis.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function (d, j) {
          return "hsl(207,80%,40%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + theKey)
        .attr('fill', 'none');

      vis.append("text")
        .attr("x", (lSpace / 2) - 50)
        .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("id", "Legend")
        .text(d.key)
    });

    vis.append("svg:g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);

    vis.append("svg:g")
      .attr("class", "axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    /*  const lineGenerator = d3
         .line()
         .x((d) => xScale(xAccessor(d)))
         .y((d) => yScale(yAccessor(d)))
         .curve(d3.curveBasis);
  
      svg.selectAll("rect")
          .data(data)
          .enter()
          .append("path")
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => h - 10 * d)
          .attr("width", 65)
          .attr("height", (d, i) => d * 10)
          .attr("fill", "green");
          */
  }

  calc(event) {
    var p = (document.getElementById('starting_amt').value == "") ? parseInt(this.def.principal) : parseInt(document.getElementById('starting_amt').value);
    var c = (document.getElementById('contributions').value == "") ? parseInt(this.def.contrib) : parseInt(document.getElementById('contributions').value);
    var y = (document.getElementById('years').value == "") ? parseInt(this.def.yrs) : parseInt(document.getElementById('years').value);
    var rt = (document.getElementById('retirement').value == "") ? parseInt(this.def.retire) : parseInt(document.getElementById('retirement').value);
    var r = (document.getElementById('rate').value == "") ? parseInt(this.def.rate) : parseInt(document.getElementById('rate').value);
    var w = (document.getElementById('withdrawal_rt').value == "") ? parseInt(this.def.w_rate) : parseInt(document.getElementById('withdrawal_rt').value);

    console.log("CHANGED: " + p, c, y, rt, r, w);
    this.drawChart(p, c, y, rt, r, w);
  }

  render() {
    console.log(this.def.principal, this.def.contrib, this.def.yrs, this.def.retire, this.def.rate, this.def.w_rate);
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <div id="MyCurve" className="container">
          <div id="MyCurveDataEntry">
            <table className="mycurve-data">
              <tbody>
                <tr>
                  <td>
                    <label>Starting Amount</label>
                    <input type="number"
                      id="starting_amt"
                      placeholder={this.def.principal} />
                  </td>
                  <td>
                    <label>Number of Years Invested</label>
                    <input type="number"
                      id="years"
                      placeholder={this.def.yrs} />
                  </td>
                  <td>
                    <label>Annual Growth Rate (%)</label>
                    <input type="number"
                      id="rate"
                      placeholder={this.def.rate} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Annual Contributions</label>
                    <input type="number"
                      id="contributions"
                      placeholder={this.def.contrib} />
                  </td>
                  <td>
                    <label>Retirement Year</label>
                    <input type="number"
                      id="retirement"
                      placeholder={this.def.retire} />
                  </td>
                  <td>
                    <label>Annual Withdrawal Rate (%)</label>
                    <input type="number"
                      id="withdrawal_rt"
                      placeholder={this.def.w_rate} />
                  </td>
                </tr>
              </tbody>
            </table>
            {<Button className="mycurve-btn"
              variant="contained"
              size="large"
              onClick={(event) => this.calc(event)}
            >
              Calculate My Curve
            </Button>}
          </div>
          <svg id="Canvas"></svg>
        </div>
      </Box>
    )
  }

}

export default MyCurve;
