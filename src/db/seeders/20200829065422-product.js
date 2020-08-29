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
    "products",
    [
      {
        name: "product a",
        stock:20,
        price:10000,
        idUser:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: "product b",
        stock:20,
        price:20000,
        idUser:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: "product c",
        stock:20,
        price:20000,
        idUser:2,
        createdAt:new Date(),
        updatedAt:new Date()
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
    await queryInterface.bulkDelete('products', null, {});
  }
};
