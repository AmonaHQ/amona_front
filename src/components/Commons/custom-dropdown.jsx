import React, { useState } from "react";

const CustomDropdown = ({ items, placeHolder, onSelect }) => {
  const [selected, setSelected] = useState(placeHolder && placeHolder);

  const handleSelect = (item) => {
    setSelected(item.name);
    onSelect(item);
  };

  return (
    <div className="custom-dropdown">
      <input type="checkbox" id="custom-dropdown" />
      <label htmlFor="custom-dropdown">
        <div className="custom-dropdown__display">
          <span>{selected}</span>
          <i className="fa fa-chevron-down"></i>
        </div>
        <ul className="custom-dropdown__list">
          {items &&
            items.length &&
            items.map((item, index) => (
              <li
                key={index}
                className="custom-dropdown__item"
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </label>
    </div>
  );
};

export default CustomDropdown;
