import React, { useState, useEffect } from "react";

const DropSearch = ({ data, identifier, onSelect }) => {
  const [display, setDisplay] = useState("");
  const [dropDownData, setDropDownData] = useState([]);

  const handleClick = (item) => {
    setDisplay(item[identifier]);
    onSelect(item);
  };
  const sortAlphabetically = (objArray) => {
    return objArray.sort((a, b) => a.make.localeCompare(b.make));
  };
  useEffect(() => {
    setDropDownData(sortAlphabetically(data));
  }, [data]);

  return (
    <div className="drop-search">
      <input type="checkbox" id="drop-search" />
      <label htmlFor="drop-search">
        <div className="drop-search__display">
          <div className="drop-search__display__result">{display}</div>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div className="drop-search__dropdown">
          <input type="text" className="drop-search__dropdown__search-box" />
          <ul className="drop-search__dropdown__list">
            {dropDownData.map((item, index) => (
              <li
                key={index}
                className="drop-search__dropdown__item"
                onClick={() => handleClick(item)}
              >
                {item[identifier]}
              </li>
            ))}
          </ul>
        </div>
      </label>
    </div>
  );
};

export default DropSearch;
