import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { SCHEDULES_QUERY } from "../query/schedule"
import { Layout } from "antd";
import moment from 'moment';
import '../styles/todo.less'
import TodoItem from "../components/TodoItem/TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from '../components/Header/Header'

const Todo = () => {
  const queryResult = useQuery(SCHEDULES_QUERY, {
    variables: {date: moment().format('LL')}
  })
  const todosData = queryResult && queryResult.data && queryResult.data.schedules
  const [todos, setTodos] = useState(todosData);

  const { Footer, Content } = Layout;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(newTodos)
  }

  
  return (
    <Layout>
      <Header/>
      <Content className="todo-list">
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos && todos.map((todo, index) => {// schedules无数据时返回空数组，但依然报错map of undefined。。。费解。。
                if (!todo) return
                return <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem key={todo.id} todo={todo} />
                    </div>
                  )}
                </Draggable>
              })
             }
            {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </Content>
      <Footer>Lizzy</Footer>
    </Layout>
  )
}

export default Todo



