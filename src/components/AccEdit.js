//EDIT ACCOUNT
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  email,
  FormDataConsumer,
  number,
} from 'react-admin';

const AccEdit = (props) => {
  return (
    <Edit title="Edit Account" {...props}>
      <SimpleForm mode="onBlur" reValidateMode="onBlur">
        <FormDataConsumer>
          {({ formData }) =>
            formData.id ? (
              <input type="hidden" value={formData.id} name="id" />
            ) : null
          }
        </FormDataConsumer>

        <TextInput
          source="accountId"
          label="Account ID"
          validate={number('account id is invalid')}
        ></TextInput>
        <TextInput source="accountName" validate={required()}></TextInput>
        <TextInput source="region" validate={required()}></TextInput>
        <TextInput
          source="salesRepresentative"
          validate={required()}
        ></TextInput>
        <TextInput
          multiline
          source="email"
          validate={email('Invalid Email address')}
        ></TextInput>
        {/* {BackButton} */}
      </SimpleForm>
    </Edit>
  );
};
export default AccEdit;
