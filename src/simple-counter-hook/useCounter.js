import React, {useState} from 'react';

export const useCounter = (initialValue = 0) => {
    const [count, setValue] = useState(initialValue)
    
    const incrementValue = () => {
        setValue(count+1);
    }

    const decrementValue = () =>{
        setValue(count-1);
    }


    return {incrementValue,decrementValue, count}


}

