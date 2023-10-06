//create subscription
import React from 'react';
import {
  Create,
  required,
  TextInput,
  SelectInput,
  SaveButton,
  Toolbar,
  NumberInput,
  SimpleForm,
  FormDataConsumer,
  number,
  FileInput,
  FileField,
} from 'react-admin';
import { DateInput } from 'react-admin';

const currentDate = new Date(); // Get the current date
const validateDateRange = (value, allValues, props) => {
  const startDate = new Date(allValues.startDate); // Get the entered start date
  const endDate = new Date(value); // Get the entered end date

  if (startDate > endDate) {
    return 'End date must be after start date'; // Return an error message if end date is before start date
  }

  if (endDate < currentDate) {
    return 'End date must be after today'; // Return an error message if end date is before today
  }

  return undefined; // Return undefined if there are no errors
};

const SubCreate = (props) => {
  const handleSave = (values) => {
    // activate the status here
    console.log('Status activated!');
  };

  return (
    <Create title="Add Subscription" {...props}>
      <SimpleForm
        toolbar={<CustomToolbar onSave={handleSave} />}
        submitOnEnter
        label="Save"
        mode="onBlur"
        reValidateMode="onBlur"
      >
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
          source="orderId"
          label="Order Id"
          validate={number('order id is invalid')}
        />
        <TextInput
          source="accountId"
          label="Account Id"
          validate={number('account id is invalid')}
        />
        <TextInput source="accountName" validate={required()} />
        <DateInput source="startDate" validate={required()} />
        <DateInput
          source="endDate"
          validate={[required(), validateDateRange]}
        />

        <NumberInput
          source="feeds_Finnish_Renn"
          label="No of feeds for Finish Rennovation "
          validate={required()}
        />
        <NumberInput
          source="feeds_Plot"
          label="No of feeds for Plot information "
          validate={required()}
        />
        <NumberInput
          source="feeds_Sales_Announcement"
          label="No of feeds for Sales Announcements "
          validate={required()}
        />
        <NumberInput
          source="feeds_Jobs"
          label="No of feeds for Jobs"
          validate={required()}
        />
        <NumberInput
          source="feeds_Patent"
          label="No of feeds for Patents: "
          validate={required()}
        />
        <SelectInput
          source="subscriptionType"
          label=" Subscription type"
          choices={[
            { id: 'trial', name: 'Trial' },
            { id: 'normal', name: 'Normal' },
          ]}
          validate={required()}
        />
        <FileInput source="attachments">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

const CustomToolbar = ({ onSave, ...props }) => (
  <Toolbar {...props}>
    <SaveButton label="Save" onSave={onSave} />
  </Toolbar>
);

export default SubCreate;
