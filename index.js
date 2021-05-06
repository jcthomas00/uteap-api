import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 80;

app.use(bodyParser.json());
app.use('/users',usersRoutes);
app.get('/', (request,response)=>{
    console.log(`[test]`);
    response.send("Hola Cola!");

})
app.listen(PORT, () => {console.log(`Server running on Port that is: ${PORT}`)});