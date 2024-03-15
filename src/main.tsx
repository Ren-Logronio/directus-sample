import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './components/UserProvider.tsx'

render(<BrowserRouter><UserProvider><App /></UserProvider></BrowserRouter>, document.getElementById('app')!)
