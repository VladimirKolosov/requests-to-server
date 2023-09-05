import { useState, useEffect } from 'react';
import styles from './App.module.css';
export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data));
	}, []);

	return (
		<div className={styles.app}>
			<header className={styles.appHeader}>
				<h1>Todo List</h1>
				<ul className={styles.ul}>
					{todos.map((todo) => (
						<li className={styles.li} key={todo.id}>
							{todo.title}
						</li>
					))}
				</ul>
			</header>
		</div>
	);
};
