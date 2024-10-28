"use client"
import Data from "./Data/history.json"
import React, {useState} from "react";
export default function Home() {
    const [selectedCharge, setSelectedCharge] = useState(null);
    const openMenu = (charge)=>{
        setSelectedCharge(charge);
    }
    const closeMenu = (charge) =>{
        setSelectedCharge(null);
    }
    const displayPaymentHistory = Data.map((record, index)=>{
    return (
        <tr key={index}>
            <td>{record.title}</td>
            <td>{record.amount}</td>
            <td>{record.category}</td>
            <td>{record.date}</td>
            <td><button onClick={()=>openMenu(record)}>more</button></td>
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
          {
              selectedCharge && (
                  <div>
                      <p>name: {selectedCharge.title}</p>
                  </div>
              )
          }
      </div>
  );
}
