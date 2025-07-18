import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import Test from './Test.tsx'
// import TestMap from './components/example/TestMap.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Test /> */}
    {/* <TestMap /> */}
  </StrictMode>,
)
