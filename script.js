// Access DOM Elements
const form = document.getElementById("infoForm");
const idCard = document.getElementById("idCard");
const profileImageInput = document.getElementById("profileImage");
const themeSelector = document.getElementById("theme");

// Listen to form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const fullName = document.getElementById("fullName").value;
  const birthday = document.getElementById("birthday").value;
  const city = document.getElementById("city").value;
  const hobbies = document.getElementById("hobbies").value;
  const description = document.getElementById("description").value;

  // Load profile image
  const reader = new FileReader();
  reader.onload = function () {
    const imgURL = reader.result;

    // Create ID card content
    idCard.innerHTML = `
      <img src="${imgURL}" alt="Profile Image">
      <p><strong>سلام! من ${fullName} هستم.</strong></p>
      <p>من در ${birthday} به دنیا آمدم و در شهر زیبای ${city} زندگی می‌کنم. از کودکی همیشه عاشق یادگیری و کشف چیزهای جدید بودم. علاقه‌م به ${hobbies} باعث شده که زندگی‌ام پر از لحظات شاد، انگیزه‌بخش و هدفمند باشد.</p>
      <p>${description}</p>
      <p>با پشتکار، امید، و تلاش همیشگی در مسیر رشد فردی و حرفه‌ای‌ام قدم برمی‌دارم. باور دارم که هر فردی می‌تونه قهرمان داستان خودش باشه، فقط باید جرئت شروع داشته باشه.</p>
    `;
    idCard.classList.remove("hidden");
  };

  // Read profile image if selected
  if (profileImageInput.files[0]) {
    reader.readAsDataURL(profileImageInput.files[0]);
  } else {
    // No image provided
    idCard.innerHTML = `
      <p><strong>سلام! من ${fullName} هستم.</strong></p>
      <p>من در ${birthday} به دنیا آمدم و در شهر زیبای ${city} زندگی می‌کنم. از کودکی همیشه عاشق یادگیری و کشف چیزهای جدید بودم. علاقه‌م به ${hobbies} باعث شده که زندگی‌ام پر از لحظات شاد، انگیزه‌بخش و هدفمند باشد.</p>
      <p>${description}</p>
      <p>با پشتکار، امید، و تلاش همیشگی در مسیر رشد فردی و حرفه‌ای‌ام قدم برمی‌دارم. باور دارم که هر فردی می‌تونه قهرمان داستان خودش باشه، فقط باید جرئت شروع داشته باشه.</p>
    `;
    idCard.classList.remove("hidden");
  }
});

// Theme change
themeSelector.addEventListener("change", function () {
  const theme = themeSelector.value;
  document.body.className = ""; // Reset class
  document.body.classList.add(`theme-${theme}`);
});
