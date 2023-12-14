const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema')



const SECRET_KEY = 'secretkey'


const app = express()

//db
const dbURI = 'mongodb+srv://itsfaadi786:elVHisg5RcrE874L@cluster0.wopgjpc.mongodb.net/?retryWrites=true&w=majority'
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    
    app.listen(3001, () => {
        console.log('server is connected to port 3001 and connected to mongoDB')
    })
})

.catch((error) => {
    console.log('Unable to connect to server and MongoDB')
})


//cors
app.use(bodyparser.json())
app.use(cors());



app.post('/register', async (req, res) => {
    try {
      const { email, username, password, location } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, username, password: hashedPassword, locations: [location] });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Error signing up' });
    }
  });

  app.get('/register', async (req, res) => {
    
    try {
        const users = await User.find()
        res.status(201).json(users)
        
    } catch (error) {
        res.status(500).json({ error: 'Unable to get User'})
    }

})



app.post('/updateLocation', async (req, res) => {
    try {
      const { location } = req.body;
      
      const newUser = new User({ locations: [ location ] });
      res.status(201).json({ message: 'Location Saved' });
    } catch (error) {
      res.status(500).json({ error: 'Location not saved' });
    }
  });





// app.post('/updateLocation', async (req, res) => {
//   console.log('ma a gya');
//   try {
//     const { userId, newLocation } = req.body;

//     if (!userId || !newLocation) {
      
//       return res.status(400).json({ error: 'Invalid request payload' });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update the user's location
//     user.locations.push(newLocation);
//     await user.save();

//     res.status(200).json({ message: 'Location updated successfully' });
//   } catch (error) {
//     console.error('Error updating location:', error);
//     res.status(500).json({ error: 'Error updating location' });
//   }
// });
  

// app.post('/updateLocation', async (req, res) => {
//   console.log('a ja');
  // try {
  //   const { location } = req.body;

  //   // For simplicity, let's assume a default username or a specific logic for managing users without usernames
  //   const defaultUsername = 'defaultUser';

  //   // Find the user by username or create a new user with the default username
  //   const user = await User.findOneAndUpdate(
  //     { username: defaultUsername },
  //     { $push: { locations: location } },
  //     { new: true, upsert: true }
  //   );

  //   res.status(200).json({ message: 'Location added successfully', user });
  // } catch (error) {
  //   res.status(500).json({ error: 'Error updating location' });
  // }
// });



app.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        const token = jwt.sign({userId: user._id}, SECRET_KEY, { expiresIn: '1hr'})
        res.json({ message: 'Login Succesful'})

    } catch (error) {
        res.status(500).json({ error: 'Error Logging In'})
    }

})






