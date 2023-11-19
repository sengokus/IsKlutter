import React from 'react';
import { GluestackUIProvider, Center } from '@gluestack-ui/themed';

import ProfilePage from '../../src/ProfileCommunity';

export default function HomepageScreen() {
	return (
		<GluestackUIProvider>
			<Center>
				<ProfilePage />
			</Center>
		</GluestackUIProvider>
	);
}