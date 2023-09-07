import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai"
import { BiCheckboxChecked } from "react-icons/bi"

const App = () => {
    let [isCompeteScreen, setIsCompeteScreen] = useState(false);
    let [todos, setTodos] = useState([]);
    let [newTitle, setNewTitle] = useState("");
    let [newDesc, setNewDesc] = useState("");
    let [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        let newTotoItem = {
            title: newTitle,
            desc: newDesc
        }
        let updatedTodoArr = [...todos]
        updatedTodoArr.push(newTotoItem)
        setTodos(updatedTodoArr)
        localStorage.setItem("todolist", JSON.stringify(updatedTodoArr))
    }

    const handleDeleteTodo = (index) => {
        let reduceTodo = [...todos];
        console.log(todos);
        reduceTodo.splice(index, 1);
        setTodos(reduceTodo);
        console.log(reduceTodo);
        localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    }
    const handleDeleteCompletedTodo = (index) => {
        let reduceTodo = [...completedTodos];
        reduceTodo.splice(index, 1);
        setCompletedTodos(reduceTodo);
        localStorage.setItem("completedTodo", JSON.stringify(reduceTodo));
    }
    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth();
        let mmf = mm + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + "-" + mmf + "-" + yyyy + " at " + h + ":" + m + ":" + s;

        let filteredItem = {
            ...todos[index],
            completedOn: completedOn
        }
        let updateCompletedArr = [...completedTodos];
        updateCompletedArr.push(filteredItem);
        setCompletedTodos(updateCompletedArr);
        handleDeleteTodo(index)
        localStorage.setItem("completedTodo", JSON.stringify(updateCompletedArr));
    }
    const clearAll = () => {
        localStorage.removeItem("completedTodo");
        // window.location.reload();
    }
    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todolist"));
        let saveCompletedTodo = JSON.parse(localStorage.getItem("completedTodo"));
        if (savedTodo) {
            setTodos(savedTodo);
        }
        if (saveCompletedTodo) {
            setCompletedTodos(saveCompletedTodo)
        }
    }, [])

    return (
        <>
            <div className="App">
                <h1>My todos</h1>

                <div className="todo-wrapper">
                    <div className="todo-input">
                        <div className="todo-input-item">
                            <label>Title</label>
                            <input type="text" value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} placeholder="Enter the task" />
                        </div>
                        <div className="todo-input-item">
                            <label>Description</label>
                            <input type="text" placeholder="Description" value={newDesc} onChange={(e) => { setNewDesc(e.target.value) }} />
                        </div>
                        <div className="todo-input-item">
                            <button type="button" className="primaryBtn" onClick={handleAddTodo}>Add</button>
                        </div>
                    </div>

                    <div className="btn-area">
                        <button className={`secondaryBtn ${isCompeteScreen === false && "active"}`} onClick={() => setIsCompeteScreen(false)}>Todo</button>
                        <button className={`secondaryBtn ${isCompeteScreen === true && "active"}`} onClick={() => setIsCompeteScreen(true)}>Completed</button>
                    </div>

                    {isCompeteScreen === false && todos.map((item, index) => {
                        return (
                            <div className="todo-list">
                                <div className="todo-list-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <div>
                                    <AiFillDelete className="icon" title="delete" onClick={() => handleDeleteTodo(console.log(index + "delete logo"))} />
                                    <BiCheckboxChecked className="check-icon" title="Compelete?" onClick={() => handleComplete(console.log(index))} />
                                </div>
                            </div>
                        )
                    })}

                    {isCompeteScreen === true && completedTodos.map((item, index) => {
                        return (
                            <div className="todo-list">
                                <div className="todo-list-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <p><small>completedOn {item.completedOn}</small></p>
                                </div>
                                <div>
                                    <AiFillDelete className="icon" title="delete" onClick={() => handleDeleteCompletedTodo(index)} />
                                    <button onClick={clearAll()}>clear all</button>
                                </div>
                            </div>
                        )

                    })}

                </div>
            </div>
        </>
    )
}
export default App;