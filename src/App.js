import { useState, useEffect } from "react";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  // 儲存代辦事項
  const [inputValue, setInputValue] = useState("");

  // 存儲待辦事項列表，以"陣列"的方式儲存
  const [todos, setTodos] = useState([]);

  const handleInputchage = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodos = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      // 要清空 input 中的代辦事項
      setInputValue("");
    }
  };

  const handleToggleTodo = (id) => {
    // 這段程式碼的作用是在按下標記按鈕時，根據傳入的 id 參數來切換相應待辦事項的完成狀態

    /* 如果 todo.id === id 成立，表示找到了需要標記的待辦事項。
       這裡使用展開運算符 { ...todo } 將原來的待辦事項複製到新物件中，
       然後將 completed 屬性的值取反 */
    /* 如果 todo.id === id 不成立，即目前遍歷的待辦事項不是要標記的目標，
       則保持原樣返回該待辦事項，不作任何修改 */
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // .filter() 方法過濾待辦事項陣列 todos，並返回"新的陣列" filteredTodos
  /* todo.id !== id：.filter() 方法的回調函數對每個待辦事項 todo 執行判斷。
     如果待辦事項的 id 與傳入的 id 參數不相符，即不是要刪除的目標，則保留這個待辦事項 */
  const handleDeleteTodo = (id) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodo);
  };

  const handleClearCompleted = () => {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    setTodos(incompleteTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="container">
      <h1>MY TODO LIST</h1>
      <div className="status">
        <div className="completed_box">
          <div className="completed">{completedCount}</div>
          <p>Completed</p>
        </div>

        <div className={`button_box${completedCount === 0 ? " hidden" : ""}`}>
          {completedCount !== 0 && (
            <button onClick={handleClearCompleted}>Clear completed</button>
          )}
        </div>

        <div className="total_box">
          <div className="total">{totalCount}</div>
          <p>Total</p>
        </div>
      </div>

      <div className="line"></div>

      <div className="search">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputchage}
          placeholder="Please enter to-do items..."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAddTodos();
            }
          }}
        />
        <button onClick={handleAddTodos}>+</button>
      </div>

      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="text_box">{todo.text}</div>
            <div className="btn_box">
              <button
                className="btn_status"
                onClick={() => handleToggleTodo(todo.id)}
                style={{
                  backgroundColor: todo.completed ? "#FB605D" : "#1BC798"
                }}
              >
                {todo.completed ? "DONE" : "UNDONE"}
              </button>
              <button
                className="btn_delete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ━
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
