import InputField from "./components/InputField";
import "./App.css";
import React, { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export default function App() {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	function handleAdd(e: React.FormEvent) {
		e.preventDefault();

		if (todo) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					todo,
					isDone: false,
				},
			]);
			setTodo("");
		}
	}
	function onDragEnd(result: DropResult) {
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		let add: Todo;
		const active: Todo[] = todos,
			complete: Todo[] = completedTodos;

		// Source Logic
		if (source.droppableId === "todoList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		// Destination Logic
		if (destination.droppableId === "todoList") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
}
