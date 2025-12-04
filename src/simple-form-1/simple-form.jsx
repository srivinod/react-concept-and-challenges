import React, { useState } from "react";

export function SimpleForm() {
    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const validationErrors = {}

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name.trim()){
            validationErrors.name = "Name is mandatory";
            setError(validationErrors)
        }
    }

    return (
    <>  
        <div style={{background:'#dfffe4',padding:'10px'}}>
        <h4>Form + Validation</h4>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} />
            <span>{error.name}</span>
            <button type="submit">Send</button>
        </form>  
        </div>
    </>
    )
}




