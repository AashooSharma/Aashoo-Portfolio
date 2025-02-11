function toggleEndDate() {
    document.getElementById("endDate").disabled = document.getElementById("currentProject").checked;
}

// 🔹 Function to Open Pop-Up
function openPopup(id) {
    document.getElementById(id).style.display = "block";
}

// 🔹 Function to Close Pop-Up
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// 🔹 Function to Show Live Image Preview
function showImagePreview() {
    let imagePathInput = document.getElementById("imagePathInput");
    let preview = document.getElementById("imagePreview");

    let imageUrl = imagePathInput.value.trim();
    if (imageUrl) {
        preview.src = imageUrl;
        preview.style.display = "block"; // Show preview
    } else {
        preview.style.display = "none"; // Hide if empty
    }
}

// 🔹 Function to Add Image Path
function addImagePath() {
    let imagePathInput = document.getElementById("imagePathInput");
    let imagePathValue = imagePathInput.value.trim();
    
    if (imagePathValue !== "") {
        let imageItem = document.createElement("li");
        imageItem.innerText = imagePathValue;
        document.getElementById("imagePathsPopup").appendChild(imageItem);

        // Add to main image paths container
        let mainImageItem = document.createElement("span");
        mainImageItem.innerText = imagePathValue;
        mainImageItem.className = "image-item";
        document.getElementById("imagePaths").appendChild(mainImageItem);

        imagePathInput.value = "";
        document.getElementById("imagePreview").style.display = "none"; // Hide preview after adding
    }
}

// 🔹 Function to Add Skill
function addSkill() {
    let skillInput = document.getElementById("skillInput");
    let skillValue = skillInput.value.trim();
    
    if (skillValue !== "") {
        let skillItem = document.createElement("li");
        skillItem.innerText = skillValue;
        document.getElementById("skillsListPopup").appendChild(skillItem);

        // Add to main skills container
        let mainSkillItem = document.createElement("span");
        mainSkillItem.innerText = skillValue;
        mainSkillItem.className = "skill-item";
        document.getElementById("skillsList").appendChild(mainSkillItem);

        skillInput.value = "";
    }
}

// 🔹 Function to Copy Project Data to Clipboard
function submitProject() {
    let skills = Array.from(document.getElementById("skillsList").children).map(skill => skill.innerText);
    let imagePaths = Array.from(document.getElementById("imagePaths").children).map(image => image.innerText);

    let projectData = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        start_date: document.getElementById("startDate").value,
        end_date: document.getElementById("currentProject").checked ? "Present" : document.getElementById("endDate").value,
        image_paths: imagePaths,
        skills: skills,
        demo_url: document.getElementById("demo_url").value.trim(),
        github_repo: document.getElementById("github_repo").value.trim()
    };

    let projectJson = JSON.stringify(projectData, null, 4);
    navigator.clipboard.writeText(projectJson)
        .then(() => alert("🚀 Project data copied to clipboard!"))
        .catch(err => alert("❌ Failed to copy data: " + err));
}
