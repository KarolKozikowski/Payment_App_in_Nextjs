"use client"
import Data from "./Data/history.json"
import React, {useState} from "react";

export default function Home() {

    const [selectedCharge, setSelectedCharge] = useState(null);
    const openMenu = (charge)=>{setSelectedCharge(charge);}
    const closeMenu = () =>{setSelectedCharge(null);}

    const [category, setCategory] = useState(()=>{return "Category"});
    const changeCategory = (newCategory)=>{newCategory.target.value==="All" ? setCategory("Category") : setCategory(newCategory.target.value);}

    const [hidden, setHidden] = useState(()=>{return []});
    const changeHidden = (id) => setHidden(hidden.concat(id));
    const hide = (id)=>{changeHidden([...hidden, id]); closeMenu();};

    const [sort, setSort] =useState(()=>{return "DateAsc"});
    const changeSortToTitle = ()=>{sort==="Title" ? setSort("TitleRev") : setSort("Title");}
    const changeSortToAmount = () => {sort==="AmountAsc" ? setSort("AmountDesc") : setSort("AmountAsc");}
    const changerSortToDate = () => {sort==="DateAsc" ? setSort("DateDesc") : setSort("DateAsc");}

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
    function displayPaymentHistory() {
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
                if(!hidden.includes(record.id)){
                    return (
                        <tr onClick={() => openMenu(record)} key={index}>
                            <td>{record.title}</td>
                            <td>{record.amount}zł</td>
                            <td>{record.category}</td>
                            <td>{record.date}</td>
                        </tr>
                    );
                }
            }

            if (category === "Category") {
                return display();
            }
            else if (record.category === category) {
                return display();
            }
        });
    }
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
                                {displayCategories()}
                            </select></td>
                        <td onClick={changerSortToDate} className={sort==="DateAsc" || sort==="DateDesc" ? "color" : "highlight"}>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {displayPaymentHistory()}
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
                    <button onClick={()=> hide(selectedCharge.id)} className="hide">Hide</button>
                </div>
            )
        }
        </div>
    );
}
