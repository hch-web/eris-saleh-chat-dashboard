import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetUserData = () => {
  const user = useSelector(state => state.auth.user);

  const userId = useMemo(() => user.id, [user]);
  const username = useMemo(() => user.name, [user]);
  const email = useMemo(() => user.email, [user]);
  const group = useMemo(() => user.is_superuser, [user]);
  const firstName = useMemo(() => user.first_name, [user]);
  const lastName = useMemo(() => user.last_name, [user]);

  return { userId, username, email, group, firstName, lastName };
};

export default useGetUserData;
