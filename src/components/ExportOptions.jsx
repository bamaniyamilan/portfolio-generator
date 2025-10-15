import React from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const ExportOptions = ({ portfolioData, template }) => {
  const exportAsJSON = () => {
    const data = {
      portfolioData,
      template,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportAsResumePDF = async () => {
    try {
      // Create a temporary element for PDF generation
      const element = document.createElement('div')
      element.style.width = '210mm'
      element.style.minHeight = '297mm'
      element.style.padding = '0'
      element.style.backgroundColor = '#FFFFFF'
      element.style.color = '#1F2937'
      element.style.fontFamily = 'Arial, Helvetica, sans-serif'
      element.style.fontSize = '12px'
      element.style.lineHeight = '1.4'
      element.style.margin = '0'

      // Build PDF content with proper alignment
      element.innerHTML = `
        <div style="
          background: linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary});
          color: white;
          padding: 30px 25px;
          margin: 0;
          text-align: center;
          border-bottom: 5px solid ${template.colors.accent};
        ">
          <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
            ${portfolioData.personalInfo.profileImage ? `
              <div style="flex-shrink: 0;">
                <img 
                  src="${portfolioData.personalInfo.profileImage}" 
                  alt="Profile" 
                  style="
                    width: 100px; 
                    height: 100px; 
                    border-radius: 50%; 
                    object-fit: cover;
                    border: 4px solid white;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                  "
                  onerror="this.style.display='none'"
                />
              </div>
            ` : ''}
            <div style="flex: 1; min-width: 200px;">
              <h1 style="font-size: 32px; margin: 0 0 8px 0; font-weight: bold; line-height: 1.2;">
                ${portfolioData.personalInfo.name || 'Your Name'}
              </h1>
              <p style="font-size: 20px; margin: 0 0 15px 0; opacity: 0.9; font-weight: 500;">
                ${portfolioData.personalInfo.title || 'Your Professional Title'}
              </p>
              <div style="display: flex; justify-content: center; gap: 20px; font-size: 13px; opacity: 0.9; flex-wrap: wrap;">
                ${portfolioData.personalInfo.email ? `<span>📧 ${portfolioData.personalInfo.email}</span>` : ''}
                ${portfolioData.personalInfo.phone ? `<span>📞 ${portfolioData.personalInfo.phone}</span>` : ''}
                ${portfolioData.personalInfo.location ? `<span>📍 ${portfolioData.personalInfo.location}</span>` : ''}
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 25px;">
          ${portfolioData.personalInfo.bio ? `
          <div style="margin-bottom: 25px;">
            <h2 style="
              font-size: 20px; 
              border-bottom: 3px solid ${template.colors.primary}; 
              padding-bottom: 8px; 
              margin-bottom: 15px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">PROFESSIONAL SUMMARY</h2>
            <p style="text-align: left; font-size: 13px; line-height: 1.6;">
              ${portfolioData.personalInfo.bio}
            </p>
          </div>
          ` : ''}

          ${portfolioData.skills.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h2 style="
              font-size: 20px; 
              border-bottom: 3px solid ${template.colors.primary}; 
              padding-bottom: 8px; 
              margin-bottom: 15px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">SKILLS</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${portfolioData.skills.map(skill => 
                `<span style="
                  background: ${template.colors.primary}15; 
                  color: ${template.colors.primary}; 
                  padding: 6px 14px; 
                  border-radius: 20px; 
                  font-size: 11px;
                  font-weight: 600;
                  border: 1px solid ${template.colors.primary}30;
                ">${skill}</span>`
              ).join('')}
            </div>
          </div>
          ` : ''}

          ${portfolioData.experience.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h2 style="
              font-size: 20px; 
              border-bottom: 3px solid ${template.colors.primary}; 
              padding-bottom: 8px; 
              margin-bottom: 15px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">WORK EXPERIENCE</h2>
            ${portfolioData.experience.map(exp => `
              <div style="margin-bottom: 20px; padding-left: 15px; border-left: 4px solid ${template.colors.primary};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; flex-wrap: wrap;">
                  <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: #1F2937; flex: 1;">${exp.position}</h3>
                  <span style="font-size: 12px; color: ${template.colors.secondary}; font-weight: 600; min-width: 120px; text-align: right;">${exp.period}</span>
                </div>
                <p style="font-size: 14px; color: ${template.colors.secondary}; margin: 4px 0; font-weight: 600;">${exp.company}</p>
                ${exp.description ? `
                  <p style="font-size: 12px; margin: 10px 0; color: #6B7280; line-height: 1.5;">
                    ${exp.description}
                  </p>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${portfolioData.projects.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h2 style="
              font-size: 20px; 
              border-bottom: 3px solid ${template.colors.primary}; 
              padding-bottom: 8px; 
              margin-bottom: 15px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">PROJECTS</h2>
            ${portfolioData.projects.map(project => `
              <div style="margin-bottom: 18px; padding: 16px; border: 2px solid ${template.colors.primary}20; border-radius: 10px; background: #F9FAFB;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap;">
                  <h3 style="font-size: 15px; font-weight: bold; margin: 0; color: #1F2937; flex: 1;">${project.name}</h3>
                  ${project.featured ? `
                    <span style="
                      background: ${template.colors.accent};
                      color: white;
                      padding: 4px 12px;
                      border-radius: 12px;
                      font-size: 10px;
                      font-weight: bold;
                    ">FEATURED</span>
                  ` : ''}
                </div>
                <p style="font-size: 13px; margin: 8px 0; color: #6B7280; line-height: 1.5;">
                  ${project.description}
                </p>
                ${project.technologies && project.technologies.length > 0 ? `
                  <div style="font-size: 11px; color: ${template.colors.secondary}; margin-top: 10px; font-weight: 600;">
                    <strong>Technologies:</strong> ${project.technologies.join(', ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${portfolioData.education.length > 0 ? `
          <div style="margin-bottom: 25px;">
            <h2 style="
              font-size: 20px; 
              border-bottom: 3px solid ${template.colors.primary}; 
              padding-bottom: 8px; 
              margin-bottom: 15px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">EDUCATION</h2>
            ${portfolioData.education.map(edu => `
              <div style="margin-bottom: 18px; padding-left: 15px; border-left: 4px solid ${template.colors.secondary};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; flex-wrap: wrap;">
                  <h3 style="font-size: 15px; font-weight: bold; margin: 0; color: #1F2937; flex: 1;">${edu.degree}</h3>
                  <span style="font-size: 12px; color: ${template.colors.secondary}; font-weight: 600; min-width: 120px; text-align: right;">${edu.period}</span>
                </div>
                <p style="font-size: 14px; color: ${template.colors.secondary}; margin: 4px 0; font-weight: 600;">${edu.institution}</p>
                ${edu.description ? `
                  <p style="font-size: 12px; margin: 8px 0; color: #6B7280; line-height: 1.5;">
                    ${edu.description}
                  </p>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${portfolioData.socialLinks.github || portfolioData.socialLinks.linkedin || portfolioData.socialLinks.portfolio ? `
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid ${template.colors.primary}20;">
            <h2 style="
              font-size: 18px; 
              margin-bottom: 12px;
              color: ${template.colors.primary};
              font-weight: bold;
            ">CONTACT & LINKS</h2>
            <div style="display: flex; gap: 20px; font-size: 12px; flex-wrap: wrap;">
              ${portfolioData.socialLinks.github ? `<span style="font-weight: 600;">GitHub: <span style="color: ${template.colors.secondary};">${portfolioData.socialLinks.github}</span></span>` : ''}
              ${portfolioData.socialLinks.linkedin ? `<span style="font-weight: 600;">LinkedIn: <span style="color: ${template.colors.secondary};">${portfolioData.socialLinks.linkedin}</span></span>` : ''}
              ${portfolioData.socialLinks.portfolio ? `<span style="font-weight: 600;">Portfolio: <span style="color: ${template.colors.secondary};">${portfolioData.socialLinks.portfolio}</span></span>` : ''}
            </div>
          </div>
          ` : ''}

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
            <p style="font-size: 10px; color: #9CA3AF; margin: 0;">
              Generated with Portfolio Generator • ${new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      `

      document.body.appendChild(element)

      // Generate PDF with better settings
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        allowTaint: true,
        width: 794, // A4 width in pixels at 96 DPI
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        onclone: (clonedDoc) => {
          // Ensure images are loaded in the cloned document
          const images = clonedDoc.querySelectorAll('img')
          images.forEach(img => {
            img.crossOrigin = 'anonymous'
            img.style.display = 'block'
          })
        }
      })

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      
      // Add multiple pages if content is too long
      let heightLeft = imgHeight - pageHeight
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${portfolioData.personalInfo.name || 'portfolio'}-resume.pdf`)
      
      // Clean up
      document.body.removeChild(element)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const exportAsPortfolioHTML = () => {
    const htmlContent = generatePortfolioHTML(portfolioData, template)
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  const generatePortfolioHTML = (data, template) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        :root {
            --primary: ${template.colors.primary};
            --secondary: ${template.colors.secondary};
            --accent: ${template.colors.accent};
            --background: ${template.colors.background};
            --text: ${template.colors.text};
        }
    </style>
</head>
<body style="background-color: var(--background); color: var(--text);">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <div class="text-white p-8 rounded-xl mb-8" style="background: linear-gradient(135deg, var(--primary), var(--secondary))">
            <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                ${data.personalInfo.profileImage ? `
                <img src="${data.personalInfo.profileImage}" alt="Profile" class="w-24 h-24 rounded-full object-cover border-4 border-white/20">
                ` : ''}
                <div class="text-center md:text-left">
                    <h1 class="text-3xl font-bold">${data.personalInfo.name}</h1>
                    <p class="text-xl opacity-90 mt-1">${data.personalInfo.title}</p>
                    <p class="opacity-80 mt-2">${data.personalInfo.location}</p>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="space-y-8">
            ${data.personalInfo.bio ? `
            <section>
                <h2 class="text-2xl font-bold mb-4" style="color: var(--primary)">About Me</h2>
                <p class="leading-relaxed">${data.personalInfo.bio}</p>
            </section>
            ` : ''}

            ${data.skills.length > 0 ? `
            <section>
                <h2 class="text-2xl font-bold mb-4" style="color: var(--primary)">Skills</h2>
                <div class="flex flex-wrap gap-2">
                    ${data.skills.map(skill => `
                    <span class="px-3 py-1 rounded-full text-sm font-medium" 
                          style="background-color: color-mix(in srgb, var(--primary) 20%, transparent); color: var(--primary)">
                        ${skill}
                    </span>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${data.projects.length > 0 ? `
            <section>
                <h2 class="text-2xl font-bold mb-4" style="color: var(--primary)">Projects</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${data.projects.map(project => `
                    <div class="border rounded-lg p-4" style="border-color: color-mix(in srgb, var(--primary) 30%, transparent)">
                        <h3 class="font-semibold">${project.name}</h3>
                        <p class="text-sm mt-1">${project.description}</p>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </div>
</body>
</html>
    `
  }

  return (
    <div className="card animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Export Your Portfolio
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={exportAsJSON}
          className="btn-secondary flex flex-col items-center justify-center p-4 space-y-2 h-32"
        >
          <span className="text-2xl">📄</span>
          <span className="font-semibold">Export as JSON</span>
          <span className="text-xs text-gray-500 text-center">Save data for later editing</span>
        </button>
        
        <button
          onClick={exportAsResumePDF}
          className="btn-primary flex flex-col items-center justify-center p-4 space-y-2 h-32"
        >
          <span className="text-2xl">📝</span>
          <span className="font-semibold">Export as PDF Resume</span>
          <span className="text-xs text-white/80 text-center">Professional resume format</span>
        </button>
        
        <button
          onClick={exportAsPortfolioHTML}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex flex-col items-center justify-center space-y-2 h-32"
        >
          <span className="text-2xl">🌐</span>
          <span className="font-semibold">Export as Website</span>
          <span className="text-xs text-white/80 text-center">Full portfolio website</span>
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Export Features
        </h4>
        <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
          <li>• <strong>JSON:</strong> Save all your data and template settings</li>
          <li>• <strong>PDF Resume:</strong> Professional A4 format resume</li>
          <li>• <strong>Website:</strong> Complete portfolio with your chosen template</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Portfolio Completion
        </h4>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateCompletion(portfolioData)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {calculateCompletion(portfolioData)}% complete - {getCompletionMessage(portfolioData)}
        </p>
      </div>
    </div>
  )
}

// Helper functions for completion calculation
const calculateCompletion = (data) => {
  let completed = 0
  let total = 0

  // Personal Info
  total += 6
  completed += data.personalInfo.name ? 1 : 0
  completed += data.personalInfo.title ? 1 : 0
  completed += data.personalInfo.email ? 1 : 0
  completed += data.personalInfo.bio ? 1 : 0
  completed += data.personalInfo.location ? 1 : 0
  completed += data.personalInfo.profileImage ? 1 : 0

  // Social Links
  total += 4
  completed += data.socialLinks.github ? 1 : 0
  completed += data.socialLinks.linkedin ? 1 : 0
  completed += data.socialLinks.twitter ? 1 : 0
  completed += data.socialLinks.portfolio ? 1 : 0

  // Skills
  total += 1
  completed += data.skills.length > 0 ? 1 : 0

  // Projects
  total += 1
  completed += data.projects.length > 0 ? 1 : 0

  // Experience
  total += 1
  completed += data.experience.length > 0 ? 1 : 0

  // Education
  total += 1
  completed += data.education.length > 0 ? 1 : 0

  return Math.round((completed / total) * 100)
}

const getCompletionMessage = (data) => {
  const completion = calculateCompletion(data)
  if (completion < 25) return "Just getting started!"
  if (completion < 50) return "Keep going!"
  if (completion < 75) return "Looking good!"
  if (completion < 100) return "Almost there!"
  return "Portfolio complete! Ready to export."
}

export default ExportOptions