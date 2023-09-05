import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from './firebase';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [sortTodo, setSortTodo] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, [sortTodo]);

	const addTodo = () => {
		setIsCreating(true);
		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: 'Прочитать документацию по методам массивов',
		})
			.then((response) => {
				console.log('Новое дело добавлено, ответ сервера:', response);
			})
			.finally(() => setIsCreating(false));
	};

	const updateTodo = () => {
		setIsUpdating(true);
		const todosDbRef = ref(db, 'todos/1');
		set(todosDbRef, {
			title: 'Выполнить тестовое задание',
		})
			.then((response) => {
				console.log('Дело изменено, ответ сервера:', response);
			})
			.finally(() => setIsUpdating(false));
	};

	const deleteTodo = () => {
		setIsDeleting(true);
		const todosDbRef = ref(db, 'todos/003');
		remove(todosDbRef)
			.then((response) => {
				console.log('Дело удалено, ответ сервера:', response);
			})
			.finally(() => setIsDeleting(false));
	};

	const sortedTodo = () => {
		setSortTodo(!sortTodo);
	};

	const handleChange = (e) => {
		setSearchPhrase(e.target.value);
		console.log(e.target.value);
	};

	// const filteredTodos = todos.filter((todo) => {
	// 	return todo.title.toLowerCase().includes(searchPhrase.toLowerCase());
	// });

	return (
		<div className={styles.app}>
			<h1>Todo List</h1>
			<input
				className={styles.input}
				type="text"
				placeholder="Search the ToDo"
				onChange={handleChange}
			/>
			<div className={styles.search}></div>
			<ul className={styles.ul}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					Object.entries(todos).map(([id, todo]) => (
						<li className={styles.li} key={id}>
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
