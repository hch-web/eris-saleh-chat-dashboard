import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetUserByIdQuery } from 'services/private/user';
import { profileInitValues } from '../utilities/formUtils';

const useGetProfileData = isAdd => {
  const { id } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(profileInitValues);
  // const userProfile = useSelector(state => state.auth?.user);

  const { data: userProfile } = useGetUserByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'First Name',
        fieldName: 'first_name',
      },
      {
        label: 'Last Name',
        fieldName: 'last_name',
      },
      {
        label: 'Username',
        fieldName: 'username',
        disabled: !isAdd,
      },
      {
        label: 'Email',
        fieldName: 'email',
      },
      {
        label: isAdd ? 'Password' : 'New Password',
        fieldName: 'password',
      },
      {
        label: 'Confirm Password',
        fieldName: 'confirmPassword',
      },
    ];

    setModifiedData(data);
    setInitValues(prevState => ({ ...prevState, ...userProfile }));
  }, [userProfile, isAdd]);

  return { modifiedData, initValues };
};

export default useGetProfileData;
