import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/birthday.css';
import './styles/admin/birthdayDetails.css';
import './styles/admin/crazyLoader.css';
import './styles/admin/shareModal.css';
import CandleInteraction from './components/CandleInteraction';
import BirthdayCelebration from './components/BirthdayCelebration';
import MakeBirthdayWishForm from './components/MakeBirthdayWishForm';
import { Toaster } from 'react-hot-toast';
import AdminPage from './pages/admin/AdminPage';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MakeBirthdayWishForm />} />
          <Route path="/:birthdayId" element={<CandleInteraction />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/birthday" element={<BirthdayCelebration />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
