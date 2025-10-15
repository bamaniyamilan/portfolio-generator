import React from 'react'
import { Github, Linkedin, Globe } from 'lucide-react'

const SocialLinks = ({ data, updateData }) => {
  const handleChange = (platform, value) => {
    updateData({
      ...data,
      [platform]: value
    })
  }

  const socialPlatforms = [
    {
      key: 'github',
      label: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      placeholder: 'https://github.com/username',
      color: 'hover:text-gray-700'
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      placeholder: 'https://linkedin.com/in/username',
      color: 'hover:text-blue-600'
    },
    {
      key: 'portfolio',
      label: 'Personal Website',
      icon: <Globe className="w-5 h-5" />,
      placeholder: 'https://yourportfolio.com',
      color: 'hover:text-green-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Social Links
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Add links to your professional profiles (GitHub, LinkedIn, and Personal Website)
        </p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => (
          <div key={platform.key} className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <div className={`text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200 ${platform.color}`}>
                  {platform.icon}
                </div>
                <span>{platform.label}</span>
              </div>
            </label>
            <input
              type="url"
              value={data[platform.key] || ''}
              onChange={(e) => handleChange(platform.key, e.target.value)}
              className="input-field"
              placeholder={platform.placeholder}
            />
          </div>
        ))}
      </div>

      {/* Preview of Social Links */}
      {(data.github || data.linkedin || data.portfolio) && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Social Links Preview
          </h4>
          <div className="flex space-x-4">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {data.portfolio && (
              <a
                href={data.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Website</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialLinks