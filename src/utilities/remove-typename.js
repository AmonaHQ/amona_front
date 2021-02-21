const removeTypeName = (data, item) => {
  const refinedData = {};
  for (const field in data) {
    if (field !== item) {
      refinedData[field] = data[field];
    }
  }
  return refinedData;
};

export default removeTypeName