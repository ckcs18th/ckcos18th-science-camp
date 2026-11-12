// 取得漢堡按鈕與選單元素
const hamburgerBtn = document.getElementById('hamburger-btn');
const navTabs = document.getElementById('nav-tabs');

// 1. 點擊三條線按鈕時，切換選單顯示/隱藏
if (hamburgerBtn && navTabs) {
    hamburgerBtn.addEventListener('click', function() {
        navTabs.classList.toggle('open');
    });
}

// 取得所有帶有 .tab-link 的標籤與內容區塊
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

/**
 * 核心切換分頁函式
 * @param {string} tabId - 目標分頁的 ID（不含 #）
 */
function showTab(tabId) {
    // 若沒有 hash 或 hash 為空，預設導向首頁
    if (!tabId) {
        tabId = 'home';
    }

    // 關鍵修正：將 hash 對應到實際的 HTML 內容 ID (例如 brochure -> brochure-content)
    let targetId = (tabId === 'home') ? 'home-content' : (tabId + '-content');

    // 1. 切換內容區塊顯示狀態
    let matched = false;
    contents.forEach(content => {
        if (content.id === targetId) {
            content.classList.add('active');
            
            // 使用 setTimeout 讓瀏覽器先渲染 display: block，再加入 fade-in 觸發淡入動畫
            setTimeout(() => {
                content.classList.add('fade-in');
            }, 10);

            matched = true;
        } else {
            // 離開的分頁先移除淡入效果
            content.classList.remove('fade-in');
            content.classList.remove('active');
        }
    });

    // 若找不到對應區塊，預設退回首頁
    if (!matched) {
        const homeContent = document.getElementById('home-content');
        if (homeContent) homeContent.classList.add('active');
        tabId = 'home';
    }

    // 2. 切換導覽列按鈕的 active 狀態
    tabs.forEach(t => {
        const targetAttr = t.getAttribute('data-target');
        // 比對 data-target 是否符合當前分頁
        if (targetAttr === tabId || targetAttr === targetId || (tabId === 'home' && targetAttr === 'home')) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    // 同步處理首頁按鈕的獨立 ID（id="home-btn"）
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        if (tabId === 'home') {
            homeBtn.classList.add('active');
        } else {
            homeBtn.classList.remove('active');
        }
    }

    // 3. 手機版自動收合選單
    if (navTabs) {
        navTabs.classList.remove('open');
    }
}

// 監聽網址 hash 改變事件
window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1);
    showTab(hash);
});

// 頁面初次載入時，根據當前 hash 進行初始化
window.addEventListener('DOMContentLoaded', () => {
    const hash = location.hash.slice(1);
    showTab(hash);
});

// 2. 點擊標題時，導向首頁 hash
const navbarTitle = document.querySelector('.navbar-title');

if (navbarTitle) {
    navbarTitle.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = '#home';
    });
}
