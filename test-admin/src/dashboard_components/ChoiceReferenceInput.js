// in PostReferenceInput.js
import React, { Fragment  } from 'react';
import { ReferenceInput, SelectInput } from 'react-admin';
import ChoiceQuickCreateButton from './ChoiceQuickCreateButton';

const ChoiceReferenceInput = (props) => (
    <Fragment>
        {/* <ReferenceInput {...props} >
            <SelectInput optionText="question_text" />
        </ReferenceInput> */}
        <ChoiceQuickCreateButton />
    </Fragment>
);

export default ChoiceReferenceInput;