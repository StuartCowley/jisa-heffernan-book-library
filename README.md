# Backend Book Library.
___
## Description.
This was a backend project which involved using SQL2, Sequelize and express.js, which was tested using Mocha/Chai and Supertest, the tests can be found in the tests folder.

A book library is created using CRUD operations for Reader, Book, Author and Genre models. The relationship between the models can be seen in the ERD screenshot below.

![ERD - Entity Relationship Diagram](/images/Screenshot_ERD.png?raw=true "ERD - Entity Relationship Diagram.")
___

## Download and setup.
This project has the following dependencies: JavaScript, Express, SQL2 and Sequelize and additional dev dependencies Mocha, Chai, Supertest, Dotenv, Nodemon.  You will need to have MySQL running in a [docker](https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=search_emea_brand&utm_term=docker_exact&gclid=CjwKCAjw6raYBhB7EiwABge5Kn0-PeLbzCirw11gOzKbacmNwycp6EqOZcpI3DOh0FQRob7OTECjpxoCmt0QAvD_BwE) container on your machine. To use the database you can use [Postman](https://www.postman.com/).  To download the project:
* Fork the repository.
* Clone down your fork using ```git clone```.
* Change directory into your cloned folder and run ``` npm install ```.
* Run ``` npm i -S express mysql2 sequelize```.
* Run ``` npm i -D dotenv nodemon mocha chai supertest```. if you want to make changes to the code and run the tests.
* To start the app run ```npm start```.

## Using the book library
To start you will need to create some genres, authors, readers and books. Using Postman send a POST request to the route ```localhost:3000/genres``` with the following JSON body to create a genre.
```
{
    "genre": "<genre type, must be unique>"
} 
```
Send a POST request to ```localhost:3000/authors``` with the following JSON body to create an author.
```
{
    "author": "<author name, must be unique>"
}
```
Send a POST request to ```localhost:3000/readers``` with the following JSON body to create an reader.
```
{
    "name": "<user name>",
    "email": "<email address, must be a valid email address>",
    "password": "<password, must be longer than 8 characters>" 
}
```
Send a POST requst to ```localhost:3000/books``` with the following JSON body to create a book.
```
{
    "title": "<book title>",
    "ISBN": "<Book's ISBN, must be unique>",
    "GenreId": "<genre id, must be an id that exists in genre model>",
    "AuthorId": "<author id, must be an id that exists in author model>"
}
```
There are 4 more routes that can be used for each model, in the route where you see ```model``` replace it with one of ```genres```, ```authors```, ```readers```, or ```books```:
| Request | Route | Description |
| ------ | ------ | ------ |
|GET|```localhost:3000/model```| Displays all entries in the model.| 
|GET|```localhost:3000/model/<id>```|Displays the entry that matches the given id.|
|PATCH|```localhost:3000/model/<id>```|Updates the entry with the given id and the data sent in the JSON body. Can update the whole entry or just parts of it.|
|DELETE|```localhost:3000/model/<id>```|Deletes the entry from the model, with the given id.|

The models Readers and Books have the additional functionality of being able to search using query strings. To search for a book by it's title send a GET request to ```localhost:3000/books/?title=<book title>```.
You can search for a reader by name, email address or both. To search by just one use a similar approach to books. To search using both send a GET request to ```localhost:3000/readers/?name=<user name>&email=<email address>```
___
## Author.
Lisa Heffernan

* Twitter [@Iisaheffernan](https://twitter.com/Iisaheffernan)
* GitHub [@LCHeffernan](https://github.com/LCHeffernan)
* LinkedIn [Lisa Heffernan](https://www.linkedin.com/in/lisa-heffernan-54b61312a)