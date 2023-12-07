import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserByIdQuery } from 'services/private/user';
import { roleOptions } from 'utilities/selectOptions';
import { profileInitValues } from '../utilities/formUtils';

const useGetProfileData = isAdd => {
  const { id } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(profileInitValues);

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
        label: 'Role',
        fieldName: 'role',
        options: roleOptions,
        disabled: +id === userProfile?.id,
      },
      {
        label: 'Email',
        fieldName: 'email',
      },
      {
        label: isAdd ? 'Password' : 'New Password',
        fieldName: 'password',
        type: 'password',
      },
      {
        label: 'Confirm Password',
        fieldName: 'confirmPassword',
        type: 'password',
      },
    ];

    setModifiedData(data);
    setInitValues(prevState => ({ ...prevState, ...userProfile }));
  }, [userProfile, isAdd]);

  return { modifiedData, initValues };
};

export default useGetProfileData;
