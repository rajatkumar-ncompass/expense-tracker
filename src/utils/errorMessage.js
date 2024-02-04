const errorMessageFunction = (statusValue, dataValue) => {
  return {
    status: statusValue,
    data: dataValue,
  };
};

module.exports = { errorMessageFunction };
