import { Alert, Avatar, Card, Flex, Skeleton, Typography } from 'antd';
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

const CharacterCard = ({ characterUrl }) => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery(
		['character', characterUrl],
		() => getData(characterUrl),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) {
		return <Card style={cardStyle} size='small'>
			<Skeleton active avatar paragraph={{rows: 1}}/>
		</Card>;
	}
	if (isError) {
		<Card style={cardStyle} size='small'>
			<Alert message='Character error' type='error' showIcon />
		</Card>;
	}

	return (
		<Card
			key={data.id}
			hoverable={true}
			style={cardStyle}
			size='small'
			onClick={() => {
				navigate(`/character/${data.id}`);
			}}
		>

			<Flex gap='small'>
				<Avatar
					style={{
						position: 'absolute',
						top: -1,
						left: -1,
						borderRadius: 0,
					}}
					size={123}
					shape='square'
					src={data.image}
				/>

				<Flex
					style={{ position: 'absolute', left: 128, top: 2 }}
					vertical='true'
					gap='small'
				>
					<Text strong>{data.name}</Text>

					<Flex gap={3}>
						<Text>{data.species}</Text>
						<span>-</span>
						<Text
							type={
								data.status === 'Alive'
									? 'success'
									: data.status === 'Dead'
									? 'danger'
									: 'warning'
							}
						>
							{data.status}
						</Text>
					</Flex>
					<Flex wrap='wrap' vertical>
						<Text type='secondary'>Last known location:</Text>
						<Text>{data.location.name}</Text>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};

export default CharacterCard;
