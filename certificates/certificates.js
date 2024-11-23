// certificates.js
/*
// Function to fetch certificate data from certificates.json
async function fetchCertificatesData() {
    try {
        const response = await fetch("./certificates.json");
        const certificates = await response.json();
        return certificates;
    } catch (error) {
        console.error("Error fetching certificate data:", error);
        return [];
    }
}

// Function to display certificates on the page
async function showCertificates() {
    const certificatesContainer = document.getElementById("certificatesContainer");

    // Fetch certificate data
    const certificatesData = await fetchCertificatesData();

    // Check if there are certificates
    if (certificatesData.length === 0) {
        certificatesContainer.innerHTML = "<p>No certificates available.</p>";
        return;
    }

    // Generate HTML for each certificate
    const certificateHTML = certificatesData.map(certificate => `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/certificates/${certificate.image}.png" alt="certificate" />
            <div class="content">
                <div class="tag">
                    <h3>${certificate.name}</h3>
                </div>
                <div class="details">
                    <p><strong>Name:</strong> ${certificate.fullName}</p>
                    <p><strong>Issuing Organization:</strong> ${certificate.issuingOrganization}</p>
                    <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>
                    <p><strong>Expiration Date:</strong> ${certificate.expirationDate}</p>
                    <p><strong>Credentials ID:</strong> ${certificate.credentialsID}</p>
                    <p><strong>Credentials URL:</strong> <a href="${certificate.credentialsURL}" target="_blank">Link to Credentials</a></p>
                    <p><strong>Skills:</strong> ${certificate.skills.join(", ")}</p>
                </div>
                <div class="btns">
                    <a href="./assets/images/certificates/${certificate.image}.png" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    
                </div>
            </div>
        </div>
    `).join('');

    // Insert certificates HTML into the container
    certificatesContainer.innerHTML = certificateHTML;

    // Initialize tilt.js effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 50,
    });

    // Scroll reveal animation
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    // Reveal certificates with interval
    srtop.reveal('.certificates .box', { interval: 200 });
}

// Call the function to display certificates on page load
showCertificates();


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}
*/


  async function fetchCertificates() {
    try {
      const response = await fetch("./certificates.json");
      const certificatesData = await response.json();
      return certificatesData;
    } catch (error) {
      console.error("Error fetching certificate data:", error);
      return [];
    }
  }

  async function showCertificates(filter = "*") {
    const certificatesContainer = document.getElementById("certificatesContainer");
    const certificatesData = await fetchCertificates();

    if (certificatesData.length === 0) {
      certificatesContainer.innerHTML = "<p>No certificates available.</p>";
      return;
    }

    // Filter certificates based on the category
    const filteredCertificates = filter === "*" 
      ? certificatesData 
      : certificatesData.filter(certificate => certificate.category === filter);

    // Check if any filtered certificates exist
    if (filteredCertificates.length === 0) {
      certificatesContainer.innerHTML = "<p>No certificates available for this category.</p>";
      return;
    }

    // Generate HTML for each certificate
    const certificateHTML = filteredCertificates.map(certificate => `
      <div class="box tilt ${certificate.category}">
        <img draggable="false" src="../assets/images/certificates/${certificate.image}" alt="${certificate.name}" width="400" height="300"/>
        <div class="content">
          <div class="tag">
            <h3>${certificate.name}</h3>
          </div>
          <div class="details">
            <p><strong>Name:</strong> ${certificate.fullName}</p>
            <p><strong>Issuing Organization:</strong> ${certificate.issuingOrganization}</p>
            <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>
            <p><strong>Expiration Date:</strong> ${certificate.expirationDate}</p>
            <p><strong>Credentials ID:</strong> ${certificate.credentialsID}</p>
            <p><strong>Credentials URL:</strong> <a href="${certificate.credentialsURL}" target="_blank">Link to Credentials</a></p>
            <p><strong>Skills:</strong> ${certificate.skills.join(", ")}</p>
          </div>
          <div class="btns">
            <a href="../assets/images/certificates/${certificate.image}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;" target="_blank"><i class="fas fa-eye"></i> View</a>
          </div>
        </div>
      </div>
    `).join('');

    certificatesContainer.innerHTML = certificateHTML;

    // Scroll reveal animation
    const srtop = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 1000,
      reset: true
    });

    // Reveal certificates with interval
    srtop.reveal('.certificates .box', { interval: 200 });
  }

  // Handle filter button clicks
  document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll("#filters .btn");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("is-checked"));

        // Add active class to clicked button
        button.classList.add("is-checked");

        // Get filter category
        const filter = button.getAttribute("data-filter").replace(".", ""); // Remove dot for matching category
        showCertificates(filter === "*" ? "*" : filter);
      });
    });

    // Load all certificates by default
    showCertificates();
  });



/*
// Function to fetch certificate data from certificates.json
async function fetchCertificatesData() {
    try {
        const response = await fetch("./certificates.json");
        const certificates = await response.json();
        return certificates;
    } catch (error) {
        console.error("Error fetching certificate data:", error);
        return [];
    }
}

// Function to display certificates on the page
async function showCertificates() {
    const certificatesContainer = document.getElementById("certificatesContainer");

    // Fetch certificate data
    const certificatesData = await fetchCertificatesData();

    // Check if there are certificates
    if (certificatesData.length === 0) {
        certificatesContainer.innerHTML = "<p>No certificates available.</p>";
        return;
    }

    // Generate HTML for each certificate
    const certificateHTML = certificatesData.map(certificate => `
        <div class="grid-item ${certificate.category}">
            <div class="box tilt">
                <img draggable="false" src="./assets/images/certificates/${certificate.image}.png" alt="certificate" />
                <div class="content">
                    <div class="tag">
                        <h3>${certificate.name}</h3>
                    </div>
                    <div class="details">
                        <p><strong>Name:</strong> ${certificate.fullName}</p>
                        <p><strong>Issuing Organization:</strong> ${certificate.issuingOrganization}</p>
                        <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>
                        <p><strong>Expiration Date:</strong> ${certificate.expirationDate}</p>
                        <p><strong>Credentials ID:</strong> ${certificate.credentialsID}</p>
                        <p><strong>Credentials URL:</strong> <a href="${certificate.credentialsURL}" target="_blank">Link to Credentials</a></p>
                        <p><strong>Skills:</strong> ${certificate.skills.join(", ")}</p>
                    </div>
                    <div class="btns">
                        <a href="./assets/images/certificates/${certificate.image}.png" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Insert certificates HTML into the container
    certificatesContainer.innerHTML = certificateHTML;

    // Initialize tilt.js effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 50,
    });

    // Scroll reveal animation
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    // Reveal certificates with interval
    srtop.reveal('.certificates .box', { interval: 200 });

    // Initialize Isotope.js
    const grid = $('.grid-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
    });

    // Filter certificates based on category
    $('#filters').on('click', '.btn', function () {
        const filterValue = $(this).attr('data-filter');
        $('#filters .btn').removeClass('is-checked');
        $(this).addClass('is-checked');
        grid.isotope({ filter: filterValue });
    });
}

// Call the function to display certificates on page load
showCertificates();
*/
// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

