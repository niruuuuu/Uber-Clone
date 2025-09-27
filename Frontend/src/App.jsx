import { Route, Routes } from "react-router-dom";
import {
  Start,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup,
  Home,
  UserProtectedWrapper,
  UserLogout,
  CaptainHome,
  CaptainProtectedWrapper,
  CaptainLogout,
  Riding
} from "./Pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain/signin" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper childrenRoute={`/home`}>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper childrenRoute={`/user/logout`}>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain/home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome/>
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout/>
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/user/ride"
          element={
            <UserProtectedWrapper childrenRoute={`/user/ride`}>
              <Riding />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
