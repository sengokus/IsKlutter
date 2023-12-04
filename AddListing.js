import React, { useState, useEffect } from 'react';
import {
    HStack,
    VStack,
    Heading,
    Box,
    ScrollView,
    Button,
    Input,
    InputField,
    FormControl, 
    FormControlLabel, 
    FormControlError, 
    FormControlErrorText, 
    FormControlLabelText, 
    FormControlHelper, 
    FormControlHelperText, 
    FormControlErrorIcon, 
    ButtonText,
    Text
} from '@gluestack-ui/themed';
import AddListingImagePicker from '../components/AddListingImagePicker.js';
import SearchHeaderBack from '../components/SearchHeaderBack.js';
import AddListingBox from '../components/AddListingBox.js';
import AddTags from '../components/AddTags.js';
import colors from '../config/colors.js';
import Routes from '../components/constants/Routes.js';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { FIREBASE_APP } from '../../config/firebase';
import { auth } from '../../config/firebase';

// Initialize Firestore
const db = getFirestore(FIREBASE_APP);

export default function AddListingPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [listingName, setListingName] = useState('');
    const [listingPrice, setListingPrice] = useState('');
    const [listingDescription, setListingDescription] = useState('');
    const [listingTags, setListingTags] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!auth || !auth.currentUser) {
                    setTimeout(fetchUserData, 1000);
                    return;
                }

                const user = auth.currentUser;
                const userCollection = collection(db, "users");
                const querySnapshot = await getDocs(query(userCollection, where("userID", "==", user.uid)));

                querySnapshot.forEach((doc) => {
                    setUsername(doc.data().username); // Assuming 'username' field exists in the user document
                });
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleNameChange = (value) => {
        setListingName(value);
    };

    const handlePriceChange = (value) => {
        setListingPrice(value);
    };

    const handleDescriptionChange = (value) => {
        setListingDescription(value);
    };

    const handleTagsChange = (value) => {
        setListingTags(value);
    };

    const handlePostNow = async () => {
        try {
            // Add data to Firestore collection 'listings'
            const docRef = await addDoc(collection(db, 'listings'), {
                name: listingName,
                price: listingPrice,
                description: listingDescription,
                tags: listingTags,
                // Add any other fields you want to store
            });

            // Clear input fields after posting
            setListingName('');
            setListingPrice('');
            setListingDescription('');
            setListingTags('');
            alert('Posted');

            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <ScrollView>
            <Box w="100%" h="100%" backgroundColor={colors.primary}>
                {/* Search Bar */}
                <SearchHeaderBack userIcon={require("../../assets/img/usericon.jpg")} back={navigation.goBack} />

                <Box p="$6" w="100%" maxWidth="$96">
                    <VStack space="xs" pb="$2">
                        <Heading lineHeight={60} fontSize="$3xl" color={colors.secondary}>
                            {`Hi ${username}`} {/* Display the username */}
                        </Heading>
                        <Heading lineHeight={60} fontSize="$3xl" color={colors.secondary}>
                            Sell Your Product
                        </Heading>
                    </VStack>

                    <VStack space="xs" pb="$2">
                        <Heading lineHeight={60} fontSize="$3xl" color={colors.secondary}>Sell Your Product</Heading>
                    </VStack>

                    <Box bg={colors.medium} borderRadius={50}>
                        <VStack space="xs">
                            <AddListingBox listingImage={require("../../assets/img/item.jpg")} />
                        </VStack>
                    </Box>
                </Box>

                <AddListingImagePicker listingFormLabel="Upload an Image" />

                <VStack space="xl" py="$3">
                    <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false}>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText>Listing Title</FormControlLabelText>
                        </FormControlLabel>
                        <Input w="100%">
                            <InputField
                                type="text"
                                placeholder="Enter listing name"
                                value={listingName}
                                onChangeText={handleNameChange}
                            />
                        </Input>
                    </FormControl>

                    <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false}>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText>Price</FormControlLabelText>
                        </FormControlLabel>
                        <Input w="100%">
                            <InputField
                                type="number"
                                placeholder="Enter listing price"
                                value={listingPrice}
                                onChangeText={handlePriceChange}
                            />
                        </Input>
                    </FormControl>

                    <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false}>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText>Description</FormControlLabelText>
                        </FormControlLabel>
                        <Input w="100%">
                            <InputField
                                type="text"
                                placeholder="Enter listing description"
                                value={listingDescription}
                                onChangeText={handleDescriptionChange}
                            />
                        </Input>
                    </FormControl>

                    <AddTags
                        listingFormLabel="Tags"
                        listingFormPlaceholder="Select a Tag"
                        onInputChange={handleTagsChange} // Assuming AddTags handles input change
                    />
                </VStack>

                <Button variant="solid" size="sm" bg={colors.primary} borderRadius={10} m={5} onClick={handlePostNow}>
                    <ButtonText color={colors.white} fontSize="$sm">Post Now</ButtonText>
                </Button>

                <Button variant="solid" size="sm" bg={colors.gray} borderRadius={10} m={5}>
                    <ButtonText color={colors.white} fontSize="$sm">Cancel</ButtonText>
                </Button>
            </Box>
        </ScrollView>
    );
}
