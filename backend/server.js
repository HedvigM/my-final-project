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
      type: Number
    }
  ],
  learnTunes: [
    {
      type: Number
    }
  ]
});
/* Update with town and a description (like a profile text). */

const RelationsSchema = new mongoose.Schema({
  following: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Member'
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Member'
  }
});

const Member = mongoose.model('Member', MemberSchema);
const Relations = mongoose.model('Relations', RelationsSchema);

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

// searching for a single member for the "TunesIncommon" Page.
app.get('/member/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const memberById = await Member.findById(id).exec();
    if (memberById) {
      res.status(200).json({ response: memberById, success: true });
    } else {
      res.status(404).json({ response: error, success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* POPULATE */
/* Gör så att man bara kan följa en användare en gång... */
app.post('/following/:following/followed/:followed', async (req, res) => {
  const { following, followed } = req.params;

  try {
    const newRelation = await new Relations({ following, followed }).save();
    res.status(201).json({ response: newRelation, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get('/relations', async (req, res) => {
  const relations = await Relations.find({})
    .populate('following', 'memberName')
    .populate('followed', 'memberName')
    .limit(20)
    .exec();
  res.status(200).json({ response: relations, success: true });
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
        accessToken: newMember.accessToken,
        knowTunes: newMember.knowTunes,
        learnTunes: newMember.learnTunes
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
          accessToken: databaseMember.accessToken,
          knowTunes: databaseMember.knowTunes,
          learnTunes: databaseMember.learnTunes
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
