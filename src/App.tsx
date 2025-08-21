import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { SkillViewPage } from "./pages/SkillViewPage";
import { LandingPage } from "./pages/LandingPage";
// import { SkillPage } from "./pages/SkillPage";
// import { AddSkill } from "./pages/AddSkill";
import { AddSubject } from "./Components/AddSubject";
import { SubjectDetailPage } from "./Components/SubjectDetailPage";
import { StudyListPage } from "./pages/StudyListpage";
import { AdminLogin } from "./pages/AdminLogin";
import ChapterBlog from "./Components/ChapterBlog";
import ChapterForm from "./Components/ChapterForm";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/profile" element={<LandingPage/>}></Route>
          {/* <Route path="/skill/:id" element={<SkillViewPage/>}></Route> */}
          {/* <Route path="/skills" element={ <SkillPage/> }></Route> */}
          {/* <Route path="/addskill" element={ <AddSkill/> }></Route> */}
          <Route path="/addmaterial" element={<AddSubject />} />
          <Route path="/study/:id" element={<SubjectDetailPage />} />
          <Route path="/study" element={<StudyListPage></StudyListPage>} ></Route>
          <Route path="/admin" element={<AdminLogin></AdminLogin>} ></Route>
          <Route path="/:subjectId/:name/:id" element={<ChapterBlog></ChapterBlog>}></Route>
          <Route path="/:subjectId/add-chapter" element={<ChapterForm></ChapterForm>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
