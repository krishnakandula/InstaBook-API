# InstaBook-API
InstaBook-API is the service that powers the InstaBook Android application. This service stores and provides books and other meta-data consumed by the app. The API was created with NodeJs, ExpressJs, and MongoDb and is hosted using Heroku. All of the books used were taken from Project Gutenberg.

## Features
This API provides the information for users to quickly see a small sample of a book. Using the routes listed below, you can: 
1. See the author, title, and sample page of a random book
2. Receive information for any number of random books 
3. View the cover image of a book given the id
4. Post your own book information and image
5. Delete the information of an existing book
## Usage
Here's what a sample response looks like calling GET /books/:id
```
{
    "author": "Alexandre Dumas",
    "title": "The Count of Monte Cristo",
    "page": "He was a fine, tall, slim young fellow of eighteen or twenty, with black\neyes, and hair as dark as a raven’s wing; and his whole appearance\nbespoke that calmness and resolution peculiar to men accustomed from\ntheir cradle to contend with danger.
}
```

### Routes

##### GET /books
Returns a JSON array containing the information for 10 random books. 

###### Optional parameters
* count (default = 10) - the number of books to return

##### GET /books/:id
Returns a JSON object containing the information for a single book.

###### Response fields
* author - The author of the book
* title - The title of the book
* page - A sample of text taken from the book

##### GET /books/cover/:id
Returns a bitmap image of the book's cover.

##### POST /books
Create a new book object with the necessary information. The body of this call contains these 4 key/value pairs as form-data:
1. file - (optional) The cover image of the book
2. author - The author of the book
3. title - The title of the book
4. page - A small sample of the book's text

##### DELETE /books/:id
Delete an existing book with the book's id.