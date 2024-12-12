const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
mongoose.connect("mongodb+srv://alenyeldho_10:alenyeldho@cluster1.uu6wiw3.mongodb.net/Placement");

let Schema = mongoose.Schema;

const studentSchema = new Schema({
  sname: String,
  sregno:String, 
  sbranch: String,
  ssem: String,
  semail: String,
  sphno:String,
  spassword: String,
  appliedPosts:[{
      companyName: String,
      criteria: String,
      role:String,
      date:Date,
      time: String,
      recid:String,
    }],
  profile:{
    firstName:String,
    regno:String,
    email: String,
    gender:String,
    phone:String,
    twelve:String,
    diploma:String,
    graduation: String,
    branch: String,
    dateOfBirth: Date,
    state:String,
    city:String,
    pin:String,
    prijectTopic:String,
    prijectdesc:String,
    extracariculam:String,
    certificate:String,
    certificatedesc:String,
    linkedin:String,
    expectedGraduation:String,
    file:String,
    technicalskill: { type: [String], default: [] },
    softskill: { type: [String], default: [] },
    languageskill: { type: [String], default: [] },
  },
});

// Feedback Schema
const feedbackSchema = new Schema({
  stdid: {
      type: Schema.Types.ObjectId,
      ref: 'student',
  },
  technical: { type: [Number], default: [] },
  communication: { type: [Number], default: [] },
  problem: { type: [Number], default: [] },
  knowledge: { type: [Number], default: [] },
  planning: { type: [Number], default: [] },
});

const recruiterSchema = new Schema({
    cname:String,
    cemail:String,
    cphno:Number,
    cpassword:String,
    posts:[{
      companyName: String,
      criteria: String,
      role:String,
      date:Date,
      time: String,
      recid:String,
    }]
});
const postsSchema=new Schema({
  companyName: String,
      criteria: String,
      role:String,
      date:Date,
      time: String,
      recid:String,
})

const selectedSchema = new Schema({
  stdid: {
      type: Schema.Types.ObjectId,
      ref: 'students'
  },
  recid: {
      type: Schema.Types.ObjectId,
      ref: 'recruiter'
  }
});

const adminSchema = new Schema({
  aname:String,
  apassword:String,
})


//==================================================compare Password=====================================================================


studentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.spassword);
  } catch (error) {
    throw error;
  }
};

recruiterSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.cpassword);
  } catch (error) {
    throw error;
  }
};
//====================================================Hashing=====================================================================================

studentSchema.pre('save', async function (next) {
  if (!this.isModified('spassword')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(this.spassword, salt);

    // Replace the plaintext password with the hashed password
    this.spassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

recruiterSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('cpassword')) {
    return next();
  }

  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(this.cpassword, salt);

    // Replace the plaintext password with the hashed password
    this.cpassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


var studentmodel = mongoose.model("students",studentSchema);
var recruitermodel = mongoose.model("recruiter",recruiterSchema);
var postsmodel = mongoose.model("posts",postsSchema);
const adminModel = mongoose.model('Admin', adminSchema); 
const selectmodel = mongoose.model('selectedstd', selectedSchema);
const feedbackmodel = mongoose.model('feedback', feedbackSchema); 
module.exports = {studentmodel,recruitermodel,adminModel,postsmodel,selectmodel,feedbackmodel};



