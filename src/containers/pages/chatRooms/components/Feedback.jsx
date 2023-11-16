import React, { useMemo } from 'react';
import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { v4 } from 'uuid';
import moment from 'moment';

import {
  feedbackBodyWrapperStyles,
  feedbackChipStyles,
  feedbackHeaderStyles,
  feedbackPaperWrapperStyles,
} from 'styles/mui/containers/chatRoomsStyles';
import { feedbackChipsData } from '../utilities/data';
import { useChatContext } from '../contexts/chatContexts';

function Feedback() {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { feedback } = useChatContext();

  const isOthers = useMemo(() => {
    if (feedback.text !== null) {
      const modifiedOptions = feedbackChipsData.slice(0, -1).map(chip => chip.value);
      return modifiedOptions.includes(feedback.text) === false;
    }
    return false;
  }, [feedback]);

  return (
    <Grid item xs={6} lg={4} xl={3} order={{ xs: 2, lg: 3 }}>
      <Paper sx={feedbackPaperWrapperStyles}>
        {/* CARD HEADER */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={feedbackHeaderStyles}
          p={1}
        >
          <Typography variant="body2" fontWeight={500}>
            Feedback
          </Typography>

          <Typography variant="caption" className="text-muted">
            {moment(feedback.time).fromNow()}
          </Typography>
        </Stack>

        <Divider />

        {/* FEEDBACK BODY */}
        <Box sx={feedbackBodyWrapperStyles} padding={1}>
          <Box className="d-flex flex-column align-items-start gap-2" mb={2}>
            <Typography
              variant={isSmallScreen ? 'caption' : 'subtitle2'}
              fontWeight={500}
            >
              Rating:
            </Typography>

            <Rating
              size={isSmallScreen ? 'small' : 'medium'}
              readOnly
              value={feedback.rating}
            />
          </Box>

          <Box className="d-flex flex-column align-items-start gap-2" mb={2}>
            <Typography
              variant={isSmallScreen ? 'caption' : 'subtitle2'}
              fontWeight={500}
            >
              What did they like:
            </Typography>

            <Stack direction="row" gap={1} flexWrap="wrap">
              {feedbackChipsData.map((chip, idx, arr) => {
                const isSelected = chip.value === feedback.text;
                const isOthersFilled = isOthers && arr.length - 1 === idx ? 'filled' : 'outlined';

                return (
                  <Chip
                    key={v4()}
                    label={chip.label}
                    variant={!isOthers && isSelected ? 'filled' : isOthersFilled}
                    color="primary"
                    size="small"
                    sx={feedbackChipStyles}
                  />
                );
              })}
            </Stack>
          </Box>

          {isOthers && (
            <Box className="d-flex flex-column align-items-start gap-2" mb={2}>
              <Typography
                variant={isSmallScreen ? 'caption' : 'subtitle2'}
                fontWeight={500}
              >
                Others:
              </Typography>

              <Typography variant={isSmallScreen ? 'caption' : 'body2'}>
                {feedback?.text}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default Feedback;
