import React from 'react';

interface IProps {
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const BigInput: React.FC<IProps> = props => {
  // Read props
  const {placeholder, onChange} = props;

  // Render
  return (
    <input
      type="text"
      className="border-b-2 border-b-indigo-200 bg-transparent text-center caret-white appearance-none 
              accent-transparent focus:outline-none text-3xl text-white uppercase p-2 ease-in-out
              focus:border-b-white
              placeholder:normal-case placeholder:text-purple-200 placeholder:opacity-75"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default BigInput;
