// 维度数据映射
const dimensionMap = {
  'policy': 'policy-content',
  'farming': 'farming-content',
  'feed': 'feed-content',
  'processing': 'processing-content',
  'health': 'health-content',
  'system': 'system-content'
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // 隐藏加载动画
  hideLoader();
  
  // 初始化功能
  initializeCards();
  initializeBackButtons();
  initializeScrollAnimations();
  initializeStatBars();
  
  // 设置默认内容显示
  const defaultContent = document.getElementById('default-content');
  if (defaultContent) {
    defaultContent.classList.add('active');
  }
});

// 隐藏加载动画
function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 300);
  }
}

// 初始化卡片点击事件
function initializeCards() {
  const cards = document.querySelectorAll('.dimension-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const dimension = this.getAttribute('data-dimension');
      showDimensionContent(dimension);
      
      // 添加点击反馈
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
}

// 显示维度内容
function showDimensionContent(dimension) {
  // 验证维度是否存在
  if (!dimension || !dimensionMap[dimension]) {
    console.error('Invalid dimension:', dimension);
    return;
  }
  
  // 隐藏所有内容
  const allContents = document.querySelectorAll('.dimension-content');
  allContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // 显示选中的内容
  const targetContent = document.getElementById(dimensionMap[dimension]);
  if (targetContent) {
    targetContent.classList.add('active');
    
    // 滚动到内容区域
    setTimeout(() => {
      targetContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // 调整滚动位置，考虑固定导航栏
      window.scrollBy(0, -80);
    }, 100);
    
    // 触发统计条动画
    initializeStatBars();
    
    // 更新URL（不刷新页面）
    if (history.pushState) {
      history.pushState(null, null, `#${dimension}`);
    }
  } else {
    console.error('Content not found for dimension:', dimension);
  }
}

// 初始化返回按钮
function initializeBackButtons() {
  const backButtons = document.querySelectorAll('.back-btn');
  
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 隐藏所有内容
      const allContents = document.querySelectorAll('.dimension-content');
      allContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // 显示默认内容
      const defaultContent = document.getElementById('default-content');
      if (defaultContent) {
        defaultContent.classList.add('active');
      }
      
      // 滚动到维度选择区域
      const dimensionsSection = document.getElementById('dimensions');
      if (dimensionsSection) {
        dimensionsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        window.scrollBy(0, -80);
      }
    });
  });
}

// 初始化滚动动画
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // 观察所有卡片
  const cards = document.querySelectorAll('.dimension-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // 观察统计条
  const statBars = document.querySelectorAll('.stat-bar-fill');
  statBars.forEach(bar => {
    observer.observe(bar);
  });
}

// 初始化统计条动画
function initializeStatBars() {
  const statBars = document.querySelectorAll('.stat-bar-fill');
  
  statBars.forEach(bar => {
    // 只对可见的统计条进行动画
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width') || entry.target.style.width;
          entry.target.setAttribute('data-width', width);
          entry.target.style.width = '0%';
          
          // 触发动画
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(bar);
  });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // 调整滚动位置，考虑固定导航栏
      setTimeout(() => {
        window.scrollBy(0, -80);
      }, 100);
    }
  });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
  // ESC键返回
  if (e.key === 'Escape') {
    const activeContent = document.querySelector('.dimension-content.active');
    if (activeContent && activeContent.id !== 'default-content') {
      const backBtn = activeContent.querySelector('.back-btn');
      if (backBtn) {
        backBtn.click();
      }
    }
  }
});

// 添加触摸设备优化
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
  
  // 为触摸设备添加点击反馈
  const cards = document.querySelectorAll('.dimension-card');
  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
}

// 性能优化：懒加载图片（如果有的话）
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// 添加页面加载完成后的动画
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // 延迟显示卡片，创建渐进式加载效果
  const cards = document.querySelectorAll('.dimension-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});
