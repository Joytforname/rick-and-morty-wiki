import {
	Alert,
	Button,
	Card,
	Divider,
	Flex,
	Skeleton,
	Space,
	Tag,
	Typography,
} from 'antd';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterCard from '../../components/CharacterCard';
import { getEpisodeById } from '../../utils/getApiData';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import episodeIdValidator from '../../utils/episodeIdValidator';

const { Text, Title } = Typography;

const EpisodePage = () => {
	const { id } = useParams('id');
	const navigate = useNavigate();
	const { data, isLoading, error } = useQuery(
		['episode', id],
		() => getEpisodeById(id),
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

	if (error) {
		return (
			<Flex style={{ width: '100%', padding: 20 }}>
				<Alert message={error.message} type='error' showIcon />
			</Flex>
		);
	}

	return (
		<Space direction='vertical' style={{ width: '95%', margin: '0 auto' }}>
			<Divider>
				<Flex gap='large' align='center'>
					<Button
						type='primary'
						ghost
						size='small'
						onClick={() =>
							navigate(`/episode/${episodeIdValidator(Number(id) - 1)}`)
						}
					>
						{<ArrowLeftOutlined />} BACK
					</Button>
					<Title level={3}>{data.name}</Title>
					<Button
						type='primary'
						ghost
						size='small'
						onClick={() =>
							navigate(`/episode/${episodeIdValidator(Number(id) + 1)}`)
						}
					>
						NEXT {<ArrowRightOutlined />}
					</Button>
				</Flex>
			</Divider>
			<Flex align='center' style={{ width: '100%' }}>
				<Tag style={{ width: 400, margin: '0 auto' }}>
					<Flex gap='large' justify='space-between'>
						<Text strong>{data.episode}</Text>
						<Text strong>{data.air_date}</Text>
					</Flex>
				</Tag>
			</Flex>
			<Card
				size='small'
				style={{ width: '100%', backgroundColor: 'black' }}
				title={<Text strong> {data.characters.length} characters</Text>}
			>
				<Flex wrap='wrap' gap='small' justify='center'>
					{data.characters.map((character, index) => {
						return <CharacterCard key={index} characterUrl={character} />;
					})}
				</Flex>
			</Card>
		</Space>
	);
};

export default EpisodePage;
