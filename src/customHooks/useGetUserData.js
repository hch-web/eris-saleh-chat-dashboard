import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ADMIN, SUPPORT } from 'utilities/constants';

const useGetUserData = () => {
  const user = useSelector(state => state.auth.user);

  const userId = useMemo(() => user.id, [user]);
  const username = useMemo(() => user.name, [user]);
  const email = useMemo(() => user.email, [user]);
  const group = useMemo(() => user.is_superuser, [user]);
  const firstName = useMemo(() => user.first_name, [user]);
  const lastName = useMemo(() => user.last_name, [user]);
  const isAdmin = useMemo(() => user.role === ADMIN, [user]);
  const isSupport = useMemo(() => user.role === SUPPORT, [user]);

  return { userId, username, email, group, firstName, lastName, isAdmin, isSupport };
};

export default useGetUserData;
