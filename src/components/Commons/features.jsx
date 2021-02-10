import React, { useState, useEffect } from "react";

const Features = ({ data, onSelect, value }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setFeatures(data);

  }, [data, value]);

  return (
    <ul className="features__list">
      {features.length &&
        features.map((feature) => (
          <li className="features__list__item">
            <input
              type="checkbox"
              id={feature.feature}
              value={feature.feature}
              onChange={() => onSelect(feature.feature)}
              checked={value && value.includes(feature.feature)}
            />
            <label htmlFor={feature.feature}>{feature.feature} </label>
          </li>
        ))}
    </ul>
  );
};

export default Features;
