// 取得漢堡按鈕與選單元素
const hamburgerBtn = document.getElementById('hamburger-btn');
const navTabs = document.getElementById('nav-tabs');

// 1. 點擊三條線按鈕時，切換選單顯示/隱藏
if (hamburgerBtn && navTabs) {
    hamburgerBtn.addEventListener('click', function() {
        navTabs.classList.toggle('open');
    });
}

// 取得所有帶有 .tab-link 的標籤
const tabs = document.querySelectorAll('.tab-link');
// 取得所有內容區塊
const contents = document.querySelectorAll('.tab-content');

// 1. 一般分頁按鈕的點擊事件
tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();

        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const targetId = this.getAttribute('data-target');
        contents.forEach(content => content.classList.remove('active'));
        
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        if (navTabs) {
            navTabs.classList.remove('open');
        }
    });
});

// 2. 點擊標題時，直接「模擬點擊」導覽列的首頁按鈕
const navbarTitle = document.querySelector('.navbar-title');

if (navbarTitle) {
    navbarTitle.addEventListener('click', function(e) {
        e.preventDefault();

        // 找出導覽列上的「首頁」按鈕
        const homeTab = document.querySelector('.tab-link[data-target="home-content"]');
        
        if (homeTab) {
            // 直接用程式碼觸發該按鈕的點擊事件！
            homeTab.click();
        }
    });
}