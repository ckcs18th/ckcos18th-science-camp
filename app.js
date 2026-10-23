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

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault(); // 防止超連結預設的跳轉行為

        // 1. 移除所有標籤的 active 樣式
        tabs.forEach(t => t.classList.remove('active'));
        
        // 2. 將被點擊的標籤加上 active 樣式
        this.classList.add('active');

        // 3. 取得要顯示的目標區塊 ID
        const targetId = this.getAttribute('data-target');

        // 4. 隱藏所有內容區塊
        contents.forEach(content => content.classList.remove('active'));
        
        // 5. 顯示對應的內容區塊
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // 6. 【新增】在手機版點選完分頁後，自動收合漢堡選單
        if (navTabs) {
            navTabs.classList.remove('open');
        }
    });
});