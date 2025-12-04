import React,{ useState} from 'react';
import {useCounter} from '../simple-counter-hook/useCounter'

const SimpleCounter = () => {
    const [value, setValue] = useState(0);
    const {count,incrementValue, decrementValue} = useCounter(0);

    
    const increment = () => {
        setValue(value+1);
    }

    const decrement = () =>{
        setValue(value-1);  
    }

 

    return(
        <>  
            <div style={{background:'#efefef', padding:'10px'}}>
            <h4>Counter</h4>
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            </div>
            <div style={{background:'#ffbfbf', padding:'10px'}}>

            <h4>Counter with CustomHook</h4>
            <p>{count}</p>
            <button onClick={incrementValue}>+</button>
            <button onClick={decrementValue}>-</button>
            </div>
        </>
    )
}


export {SimpleCounter}