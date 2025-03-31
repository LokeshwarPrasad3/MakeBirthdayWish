import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/birthday.css';
import './styles/birthdayForm.css';
import CandleInteraction from './components/CandleInteraction';
import BirthdayCelebration from './components/BirthdayCelebration';
import BirthdayForm from './components/BirthdayForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayForm />} />
        <Route path="/*" element={<CandleInteraction />} />
        <Route path="/birthday" element={<BirthdayCelebration />} />
      </Routes>
    </Router>
  );
}

export default App;
