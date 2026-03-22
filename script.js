// Default Data Structure
const defaultData = {
    sparta: [
        { rank: "المؤسس", name: "زورو", money: "♾️" },
        { rank: "نائب المؤسس", name: "ايتاشي", money: "♾️" },
        { rank: "اللورد", name: "توجي", money: "♾️" },
        { rank: "نواب اللورد", name: "كيلوا", money: "♾️" },
        { rank: "نواب اللورد", name: "", money: "♾️" },
        { rank: "السلطان", name: "اينيل", money: "♾️" },
        { rank: "الدوق", name: "", money: "♾️" },
        { rank: "نواب الدوق", name: "", money: "♾️" },
        { rank: "نواب الدوق", name: "", money: "♾️" },
        { rank: "نواب الدوق", name: "", money: "♾️" }
    ],
    sayko: [
        { rank: "الأدميرال", name: "", money: "﴿🕸﴾" },
        { rank: "نائب الأدميرال", name: "", money: "﴿🕸﴾" },
        { rank: "العميد", name: "", money: "﴿🕸﴾" },
        { rank: "التشيبوكاي", name: "", money: "﴿🕸﴾" },
        { rank: "الملازم", name: "", money: "﴿🕸﴾" },
        { rank: "حامل بريق", name: "", money: "﴿🕸﴾" },
        { rank: "حامل راية", name: "", money: "﴿🕸﴾" },
        { rank: "مشرف متدرب", name: "", money: "" }
    ],
    letters: {
        // كل حرف يحتوي على قائمة من الأعضاء
        "`• ألف •`": [],
        "`• باء •`": [],
        "`• تاء •`": [],
        "`• جيم •`": [],
        "`• دال •`": [],
        "`• راء •`": [],
        "`• زال •`": [],
        "`• سين •`": [],
        "`• قاف •`": [],
        "`• كاف •`": [],
        "`• لام •`": [],
        "`• ميم •`": [],
        "`• نون •`": [],
        "`• هاء •`": [],
        "`• واو •`": [],
        "`• ياء •`": []
    }
};

// إضافة بعض الأعضاء الافتراضية للحروف
defaultData.letters["`• ألف •`"] = [];
defaultData.letters["`• باء •`"] = [];
defaultData.letters["`• تاء •`"] = [];

// Load or initialize localStorage
function loadData() {
    let stored = localStorage.getItem("RitzBankDataV2");
    if (!stored) {
        localStorage.setItem("RitzBankDataV2", JSON.stringify(defaultData));
        return JSON.parse(JSON.stringify(defaultData));
    }
    return JSON.parse(stored);
}

let bankData = loadData();

// قائمة الحروف للمنيو المنسدل
const letterList = [
    "`• ألف •`", "`• باء •`", "`• تاء •`", "`• جيم •`", "`• دال •`",
    "`• راء •`", "`• زال •`", "`• سين •`", "`• قاف •`", "`• كاف •`",
    "`• لام •`", "`• ميم •`", "`• نون •`", "`• هاء •`", "`• واو •`", "`• ياء •`"
];

// Render functions
function renderAll() {
    renderSparta();
    renderSayko();
    renderLetters();
    updateRankSelect();
}

function renderSparta() {
    const container = document.getElementById("sparta-ranks-container");
    if (!container) return;
    container.innerHTML = "";
    bankData.sparta.forEach(item => {
        const displayName = item.name && item.name.trim() !== "" ? item.name : "➖ فارغ ➖";
        const card = document.createElement("div");
        card.className = "rank-card";
        card.innerHTML = `
            <div class="rank-info">
                <span class="rank-name">✦ ${item.rank}</span>
                <span class="rank-title">${displayName}</span>
            </div>
            <div class="rank-money">💰 ${item.money}</div>
        `;
        container.appendChild(card);
    });
}

function renderSayko() {
    const container = document.getElementById("sayko-ranks-container");
    if (!container) return;
    container.innerHTML = "";
    bankData.sayko.forEach(item => {
        const displayName = item.name && item.name.trim() !== "" ? item.name : "➖ شاغر ➖";
        const card = document.createElement("div");
        card.className = "rank-card";
        card.innerHTML = `
            <div class="rank-info">
                <span class="rank-name">✦ ${item.rank}</span>
                <span class="rank-title">${displayName}</span>
            </div>
            <div class="rank-money">💰 ${item.money}</div>
        `;
        container.appendChild(card);
    });
}

function renderLetters() {
    const container = document.getElementById("letters-container");
    if (!container) return;
    container.innerHTML = "";
    
    for (const [letterName, members] of Object.entries(bankData.letters)) {
        if (members.length === 0) {
            // عرض الحرف بدون أعضاء
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "letter-group";
            emptyDiv.innerHTML = `
                <div class="letter-header">
                    <span class="letter-name">✦ ${letterName}</span>
                    <span class="letter-count">👥 لا يوجد أعضاء</span>
                </div>
                <div class="members-list">
                    <div class="member-item" style="opacity:0.6;">
                        <span class="member-name">➖ لا يوجد أعضاء ➖</span>
                    </div>
                </div>
            `;
            container.appendChild(emptyDiv);
        } else {
            const letterDiv = document.createElement("div");
            letterDiv.className = "letter-group";
            letterDiv.innerHTML = `
                <div class="letter-header">
                    <span class="letter-name">✦ ${letterName}</span>
                    <span class="letter-count">👥 ${members.length} عضو/أعضاء</span>
                </div>
                <div class="members-list" id="members-${letterName.replace(/[`•\s]/g, '')}">
                </div>
            `;
            const membersList = letterDiv.querySelector(`.members-list`);
            members.forEach((member, idx) => {
                const memberItem = document.createElement("div");
                memberItem.className = "member-item";
                memberItem.innerHTML = `
                    <span class="member-name">🎭 ${member.name}</span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span class="member-money">💰 ${member.money}</span>
                        <button class="delete-member" data-letter="${letterName}" data-index="${idx}">🗑️ حذف</button>
                    </div>
                `;
                membersList.appendChild(memberItem);
            });
            container.appendChild(letterDiv);
        }
    }
    
    // إضافة حدث الحذف
    document.querySelectorAll('.delete-member').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const letter = btn.dataset.letter;
            const index = parseInt(btn.dataset.index);
            if (bankData.letters[letter] && bankData.letters[letter][index]) {
                bankData.letters[letter].splice(index, 1);
                saveFullData(bankData);
            }
        });
    });
}

function updateRankSelect() {
    const sectionSelect = document.getElementById("admin-section");
    const rankSelect = document.getElementById("admin-rank-select");
    const repeatField = document.getElementById("admin-repeat");
    
    if (!rankSelect) return;
    
    const section = sectionSelect.value;
    rankSelect.innerHTML = '<option value="">-- اختر من القائمة --</option>';
    
    if (section === "sparta") {
        repeatField.style.display = "none";
        bankData.sparta.forEach(item => {
            const option = document.createElement("option");
            option.value = item.rank;
            option.textContent = item.rank;
            rankSelect.appendChild(option);
        });
    } else if (section === "sayko") {
        repeatField.style.display = "none";
        bankData.sayko.forEach(item => {
            const option = document.createElement("option");
            option.value = item.rank;
            option.textContent = item.rank;
            rankSelect.appendChild(option);
        });
    } else if (section === "letters") {
        repeatField.style.display = "flex";
        letterList.forEach(letter => {
            const option = document.createElement("option");
            option.value = letter;
            option.textContent = letter;
            rankSelect.appendChild(option);
        });
    }
}

function saveFullData(newData) {
    bankData = newData;
    localStorage.setItem("RitzBankDataV2", JSON.stringify(bankData));
    renderAll();
}

// إضافة عضو جديد
function addMember(section, rankValue, memberName, memberMoney, repeatCount = 1) {
    if (section === "sparta") {
        const index = bankData.sparta.findIndex(item => item.rank === rankValue);
        if (index !== -1) {
            bankData.sparta[index].name = memberName;
            bankData.sparta[index].money = memberMoney;
            saveFullData(bankData);
            return true;
        }
    } else if (section === "sayko") {
        const index = bankData.sayko.findIndex(item => item.rank === rankValue);
        if (index !== -1) {
            bankData.sayko[index].name = memberName;
            bankData.sayko[index].money = memberMoney;
            saveFullData(bankData);
            return true;
        }
    } else if (section === "letters") {
        if (!bankData.letters[rankValue]) {
            bankData.letters[rankValue] = [];
        }
        // إضافة عدد التكرار
        for (let i = 0; i < repeatCount; i++) {
            bankData.letters[rankValue].push({
                name: memberName + (repeatCount > 1 && i > 0 ? ` ${i+1}` : ""),
                money: memberMoney
            });
        }
        saveFullData(bankData);
        return true;
    }
    return false;
}

// Modal and UI events
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    
    const modal = document.getElementById("admin-modal");
    const openBtn = document.getElementById("admin-toggle-btn");
    const closeSpan = document.querySelector(".close-modal");
    const addBtn = document.getElementById("add-member-btn");
    
    const sectionSelect = document.getElementById("admin-section");
    const rankSelect = document.getElementById("admin-rank-select");
    const nameInput = document.getElementById("admin-name");
    const moneyInput = document.getElementById("admin-money");
    const repeatInput = document.getElementById("admin-repeat");
    
    function openModal() {
        modal.style.display = "flex";
        updateRankSelect();
    }
    function closeModal() {
        modal.style.display = "none";
        nameInput.value = "";
        moneyInput.value = "♾️";
        repeatInput.value = "1";
    }
    
    openBtn.onclick = openModal;
    closeSpan.onclick = closeModal;
    window.onclick = function(e) {
        if (e.target === modal) closeModal();
    };
    
    sectionSelect.onchange = () => {
        updateRankSelect();
    };
    
    addBtn.onclick = () => {
        const section = sectionSelect.value;
        const rankVal = rankSelect.value;
        const memberName = nameInput.value.trim();
        const memberMoney = moneyInput.value.trim() || "♾️";
        const repeatCount = parseInt(repeatInput.value) || 1;
        
        if (!rankVal) {
            alert("⚠️ الرجاء اختيار الرتبة أو الحرف من القائمة");
            return;
        }
        
        if (!memberName) {
            alert("⚠️ الرجاء إدخال الاسم/اللقب");
            return;
        }
        
        const success = addMember(section, rankVal, memberName, memberMoney, repeatCount);
        
        if (success) {
            alert(`✅ تم إضافة "${memberName}" بنجاح`);
            nameInput.value = "";
            moneyInput.value = "♾️";
            repeatInput.value = "1";
            closeModal();
        } else {
            alert("❌ حدث خطأ في الإضافة");
        }
    };
});
