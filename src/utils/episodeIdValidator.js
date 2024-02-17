

const episodeIdValidator = (number) =>{
	const max = 51
	if(number <= 0 || number > max) {
		return 1
	}
	return number
}

export default episodeIdValidator