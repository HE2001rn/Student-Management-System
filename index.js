import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import Contact_us from './Contact_us.js';
import User_profile from './User_profile.js';
import user_register from './user_register.js';
import user_signin from './user_signin.js';
import Student_profile from './Student_profile.js';
import course_add from './course_add.js';
import course_edit from './course_edit.js';
import courseListRouter from './course_list.js';

import cors from 'cors'

const app = express();
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET" , "POST","DELETE","PUT"],
      credentials: true,
    })
  );

  app.use(bodyParser.json());
  app.use(session({
    secret: 'ff3db567ab2af7a8fd1743e633c39a3ebaf3eb95f40b4ad8283defce803e3a000a146778b88553d2cf8db66582e6ff787519e55cd8af1b95305d2ed8e80bf692', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use('/api', Contact_us);  
app.use('/api', User_profile);
app.use('/api', user_register);
app.use('/api', user_signin);
app.use('/api', Student_profile);
app.use('/api', course_add);
app.use('/api', course_edit);
app.use('/api', courseListRouter);


app.listen(3000, () => {
    console.log('Serve at http://localhost:3000')
})
