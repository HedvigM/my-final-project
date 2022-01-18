import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/session';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// add the middleware damien shows...
app.use(cors());
app.use(express.json());

const MemberSchema = new mongoose.Schema({
  name: {
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

app.get('/', (req, res) => {
  res.send('Hello Music Lovers!');
});

app.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  // I will need to explain this more to my future self.
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw 'Password must be at least 5 characters long';
    }

    const newMember = await new Member({
      name,
      password: bcrypt.hashSync(password, salt)
    }).save();

    res.status(201).json({
      response: {
        memberId: newMember._id,
        name: newMember.name,
        accessToken: newMember.accessToken
      },
      success: true
    });
  } catch (error) {
    res
      .status(400)
      .json({ response: 'Could not create member', success: false });
  }
});

app.post('/signin', async (req, res) => {
  const { name, password } = req.body;

  try {
    const member = await Member.findOne({ name });

    if (member && bcrypt.compareSync(password, member.password)) {
      res.status(200).json({
        response: {
          memberId: member._id,
          name: member.name,
          accessToken: member.accessToken
        },
        success: true
      });
    } else {
      res
        .status(404)
        .json({ response: 'Name and password dont match', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
