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
  initializeToolkit();
  initializeBusinessToolkit();
  
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

// 互动反馈处理（仅本地存储）
function handleInteraction(topic, action) {
  const storageKey = `interaction_${topic}_${action}`;
  const current = parseInt(localStorage.getItem(storageKey) || '0', 10);
  localStorage.setItem(storageKey, String(current + 1));

  const feedbackEl = document.getElementById(`${topic}-feedback`);
  if (feedbackEl) {
    feedbackEl.textContent = '已收到你的观点，感谢参与！';
  }
}

// 头部快速投票
function handleQuickPoll(dimension) {
  showDimensionContent(dimension);

  const feedbackEl = document.getElementById('quick-feedback');
  if (feedbackEl) {
    feedbackEl.textContent = '感谢你的选择，已为你跳转到相关内容。';
  }
}

// 风味工具包
function initializeToolkit() {
  const evaluateBtn = document.getElementById('toolkit-evaluate');
  const resetBtn = document.getElementById('toolkit-reset');
  const copyBtn = document.getElementById('toolkit-copy');
  const saveBtn = document.getElementById('toolkit-save');
  const resultBox = document.getElementById('toolkit-result');
  const tasteBtn = document.getElementById('taste-evaluate');
  const channelBtn = document.getElementById('channel-evaluate');
  const costBtn = document.getElementById('cost-evaluate');

  if (!evaluateBtn || !resultBox) {
    return;
  }

  const checkboxes = Array.from(document.querySelectorAll('.checklist input[type="checkbox"]'));

  const updateResult = () => {
    const total = checkboxes.length;
    const checked = checkboxes.filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);

    let stage = '基础阶段';
    let suggestions = [
      '先建立原奶风味检测与微生物检测的固定频次。',
      '优先把饲料配比与热处理参数做成可追溯记录。',
      '建立一套简单的内部品鉴记录表。'
    ];

    if (checked >= 4 && checked <= 6) {
      stage = '进阶阶段';
      suggestions = [
        '每月复盘一次风味波动原因（饲料/温度/运输）。',
        '完善关键工序 SOP 与人员培训，减少香气波动。',
        '建立冷链温度偏差的纠偏机制。'
      ];
    }

    if (checked >= 7) {
      stage = '成熟阶段';
      suggestions = [
        '建立原料风味评分与成品风味对应关系。',
        '为不同产品制定“风味目标曲线”。',
        '用“清爽/黄油/坚果/发酵”等风味标签做传播。'
      ];
    }

    resultBox.innerHTML = `
      <p><strong>完成度：</strong>${checked}/${total}（${percent}%）</p>
      <p><strong>阶段判断：</strong>${stage}</p>
      <p><strong>行动建议：</strong></p>
      <ul>
        ${suggestions.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  };

  evaluateBtn.addEventListener('click', updateResult);

  resetBtn?.addEventListener('click', () => {
    checkboxes.forEach(cb => { cb.checked = false; });
    resultBox.innerHTML = '<p>已清空，请重新选择后生成结果。</p>';
  });

  copyBtn?.addEventListener('click', async () => {
    const text = resultBox.innerText;
    try {
      await navigator.clipboard.writeText(text);
      resultBox.insertAdjacentHTML('beforeend', '<p>✅ 已复制到剪贴板</p>');
    } catch (err) {
      resultBox.insertAdjacentHTML('beforeend', '<p>⚠️ 复制失败，请手动复制</p>');
    }
  });

  saveBtn?.addEventListener('click', () => {
    localStorage.setItem('flavor_toolkit_result', resultBox.innerText);
    resultBox.insertAdjacentHTML('beforeend', '<p>💾 已保存到本地</p>');
  });

  tasteBtn?.addEventListener('click', () => {
    const scene = document.getElementById('taste-scene')?.value || 'daily';
    const focus = document.getElementById('taste-focus')?.value || 'fresh';
    const supply = document.getElementById('taste-supply')?.value || 'local';
    const usp = document.getElementById('taste-usp')?.value || 'taste';
    const output = document.getElementById('taste-result');

    const sceneMap = {
      daily: '直接饮用',
      coffee: '咖啡/茶饮',
      baking: '烘焙/料理',
      fitness: '低脂/控糖'
    };
    const focusMap = {
      fresh: '清爽干净',
      protein: '顺滑厚度',
      lowfat: '轻盈低脂',
      price: '稳定一致'
    };
    const supplyMap = {
      local: '冷藏短链',
      cold: '全程冷链',
      shelf: '常温储存',
      mix: '混合模式'
    };
    const uspMap = {
      taste: '黄油奶香',
      safe: '清新奶香',
      green: '发酵香',
      local: '坚果香'
    };

    const positioning = `主打 ${sceneMap[scene]} 场景，聚焦 ${focusMap[focus]}，采用 ${supplyMap[supply]} 方案。`;
    const oneLiner = `一句话描述：${uspMap[usp]} + ${sceneMap[scene]}需求，强调风味稳定。`;

    if (output) {
      output.innerHTML = `
        <p><strong>风味方向：</strong>${positioning}</p>
        <p><strong>建议重点：</strong>围绕目标风味做 1-2 个稳定配方。</p>
        <p><strong>${oneLiner}</strong></p>
      `;
    }
  });

  channelBtn?.addEventListener('click', () => {
    const city = document.getElementById('channel-city')?.value || 'tier2';
    const audience = document.getElementById('channel-audience')?.value || 'family';
    const budget = document.getElementById('channel-budget')?.value || 'mid';
    const output = document.getElementById('channel-result');

    const flavorSets = {
      tier1: ['清爽型风味', '轻度奶香', '冷藏表现'],
      tier2: ['均衡型风味', '轻度熟香', '常温稳定'],
      tier3: ['酸香/发酵风味', '柔和口感', '菌种突出'],
      county: ['熟成风味', '坚果香', '质地更紧实']
    };

    const audienceBoost = {
      family: ['清爽干净', '低异味'],
      young: ['黄油奶香', '更浓郁'],
      elder: ['柔和稳定', '不过刺激'],
      b2b: ['发酵香', '可配餐']
    };

    const budgetTips = {
      low: '优先保证基础风味稳定，再逐步加深香气。',
      mid: '可以调整脂肪比例与热处理参数做风味优化。',
      high: '可尝试多款菌种与熟成方案，形成差异化。'
    };

    const base = flavorSets[city] || flavorSets.tier2;
    const extra = audienceBoost[audience] || [];
    const channels = Array.from(new Set([...base, ...extra])).slice(0, 5);

    if (output) {
      output.innerHTML = `
        <p><strong>推荐风味组合：</strong>${channels.join('、')}</p>
        <p><strong>优先级：</strong>先稳定基础风味，再做强化与延展。</p>
        <p><strong>优化建议：</strong>${budgetTips[budget]}</p>
      `;
    }
  });

  costBtn?.addEventListener('click', () => {
    const fat = parseFloat(document.getElementById('cost-cows')?.value || '0');
    const temp = parseFloat(document.getElementById('cost-tonnage')?.value || '0');
    const product = document.getElementById('cost-product')?.value || 'fresh';
    const pain = document.getElementById('cost-pain')?.value || 'energy';
    const output = document.getElementById('cost-result');

    const productTips = {
      fresh: '保持巴氏温度与时间稳定，保留清爽香。',
      uht: '注意高温带来的熟香与焦糖感。',
      yogurt: '优化菌种与发酵时长，增强层次。',
      mix: '针对熟成时间与盐度做更细分控制。'
    };
    const painTips = {
      energy: '提升脂肪比例或优化热处理，增加奶香。',
      loss: '减少过度稀释，关注蛋白与脂肪平衡。',
      logistics: '排查饲料与冷链异味来源。',
      labor: '建立关键参数记录，减少批次波动。'
    };
    const fatTip = fat >= 4.0 ? '脂肪偏高，奶香更浓。' : fat >= 3.5 ? '脂肪适中，风味平衡。' : '脂肪偏低，奶香可能较弱。';
    const tempTip = temp >= 90 ? '温度偏高，熟香更明显。' : temp >= 72 ? '温度适中，兼顾香气与安全。' : temp > 0 ? '温度偏低，香气更接近原奶。' : '请填写合理的热处理温度。';

    if (output) {
      output.innerHTML = `
        <p><strong>脂肪判断：</strong>${fatTip}</p>
        <p><strong>温度判断：</strong>${tempTip}</p>
        <p><strong>产品侧重点：</strong>${productTips[product]}</p>
        <p><strong>优先优化项：</strong>${painTips[pain]}</p>
      `;
    }
  });
}

// 中小乳企经营工具
function initializeBusinessToolkit() {
  const tasteBtn = document.getElementById('biz-taste-evaluate');
  const channelBtn = document.getElementById('biz-channel-evaluate');
  const costBtn = document.getElementById('biz-cost-evaluate');

  tasteBtn?.addEventListener('click', () => {
    const scene = document.getElementById('biz-taste-scene')?.value || 'daily';
    const focus = document.getElementById('biz-taste-focus')?.value || 'fresh';
    const supply = document.getElementById('biz-taste-supply')?.value || 'local';
    const usp = document.getElementById('biz-taste-usp')?.value || 'taste';
    const output = document.getElementById('biz-taste-result');

    const sceneMap = {
      daily: '家庭日常',
      coffee: '咖啡/茶饮',
      baking: '烘焙/餐饮',
      fitness: '健身/控糖'
    };
    const focusMap = {
      fresh: '新鲜口感',
      protein: '高蛋白营养',
      lowfat: '低脂低糖',
      price: '性价比'
    };
    const supplyMap = {
      local: '本地短链',
      cold: '冷链配送',
      shelf: '常温仓储',
      mix: '混合模式'
    };
    const uspMap = {
      taste: '香浓风味',
      safe: '安全可追溯',
      green: '低碳环保',
      local: '产地本地故事'
    };

    if (output) {
      output.innerHTML = `
        <p><strong>定位方向：</strong>主打 ${sceneMap[scene]} 场景，聚焦 ${focusMap[focus]}，采用 ${supplyMap[supply]} 供应。</p>
        <p><strong>产品建议：</strong>聚焦 1-2 个核心 SKU，避免过度分散。</p>
        <p><strong>一句话卖点：</strong>${uspMap[usp]} + ${sceneMap[scene]}需求，强调稳定与可靠。</p>
      `;
    }
  });

  channelBtn?.addEventListener('click', () => {
    const city = document.getElementById('biz-channel-city')?.value || 'tier2';
    const audience = document.getElementById('biz-channel-audience')?.value || 'family';
    const budget = document.getElementById('biz-channel-budget')?.value || 'mid';
    const output = document.getElementById('biz-channel-result');

    const channelSets = {
      tier1: ['商超/精品店', '即时零售', '社区团购', '内容电商'],
      tier2: ['商超/便利店', '社区团购', '本地生活平台', '母婴渠道'],
      tier3: ['本地商超', '经销/批发', '社区团购', '校园/企事业'],
      county: ['经销/批发', '乡镇商超', '团购/熟人渠道', '学校/食堂']
    };

    const audienceBoost = {
      family: ['母婴渠道', '社区团购'],
      young: ['即时零售', '内容电商'],
      elder: ['社区团购', '本地商超'],
      b2b: ['餐饮/茶饮直供', '经销批发']
    };

    const budgetTips = {
      low: '优先做复购渠道与口碑传播，避免高投放。',
      mid: '可做区域活动与本地内容投放，小步试错。',
      high: '适合做品牌联名与渠道联合推广。'
    };

    const base = channelSets[city] || channelSets.tier2;
    const extra = audienceBoost[audience] || [];
    const channels = Array.from(new Set([...base, ...extra])).slice(0, 5);

    if (output) {
      output.innerHTML = `
        <p><strong>推荐渠道组合：</strong>${channels.join('、')}</p>
        <p><strong>优先级：</strong>先打通 2-3 个核心渠道，再逐步扩展。</p>
        <p><strong>预算策略：</strong>${budgetTips[budget]}</p>
      `;
    }
  });

  costBtn?.addEventListener('click', () => {
    const cows = parseFloat(document.getElementById('biz-cost-cows')?.value || '0');
    const tonnage = parseFloat(document.getElementById('biz-cost-tonnage')?.value || '0');
    const product = document.getElementById('biz-cost-product')?.value || 'fresh';
    const pain = document.getElementById('biz-cost-pain')?.value || 'energy';
    const output = document.getElementById('biz-cost-result');

    const scale = cows >= 800 || tonnage >= 60 ? '较大规模' : cows >= 300 || tonnage >= 20 ? '中等规模' : '小规模';
    const productTips = {
      fresh: '优先控制冷链损耗与终端周转。',
      uht: '关注能耗与包装成本，提升产线效率。',
      yogurt: '关注菌种与发酵损耗控制。',
      mix: '建立多 SKU 排产与库存周转机制。'
    };
    const painTips = {
      energy: '建议先做设备能耗盘点与峰谷电优化。',
      loss: '重点降低损耗与返工率，强化 SOP。',
      logistics: '优化配送路线与合作运力，提高满载率。',
      labor: '通过流程优化与设备改造降低人效成本。'
    };

    const budgetRange = scale === '较大规模'
      ? '建议将1.5%-3%的营收用于设备与流程优化'
      : scale === '中等规模'
        ? '建议将1%-2%营收用于关键环节优化'
        : '建议先做低成本优化（SOP/维护/损耗）';

    if (output) {
      output.innerHTML = `
        <p><strong>规模判断：</strong>${scale}</p>
        <p><strong>预算建议：</strong>${budgetRange}</p>
        <p><strong>产品侧重点：</strong>${productTips[product]}</p>
        <p><strong>优先优化项：</strong>${painTips[pain]}</p>
      `;
    }
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
