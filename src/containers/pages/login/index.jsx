import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

// COMPONENTS & STYLES
import logoImg from 'assets/BES_LOGO.png';
import { authContainerWrapperStyles, cardStyles } from 'styles/mui/containers/authStyles';
import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <Box sx={authContainerWrapperStyles}>
      <Card elevation={8} sx={cardStyles}>
        <CardContent className="text-center p-5">
          <img
            className="mb-5 user-select-none mw-100"
            src={logoImg}
            width={380}
            alt="Logo"
          />

          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
