document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 تم تحميل صفحة البروفايل بنجاح!");

    // التحقق مما إذا كان المستخدم مسجل الدخول
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("❌ يرجى تسجيل الدخول أولاً!");
        window.location.href = "login.html";
        return;
    }

    // جلب بيانات المستخدم من LocalStorage
    const userData = JSON.parse(localStorage.getItem(loggedInUser));

    if (!userData) {
        alert("❌ حدث خطأ في جلب بيانات المستخدم!");
        window.location.href = "login.html";
        return;
    }

    // جلب العناصر من الصفحة
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const birthdateInput = document.getElementById("birthdate");
    const genderInput = document.getElementById("gender");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const profilePicUpload = document.getElementById("profile-pic-upload");
    const profilePicPreview = document.getElementById("profile-pic-preview");

    // تعبئة الحقول ببيانات المستخدم الحالية
    firstNameInput.value = userData.firstName || "";
    lastNameInput.value = userData.lastName || "";
    emailInput.value = userData.email || "";
    phoneInput.value = userData.phone || "";
    birthdateInput.value = userData.birthdate || "";
    genderInput.value = userData.gender || "";

    if (userData.profilePic) {
        profilePicPreview.src = userData.profilePic;
    }

    // تحديث الصورة الشخصية عند الاختيار
    profilePicUpload.addEventListener("change", function () {
        const file = profilePicUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicPreview.src = e.target.result;
                userData.profilePic = e.target.result;
                localStorage.setItem(loggedInUser, JSON.stringify(userData));
            };
            reader.readAsDataURL(file);
        }
    });

    // تحديث بيانات المستخدم عند الضغط على "حفظ التعديلات"
    document.querySelector(".profile-form").addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("📌 يتم تنفيذ حفظ التعديلات...");

        // جلب البيانات الجديدة من الإدخالات
        const newFirstName = firstNameInput.value.trim();
        const newLastName = lastNameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newPhone = phoneInput.value.trim();
        const newBirthdate = birthdateInput.value;
        const newGender = genderInput.value;
        const newPassword = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            alert("❌ يرجى إدخال بريد إلكتروني صالح!");
            return;
        }

        // التحقق من صحة رقم الهاتف
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(newPhone)) {
            alert("❌ يرجى إدخال رقم هاتف صحيح يحتوي على 10-15 رقمًا!");
            return;
        }

        // التحقق من صحة كلمة المرور الجديدة (إذا تم تغييرها)
        if (newPassword && newPassword !== confirmPassword) {
            alert("❌ كلمة المرور غير متطابقة!");
            return;
        }

        // تحديث بيانات المستخدم في LocalStorage
        userData.firstName = newFirstName;
        userData.lastName = newLastName;
        userData.email = newEmail;
        userData.phone = newPhone;
        userData.birthdate = newBirthdate;
        userData.gender = newGender;

        if (newPassword) {
            userData.password = newPassword;
        }

        localStorage.setItem(loggedInUser, JSON.stringify(userData));

        alert("✅ تم تحديث البيانات بنجاح!");
    });

    // تسجيل الخروج
    window.simulateLogout = function () {
        localStorage.removeItem("loggedInUser");
        alert("✅ تم تسجيل الخروج بنجاح!");
        window.location.href = "login.html";
    };

    // حذف الحساب
    window.deleteAccount = function () {
        if (confirm("⚠️ هل أنت متأكد أنك تريد حذف الحساب؟")) {
            localStorage.removeItem(loggedInUser);
            localStorage.removeItem("loggedInUser");
            alert("✅ تم حذف الحساب بنجاح!");
            window.location.href = "signup.html";
        }
    };
});
function goToHome() {
    window.location.href = "home.html"; // استبدل "index.html" بالصفحة الرئيسية لديك
}