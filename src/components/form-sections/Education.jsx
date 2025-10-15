import React, { useState } from 'react'

const Education = ({ data, updateData }) => {
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    period: '',
    description: ''
  })

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      updateData([...data, { ...newEducation }])
      setNewEducation({
        degree: '',
        institution: '',
        period: '',
        description: ''
      })
    }
  }

  const removeEducation = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>

      {/* Add New Education Form */}
      <div className="card bg-gray-50 dark:bg-gray-700/50">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add Education</h4>
        
        <div className="space-y-4">
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            className="input-field"
            placeholder="Degree or Certification"
          />
          
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            className="input-field"
            placeholder="Institution Name"
          />
          
          <input
            type="text"
            value={newEducation.period}
            onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
            className="input-field"
            placeholder="e.g., 2018 - 2022"
          />
          
          <textarea
            value={newEducation.description}
            onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Additional details (optional)"
          />
          
          <button
            onClick={addEducation}
            className="btn-primary w-full"
          >
            Add Education
          </button>
        </div>
      </div>

      {/* Education List */}
      {data.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Your Education ({data.length})
          </h4>
          <div className="space-y-4">
            {data.map((edu, index) => (
              <div key={index} className="card relative">
                <button
                  onClick={() => removeEducation(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
                <h5 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h5>
                <p className="text-blue-500 dark:text-blue-400">{edu.institution}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.period}</p>
                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Education