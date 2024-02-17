import { useQuery } from 'react-query';
import { getLocationById } from '../../utils/getApiData';
import { useParams } from 'react-router-dom';
import { Alert, Divider, Flex, Skeleton, Space, Typography } from 'antd';

import LocationCharacters from '../../components/LocationCharacters';

const { Title } = Typography;
const LocationPage = () => {
	const { id } = useParams('id');
	const { data, isLoading, isError } = useQuery(
		['location', id],
		() => getLocationById(id),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
	if (isLoading) {
		return (
			<Flex vertical gap='middle' style={{ width: '100%', padding: 20 }}>
				<Skeleton active paragraph />
				<Skeleton active paragraph />
				<Skeleton active paragraph />
			</Flex>
		);
	}

	if (isError) {
		return (
			<Flex style={{ width: '100%', padding: 20 }}>
				<Alert message='error' type='error' showIcon />
			</Flex>
		);
	}
	console.log('locationpagedata', data);
	return (
		<Space direction='vertical' style={{ width: '95%', margin: '0 auto' }}>
			<Divider>
				<Title level={3}>{data.name}</Title>
			</Divider>
			<LocationCharacters height={'100%'} location={data.url} />
		</Space>
	);
};

export default LocationPage;
