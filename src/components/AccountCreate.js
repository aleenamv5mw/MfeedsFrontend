//CREATE ACCOUNT
import React from 'react';
import {
  Create,
  required,
  email,
  SimpleForm,
  TextInput,
  number,
  FormDataConsumer,
} from 'react-admin';
// import BackButton from './components/BackButton'

const AccountCreate = (props) => {
  return (
    <Create title="Add Account" {...props}>
      <SimpleForm mode="onBlur" reValidateMode="onBlur">
        <FormDataConsumer>
          {({ formData }) =>
            formData.id ? (
              <TextInput source="id" disabled />
            ) : (
              <input type="hidden" value="my-value" name="my-field" />
            )
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
    </Create>
  );
};
export default AccountCreate;
