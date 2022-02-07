import React from 'react';

interface IProps {
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const TextInput: React.FC<IProps> = props => {
  // Read props
  const {placeholder, onChange, value} = props;

  // Render
  return (
    <input
      type="text"
      className="font-medium bg-indigo-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none
        rounded-md text-sm px-4 py-2.5 inline-flex items-center w-full relative disabled:opacity-50
        appearance-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
