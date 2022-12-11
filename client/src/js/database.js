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

// logic to PUT to the DB
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ jate: content});

  const result = await request;
  console.log('Data saved to DB', result);
};

// logic to GET from the DB
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
};


initdb();
