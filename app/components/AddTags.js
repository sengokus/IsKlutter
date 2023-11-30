import React from 'react';
import {
    FormControlLabel,
    FormControlLabelText,
    Box,
    VStack,
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
    CheckIcon,
} from '@gluestack-ui/themed';
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from './CheckBox.js';

import colors from '../config/colors.js';

const AddTags = ({ listingFormLabel, listingFormPlaceholder }) => {
    const [mainTags, setMainTags] = React.useState("");

    const Tags = [
        { key: 'food', value: 'Food' },
        { key: 'clothing', value: 'Clothing' },
        { key: 'accessories', value: 'Accessories' },
        { key: 'appliances', value: 'Appliances' },
        { key: 'toys', value: 'Toys' },
        { key: 'schoolessential', value: 'School Essentials' },
        { key: 'footwear', value: 'Footwear' },
    ];

    const renderCheckbox = () => {
        if (mainTags === 'food') {
            return (
                <Box>
                    <CheckBox checkBoxLabel = "Gluten-free" />
                </Box>
                
            );
        } else if (['clothing', 'accessories', 'toys'].includes(mainTags)) {
            return (
                <Box>
                    <CheckBox checkBoxLabel = "Hypoallergenic" />
                </Box>
                
            );
        }
        return null;
    };

    return (
        <Box>
            <VStack space="xl" m={5}>
                <FormControlLabel mb="$2">
                    <FormControlLabelText color={colors.secondary} fontWeight={600}>{listingFormLabel}</FormControlLabelText>
                </FormControlLabel>
            </VStack>

            <SelectList
                setSelected={setMainTags}
                data={Tags}
                placeholder={listingFormPlaceholder}
                defaultOption={{ key: 'food', value: 'Food' }}
            />

            {renderCheckbox()}
        </Box>
    );
};

export default AddTags;