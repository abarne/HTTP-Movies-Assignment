import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
	title: '',
	director: '',
	metascore: 0,
	stars: []
};

const UpdateMovie = (props) => {
	const [ movie, setMovie ] = useState(initialItem);

	useEffect(() => {
		const itemToEdit = {};
		axios
			.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
			.then((response) => {
				console.log(response);
				setMovie(response.data);
			})
			.catch((err) => console.log(err.response));
	}, []);

	const changeHandler = (e) => {
		e.persist();
		let value = e.target.value;
		if (e.target.name === 'metascore') {
			value = parseInt(value, 10);
		}
		setMovie({
			...movie,
			[e.target.name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
			.then((response) => {
				props.history.push('/');
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title} />
				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={movie.director}
				/>
				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="metascore"
					value={movie.metascore}
				/>
				<button>Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
