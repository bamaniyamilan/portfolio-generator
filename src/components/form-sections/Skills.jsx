import React, { useState } from 'react'

const Skills = ({ data, updateData }) => {
  const [newSkill, setNewSkill] = useState('')

  const predefinedSkills = [
    // Frontend
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap',
    // Backend
    'Node.js', 'Python', 'Java', 'PHP', 'Ruby', 'Go', 'C#', 'Express.js', 'Django', 'Spring Boot',
    // Database
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',
    // Mobile
    'React Native', 'Flutter', 'iOS Development', 'Android Development',
    // DevOps & Tools
    'Git', 'Docker', 'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'CI/CD', 'Jenkins',
    // Design
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
    // Other
    'REST APIs', 'GraphQL', 'WebSocket', 'Microservices', 'Agile/Scrum', 'Test Driven Development'
  ]

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      updateData([...data, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    updateData(data.filter(skill => skill !== skillToRemove))
  }

  const addPredefinedSkill = (skill) => {
    if (!data.includes(skill)) {
      updateData([...data, skill])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const filteredSkills = predefinedSkills.filter(skill => 
    !data.includes(skill) && 
    skill.toLowerCase().includes(newSkill.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Skills
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Add your technical skills. Choose from popular skills or type your own.
        </p>
      </div>
      
      {/* Add Custom Skill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add Custom Skill
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field flex-1"
            placeholder="Type a skill and press Enter or click Add..."
          />
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Predefined Skills */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Popular Skills - Click to Add
        </h4>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
          {predefinedSkills
            .filter(skill => !data.includes(skill))
            .map((skill, index) => (
              <button
                key={index}
                onClick={() => addPredefinedSkill(skill)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
              >
                {skill} +
              </button>
            ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Click on any skill above to add it to your list
        </p>
      </div>

      {/* Current Skills */}
      {data.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Skills ({data.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-full text-sm border border-blue-200 dark:border-blue-800"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          💡 Skill Suggestions
        </h4>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          <strong>Frontend Developers:</strong> React, JavaScript, TypeScript, CSS3, HTML5<br/>
          <strong>Backend Developers:</strong> Node.js, Python, SQL, REST APIs, Docker<br/>
          <strong>Full Stack:</strong> Combine frontend and backend skills
        </p>
      </div>
    </div>
  )
}

export default Skills