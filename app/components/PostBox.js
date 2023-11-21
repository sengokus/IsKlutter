import React from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    Image,
    Button,
    ButtonText,
    Input,
    InputField,
} from '@gluestack-ui/themed';

import UserAvatar from './Avatar.js';

import colors from '../config/colors.js';

export default function PostBox( { post, posterUser, posterIcon } ) {
    return (
        <Box m={10}>
            <HStack space="lg" justifyContent="space-evenly" alignItems="center">
                <UserAvatar username={posterUser} userIcon={posterIcon} />

                <Input bg={colors.white} borderColor={colors.secondary} h={75} w="72%">
                    <InputField multiline={true} size="md" placeholder="Write a post..." />
                </Input>

                <Button variant="solid" size="sm" bg={colors.secondary} borderRadius={8} onPress={post} ml={3}>
                    <ButtonText color={colors.white} fontSize="$sm">Post</ButtonText>
                </Button>
            </HStack>
        </Box>
    )
}










