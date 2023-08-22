import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute,SharedLayout,Landing,Error } from './pages'
import { Home,Insider,Recommend } from './pages/dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/'
          element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='insider' element={<Insider />} /> 
          <Route path='recommend' element={<Recommend />} /> 
          {/* <Route path='callback' element={<Home />} />  */}
        </Route>

        <Route element={<SharedLayout />}>
          <Route path='callback' element={<Home />} /> 
        </Route>
        
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      
      <ToastContainer position='top-center' />
    </BrowserRouter>
  )
}

export default App;

