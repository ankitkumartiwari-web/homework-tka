import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { DayPage } from './pages/DayPage';
import { HomePage } from './pages/HomePage';
import { HomeworkDetailsPage } from './pages/HomeworkDetailsPage';
import { SubjectPage } from './pages/SubjectPage';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subject" element={<SubjectPage />} />
        <Route path="/subject/:subject/day/:day" element={<DayPage />} />
        <Route path="/subject/:subject/day/:day/:slug" element={<HomeworkDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
