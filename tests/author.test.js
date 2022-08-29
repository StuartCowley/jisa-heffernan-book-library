const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models/index");
const app = require("../src/app");

describe("/authors", () => {
   
  before(async () => Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          author: "J R R Tolkien",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal("J R R Tolkien");
        expect(newAuthorRecord.author).to.equal("J R R Tolkien");
      });

      it("throws an error if empty author is given", async () => {
        const response = await request(app).post("/authors").send({
          author: "",
        });

        expect(response.status).to.equal(500);
      });
    });
  });

  describe("with records in the database", () => {
    let authors;
    const error404Message = "The author could not be found."

    beforeEach(async () => {
      authors = await Promise.all([
        Author.create({
            author: "J R R Tolkien",
        }),
        Author.create({
            author: "George Orwell",
        }),
        Author.create({
            author: "Jules Verne",
        }),
      ]);
    });

    describe("GET /authors", () => {
      it("gets all authors records", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);

          expect(author.author).to.equal(expected.author);
        });
      });
    });

    describe("GET /authors/:id", () => {
      it("gets authors record by id", async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal(author.author);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).get("/authors/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("PATCH /authors/:id", () => {
      it("updates authors author by id", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: "J. R. R. Tolkien" });
        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal("J. R. R. Tolkien");
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app)
          .patch("/authors/12345")
          .send({ author: "J. R. R. Tolkien" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("DELETE /authors/:id", () => {
      it("deletes author record by id", async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).delete("/authors/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
