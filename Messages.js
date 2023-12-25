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
    ScrollView,
} from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchHeaderBack from '../components/SearchHeaderBack.js';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import colors from '../config/colors.js';
import Routes from '../components/constants/Routes.js';
import { addDoc, collection, getFirestore } from 'firebase/firestore'; // Import Firestore functions as needed


export default function MessagesPage({ user }) {
    const navigation = useNavigation();
    const [listingDescription, setListingDescription] = useState('');
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Handle foreground messages
        const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
            console.log('Foreground message received:', remoteMessage);
            // Handle message data here
        });

        // Handle background messages
        const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Background message received:', remoteMessage);
            // Handle message data here
        });

        return () => {
            unsubscribeForeground();
            unsubscribeBackground();
        };
    }, []);

    const sendButton = async () => {
        try {
        
            await sendMessage({
                description: listingDescription,
                username: user.username, 
                text: messageText,
            });
            // Clear input fields after posting
            setListingDescription('');
            setMessageText('');
            Alert.alert('Message sent!');
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    const renderMessageBubbles = () => {
        // Map messages
        return messages.map((message, index) => (
            <Box
                key={index}
                bg={message.user === 'me' ? colors.secondary : colors.primary}
                p={3}
                m={2}
                borderRadius={12}
                alignSelf={message.user === 'me' ? 'flex-end' : 'flex-start'}
                maxWidth="70%"
            >
                <Text color={colors.white}>{message.text}</Text>
            </Box>
        ));
    };
    return (
        <Box w="100%" h="100%" alignItems="center">
            <SearchHeaderBack userIcon={require("../../assets/img/usericon.jpg")} />

            <Box p="$6" w="100%" maxWidth="$96" flex={1}>
                {/*Listings Label and post button */}
                <VStack space="xs" alignItems="center" bg={colors.secondary} borderTopStartRadius={8} borderTopEndRadius={8}>
                    <Heading lineHeight={40} fontSize="$2xl" fontWeight="$extrabold" color={colors.white}>cinnamonroll</Heading>
                </VStack>

                <ScrollView>
                    <Box bg={colors.white} p={10}>
                            {/* Render message bubbles based on data */}
                            <VStack space="xs" pb="$5" flex={1}>
                                {renderMessageBubbles()}
                            </VStack>
                    </Box>
                </ScrollView>

                <Box p={20}>
                    <HStack space="2xl" justifyContent="space-evenly">
                        <FormControl
                            borderRadius={10}
                            w="80%"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
                            <Input w="auto" bg={colors.white}>
                                <InputField t
                                   multiline={true}
                                   size="md"
                                   placeholder="send a message..."
                                   value={sendButton}
                                   onChangeText={(text) => setsendButton(text)}/>
                            </Input>
                        </FormControl>

                        <Button
                            bg={colors.secondary}
                            borderRadius={8}
                            size="sm"
                            paddingHorizontal={25}
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            onPress={send}
                        >
                            <ButtonText>Send</ButtonText>
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
}