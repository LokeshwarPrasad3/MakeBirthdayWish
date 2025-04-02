import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/birthday.css';
import './styles/birthdayForm.css';
import CandleInteraction from './components/CandleInteraction';
import BirthdayCelebration from './components/BirthdayCelebration';
import MakeBirthdayWishForm from './components/MakeBirthdayWishForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MakeBirthdayWishForm />} />
          <Route path="/:birthdayId" element={<CandleInteraction />} />
          <Route path="/birthday" element={<BirthdayCelebration />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
      />
    </>
  );
}

export default App;
