import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  //opens a connection to the IndexedDB database called 'jate'
    //openDB returns a Promise (an object representing a future result), and await makes JavaScript wait until that Promise completes.
  const jateDB = await openDB('jate', 1);
  //starts a new 'transaction, specify that want to perform a 'readwrite' transaction on the 'jate' database. 
    //transaction = operation or set of operations done as a single unit of work
    //Data privilage =readrite
  const tx = jateDB.transaction('jate', 'readwrite');
  //Retrieves 'jate' object store from the transaction.
    //object store = where the data is actually stored. Similar to a table in a relational database.
  const store = tx.objectStore('jate');
  //puts content with an (id of 1) into the object store 
    //put operation= asynchronous, returns request
  const request = store.put({ id: 1, value: content });
  //waits for the put operation to finish and then stores the result.
  const result = await request;

  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //opens a connection to the IndexedDB database named 'jate'.
  const jateDB = await openDB('jate', 1);
  //starts a new 'transaction
  const tx = jateDB.transaction('jate', 'readonly');
  //retrieves the 'jate' object store from the transaction.
  const store = tx.objectStore('jate');
  //retrieves all data from object store
    //getAll = asynchronous, returns a request
  const request = store.getAll();
  //confirms success of request:

  //waits for the getAll operation to finish and then assigns the result to result
  const result = await request;
  //prints a message to the console along with the result of the operation
  console.log('result.value', result);
  //returns the value of the result. 
  //If there's no result (which could happen if the getAll operation failed), it will return undefined.
  return result?.value;
};


initdb();
