const UserModel = {
  createUsersTable() {
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          email VARCHAR(500) UNIQUE NOT NULL,
          first_name VARCHAR(500) NOT NULL,
          last_name VARCHAR(500) NOT NULL,
          password VARCHAR(500) NOT NULL,
          is_admin BOOLEAN DEFAULT false,
          created_on TIMESTAMP,
          modified_on TIMESTAMP
        )`;
    return usersTableQuery;
  },

  dropUsersTable() {
    const dropUsersQuery = 'DROP TABLE IF EXISTS users';
    return dropUsersQuery;
  },
};

export default UserModel;
