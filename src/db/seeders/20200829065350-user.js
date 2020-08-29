'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    "users",
    [
      {
        full_name: "panca",
        username: "panca",
        email: "rectapanca@gmail.com",
        phone_number: "082178633849",
        salt: "",
        password: "panca",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "agung",
        username: "agung",
        email: "agungsaputro484@gmail.com",
        phone_number: "082178633849",
        salt: "",
        password: "agung",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
