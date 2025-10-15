import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PortfolioForm from './components/PortfolioForm'
import PortfolioPreview from './components/PortfolioPreview'
import ExportOptions from './components/ExportOptions'
import TemplateCustomizer from './components/TemplateCustomizer'

function App() {
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      profileImage: null
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      portfolio: ''
    },
    skills: [],
    projects: [],
    experience: [],
    education: []
  })

  const [template, setTemplate] = useState({
    layout: 'modern',
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    font: 'inter'
  })

  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [customizationMode, setCustomizationMode] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    
    const savedData = localStorage.getItem('portfolioData')
    const savedTemplate = localStorage.getItem('portfolioTemplate')
    
    if (savedData) {
      setPortfolioData(JSON.parse(savedData))
    }
    if (savedTemplate) {
      setTemplate(JSON.parse(savedTemplate))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
    localStorage.setItem('portfolioTemplate', JSON.stringify(template))
  }, [portfolioData, template])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const updatePortfolioData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const updateTemplate = (newTemplate) => {
    setTemplate(newTemplate)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        customizationMode={customizationMode}
        setCustomizationMode={setCustomizationMode}
      />
      
      <main className="container mx-auto px-4 py-8">
        {customizationMode ? (
          <TemplateCustomizer 
            template={template}
            updateTemplate={updateTemplate}
            portfolioData={portfolioData}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeTab === 'form' && (
              <PortfolioForm 
                portfolioData={portfolioData}
                updatePortfolioData={updatePortfolioData}
              />
            )}
            
            <div className={`${activeTab === 'form' ? 'lg:block' : 'col-span-2'} space-y-8`}>
              <PortfolioPreview 
                portfolioData={portfolioData}
                template={template}
                darkMode={darkMode}
              />
              
              <ExportOptions 
                portfolioData={portfolioData}
                template={template}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App