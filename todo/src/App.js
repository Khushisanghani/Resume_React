import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);
  const [showfinish,setShowFinished] = useState(true);
  const toggleFinished = (e) => {
    setShowFinished(!showfinish)
  }
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
    
  }, [])
  const saveLs = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4() ,todo, isCompleted: false} ])
    setTodo("");
    saveLs();
  }
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos);
    saveLs();
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    alert("Are you sure delete this todo?")
    setTodos(newTodos);
    saveLs()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLs();
  }
  return (
    <>
    <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className="font-bold text-center text-2xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a todo</h2>
          <div className="flex">
            <input type="text" className="w-full rounded-full px-5 py-1" onChange={handleChange} value={todo}/>
          <button className="bg-violet-800 hover:bg-violet-950 p-4 text-sm py-2 text-white rounded-full mx-2 " onClick={handleAdd} disabled={todo.length<=3}>Save</button>
          </div>
          
        </div>
        <input type="checkbox" checked={showfinish} onChange={toggleFinished}/> Show Finished
        <div className="h-[1px] bg-black w-[90%] mx-auto my-2"></div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5"> No Todo Display</div>}
            {todos.map(item => {
            return (showfinish || !item.isCompleted) && <div className="todo flex  justify-between my-3" key={item.id}>
              <div className="flex gap-5">
              <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox}/>
             <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
             </div>
              <div className="buttons flex h-full">
                 <button  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm py-1 text-white rounded-md mx-1" onClick={(e)=>{handleEdit(e,item.id)}}><FaEdit /></button>
                  <button  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm py-1 text-white rounded-md mx-1" onClick={(e)=>{handleDelete(e,item.id)}}><MdDelete /></button>
             </div>
            </div>
              })}
          </div>
           
      </div>
    
    </>
  );
}

export default App;

