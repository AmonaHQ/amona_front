import React, { useState, useEffect } from "react";

const Features = ({ data, onSelect }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setFeatures(data);
  }, [data]);

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
            />
            <label htmlFor={feature.feature}>{feature.feature}</label>
          </li>
        ))}
    </ul>
  );
};

export default Features;
