import React , {useState} from 'react';

export const SimpleTodo = () => {
    const [input, setInput] = useState("");
    const [todo,setTodo] = useState([]);
    const [isEditId,setIsEditId] = useState(false)
    const [editingText,setEditingText]=useState("");

    const addTodo = () => {
        let newTodo ={id:crypto.randomUUID(),name:input, done:'false'} 
        setTodo(prev=>[...prev,newTodo]);
        console.log(todo)
    }

    const toggleTodo = (id) => { 
        setTodo(prev => prev.map(todoItem => todoItem.id === id ? {...todoItem,done:!todoItem.done} : todoItem));
    }

    const enableEdit = (editItem) => {
        setIsEditId(editItem.id);
        setEditingText(todo.text);
    }

    const cencelEdit = () => {
        setIsEditId(null);
        setEditingText("")
    }

    const saveEdit = (updateItem) => {
        setTodo(prev=>prev.map(todoItems => todoItems.id === updateItem.id ? {...todoItems, updateItem }: todoItems))
    }
      
    return(
        <>  <div style={{background:'#e7e6ff', textAlign:'center'}}>
                <div style={{padding:'10px'}}>
                <h4>Todo</h4> 
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" onClick={addTodo}>Add</button>   
                </div>

                <div style={{ textAlign:'left'}}>
                {
                    todo.map((val)=>  
                        <>
                        <div style={{padding:'10px'}}> 
                      
                        {isEditId == val.id ? (
                        <div >
                            <input type="text" onChange={(e)=>setTodo( setTodo(prev => prev.map(t => t.id === todo.id ? { ...t, text: e.target.value } : t)))}  value={val.name}/>
                            <button onClick={()=>saveEdit(val)}> Save </button>
                            <button onClick={()=>cencelEdit(val)}> Cancel </button>
                        </div>
                        ) : (
                            <>
                            <div style={{display:'flex'}}>
                            <input type="checkbox" checked={val.done} onChange={()=>toggleTodo(val.id)} style={{marginRight:'5px'}} />
                            <h4>{val.name} (<small>{val.done? 'Done' : 'Pending'}</small>)</h4>                             
                            </div>
                            <small><a onClick={()=>enableEdit(val)}> Edit </a></small>
                            <br/>
                            </>
                            
                        )}
                        <br/>
                        
                        
                        
                        
                        </div>   
                        <hr/>
                        </>                 
                    )
                }    
                </div>    
            </div>
        </>
    )
}