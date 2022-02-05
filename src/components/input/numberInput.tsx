import React from 'react';

interface IProps {
  placeholder: string;
  onChange?: (v: number) => void;
  value?: number;
}

const NumberInput: React.FC<IProps> = props => {
  // Read props
  const {placeholder, onChange, value} = props;

  // Wrap event handler and only emit changes if value is valid number
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newValue = parseInt(event.target.value, 10);

    // Emit changes if not NaN
    if (!Number.isNaN(newValue) && onChange) onChange(newValue);
  };

  // Render
  return (
    <input
      type="number"
      className="font-medium bg-indigo-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none
        rounded-md text-sm px-4 py-2.5 inline-flex items-center w-full relative disabled:opacity-50
        appearance-none"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
