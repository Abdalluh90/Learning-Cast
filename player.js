// بيانات القوائم والحلقات مع صور الغلاف
const playlists = {
    "learn-english": {
        coverImage: "covers/learn-english.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/learn-english/episode${i + 1}.mp3`,
            duration: "12:00"
        }))
    },
    "design-talks": {
        coverImage: "covers/design-talks.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/design-talks/episode${i + 1}.mp3`,
            duration: "10:00"
        }))
    },
    "learn-german": {
        coverImage: "covers/learn-german.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/learn-german/episode${i + 1}.mp3`,
            duration: "11:45"
        }))
    },
    "ai-chitchat": {
        coverImage: "covers/ai-chitchat.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/ai-chitchat/episode${i + 1}.mp3`,
            duration: "14:10"
        }))
    },
    "freelance-insights": {
        coverImage: "covers/freelance-insights.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/freelance-insights/episode${i + 1}.mp3`,
            duration: "09:50"
        }))
    },
    "programming-world": {
        coverImage: "covers/programming-world.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/programming-world/episode${i + 1}.mp3`,
            duration: "13:15"
        }))
    },
    "self-development": {
        coverImage: "covers/self-development.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/self-development/episode${i + 1}.mp3`,
            duration: "10:30"
        }))
    },
    "road-to-success": {
        coverImage: "covers/road-to-success.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/road-to-success/episode${i + 1}.mp3`,
            duration: "12:20"
        }))
    },
    "learn-french": {
        coverImage: "covers/learn-french.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/learn-french/episode${i + 1}.mp3`,
            duration: "11:10"
        }))
    },
    "ask-developer": {
        coverImage: "covers/ask-developer.jpg",
        episodes: Array.from({ length: 15 }, (_, i) => ({
            title: `الحلقة ${i + 1}`,
            src: `episodes/ask-developer/episode${i + 1}.mp3`,
            duration: "10:55"
        }))
    }
};
// خريطة الأسماء الصحيحة للقوائم
const playlistNames = {
    "learn-english": "تعلم الإنجليزية",
    "design-talks": "حوارات التصميم",
    "learn-german": "تعلم الألمانية",
    "ai-chitchat": "دردشة الذكاء الاصطناعي",
    "freelance-insights": "نظرة على العمل الحر",
    "programming-world": "عالم البرمجة",
    "self-development": "التنمية الذاتية",
    "road-to-success": "طريق النجاح",
    "learn-french": "تعلم الفرنسية",
    "ask-developer": "اسأل المطور"
};


// تحميل الحلقات ديناميكيًا عند النقر على قائمة مقترحة
document.querySelectorAll('#suggested-playlists li').forEach(item => {
    item.addEventListener('click', () => {
        const playlistId = item.getAttribute('data-playlist');
        loadPlaylist(playlistId);
    });
});

function loadPlaylist(playlistId) {
    const playlistTitle = document.getElementById("playlist-title");
    const playlistContainer = document.getElementById("playlist");
    const playlistCover = document.getElementById("playlist-cover");

    if (playlists[playlistId]) {
        playlistTitle.textContent = `قائمة التشغيل: ${playlistNames[playlistId] || "قائمة غير معروفة"}`;
        playlistCover.src = playlists[playlistId].coverImage;
        playlistContainer.innerHTML = '';

        playlists[playlistId].episodes.forEach((episode, index) => {
            const li = document.createElement("li");
            li.setAttribute("data-src", episode.src);

            // إنشاء عنصر صوتي مخفي لكل حلقة لجلب مدتها
            const tempAudio = new Audio();
            tempAudio.src = episode.src;
            tempAudio.preload = "metadata"; // تحميل البيانات فقط دون التشغيل

            tempAudio.addEventListener("loadedmetadata", () => {
                const duration = formatTime(tempAudio.duration);
                li.innerHTML = `<span>${episode.title}</span> <span class="duration">(${duration})</span>`;
            });

            playlistContainer.appendChild(li);

            li.addEventListener("click", () => {
                const audio = document.getElementById("audio");
                audio.src = episode.src;
                audio.play();
                document.getElementById("play").innerHTML = '<i class="fas fa-pause"></i>';
            });
        });
    } else {
        playlistTitle.textContent = "القائمة غير موجودة";
        playlistCover.src = "covers/default.jpg";
        playlistContainer.innerHTML = '';
    }
}

// دالة تنسيق الوقت
function formatTime(time) {
    if (isNaN(time) || time === Infinity) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// وظائف مشغل الصوت
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const backwardBtn = document.getElementById("backward");
const forwardBtn = document.getElementById("forward");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    currentTime.textContent = formatTime(audio.currentTime);
}

function setProgress() {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

playBtn.addEventListener("click", togglePlay);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);

backwardBtn.addEventListener("click", () => {
    audio.currentTime -= 10;
});

forwardBtn.addEventListener("click", () => {
    audio.currentTime += 10;
});

audio.addEventListener("loadedmetadata", () => {
    totalTime.textContent = formatTime(audio.duration);
});

// تغيير وضع الظلام (Dark Mode)
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // التحقق مما إذا كان المستخدم فعّل الوضع الليلي من قبل
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // عند الضغط على الزر، يتم تفعيل أو إلغاء الوضع الليلي
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // حفظ حالة الوضع الليلي في localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️"; // تغيير الأيقونة إلى الشمس
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙"; // تغيير الأيقونة إلى القمر
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistId = urlParams.get("playlist"); // جلب اسم القائمة

    console.log("📥 القائمة المستلمة من الـ URL:", playlistId); // تأكيد القيم القادمة من الـ URL

    if (playlistId && playlists[playlistId]) {
        console.log("✅ القائمة موجودة، جاري تحميلها...");
        loadPlaylist(playlistId); // تحميل قائمة التشغيل
    } else {
        console.error("❌ القائمة غير موجودة:", playlistId);
    }
});
