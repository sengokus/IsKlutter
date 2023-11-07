import * as React from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors.js';
import Routes from '../components/constants/Routes.js'; // Make sure this path is correct

export default function CommunityPage() {
  const navigation = useNavigation();

  const messages = [
    { text: 'Hi', user: 'other' },
    { text: 'Hello', user: 'me' },
    { text: 'How are you?', user: 'other' },
    { text: 'I am good, thanks!', user: 'me' },
  ];

  const renderMessageBubbles = () => {
    return messages.map((message, index) => (
      <Box
        key={index}
        bg={message.user === 'me' ? colors.black : colors.white}
        p="$3"
        m="$2"
        borderRadius={10}
        alignSelf={message.user === 'me' ? 'flex-end' : 'flex-start'}
        maxWidth="70%"
      >
        <Text color={message.user === 'me' ? colors.white : colors.black}>
          {message.text}
        </Text>
      </Box>
    ));
  };

  return (
    <VStack w="90%" h="90%">
      <VStack space="xs" pb="$0">
        <Box bg="$green900" borderTopRightRadius={20} borderTopLeftRadius={20}>
          <Heading lineHeight={60} fontSize="$3xl" pl="$5" color="$white">
            Messages
          </Heading>
        </Box>
      </VStack>

      <VStack space="xs" pb="$5" flex={1}>
        {renderMessageBubbles()}
      </VStack>

      <HStack space="xs" justifyContent="space-between" pb="$5">
        <FormControl
          borderRadius={10}
          w="60%"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
        >
          <Input w="100%" bg="$">
            <InputField type="text" defaultValue="" />
          </Input>
        </FormControl>

        <Button
          bg="$green800"
          borderRadius={10}
          size="sm"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate(Routes.messages)}
        >
          <ButtonText>Send</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
}
