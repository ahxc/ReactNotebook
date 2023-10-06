import React, { useState } from "react";

function App() {
  const [lists, submitClick] = useState([]);

  const testClick = (event) => {
    const { keyCode, target } = event;
    if (keyCode !== 13 || target.value.trim() === "") return;
    submitClick([...lists, target.value]);
    target.value = "";
  };

  const liClick = function (e) {
    lists.splice(e, 1);
    submitClick([...lists]);
  };

  return (
    <div className="App">
      <input onKeyDown={testClick} placeholder="请输入代办事项并按下回车" />
      <ul>
        {lists.map((item, index) => (
          <li key={index} onClick={(e) => liClick(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
