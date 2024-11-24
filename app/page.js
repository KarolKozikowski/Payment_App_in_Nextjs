"use client"
import Data from "./Data/history.json"
import React, {useState} from "react";
import DisplayCategories from "@/app/Components/DisplayCategories";
import DisplayPaymentHistory from "@/app/Components/DisplayPaymentHistory";

export default function Home() {

    const [selectedCharge, setSelectedCharge] = useState(null);
    const openMenu = (charge)=>{setSelectedCharge(charge);}
    const closeMenu = () =>{setSelectedCharge(null);}

    const [category, setCategory] = useState(()=>{return "Category"});
    const changeCategory = (newCategory)=>{newCategory.target.value==="All" ? setCategory("Category") : setCategory(newCategory.target.value);}

    const [sort, setSort] =useState(()=>{return "DateAsc"});
    const changeSortToTitle = ()=>{sort==="Title" ? setSort("TitleRev") : setSort("Title");}
    const changeSortToAmount = () => {sort==="AmountAsc" ? setSort("AmountDesc") : setSort("AmountAsc");}
    const changerSortToDate = () => {sort==="DateAsc" ? setSort("DateDesc") : setSort("DateAsc");}

    return (
        <div>
            <title>My Payments</title>
            <h2 className="title">{category==="Category" ? "My Payments" : category}</h2>
            <table>
                <thead>
                    <tr>
                        <td onClick={changeSortToTitle} className={sort==="Title" || sort==="TitleRev" ? "color" : "highlight"}>Title</td>
                        <td onClick={changeSortToAmount} className={sort==="AmountAsc" || sort==="AmountDesc" ? "color" : "highlight"}>Amount</td>
                        <td><select defaultValue={category} onChange={changeCategory}>
                                <option value="Category" hidden>Category</option>
                                <option value="All">All</option>
                                <DisplayCategories/>
                            </select></td>
                        <td onClick={changerSortToDate} className={sort==="DateAsc" || sort==="DateDesc" ? "color" : "highlight"}>Date</td>
                    </tr>
                </thead>
                <tbody>
                    <DisplayPaymentHistory
                        sort={sort}
                        category={category}
                        openMenu={openMenu}
                    />
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
