import React, { ChangeEvent, useRef } from "react";
import "./styles.css";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

export default function InputField({ todo, setTodo, handleAdd }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className="input"
			onSubmit={(e: React.FormEvent) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}>
			<input
				ref={inputRef}
				type="text"
				placeholder="Enter a task"
				className="input__box"
				value={todo}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
			/>
			<button className="input__submit" type="submit">
				Go
			</button>
		</form>
	);
}
