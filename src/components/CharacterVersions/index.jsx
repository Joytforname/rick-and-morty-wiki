import { Alert, Flex, Pagination, Card, Typography } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCharactersByName } from '../../utils/getApiData';
import CharacterCard from '../CharacterCard';

const { Text } = Typography;

const CharacterVersions = ({ characterName }) => {
	const { id } = useParams('id');
	const [page, setPage] = useState(1);
	const { data, isLoading, isError } = useQuery(
		['characters', characterName, page],
		() => getCharactersByName(characterName, page),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
	const pageChanger = (value) => {
		setPage(value);
	};

	if (isLoading) {
		return <Card loading={true} size='small'></Card>;
	}

	if (isError) {
		return <Alert message={isError} type='error' />;
	}
	const similarCount = data.info.count > 1 ? data.info.count - 1 : 0;
	const filteredData = data.results.filter((char) =>
		char.id == id ? false : true
	);

	return (
		<Card
			size='small'
			title={<Text strong>{similarCount} similar characters</Text>}
		>
			<Flex gap='small' wrap='wrap' justify='center'>
				{filteredData.map((character) => {
					return (
						<CharacterCard key={character.id} characterUrl={character.url} />
					);
				})}
			</Flex>
			{data.info.count > 20 && (
				<Flex justify='center'>
					<Pagination
						style={{ margin: '10px auto 0' }}
						current={page}
						total={data.info.pages * 10}
						showSizeChanger={false}
						onChange={(value) => pageChanger(value)}
					/>
				</Flex>
			)}
		</Card>
	);
};

export default CharacterVersions;
