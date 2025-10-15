import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { GripVertical, Plus, Trash2, Eye, EyeOff } from 'lucide-react'

const DraggableSection = ({ section, index, moveSection, toggleVisibility, removeSection }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SECTION',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'SECTION',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  const sectionIcons = {
    personal: '👤',
    social: '🔗',
    skills: '💡',
    projects: '🚀',
    experience: '💼',
    education: '🎓'
  }

  const sectionLabels = {
    personal: 'Personal Info',
    social: 'Social Links',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education'
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${section.visible ? 'border-blue-200 dark:border-blue-800' : 'border-gray-300 dark:border-gray-600'}`}
    >
      <div className="flex items-center space-x-3">
        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
        <span className="text-2xl">{sectionIcons[section.id]}</span>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {sectionLabels[section.id]}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {section.visible ? 'Visible' : 'Hidden'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleVisibility(index)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            section.visible 
              ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' 
              : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        
        <button
          onClick={() => removeSection(index)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const AvailableSection = ({ section, onAdd }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NEW_SECTION',
    item: { section },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const sectionIcons = {
    personal: '👤',
    social: '🔗',
    skills: '💡',
    projects: '🚀',
    experience: '💼',
    education: '🎓'
  }

  const sectionLabels = {
    personal: 'Personal Info',
    social: 'Social Links',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education'
  }

  return (
    <div
      ref={drag}
      className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-green-300 dark:border-green-800 cursor-grab transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      onClick={() => onAdd(section)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{sectionIcons[section]}</span>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {sectionLabels[section]}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click or drag to add
          </p>
        </div>
      </div>
      
      <Plus className="w-5 h-5 text-green-500" />
    </div>
  )
}

const LayoutBuilder = ({ layout, updateLayout, portfolioData }) => {
  const availableSections = ['personal', 'social', 'skills', 'projects', 'experience', 'education']
    .filter(section => !layout.sections.find(s => s.id === section))

  const moveSection = (fromIndex, toIndex) => {
    const newSections = [...layout.sections]
    const [movedSection] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, movedSection)
    updateLayout({ ...layout, sections: newSections })
  }

  const toggleVisibility = (index) => {
    const newSections = [...layout.sections]
    newSections[index] = {
      ...newSections[index],
      visible: !newSections[index].visible
    }
    updateLayout({ ...layout, sections: newSections })
  }

  const removeSection = (index) => {
    const newSections = layout.sections.filter((_, i) => i !== index)
    updateLayout({ ...layout, sections: newSections })
  }

  const addSection = (sectionId) => {
    const newSection = { id: sectionId, visible: true }
    updateLayout({
      ...layout,
      sections: [...layout.sections, newSection]
    })
  }

  const [, drop] = useDrop({
    accept: 'NEW_SECTION',
    drop: (item) => {
      addSection(item.section)
    },
  })

  return (
    <div className="card animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Layout Builder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Drag and drop to arrange your portfolio sections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Layout */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Layout
          </h3>
          <div className="space-y-3">
            {layout.sections.map((section, index) => (
              <DraggableSection
                key={`${section.id}-${index}`}
                section={section}
                index={index}
                moveSection={moveSection}
                toggleVisibility={toggleVisibility}
                removeSection={removeSection}
              />
            ))}
          </div>
          
          {layout.sections.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                Drag sections here to build your layout
              </p>
            </div>
          )}
        </div>

        {/* Available Sections */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Sections
          </h3>
          <div ref={drop} className="space-y-3">
            {availableSections.map(section => (
              <AvailableSection
                key={section}
                section={section}
                onAdd={addSection}
              />
            ))}
            
            {availableSections.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  All sections are in use
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Layout Preview */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Layout Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layout.sections.filter(s => s.visible).map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center"
            >
              <span className="text-2xl mb-2 block">
                {{
                  personal: '👤',
                  social: '🔗',
                  skills: '💡',
                  projects: '🚀',
                  experience: '💼',
                  education: '🎓'
                }[section.id]}
              </span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {{
                  personal: 'Personal',
                  social: 'Social',
                  skills: 'Skills',
                  projects: 'Projects',
                  experience: 'Experience',
                  education: 'Education'
                }[section.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LayoutBuilder