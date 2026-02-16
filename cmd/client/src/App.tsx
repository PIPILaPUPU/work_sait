import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GroupsPage from './pages/GroupsPage'
import PricingPage from './pages/PricingPage'
import Layout from './components/Layout'
import { BookingsProvider } from './context/BookingsContext'

function App() {
  return (
    <BookingsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </Layout>
      </Router>
    </BookingsProvider>
  )
}

export default App
