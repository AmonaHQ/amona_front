import React, { useState, useEffect, useRef } from "react";

const DropSearch = ({
  data,
  identifier,
  onSelect,
  inputId,
  showItems,
  placeholder,
  disable,
  name,
  async,
  onChange,
  inputType,
  value,
}) => {
  const [display, setDisplay] = useState(value ? value : {});
  const [dropDownData, setDropDownData] = useState([]);
  const [delay] = useState(1000);
  const [rawData, setRawData] = useState([]);
  const inputRef = useRef();

  const convertResult = {
    integer: (input) => {
      return parseInt(input, 10);
    },
  };

  const handleClick = (item) => {
    setDisplay(item);
    onSelect(item, identifier, name, inputType && convertResult[inputType]);
  };
  // const sortAlphabetically = (objArray) => {
  //   return objArray.sort((a, b) => a[identifier].localeCompare(b[identifier]));
  // };

  const refineData = (rawData) => {
    const data = [];
    for (let index = 0; index < rawData.length; index += 1) {
      const item = rawData[index];
      const foundItem = data.filter((found) => found.Make_ID === item.Make_ID);

      if (!foundItem.length) {
        data.push(rawData[index]);
      }
    }
    return data;
  };
  const search = (keyword, data = rawData) => {
    const result = [];
    for (let index = 0; index < data.length; index += 1) {
      const name = data[index][identifier].toLowerCase();
      if (name.includes(keyword.toLowerCase())) {
        result.push(data[index]);
      }
    }
    if (result.length) {
      return result;
    }
  };

  const getResult = async (keyword) => {
    if (async) {
      const data = await onChange(keyword);
      if (data && data.length) {
        setDropDownData(search(keyword, refineData(data)));
      }
    } else {
      setTimeout(() => {
        setDropDownData(search(keyword));
      }, delay);
    }
  };

  useEffect(() => {
    setRawData(data);
    if (showItems) {
      setDropDownData(data);
    }
  }, [data, showItems]);

  useEffect(() => {}, [showItems]);

  return (
    <div className="drop-search">
      <input type={!disable ? "checkbox" : "text"} id={inputId} />
      <label htmlFor={inputId}>
        <div
          className={`drop-search__display ${disable && "disable-element"}`}
          onClick={!disable ? () => inputRef.current.focus() : () => {}}
        >
          <div className="drop-search__display__result">
            <span className="drop-search__dropdown__item drop-search__dropdown__item--category">
              {display.thumbnail && (
                <img src={display.thumbnail} alt={display[identifier]}></img>
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
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item[identifier]}></img>
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
