import { Card, Skeleton, Alert, Typography, Flex } from 'antd';
import axios from 'axios';
import { useState } from 'react';
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

const EpisodeCard = ({ episode}) => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery(
		['episodeData', episode],
		() => getData(episode),
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
				<Alert message='Episode error' type='error' showIcon />
			</Card>
		);
	}
	return (
		<Card
			hoverable={true}
			style={cardStyle}
			size='small'
			title={<Text strong>{data.name}</Text>}
			onClick={() => navigate(`/episode/${data.id}`)}
		>
			<Flex vertical gap='small'>
				<Flex gap='large'>
					<Text>Episode: {data.episode}</Text>
					<Text>Date: {data.air_date}</Text>
				</Flex>
				<Text>Characters: {data.characters?.length}</Text>
			</Flex>
		</Card>
	);
};

export default EpisodeCard;
