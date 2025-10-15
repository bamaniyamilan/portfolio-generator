import React, { useState } from 'react'

const Projects = ({ data, updateData }) => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
    github: '',
    featured: false
  })

  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      updateData([...data, { 
        ...newProject,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      }])
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
        featured: false
      })
    }
  }

  const removeProject = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  const toggleFeatured = (index) => {
    const newProjects = [...data]
    newProjects[index].featured = !newProjects[index].featured
    updateData(newProjects)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Projects
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Showcase your best work with detailed project information
        </p>
      </div>

      {/* Add New Project Form */}
      <div className="card bg-gray-50 dark:bg-gray-700/50">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add New Project</h4>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="input-field"
              placeholder="Project Name *"
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
                Featured Project
              </label>
            </div>
          </div>
          
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Project Description *"
          />
          
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
            className="input-field"
            placeholder="Technologies used (comma separated) *"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              className="input-field"
              placeholder="Live Demo URL"
            />
            
            <input
              type="url"
              value={newProject.github}
              onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
              className="input-field"
              placeholder="GitHub Repository URL"
            />
          </div>
          
          <button
            onClick={addProject}
            disabled={!newProject.name.trim() || !newProject.description.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Projects List */}
      {data.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Your Projects ({data.length})
          </h4>
          <div className="space-y-4">
            {data.map((project, index) => (
              <div key={index} className="card relative group">
                <button
                  onClick={() => removeProject(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  ×
                </button>
                
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {project.name}
                      {project.featured && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </h5>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleFeatured(index)}
                    className={`px-3 py-1 rounded text-sm ${
                      project.featured
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {project.featured ? '★ Featured' : '☆ Feature'}
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {project.description}
                </p>
                
                <div className="flex space-x-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      💻 Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects