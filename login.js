document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // التحقق من وجود المستخدم في LocalStorage
        const userData = localStorage.getItem(email);

        if (!userData) {
            alert("البريد الإلكتروني غير مسجل!");
            return;
        }

        const user = JSON.parse(userData);

        if (user.password !== password) {
            alert("كلمة المرور غير صحيحة!");
            return;
        }

        // تسجيل الدخول بنجاح
        localStorage.setItem("loggedInUser", email);
        window.location.href = "profile.html";
    });
});
