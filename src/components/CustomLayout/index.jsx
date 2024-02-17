import { Flex, Layout, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const layoutStyle = {
	minHeight: '100vh',
	overflowX: 'hidden',
};

const contentStyle = {
	overflowX: 'hidden',
};

const CustomLayout = ({ children }) => {
	return (
		<Layout style={layoutStyle}>
			<Header>
				<Flex style={{ height: '100%' }} align='center'>
						<a href='/'>
					<Title level={4}>
							Rick and Morty wiki
					</Title>
							</a>
				</Flex>
			</Header>
			<Content style={contentStyle}>
				<Flex vertical='true' gap='small'>
					{children}
				</Flex>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				<Text type='secondary'>
					Coded by{' '}
					<Text strong>
						<a href='https://github.com/Joytforname'>Joyt</a>
					</Text>{' '}
					2024
				</Text>
			</Footer>
		</Layout>
	);
};

export default CustomLayout;
