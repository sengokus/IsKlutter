import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, ScrollView, Heading, Text, HStack } from '@gluestack-ui/themed';

import SearchHeader from '../components/SearchHeader.js';
import ViewProfileCard from '../components/ViewProfileCard.js';
import ItemCard from '../components/ItemCard.js';
import Routes from '../components/constants/Routes.js';
import colors from '../config/colors.js';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import SearchHeaderBack from '../components/SearchHeaderBack.js';

export default function ViewProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [sellerProfile, setSellerProfile] = useState(null);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    console.log(route);
    const sellerID = route.params?.sellerID;

    if (!sellerID) {
      console.error("Seller ID is undefined in route params");
      return;
    }

    const fetchSellerProfile = async () => {
      const q = query(collection(database, 'users'), where('userID', '==', sellerID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const sellerDoc = querySnapshot.docs[0];
        const sellerDocSnapshot = await getDoc(doc(database, sellerDoc.ref.path));

        if (sellerDocSnapshot.exists()) {
          const sellerData = sellerDocSnapshot.data();
          setSellerProfile(sellerData);
        } else {
          console.error('Seller document does not exist.');
        }
      } else {
        console.error('Seller document not found.');
      }
    };

    const fetchSellerListings = async () => {
      const sellerListingQuery = query(collection(database, 'listings'), where('sellerID', '==', sellerID));
      const sellerListingQuerySnapshot = await getDocs(sellerListingQuery);
      const sellerListingData = sellerListingQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserListings(sellerListingData);
    };

    fetchSellerProfile();
    fetchSellerListings();
  }, [route.params]);

  const renderUserListings = () => {
    return userListings.map((item) => {
      const firstTag = item.listingTags && item.listingTags.length > 0 ? item.listingTags[0] : null;

      return (
        <ItemCard
          key={item.id}
          productImage={item.listingImageURL}
          productPrice={item.listingPrice}
          productName={item.listingName}
          productSeller={sellerProfile?.username}
          tags={firstTag}
          toListing={() => navigation.navigate(Routes.LISTINGS, { selectedItem: item, sellerImageURL: sellerProfile?.userProfileImg, sellerName: sellerProfile?.username  })}
        />
      );
    });
  };

  return (
    <Box w="100%" h="100%">
      <SearchHeaderBack userIcon={require("../../assets/img/usericon.jpg")} back={navigation.goBack} />
      <Box p="$2" w="100%">
        {sellerProfile && (
          <ViewProfileCard
            userProfileImg={sellerProfile.userProfileImg}
            username={sellerProfile.username}
            profileName={sellerProfile.userProfile || sellerProfile.username}
            bio={sellerProfile.userBio || "I have no interesting info."}
            userID={sellerProfile.userID}
          />
        )}
      </Box>
        
      <Heading lineHeight={40}  pl={20} fontSize={20} color={colors.white} bgColor={colors.secondary} mt={6}>
          {`${sellerProfile?.username}'s Listings`}
       </Heading>

      <Box  p="$5" w="100%" maxWidth="$96" >
              <ScrollView>
              <HStack space="xs" flexWrap="wrap" justifyContent="center" >
                  {renderUserListings()}
                </HStack>
              </ScrollView>
            </Box>
        
      
    </Box>
  );
}
