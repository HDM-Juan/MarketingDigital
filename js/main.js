// Main JavaScript file for the Hospital del Móvil application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hospital del Móvil - Página cargada correctamente');

    const lessonCards = document.querySelectorAll('.chapter-card');
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.curso-progress p:last-child');
    const totalLessons = lessonCards.length;
    let completedLessons = 0;

    // Load progress from local storage
    function loadProgress() {
        const progress = JSON.parse(localStorage.getItem('lessonProgress')) || [];
        completedLessons = progress.length;

        progress.forEach(lessonId => {
            const lessonCard = document.querySelector(`[onclick="window.open('Curso-${lessonId}.html', '_blank')"]`);
            if (lessonCard) {
                lessonCard.classList.add('completed');
            }
        });

        updateProgress();
    }

    // Update progress bar and text
    function updateProgress() {
        const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        if (progressText) {
            progressText.innerHTML = `<strong>✅ ${completedLessons}/${totalLessons} Lecciones Completadas</strong> | Resumen y Glosario Incluidos`;
        }
    }

    // Mark a lesson as completed
    function completeLesson(lessonId) {
        let progress = JSON.parse(localStorage.getItem('lessonProgress')) || [];
        if (!progress.includes(lessonId)) {
            progress.push(lessonId);
            localStorage.setItem('lessonProgress', JSON.stringify(progress));
            completedLessons = progress.length;
            updateProgress();
        }
    }

    // Add event listeners to lesson cards
    lessonCards.forEach(card => {
        const lessonLink = card.getAttribute('onclick');
        const lessonIdMatch = lessonLink.match(/Curso-(\d+(-\d+)?)\.html/);
        if (lessonIdMatch) {
            const lessonId = lessonIdMatch[1];
            card.addEventListener('click', () => {
                completeLesson(lessonId);
                card.classList.add('completed');
            });
        }
    });

    // Function to change between tabs
    window.showTab = function(tabName) {
        // Hide all tabs
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all buttons
        const allButtons = document.querySelectorAll('.tab-button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Show the selected tab
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Add active class to the corresponding button
        if (event) {
            const clickedButton = event.target;
            clickedButton.classList.add('active');
        }
    }

    // Ensure the first tab is active on load
    const firstTab = document.getElementById('estudios');
    const firstButton = document.querySelector('.tab-button');

    if (firstTab) {
        firstTab.classList.add('active');
    }
    if (firstButton) {
        firstButton.classList.add('active');
    }

    // Initial load of progress
    loadProgress();

    // Request Form
    const requestForm = document.getElementById('request-form');
    const requestInput = document.getElementById('request-input');
    const requestList = document.getElementById('requests');

    // Load requests from local storage
    function loadRequests() {
        const requests = JSON.parse(localStorage.getItem('userRequests')) || [];
        requests.forEach(request => {
            addRequestToList(request);
        });
    }

    // Add request to the list
    function addRequestToList(request) {
        const li = document.createElement('li');
        li.textContent = request;
        if (requestList) {
            requestList.appendChild(li);
        }
    }

    // Handle form submission
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newRequest = requestInput.value.trim();
            if (newRequest) {
                let requests = JSON.parse(localStorage.getItem('userRequests')) || [];
                requests.push(newRequest);
                localStorage.setItem('userRequests', JSON.stringify(requests));
                addRequestToList(newRequest);
                requestInput.value = '';
            }
        });
    }

    // Initial load of requests
    loadRequests();
});
