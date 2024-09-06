import Select from 'react-select';

function DropDown({ selectedOption, handleChange, options, label, className }) {
  label = label || '';

  return (
    <div className={` shadow-lg flex flex-col gap-1 ${className?.container}`}>
      <label className='text-black font-semibold'>{label}</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
}

export default DropDown;
