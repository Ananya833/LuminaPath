
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});


window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    loadMentors();
};


const mentors = [
    { name: "John Doe", expertise: "Software Development", rating: 4.8, reviews: [] },
    { name: "Jane Smith", expertise: "Data Science", rating: 4.5, reviews: [] },
    { name: "Alice Johnson", expertise: "UI/UX Design", rating: 4.7, reviews: [] },
    { name: "Michael Brown", expertise: "Cybersecurity", rating: 4.6, reviews: [] },
    { name: "Emma Wilson", expertise: "Machine Learning", rating: 4.9, reviews: [] },
];


const mentorList = document.getElementById("mentor-list");
function loadMentors() {
    mentorList.innerHTML = "";
    mentors.forEach((mentor, index) => {
        const mentorCard = document.createElement("div");
        mentorCard.classList.add("mentor-card");
        mentorCard.innerHTML = `
            <h3>${mentor.name}</h3>
            <p><strong>Expertise:</strong> ${mentor.expertise}</p>
            <p><strong>Rating:</strong> ⭐${mentor.rating}</p>
            <div class="mentor-buttons">
                <button class="select-mentor" data-index="${index}">Select Mentor</button>
                <button class="rate-mentor" data-index="${index}">Rate Mentor</button>
            </div>
        `;
        mentorList.appendChild(mentorCard);
    });

    document.querySelectorAll(".rate-mentor").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            rateMentor(index);
        });
    });
}




function rateMentor(index) {
    const rating = prompt("Rate this mentor (1-5 stars):");
    if (rating >= 1 && rating <= 5) {
        mentors[index].reviews.push(parseFloat(rating));
        mentors[index].rating = (mentors[index].reviews.reduce((a, b) => a + b, 0) / mentors[index].reviews.length).toFixed(1);
        loadMentors();
    } else {
        alert("Please enter a valid rating between 1 and 5.");
    }
}
