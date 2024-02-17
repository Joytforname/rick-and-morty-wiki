import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Paths from './paths';
import CustomLayout from './components/CustomLayout';
import HomePage from './pages/HomePage';
import CharacterPage from './pages/CharacterPage';
import EpisodePage from './pages/EpisodePage';
import LocationPage from './pages/LocationPage';
import { ConfigProvider, Switch, theme } from 'antd';
import { useState } from 'react';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <HomePage />,
	},
	{
		path: Paths.character,
		element: <CharacterPage />,
	},
	{
		path: Paths.episode,
		element: <EpisodePage />,
	},
	{
		path: Paths.location,
		element: <LocationPage />,
	},
]);

function App() {



	return (
		<ConfigProvider
			theme={{
				// 1. Use dark algorithm
				algorithm: theme.darkAlgorithm,

				// 2. Combine dark algorithm and compact algorithm
				// algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
			}}
		>
			<CustomLayout>
				<RouterProvider router={router} />
			</CustomLayout>
		</ConfigProvider>
	);
}

export default App;
