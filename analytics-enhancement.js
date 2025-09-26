// Enhanced Analytics and Personalization System
class LinkTreeAnalytics {
  constructor() {
    this.clicks = this.loadClicks();
    this.preferences = this.loadPreferences();
    this.init();
  }

  init() {
    this.setupClickTracking();
    this.personalizeContent();
    this.setupHeatmap();
  }

  // Enhanced Click Tracking
  setupClickTracking() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-platform]');
      if (link) {
        const platform = link.dataset.platform;
        this.trackClick(platform, {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          viewport: `${window.innerWidth}x${window.innerHeight}`
        });
      }
    });
  }

  trackClick(platform, metadata) {
    if (!this.clicks[platform]) {
      this.clicks[platform] = [];
    }
    
    this.clicks[platform].push(metadata);
    this.saveClicks();
    this.updatePopularLinks();
    
    // Show success feedback
    this.showFeedback(`📊 Click em ${platform} registrado!`, 'success');
  }

  // Personalization based on usage
  personalizeContent() {
    const popular = this.getPopularLinks();
    
    // Reorder links based on popularity
    popular.forEach((platform, index) => {
      const link = document.querySelector(`[data-platform="${platform}"]`);
      if (link && index < 3) {
        link.classList.add('popular-link');
        link.style.order = index - 10; // Move to top
      }
    });

    // Add usage indicators
    this.addUsageIndicators();
  }

  getPopularLinks() {
    return Object.entries(this.clicks)
      .sort(([,a], [,b]) => b.length - a.length)
      .map(([platform]) => platform)
      .slice(0, 3);
  }

  addUsageIndicators() {
    Object.entries(this.clicks).forEach(([platform, clicks]) => {
      const link = document.querySelector(`[data-platform="${platform}"]`);
      if (link && clicks.length > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'usage-indicator';
        indicator.innerHTML = `
          <span class="click-count">${clicks.length}</span>
          <span class="click-label">clicks</span>
        `;
        link.appendChild(indicator);
      }
    });
  }

  // Simple heatmap simulation
  setupHeatmap() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
      
      // Keep only last 50 points
      if (mouseTrail.length > 50) {
        mouseTrail.shift();
      }
    });

    // Visualize hot areas on double-click
    document.addEventListener('dblclick', () => {
      this.visualizeHeatmap(mouseTrail);
    });
  }

  visualizeHeatmap(trail) {
    trail.forEach((point, index) => {
      const dot = document.createElement('div');
      dot.className = 'heatmap-dot';
      dot.style.cssText = `
        position: fixed;
        left: ${point.x}px;
        top: ${point.y}px;
        width: 4px;
        height: 4px;
        background: rgba(255, 0, 0, ${0.1 + (index / trail.length) * 0.5});
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;
      
      document.body.appendChild(dot);
      
      setTimeout(() => dot.remove(), 3000);
    });
  }

  // Enhanced feedback system
  showFeedback(message, type = 'info') {
    const feedback = document.createElement('div');
    feedback.className = `feedback-toast ${type}`;
    feedback.innerHTML = `
      <div class="feedback-content">
        <span class="feedback-message">${message}</span>
        <button class="feedback-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    document.body.appendChild(feedback);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (feedback.parentElement) {
        feedback.remove();
      }
    }, 3000);
  }

  // Data persistence
  loadClicks() {
    return JSON.parse(localStorage.getItem('linktree-clicks') || '{}');
  }

  saveClicks() {
    localStorage.setItem('linktree-clicks', JSON.stringify(this.clicks));
  }

  loadPreferences() {
    return JSON.parse(localStorage.getItem('linktree-preferences') || '{}');
  }

  savePreferences() {
    localStorage.setItem('linktree-preferences', JSON.stringify(this.preferences));
  }

  // Analytics dashboard (for development)
  showAnalytics() {
    const total = Object.values(this.clicks).reduce((sum, arr) => sum + arr.length, 0);
    const popular = this.getPopularLinks();
    
    console.log('📊 LinkTree Analytics:', {
      totalClicks: total,
      popularLinks: popular,
      clicksByPlatform: Object.fromEntries(
        Object.entries(this.clicks).map(([k, v]) => [k, v.length])
      )
    });
  }
}

// Enhanced CSS for new features
const enhancedStyles = `
  .popular-link {
    position: relative;
    border: 2px solid #10b981 !important;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3) !important;
  }

  .popular-link::before {
    content: '🔥';
    position: absolute;
    top: -8px;
    right: -8px;
    background: #10b981;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    z-index: 10;
  }

  .usage-indicator {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .click-count {
    font-weight: bold;
    color: #10b981;
  }

  .feedback-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slideInRight 0.3s ease;
  }

  .feedback-toast.success {
    border-left: 4px solid #10b981;
  }

  .feedback-content {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
  }

  .feedback-close {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    opacity: 0.7;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .heatmap-dot {
    animation: heatmapPulse 1s ease-out;
  }

  @keyframes heatmapPulse {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Initialize analytics
const analytics = new LinkTreeAnalytics();

// Add data attributes to existing links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href*="github"]');
  links.forEach(link => link.setAttribute('data-platform', 'GitHub'));
  
  const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
  linkedinLinks.forEach(link => link.setAttribute('data-platform', 'LinkedIn'));
  
  const emailLinks = document.querySelectorAll('a[href*="mailto"]');
  emailLinks.forEach(link => link.setAttribute('data-platform', 'Email'));
  
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => link.setAttribute('data-platform', 'WhatsApp'));
});

// Expose analytics for debugging
window.linkTreeAnalytics = analytics;