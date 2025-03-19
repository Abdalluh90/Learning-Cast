document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 تم تحميل الصفحة بنجاح!");

    const signupForm = document.querySelector(".signup-form");

    if (!signupForm) {
        console.error("❌ لم يتم العثور على نموذج التسجيل!");
        return;
    }

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // ✅ التأكد مما إذا كان المستخدم مسجل دخول مسبقًا
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        console.log("✅ المستخدم مسجل مسبقًا، يتم تحويله إلى صفحة البروفايل...");
        window.location.href = "profile.html";
        return;
    }

    // ✅ عند إرسال النموذج
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        console.log("📌 يتم تنفيذ إرسال النموذج...");

        // 🔹 جلب القيم من الحقول
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const birthdate = document.getElementById("birthdate").value;
        const gender = document.getElementById("gender").value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        console.log("📌 التحقق من صحة البيانات...");

        // 🔹 التأكد من إدخال جميع الحقول
        if (!firstName || !lastName || !email || !phone || !birthdate || !gender || !password || !confirmPassword) {
            alert("❌ يرجى ملء جميع الحقول!");
            return;
        }

        // 🔹 التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("❌ يرجى إدخال بريد إلكتروني صالح!");
            return;
        }

        // 🔹 التحقق من صحة رقم الهاتف (10 إلى 15 رقمًا)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            alert("❌ يرجى إدخال رقم هاتف صحيح يحتوي على 10-15 رقمًا!");
            return;
        }

        // 🔹 التحقق من تطابق كلمة المرور
        if (password !== confirmPassword) {
            alert("❌ كلمة المرور غير متطابقة!");
            return;
        }

        // 🔹 التحقق مما إذا كان البريد الإلكتروني مسجل مسبقًا
        if (localStorage.getItem(email)) {
            alert("❌ البريد الإلكتروني مسجل مسبقًا!");
            return;
        }

        // ✅ تخزين بيانات المستخدم في `localStorage`
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            birthdate,
            gender,
            password,
            profilePic: "" // يمكن إضافته لاحقًا
        };

        console.log("✅ يتم حفظ بيانات المستخدم...");
        localStorage.setItem(email, JSON.stringify(userData)); // حفظ البيانات
        localStorage.setItem("loggedInUser", email); // تسجيل الدخول

        // ✅ عرض رسالة تأكيد وتحويل المستخدم إلى `profile.html`
        alert("✅ تم إنشاء الحساب بنجاح! سيتم تحويلك إلى صفحة البروفايل.");
        console.log("✅ تحويل المستخدم إلى صفحة البروفايل...");
        setTimeout(() => {
            window.location.href = "profile.html"; // التحويل بعد ثانية واحدة
        }, 1000);
    });
});
