import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/session';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const MemberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const Member = mongoose.model('Member', MemberSchema);

const port = process.env.PORT || 8080;
const app = express();

// add the middleware damien shows...
app.use(cors());
app.use(express.json());

//Check if the connection to the server is ok.
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: 'Service unavailable' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello Music Lovers!');
});

// authenticateUser function is needed...
app.get('/members', (req, res) => {});

app.post('/signup', async (req, res) => {
  console.log('anslutning till /signup');
  const { memberName, password } = req.body;

  // I will need to explain this more to my future self.
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw 'Password must be at least 5 characters long';
    }

    const newMember = await new Member({
      memberName,
      password: bcrypt.hashSync(password, salt)
    }).save();

    res.status(201).json({
      response: {
        memberId: newMember._id,
        memberName: newMember.memberName,
        accessToken: newMember.accessToken
      },
      success: true
    });
  } catch (error) {
    console.log('could not create member, tråkigt');
    console.log(error);
    res
      .status(400)
      .json({ response: 'Could not create member', success: false });
  }
});

app.post('/signin', async (req, res) => {
  console.log('anslutning till /signin');
  //  const { memberName, password } = req.body;

  const loginMember = req.body;
  console.log(loginMember);

  try {
    const databaseMember = await Member.findOne({
      memberName: loginMember.memberName
    });

    if (
      databaseMember &&
      bcrypt.compareSync(loginMember.password, databaseMember.password)
    ) {
      res.status(200).json({
        response: {
          memberId: databaseMember._id,
          memberName: databaseMember.memberName,
          accessToken: databaseMember.accessToken
        },
        success: true
      });
    } else {
      res
        .status(401)
        .json({ response: 'Name and password dont match', success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
