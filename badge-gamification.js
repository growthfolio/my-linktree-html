// 🎮 Badge Gamification System
class BadgeGamification {
  constructor(badgeManager) {
    this.badgeManager = badgeManager;
    this.achievements = this.loadAchievements();
    this.streaks = this.loadStreaks();
    this.init();
  }

  init() {
    this.checkAchievements();
    this.updateProgressBars();
    this.setupCertificationPathways();
  }

  // Achievement definitions
  getAchievementDefinitions() {
    return {
      'first_cert': {
        id: 'first_cert',
        title: '🚀 Primeira Certificação',
        description: 'Obteve sua primeira certificação AWS',
        condition: (badges) => badges.length >= 1,
        points: 100,
        unlocked: false
      },
      'cloud_practitioner': {
        id: 'cloud_practitioner',
        title: '☁️ Cloud Native',
        description: 'Obteve a certificação Cloud Practitioner',
        condition: (badges) => badges.some(b => b.id === '5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85'),
        points: 150,
        unlocked: false
      },
      'associate_trio': {
        id: 'associate_trio',
        title: '🎯 Trio Associate',
        description: 'Obteve as 3 certificações Associate (Solutions Architect, Developer, SysOps)',
        condition: (badges) => {
          const associateIds = [
            '3e0210b2-b5a7-42ed-8ba8-b099d35348ca', // Solutions Architect
            '7f62f225-3005-4043-b762-eb608f07636b', // Developer
            '947a0b6f-ebd4-4089-9158-48dc187c5068'  // SysOps
          ];
          return associateIds.every(id => badges.some(b => b.id === id));
        },
        points: 500,
        unlocked: false
      },
      'specialty_master': {
        id: 'specialty_master',
        title: '🏆 Specialist Master',
        description: 'Obteve 3 ou mais certificações Specialty',
        condition: (badges) => badges.filter(b => b.category === 'specialty').length >= 3,
        points: 800,
        unlocked: false
      },
      'full_stack_cloud': {
        id: 'full_stack_cloud',
        title: '🌟 Full Stack Cloud',
        description: 'Obteve certificações em todas as categorias (Foundational, Associate, Specialty)',
        condition: (badges) => {
          const categories = ['foundational', 'associate', 'specialty'];
          return categories.every(cat => badges.some(b => b.category === cat));
        },
        points: 1000,
        unlocked: false
      },
      'rapid_learner': {
        id: 'rapid_learner',
        title: '⚡ Aprendiz Rápido',
        description: 'Obteve 3 certificações em menos de 6 meses',
        condition: (badges) => {
          if (badges.length < 3) return false;
          const sortedBadges = badges.sort((a, b) => new Date(a.earnedDate) - new Date(b.earnedDate));
          const firstThree = sortedBadges.slice(0, 3);
          const firstDate = new Date(firstThree[0].earnedDate);
          const thirdDate = new Date(firstThree[2].earnedDate);
          const diffMonths = (thirdDate - firstDate) / (1000 * 60 * 60 * 24 * 30);
          return diffMonths <= 6;
        },
        points: 300,
        unlocked: false
      }
    };
  }

  checkAchievements() {
    const badges = this.badgeManager.getBadgeData();
    const achievements = this.getAchievementDefinitions();
    const newAchievements = [];

    Object.values(achievements).forEach(achievement => {
      if (!this.achievements[achievement.id] && achievement.condition(badges)) {
        this.achievements[achievement.id] = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        };
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      this.saveAchievements();
      newAchievements.forEach(achievement => {
        this.showAchievementNotification(achievement);
      });
    }
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-toast';
    notification.innerHTML = `
      <div class="achievement-header">
        <span style="font-size: 20px;">🏆</span>
        <span>Achievement Unlocked!</span>
      </div>
      <div class="achievement-body">
        <strong>${achievement.title}</strong><br>
        ${achievement.description}<br>
        <span style="color: #FFD700;">+${achievement.points} pontos</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Animate out after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 5000);

    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  updateProgressBars() {
    this.createCertificationProgress();
  }

  createCertificationProgress() {
    const badges = this.badgeManager.getBadgeData();
    const section = document.querySelector('section:has(.badges-grid)');
    
    if (!section) return;

    // Remove existing progress if any
    const existingProgress = section.querySelector('.certification-progress');
    if (existingProgress) existingProgress.remove();

    const progressContainer = document.createElement('div');
    progressContainer.className = 'certification-progress';

    // Calculate progress for different pathways
    const pathways = this.getCertificationPathways();
    
    pathways.forEach(pathway => {
      const completedCount = pathway.certifications.filter(certId => 
        badges.some(badge => badge.id === certId)
      ).length;
      
      const progressPercentage = (completedCount / pathway.certifications.length) * 100;
      
      const pathwayHTML = `
        <div class="pathway-progress" style="margin-bottom: 24px;">
          <div class="progress-header">
            <span class="progress-icon">${pathway.icon}</span>
            <h3>${pathway.name}</h3>
            <span class="pathway-badge" style="margin-left: auto; padding: 4px 8px; background: rgba(255,153,0,0.1); color: var(--brand); border-radius: 12px; font-size: 12px; font-weight: 500;">
              ${completedCount}/${pathway.certifications.length}
            </span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
          </div>
          <div class="progress-text">
            <span>${pathway.description}</span>
            <span>${Math.round(progressPercentage)}% completo</span>
          </div>
        </div>
      `;
      
      progressContainer.innerHTML += pathwayHTML;
    });

    // Add points and achievements summary
    const totalPoints = this.getTotalPoints();
    const unlockedAchievements = Object.values(this.achievements).filter(a => a.unlocked).length;
    const totalAchievements = Object.keys(this.getAchievementDefinitions()).length;

    const statsHTML = `
      <div class="badge-stats">
        <div class="stat-item">
          <span class="stat-number">${badges.length}</span>
          <span class="stat-label">Certificações</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${totalPoints}</span>
          <span class="stat-label">Pontos</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${unlockedAchievements}/${totalAchievements}</span>
          <span class="stat-label">Conquistas</span>
        </div>
      </div>
    `;

    progressContainer.innerHTML += statsHTML;

    // Insert after the badges grid
    const badgesGrid = section.querySelector('[class*="grid"]');
    if (badgesGrid) {
      badgesGrid.parentNode.insertBefore(progressContainer, badgesGrid.nextSibling);
    } else {
      section.appendChild(progressContainer);
    }
  }

  getCertificationPathways() {
    return [
      {
        name: 'AWS Foundations',
        icon: '☁️',
        description: 'Fundamentos essenciais da AWS',
        certifications: ['5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85'] // Cloud Practitioner
      },
      {
        name: 'Associate Level',
        icon: '🎯',
        description: 'Certificações de nível Associate',
        certifications: [
          '3e0210b2-b5a7-42ed-8ba8-b099d35348ca', // Solutions Architect
          '7f62f225-3005-4043-b762-eb608f07636b', // Developer
          '947a0b6f-ebd4-4089-9158-48dc187c5068'  // SysOps
        ]
      },
      {
        name: 'Specialty Expert',
        icon: '🏆',
        description: 'Especializações avançadas',
        certifications: [
          '0ce03a22-0f7a-42a4-b12d-408ccf4441d9', // Security
          'c1cb7ff3-a435-4f34-a046-dd5a1a885d09', // Database
          'f61b26e5-f236-4f74-a963-90a7daa9d8c1'  // Machine Learning
        ]
      }
    ];
  }

  setupCertificationPathways() {
    // This could create interactive pathway visualizations
    // For now, it's handled in updateProgressBars()
  }

  getTotalPoints() {
    return Object.values(this.achievements)
      .filter(achievement => achievement.unlocked)
      .reduce((total, achievement) => total + achievement.points, 0);
  }

  getNextAchievements() {
    const badges = this.badgeManager.getBadgeData();
    const achievements = this.getAchievementDefinitions();
    
    return Object.values(achievements)
      .filter(achievement => !this.achievements[achievement.id])
      .map(achievement => ({
        ...achievement,
        progress: this.calculateAchievementProgress(achievement, badges)
      }))
      .sort((a, b) => b.progress - a.progress);
  }

  calculateAchievementProgress(achievement, badges) {
    // This is a simplified calculation
    // In a real implementation, you'd have more sophisticated progress tracking
    switch (achievement.id) {
      case 'first_cert':
        return badges.length > 0 ? 100 : 0;
      case 'associate_trio':
        const associateIds = [
          '3e0210b2-b5a7-42ed-8ba8-b099d35348ca',
          '7f62f225-3005-4043-b762-eb608f07636b',
          '947a0b6f-ebd4-4089-9158-48dc187c5068'
        ];
        const completedAssociate = associateIds.filter(id => badges.some(b => b.id === id)).length;
        return (completedAssociate / 3) * 100;
      case 'specialty_master':
        const specialtyCount = badges.filter(b => b.category === 'specialty').length;
        return Math.min((specialtyCount / 3) * 100, 100);
      default:
        return 0;
    }
  }

  // Social sharing for achievements
  shareAchievement(achievementId) {
    const achievement = this.achievements[achievementId];
    if (!achievement || !achievement.unlocked) return;

    const shareData = {
      title: `🏆 ${achievement.title}`,
      text: `Acabei de desbloquear: ${achievement.description}! 🎉`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback to clipboard
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      navigator.clipboard.writeText(text).then(() => {
        this.badgeManager.showToast('Achievement copiado para clipboard! 📋', 'success');
      });
    }
  }

  // Generate certificate/badge collection PDF
  generateCertificatePortfolio() {
    // This would integrate with a PDF generation library
    // For now, just show what would be included
    const badges = this.badgeManager.getBadgeData();
    const achievements = Object.values(this.achievements).filter(a => a.unlocked);
    
    console.log('Portfolio would include:');
    console.log('Badges:', badges.length);
    console.log('Achievements:', achievements.length);
    console.log('Total Points:', this.getTotalPoints());
    
    // In a real implementation, you'd use something like jsPDF or similar
    alert(`Portfolio gerado!\n\n${badges.length} certificações\n${achievements.length} conquistas\n${this.getTotalPoints()} pontos`);
  }

  loadAchievements() {
    const stored = localStorage.getItem('badge-achievements');
    return stored ? JSON.parse(stored) : {};
  }

  saveAchievements() {
    localStorage.setItem('badge-achievements', JSON.stringify(this.achievements));
  }

  loadStreaks() {
    const stored = localStorage.getItem('badge-streaks');
    return stored ? JSON.parse(stored) : {};
  }

  saveStreaks() {
    localStorage.setItem('badge-streaks', JSON.stringify(this.streaks));
  }

  // Public API
  getAchievements() {
    return this.achievements;
  }

  getLeaderboardData() {
    return {
      totalPoints: this.getTotalPoints(),
      achievementCount: Object.values(this.achievements).filter(a => a.unlocked).length,
      badgeCount: this.badgeManager.getBadgeData().length,
      level: Math.floor(this.getTotalPoints() / 200) + 1
    };
  }
}

// Extend the main BadgeManager to include gamification
document.addEventListener('DOMContentLoaded', () => {
  // Wait for BadgeManager to be initialized
  setTimeout(() => {
    if (window.badgeManager) {
      window.badgeGamification = new BadgeGamification(window.badgeManager);
      
      // Add some utility functions
      window.shareAchievement = (id) => window.badgeGamification.shareAchievement(id);
      window.generatePortfolio = () => window.badgeGamification.generateCertificatePortfolio();
      window.getLeaderboard = () => window.badgeGamification.getLeaderboardData();
    }
  }, 1000);
});
