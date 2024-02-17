const statusColor = (status) => {
	switch (status) {
		case 'Dead':
			return 'danger'
			
	case 'Unknown':
			return 'warning'
			
		default:
			return 'success';
			
	}
}

export default statusColor