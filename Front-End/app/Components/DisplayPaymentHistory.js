import Data from "@/app/Data/history.json";
import React from "react";

export default function DisplayPaymentHistory ({sort, openMenu, category}){
    let recordArray = Data.map((record)=>{
        return record
    });
    switch(sort){
        case "Title":
            recordArray.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "TitleRev":
            recordArray.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "AmountAsc":
            recordArray.sort((a, b) => a.amount-b.amount);
            break;
        case "AmountDesc":
            recordArray.sort((a, b) => b.amount-a.amount);
            break;
        case "DateAsc":
            recordArray.sort((a, b) => b.date.localeCompare(a.date));
            break;
        case "DateDesc":
            recordArray.sort((a, b) => a.date.localeCompare(b.date));
            break;
    }
    return recordArray.map((record, index) => {
        function display() {
            return (
                <tr onClick={() => openMenu(record)} key={index}>
                    <td>{record.title}</td>
                    <td>{record.amount}zł</td>
                    <td>{record.category}</td>
                    <td>{record.date}</td>
                </tr>
            );
        }
        if (category === "Category") {
            return display();
        }
        else if (record.category === category) {
            return display();
        }
    });
}