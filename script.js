alert("JS is working");
// =========================
// TOGGLE LOGIN / SIGNUP
// =========================
function showLogin() {
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");


if (loginForm && signupForm) {
    loginForm.style.display = "block";
    signupForm.style.display = "none";

    document.getElementById("loginBtn").classList.add("active");
    document.getElementById("signupBtn").classList.remove("active");
}


}

function showSignup() {
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");
if (loginForm && signupForm) {
    loginForm.style.display = "none";
    signupForm.style.display = "block";

    document.getElementById("signupBtn").classList.add("active");
    document.getElementById("loginBtn").classList.remove("active");
}


}

// =========================
// LOGIN FUNCTION
// =========================
function login() {
let user = document.getElementById("loginUser")?.value;
let pass = document.getElementById("loginPass")?.value;


if (user && pass) {
    alert("Login Successful!");

    localStorage.setItem("loggedInUser", user);

    window.location.href = "dashboard.html";
} else {
    alert("Please fill all fields");
}


}

// =========================
// SIGNUP FUNCTION
// =========================
function signup() {
let user = document.getElementById("signupUser")?.value;
let pass = document.getElementById("signupPass")?.value;

```
if (user && pass) {
    alert("Account Created! Now login.");

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    showLogin();
} else {
    alert("Please fill all fields");
}
```

}

// =========================
// DASHBOARD NAVIGATION
// =========================
function goToResume() {
window.location.href = "resume.html";
}

// =========================
// CHECK LOGIN (for dashboard security)
// =========================
window.onload = function () {
let currentPage = window.location.pathname;


if (currentPage.includes("dashboard.html")) {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        alert("Please login first!");
        window.location.href = "index.html";
    }
}
function showSignup() {
    console.log("Signup clicked");  // 👈 ADD THIS

    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");

    if (loginForm && signupForm) {
        loginForm.style.display = "none";
        signupForm.style.display = "block";

        document.getElementById("signupBtn").classList.add("active");
        document.getElementById("loginBtn").classList.remove("active");
    }
function generateResume() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let skills = document.getElementById("skills").value;

    let output = `
        <h2>${name}</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Skills:</b> ${skills}</p>
    `;

    document.getElementById("resumeOutput").innerHTML = output;
}
}
};
