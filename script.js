// المان‌ها
const themeSelector = document.getElementById("themeSelector");
const profilePicture = document.getElementById("profilePicture");
const imagePreview = document.getElementById("imagePreview");
const generateBtn = document.getElementById("generateCardBtn");
const idCard = document.getElementById("identityCardResult");

// دکمه‌های آپلود و حذف عکس پروفایل
const uploadBtn = document.getElementById("uploadBtn");
const resetBtn = document.getElementById("resetPicBtn");

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
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.backgroundImage = "";
  }
});

// حذف تصویر پروفایل
resetBtn.addEventListener("click", () => {
  profilePicture.value = "";
  imagePreview.style.backgroundImage = "";
});

// ساخت متن کارت هویت حرفه‌ای
function buildIdentityText() {
  const formElements = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    birthDay: document.getElementById("birthDay"),
    birthMonth: document.getElementById("birthMonth"),
    birthYear: document.getElementById("birthYear"),
    occupation: document.getElementById("occupation"),
    education: document.getElementById("education"),
    skills: document.getElementById("skills"),
    languages: document.getElementById("languages"),
    interests: document.getElementById("interests"),
    lifeEvents: document.getElementById("lifeEvents"),
    lifeMotto: document.getElementById("lifeMotto"),
  };

  const name = formElements.firstName.value.trim();
  const family = formElements.lastName.value.trim();
  const day = formElements.birthDay.value.trim();
  const month = formElements.birthMonth.value.trim();
  const year = formElements.birthYear.value.trim();
  const job = formElements.occupation.value.trim();
  const degree = formElements.education.value.trim();
  const skillList = formElements.skills.value.trim();
  const langList = formElements.languages.value.trim();
  const hobbies = formElements.interests.value.trim();
  const events = formElements.lifeEvents.value.trim();
  const motto = formElements.lifeMotto.value.trim();

  return `
سلام! من ${name} ${family} هستم، متولد ${day}/${month}/${year}. از همان دوران کودکی علاقه زیادی به یادگیری داشتم.

در حال حاضر به عنوان یک ${job || "فرد فعال"} مشغول به کار هستم. تحصیلات من در زمینه ${degree || "نامشخص"} بوده و مسیر یادگیری من همیشه ادامه دارد.

مهارت‌هایی مثل ${skillList || "برنامه‌نویسی، تفکر تحلیلی"} را طی سال‌ها تجربه کسب کرده‌ام. در زبان‌هایی مثل ${langList || "فارسی، انگلیسی"} تسلط دارم و همیشه به دنبال ارتقاء توانایی‌های خود هستم.

از علایقم می‌توان به ${hobbies || "ورزش، موسیقی، طراحی"} اشاره کرد. این‌ها به من انرژی و انگیزه مضاعف می‌دهند.

در طول زندگی، تجربه‌های مهمی داشتم؛ مثل ${events || "تغییر مسیر شغلی، پروژه‌های بزرگ، و رشد فردی."} هرکدام از این‌ها باعث تقویت شخصیت و دیدگاهم نسبت به جهان شدند.

شعار من در زندگی: "${motto || 'با تلاش مداوم به موفقیت می‌رسم'}"

همیشه در مسیر رشد، یادگیری و ساختن دنیایی بهتر قدم برمی‌دارم. این منم، و این داستان هویت من است.
  `;
}

// نمایش کارت نهایی با کلیک روی دکمه
generateBtn.addEventListener("click", () => {
  const finalText = buildIdentityText();
  idCard.textContent = finalText;
  idCard.classList.remove("hidden");
});
