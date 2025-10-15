import React from 'react'

const PersonalInfo = ({ data, updateData }) => {
  const handleChange = (field, value) => {
    updateData({
      ...data,
      [field]: value
    })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleChange('profileImage', e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Basic information that appears at the top of your portfolio
        </p>
      </div>
      
      {/* Profile Image Upload */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
          {data.profileImage ? (
            <img 
              src={data.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-2xl">👤</span>
          )}
        </div>
        <div>
          <label className="btn-secondary cursor-pointer inline-flex items-center space-x-2">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <span>📷 Upload Photo</span>
          </label>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Recommended: Square image, 400x400px or larger
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Title *
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input-field"
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="input-field"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="input-field"
            placeholder="New York, NY"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Summary *
          </label>
          <textarea
            value={data.bio || ''}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="input-field resize-none"
            rows="4"
            placeholder="A passionate frontend developer with 3+ years of experience in React.js, JavaScript, and modern web technologies. Specialized in building responsive and user-friendly web applications..."
          />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Write a brief overview of your professional background and skills
          </p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo