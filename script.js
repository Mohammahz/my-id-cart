// المان‌ها
const themeSelector = document.getElementById("themeSelector");
const profilePicture = document.getElementById("profilePicture");
const imagePreview = document.getElementById("imagePreview");
const generateBtn = document.getElementById("generateCardBtn");
const idCard = document.getElementById("identityCardResult");

// دکمه‌های آپلود و حذف عکس پروفایل
const uploadBtn = document.getElementById("uploadBtn");
const resetBtn = document.getElementById("resetPicBtn");

// دکمه جدید پاک کردن کل فرم و کارت
const clearAllBtn = document.createElement("button");
clearAllBtn.type = "button";
clearAllBtn.textContent = "پاک کردن فرم و کارت";
clearAllBtn.className = "reset-btn";
clearAllBtn.style.marginTop = "10px";
clearAllBtn.style.alignSelf = "center";
document.querySelector(".form-section form").appendChild(clearAllBtn);

// لیست همه فیلدها (حالا با شهر محل تولد)
const formElements = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  birthDay: document.getElementById("birthDay"),
  birthMonth: document.getElementById("birthMonth"),
  birthYear: document.getElementById("birthYear"),
  birthCity: null, // قرار است به صورت داینامیک اضافه شود
  occupation: document.getElementById("occupation"),
  education: document.getElementById("education"),
  skills: document.getElementById("skills"),
  languages: document.getElementById("languages"),
  interests: document.getElementById("interests"),
  lifeEvents: document.getElementById("lifeEvents"),
  lifeMotto: document.getElementById("lifeMotto"),
};

// اضافه کردن فیلد شهر محل تولد به فرم و به formElements
(function addBirthCityField() {
  const birthGroup = document.querySelector(".birthdate-group");

  // ساختار div برای فیلد جدید
  const birthCityWrapper = document.createElement("div");
  birthCityWrapper.className = "form-group";

  const label = document.createElement("label");
  label.htmlFor = "birthCity";
  label.textContent = "شهر محل تولد:";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "birthCity";
  input.placeholder = "مثلاً تهران";

  birthCityWrapper.appendChild(label);
  birthCityWrapper.appendChild(input);
  birthGroup.parentNode.insertBefore(birthCityWrapper, birthGroup.nextSibling);

  formElements.birthCity = input;
})();

// تغییر تم رنگی و ذخیره در localStorage
themeSelector.addEventListener("change", () => {
  const theme = themeSelector.value;
  document.body.className = `theme-${theme}`;
  localStorage.setItem("theme", theme);
});

// بارگذاری تم ذخیره‌شده در شروع صفحه
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "blue";
  document.body.className = `theme-${savedTheme}`;
  themeSelector.value = savedTheme;
  updateLivePreview();
});

// پیش‌نمایش تصویر پروفایل بعد از انتخاب
uploadBtn.addEventListener("click", () => {
  profilePicture.click();
});

profilePicture.addEventListener("change", () => {
  const file = profilePicture.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.style.backgroundImage = `url('${e.target.result}')`;
      updateLivePreview();
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.backgroundImage = "";
    updateLivePreview();
  }
});

// حذف تصویر پروفایل
resetBtn.addEventListener("click", () => {
  profilePicture.value = "";
  imagePreview.style.backgroundImage = "";
  updateLivePreview();
});

// ساخت متن کارت هویت حرفه‌ای
function buildIdentityText() {
  const name = formElements.firstName.value.trim();
  const family = formElements.lastName.value.trim();
  const day = formElements.birthDay.value.trim();
  const month = formElements.birthMonth.value.trim();
  const year = formElements.birthYear.value.trim();
  const city = formElements.birthCity.value.trim();
  const job = formElements.occupation.value.trim();
  const degree = formElements.education.value.trim();
  const skillList = formElements.skills.value.trim();
  const langList = formElements.languages.value.trim();
  const hobbies = formElements.interests.value.trim();
  const events = formElements.lifeEvents.value.trim();
  const motto = formElements.lifeMotto.value.trim();

  return `
سلام! من ${name} ${family} هستم، متولد ${day}/${month}/${year} در شهر ${city || "نامشخص"}. از همان دوران کودکی علاقه زیادی به یادگیری داشتم.

در حال حاضر به عنوان یک ${job || "فرد فعال"} مشغول به کار هستم. تحصیلات من در زمینه ${degree || "نامشخص"} بوده و مسیر یادگیری من همیشه ادامه دارد.

مهارت‌هایی مثل ${skillList || "برنامه‌نویسی، تفکر تحلیلی"} را طی سال‌ها تجربه کسب کرده‌ام. در زبان‌هایی مثل ${langList || "فارسی، انگلیسی"} تسلط دارم و همیشه به دنبال ارتقاء توانایی‌های خود هستم.

از علایقم می‌توان به ${hobbies || "ورزش، موسیقی، طراحی"} اشاره کرد. این‌ها به من انرژی و انگیزه مضاعف می‌دهند.

در طول زندگی، تجربه‌های مهمی داشتم؛ مثل ${events || "تغییر مسیر شغلی، پروژه‌های بزرگ، و رشد فردی."} هرکدام از این‌ها باعث تقویت شخصیت و دیدگاهم نسبت به جهان شدند.

شعار من در زندگی: "${motto || 'با تلاش مداوم به موفقیت می‌رسم'}"

همیشه در مسیر رشد، یادگیری و ساختن دنیایی بهتر قدم برمی‌دارم. این منم، و این داستان هویت من است.
  `;
}

// اعتبارسنجی فرم
function validateForm() {
  const firstName = formElements.firstName.value.trim();
  const lastName = formElements.lastName.value.trim();
  const day = formElements.birthDay.value.trim();
  const month = formElements.birthMonth.value.trim();
  const year = formElements.birthYear.value.trim();

  if (!firstName || !lastName) {
    alert("لطفاً نام و نام خانوادگی را وارد کنید.");
    return false;
  }
  if (!day || !month || !year) {
    alert("لطفاً تاریخ تولد کامل را وارد کنید.");
    return false;
  }
  if (Number(day) < 1 || Number(day) > 31 || Number(month) < 1 || Number(month) > 12) {
    alert("لطفاً تاریخ تولد را به درستی وارد کنید.");
    return false;
  }
  if (Number(year) < 1300 || Number(year) > 1500) {
    alert("سال تولد باید بین 1300 تا 1500 باشد.");
    return false;
  }
  return true;
}

// نمایش کارت با انیمیشن
function showCard(text) {
  idCard.textContent = text;
  idCard.classList.remove("animate-card", "hidden");
  void idCard.offsetWidth; // ریست انیمیشن
  idCard.classList.add("animate-card");
}


// رویداد کلیک دکمه ساخت کارت
generateBtn.addEventListener("click", () => {
  if (!validateForm()) return;

  const text = buildIdentityText();
  showCard(text);
});

// رویداد پاک کردن کل فرم و کارت
clearAllBtn.addEventListener("click", () => {
  // پاک کردن همه فیلدها
  Object.values(formElements).forEach(input => {
    if (input) input.value = "";
  });

  // حذف عکس پروفایل
  profilePicture.value = "";
  imagePreview.style.backgroundImage = "";

  // حذف کارت
  idCard.textContent = "";
  idCard.classList.add("hidden");
});

// نمایش زنده هنگام تایپ در تمام فیلدها
Object.values(formElements).forEach(input => {
  if (!input) return;
  input.addEventListener("input", updateLivePreview);
});

// همزمان با آپلود عکس کارت لایو آپدیت شود
profilePicture.addEventListener("change", updateLivePreview);
