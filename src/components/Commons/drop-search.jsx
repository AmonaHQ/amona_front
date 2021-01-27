import React, { useState, useEffect, useRef } from "react";

const DropSearch = ({
  data,
  identifier,
  onSelect,
  inputId,
  showItems,
  placeholder,
  disable,
}) => {
  const [display, setDisplay] = useState("");
  const [dropDownData, setDropDownData] = useState([]);
  const [delay] = useState(1000);
  const [rawData, setRawData] = useState([]);
  const inputRef = useRef();
  const [show, setShowItems] = useState(false);

  const handleClick = (item) => {
    setDisplay(item);
    onSelect(item);
  };
  const sortAlphabetically = (objArray) => {
    return objArray.sort((a, b) => a[identifier].localeCompare(b[identifier]));
  };

  const search = (keyword) => {
    console.log("rawww", data);
    const result = [];
    for (let index = 0; index < rawData.length; index += 1) {
      const name = rawData[index][identifier].toLowerCase();
      if (name.includes(keyword.toLowerCase())) {
        result.push(rawData[index]);
      }
    }
    if (result.length) {
      return result;
    }
  };

  const getResult = async (keyword) => {
    setTimeout(() => {
      setDropDownData(search(keyword));
    }, delay);
  };

  useEffect(() => {
    setRawData(data);
    if (showItems) {
      setDropDownData(search("c"));
    }
  }, [data]);

  useEffect(() => {
    setDropDownData(data);
  }, [showItems]);

  return (
    <div className="drop-search">
      <input type={!disable? "checkbox":"text"} id={inputId} />
      <label htmlFor={inputId}>
        <div
          className={`drop-search__display ${disable && "disable-element"}`}
          onClick={!disable ? () => inputRef.current.focus() : () => {}}
        >
          <div className="drop-search__display__result">
            <span className="drop-search__dropdown__item drop-search__dropdown__item--category">
              {display.icon && (
                <img src={display.icon} alt={display[identifier]}></img>
              )}
              <span>
                {display[identifier] || (
                  <span className="placeholder">{placeholder}</span>
                )}{" "}
              </span>
            </span>
          </div>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div className="drop-search__dropdown">
          <input
            type="text"
            className="drop-search__dropdown__search-box"
            onKeyUp={(event) => getResult(event.target.value)}
            placeholder="start typing..."
            id={inputId}
            ref={inputRef}
            autoFocus
          />
          <ul className="drop-search__dropdown__list">
            {dropDownData &&
              dropDownData.map((item, index) => (
                <li
                  key={index}
                  className="drop-search__dropdown__item"
                  onClick={() => handleClick(item)}
                >
                  {item.icon && (
                    <img src={item.icon} alt={item[identifier]}></img>
                  )}
                  <span>{item[identifier]}</span>
                </li>
              ))}
          </ul>
        </div>
      </label>
    </div>
  );
};

export default DropSearch;
