import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [sortTodo, setSortTodo] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((data) => {
				if (sortTodo) {
					data.sort((a, b) => a.title.localeCompare(b.title));
				}
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodos, sortTodo]);

	const addTodo = () => {
		setIsCreating(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Прочитать документацию по реакт',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Новое дело добавлено, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsCreating(false));
	};

	const updateTodo = () => {
		setIsUpdating(true);

		fetch('http://localhost:3005/todos/2', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Выполнить тестовое задание',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело изменено, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsUpdating(false));
	};

	const deleteTodo = () => {
		setIsDeleting(true);

		fetch('http://localhost:3005/todos/3', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsDeleting(false));
	};
	const sortedTodo = () => {
		setSortTodo(!sortTodo);
	};
	const handelCange = ({ target }) => {
		setSearchPhrase(target.value);
		console.log(target.value);
	};
	const filteredTodos = todos.filter((todo) => {
		return todo.title.toLowerCase().includes(searchPhrase.toLowerCase());
	});

	return (
		<div className={styles.app}>
			<h1>Todo List</h1>
			<input
				className={styles.input}
				type="text"
				placeholder="Search the ToDo"
				onChange={handelCange}
			/>
			<div className={styles.search}></div>
			<ul className={styles.ul}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					filteredTodos.map((todo) => (
						<li className={styles.li} key={todo.id}>
							{todo.title}
						</li>
					))
				)}
			</ul>
			<button className={styles.button} disabled={isCreating} onClick={addTodo}>
				Добавить дело
			</button>
			<button className={styles.button} disabled={isUpdating} onClick={updateTodo}>
				Изменить дело
			</button>
			<button className={styles.button} disabled={isDeleting} onClick={deleteTodo}>
				Удалить дело
			</button>
			<button className={styles.button} onClick={sortedTodo}>
				Сортировка дел
			</button>
		</div>
	);
};
