import axios from 'axios';

export const getData = async (url, page = 0) => {
	const { data } = await axios.get(`${url}?page=${page}`);
	return data;
};

export const getFilteredData = async (category, page = 0, searchValue) => {
	if (searchValue.length === 0) {
		const { data } = await axios.get(
			`https://rickandmortyapi.com/api/${category}/?page=${page}`
		);
		return data;
	}
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/${category}/?page=${page}&name=${searchValue}`
	);
	return data;
};

export const getCharactersFilteredByStatus = async (
	page = 0,
	status,
	searchValue
) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&name=${searchValue}`
	);
	return data;
};

export const getCharacterById = async (id) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/${id}`
	);
	return data;
};

export const getEpisodeById = async (id) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/episode/${id}`
	);
	return data;
};

export const getLocationById = async (id) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/location/${id}`
	);
	return data;
};

export const getCharactersByName = async (name, page = 0) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
	);
	return data;
};
