import Data from "./Data/history.json"
import React from "react";
export default function Home() {
  const displayPaymentHistory = Data.map((record, index)=>{
    return (
        <tr key={index}>
            <td>{record.title}</td>
            <td>{record.amount}</td>
            <td>{record.category}</td>
            <td>{record.date}</td>
            <td>{record.description}</td>
        </tr>
    )
  })

  return (
      <div>
        <title>My Payments</title>
        <h2 className="title">Payment History</h2>
        <table>
          <thead>
          <tr>
            <td>Title</td>
            <td>Amount</td>
            <td>Category</td>
            <td>Date</td>
            <td>Description</td>
          </tr>
          </thead>
          <tbody>
          {displayPaymentHistory}
          </tbody>
        </table>
      </div>
  );
}
