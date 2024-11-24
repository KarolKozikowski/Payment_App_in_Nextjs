'use client';
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [selectedCharge, setSelectedCharge] = useState(null);
    const openMenu = (charge)=>{setSelectedCharge(charge);}
    const closeMenu = () =>{setSelectedCharge(null);}

    const [category, setCategory] = useState(()=>{return "Category"});
    const changeCategory = (newCategory)=>{newCategory.target.value==="All" ? setCategory("Category") : setCategory(newCategory.target.value);}

    const [sort, setSort] =useState(()=>{return "DateAsc"});
    const changeSortToTitle = ()=>{sort==="Title" ? setSort("TitleRev") : setSort("Title");}
    const changeSortToAmount = () => {sort==="AmountAsc" ? setSort("AmountDesc") : setSort("AmountAsc");}
    const changerSortToDate = () => {sort==="DateAsc" ? setSort("DateDesc") : setSort("DateAsc");}

    return(<GlobalContext.Provider value={{
        selectedCharge,
        openMenu,
        closeMenu,
        category,
        changeCategory,
        sort,
        changeSortToTitle,
        changeSortToAmount,
        changerSortToDate
    }}>{children}</GlobalContext.Provider>);
};

export const useGlobalContext = () => useContext(GlobalContext);