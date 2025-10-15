import React, { useState } from 'react'

const Experience = ({ data, updateData }) => {
  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    period: '',
    description: ''
  })

  const addExperience = () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      updateData([...data, { ...newExperience }])
      setNewExperience({
        position: '',
        company: '',
        period: '',
        description: ''
      })
    }
  }

  const removeExperience = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>

      {/* Add New Experience Form */}
      <div className="card bg-gray-50 dark:bg-gray-700/50">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add New Experience</h4>
        
        <div className="space-y-4">
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            className="input-field"
            placeholder="Position Title"
          />
          
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            className="input-field"
            placeholder="Company Name"
          />
          
          <input
            type="text"
            value={newExperience.period}
            onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
            className="input-field"
            placeholder="e.g., Jan 2020 - Present"
          />
          
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Describe your responsibilities and achievements..."
          />
          
          <button
            onClick={addExperience}
            className="btn-primary w-full"
          >
            Add Experience
          </button>
        </div>
      </div>

      {/* Experience List */}
      {data.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Your Experience ({data.length})
          </h4>
          <div className="space-y-4">
            {data.map((exp, index) => (
              <div key={index} className="card relative">
                <button
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
                <h5 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h5>
                <p className="text-blue-500 dark:text-blue-400">{exp.company}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.period}</p>
                {exp.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Experience