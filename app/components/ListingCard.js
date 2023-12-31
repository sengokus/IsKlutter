    import React from 'react';
    import {
        Box,
        Text,
        VStack,
        HStack,
        Heading,
        Image,
        Button,
        ButtonIcon,
        ButtonText,
    } from '@gluestack-ui/themed';
    import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
    import { useNavigation } from '@react-navigation/native';
    import Routes from '../components/constants/Routes.js';
    import colors from '../config/colors.js';



    export default function ListingCard({ productID, productName, productImage, productPrice, productDesc, sellerName, sellerImage, sellerChat, tags }) {
        const navigation = useNavigation();

        const handleChatPress = () => {
            navigation.navigate(Routes.PRIVATEMESSAGE, { recipient: sellerName });
        };
    

        return (
            <Box p="$3" w="100%" backgroundColor="$white">
                <VStack space="md" pb="$2">
                    {productImage && productImage.uri ? (
                        <Image source={{ uri: productImage.uri }} h={230} w="100%" alt="item" borderRadius={3} />
                    ) : (
                        // You can replace this with a placeholder image or some other content
                        <Text>No Image</Text>
                    )}
                </VStack>

                {/* Item name and price */}
                <VStack space="sm" p="$2">
                    <Heading fontSize="$2xl" color={colors.primary}>{productName}</Heading>
                    <Text fontSize="$lg" color={colors.secondary} fontWeight="$bold">{`PHP ${productPrice}`}</Text>
                </VStack>

                {/* Tags */}
                <HStack space="sm" p="$2">
                    {tags.map((tag, index) => (
                        <Text key={index}>{tag}</Text>
                    ))}
                </HStack>

                {/* Description */}
                <VStack space="sm" p="$2">
                    <Text fontSize="$md">{productDesc}</Text>
                </VStack>

                {/* Poster info */}
                <HStack justifyContent="space-between" flexDirection="row">
            <HStack space="sm" p="$2" alignItems="center">
                {/* Seller name */}
                <Text color={colors.gray}>{sellerName}</Text>

                {/* Chat button */}
                <Button
                    variant="solid"
                    size="sm"
                    backgroundColor={colors.primary}
                    borderRadius={8}
                    onPress={handleChatPress} // Use the function to navigate and pass sellerName
                    alignSelf="flex-end"
                >
                    {/* Chat button content */}
                    <ButtonIcon>
                        <MaterialCommunityIcons name="chat" size={13} color={colors.white} />
                    </ButtonIcon>
                    <ButtonText color={colors.white} fontSize="$sm">Chat</ButtonText>
                </Button>
            </HStack>
        </HStack>
            </Box>
        )
    }