// ========================================
// 📁 البيانات الرئيسية - عدل هنا مباشرة
// ========================================

// 👑 الرتب العليا (فلوس لا نهائية)
const eliteRanks = [
    { rank: "المؤسس", name: "زورو", money: "♾️", icon: "⚔️", symbol: "♔" },
    { rank: "نائب المؤسس", name: "أيتاشي", money: "♾️", icon: "👑", symbol: "♕" },
    { rank: "اللورد", name: "توجي", money: "♾️", icon: "💀", symbol: "♖" },
    { rank: "السلطان", name: "كيلوا", money: "♾️", icon: "🫀", symbol: "♗" },
    { rank: "الستاند", name: "اينيل", money: "♾️", icon: "⚡️", symbol: "♘" }
];

// 🏰 الرتب الملكية
const royalRanks = [
    { rank: "الملك", name: "", money: "0", icon: "♠" },
    { rank: "نواب الملك", name: "", money: "0", icon: "⚡" },
    { rank: "الدوق", name: "", money: "0", icon: "🏰" },
    { rank: "نواب الدوق", name: "", money: "0", icon: "⚔️" }
];

// ⚡ الرتب الإدارية
const adminRanks = [
    { rank: "آدميرال", name: "شيرو", money: "500000", icon: "🦅" },
    { rank: "نواب آدميرال", name: "يوكي", money: "450000", icon: "🛡️" },
    { rank: "اليونكو", name: "", money: "0", icon: "🌊" },
    { rank: "العميد", name: "", money: "0", icon: "🎖️" },
    { rank: "هاشيرا", name: "", money: "0", icon: "⚡" },
    { rank: "فارس", name: "", money: "0", icon: "🏇" },
    { rank: "حامل بيرق", name: "", money: "0", icon: "🎌" },
    { rank: "حامل راية", name: "", money: "0", icon: "🚩" },
    { rank: "مشرف تدريبي", name: "اكيكو/سوكونا/أيزن", money: "100008", icon: "🎗️" },
    { rank: "مشرف تدريبي", name: "أوروتشيمارو/ثورفين", money: "100000", icon: "🎗️" }
];

// 🔤 الحروف (28 حرفاً)
const lettersData = {
    "ا": [],
    "ب": [],
    "ت": [],
    "ث": [],
    "ج": [],
    "ح": [],
    "خ": [],
    "د": [],
    "ذ": [],
    "ر": [],
    "ز": [],
    "س": [],
    "ش": [],
    "ص": [],
    "ض": [],
    "ط": [],
    "ظ": [],
    "ع": [],
    "غ": [],
    "ف": [],
    "ق": [],
    "ك": [],
    "ل": [],
    "م": [],
    "ن": [],
    "ه": [],
    "و": [],
    "ي": []
};

// ========================================
// 🎨 دوال العرض
// ========================================

// عرض الرتب العليا
function renderEliteRanks() {
    const container = document.getElementById("elite-ranks");
    if (!container) return;
    container.innerHTML = "";
    eliteRanks.forEach(item => {
        const nameDisplay = item.name && item.name.trim() !== "" ? item.name : "شاغر...";
        const card = document.createElement("div");
        card.className = "rank-card";
        card.innerHTML = `
            <div class="rank-info">
                <span class="rank-name">${item.symbol} ${item.rank} ${item.icon}</span>
                <span class="rank-title">${nameDisplay}</span>
            </div>
            <div class="rank-money">💰 ${item.money}</div>
        `;
        container.appendChild(card);
    });
}

// عرض الرتب الملكية
function renderRoyalRanks() {
    const container = document.getElementById("royal-ranks");
    if (!container) return;
    container.innerHTML = "";
    royalRanks.forEach(item => {
        const nameDisplay = item.name && item.name.trim() !== "" ? item.name : "شاغر...";
        const card = document.createElement("div");
        card.className = "rank-card";
        card.innerHTML = `
            <div class="rank-info">
                <span class="rank-name">❈￤${item.icon} ◞${item.rank} ⤶</span>
                <span class="rank-title">『 ${nameDisplay} 』</span>
            </div>
            <div class="rank-money">💰 ${item.money}</div>
        `;
        container.appendChild(card);
    });
}

// عرض الرتب الإدارية
function renderAdminRanks() {
    const container = document.getElementById("admin-ranks");
    if (!container) return;
    container.innerHTML = "";
    adminRanks.forEach(item => {
        const nameDisplay = item.name && item.name.trim() !== "" ? item.name : "شاغر...";
        const card = document.createElement("div");
        card.className = "rank-card";
        card.innerHTML = `
            <div class="rank-info">
                <span class="rank-name">❅￤${item.icon} ◞${item.rank} ￤⤶</span>
                <span class="rank-title">｢ ${nameDisplay} ｣</span>
            </div>
            <div class="rank-money">💰 ${item.money}</div>
        `;
        container.appendChild(card);
    });
}

// عرض الحروف
function renderLetters() {
    const container = document.getElementById("letters-container");
    if (!container) return;
    container.innerHTML = "";
    
    const letterList = Object.keys(lettersData);
    for (let letter of letterList) {
        const members = lettersData[letter] || [];
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter-group";
        
        if (members.length === 0) {
            letterDiv.innerHTML = `
                <div class="letter-header">
                    <span>🔤 حرف ${letter}</span>
                    <span>👥 لا يوجد أعضاء</span>
                </div>
                <div class="members-list">
                    <div class="member-item" style="justify-content:center;">➖ فارغ ➖</div>
                </div>
            `;
        } else {
            letterDiv.innerHTML = `
                <div class="letter-header">
                    <span>🔤 حرف ${letter}</span>
                    <span>👥 ${members.length} عضو</span>
                </div>
                <div class="members-list">
                    ${members.map(m => `
                        <div class="member-item">
                            <span class="member-name">🎭 ${m.name}</span>
                            <span class="member-money">💰 ${m.money}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        container.appendChild(letterDiv);
    }
}

// عرض الكل
function renderAll() {
    renderEliteRanks();
    renderRoyalRanks();
    renderAdminRanks();
    renderLetters();
}

// ========================================
// 🔐 نظام الإدارة (اختياري)
// ========================================

const ADMIN_PASSWORD = "784493479";
let isAuthenticated = false;

// إظهار إشعار
function showToast(msg) {
    let toast = document.getElementById("update-toast");
    if (toast) {
        toast.textContent = msg || "🔄 تم التحديث";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }
}

// تشغيل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    
    // زر الإدارة
    const adminBtn = document.getElementById("admin-toggle-btn");
    if (adminBtn) {
        adminBtn.onclick = () => {
            const pwd = prompt("🔐 أدخل رمز الدخول:");
            if (pwd === ADMIN_PASSWORD) {
                isAuthenticated = true;
                alert("✅ مرحباً بك في لوحة التحكم\n\nيمكنك الآن تعديل البيانات مباشرة في ملف script.js\nثم تحديث الصفحة (F5) لرؤية التغييرات");
            } else {
                alert("❌ رمز خاطئ!");
            }
        };
    }
    
    // مزامنة فورية بين المتصفحات (اختياري)
    window.addEventListener("storage", (e) => {
        if (e.key === "eliteRanks") {
            renderAll();
            showToast("🔄 تم تحديث البيانات");
        }
    });
});
