import React from 'react';
import { Form, Formik } from 'formik';
import { IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

import FormikField from 'shared/FormikField';
import { chatFormInitValues } from '../utilities/formUtils';
import useHumanAgentChat from '../customHooks/useHumanAgentChat';
import { useHumanAgentContext } from '../context/HumanAgentContext';

function ChatForm() {
  const { selectedId, selectedRoom } = useHumanAgentContext();
  const socketRef = useHumanAgentChat();

  return (
    <Formik
      initialValues={chatFormInitValues}
      onSubmit={(values, { resetForm }) => {
        if (!values.query) return;

        if (socketRef.current) {
          socketRef.current.send(JSON.stringify(values));
          resetForm();
        }
      }}
    >
      {() => (
        <Form className="d-flex align-items-center gap-2">
          <FormikField
            size="small"
            placeholder="Type Here..."
            name="query"
            variant="outlined"
            multiline
            minRows={1}
            maxRows={2}
            disabled={!selectedId || !selectedRoom}
          />

          <IconButton type="submit" disabled={!selectedId || !selectedRoom}>
            <Send />
          </IconButton>
        </Form>
      )}
    </Formik>
  );
}

export default ChatForm;
