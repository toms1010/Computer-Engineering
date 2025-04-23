// Data for the website
const data = {
    jobs: [
        {
            title: "Software Engineer",
            description: "Design, develop, and maintain software applications and systems.",
            icon: "fa-code"
        },
        {
            title: "Embedded Systems Engineer",
            description: "Develop and optimize software for hardware devices and IoT systems.",
            icon: "fa-microchip"
        },
        {
            title: "Network Engineer",
            description: "Design, implement, and manage computer networks and infrastructure.",
            icon: "fa-network-wired"
        },
        {
            title: "Cybersecurity Analyst",
            description: "Protect systems and networks from digital attacks and vulnerabilities.",
            icon: "fa-shield-alt"
        },
        {
            title: "Data Scientist",
            description: "Analyze complex data sets to extract insights and build predictive models.",
            icon: "fa-chart-bar"
        },
        {
            title: "Cloud Architect",
            description: "Design and implement cloud computing solutions and infrastructure.",
            icon: "fa-cloud"
        }
    ],
    
    subjects: [
        { name: "Data Structures & Algorithms", icon: "fa-project-diagram" },
        { name: "Computer Networks", icon: "fa-network-wired" },
        { name: "Operating Systems", icon: "fa-desktop" },
        { name: "Database Systems", icon: "fa-database" },
        { name: "Computer Architecture", icon: "fa-microchip" },
        { name: "Embedded Systems", icon: "fa-robot" }
    ],
    
    skills: [
        { name: "Programming", level: 95, icons: ["fa-java", "fa-python", "fa-js"] },
        { name: "Hardware Knowledge", level: 85, icons: ["fa-microchip"] },
        { name: "Problem Solving", level: 90, icons: ["fa-brain"] },
        { name: "System Design", level: 80, icons: ["fa-sitemap"] }
    ],
    
    resources: [
        { name: "Coursera", url: "https://www.coursera.org", icon: "https://logo.clearbit.com/coursera.org" },
        { name: "edX", url: "https://www.edx.org", icon: "https://logo.clearbit.com/edx.org" },
        { name: "GitHub", url: "https://github.com", icon: "https://logo.clearbit.com/github.com" },
        { name: "LeetCode", url: "https://leetcode.com", icon: "https://logo.clearbit.com/leetcode.com" }
    ]
};

// DOM Elements
const jobList = document.getElementById('jobList');
const subjectsGrid = document.getElementById('subjectsGrid');
const skillsChart = document.getElementById('skillsChart');
const resourcesGrid = document.getElementById('resourcesGrid');
const navbar = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the page
function init() {
    loadJobs();
    loadSubjects();
    loadSkills();
    loadResources();
    setupEventListeners();
}

// Load job listings
function loadJobs() {
    jobList.innerHTML = data.jobs.map(job => `
        <div class="job-card">
            <h3><i class="fas ${job.icon}"></i> ${job.title}</h3>
            <p>${job.description}</p>
        </div>
    `).join('');
}

// Load core subjects
function loadSubjects() {
    subjectsGrid.innerHTML = data.subjects.map(subject => `
        <div class="subject-card">
            <i class="fas ${subject.icon}"></i>
            <h3>${subject.name}</h3>
        </div>
    `).join('');
}

// Load skills chart
function loadSkills() {
    skillsChart.innerHTML = data.skills.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="fas ${skill.icons[0]}"></i>
                </div>
                <div class="skill-title">${skill.name}</div>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
            <div class="skill-percent">${skill.level}%</div>
        </div>
    `).join('');
}

// Load resources
function loadResources() {
    resourcesGrid.innerHTML = data.resources.map(resource => `
        <a href="${resource.url}" target="_blank" class="resource-card">
            <div class="resource-logo">
                <img src="${resource.icon}" alt="${resource.name}">
            </div>
            <h3>${resource.name}</h3>
        </a>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('skills'));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);