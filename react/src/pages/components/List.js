import React, {useState} from 'react';

const List = React.memo(({id, title, completed, todoData, setTodoData, provided, snapshot, handleClick}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, seteditedTitle] = useState(title);

  const handleCompletechange = id => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed;
      }

      return data;
    });

    setTodoData(newTodoData);
  };

  if (isEditing) {
    return (
      <li className={'isEdit'}>
        <div>
          <form>
            <input type="text" value={editedTitle} />
          </form>
        </div>
        <div>
          <button type="submit" onClick={() => setIsEditing(false)}>
            save
          </button>
          <button type="button" onClick={() => handleClick(id)}>
            X
          </button>
        </div>
      </li>
    );
  } else {
    return (
      <li
        className={`${snapshot.isDragging ? 'active' : ''}`}
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
      >
        <div>
          <input type="checkbox" defaultChecked={false} onChange={() => handleCompletechange(id)} />
          <span className={completed ? '' : 'on'}>{title}</span>
        </div>
        <div>
          <button type="button" onClick={() => setIsEditing(true)}>
            edit
          </button>
          <button type="button" onClick={() => handleClick(id)}>
            X
          </button>
        </div>
      </li>
    );
  }
});

export default List;
