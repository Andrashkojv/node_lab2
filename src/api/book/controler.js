import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017';
const dbName = 'bookDB';
const client = new MongoClient(url);



const bookControler = {
    get:function(request, response){
        client.connect(function(errror, result){
            const books = result.db(dbName).collection('books');
            response.send(books.find({}).toArray(function(errror, result){
                result.close();                
            }));
        });
    }
}

export default bookControler;