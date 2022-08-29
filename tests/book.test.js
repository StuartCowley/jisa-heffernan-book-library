const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models/index");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "The Hobbit",
          ISBN: "9780007525508",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("The Hobbit");
        expect(newBookRecord.title).to.equal("The Hobbit");
        expect(newBookRecord.ISBN).to.equal("9780007525508");
      });

      it("throws an error if empty title is given", async () => {
        const response = await request(app).post("/books").send({
          title: "",
        });

        expect(response.status).to.equal(500);
      });

      it("throws an error if empty author is given", async () => {
        const response = await request(app).post("/books").send({
          author: "",
        });

        expect(response.status).to.equal(500);
      });
    });
  });

  describe("with records in the database", () => {
    let books;
    const error404Message = "The book could not be found.";

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "The Hobbit",
          ISBN: "9780007525508",
        }),
        Book.create({
          title: "1984",
          ISBN: "9780140817744",
        }),
        Book.create({
          title: "20,000 Leagues Under the Sea",
          ISBN: "9780195854695",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/books");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /books/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books title by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ title: "The Hobbit: An Unexpected Journey" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.title).to.equal(
          "The Hobbit: An Unexpected Journey"
        );
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/books/12345")
          .send({ title: "The Hobbit: An Unexpected Journey" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/books/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
