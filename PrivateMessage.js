import React, { useEffect, useState } from 'react';
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
    Pressable
} from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchHeaderBack from '../components/SearchHeaderBack.js';
import UserAvatar from '../components/Avatar.js';
import SenderBox from '../components/SenderBox.js';
import { serverTimestamp } from 'firebase/firestore';
import colors from '../config/colors.js';
import Routes from '../components/constants/Routes.js';
import { getFirestore, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_APP } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(FIREBASE_APP);
const auth = getAuth();


export default function PrivateMessagePage() {
    const route = useRoute();
    const recipient = route.params?.recipient || '';
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const [messageContent, setMessageContent] = React.useState(''); // State to capture message content

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            if (!auth || !auth.currentUser) {
              setTimeout(fetchUserData, 1000);
              return;
            }
    
            const user = auth.currentUser;
            const userCollection = collection(db, 'users');
            const querySnapshot = await getDocs(query(userCollection, where('userID', '==', user.uid)));
    
            querySnapshot.forEach((doc) => {
              setUsername(doc.data().username); 
            });
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        fetchUserData();
      }, []);
  
    const sendMessage = async () => {
        try {
          if (recipient && messageContent) {
            const timestamp = serverTimestamp(); // Get the server timestamp
          
            const messageData = {
              sender: username,
              recipient: recipient,
              message: messageContent,
              timestamp: timestamp, // Include the timestamp in the message data
            };
    
            // Add data to Firestore collection 'Messages' with the timestamp
            const docRef = await addDoc(collection(db, 'Messages'), messageData);
    
            setMessageContent('');
            alert('Message sent');
            console.log('Document written with ID: ', docRef.id);
          } else {
            console.error('Recipient or message content missing');
          }
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };
    
  

  

    const privMessagesData = [
        { 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Sassa",
            senderUsername: "@sassagurl",
        }
    ]

    const renderSenderBox = () => {
        return privMessagesData.map((privMessage, index) =>
            <SenderBox
                key = {index}
                senderIcon={privMessage.senderIcon}
                senderName={privMessage.senderName}
                senderUsername={privMessage.senderUsername}
                //message={message.message}

            />
        );
    }

    return(
        // Parent box
        <Box w="100%" h="100%">

            {/*Search Bar*/}
            <SearchHeaderBack userIcon={ require("../../assets/img/usericon.jpg") } back={navigation.goBack} />

             {/* Messages Title */}
            <VStack space="xs" alignItems="left" bgColor="$amber200" p="$3" width="100%">
             <Heading lineHeight={40} fontSize="$3xl" fontWeight="$extrabold" color={colors.secondary} m={2}>
                To: {recipient}
            </Heading>
            </VStack>

            {/* Container */}
            <ScrollView>
            <HStack space={0} flexWrap="wrap">
                {/* Render message components or sender boxes */}
            </HStack>

            <Input bg={colors.white} borderColor={colors.secondary} h={75} w="72%" zIndex={0}>
                    <InputField
                        multiline={true}
                        size="md"
                        placeholder="Chat here..."
                        value={messageContent}
                        onChangeText={(text) => setMessageContent(text)} // Update message content state
                            />
                </Input>
                        

                <Button
                    variant="solid"
                    size="sm"
                    bg={colors.secondary}
                    borderRadius={8}
                    onPress={sendMessage}
                    ml={3}
                >
                    <Text color={colors.white} fontSize="$sm">Send</Text>
                </Button>
                        
    </ScrollView>
    
        </Box>
    )

}   