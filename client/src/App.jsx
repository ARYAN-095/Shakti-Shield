import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import AfterLogin from "./Components/Home/AfterLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import Map from "./Components/Map";
import Reviews from "./Components/Reviews";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // ✅ Make sure toast styles load

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* The main app container — centers content & applies max width */}
      <div className="flex flex-col min-h-screen max-w-[85rem] mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">

        {/* Persistent navigation bar at the top */}
        <Navbar />

        {/* Main content area, grows to fill available space */}
        <main className="flex-1 pt-4 pb-10 px-4 sm:px-8">

          {/* Application routes */}
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />

            {/* Protected Routes — only accessible when logged in */}
            <Route path='/HomePage' element={
              <ProtectedRoute>
                <AfterLogin />
              </ProtectedRoute>
            } />

            <Route path='/map' element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            } />

            <Route path='/reviews' element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            } />

            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path='/settings' element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        {/* Toast container for notifications */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
