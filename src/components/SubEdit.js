//edit subscription
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  DateInput,
  NumberInput,
  FormDataConsumer,
  number,
  FileField,
  FileInput,
} from 'react-admin';
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

const SubEdit = (props) => {
  return (
    <Edit title="Edit Subscription" {...props}>
      <SimpleForm mode="onBlur" reValidateMode="onBlur">
        <FormDataConsumer>
          {({ formData }) =>
            formData.id ? (
              <input type="hidden" value={formData.id} name="id" />
            ) : null
          }
        </FormDataConsumer>
        <TextInput
          source="orderId"
          label="Order Id"
          validate={number('Order id is invalid')}
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
        <SelectInput
          source="status"
          label=" Status"
          choices={[
            { id: 'Activated', name: 'Activated' },
            { id: 'Deactivated', name: 'Deactivated' },
          ]}
          validate={required()}
        />
        {/* {BackButton} */}
        <FileInput source="attachments">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
};
export default SubEdit;
