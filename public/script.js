// script.js

// Example: Add event listeners for buttons or other interactive elements

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Example: Handle "Get Started" button click in homepage
    const getStartedBtn = document.querySelector('.hero-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            alert('Getting started...');
            // You can replace alert with redirect or other actions
            window.location.href = 'dashboard.html'; // redirect to dashboard
        });
    }

    // Example: Handle "Learn More" button
    const learnMoreBtn = document.querySelectorAll('.hero-btn')[1];
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            alert('Learn more about our features.');
            // Add your action here
        });
    }
    function goToResume() {
        window.location.href = "resume_form.html";
    }
    function generateResume() {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let skills = document.getElementById("skills").value;

        // Save data
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("skills", skills);

        // Go to result page
        window.location.href = "resume_result.html";
    }
    window.onload = function () {
        if (window.location.pathname.includes("dashboard.html")) {
            let user = localStorage.getItem("loggedInUser");

            if (!user) {
                alert("Please login first!");
                window.location.href = "resume.html";
            }
        }
    };
    function saveResume() {
        let name = document.getElementById("name") ? document.getElementById("name").value : "";
        let email = document.getElementById("email") ? document.getElementById("email").value : "";
        let skills = document.getElementById("skills") ? document.getElementById("skills").value : "";
        let education = document.getElementById("education") ? document.getElementById("education").value : "";
        let experience = document.getElementById("experience") ? document.getElementById("experience").value : "";

        let user = localStorage.getItem("loggedInUser");

        let resumeData = {
            name,
            email,
            skills,
            education,
            experience
        };

        let photoElem = document.getElementById("photo");
        let file = photoElem ? photoElem.files[0] : null;

        if (file) {
            let reader = new FileReader();

            reader.onload = function () {
                resumeData.photo = reader.result;

                let resumes = JSON.parse(localStorage.getItem("resumes_" + user)) || [];
                resumes.push(resumeData);
                localStorage.setItem("resumes_" + user, JSON.stringify(resumes));

                localStorage.setItem("resume_" + user, JSON.stringify(resumeData));
                localStorage.setItem("viewResumeIndex", resumes.length - 1);

                alert("Resume Saved!");
                window.location.href = "preview.html";
            };

            reader.readAsDataURL(file);
        } else {
            resumeData.photo = null;

            let resumes = JSON.parse(localStorage.getItem("resumes_" + user)) || [];
            resumes.push(resumeData);
            localStorage.setItem("resumes_" + user, JSON.stringify(resumes));

            localStorage.setItem("resume_" + user, JSON.stringify(resumeData));
            localStorage.setItem("viewResumeIndex", resumes.length - 1);

            alert("Resume Saved!");
            window.location.href = "preview.html";
        }
    }
    function displayResume() {
        let user = localStorage.getItem("loggedInUser");
        let data = localStorage.getItem("resume_" + user);

        if (!data) return;

        let resume = JSON.parse(data);

        let outputElem = document.getElementById("resumeOutput");
        if (outputElem) {
            outputElem.innerHTML = `
            <h3>${resume.name}</h3>
            <p><b>Email:</b> ${resume.email}</p>
            <p><b>Skills:</b> ${resume.skills}</p>
            <p><b>Education:</b> ${resume.education}</p>
            <p><b>Experience:</b> ${resume.experience}</p>
        `;
        }
    }
    window.onload = function () {
        let user = localStorage.getItem("loggedInUser");

        if (!user) {
            alert("Please login first!");
            window.location.href = "resume.html";
        } else {
            displayResume();
        }
    };
    function openBuilder() {
        window.location.href = "builder.html";
    }
    // Additional scripts can be added here for dashboard interactions
});