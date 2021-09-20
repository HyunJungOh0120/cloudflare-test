const dotenv = require('dotenv');
const app = require('./app');

// PORT
dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
