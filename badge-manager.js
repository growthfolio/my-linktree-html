// 🏆 Enhanced Badge Management System
class BadgeManager {
  constructor() {
    this.badges = [];
    this.filters = {
      category: 'all',
      level: 'all',
      provider: 'all'
    };
    this.analytics = {
      views: {},
      clicks: {},
      hovers: {}
    };
    this.init();
  }

  init() {
    this.loadAnalytics();
    this.setupBadgeContainers();
    this.setupFilters();
    this.setupIntersectionObserver();
    this.setupEventListeners();
    this.setupThemeObserver();
    this.preloadCredlyScript();
  }

  // Badge data with metadata
  getBadgeData() {
    return [
      {
        id: '5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85',
        title: 'AWS Cloud Practitioner',
        category: 'foundational',
        level: 'Foundational',
        provider: 'AWS',
        skills: ['Cloud Concepts', 'AWS Services', 'Security', 'Pricing'],
        earnedDate: '2023-05-15',
        validUntil: '2026-05-15',
        description: 'Validates overall understanding of AWS Cloud'
      },
      {
        id: '3e0210b2-b5a7-42ed-8ba8-b099d35348ca',
        title: 'AWS Solutions Architect Associate',
        category: 'associate',
        level: 'Associate',
        provider: 'AWS',
        skills: ['Architecture Design', 'High Availability', 'Cost Optimization', 'Security'],
        earnedDate: '2023-08-22',
        validUntil: '2026-08-22',
        description: 'Demonstrates ability to design distributed systems on AWS'
      },
      {
        id: '7f62f225-3005-4043-b762-eb608f07636b',
        title: 'AWS Developer Associate',
        category: 'associate',
        level: 'Associate',
        provider: 'AWS',
        skills: ['AWS SDK', 'Serverless', 'CI/CD', 'Monitoring'],
        earnedDate: '2023-11-10',
        validUntil: '2026-11-10',
        description: 'Validates expertise in developing applications on AWS'
      },
      {
        id: '947a0b6f-ebd4-4089-9158-48dc187c5068',
        title: 'AWS SysOps Administrator Associate',
        category: 'associate',
        level: 'Associate',
        provider: 'AWS',
        skills: ['System Operations', 'Monitoring', 'Automation', 'Security'],
        earnedDate: '2024-02-05',
        validUntil: '2027-02-05',
        description: 'Demonstrates skills in deployment, management, and operations on AWS'
      },
      {
        id: '0ce03a22-0f7a-42a4-b12d-408ccf4441d9',
        title: 'AWS Security Specialty',
        category: 'specialty',
        level: 'Specialty',
        provider: 'AWS',
        skills: ['Identity Management', 'Data Protection', 'Infrastructure Security', 'Incident Response'],
        earnedDate: '2024-04-18',
        validUntil: '2027-04-18',
        description: 'Validates expertise in securing AWS workloads and applications'
      },
      {
        id: 'c1cb7ff3-a435-4f34-a046-dd5a1a885d09',
        title: 'AWS Database Specialty',
        category: 'specialty',
        level: 'Specialty',
        provider: 'AWS',
        skills: ['Database Design', 'Migration', 'Performance Tuning', 'Security'],
        earnedDate: '2024-06-30',
        validUntil: '2027-06-30',
        description: 'Demonstrates expertise in AWS database services'
      },
      {
        id: 'f61b26e5-f236-4f74-a963-90a7daa9d8c1',
        title: 'AWS Machine Learning Specialty',
        category: 'specialty',
        level: 'Specialty',
        provider: 'AWS',
        skills: ['ML Engineering', 'Data Engineering', 'Modeling', 'Implementation'],
        earnedDate: '2024-09-12',
        validUntil: '2027-09-12',
        description: 'Validates ability to build, train, and deploy ML solutions on AWS'
      }
    ];
  }

  setupBadgeContainers() {
    const badgeData = this.getBadgeData();
    const containers = document.querySelectorAll('.badge-container');
    
    containers.forEach((container, index) => {
      if (badgeData[index]) {
        this.enhanceBadgeContainer(container, badgeData[index]);
      }
    });
  }

  enhanceBadgeContainer(container, badgeData) {
    // Add metadata
    container.dataset.badgeId = badgeData.id;
    container.dataset.category = badgeData.category;
    container.dataset.level = badgeData.level;
    container.dataset.provider = badgeData.provider;
    
    // Add category indicator
    const categoryIndicator = document.createElement('div');
    categoryIndicator.className = `badge-category ${badgeData.category}`;
    categoryIndicator.title = `${badgeData.level} Level`;
    container.appendChild(categoryIndicator);
    
    // Add overlay with metadata
    const overlay = this.createBadgeOverlay(badgeData);
    container.appendChild(overlay);
    
    // Add tooltip
    const tooltip = this.createBadgeTooltip(badgeData);
    container.appendChild(tooltip);
    
    // Setup loading state
    container.classList.add('loading');
    
    // Setup event listeners
    this.setupBadgeEventListeners(container, badgeData);
    
    // Check if iframe is loaded
    this.checkIframeLoaded(container);
  }

  createBadgeOverlay(badgeData) {
    const overlay = document.createElement('div');
    overlay.className = 'badge-overlay';
    
    const title = document.createElement('div');
    title.className = 'badge-title';
    title.textContent = badgeData.title;
    
    const date = document.createElement('div');
    date.className = 'badge-date';
    date.innerHTML = `
      <i class="ph-calendar" style="font-size: 12px;"></i>
      ${this.formatDate(badgeData.earnedDate)}
    `;
    
    overlay.appendChild(title);
    overlay.appendChild(date);
    
    return overlay;
  }

  createBadgeTooltip(badgeData) {
    const tooltip = document.createElement('div');
    tooltip.className = 'badge-tooltip';
    
    const title = document.createElement('div');
    title.className = 'tooltip-title';
    title.textContent = badgeData.title;
    
    const skills = document.createElement('div');
    skills.className = 'tooltip-skills';
    badgeData.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'skill-tag';
      skillTag.textContent = skill;
      skills.appendChild(skillTag);
    });
    
    const validUntil = document.createElement('div');
    validUntil.className = 'tooltip-date';
    validUntil.innerHTML = `
      <i class="ph-shield-check" style="font-size: 12px;"></i>
      Válida até ${this.formatDate(badgeData.validUntil)}
    `;
    
    const description = document.createElement('div');
    description.className = 'tooltip-description';
    description.style.cssText = 'font-size: 12px; margin-top: 8px; color: var(--muted);';
    description.textContent = badgeData.description;
    
    tooltip.appendChild(title);
    tooltip.appendChild(skills);
    tooltip.appendChild(validUntil);
    tooltip.appendChild(description);
    
    return tooltip;
  }

  setupBadgeEventListeners(container, badgeData) {
    // Click tracking
    container.addEventListener('click', (e) => {
      e.preventDefault();
      this.trackEvent('click', badgeData.id);
      this.openBadgeModal(badgeData);
    });
    
    // Hover tracking
    let hoverTimer;
    container.addEventListener('mouseenter', () => {
      this.trackEvent('hover', badgeData.id);
      hoverTimer = setTimeout(() => {
        this.trackEvent('view', badgeData.id);
      }, 2000); // Track as "view" if hovered for 2+ seconds
    });
    
    container.addEventListener('mouseleave', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    });
    
    // Touch support for mobile
    container.addEventListener('touchstart', () => {
      this.trackEvent('touch', badgeData.id);
    });
  }

  checkIframeLoaded(container) {
    const checkInterval = setInterval(() => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        container.classList.remove('loading');
        container.classList.add('loaded');
        clearInterval(checkInterval);
        
        // Add load animation
        setTimeout(() => {
          container.style.animation = 'badge-loaded 0.5s ease-out';
          
          // Setup tooltips for truncated text after iframe loads
          this.setupTextTooltips(iframe);
        }, 100);
      }
    }, 100);
    
    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      if (container.classList.contains('loading')) {
        container.classList.remove('loading');
        container.classList.add('error');
      }
    }, 10000);
  }

  setupTextTooltips(iframe) {
    try {
      // Wait a bit more for iframe content to fully load
      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Inject custom styles for better text contrast
        this.injectIframeStyles(iframeDoc);
        
        // Find badge name and issuer elements
        const badgeName = iframeDoc.querySelector('#badge-name');
        const badgeIssuer = iframeDoc.querySelector('#badge-issuer');
        
        if (badgeName) {
          this.addTooltipIfTruncated(badgeName);
        }
        
        if (badgeIssuer) {
          this.addTooltipIfTruncated(badgeIssuer);
        }
      }, 1000);
    } catch (error) {
      // Cross-origin iframe, can't access content
      console.log('Cannot access iframe content for tooltips (cross-origin)');
    }
  }

  injectIframeStyles(iframeDoc) {
    try {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      // Create style element
      const style = iframeDoc.createElement('style');
      style.id = 'theme-adaptive-styles';
      
      // Define styles based on current theme
      const themeStyles = currentTheme === 'dark' ? `
        #badge-name {
          color: #F2F3F3 !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
        }
        
        #badge-issuer {
          color: #F2F3F3 !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
          cursor: help !important;
        }
      ` : `
        #badge-name {
          color: #232F3E !important;
          text-shadow: 0 1px 2px rgba(255,255,255,0.3);
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
        }
        
        #badge-issuer {
          color: #232F3E !important;
          text-shadow: 0 1px 2px rgba(255,255,255,0.3);
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
          cursor: help !important;
        }
      `;
      
      style.textContent = themeStyles;
      
      // Remove existing theme styles if any
      const existingStyle = iframeDoc.querySelector('#theme-adaptive-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add new styles
      iframeDoc.head.appendChild(style);
      
    } catch (error) {
      console.log('Could not inject iframe styles:', error);
    }
  }

  addTooltipIfTruncated(element) {
    // Check if text is truncated
    if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
      const fullText = element.textContent || element.innerText;
      
      // Remove default title to prevent double tooltips
      element.removeAttribute('title');
      
      // Add a visual indicator that there's more text
      element.style.cursor = 'help';
      
      // Create custom tooltip
      this.createCustomTooltip(element, fullText);
      
      // Optional: Add a subtle indicator
      if (!element.querySelector('.truncation-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'truncation-indicator';
        indicator.innerHTML = '...';
        indicator.style.cssText = `
          opacity: 0.7;
          font-weight: normal;
          margin-left: 2px;
        `;
        
        // Only add if text is actually truncated
        const tempSpan = document.createElement('span');
        tempSpan.style.cssText = 'visibility: hidden; position: absolute; white-space: nowrap;';
        tempSpan.textContent = fullText;
        document.body.appendChild(tempSpan);
        
        if (tempSpan.offsetWidth > element.offsetWidth) {
          element.appendChild(indicator);
        }
        
        document.body.removeChild(tempSpan);
      }
    }
  }

  createCustomTooltip(element, text) {
    let tooltip = null;
    let showTimeout = null;
    let hideTimeout = null;

    const showTooltip = (e) => {
      // Clear any existing timeouts
      if (hideTimeout) clearTimeout(hideTimeout);
      
      showTimeout = setTimeout(() => {
        // Remove existing tooltip
        if (tooltip) tooltip.remove();
        
        // Create new tooltip
        tooltip = document.createElement('div');
        tooltip.className = 'badge-text-tooltip';
        tooltip.textContent = text;
        
        // Position tooltip
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Adjust if tooltip goes off screen
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
          left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
          top = rect.bottom + 10;
          tooltip.style.marginBottom = '0';
          tooltip.style.marginTop = '5px';
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.classList.add('show');
      }, 500); // Show after 500ms
    };

    const hideTooltip = () => {
      if (showTimeout) clearTimeout(showTimeout);
      
      if (tooltip) {
        hideTimeout = setTimeout(() => {
          tooltip.classList.remove('show');
          setTimeout(() => {
            if (tooltip) tooltip.remove();
            tooltip = null;
          }, 200);
        }, 100);
      }
    };

    // Add event listeners
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
    element.addEventListener('focus', showTooltip);
    element.addEventListener('blur', hideTooltip);
  }

  setupFilters() {
    const filtersContainer = document.querySelector('.badge-filters');
    if (!filtersContainer) {
      this.createFiltersContainer();
    }
    
    this.renderFilters();
  }

  createFiltersContainer() {
    const section = document.querySelector('section:has(.badges-grid)');
    if (!section) return;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'badge-filters';
    
    section.insertBefore(filtersContainer, section.querySelector('.badges-grid') || section.querySelector('[class*="grid"]'));
  }

  renderFilters() {
    const container = document.querySelector('.badge-filters');
    if (!container) return;
    
    const filters = [
      { key: 'all', label: 'Todas', type: 'category' },
      { key: 'foundational', label: 'Foundational', type: 'category' },
      { key: 'associate', label: 'Associate', type: 'category' },
      { key: 'specialty', label: 'Specialty', type: 'category' }
    ];
    
    container.innerHTML = '';
    
    filters.forEach(filter => {
      const button = document.createElement('button');
      button.className = `filter-button ${this.filters.category === filter.key ? 'active' : ''}`;
      button.textContent = filter.label;
      button.addEventListener('click', () => this.setFilter('category', filter.key));
      container.appendChild(button);
    });
  }

  setFilter(type, value) {
    this.filters[type] = value;
    this.applyFilters();
    this.renderFilters();
  }

  applyFilters() {
    const containers = document.querySelectorAll('.badge-container');
    
    containers.forEach(container => {
      const category = container.dataset.category;
      const level = container.dataset.level;
      const provider = container.dataset.provider;
      
      const categoryMatch = this.filters.category === 'all' || category === this.filters.category;
      const levelMatch = this.filters.level === 'all' || level === this.filters.level;
      const providerMatch = this.filters.provider === 'all' || provider === this.filters.provider;
      
      if (categoryMatch && levelMatch && providerMatch) {
        container.style.display = 'flex';
        container.style.animation = 'badge-enter 0.3s ease-out';
      } else {
        container.style.display = 'none';
      }
    });
  }

  openBadgeModal(badgeData) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'badge-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.badge-modal').remove()">
          <i class="ph-x"></i>
        </button>
        <div class="modal-header">
          <h3>${badgeData.title}</h3>
          <div class="modal-meta">
            <span class="badge-level ${badgeData.category}">${badgeData.level}</span>
            <span class="badge-provider">${badgeData.provider}</span>
          </div>
        </div>
        <div class="modal-body">
          <div class="badge-description">
            <p>${badgeData.description}</p>
          </div>
          <div class="badge-skills">
            <h4>Skills Validadas:</h4>
            <div class="skills-list">
              ${badgeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
          <div class="badge-dates">
            <div class="date-item">
              <i class="ph-calendar"></i>
              <span>Obtida em: ${this.formatDate(badgeData.earnedDate)}</span>
            </div>
            <div class="date-item">
              <i class="ph-shield-check"></i>
              <span>Válida até: ${this.formatDate(badgeData.validUntil)}</span>
            </div>
          </div>
          <div class="badge-actions">
            <button class="btn-primary" onclick="window.open('https://www.credly.com/badges/${badgeData.id}', '_blank')">
              <i class="ph-external-link"></i>
              Ver no Credly
            </button>
            <button class="btn-secondary" onclick="navigator.share({title: '${badgeData.title}', url: 'https://www.credly.com/badges/${badgeData.id}'})">
              <i class="ph-share"></i>
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          if (container.dataset.badgeId) {
            this.trackEvent('impression', container.dataset.badgeId);
          }
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.badge-container').forEach(container => {
      observer.observe(container);
    });
  }

  trackEvent(type, badgeId) {
    if (!this.analytics[type]) this.analytics[type] = {};
    if (!this.analytics[type][badgeId]) this.analytics[type][badgeId] = 0;
    
    this.analytics[type][badgeId]++;
    this.saveAnalytics();
    
    // Console log for debugging
    console.log(`Badge ${type}:`, badgeId, this.analytics[type][badgeId]);
  }

  setupThemeObserver() {
    // Observe theme changes to update iframe styles
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          this.updateAllIframeThemes();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  updateAllIframeThemes() {
    // Re-apply theme styles to all loaded iframes
    const loadedContainers = document.querySelectorAll('.badge-container.loaded');
    
    loadedContainers.forEach(container => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        setTimeout(() => {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            this.injectIframeStyles(iframeDoc);
          } catch (error) {
            console.log('Cannot update iframe theme (cross-origin)');
          }
        }, 100);
      }
    });
  }

  preloadCredlyScript() {
    if (!document.querySelector('script[src*="credly.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  loadAnalytics() {
    const stored = localStorage.getItem('badge-analytics');
    if (stored) {
      this.analytics = { ...this.analytics, ...JSON.parse(stored) };
    }
  }

  saveAnalytics() {
    localStorage.setItem('badge-analytics', JSON.stringify(this.analytics));
  }

  // Public API methods
  getAnalytics() {
    return this.analytics;
  }

  getMostPopularBadges(limit = 3) {
    const clicks = this.analytics.clicks || {};
    return Object.entries(clicks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([id]) => this.getBadgeData().find(badge => badge.id === id))
      .filter(Boolean);
  }

  exportAnalytics() {
    const data = {
      analytics: this.analytics,
      badges: this.getBadgeData(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'badge-analytics.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.badgeManager = new BadgeManager();
});

// Add some utility functions to global scope
window.shareCredential = function(badgeId) {
  const badge = window.badgeManager.getBadgeData().find(b => b.id === badgeId);
  if (badge && navigator.share) {
    navigator.share({
      title: `${badge.title} - Felipe Macedo`,
      text: `Confira minha certificação ${badge.title}!`,
      url: `https://www.credly.com/badges/${badgeId}`
    });
  }
};

window.viewBadgeAnalytics = function() {
  console.table(window.badgeManager.getAnalytics());
};
