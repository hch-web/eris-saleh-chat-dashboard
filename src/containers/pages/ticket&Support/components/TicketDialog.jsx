import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useGenerateTicketMutation } from 'services/public/ticketAndSupport';
import useGetUserData from 'customHooks/useGetUserData';
import { COMPANY_ID } from 'utilities/constants';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import {
  ticketDialogFormInitValues,
  ticketDialogFormValSchema,
} from '../utilities/formUtils';

function TicketDialog({ isOpen, handleClose }) {
  const { email } = useGetUserData();
  const [generateTicket, { error, isSuccess }] = useGenerateTicketMutation();

  useHandleApiResponse(error, isSuccess, 'Ticket generated successfully');

  return (
    <Dialog PaperProps={{ sx: { width: '500px' } }} open={isOpen} onClose={handleClose}>
      <DialogTitle>Request Form</DialogTitle>

      <Formik
        initialValues={ticketDialogFormInitValues}
        validationSchema={ticketDialogFormValSchema}
        onSubmit={async values => {
          const payload = {
            ticket_title: values.title,
            ticket_description: values.description,
            company: COMPANY_ID,
            generated_by: email,
          };
          await generateTicket(payload);
          handleClose();
        }}
      >
        {() => (
          <Form>
            <DialogContent>
              <FormikField name="title" label="Title" className="mb-4" />

              <FormikField name="description" label="Description" multiline />
            </DialogContent>

            <DialogActions>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <Button onClick={handleClose}>Cancel</Button>

                <SubmitBtn />
              </Stack>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

TicketDialog.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default TicketDialog;
