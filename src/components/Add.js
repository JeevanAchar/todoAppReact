import React, { useState } from "react"

const Add = () => {
    let value;
    const addData = (e) => {
        value = e.target.value
    }
    const add = () => {
        console.log({ value });
        const display = document.getElementById("hello");
        display.innerHTML = value;
    }
    return (
        <>
            <div>
                <input type="text" onChange={addData} />
                <button onClick={add}>Add task</button>
                <h2 id="hello"></h2>
            </div>
        </>
    )
}
export { Add };