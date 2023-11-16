import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const useHandleApiResponse = (error, isSuccess, message = 'Operation Successfull!') => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess && message) {
      enqueueSnackbar(message, { variant: 'success' });
    }
  }, [isSuccess]);

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