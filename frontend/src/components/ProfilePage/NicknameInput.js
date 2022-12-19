import { TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../styles/StyledProfile';

const NicknameInput = ({
  updateActive,
  nickname,
  formName,
  setFormName,
  formData,
  setFormData,
}) => {
  return (
    <>
      <StyledSpan updateActive={updateActive}>Nickname</StyledSpan>
      {!updateActive ? (
        <h2>{nickname ? nickname : 'Add Nickname'}</h2>
      ) : (
        <StyledNickname>
          <TextField
            label='Nickname'
            variant='outlined'
            type='text'
            name='nickname'
            value={formName}
            onChange={(e) => {
              setFormName((prev) => {
                return e.target.value;
              });
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
        </StyledNickname>
      )}
    </>
  );
};
const StyledNickname = styled.div`
  margin-bottom: 8px;
  div {
    width: 100%;
  }
`;
export default NicknameInput;
