import React, { useState} from 'react';
import { Box, Text, VStack, Button, Input, InputField, Image } from '@gluestack-ui/themed';
import colors from '../config/colors.js';
import { getFirestore, addDoc, collection, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_APP, storage} from '../../config/firebase';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useUser } from '../components/UserIcon.js';
import PostBoxImagePicker from './PostBoxImagePicker';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(FIREBASE_APP);
const auth = getAuth();

export default function PostBox() {
    const navigation = useNavigation();
    const [postDescription, setPostDescription] = useState('');
    const [listingData, setListingData] = useState({ listingImages: [], hasImage: false });
    const { userProfileImg } = useUser();

    const postForum = async () => {
        try {
            if (!auth || !auth.currentUser) {
                console.error('User not authenticated');
                return;
            }

            const user = auth.currentUser;
            const userID = user.uid;

            if (!userID) {
                console.error('User ID not available');
                return;
            }

            if (postDescription || listingData.hasImage) {
                const imageUrls = await Promise.all(
                    listingData.listingImages.map(async (imageBlob, index) => {
                        const imageName = `image_${Date.now()}_${index}`;
                        const storagePath = `communityImage/${imageName}.jpeg`;
                        const imageRef = storageRef(storage, storagePath);
                        const metadata = { contentType: 'image/jpeg' };
                        await uploadBytes(imageRef, imageBlob, metadata);
                        return getDownloadURL(imageRef);
                    })
                );

                const docRef = await addDoc(collection(db, 'forum'), {
                    userID: userID,
                    description: postDescription,
                    timestamp: new Date(),
                    key: '',
                    images: imageUrls,
                    hasImage: listingData.hasImage
                });

                setPostDescription('');
                setListingData({ listingImages: [], hasImage: false });
                await updateDoc(docRef, { key: docRef.id });
                alert('Success', 'Post added successfully');
                console.log("Post added successfully");
                navigation.goBack();
            } else {
                console.error('Post description and images are empty');
            }
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <Box>
            <VStack space="sm" justifyContent="space-evenly" alignItems="center" p="$3">
                {userProfileImg && (
                    <Image
                        source={{ uri: userProfileImg }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                        alt="user profile"
                    />
                )}
                <PostBoxImagePicker setListingData={setListingData} />
                <Input bg={colors.white} borderColor={colors.secondary} h="30%" w="100%" zIndex={0}>
                    <InputField
                        multiline={true}
                        size="md"
                        placeholder="Write a post..."
                        value={postDescription}
                        onChangeText={(text) => setPostDescription(text)}
                    />
                </Input>
                

                
            </VStack>
            <VStack p="$3">
            <Button variant="solid" 
                    size="sm" 
                    bg={colors.secondary} 
                    borderRadius={30} 
                    onPress={postForum} ml={3}>
                    <Text color={colors.white} fontSize="$sm">
                        Post
                    </Text>
                </Button>
            </VStack>
        </Box>
    );
}
