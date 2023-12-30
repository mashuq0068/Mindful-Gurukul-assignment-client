
import Select from 'react-select';

const stateOptions = [
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Karnataka', label: 'Karnataka' },
];

const StateSelect = ({ selectedState, onSelectState }) => {
  const defaultOption = stateOptions.find(option => option.value === 'Gujarat'); // Set your desired default value

  return (
    <Select
      options={stateOptions}
      value={selectedState || defaultOption}
      onChange={onSelectState}
      placeholder="Select State"
    />
  );
};

export default StateSelect;
