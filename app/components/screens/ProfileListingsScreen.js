import React from 'react';
import { GluestackUIProvider, Center } from '@gluestack-ui/themed';

import ProfilePage from '../../src/ProfileListings';

export default function HomepageScreen() {
	return (
		<GluestackUIProvider>
			<Center>
				<ProfilePage />
			</Center>
		</GluestackUIProvider>
	);
}