import { Alert, Card, Flex, Timeline, Typography } from 'antd';
import { useQuery } from 'react-query';
import { getData } from '../../utils/getApiData';
import EpisodeCard from '../EpisodeCard';

const { Text } = Typography;

const CharacterEpisodes = ({ character }) => {
	const { data, isLoading, isError } = useQuery(
		['character', character],
		() => getData(character),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) {
		return <Card loading={true} size='small'></Card>;
	}

	if (isError) {
		return <Alert message={isError} type='error' />;
	}
	const episodes = data.episode;


	return (
		<Card
			style={{ width: '100%', maxHeight: 400 }}
			size='small'
			title={<Text strong>{episodes.length} episodes</Text>}
		>
			<Flex
				style={{ maxHeight: 345, overflowY: 'scroll' }}
				gap='small'
				wrap='wrap'
				justify='center'
			>
				{episodes.map((ep, index) => {
					return <EpisodeCard key={index} episode={ep} />;
				})}
			</Flex>
		</Card>
	);
};

export default CharacterEpisodes;
