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
      lineHeight: 'normal',
      saturation: 'normal'
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
          <span>Contraste</span>
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
        <button class="accessibility-btn" data-action="saturation">
          <i>🎨</i>
          <span>Saturación</span>
        </button>
        <button class="accessibility-btn" data-action="reset">
          <i>🔄</i>
          <span>Resetear</span>
        </button>
      </div>
      <button class="accessibility-toggle" id="accessibilityToggle" aria-label="Menú de accesibilidad">
        ⚙
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
      case 'saturation':
        this.toggleSaturation();
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
    const contrasts = ['normal', 'high', 'extra-high'];
    const currentIndex = contrasts.indexOf(this.settings.contrast);
    this.settings.contrast = contrasts[(currentIndex + 1) % contrasts.length];
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
    const cursors = ['normal', 'large', 'extra-large'];
    const currentIndex = cursors.indexOf(this.settings.cursor);
    this.settings.cursor = cursors[(currentIndex + 1) % cursors.length];
    this.applySettings();
  }

  toggleLineHeight() {
    this.settings.lineHeight = this.settings.lineHeight === 'normal' ? 'increased' : 'normal';
    this.applySettings();
  }

  toggleSaturation() {
    const saturations = ['normal', 'low', 'high'];
    const currentIndex = saturations.indexOf(this.settings.saturation);
    this.settings.saturation = saturations[(currentIndex + 1) % saturations.length];
    this.applySettings();
  }

  showInfo() {
    this.createInfoModal();
  }

  createInfoModal() {
    // Crear el modal si no existe
    let modal = document.getElementById('accessibilityInfoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'accessibilityInfoModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-icon">
              <i class="fas fa-info-circle"></i>
            </div>
            <h3 class="modal-title">Configuración de Accesibilidad</h3>
            <button class="close" id="closeInfoModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="settings-grid">
              <div class="setting-item">
                <span class="setting-label">Tamaño de fuente:</span>
                <span class="setting-value">${this.settings.fontSize}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Contraste:</span>
                <span class="setting-value">${this.settings.contrast}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Resaltar enlaces:</span>
                <span class="setting-value">${this.settings.highlightLinks ? 'Sí' : 'No'}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Espaciado:</span>
                <span class="setting-value">${this.settings.spacing}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Animaciones:</span>
                <span class="setting-value">${this.settings.animations ? 'Sí' : 'No'}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Imágenes:</span>
                <span class="setting-value">${this.settings.images ? 'Mostrar' : 'Ocultar'}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Apto para dislexia:</span>
                <span class="setting-value">${this.settings.dyslexia ? 'Sí' : 'No'}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Cursor:</span>
                <span class="setting-value">${this.settings.cursor}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Altura de línea:</span>
                <span class="setting-value">${this.settings.lineHeight}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Saturación:</span>
                <span class="setting-value">${this.settings.saturation}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="closeInfoModalBtn">Entendido</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // Actualizar los valores
    modal.querySelectorAll('.setting-value').forEach((el, index) => {
      const values = [
        this.settings.fontSize,
        this.settings.contrast,
        this.settings.highlightLinks ? 'Sí' : 'No',
        this.settings.spacing,
        this.settings.animations ? 'Sí' : 'No',
        this.settings.images ? 'Mostrar' : 'Ocultar',
        this.settings.dyslexia ? 'Sí' : 'No',
        this.settings.cursor,
        this.settings.lineHeight,
        this.settings.saturation
      ];
      el.textContent = values[index];
    });

    // Mostrar el modal
    modal.classList.add('show');

    // Event listeners para cerrar
    const closeBtn = modal.querySelector('#closeInfoModal');
    const closeBtn2 = modal.querySelector('#closeInfoModalBtn');
    
    const closeModal = () => {
      modal.classList.remove('show');
    };

    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Cerrar con tecla Escape
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
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
      lineHeight: 'normal',
      saturation: 'normal'
    };
    this.applySettings();
  }

  applySettings() {
    const body = document.body;
    
    // Resetear todas las clases
    body.className = body.className.replace(/high-contrast|extra-high-contrast|large-text|dyslexia-friendly|highlight-links|increased-spacing|no-animations|hide-images|large-cursor|extra-large-cursor|increased-line-height|low-saturation|high-saturation/g, '').trim();
    
    // Aplicar configuraciones
    if (this.settings.contrast === 'high') {
      body.classList.add('high-contrast');
    } else if (this.settings.contrast === 'extra-high') {
      body.classList.add('high-contrast', 'extra-high-contrast');
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
    
    if (this.settings.cursor === 'large') {
      body.classList.add('large-cursor');
    } else if (this.settings.cursor === 'extra-large') {
      body.classList.add('large-cursor', 'extra-large-cursor');
    }
    
    if (this.settings.lineHeight === 'increased') {
      body.classList.add('increased-line-height');
    }
    
    if (this.settings.saturation === 'low') {
      body.classList.add('low-saturation');
    } else if (this.settings.saturation === 'high') {
      body.classList.add('high-saturation');
    }
  }

  updateButtonStates() {
    document.querySelectorAll('.accessibility-btn').forEach(btn => {
      const action = btn.dataset.action;
      let isActive = false;
      
      switch (action) {
        case 'contrast':
          isActive = this.settings.contrast !== 'normal';
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
          isActive = this.settings.cursor !== 'normal';
          break;
        case 'lineHeight':
          isActive = this.settings.lineHeight === 'increased';
          break;
        case 'saturation':
          isActive = this.settings.saturation !== 'normal';
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
    
    // Validar datos requeridos
    if (!data.nombre || !data.email || !data.mensaje) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    // Crear el contenido del email
    const emailContent = this.createEmailContent(data);
    
    // Enviar email usando mailto
    this.sendEmail(emailContent);
    
    // Mostrar modal de confirmación
    this.showModal();
    
    // Limpiar formulario
    form.reset();
  }

  createEmailContent(data) {
    const subject = `Nuevo mensaje de contacto - ${data.asunto || 'Consulta general'}`;
    
    const body = `
Nuevo mensaje recibido desde el sitio web de la Asociación Desampa Inclusivo:

DATOS DEL CONTACTO:
- Nombre: ${data.nombre}
- Email: ${data.email}
- Teléfono: ${data.telefono || 'No proporcionado'}
- Asunto: ${data.asunto || 'Consulta general'}

MENSAJE:
${data.mensaje}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
Fecha: ${new Date().toLocaleString('es-CR')}
    `.trim();
    
    return { subject, body };
  }

  sendEmail(emailContent) {
    const mailtoLink = `mailto:sreyes80251@ufide.ac.cr?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    
    // Crear enlace temporal y abrirlo
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    link.click();
  }

  showModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.add('show');
      
      // Cerrar modal al hacer clic en el botón
      const closeBtn = document.getElementById('closeModal');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hideModal());
      }
      
      // Cerrar modal al hacer clic fuera del contenido
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideModal();
        }
      });
      
      // Cerrar modal con tecla Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal();
        }
      });
    }
  }

  hideModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.remove('show');
    }
  }
}

// Inicializar gestor de formularios
document.addEventListener('DOMContentLoaded', () => {
  new FormManager();
});

// Carrusel de anuncios
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pausar autoplay al hacer hover
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Animaciones de scroll mejoradas
class EnhancedAnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeElements();
        this.initGalleryEffects();
        this.initParallaxEffects();
    }
    
    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observar elementos que deben animarse
        const animatedElements = document.querySelectorAll('.about-card, .gallery-card, .achievement-card, .support-card, .carousel-container');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    initGalleryEffects() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-section, .support-section');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                element.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
}

// Inicializar nuevas funcionalidades
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
  new EnhancedAnimationManager();
  
  console.log('🎠 Carrusel de anuncios inicializado');
  console.log('✨ Animaciones mejoradas activadas');
});
