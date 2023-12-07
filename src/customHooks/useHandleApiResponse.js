import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useHandleApiResponse = (
  error,
  isSuccess,
  message = 'Operation Successfull!',
  successLink = null
) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess && message) {
      enqueueSnackbar(message, { variant: 'success' });

      if (successLink) {
        navigate(successLink);
      }
    }
  }, [isSuccess, successLink]);

  useEffect(() => {
    if (error && error.status === 400 && 'data' in error) {
      enqueueSnackbar(
        error.data?.error || error.data?.message || 'Something went wrong!',
        { variant: 'error' }
      );
    }
  }, [error]);

  return null;
};

export default useHandleApiResponse;
