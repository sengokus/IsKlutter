import React from 'react';
import {
    Checkbox,
    CheckIcon,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
    Box
} from '@gluestack-ui/themed';

import colors from '../config/colors.js';

export default function CheckBox({ checkBoxLabel, ariaLabel, onValueChange }) {
    return (
        <Box>
            <Checkbox 
                m={10} 
                size="sm" 
                isInvalid={false} 
                isDisabled={false} 
                aria-label={ariaLabel}
                onChange={(value) => onValueChange(value)}
            >
                <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>{checkBoxLabel}</CheckboxLabel>
            </Checkbox>
        </Box>
    );
};