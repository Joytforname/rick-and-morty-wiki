import { getData } from "../../utils/getApiData";
import { useQuery } from "react-query";
import CharacterCard from "../CharacterCard";
import { Alert,  Card, Flex, Typography } from "antd";

const {Text} = Typography

const LocationCharacters = ({location, height}) => {
	const { data, isLoading, isError } = useQuery(
		['location', location],
		() => getData(location, ),
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

		const characters = data.residents;
		return (
			<Card
				style={{ width: '100%', maxHeight: 600}}
				size='small'
				title={
					<Text strong>
						{data.residents.length} characters in {data.name}
					</Text>
				}
				
			>
				<Flex
					style={{ maxHeight: 545, overflowY: 'scroll' }}
					gap='small'
					wrap='wrap'
					justify='center'
				>
					{characters.map((character, index) => {
						return <CharacterCard key={index} characterUrl={character} />;
					})}
				</Flex>
			</Card>
		);

}
 
export default LocationCharacters;