import Applicants from "../Applicants/Applicants";
import Addrecruitment from "../AddRecruitment/Addrecruitment";
import { Route, Routes } from 'react-router-dom';
import Post from "../Posts/Post";
import PssdR from "../../PSR/PssdR";
import Feedback from "../Applicants/Feedback";
import Resume from "../../Resume/Resume";
import Selectedstd from "../Selected/Selectedstd";

function RouterRec() {
  return (
    <div>
      <Routes>
        <Route path='applicants' element={<Applicants />} />
        <Route path='selectedstudents/*' element={<Selectedstd/>} />
        <Route path='Addrecruitments' element={<Addrecruitment />} />
        <Route path='posts' element={<Post />} />
        <Route path='changepssdR' element={<PssdR />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="details" element={<Resume />} />
      </Routes>
    </div>
  );
}

export default RouterRec;
