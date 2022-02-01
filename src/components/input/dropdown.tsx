import React, {useState, useRef, useEffect} from 'react';

import ChevronDown from '../icons/chevronDown';
import useOutsideClick from '../../utils/hooks/useOutsideClick';

interface IProps {
  options: {label: string; value: string}[];
  label: string;
  disabled?: boolean;
  onClick?: (name: string) => void;
}

const Dropdown: React.FC<IProps> = props => {
  const {options, onClick, label, disabled} = props;

  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => setOpen(false), [disabled]);

  // Hide dropdown on outside click
  useOutsideClick(ref, () => (open ? setOpen(false) : null));

  return (
    <div className="relative">
      {/* Button */}
      <button
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="font-medium bg-indigo-50 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-400 
          rounded-md text-sm px-4 py-2.5 text-center inline-flex items-center w-full relative disabled:opacity-50"
        type="button"
      >
        {label} <ChevronDown className="ml-2 w-4 h-4 right-4 absolute" />
      </button>

      {/* Dropdown Items */}
      {open ? (
        <div
          className="z-10 inset-x-0 text-base list-none bg-indigo-50 rounded divide-y divide-gray-100 
            shadow-xl absolute my-2 max-h-32 overflow-y-scroll"
          ref={ref}
        >
          <ul className="py-1">
            {options.map(option => (
              <li
                key={option.value}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-200 cursor-pointer"
                onClick={() => (onClick ? onClick(option.value) : null)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
