import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { ArrowUp,ArrowDown,X,Trash2 } from "lucide-react";

export default function Content() {
  // Load todos from localStorage or use initialData if nothing is found
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialData;
  });

  const [ischecked, setIschecked] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const changeStatus = (index) => {
    setTodos(todos.map((todo, i) => 
      i === index ? { ...todo, status: todo.status === 1 ? 0 : 1 } : todo
    ));
  };

  // Move a todo up
  const moveUp = (index) => {
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
      setTodos(newTodos);
    }
  };

  // Move a todo down
  const moveDown = (index) => {
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 m-16 ">
        <div className="font-bold text-white text-2xl font-sans mb-2 bg-zinc-900 shadow-xl p-16"> Todo List </div>
        <div id="container" className="border p-6 bg-white rounded-md">
          <div className="flex justify-center gap-2">
            <div>
              <input placeholder='Enter Todos' id="newtodo" type="text" className="rounded bg-gray-200 text-black" />
            </div>

            <Button
              onClick={() => {
                const newTodo = document.getElementById('newtodo').value;
                if (newTodo.trim() !== "") {
                  setTodos([...todos, { todo: newTodo, status: 0 }]);
                  document.getElementById('newtodo').value = '';
                }
              }}
              className="bg-green-600 h-6 mb-4"
            >
              ADD
            </Button>
          </div>

          {todos.map((value, index) => (
            <div className="mb-[10px] flex gap-3" key={index}>
              <div>
                {value.status === 0 ? (
                  <div>
                    <Checkbox checked={false} onClick={() => changeStatus(index)} className="mt-1" />
                  </div>
                ) : (
                  <div>
                    <Checkbox checked={true} onClick={() => changeStatus(index)} className="border-white mt-1" />
                  </div>
                )}
              </div>

              <div className="text-white">
                {value.status === 0 ? (
                  <div className="bg-white min-w-[150px] max-w-[200px] text-black rounded-sm px-2">{value.todo}</div>
                ) : (
                  <div className="bg-white min-w-[150px]  max-w-[200px] line-through text-black rounded-sm px-2">{value.todo}</div>
                )}
              </div>

              {/* Move Up Button */}
              <button onClick={() => moveUp(index)} className=" max-h-[25px] rounded w-fit bg-gray-500 text-white px-2"><ArrowUp size={15}
               /></button>
              
              {/* Move Down Button */}
              <button onClick={() => moveDown(index)} className=" max-h-[25px] rounded bg-gray-500 text-white px-2"><ArrowDown  size={15}/></button>
              
              {/* Edit and Delete buttons */}
             
              <button onClick={() => deleteTodo(index)} className=" max-h-[25px] rounded bg-red-500 text-white px-2"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

