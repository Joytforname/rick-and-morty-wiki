import { Card, Flex, Typography, Alert, Skeleton } from 'antd';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../utils/getApiData';

const { Text } = Typography;

const cardStyle = {
	width: 400,
	height: 120,
	cursor: 'pointer',
	position: 'relative',
	overflow: 'hidden',
};

const LocationCard = ({ location }) => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery(
		['episodeData', location],
		() => getData(location),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
	if (isLoading) {
		return (
			<Card style={cardStyle} size='small'>
				<Skeleton active paragraph={{ rows: 2 }} />
			</Card>
		);
	}
	if (isError) {
		return (
			<Card style={cardStyle}>
				<Alert message='Location error' type='error' showIcon />
			</Card>
		);
	}
	return (
		<Card
			hoverable={true}
			style={cardStyle}
			size='small'
			title={<Text strong>{data.name}</Text>}
			onClick={() => navigate(`/location/${data.id}`)}
		>
			<Flex gap='small' vertical='true'>
				<Text>Type: {data.type}</Text>
				<Text>Dimension: {data.dimension}</Text>
			</Flex>
		</Card>
	);
};

export default LocationCard;
