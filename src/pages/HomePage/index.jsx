import {
	Divider,
	Flex,
	Input,
	Pagination,
	Radio,
	Space,
	Spin,
	Typography,
	Tag,
	Segmented,
} from 'antd';
import background from './img/header-background.jpg';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {
	getCharactersFilteredByStatus,
	getFilteredData,
} from '../../utils/getApiData';
import CharacterCard from '../../components/CharacterCard';
import EpisodeCard from '../../components/EpisodeCard';
import LocationCard from '../../components/LocationCard';

const { Search } = Input;
const { Text, Title } = Typography;

const pageStyle = {
	height: '100%',
};

const searchStyle = {
	height: '300px',
	backgroundImage: `url(${background})`,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	flexShrink: 0,
	overflowY: 'hidden',
};

const contentStyle = {
	minHeight: 635,
	maxWidth: 1640,
	margin: '0 auto',
	overflowY: 'hidden',
};

const paginationStyle = {
	margin: '0 auto',
};

const HomePage = () => {
	const [category, setCategory] = useState('character');
	const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [status, setStatus] = useState('default');
	const { data, isLoading, isError } = useQuery(
		['data', page, searchValue, status, category],
		() => {
			if (status === 'default') {
				return getFilteredData(category, page, searchValue);
			} else {
				return getCharactersFilteredByStatus(page, status, searchValue);
			}
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	const categoryChanger = (e) => {
		setCategory(e);
		setStatus('default');
		setSearchValue('')
		setPage(1);
	};
	const statusChanger = (e) => {
		setStatus(e.target.value);
		setPage(1);
	};
	const pageChanger = (value) => {
		setPage(value);
	};

	const searchValueChanger = (e) => {
		setSearchValue(e.target.value);
	};

	if (isLoading) {
		return (
			<Flex style={{width: '100%', height: '100vh'}} justify='center' align='center'>
			<Spin size='large'/>
			</Flex>
		);
	}
	if (isError) {
		return <>{data}</>;
	}

	return (
		<Flex style={pageStyle} vertical='true' gap='middle'>
			<Flex style={searchStyle} align='center' vertical='true' gap='small'>
				<Search
					value={searchValue}
					type='text'
					style={{ maxWidth: 600, marginTop: '5%' }}
					onChange={(e) => searchValueChanger(e)}
					placeholder='Search...'
				/>

				<Segmented
					size='middle'
					options={[
						{
							label: <Text>characters</Text>,
							value: 'character',
						},
						{
							label: <Text>episodes</Text>,
							value: 'episode',
						},

						{
							label: <Text>locations</Text>,
							value: 'location',
						},
					]}
					onChange={(value) => categoryChanger(value)}
				/>
				{category === 'character' && (
					<Tag color='black'>
						<Flex gap='small'>
							<Text strong>Status:</Text>
							<Radio.Group value={status} onChange={statusChanger}>
								<Radio value={'default'}>all</Radio>
								<Radio value={'alive'}>
									<Text type='success'>alive</Text>
								</Radio>
								<Radio value={'dead'}>
									<Text type='danger'>dead</Text>
								</Radio>
								<Radio value={'unknown'}>
									<Text type='warning'>unknown</Text>
								</Radio>
							</Radio.Group>
						</Flex>
					</Tag>
				)}
			</Flex>
			<Divider orientation='left'>
				<Title level={3}>
					{data.info.count} {category}s
				</Title>
			</Divider>
			<Space style={contentStyle} align='start'>
				<Flex gap='small' wrap='wrap' justify='center' align='start'>
					{category === 'character' &&
						data.results.map((char) => (
							<CharacterCard key={char.id} characterUrl={char.url} />
						))}
					{category === 'episode' &&
						data.results.map((ep) => (
							<EpisodeCard key={ep.id} episode={ep.url} />
						))}
					{category === 'location' &&
						data.results.map((loc) => (
							<LocationCard key={loc.id} location={loc.url} />
						))}
				</Flex>
			</Space>

			<Pagination
				current={page}
				style={paginationStyle}
				total={data.info.pages * 10}
				showSizeChanger={false}
				onChange={(value) => pageChanger(value)}
			/>
		</Flex>
	);
};

export default HomePage;
