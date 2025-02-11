document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
});

async function fetchProjects() {
    try {
        const response = await fetch('projects_database.json'); // Fetch JSON file
        const projects = await response.json(); // Convert response to JSON
        displayProjects(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

function displayProjects(projects) {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = "";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        let imageHTML = `<img src="${project.image_paths[0]}" alt="Project Image">`;

        card.innerHTML = `
            <div class="hud-frame">
                ${imageHTML}
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>📆 Duration:</strong> ${project.start_date} to ${project.end_date}</p>
                <div class="skills">
                    ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
                </div>
                <div class="links">
                    <a href="${project.demo_url}" target="_blank">🔗 Demo</a>
                    <a href="${project.github_repo}" target="_blank">💻 GitHub Repo</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}
