import React, { useEffect, useState } from 'react';
import {
    VStack,
    HStack,
    Text,
    Heading,
    Box,
    Button,
    ButtonText,
    View,
    FormControl,
    Input,
    InputField,
    ScrollView,
    Pressable
} from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
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
    const [messages, setMessages] = useState([]);



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

      useEffect(() => {
        const fetchMessages = async () => {
          try {
            if (!auth || !auth.currentUser || !recipient) {
              return;
            }
      
            const user = auth.currentUser;
            const loggedInUsername = username;
      
            const messagesCollection = collection(db, 'Messages');
            const messagesSnapshot = await getDocs(messagesCollection);
      
            const filteredMessages = [];
      
            messagesSnapshot.forEach((doc) => {
              const messageData = doc.data();
              const sender = messageData.sender;
              const currentRecipient = messageData.recipient;
              const message = messageData.message;
      
              // Check if the message is sent by the current user to the recipient
              const currentUserSent = sender === loggedInUsername && currentRecipient === recipient;
      
              // Check if the message is sent by the recipient to the current user
              const recipientSent = sender === recipient && currentRecipient === loggedInUsername;
      
              // Push messages with an indicator for sender differentiation
              if (currentUserSent || recipientSent) {
                filteredMessages.push({
                  sender: sender,
                  message: message,
                  currentUserSent: currentUserSent, // Indicator for the sender
                });
              }
            });
      
            setMessages(filteredMessages);
          } catch (error) {
            console.error('Error fetching messages:', error.message);
          }
        };
      
        fetchMessages();
      }, [auth, recipient, username]);
      

    
  

  

    const privMessagesData = [
        { 
            senderIcon: require("../../assets/img/sassa.jpg"),
            senderName: "Sassa",
            senderUsername: "@sassagurl",
        }
    ]
    const renderMessages = () => {
      if (!messages || messages.length === 0) {
        return <Text>No messages available</Text>; // Handle the case where messages are empty
      }
    
      return messages.map((message, index) => (
        <SenderBox
          key={index}
          senderIcon={message.senderIcon}
          senderName={message.senderName}
          senderUsername={message.senderUsername}
          message={message.message}
        />
      ));
    };

    
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

    const renderSpecificMessage = () => {
      if (!messages || messages.length === 0) {
        return null; // Handle the case where messages are empty
      }
    
      const loggedInUser = username; // Get the logged-in user
    
      return (
        <View>
          {messages.map((messageData, index) => (
              <View key={index} style={{alignContent: 'center', alignSelf: messageData.currentUserSent ? 'flex-end' : 'flex-start', // Align sender's message to the right, receiver's to the left
            }}>
              {messageData.message && (
                <View style={{ 
                  backgroundColor: messageData.currentUserSent ? 'green' : 'white', // Set background color based on currentUserSent'
                  padding: 10, 
                  marginVertical: 5,
                  }}>
                  <Text color={messageData.currentUserSent ? 'white' : 'black'}>{messageData.message}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      );
    };
    
    
    

    return(
        // Parent box
        <Box w="100%" h="100%">
 
            <SenderBox recipientName={recipient} back={navigation.goBack} />

            {/* Container */}
            <Box h="75%">
              <ScrollView>
                <HStack space={0} flexWrap="wrap" m={10}>
                  {renderSpecificMessage()}
                    {/* Render message components or sender boxes */}
                </HStack>
              </ScrollView>
            </Box>

            <HStack m={20}>

              <Input bg={colors.white} borderColor={colors.secondary} h={50} w="75%" zIndex={0}>
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
                    m={10}
                >
                    <Text color={colors.white} fontSize="$sm">Send</Text>
                </Button>
            </HStack>        

                
                        
    {/* </ScrollView> */}
    
        </Box>
    )

}   