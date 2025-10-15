import React from 'react'
import { Github, Linkedin, Globe } from 'lucide-react' // ADD THIS IMPORT

const PortfolioPreview = ({ portfolioData, template, darkMode }) => {
  const { personalInfo, socialLinks, skills, projects, experience, education } = portfolioData

  const getFontClass = () => {
    switch (template.font) {
      case 'inter': return 'font-sans'
      case 'serif': return 'font-serif'
      case 'mono': return 'font-mono'
      case 'poppins': return 'font-sans'
      default: return 'font-sans'
    }
  }

  return (
    <div className="card animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio Preview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time preview with your selected template
        </p>
      </div>

      {/* Portfolio Preview */}
      <div 
        className={`rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${getFontClass()}`}
        style={{
          backgroundColor: template.colors.background,
          color: template.colors.text
        }}
      >
        {/* Header Section */}
        <div 
          className="p-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
          }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-xl opacity-90 mt-1">
                {personalInfo.title || 'Your Professional Title'}
              </p>
              <p className="opacity-80 mt-2">
                {personalInfo.location || 'Your Location'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Contact & Social Links */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: template.colors.primary }}
              >
                Contact
              </h3>
              <div className="space-y-2">
                {personalInfo.email && (
                  <p className="opacity-90 flex items-center space-x-2">
                    <span>📧</span>
                    <span>{personalInfo.email}</span>
                  </p>
                )}
                {personalInfo.phone && (
                  <p className="opacity-90 flex items-center space-x-2">
                    <span>📞</span>
                    <span>{personalInfo.phone}</span>
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
                {socialLinks.github && (
                  <a 
                    href={socialLinks.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    style={{ 
                      backgroundColor: template.colors.primary,
                      color: 'white'
                    }}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    style={{ 
                      backgroundColor: template.colors.secondary,
                      color: 'white'
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.portfolio && (
                  <a 
                    href={socialLinks.portfolio} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
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

          {/* Bio Section */}
          {personalInfo.bio && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.primary }}
              >
                About Me
              </h2>
              <p className="opacity-90 leading-relaxed">
                {personalInfo.bio}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.primary }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.primary }}
              >
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 transition-all duration-200 hover:shadow-lg"
                    style={{
                      borderColor: `${template.colors.primary}30`,
                      backgroundColor: `${template.colors.background}`
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.featured && (
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: template.colors.accent,
                            color: 'white'
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-80 mb-3">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs rounded"
                            style={{
                              backgroundColor: `${template.colors.secondary}20`,
                              color: template.colors.secondary
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.primary }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div 
                    key={index} 
                    className="border-l-4 pl-4"
                    style={{ borderColor: template.colors.primary }}
                  >
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p style={{ color: template.colors.secondary }}>{exp.company}</p>
                    <p className="text-sm opacity-80">{exp.period}</p>
                    {exp.description && (
                      <p className="text-sm opacity-90 mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.primary }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p style={{ color: template.colors.secondary }}>{edu.institution}</p>
                    <p className="text-sm opacity-80">{edu.period}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioPreview