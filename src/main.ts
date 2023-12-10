import express from 'express'
import routes from './routes';
import { AppDataSource } from './infrastructure/database/typeorm/sqlite/data-source';
import { AppDataSourceTest } from './infrastructure/database/typeorm/sqlite/data-source-test';

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json())
    app.use(routes)
    return app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })