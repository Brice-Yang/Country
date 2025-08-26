// 导航交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 移除所有active类
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据当前页面添加active类
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // 添加点击事件监听（仅用于视觉反馈，不阻止跳转）
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 允许正常跳转，不阻止默认行为
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加active类到当前点击的项
            this.classList.add('active');
        });
    });
    
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 风景区：鼠标悬停预览区联动上部分显示
    const currentImage = document.getElementById('currentImage');
    const currentTitle = document.getElementById('currentTitle');
    const currentDescription = document.getElementById('currentDescription');
    const previewItems = document.querySelectorAll('.preview-item');
    
    if (currentImage && currentTitle && currentDescription && previewItems.length > 0) {
        // 为每个预览项添加鼠标悬停事件
        previewItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const image = this.querySelector('.preview-image');
                const title = this.querySelector('h3');
                const description = this.querySelector('p');
                
                if (image && title && description) {
                    // 同步更新上部分的图片、标题和描述
                    const bgColor = window.getComputedStyle(image).getPropertyValue('background-color');
                    currentImage.style.background = bgColor || '#5a6c7d';
                    currentTitle.textContent = title.textContent;
                    currentDescription.textContent = description.textContent;
                }
            });
        });

        // 初始化：设置为第一个预览项的内容
        const firstItem = previewItems[0];
        if (firstItem) {
            const firstImage = firstItem.querySelector('.preview-image');
            const firstTitle = firstItem.querySelector('h3');
            const firstDescription = firstItem.querySelector('p');
            
            if (firstImage && firstTitle && firstDescription) {
                const bgColor = window.getComputedStyle(firstImage).getPropertyValue('background-color');
                currentImage.style.background = bgColor || '#5a6c7d';
                currentTitle.textContent = firstTitle.textContent;
                currentDescription.textContent = firstDescription.textContent;
            }
        }
    }

    // 文化库：选项卡切换功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // 移除所有active类
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 添加active类到当前选中的选项卡
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab + '-content');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});