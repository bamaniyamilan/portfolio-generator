import React, { useState } from 'react'
import PersonalInfo from './form-sections/PersonalInfo'
import SocialLinks from './form-sections/SocialLinks'
import Skills from './form-sections/Skills'
import Projects from './form-sections/Projects'
import Experience from './form-sections/Experience'
import Education from './form-sections/Education'

const PortfolioForm = ({ portfolioData, updatePortfolioData }) => {
  const [activeSection, setActiveSection] = useState('personal')

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'social', label: 'Social Links', icon: '🔗' },
    { id: 'skills', label: 'Skills', icon: '💡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' }
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo data={portfolioData.personalInfo} updateData={(data) => updatePortfolioData('personalInfo', data)} />
      case 'social':
        return <SocialLinks data={portfolioData.socialLinks} updateData={(data) => updatePortfolioData('socialLinks', data)} />
      case 'skills':
        return <Skills data={portfolioData.skills} updateData={(data) => updatePortfolioData('skills', data)} />
      case 'projects':
        return <Projects data={portfolioData.projects} updateData={(data) => updatePortfolioData('projects', data)} />
      case 'experience':
        return <Experience data={portfolioData.experience} updateData={(data) => updatePortfolioData('experience', data)} />
      case 'education':
        return <Education data={portfolioData.education} updateData={(data) => updatePortfolioData('education', data)} />
      default:
        return <PersonalInfo data={portfolioData.personalInfo} updateData={(data) => updatePortfolioData('personalInfo', data)} />
    }
  }

  return (
    <div className="card animate-fade-in h-full flex flex-col">
      <div className="flex-shrink-0 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Build Your Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your information section by section
        </p>
      </div>

      {/* Section Navigation - Improved with grid layout */}
      <div className="flex-shrink-0 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-3 py-3 rounded-lg font-medium transition-all duration-200 text-center group ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{section.icon}</span>
                <span className="text-xs font-medium leading-tight">
                  {section.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Content - Scrollable area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 pr-2 -mr-2">
          <div className="animate-slide-up pb-6">
            {renderSection()}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex-shrink-0 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
          </span>
          <div className="flex space-x-1">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-500 scale-125'
                    : index < sections.findIndex(s => s.id === activeSection)
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                title={section.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioForm