document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".signup-form");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const strengthText = document.getElementById("strength-text");
    const strengthBar = document.querySelector(".password-strength .bar");

    // التحقق من قوة كلمة المرور
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const strengths = ["ضعيفة", "متوسطة", "جيدة", "قوية"];
        strengthText.textContent = `قوة كلمة المرور: ${strengths[strength]}`;
        strengthBar.style.width = `${strength * 25}%`;
        strengthBar.style.background = ["red", "orange", "yellow", "green"][strength];
    });

    // عند إرسال نموذج التسجيل
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const age = document.getElementById("age").value.trim();
        const gender = document.getElementById("gender").value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // التحقق من صحة البيانات
        if (!username || !email || !age || !gender || !password || !confirmPassword) {
            alert("يرجى ملء جميع الحقول!");
            return;
        }

        if (password !== confirmPassword) {
            alert("كلمة المرور غير متطابقة!");
            return;
        }

        if (localStorage.getItem(email)) {
            alert("البريد الإلكتروني مسجل مسبقًا!");
            return;
        }

        // حفظ البيانات في LocalStorage
        const userData = {
            username,
            email,
            age,
            gender,
            password,
            phone: "",
            profilePic: ""
        };

        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem("loggedInUser", email);

        // تحويل المستخدم إلى صفحة البروفايل
        window.location.href = "profile.html";
    });
});
