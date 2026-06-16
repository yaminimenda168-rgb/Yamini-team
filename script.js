// LocalStorage helpers
function getStudents() {
    const data = localStorage.getItem('students');
    return data ? JSON.parse(data) : [];
}

// ==========================================
// TASK 1: Show/Hide Password functionality
// ==========================================
const toggleBtns = document.querySelectorAll('.toggle-password');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const passwordInput = this.parentElement.querySelector('input');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.textContent = '🔒 Hide';
        } else {
            passwordInput.type = 'password';
            this.textContent = '👁️ Show';
        }
    });
});

// ==========================================
// Handling Multi-page Form submissions
// ==========================================

// --- SIGNUP LOGIC ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        let students = getStudents();

        // Validation rule check
        if (students.some(s => s.email === email)) {
            alert('Email already registered!');
            return;
        }

        students.push({ name, email, password });
        localStorage.setItem('students', JSON.stringify(students));
        
        alert('Signup Successful!');
        window.location.href = 'login.html'; // Redirecting to login page
    });
}

// --- LOGIN LOGIC ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const students = getStudents();
        const user = students.find(s => s.email === email && s.password === password);

        if (user) {
            // Store current session user name
            localStorage.setItem('currentUser', user.name);
            window.location.href = 'dashboard.html'; // Redirecting to dashboard
        } else {
            alert('Invalid credentials!');
        }
    });
}

// ==========================================
// TASK 2: Total Count Rendering in Dashboard
// ==========================================
const countDisplay = document.getElementById('total-students-count');
if (countDisplay) {
    // 1. Show dynamic user greeting
    const loggedInUser = localStorage.getItem('currentUser') || 'Student';
    document.getElementById('user-display-name').textContent = loggedInUser;

    // 2. Load and set count dynamic text length
    const studentsList = getStudents();
    countDisplay.textContent = studentsList.length;
}

// --- LOGOUT LOGIC ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}