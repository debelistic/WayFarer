require('@babel/polyfill');

const UserModel = {
  async createUsersTable() {
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          email VARCHAR(500) UNIQUE NOT NULL,
          firstName VARCHAR(500) NOT NULL,
          lastName VARCHAR(500) NOT NULL,
          password VARCHAR(500) NOT NULL,
          is_admin BOOLEAN,
          createdOn TIMESTAMP,
          modifiedOn TIMESTAMP
        )`;
    return usersTableQuery;
  },

  async dropUsersTable() {
    const dropUsersQuery = 'DROP TABLE IF EXISTS users';
    return dropUsersQuery;
  },
};

export default UserModel;
