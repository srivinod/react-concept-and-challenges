import React, { useState } from "react";

export default function simpleForm() {

    const [name, setName] = useState(""); 
    const [error, setError] = useState(""); 

    const handleSubmit = (e) => {
      e.preventDefault();
      let formErrors = {}

      if(!name.trim()){
        formErrors.name = "Field is Required";
        setError(formErrors);
      }
    }


    return (
      <>  
      
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name..." value={name} onChange={(e) => setName(e.target.value)} />
            {error && error.name}
            <button type="submit">Submit</button>
        </form> 
        </>
    )
}