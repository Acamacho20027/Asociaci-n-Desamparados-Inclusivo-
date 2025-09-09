// Funcionalidades principales de la página web
class AccessibilityManager {
  constructor() {
    this.settings = {
      fontSize: 'normal',
      contrast: 'normal',
      theme: 'light',
      highlightLinks: false,
      spacing: 'normal',
      animations: true,
      images: true,
      dyslexia: false,
      cursor: 'normal',
      lineHeight: 'normal'
    };
    
    this.init();
  }

  init() {
    this.loadSettings();
    this.createAccessibilityMenu();
    this.bindEvents();
    this.applySettings();
  }

  createAccessibilityMenu() {
    const menuHTML = `
      <div class="accessibility-menu" id="accessibilityMenu">
        <button class="accessibility-btn" data-action="contrast">
          <i>🌓</i>
          <span>Contraste +</span>
        </button>
        <button class="accessibility-btn" data-action="highlightLinks">
          <i>🔗</i>
          <span>Resaltar enlaces</span>
        </button>
        <button class="accessibility-btn" data-action="fontSize">
          <i>🔤</i>
          <span>Agrandar texto</span>
        </button>
        <button class="accessibility-btn" data-action="spacing">
          <i>↔️</i>
          <span>Espaciado de texto</span>
        </button>
        <button class="accessibility-btn" data-action="animations">
          <i>⏸️</i>
          <span>Detener animaciones</span>
        </button>
        <button class="accessibility-btn" data-action="images">
          <i>🖼️</i>
          <span>Ocultar Imágenes</span>
        </button>
        <button class="accessibility-btn" data-action="dyslexia">
          <i>📖</i>
          <span>Apto para dislexia</span>
        </button>
        <button class="accessibility-btn" data-action="cursor">
          <i>🖱️</i>
          <span>Cursor</span>
        </button>
        <button class="accessibility-btn" data-action="info">
          <i>ℹ️</i>
          <span>Información</span>
        </button>
        <button class="accessibility-btn" data-action="lineHeight">
          <i>📏</i>
          <span>Altura de la línea</span>
        </button>
        <button class="accessibility-btn" data-action="reset">
          <i>🔄</i>
          <span>Resetear</span>
        </button>
      </div>
      <button class="accessibility-toggle" id="accessibilityToggle" aria-label="Menú de accesibilidad">
        ♿
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', menuHTML);
  }

  bindEvents() {
    // Toggle del menú de accesibilidad
    document.getElementById('accessibilityToggle').addEventListener('click', () => {
      this.toggleMenu();
    });

    // Botones del menú de accesibilidad
    document.querySelectorAll('.accessibility-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleAccessibilityAction(action);
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('accessibilityMenu');
      const toggle = document.getElementById('accessibilityToggle');
      
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  toggleMenu() {
    const menu = document.getElementById('accessibilityMenu');
    menu.classList.toggle('active');
  }

  closeMenu() {
    const menu = document.getElementById('accessibilityMenu');
    menu.classList.remove('active');
  }

  handleAccessibilityAction(action) {
    switch (action) {
      case 'contrast':
        this.toggleContrast();
        break;
      case 'highlightLinks':
        this.toggleHighlightLinks();
        break;
      case 'fontSize':
        this.toggleFontSize();
        break;
      case 'spacing':
        this.toggleSpacing();
        break;
      case 'animations':
        this.toggleAnimations();
        break;
      case 'images':
        this.toggleImages();
        break;
      case 'dyslexia':
        this.toggleDyslexia();
        break;
      case 'cursor':
        this.toggleCursor();
        break;
      case 'lineHeight':
        this.toggleLineHeight();
        break;
      case 'info':
        this.showInfo();
        break;
      case 'reset':
        this.resetSettings();
        break;
    }
    
    this.updateButtonStates();
    this.saveSettings();
  }

  toggleContrast() {
    this.settings.contrast = this.settings.contrast === 'normal' ? 'high' : 'normal';
    this.applySettings();
  }

  toggleHighlightLinks() {
    this.settings.highlightLinks = !this.settings.highlightLinks;
    this.applySettings();
  }

  toggleFontSize() {
    const sizes = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(this.settings.fontSize);
    this.settings.fontSize = sizes[(currentIndex + 1) % sizes.length];
    this.applySettings();
  }

  toggleSpacing() {
    this.settings.spacing = this.settings.spacing === 'normal' ? 'increased' : 'normal';
    this.applySettings();
  }

  toggleAnimations() {
    this.settings.animations = !this.settings.animations;
    this.applySettings();
  }

  toggleImages() {
    this.settings.images = !this.settings.images;
    this.applySettings();
  }

  toggleDyslexia() {
    this.settings.dyslexia = !this.settings.dyslexia;
    this.applySettings();
  }

  toggleCursor() {
    this.settings.cursor = this.settings.cursor === 'normal' ? 'custom' : 'normal';
    this.applySettings();
  }

  toggleLineHeight() {
    this.settings.lineHeight = this.settings.lineHeight === 'normal' ? 'increased' : 'normal';
    this.applySettings();
  }

  showInfo() {
    alert(`Configuración actual:
• Tamaño de fuente: ${this.settings.fontSize}
• Contraste: ${this.settings.contrast}
• Resaltar enlaces: ${this.settings.highlightLinks ? 'Sí' : 'No'}
• Espaciado: ${this.settings.spacing}
• Animaciones: ${this.settings.animations ? 'Sí' : 'No'}
• Imágenes: ${this.settings.images ? 'Mostrar' : 'Ocultar'}
• Dislexia: ${this.settings.dyslexia ? 'Sí' : 'No'}
• Cursor: ${this.settings.cursor}
• Altura de línea: ${this.settings.lineHeight}`);
  }

  resetSettings() {
    this.settings = {
      fontSize: 'normal',
      contrast: 'normal',
      theme: 'light',
      highlightLinks: false,
      spacing: 'normal',
      animations: true,
      images: true,
      dyslexia: false,
      cursor: 'normal',
      lineHeight: 'normal'
    };
    this.applySettings();
  }

  applySettings() {
    const body = document.body;
    
    // Resetear todas las clases
    body.className = body.className.replace(/high-contrast|large-text|dyslexia-friendly|highlight-links|increased-spacing|no-animations|hide-images|custom-cursor|increased-line-height/g, '').trim();
    
    // Aplicar configuraciones
    if (this.settings.contrast === 'high') {
      body.classList.add('high-contrast');
    }
    
    if (this.settings.fontSize === 'large') {
      body.classList.add('large-text');
    } else if (this.settings.fontSize === 'xlarge') {
      body.classList.add('large-text');
      body.style.fontSize = '1.4rem';
    }
    
    if (this.settings.highlightLinks) {
      body.classList.add('highlight-links');
    }
    
    if (this.settings.spacing === 'increased') {
      body.classList.add('increased-spacing');
    }
    
    if (!this.settings.animations) {
      body.classList.add('no-animations');
    }
    
    if (!this.settings.images) {
      body.classList.add('hide-images');
    }
    
    if (this.settings.dyslexia) {
      body.classList.add('dyslexia-friendly');
    }
    
    if (this.settings.cursor === 'custom') {
      body.classList.add('custom-cursor');
    }
    
    if (this.settings.lineHeight === 'increased') {
      body.classList.add('increased-line-height');
    }
  }

  updateButtonStates() {
    document.querySelectorAll('.accessibility-btn').forEach(btn => {
      const action = btn.dataset.action;
      let isActive = false;
      
      switch (action) {
        case 'contrast':
          isActive = this.settings.contrast === 'high';
          break;
        case 'highlightLinks':
          isActive = this.settings.highlightLinks;
          break;
        case 'fontSize':
          isActive = this.settings.fontSize !== 'normal';
          break;
        case 'spacing':
          isActive = this.settings.spacing === 'increased';
          break;
        case 'animations':
          isActive = !this.settings.animations;
          break;
        case 'images':
          isActive = !this.settings.images;
          break;
        case 'dyslexia':
          isActive = this.settings.dyslexia;
          break;
        case 'cursor':
          isActive = this.settings.cursor === 'custom';
          break;
        case 'lineHeight':
          isActive = this.settings.lineHeight === 'increased';
          break;
      }
      
      btn.classList.toggle('active', isActive);
    });
  }

  saveSettings() {
    localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
  }

  loadSettings() {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }
}

// Funcionalidades de navegación
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setActiveLink();
    this.bindEvents();
  }

  setActiveLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');
      
      // Detectar página activa
      if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '/views/' || currentPage === '/views') {
        if (href === 'index.html') {
          link.classList.add('active');
        }
      } else if (currentPage.includes(href)) {
        link.classList.add('active');
      }
    });
  }

  bindEvents() {
    // Efectos hover en enlaces de navegación
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
      });
    });
  }
}

// Funcionalidades de animación
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.observeElements();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.card, .section').forEach(el => {
      observer.observe(el);
    });
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
  new NavigationManager();
  new AnimationManager();
  
  // Mostrar mensaje de bienvenida
  console.log('🌟 Página web de la Asociación Desampa Inclusivo cargada correctamente');
  console.log('♿ Funcionalidades de accesibilidad activadas');
});

// Funcionalidades adicionales para formularios
class FormManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindFormEvents();
  }

  bindFormEvents() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simular envío de formulario
    console.log('Datos del formulario:', data);
    
    // Mostrar mensaje de confirmación
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    
    // Limpiar formulario
    form.reset();
  }
}

// Inicializar gestor de formularios
document.addEventListener('DOMContentLoaded', () => {
  new FormManager();
});
