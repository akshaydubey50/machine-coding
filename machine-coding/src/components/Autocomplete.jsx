import React, { useState } from 'react'

export default function Autocomplete() {

    const[input,setInput]=useState('');
    const [suggestion,setSuggestion]=useState([]);
    const autocompleteData = [
        "apple", "banana", "grape", "grapefruit", "kiwi", "lemon", 
        "lime", "orange", "pear", "pineapple"
      ];

    const handleSuggestionClick=(item)=>{
        console.log(item)
        setInput(item);
        setSuggestion([]);
    }
    const handleInputChange=(e)=>{
        const inputVal=e.target.value;
        if(!inputVal.trim()){
            setSuggestion([]);
            setInput("")
            return;
        }

       if(inputVal){
        setInput(inputVal);

        const filteredSuggestions =autocompleteData.filter(item=>item.toLowerCase().includes(inputVal.toLowerCase()));
        setSuggestion(filteredSuggestions)
       }
       else{
        setSuggestion([])
       }

    }
    const styles=`
        .suggest-item{
        cursor:pointer
        }
    `
  return (
    <>
    <style>
        {styles}
    </style>
    <input onChange={handleInputChange} value={input} placeholder='Search Item' />

    {suggestion?.map((item)=>(
        <React.Fragment key={item}>
            <p onClick={()=>handleSuggestionClick(item)} className='suggest-item'>
                {item}
            </p>
        </React.Fragment>
    ))}
    
    </>
  )
}
