import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './_ui_design/pages/Home';

import { useAuthContext } from './context/AuthContextProvider';
import SignUp from './_ui_design/pages/SignUp';
import Login from './_ui_design/pages/Login';

function App() {
  const { isLoading, currentUser } = useAuthContext();
  if (isLoading) return null;
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to={'/'} />}
        />
        <Route
          path="/signup"
          element={!currentUser ? <SignUp /> : <Navigate to={'/'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
