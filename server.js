const express = require("express");
const { studentmodel, recruitermodel,adminModel,postsmodel,selectmodel,feedbackmodel } = require("./model");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/studentsignup', async (req, res) => {
  const { sname, semail, sregno, sbranch, ssem, sphno, spassword } = req.body;

  if (!sname || !semail || !sregno || !sbranch || !ssem || !sphno || !spassword) {
    return res.status(400).send("Please fill in all fields.");
  }

  try {
    const existingUser = await studentmodel.findOne({ semail, sregno });

    if (existingUser) {
      return res.status(409).send("Email address or registration number already registered.");
    }
    const result = new studentmodel(req.body);
    await result.save();

    return res.send("Data added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});



app.post('/studentlogin', async (req, res) => {
  const { semail, spassword ,sregno} = req.body;
  if (!semail || !sregno || !spassword) {
    res.send('Please fill in all fields.');
    return;
  }
  try {
      const user = await studentmodel.findOne({semail,sregno});
      if (!user) {
        res.send(' email or register no. not found.');
        return;
      }
      
      const isPasswordValid = await user.comparePassword(spassword);
      if (!isPasswordValid) {
        res.send('Invalid password.');
        return;
      }
      console.log(user._id)
      res.send({msg:'Login successful!',data:user._id});
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error.');
    }
 
});

app.post('/studentprofile/:id', async (req, res) => {
  const studentId = req.params.id; // Extract student ID from the URL
  const {
    firstName,
    regno,
    email,
    gender,
    phone,
    twelve,
    diploma,
    graduation,
    branch,
    dateOfBirth,
    state,
    city,
    pin,
    linkedin,
    prijectTopic,
    prijectdesc,
    extracariculam,
    certificate,
    certificatedesc,
    expectedGraduation,
    technicalskill, // Receive technical skills as a string separated by commas
    softskill,
    languageskill,
    file,
  } = req.body;

  try {
    // Find the student by ID
    const student = await studentmodel.findById(studentId);

    if (!student) {
      return res.status(404).send("Student not found");
    }
    

    // Update the student's profile data
    student.profile = {
      firstName,
      regno,
      email,
      gender,
      phone,
      twelve,
      linkedin,
      diploma,
      graduation,
      branch,
      dateOfBirth,
      state,
      city,
      pin,
      prijectTopic,
      prijectdesc,
      extracariculam,
      certificate,
      certificatedesc,
      expectedGraduation,
      technicalskill, // Store technical skills as an array
      softskill,
      languageskill,
      file,
    };

    // Save the updated student object
    await student.save();

    return res.send("Profile updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});




app.get("/View/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const data = await studentmodel.findById(studentId, 'profile');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/Viewcurrent", async (req, res) => {
  try {
    const data = await postsmodel.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/student/:id/apply', async (req, res) => {
  const studentId = req.params.id;
  const { companyName, criteria, role, date, time,recid } = req.body;

  try {
    // Find the student by ID
    const student = await studentmodel.findById(studentId);
    if (!student) {
      return res.status(404).send("Admin Cant Apply");
    }

    // Add the applied job to the student's appliedPosts array
    student.appliedPosts.push({ companyName, criteria, role, date, time,recid });
    await student.save();

    return res.send('Job application successful');
  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(500).send('Internal Server Error');
  }
});



app.get("/student/:id/applied", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await studentmodel.findById(studentId);
    if (!student) {
      return res.status(404).send("You Can't Apply");
    }
    const appliedJobs = student.appliedPosts;
    res.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});


//============================================================Recruiter=====================================================================
app.post('/recruitercreate', async (req, res) => {
  const { cname, cemail, cphno, cpassword } = req.body;

  if (!cname || !cemail || !cphno || !cpassword) {
    return res.status(400).send("Please fill in all fields.");
  }

  try {
    const result = new recruitermodel(req.body);
    await result.save();

    return res.status(201).send("Recruiter added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});


app.post('/recruiterlogin', async (req, res) => {
  const { cemail, cpassword } = req.body;
  if (!cemail || !cpassword) {
    return res.status(400).send('Please fill in all fields.');
  }
  try {
    const user = await recruitermodel.findOne({ cemail });
    if (!user) {
      return res.status(404).send('Email not found.');
      
    }
    const isPasswordValid = await user.comparePassword(cpassword);
    if (!isPasswordValid) {
      res.alert("invalid password.");
      res.send('Invalid password.');
      return;
    }
    console.log(user._id)
    res.send({msg:'Login successful!',data:user._id});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error.');
  }

});



app.post('/recruiterposts/:id', async (req, res) => {
  const recruiterId = req.params.id; // Extract recruiter ID from the URL
  const { 
    companyName,
    criteria,
    role,
    date,
    time,
    recid,
  } = req.body;

  try {
    // Find the recruiter by ID
    const recruiter = await recruitermodel.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).send("Recruiter not found");
    }

    // Push a new object to the posts array
    recruiter.posts.push({
      companyName,
      criteria,
      role,
      date,
      time,
      recid,
    });

    // Save the updated recruiter object
    await recruiter.save();
    const newPost = new postsmodel({
      companyName,
      criteria,
      role,
      date,
      time,
      recid,
    });
    await newPost.save();

    return res.send("Post added successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});


app.get("/Viewpost/:id", async (req, res) => {
  const recruiterId = req.params.id;
  try {
    const data = await recruitermodel.findById(recruiterId).populate('posts');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete('/deletePost/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete post from recruitermodel
    const updateResult = await recruitermodel.updateOne(
      { 'posts._id': postId },
      { $pull: { posts: { _id: postId } } }
    );

    // Check if any modification happened in recruitermodel
    if (updateResult.nModified === 0) {
      return res.status(404).send("Post not found in recruiter model.");
    }

    // Delete post from postsmodel
    const deleteResult = await postsmodel.deleteOne({ _id: postId });

    // Check if post was deleted from postsmodel
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send("Post not found in posts model.");
    }

    // Send success response
    res.send("Post deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the post");
  }
});





app.get('/recruiter/:id/applied', async (req, res) => {
  const recruiterId = req.params.id;
  try {
    const appliedStudents = await studentmodel.find({ 'appliedPosts.recid': recruiterId });
    const studentsWithPosts = appliedStudents.map(student => {
      const appliedPosts = student.appliedPosts.filter(post => post.recid === recruiterId);
      return { ...student._doc, appliedPosts };
    });
    res.json(studentsWithPosts);
  } catch (error) {
    console.error('Error fetching applied students:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/recruiter/:recruiterId/student/:studentId/selected', async (req, res) => {
  const { recruiterId, studentId } = req.params;

  try {
      const newSelection = new selectmodel({
          stdid: studentId,
          recid: recruiterId
      });
      await newSelection.save();

      return res.send("Student selected successfully");
  } catch (error) {
      console.error('Error selecting student:', error);
      return res.status(500).send('Internal Server Error');
  }
});






app.get('/recruiter/:recruiterId/selectedstudents', async (req, res) => {
  const recruiterId = req.params.recruiterId;

  try {
    // Find all selected students for the recruiter
    const selectedStudents = await selectmodel.find({ recid: recruiterId }).populate({
      path: 'stdid',
      model: 'students', // Assuming your student model is named 'students'
    });
    
    if (!selectedStudents || selectedStudents.length === 0) {
      return res.status(404).send('No selected students found for this recruiter.');
    }

    return res.json(selectedStudents);
  } catch (error) {
    console.error('Error fetching selected students:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/feedback', async (req, res) => {
  const { stdid, skills } = req.body;

  try {
      const feedback = await feedbackmodel.findOneAndUpdate(
          { stdid },
          { $push: { 
              technical: skills.technical,
              communication: skills.communication,
              problem: skills.problem,
              knowledge: skills.knowledge,
              planning: skills.planning
          }},
          { upsert: true }
      );

      return res.status(201).send("Feedback submitted successfully");
  } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
  }
});


// Modify your route to fetch feedback data based on student id
app.get('/feedback/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      const feedback = await feedbackmodel.findOne({ stdid: userId });
      res.json({
          technical: feedback.technical,
          problem: feedback.problem,
          planning: feedback.planning,
          communication: feedback.communication,
          knowledge: feedback.knowledge
      });
  } catch (error) {
      console.error('Error fetching feedback data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




//====================================================Admin===========================================================================
app.post('/adminlogin', async (req, res) => {
  const { aname, apassword } = req.body;

  if (!aname || !apassword) {
    return res.status(400).send('Please fill in all fields.');
  }

  try {
    // Check if the provided credentials match with admin credentials
    if (aname === "admin" && apassword === "mbits111") {
      return res.status(200).send("admin logged in");
    } else {
      return res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error('Error logging in as admin:', error);
    return res.status(500).send('Internal Server Error');
  }
});
app.get('/admin/students', async (req, res) => {
  try {
    // Find all selected students
    const selectedStudents = await selectmodel.find({}, 'stdid');


    if (!selectedStudents || selectedStudents.length === 0) {
      return res.status(404).send('No selected students found.');
    }

    // Extract student IDs from selected students
    const studentIds = selectedStudents.map(student => student.stdid); // Accessing stdid directly

    // Fetch student data using the extracted IDs
    const studentsData = [];
    for (const studentId of studentIds) {
        const student = await studentmodel.findById(studentId);
        if (student) {
            studentsData.push(student);
        }
    }
    

    return res.status(200).json(studentsData);
  } catch (error) {
    console.error('Error fetching student data:', error);
    return res.status(500).send('Internal Server Error');
  }
});






app.get("/Viewstudents", async (req, res) => {
  try {
    const data = await studentmodel.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/Viewcompanys", async (req, res) => {
  try {
    const data = await recruitermodel.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/adminposts', async (req, res) => {
  const { 
    companyName,
    criteria,
    role,
    date,
    time,
  } = req.body;

  try {

    const newPost = new postsmodel({
      companyName,
      criteria,
      role,
      date,
      time,
    });
    await newPost.save();

    return res.send("Post added successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});


app.get('/admin/Placed/selectedstudents', async (req, res) => {
  try {
    const selectedStudents = await selectmodel.find({}).populate('stdid');
    
    if (!selectedStudents || selectedStudents.length === 0) {
      return res.status(404).send('No selected students found for this recruiter.');
    }

    return res.json(selectedStudents);
  } catch (error) {
    console.error('Error fetching selected students:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteuser/:id',async (req,res)=>{
  var id=req.params.id;
  await studentmodel.findByIdAndDelete(id);
  res.send("delete");
})

app.delete('/deletecompany/:id',async (req,res)=>{
  var id=req.params.id;
  await recruitermodel.findByIdAndDelete(id);
  res.send("delete");
})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
