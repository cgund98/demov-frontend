import React, {useState} from 'react';

interface IProps {
  items: {label: string; value: string}[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ButtonGroup: React.FC<IProps> = props => {
  const {onChange, items} = props;

  const [checked, setChecked] = useState<Record<string, boolean | undefined>>({});

  return (
    <div className="flex flex-row rounded-md overflow-hidden w-full divide-x divide-solid divide-gray-300">
      {items.map(item => (
        <div key={item.label} className="flex-grow text-center">
          <input
            type="checkbox"
            readOnly
            checked={checked[item.value] === undefined ? false : checked[item.value]}
            className="peer hidden"
          />
          <div
            onClick={() => setChecked({...checked, [item.value]: !checked[item.value]})}
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
