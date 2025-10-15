import React from 'react'
import { PaintBucket, Layout, Palette, Type, Github, Linkedin, Globe } from 'lucide-react'

const TemplateCustomizer = ({ template, updateTemplate, portfolioData }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional layout',
      preview: '🔄',
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and expressive design',
      preview: '🎨',
      colors: {
        primary: '#10B981',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant layout',
      preview: '⚪',
      colors: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        accent: '#D1D5DB',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate and formal style',
      preview: '💼',
      colors: {
        primary: '#1E40AF',
        secondary: '#1E3A8A',
        accent: '#3B82F6',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'dark',
      name: 'Dark Pro',
      description: 'Modern dark theme',
      preview: '🌙',
      colors: {
        primary: '#60A5FA',
        secondary: '#A78BFA',
        accent: '#34D399',
        background: '#111827',
        text: '#F9FAFB'
      }
    }
  ]

  const fonts = [
    { id: 'inter', name: 'Inter', class: 'font-sans' },
    { id: 'serif', name: 'Serif', class: 'font-serif' },
    { id: 'mono', name: 'Mono', class: 'font-mono' },
    { id: 'poppins', name: 'Poppins', class: 'font-sans' }
  ]

  const updateTemplateLayout = (templateId) => {
    const selectedTemplate = templates.find(t => t.id === templateId)
    updateTemplate({
      ...template,
      layout: templateId,
      colors: selectedTemplate.colors
    })
  }

  const updateColors = (colorType, value) => {
    updateTemplate({
      ...template,
      colors: {
        ...template.colors,
        [colorType]: value
      }
    })
  }

  const updateFont = (fontId) => {
    updateTemplate({
      ...template,
      font: fontId
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customization Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Layout className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Template
              </h3>
            </div>
            
            <div className="space-y-3">
              {templates.map(templateOption => (
                <div
                  key={templateOption.id}
                  onClick={() => updateTemplateLayout(templateOption.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    template.layout === templateOption.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{templateOption.preview}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {templateOption.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {templateOption.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Custom Colors
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={template.colors.primary}
                    onChange={(e) => updateColors('primary', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.colors.primary}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={template.colors.secondary}
                    onChange={(e) => updateColors('secondary', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.colors.secondary}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={template.colors.accent}
                    onChange={(e) => updateColors('accent', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.colors.accent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Font Selection */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Type className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Typography
              </h3>
            </div>
            
            <div className="space-y-2">
              {fonts.map(font => (
                <div
                  key={font.id}
                  onClick={() => updateFont(font.id)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    template.font === font.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <p className={`text-lg ${font.class} ${
                    template.font === font.id 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {font.name} - Aa Bb Cc
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Live Preview
            </h3>
            <div 
              className="bg-white rounded-xl border-2 border-gray-200 p-6 min-h-[800px] transition-all duration-300"
              style={{
                backgroundColor: template.colors.background,
                color: template.colors.text,
                fontFamily: template.font === 'inter' ? 'Inter, sans-serif' : 
                           template.font === 'serif' ? 'serif' :
                           template.font === 'mono' ? 'monospace' : 'Poppins, sans-serif'
              }}
            >
              {/* Preview Header */}
              <div 
                className="p-8 rounded-xl mb-8 text-white"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                }}
              >
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  {portfolioData.personalInfo.profileImage && (
                    <img
                      src={portfolioData.personalInfo.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                    />
                  )}
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">
                      {portfolioData.personalInfo.name || 'Your Name'}
                    </h1>
                    <p className="text-xl opacity-90 mt-1">
                      {portfolioData.personalInfo.title || 'Your Professional Title'}
                    </p>
                    <p className="opacity-80 mt-2">
                      {portfolioData.personalInfo.location || 'Your Location'}
                    </p>
                    
                    {/* Social Links Section - ADDED HERE */}
                    {(portfolioData.socialLinks.github || portfolioData.socialLinks.linkedin || portfolioData.socialLinks.portfolio) && (
                      <div className="flex justify-center md:justify-start space-x-3 mt-4">
                        {portfolioData.socialLinks.github && (
                          <a 
                            href={portfolioData.socialLinks.github} 
                            className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg bg-white/20"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {portfolioData.socialLinks.linkedin && (
                          <a 
                            href={portfolioData.socialLinks.linkedin} 
                            className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg bg-white/20"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {portfolioData.socialLinks.portfolio && (
                          <a 
                            href={portfolioData.socialLinks.portfolio} 
                            className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg bg-white/20"
                          >
                            <Globe className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="space-y-6">
                {/* Contact & Social Links Section - ADDED HERE */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ color: template.colors.primary }}
                    >
                      Contact
                    </h3>
                    <div className="space-y-2">
                      {portfolioData.personalInfo.email && (
                        <p className="opacity-90 flex items-center space-x-2">
                          <span>📧</span>
                          <span>{portfolioData.personalInfo.email}</span>
                        </p>
                      )}
                      {portfolioData.personalInfo.phone && (
                        <p className="opacity-90 flex items-center space-x-2">
                          <span>📞</span>
                          <span>{portfolioData.personalInfo.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ color: template.colors.primary }}
                    >
                      Connect With Me
                    </h3>
                    <div className="flex space-x-4">
                      {portfolioData.socialLinks.github && (
                        <a 
                          href={portfolioData.socialLinks.github} 
                          className="flex items-center justify-center p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          style={{ 
                            backgroundColor: template.colors.primary,
                            color: 'white'
                          }}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {portfolioData.socialLinks.linkedin && (
                        <a 
                          href={portfolioData.socialLinks.linkedin} 
                          className="flex items-center justify-center p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          style={{ 
                            backgroundColor: template.colors.secondary,
                            color: 'white'
                          }}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {portfolioData.socialLinks.portfolio && (
                        <a 
                          href={portfolioData.socialLinks.portfolio} 
                          className="flex items-center justify-center p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          style={{ 
                            backgroundColor: template.colors.accent,
                            color: 'white'
                          }}
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </section>

                {portfolioData.personalInfo.bio && (
                  <section>
                    <h2 
                      className="text-2xl font-bold mb-4"
                      style={{ color: template.colors.primary }}
                    >
                      About Me
                    </h2>
                    <p className="leading-relaxed opacity-90">
                      {portfolioData.personalInfo.bio}
                    </p>
                  </section>
                )}

                {portfolioData.skills.length > 0 && (
                  <section>
                    <h2 
                      className="text-2xl font-bold mb-4"
                      style={{ color: template.colors.primary }}
                    >
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${template.colors.primary}20`,
                            color: template.colors.primary
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {portfolioData.projects.length > 0 && (
                  <section>
                    <h2 
                      className="text-2xl font-bold mb-4"
                      style={{ color: template.colors.primary }}
                    >
                      Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.projects.slice(0, 2).map((project, index) => (
                        <div 
                          key={index} 
                          className="border rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                          style={{
                            borderColor: `${template.colors.primary}30`,
                            backgroundColor: `${template.colors.background}`
                          }}
                        >
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm opacity-80 mt-1">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateCustomizer