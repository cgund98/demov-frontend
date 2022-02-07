import React from 'react';

interface IProps {
  items: {label: string; value: string; checked: boolean}[];
  onChange?: (value: string) => void;
}

const ButtonGroup: React.FC<IProps> = props => {
  const {items, onChange} = props;

  return (
    <div className="flex flex-row rounded-md overflow-hidden w-full divide-x divide-solid divide-gray-300">
      {items.map(item => (
        <div key={item.label} className="flex-grow text-center">
          <input type="checkbox" readOnly checked={item.checked} className="peer hidden" />
          <div
            onClick={() => (onChange ? onChange(item.value) : null)}
            className="w-full px-3 py-2 bg-indigo-50 peer-checked:bg-indigo-500 peer-checked:text-white ease-in-out duration-75"
          >
            <p className="text-sm font-medium select-none ease-in-out duration-75">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
