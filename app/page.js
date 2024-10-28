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
        <tr onClick={()=>openMenu(record)} key={index}>
            <td>{record.title}</td>
            <td>{record.amount}</td>
            <td>{record.category}</td>
            <td>{record.date}</td>
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
          </tr>
          </thead>
          <tbody>
          {displayPaymentHistory}
          </tbody>
        </table>
          {
              selectedCharge && (
                  <div className="infobox">
                      <table className="more">
                          <tbody>
                              <tr>
                                  <td colSpan="2" className="name">{selectedCharge.title}</td>
                              </tr>
                              <tr>
                                  <th>CHARGE</th>
                                  <td>{selectedCharge.amount}</td>
                              </tr>
                              <tr>
                                  <th>DATE</th>
                                  <td>{selectedCharge.date}</td>
                              </tr>
                              <tr>
                                  <th>DESCRIPTION</th>
                                  <td>{selectedCharge.description}</td>
                              </tr>
                              <tr>
                                  <th>RECIPIENT</th>
                                  <td>{selectedCharge.recipient}</td>
                              </tr>
                          </tbody>
                      </table>
                      <button onClick={closeMenu} className="x">X</button>
                  </div>
              )
          }
      </div>
  );
}
