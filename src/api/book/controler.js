import { MongoClient, ObjectID } from 'mongodb'

//параметри бази
const url = 'mongodb://localhost:27017';
const dbName = 'bookDB';

const bookControler = {
    //отримати всі
    get: function (request, response) {
        const client = new MongoClient(url);
        //нове підключення до бази      
        client.connect(function (error, result) {
            //перевірка помилки БД
            if (error)
                response.status(500).send(error);
            //коллеція книг
            const books = result.db(dbName).collection('books');
            //шукаємо всі книги і результат подаємо як масив
            books.find().toArray(function (error, result) {
                if (error)
                    response.status(500).send(error);
                else
                    response.send(result);
                //закриваємо підключення до БД
                client.close();
            });
        });
    }, //get
    //отримати одну з вказаним ІД
    get_id: function (request, response) {
        let id = request.params.id;
        if (id) {
            const client = new MongoClient(url);
            client.connect(function (error, result) {
                if (error)
                    response.status(500).send(error);
                const books = result.db(dbName).collection('books');
                //знайти по ід
                books.findOne({ _id: ObjectID(id) }, function (error, result) {
                    if (error)
                        response.status(500).send(errror);
                    else
                        response.send(result);
                    client.close();
                });

            });
        }
    }, //getById
    //додати нову
    post: function (request, response) {
        let newBook = request.body.book;
        //перевірити чи правильно передана книга 
        if (isValid(newBook)) {
            const client = new MongoClient(url);
            client.connect(function (error, result) {
                if (error)
                    response.status(500).send(error);
                const books = result.db(dbName).collection('books');
                //додати
                books.insertOne(newBook, function (error, result) {
                    if (error)
                        response.status(500).send(error);
                    else
                        response.send(newBook);
                    client.close();
                });
            });
        }
        else {
            //якщо книга передана невірно то передати помилку запиту 
            response.status(400).send("необхідно передати книгу в тілі запиту");
        }
    },//post
    //вилучити із вказаним ІД
    delete_id: function (request, response) {
        let id = request.params.id;
        if (id) {
            const client = new MongoClient(url);
            client.connect(function (error, result) {
                if (error)
                    response.status(500).send(error);
                const books = result.db(dbName).collection('books');
                //знайти і вилучити 
                books.findOneAndDelete({ _id: ObjectID(id) }, function (errror, result) {
                    if (error)
                        response.status(500).send(error);
                    //якщо знайшло
                    if (result.value)
                        response.status(200).send("Вилучено");
                    else
                        //якщо не знайшло
                        response.status(404).send("Не знайдено");
                    client.close();
                });
            });
        }
        else {
            //не передано ID
            response.sеatus(400).send("Вкажіть ідентифікатор");
        }

    },//deleteById

}
//валідатор чи є в книги назва  і автор
function isValid(book) {
    return book && book.title && book.author;
}

export default bookControler;