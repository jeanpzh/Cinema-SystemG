// components/SearchBar.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";
interface SearchBarProps {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="w-full outline-none "
      />
    </div>
  );
};

export default SearchBar;
