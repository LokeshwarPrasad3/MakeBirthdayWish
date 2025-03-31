import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/birthday.css';
import CandleInteraction from './components/CandleInteraction';
import BirthdayCelebration from './components/BirthdayCelebration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandleInteraction />} />
        <Route path="/birthday" element={<BirthdayCelebration />} />
      </Routes>
    </Router>
  );
}

export default App;
