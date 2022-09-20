import React, {useCallback, useState} from 'react';
import Lists from './components/Lists';
import Form from './components/Form';

const App = () => {
  let [todoData, setTodoData] = useState([]);
  let [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: true,
    };

    setTodoData(prev => [...prev, newTodo]);
    setValue('');
  };

  const handleClick = useCallback(
    id => {
      let newTodoData = todoData.filter(data => data.id !== id);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  const handleRemoveAll = () => {
    setTodoData([]);
  };

  return (
    <div className="container">
      <div className="todo-box">
        <div className="todo-box__head">
          <h3>TODO LIST</h3>
          <button onClick={handleRemoveAll}>전체 삭제</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
