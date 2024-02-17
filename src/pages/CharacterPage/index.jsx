import { Flex, Descriptions, Divider, Typography, Skeleton, Card } from 'antd';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CharacterVersions from '../../components/CharacterVersions';
import { getCharacterById } from '../../utils/getApiData';
import LocationCharacters from '../../components/LocationCharacters';
import CharacterEpisodes from '../../components/CharacterEpisodes';

const { Title, Text } = Typography;

const { Meta } = Card;

const pageStyle = {
	maxWidth: 1630,
	width: '100%',
	margin: '0 auto',
};

const CharacterPage = () => {
	const { id } = useParams('id');
	const { data, isLoading, isError } = useQuery(
		['character', id],
		() => getCharacterById(id),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) {
		return (
			<>
				<Flex style={pageStyle} vertical='true'>
					<Divider orientation='left'>
						<Title level={3}>
							<Skeleton paragraph={{ rows: 1 }} width='200px' />
						</Title>
					</Divider>
					<Flex gap='small'>
						<Skeleton.Avatar active size={300} shape='square' />
						<Skeleton active paragraph />
					</Flex>
				</Flex>
			</>
		);
	}

	if (isError) {
		return <>Error</>;
	}
	const descriptionItems = [
		{
			key: 1,
			label: 'Gender',
			span: 3,
			children: <Text>{data.gender}</Text>,
		},
		{
			key: 2,
			label: 'Species',
			span: 3,
			children: <Text>{data.species}</Text>,
		},
		{
			key: 3,
			label: 'Status',
			span: 3,
			children: <Text>{data.status}</Text>,
		},
		{
			key: 4,
			label: 'Origin',
			span: 3,
			children: <Text>{data.origin.name}</Text>,
		},
		{
			key: 5,
			label: 'Location',
			span: 3,
			children: <Text>{data.location.name}</Text>,
		},
	];

	return (
		<Flex style={pageStyle} vertical='true'>
			<Divider orientation='left'>
				<Title level={3}>{data.name}</Title>
			</Divider>
			<Flex gap='small'>
				<Card
					style={{ width: 400, height: '100%' }}
					size='small'
					cover={<img alt='example' src={data.image} />}
				>
					<Meta
						description={
							<Descriptions
								style={{ width: '100%' }}
								items={descriptionItems}
								bordered
							/>
						}
					/>
				</Card>
				<Flex style={{ width: '100%' }} vertical gap='small'>
					<CharacterEpisodes character={data.url} />
					<LocationCharacters height={600} location={data.location.url} />
					<CharacterVersions characterName={data.name.match(/\S+/)[0]} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CharacterPage;
