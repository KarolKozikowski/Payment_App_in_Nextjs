"use client"
import Data from "./Data/history.json"
import React, {useState} from "react";

export default function Home() {

    const [selectedCharge, setSelectedCharge] = useState(null);
    const openMenu = (charge)=>{setSelectedCharge(charge);}
    const closeMenu = () =>{setSelectedCharge(null);}

    const [category, setCategory] = useState(()=>{return "Category"});
    const changeCategory = (newCategory)=>{newCategory.target.value==="All" ? setCategory("Category") : setCategory(newCategory.target.value);}

    function displayCategories(){
        let categories = [];
        Data.map((record)=>{
            if(!categories.includes(record.category)){
                categories.push(record.category);
            }
        });
        return categories.map((record, index) => {
            return (
                <option key={index} value={record}>{record}</option>
            );
        });
    }
    const displayPaymentHistory = Data.map((record, index)=>{
        function display(){
            return (
                <tr onClick={()=>openMenu(record)} key={index}>
                    <td>{record.title}</td>
                    <td>{record.amount}zł</td>
                    <td>{record.category}</td>
                    <td>{record.date}</td>
                </tr>
            );
        }
        if(category==="Category"){
            return display();
        }
        else{
            if(record.category===category){
                return display();
            }
        }
    });
    return (
        <div>
            <title>My Payments</title>
            <h2 className="title">{category==="Category" ? "My Payments" : category}</h2>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Amount</td>
                        <td><select defaultValue={category} onChange={changeCategory}>
                                <option value="Category" hidden>Category</option>
                                <option value="All">All</option>
                                {displayCategories()}
                            </select></td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {displayPaymentHistory}
                </tbody>
            </table>{
            selectedCharge && (
                <div className="infobox">
                    <table className="more">
                        <tbody>
                            <tr>
                                <td colSpan="2" className="name">{selectedCharge.title}</td>
                            </tr>
                            <tr>
                                <th>CHARGE</th>
                                <td>{selectedCharge.amount}zł</td>
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
