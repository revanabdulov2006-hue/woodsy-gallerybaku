import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/cormorant-garamond/latin-ext-400.css'
import '@fontsource/cormorant-garamond/latin-ext-500.css'
import '@fontsource/cormorant-garamond/latin-ext-600.css'
import '@fontsource/cormorant-garamond/latin-ext-400-italic.css'
import '@fontsource/cormorant-garamond/latin-ext-500-italic.css'
import '@fontsource-variable/manrope'
import './styles/index.css'
import App from './App.jsx'
import { I18nProvider } from './lib/i18n.jsx'
import { TransitionProvider } from './lib/transition.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nProvider>
      <TransitionProvider>
        <App />
      </TransitionProvider>
    </I18nProvider>
  </BrowserRouter>
)
