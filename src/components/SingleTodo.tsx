import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Todo } from "../model";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	index: number;
};

export default function SingleTodo({ todo, todos, setTodos, index }: Props) {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleDone(id: number): void {
		setTodos(
			todos.map((todo: Todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	}

	function handleDelete(id: number): void {
		setTodos(todos.filter((todo: Todo) => todo.id !== id));
	}

	function handleEdit(e: FormEvent<HTMLFormElement>, id: number): void {
		e.preventDefault();
		setTodos(
			todos.map((todo: Todo) =>
				todo.id === id ? { ...todo, todo: editTodo } : todo
			)
		);
		setEdit(false);
	}

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided) => (
				<form
					className="todos__single"
					onSubmit={(e: FormEvent<HTMLFormElement>) => handleEdit(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					{edit ? (
						<input
							ref={inputRef}
							value={editTodo}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setEditTodo(e.target.value)
							}
							className="todos__single--test"
						/>
					) : todo.isDone ? (
						<s className="todos__single--text">{todo.todo}</s>
					) : (
						<span className="todos__single--text">{todo.todo}</span>
					)}
					<div>
						<span
							className="icon"
							onClick={() => {
								if (!edit && !todo.isDone) {
									setEdit(!edit);
								}
							}}>
							<AiFillEdit />
						</span>
						<span className="icon" onClick={() => handleDelete(todo.id)}>
							<AiFillDelete />
						</span>
						<span className="icon" onClick={() => handleDone(todo.id)}>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
}
