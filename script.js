document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                const navList = document.querySelector('.nav-list');
                const hamburger = document.querySelector('.hamburger');
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjusted offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Typewriter Effect for Hero Tagline
    const typewriterElement = document.getElementById('typewriter');
    const taglines = [
        "Analytical & Detail-Oriented Data Scientist",
        "Predictive Modeling | Machine Learning | Deep Learning",
        "Driving Business Solutions with Data-Driven Insights"
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let delayBetweenTags = 1500;

    function typeWriter() {
        const currentTagline = taglines[taglineIndex];

        if (!isDeleting) {
            typewriterElement.textContent = currentTagline.substring(0, charIndex);
            charIndex++;
            if (charIndex > currentTagline.length) {
                isDeleting = true;
                setTimeout(typeWriter, delayBetweenTags);
            } else {
                setTimeout(typeWriter, typingSpeed);
            }
        } else {
            typewriterElement.textContent = currentTagline.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                taglineIndex = (taglineIndex + 1) % taglines.length;
                charIndex = 0;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setTimeout(typeWriter, deletingSpeed);
            }
        }
    }
    typeWriter(); // Start the typewriter effect

    // Project Modal Logic
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    // Project data (can be loaded from an external JSON or directly in JS)
    const projectsData = {
        project1: {
            title: "Dynamic Digital Advertising Platform (Vision AI)",
            image: "https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=Vision+AI+Project",
            problem: "Static time-slot-based advertising lacks real-time audience engagement and relevance, leading to suboptimal ROI.",
            objective: "To design a real-time AI system for dynamic ad switching based on audience gender composition in public spaces, enhancing engagement and relevance.",
            methodology: "Integrated YOLOv8 for robust person detection and fine-tuned ResNet50V2 (converted to TFLite for lightweight deployment) for accurate gender classification. Implemented ROI-based filtering to prioritize relevant ad placements.",
            tools: "Python, OpenCV, YOLOv8, TensorFlow/Keras, ResNet50V2, TFLite.",
            outcomes: "Replaced static ads with dynamic, context-aware placements, significantly improving engagement and ad relevance. The system provides real-time insights into audience demographics, enabling data-driven advertising strategies.",
            codeLink: "https://github.com/PraveenSana" // Placeholder
        },
        project2: {
            title: "Vehicle Breakdown And Failure Prediction",
            image: "https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=Vehicle+Failure+Prediction",
            problem: "Unexpected vehicle breakdowns lead to significant operational disruptions, safety concerns, and high emergency repair costs for fleet operators.",
            objective: "To develop an Artificial Neural Network (ANN) capable of predicting vehicle component failures, thereby enabling proactive maintenance and improving fleet efficiency.",
            methodology: "Developed an ANN model trained on historical vehicle sensor data, maintenance records, and failure incidents. Features engineered included sensor readings, vehicle age, mileage, and environmental factors. The model identifies patterns indicative of impending failures.",
            tools: "Artificial Neural Network (ANN), Python, scikit-learn (for data preprocessing).",
            outcomes: "Successfully implemented a predictive maintenance system that mitigates unexpected vehicle breakdowns, significantly reducing unplanned downtime and emergency repair costs. This system contributes to improved fleet operational efficiency and enhanced safety.",
            codeLink: "https://github.com/PraveenSana" // Placeholder
        },
        project3: {
            title: "Sleep Event Detection",
            image: "https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=Sleep+Detection+ML",
            problem: "Traditional sleep quality monitoring methods are often invasive, subjective, or lack accuracy, making precise identification of sleep disorders challenging.",
            objective: "To develop and implement a machine learning system for automated detection and classification of sleep events from multi-modal physiological sensor data.",
            methodology: "Collected and preprocessed multi-modal physiological sensor data (EEG, EOG, EMG, heart rate, accelerometer). Performed comprehensive feature engineering to extract relevant patterns from the time-series data. Applied various machine learning algorithms (e.g., SVM, Random Forest, Gradient Boosting) to classify different sleep stages and events.",
            tools: "Machine Learning algorithms, Python, Pandas, NumPy, scikit-learn (for model training and evaluation), Matplotlib/Seaborn (for data visualization).",
            outcomes: "Developed a non-invasive, objective, and accurate method for sleep quality monitoring and identification of potential sleep disorders. The system provides detailed insights into sleep architecture, aiding in early diagnosis and personalized treatment plans.",
            codeLink: "https://github.com/PraveenSana" // Placeholder
        },
        project4: {
            title: "Soil Pollution-Associated Diseases Prediction",
            image: "https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=Soil+Pollution+Analysis",
            problem: "The correlation between soil pollution and regional disease incidence is complex and often goes unnoticed, posing significant public health risks.",
            objective: "To develop a machine learning model to predict disease risk associated with soil pollution patterns using historical soil quality data and environmental health statistics.",
            methodology: "Collected soil sample data, including various pollutant concentration levels, and integrated it with regional disease incidence statistics. Employed data analysis techniques to identify correlations and patterns. Built and evaluated machine learning models (Logistic Regression, Decision Trees) to predict disease risk based on pollution profiles.",
            tools: "Python, Pandas, Logistic Regression, Decision Trees, scikit-learn.",
            outcomes: "The model provides insights into the potential health impacts of specific soil pollutants and helps in identifying high-risk areas. This enables targeted public health interventions and environmental policy recommendations to mitigate the effects of soil pollution on human health.",
            codeLink: "https://github.com/PraveenSana" // Placeholder
        }
    };

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            const project = projectsData[projectId];

            if (project) {
                document.getElementById('modalProjectTitle').textContent = project.title;
                document.getElementById('modalProjectImage').src = project.image;
                document.getElementById('modalProblemStatement').textContent = project.problem;
                document.getElementById('modalObjective').textContent = project.objective;
                document.getElementById('modalMethodology').textContent = project.methodology;
                document.getElementById('modalToolsTechnologies').textContent = project.tools;
                document.getElementById('modalOutcomesImpact').textContent = project.outcomes;
                document.getElementById('modalCodeLink').href = project.codeLink;

                projectModal.style.display = 'flex'; // Show modal
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        });
    });

    closeButton.addEventListener('click', () => {
        projectModal.style.display = 'none'; // Hide modal
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    });

    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            projectModal.style.display = 'none'; // Hide modal if clicked outside
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
        }
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});