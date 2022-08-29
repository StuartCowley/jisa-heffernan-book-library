const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models/index");
const app = require("../src/app");

describe("/genres", () => {
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /genres", () => {
      it("creates a new genre in the database", async () => {
        const response = await request(app).post("/genres").send({
          genre: "Science Fiction",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal("Science Fiction");
        expect(newGenreRecord.genre).to.equal("Science Fiction");
      });

      it("throws an error if empty genre is given", async () => {
        const response = await request(app).post("/genres").send({
          genre: "",
        });

        expect(response.status).to.equal(500);
      });
    });
  });

  describe("with records in the database", () => {
    let genres;
    const error404Message = "The genre could not be found.";

    beforeEach(async () => {
      genres = await Promise.all([
        Genre.create({
          genre: "Science Fiction",
        }),
        Genre.create({
          genre: "Horror",
        }),
        Genre.create({
          genre: "Fantasy",
        }),
      ]);
    });

    describe("GET /genres", () => {
      it("gets all genres records", async () => {
        const response = await request(app).get("/genres");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((a) => a.id === genre.id);

          expect(genre.genre).to.equal(expected.genre);
        });
      });
    });

    describe("GET /genres/:id", () => {
      it("gets genres record by id", async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genres/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app).get("/genres/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("PATCH /genres/:id", () => {
      it("updates genres author by id", async () => {
        const genre = genres[0];
        const response = await request(app)
          .patch(`/genres/${genre.id}`)
          .send({ genre: "Sci Fi" });
        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedGenreRecord.genre).to.equal("Sci Fi");
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app)
          .patch("/genres/12345")
          .send({ genre: "Sci Fi" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe("DELETE /genres/:id", () => {
      it("deletes genre record by id", async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genres/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app).delete("/genres/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
