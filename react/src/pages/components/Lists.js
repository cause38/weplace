import React from 'react';
import List from './List';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
  const handleEnd = result => {
    if (!result.destination) return;

    const newTodoData = todoData;
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="todo-box__list">
              {todoData.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <List
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
