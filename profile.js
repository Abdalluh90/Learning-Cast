document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const profilePicUpload = document.getElementById("profile-pic-upload");
    const profilePicPreview = document.getElementById("profile-pic-preview");

    // جلب البريد الإلكتروني للمستخدم المسجل
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("يرجى تسجيل الدخول أولاً!");
        window.location.href = "login.html";
        return;
    }

    // جلب بيانات المستخدم من LocalStorage
    const userData = JSON.parse(localStorage.getItem(loggedInUser));

    if (userData) {
        usernameInput.value = userData.username || "";
        if (userData.profilePic) {
            profilePicPreview.src = userData.profilePic;
        }
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

    // حفظ التعديلات
    document.querySelector(".profile-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = usernameInput.value.trim();
        const newPassword = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (newPassword && newPassword !== confirmPassword) {
            alert("كلمة المرور غير متطابقة!");
            return;
        }

        userData.username = newUsername;
        if (newPassword) {
            userData.password = newPassword;
        }

        localStorage.setItem(loggedInUser, JSON.stringify(userData));
        alert("تم تحديث البيانات بنجاح!");
    });

   
    // تسجيل الخروج
    window.simulateLogout = function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    };

    // حذف الحساب
    window.deleteAccount = function () {
        if (confirm("هل أنت متأكد أنك تريد حذف الحساب؟")) {
            localStorage.removeItem(loggedInUser);
            localStorage.removeItem("loggedInUser");
            alert("تم حذف الحساب بنجاح!");
            window.location.href = "signup.html";
        }
    };
});
function goToHome() {
    window.location.href = "index.html"; // استبدل "index.html" بالصفحة الرئيسية لديك
}
