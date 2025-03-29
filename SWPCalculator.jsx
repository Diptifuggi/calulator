import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./swp.css";

const SWPCalculator = () => {
  const [investment, setInvestment] = useState(500000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const [growth, setGrowth] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tableData, setTableData] = useState([]);

  const calculateSWP = () => {
    let balance = investment;
    let monthlyRate = rate / 12 / 100;
    let totalGrowth = 0;
    let totalWithdrawn = 0;
    let data = [];

    for (let i = 1; i <= years * 12; i++) {
      let interest = balance * monthlyRate;
      totalGrowth += interest;
      let balanceAtEnd = balance + interest - withdrawal;
      totalWithdrawn += withdrawal;
      data.push({
        month: i,
        balanceAtBegin: balance.toFixed(2),
        withdrawal: withdrawal.toFixed(2),
        interestEarned: interest.toFixed(2),
        balanceAtEnd: balanceAtEnd.toFixed(2),
      });
      balance = balanceAtEnd;
      if (balance <= 0) break;
    }

    setGrowth(totalGrowth);
    setTotalAmount(balance);
    setTableData(data);
  };

  useEffect(() => {
    calculateSWP();
  }, [investment, withdrawal, years, rate]);

  const chartData = {
    labels: ["Total Invested Amount", "Total Growth", "Final Amount"],
    datasets: [
      {
        data: [investment, growth, totalAmount],
        backgroundColor: ["#007bff", "#4B5563", "#FFBB28"],
      },
    ],
  };

  return (
    <div className="swp-container">
      <h2>SWP Calculator</h2>
      <div className="swp-content">
        <form className="swp-form">
          <label>Total Investment Amount (Rs)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
          />

          <label>Withdrawal Per Month (Rs)</label>
          <input
            type="number"
            value={withdrawal}
            onChange={(e) => setWithdrawal(Number(e.target.value))}
          />

          <label>Withdrawal Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />

          <label>Expected Rate of Return (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </form>

        <div className="swp-chart">
          <Pie data={chartData} />
        </div>
      </div>

      <div className="swp-summary">
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Total Invested Amount</td>
              <td>Rs {investment.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Withdrawal Per Month</td>
              <td>Rs {withdrawal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Expected Rate of Return</td>
              <td>{rate}%</td>
            </tr>
            <tr>
              <td>Withdrawal Period</td>
              <td>{years} Years</td>
            </tr>
            <tr>
              <td>Total Withdrawal Amount</td>
              <td>Rs {tableData.length * withdrawal}</td>
            </tr>
            <tr>
              <td>Final Balance Amount</td>
              <td>Rs {totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Profit</td>
              <td>Rs {growth.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="swp-details">
        <h3>Monthly Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Balance at Begin</th>
              <th>Withdrawal</th>
              <th>Interest Earned</th>
              <th>Balance at End</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>Rs {row.balanceAtBegin}</td>
                <td>Rs {row.withdrawal}</td>
                <td>Rs {row.interestEarned}</td>
                <td>Rs {row.balanceAtEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SWPCalculator;
