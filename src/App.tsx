import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AddSubject } from "./Components/AddSubject";
import { SubjectDetailPage } from "./Components/SubjectDetailPage";
import { SubjectListPage } from "./pages/SubjectListPage";
import { AdminLogin } from "./pages/AdminLogin";
import ChapterBlog from "./Components/ChapterBlog";
import ChapterForm from "./Components/ChapterForm";
import { NavBar } from "./Components/NavBar";


function Layout() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f1115] to-[#1a1d25]">
      <div className="fixed top-4 left-4 z-50">
        <NavBar />
      </div>

      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/profile" element={<LandingPage/>}></Route>
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/study/:id" element={<SubjectDetailPage />} />
          <Route path="/study" element={<SubjectListPage></SubjectListPage>} ></Route>
          <Route path="/admin" element={<AdminLogin></AdminLogin>} ></Route>
          <Route path="/:subjectId/:name/:id" element={<ChapterBlog></ChapterBlog>}></Route>
          <Route path="/:subjectId/add-chapter" element={<ChapterForm></ChapterForm>} ></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
