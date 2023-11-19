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

import ItemCard from '../components/ItemCard.js';

import colors from '../config/colors.js'
import Routes from '../components/constants/Routes.js';

export default function UserListings() {
    const navigation = useNavigation();

    return (
        <Box p="$2" w="100%" maxWidth="$96" flex={1}>
            {/*Listing Box Container*/}
            <ScrollView>
                <HStack space="xs" flexWrap="wrap" justifyContent="center">
                    <ItemCard
                        productImage={ require("../../assets/img/item.jpg") }
                        productPrice="Price" productName="Product"
                        productSeller="Seller"
                        toListing={() => Alert.alert("Alert", "This is a dummy action")}
                    />  
                </HStack>
            </ScrollView>
        </Box>
    
    )
}