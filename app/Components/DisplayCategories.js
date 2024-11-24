import Data from "@/app/Data/history.json";
import React from "react";

export default function DisplayCategories(){
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