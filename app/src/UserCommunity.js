import React from 'react';
import {
    HStack,
    VStack,
    Heading,
    Box, 
    ScrollView,
} from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PostCard from '../components/PostCard';

import colors from '../config/colors.js'
import Routes from '../components/constants/Routes.js';

export default function UserCommunity(){
    const navigation = useNavigation();

    return (

        <Box w="100%" h="100%">
             <ScrollView>
                    <HStack space="xs" flexWrap="wrap" justifyContent="center">
                        <PostCard
                            // posterIcon={ require("../../assets/img/usericon.jpg") }
                            posterName="Sassa"
                            postDate="11-6-23"
                            postContent="HHEHEHEHEHHEHEHEHBHDUUEFHCEIUCNIRW"
                    
                        />
                         <PostCard
                            // posterIcon={ require("../../assets/img/usericon.jpg") }
                            posterName="Sassa"
                            postDate="11-6-23"
                            postContent="HHEHEHEHEHHEHEHEHBHDUUEFHCEIUCNIRW"
                    
                        />
                    </HStack>
            </ScrollView>
        </Box>

    )
}