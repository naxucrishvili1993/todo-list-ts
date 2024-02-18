import {
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}: Props) {
	return (
		<div className="container">
			<Droppable droppableId="todoList">
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
					<div
						className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<span className="todos__heading">Active Tasks</span>
						{todos.map((todo: Todo, index: number) => (
							<SingleTodo
								index={index}
								key={todo.id}
								todo={todo}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="todosRemove">
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
					<div
						className={`todos remove ${
							snapshot.isDraggingOver ? "dragcomplete" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<span className="todos__heading">Completed Tasks</span>
						{completedTodos.map((todo: Todo, index: number) => (
							<SingleTodo
								index={index}
								key={todo.id}
								todo={todo}
								todos={todos}
								setTodos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
