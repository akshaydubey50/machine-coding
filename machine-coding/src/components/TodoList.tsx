import React, { useCallback, useEffect, useMemo, useState } from "react";

type Todos = {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
};

type userData = Partial<Todos>;

export default function TodoList() {
  const [list, setList] = useState<Todos[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [completedTodo, setCompletedTodo] = useState<any>(0);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputVal(value);
  };

  const fetchTodoList = useCallback(async (): Promise<void> => {
    try {
      console.log("list",list)
      setLoading(true);
      const listRes = await fetch("https://dummyjson.com/todos");
      const jsonRes = await listRes?.json();
      console.log(jsonRes?.todos);
      setList(jsonRes?.todos?.map((item: Todos) =>( {...item,completed:false})));
      setCompletedTodo(
        jsonRes?.todos.filter((item: Todos) => item.completed).length
      );
    } catch (error) {
      console.error("Error:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [list]);

  // Handle Toggle Change
  const handleToggle = (id: string, completed: boolean) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, completed } : item))
    );

    setCompletedTodo((prevCount) =>
      completed ? prevCount + 1 : prevCount - 1
    );
  };
  useEffect(() => {
    console.log("useEffect Render");
    fetchTodoList();
  }, []);

  const handleReset = () => {
    
    const updatelist=list.map((item) => ({ ...item, completed: !item.completed }))
    console.log(updatelist)
    setList((prevList) =>
       updatelist
    )
   const updateCheckCount = updatelist?.filter((item: Todos) => item.completed).length

      setCompletedTodo(updateCheckCount)
    };

    const deleteHandler=(record)=>{
      const updateCheckCount = list?.filter((item: Todos) => item.id!==record.id)
      setList(updateCheckCount)
    }
    const edit=(record,data)=>{
      const updateCheckCount = list?.map((item: Todos) => item.id==record.id?{...item,todo:data}:item)
      setList(updateCheckCount)
    }
  return (
    <>
      <section className="h-screen p-18">
        <div className="">
          <h2 className="mb-4">Completed Todo Count :{completedTodo}</h2>
          <button onClick={handleReset} className="bg-black text-white cursor-pointer p-2 rounded-md">
            Toggle
          </button>
          <input
            onChange={handleInputChange}
            value={inputVal}
            placeholder="Enter todo item "
            className="outline-none py-2 mb-5 px-4 rounded-md border border-black"
          />
        </div>
        {loading && <p>Loading...</p>}
        <div className="">
          {!loading &&
            list?.map((item) => (
              <React.Fragment key={item.id}>
                <TodoItem item={item} onToggle={handleToggle} deleteHandler={deleteHandler} edit={edit} />
              </React.Fragment>
            ))}
        </div>
      </section>
    </>
  );
}

const TodoItem: React.FC<{
  item: Todos;
  onToggle: (id: string, completed: boolean) => void;
  deleteHandler:(item:Todos)=>void;
  edit:(item:Todos,newTitle:string)=>void
}> = ({ item, onToggle,deleteHandler,edit }) => {
  const [showEdit,setShowEdit]=useState(false)
 
  const [editData,setEditData]=useState(item.todo);
  const editInput=(e)=>{
    setEditData(e.target.value)
  }
  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="checkbox"
        className="p-2 rounded-md border-2 border-black"
        checked={item.completed}
        onChange={(e)=>onToggle(item.id,e.target.checked)}
      />
      {!showEdit&&      <p className={item.completed ? "line-through" : ""}>{item.todo}</p>
    }
      {showEdit && <input
              className="p-2 rounded-md border-2 border-black"
      onChange={(e)=>setEditData(e.target.value)} value={editData}/>}
      <button className="bg-black rounded-md px-2 py-1 mb-0 text-white" onClick={()=>deleteHandler(item)}>Delete</button>
      <button className="bg-black rounded-md px-2 py-1 mb-0 text-white" onClick={()=>{edit(item,editData);setShowEdit(!showEdit)}}>Edit</button>

    </div>
  );
};
