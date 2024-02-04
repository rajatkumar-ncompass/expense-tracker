const insertQuery = () => {
  return `
  INSERT INTO users (username,email,password) VALUES (?)`;
};
const checkUserquery = () => {
  const query = `SELECT EXISTS (
    SELECT 
      1 
    FROM 
      users 
    WHERE 
      id = ? 
  ) AS CHECK_USER`;

  return query;
};

const fetchEncryptedPaswordQuery = () => {
  const query = `
    SELECT 
      password
    FROM 
      users 
    WHERE 
      id = ? 
  `;

  return query;
};

const insertExpenseQuery = () => {
  return `
  INSERT INTO expenses( 
    user_id,  
    category_id,  
    amount,
    amount_due, 
    description, 
    details,
    date)
  VALUES (?);
  `;
};

const updateExpenseQuery = () => {
  return `
  UPDATE 
    expenses 
  SET 
    date = ?,
    amount_due = ?
  WHERE 
    id = ?;
  `;
};

const checkAuthorQuery = () => {
  const query = `
    SELECT 
      user_id as userId 
    FROM 
      expenses 
    WHERE 
      id = ?;
  `;

  return query;
};

const fetchAmountQuery = () => {
  const query = `
  SELECT 
    amount_due as amountDue
  FROM 
      expenses 
  WHERE 
      id = ?;
  `;
  return query;
};

const fetchUserExpensesByCategoryQuery = () => {
  return `
  SELECT 
    e.category_id as categoryId,
    c.name as categoryName,
    e.amount as amount,
    e.description as eventDescription,
    e.details as eventDetails,
    e.date as createdDate
  FROM
      expenses e
          JOIN
      categories c ON e.category_id = c.id
  WHERE
      e.user_id = ?;
  `;
};

const countUserExpensesQuery = () => {
  return `
  SELECT 
    COUNT(user_id) AS totalExpense
  FROM
      expenses
  GROUP BY user_id
  HAVING user_id = ?;
  `;
};

module.exports = {
  insertQuery,
  checkUserquery,
  fetchEncryptedPaswordQuery,
  insertExpenseQuery,
  updateExpenseQuery,
  checkAuthorQuery,
  fetchAmountQuery,
  fetchUserExpensesByCategoryQuery,
  countUserExpensesQuery,
};
