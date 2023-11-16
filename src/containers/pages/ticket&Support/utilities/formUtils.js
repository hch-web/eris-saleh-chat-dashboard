import * as yup from 'yup';

export const ticketDialogFormInitValues = {
  title: '',
  description: '',
};

export const ticketDialogFormValSchema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().max(255, 'Only 255 characted allowed!').required('Required'),
});

export const chatFormInitValues = {
  message: '',
  file: [],
};

export const chatFormSchema = yup.object().shape({
  message: yup.string('Message cannot be empty!').when('file', {
    is: files => !files?.length > 0,
    then: () => yup.string().required('Message cannot be empty!'),
    otherwise: () => yup.string(),
  }),
  file: yup.array(),
});
