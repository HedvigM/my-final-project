import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
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
  },
  follows: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  knowTunes: [
    {
      type: String
    }
  ],
  learnTunes: [
    {
      type: String
    }
  ]
});

const Member = mongoose.model('Member', MemberSchema);

const port = process.env.PORT || 8080;
const app = express();

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

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

app.get('/', (req, res) => {
  res.send('Hello Music Lovers!');
});

// authenticateUser function is needed...
app.get('/members', async (req, res) => {
  const members = await Member.find({}).limit(20).exec();
  res.status(200).json({ response: members, success: true });
});

/* POPULATE */
/* Gör så att man bara kan följa en användare en gång... */
app.patch('/member/:memberId/following/:followingId', async (req, res) => {
  const { memberId, followingId } = req.params;
  try {
    const queriedMember = await Member.findById(memberId);

    if (queriedMember) {
      const queriedFollow = await Member.findById(followingId);

      if (queriedFollow) {
        const updatedMember = await Member.findByIdAndUpdate(
          memberId,
          {
            $push: {
              follows: queriedFollow
            }
          },
          { new: true }
        );

        res.status(200).json({ response: updatedMember, success: true });
      } else {
        res
          .status(404)
          .json({ response: 'Followed Member not found', success: false });
      }
    } else {
      res.status(404).json({ response: 'Member not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* Gör så att man bara kan lägga till en låt en gång... */
app.patch('/member/:memberId/tune/:tuneId', async (req, res) => {
  const { memberId, tuneId } = req.params;
  try {
    const queriedMember = await Member.findById(memberId);

    if (queriedMember) {
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
          $push: {
            knowTunes: tuneId
          }
        },
        { new: true }
      );

      res.status(200).json({ response: updatedMember, success: true });
    } else {
      res.status(404).json({ response: 'Member not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* Gör så att man bara kan lägga till en låt en gång... */
app.patch('/member/:memberId/tune/learn/:tuneId', async (req, res) => {
  const { memberId, tuneId } = req.params;
  try {
    const queriedMember = await Member.findById(memberId);

    if (queriedMember) {
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
          $push: {
            learnTunes: tuneId
          }
        },
        { new: true }
      );

      res.status(200).json({ response: updatedMember, success: true });
    } else {
      res.status(404).json({ response: 'Member not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post('/signup', async (req, res) => {
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
    res
      .status(400)
      .json({ response: 'Could not create member', success: false });
  }
});

app.post('/signin', async (req, res) => {
  //  const { memberName, password } = req.body;
  const loginMember = req.body;

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
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
