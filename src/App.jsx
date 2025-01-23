import { useState,useRef,useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [add,setAdd] = useState("Add")
  const ref = useRef();

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString) {
      try{
        setTodos(JSON.parse(todoString));
      }
      catch(error) {
        setTodos([]);
      }
    }else{
      setTodos([])
    } 
  }, [])

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const handleAdd = () => {
    if(add === "Update"){
      setAdd("Add")
    }
  
    if(todo.trim().length > 0) {
      const newTodo = {id:uuidv4(),todo, isCompleted:false}
      const updatedTodos = [...todos,newTodo]
      setTodos(updatedTodos);
      setTodo("");
      saveToLS(updatedTodos); // Use the existing saveToLS function
    }
  };


  const handleEdit = (id) => {
    let n = id;
    todos.forEach((todo)=>{
      if(todo.id === id){
        setTodo(todo.todo)
        setAdd("Update")
        todos.splice(todos.indexOf(todo), 1) ;
      }
    })
  };

  const handleDelete = (id) => {
    let option = confirm(`Are you sure you want to delete this todo?`)
    if(option){
      todos.forEach((todo)=>{
        if(todo.id === id){
          todos.splice(todos.indexOf(todo), 1);
          setTodos([...todos]);
          saveToLS([...todos]);
        }
      })
      saveToLS();
    }
    
  };

  const handleDeleteAll = () => {
    let option = confirm(`Are you sure you want to delete all todos?`)
    if(option){
      setTodos([]); 
      saveToLS([]);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleTick = (e) => {
    let id = e.target.name;
    todos.filter((mytodo)=>{
        if(mytodo.id === id){
          mytodo.isCompleted =!mytodo.isCompleted;
          setTodos([...todos]);
          saveToLS([...todos]);
        }
  
    })
  }
  

  return (
    <>
      <Navbar />

      <div className="todoContainer w-full flex justify-center px-4 h-full">
        <div className="realTodo flex flex-col gap-3 p-4 w-full md:w-[50%] my-3 min-h-[87.5vh] max-h-[87.5vh] bg-purple-50 rounded-md">
          <h1 className="text-xl text-center font-semibold">
            iTask - Manage Your Todos At One Place
          </h1>
          <div className="flex items-center gap-3">
            <input
              name="inputTexty"
              className="inputTexty w-full px-3 py-1 rounded-full border border-red-500"
              type="text"
              placeholder="Add a new todo..."
              onChange={handleChange}
              value={todo}
            />
            <button
              onClick={handleAdd} ref={ref}
              className="px-3 py-1 rounded-full border border-red-500 bg-red-500 text-white" name="inputTexty"
            >
              {add}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Your Todos ({todos.length})</h1>
            <button
              onClick={handleDeleteAll}
              className="px-3 py-1 rounded-full border border-red-500 bg-red-500 text-white"
            >
              Delete All
            </button>
          </div>

          <div className="allTodos space-y-1 max-h-[60vh] overflow-y-scroll scrollbar-none">
            {todos.length === 0? (<h1 className="text-center text-xl">No Todos Yet!</h1>) : null}
            {todos.map((items) => {
              return (
                <div key={items.id} className="todo flex justify-between p-3 rounded-md border-[2px] shadow-md">
                  <div className="todoInput flex gap-4">
                    <input onClick={handleTick} name={items.id} type="checkbox" id={`task${items.id}`} />
                    <label className={!items.isCompleted?"w-[90%]":"line-through w-[90%]"}  htmlFor={`task${items.id}`}>
                      {items.todo}
                    </label>
                  </div>

                  <div className="editDeleteButtons flex gap-1">
                    <button onClick={() => handleEdit(items.id)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => handleDelete(items.id)}>
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
