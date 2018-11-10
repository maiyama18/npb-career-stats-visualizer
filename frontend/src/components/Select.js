import React from 'react';
import SelectForm from './SelectForm';
import SelectCandidates from './SelectCandidates';
import SelectedList from './SelectedList';

const Select = () => {
  return (
    <div style={{background: 'green'}}>
      <SelectForm />
      <SelectCandidates />
      <SelectedList />
    </div>
  );
};

export default Select;