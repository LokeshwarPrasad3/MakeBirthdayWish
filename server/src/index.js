import { app } from './app.js';
import connectToDB from './config/db.js';

connectToDB()
  .then(() => {
    app.on('error', (err) => {
      console.log('Error on Express App : ', err);
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('Failed to connect to database', err);
    throw err;
  });
