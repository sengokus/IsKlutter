import * as React from 'react';
import {
    VStack,
    HStack,
    Heading,
    Image,
    Box,
    Button,
    ButtonText,
    FormControl,
    FormControlLabel,
    FormControlError,
    FormControlErrorText,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
    FormControlErrorIcon,
    Input,
    InputField,
    Icon,
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Pressable,
    Text
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import SearchHeader from '../components/SearchHeader.js';
import SearchHeaderBack from '../components/SearchHeaderBack.js';
import ListingCard from '../components/ListingCard.js';
import TagLabel from '../components/TagLabel.js';
import CommentBox from '../components/CommentBox.js';
import ReplyBox from '../components/ReplyBox.js';

import ProfileScreen from '../components/screens/ProfileScreen.js';

import colors from '../config/colors.js';
import Routes from '../components/constants/Routes.js';


export default function ListingsPage() {
    const navigation = useNavigation();

    const listingsData = [
        {
            productImage: require("../../assets/img/item.jpg") ,
            productName: "Kuromi Plush",
            productPrice: "PHP 450",
            productDesc: "Brand new Kuromi plushie from Japan, selling for less than SRP. Meetup at CUB, 2 PM.",
            sellerName: "cinnamonroll",
            tags: [<TagLabel tagName="Toys" />],
            sellerImage: require("../../assets/img/usericon.jpg"),
        }
    ]

    const listingsRepliesData = [
        {
            replyUser: "kuromi",
            userIcon: require("../../assets/img/usericon.jpg"),
            replyText: "mine!",
            replyDate: "10/25/2023",
            replyTime:"12:58 PM"
        }, {
            replyUser: "sassag0rl",
            userIcon: require("../../assets/img/sassa.jpg"),
            replyText: "EPAL NG NAG MINE",
            replyDate: "10/25/2023",
            replyTime:"1:43 PM"
        }, 
    ]

    const renderListings = () => {
        return listingsData.map((listing, index) => 
            <ListingCard
                key={index}
                productImage={listing.productImage}
                productName={listing.productName}
                productPrice={listing.productPrice}
                productDesc={listing.productDesc}
                sellerName={listing.sellerName}
                tags={listing.tags}
                sellerImage={listing.sellerImage}
            />
        );
    }

    const renderListingsReply = () => {
        return listingsRepliesData.map((listing, index) =>
            <ReplyBox
                key={index}
                replyUser={listing.replyUser}
                userIcon={listing.userIcon}
                replyText={listing.replyText}
                replyDate={listing.replyDate}
                replyTime={listing.replyTime}
            />
        );
    }

    return (
        // Parent box
        <Box w="100%" h="100%">
            {/*Search Bar*/}
            <SearchHeaderBack userIcon={ require("../../assets/img/usericon.jpg")} back={navigation.goBack} />

            <Box p="$6" w="100%" maxWidth="$96" flex={1}>
                {/*Listings Label */}
                <VStack space="xs" pb="$2">
                    <Heading lineHeight={60} fontSize="$5xl" color={colors.secondary}>Listings</Heading>
                </VStack>

                <ScrollView>
                    <VStack space="xs" flexWrap="wrap">
                        {renderListings()}
                    </VStack>

                    {/* Added a comment */}
                    <VStack space="xs">
                        <CommentBox posterIcon={ require("../../assets/img/usericon.jpg") } comment={() => Alert.alert("Alert", "This is a dummy action")} />
                    </VStack>
                    
                    {/* Replies */}
                    <VStack space="xs">
                        <Heading pt="$3" fontSize="$2xl" color={colors.secondary}>Replies</Heading>
                        <VStack space="xs">
                            {renderListingsReply()}
                        </VStack>
                    </VStack>
                </ScrollView>
            </Box>
        </Box>
    );
}