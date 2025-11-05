// ============================================
// WEDDING RSVP - JAVASCRIPT
// ============================================

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // INICIALIZACIÓN DE ICONOS LUCIDE
    // ============================================
    
    // Inicializamos los iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    
    // ============================================
    // COUNTDOWN TIMER (CUENTA REGRESIVA)
    // ============================================
    
    // EDITAR: Cambia esta fecha por la fecha de tu boda (Año, Mes-1, Día, Hora, Minuto)
    // Nota: Los meses en JavaScript van de 0-11 (0=Enero, 11=Diciembre)
    const weddingDate = new Date(2026, 3, 13, 15, 0, 0); // 13 de Abril, 2026 a las 3:00 PM
    
    // Función para actualizar el countdown
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Calculamos días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizamos el HTML
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Si la fecha ya pasó
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Opcional: Mostrar mensaje de "¡Ya nos casamos!"
            const countdownSection = document.querySelector('.countdown-section .section-subtitle');
            if (countdownSection) {
                countdownSection.textContent = '¡Ya nos casamos!';
            }
        }
    }
    
    // Actualizamos el countdown inmediatamente
    updateCountdown();
    
    // Actualizamos cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);

    
    // ============================================
    // FORMULARIO RSVP
    // ============================================
    
    const form = document.getElementById('rsvpForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // Event listener para el envío del formulario
    form.addEventListener('submit', function(e) {
        // Prevenimos el comportamiento por defecto
        e.preventDefault();
        
        // Obtenemos los valores del formulario
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'No proporcionado',
            guests: document.getElementById('guests').value,
            attendance: document.querySelector('input[name="attendance"]:checked').value,
            dietary: document.getElementById('dietary').value || 'Ninguna',
            song: document.getElementById('song').value || 'No especificada',
            message: document.getElementById('message').value || 'Sin mensaje',
            timestamp: new Date().toLocaleString('es-MX')
        };
        
        // Mostramos los datos en la consola (para debugging)
        console.log('=== DATOS DEL RSVP ===');
        console.log('Nombre:', formData.fullName);
        console.log('Email:', formData.email);
        console.log('Teléfono:', formData.phone);
        console.log('Número de invitados:', formData.guests);
        console.log('Asistirá:', formData.attendance === 'yes' ? 'Sí' : 'No');
        console.log('Restricciones:', formData.dietary);
        console.log('Canción:', formData.song);
        console.log('Mensaje:', formData.message);
        console.log('Fecha de confirmación:', formData.timestamp);
        console.log('=====================');
        
        // ====================================
        // INTEGRACIÓN CON BACKEND (OPCIONAL)
        // ====================================
        
        // OPCIÓN 1: Enviar a tu propio servidor
        /*
        fetch('https://tu-servidor.com/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            showConfirmation();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.');
        });
        */
        
        // OPCIÓN 2: Enviar por email usando FormSubmit.co (servicio gratuito)
        /*
        fetch('https://formsubmit.co/tu-email@ejemplo.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                showConfirmation();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error. Por favor intenta de nuevo.');
        });
        */
        
        // OPCIÓN 3: Guardar en Google Sheets (usando Google Apps Script)
        /*
        const googleScriptURL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
        fetch(googleScriptURL, {
            method: 'POST',
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Guardado en Google Sheets:', data);
            showConfirmation();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
        
        // Por ahora, solo mostramos la confirmación
        // EDITAR: Descomenta una de las opciones de arriba para enviar los datos
        showConfirmation();
        
        // Guardamos en localStorage para recuperación (opcional)
        try {
            localStorage.setItem('rsvpData', JSON.stringify(formData));
        } catch (e) {
            console.log('No se pudo guardar en localStorage:', e);
        }
    });
    
    // Función para mostrar el mensaje de confirmación
    function showConfirmation() {
        // Ocultamos el formulario con animación
        form.style.opacity = '0';
        form.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            form.style.display = 'none';
            confirmationMessage.classList.add('show');
            
            // Hacemos scroll suave hacia el mensaje
            confirmationMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Re-inicializamos los iconos de Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 300);
    }

    
    // ============================================
    // VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
    // ============================================
    
    // Validación de email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.value) && this.value !== '') {
            this.style.borderColor = '#e74c3c';
            showFieldError(this, 'Por favor ingresa un email válido');
        } else {
            this.style.borderColor = '#e0e0e0';
            removeFieldError(this);
        }
    });
    
    // Validación de teléfono (solo números y caracteres permitidos)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        // Permitimos solo números, espacios, guiones, paréntesis y el símbolo +
        this.value = this.value.replace(/[^0-9\s\-()+-]/g, '');
    });
    
    // Formateo automático de teléfono (opcional)
    phoneInput.addEventListener('blur', function() {
        if (this.value) {
            // Formato básico: (123) 456-7890
            const cleaned = this.value.replace(/\D/g, '');
            if (cleaned.length === 10) {
                this.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            }
        }
    });
    
    // Validación de nombre (al menos 2 palabras)
    const nameInput = document.getElementById('fullName');
    nameInput.addEventListener('blur', function() {
        const words = this.value.trim().split(/\s+/);
        if (words.length < 2 && this.value !== '') {
            this.style.borderColor = '#e74c3c';
            showFieldError(this, 'Por favor ingresa tu nombre completo');
        } else {
            this.style.borderColor = '#e0e0e0';
            removeFieldError(this);
        }
    });
    
    // Funciones auxiliares para mostrar errores
    function showFieldError(field, message) {
        // Removemos error anterior si existe
        removeFieldError(field);
        
        // Creamos elemento de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        
        // Insertamos después del campo
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerramos todos los FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Si no estaba activo, lo abrimos
            if (!isActive) {
                faqItem.classList.add('active');
            }
            
            // Re-inicializamos los iconos de Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    
    // ============================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ============================================
    
    // Función global para scroll suave (usada por el botón en el hero)
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Si hay links de navegación internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    // ============================================
    // FUNCIÓN PARA RESETEAR EL FORMULARIO
    // ============================================
    
    window.resetForm = function() {
        // Ocultamos el mensaje de confirmación
        confirmationMessage.classList.remove('show');
        
        // Mostramos el formulario nuevamente
        form.style.display = 'block';
        setTimeout(() => {
            form.style.opacity = '1';
            form.style.transform = 'translateY(0)';
        }, 50);
        
        // Reseteamos todos los campos
        form.reset();
        
        // Scroll al formulario
        form.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    
    // ============================================
    // ANIMACIÓN DE ELEMENTOS AL HACER SCROLL
    // ============================================
    
    // Observador de intersección para animar elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Opcional: Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .invitation-section,
        .when-where-section,
        .itinerary-section,
        .location-section,
        .dress-code-section,
        .gifts-section,
        .faq-section
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    
    // ============================================
    // DETECTAR SI EL USUARIO YA CONFIRMÓ
    // ============================================
    
    // Verificamos si hay datos guardados en localStorage
    try {
        const savedData = localStorage.getItem('rsvpData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Opcional: Pre-llenar el formulario con los datos guardados
            // O mostrar un mensaje que ya confirmó
            console.log('Usuario ya confirmó anteriormente:', data);
            
            // Descomenta esto si quieres mostrar un mensaje
            /*
            const alreadyConfirmed = confirm(
                `Hola ${data.fullName}, vemos que ya confirmaste tu asistencia. ¿Deseas actualizar tu información?`
            );
            
            if (alreadyConfirmed) {
                // Pre-llenar formulario
                document.getElementById('fullName').value = data.fullName;
                document.getElementById('email').value = data.email;
                document.getElementById('phone').value = data.phone;
            }
            */
        }
    } catch (e) {
        console.log('No se pudo acceder a localStorage:', e);
    }

    
    // ============================================
    // PREVENIR ENVÍO MÚLTIPLE DEL FORMULARIO
    // ============================================
    
    let isSubmitting = false;
    
    form.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        isSubmitting = true;
        
        // Deshabilitamos el botón de envío
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Re-habilitamos después de 3 segundos (por si hay error)
        setTimeout(() => {
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.innerHTML = '<i data-lucide="send"></i> Confirmar Asistencia';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 3000);
    });

    
    // ============================================
    // DETECCIÓN DE MODO OSCURO (OPCIONAL)
    // ============================================
    
    // Detectamos si el usuario prefiere modo oscuro
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('El usuario prefiere modo oscuro');
        // Aquí puedes añadir una clase al body si implementaste modo oscuro
        // document.body.classList.add('dark-mode');
    }
    
    // Escuchamos cambios en la preferencia
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const isDarkMode = e.matches;
        console.log('Cambio de tema:', isDarkMode ? 'Oscuro' : 'Claro');
        // document.body.classList.toggle('dark-mode', isDarkMode);
    });

    
    // ============================================
    // FUNCIONES DE UTILIDAD
    // ============================================
    
    // Función para copiar texto al portapapeles
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Copiado al portapapeles: ' + text);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        } else {
            // Fallback para navegadores antiguos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Copiado al portapapeles: ' + text);
        }
    };
    
    // Función para compartir en redes sociales
    window.shareEvent = function(platform) {
        const url = window.location.href;
        const text = 'Estás invitado a nuestra boda - Mark & Ashley';
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    
    // ============================================
    // MENSAJES DE CONSOLA PERSONALIZADOS
    // ============================================
    
    console.log('%c💒 Bienvenido al RSVP de Mark & Ashley 💒', 
        'font-size: 20px; color: #4a5f4d; font-weight: bold;');
    console.log('%cSi encuentras algún error, por favor contáctanos', 
        'font-size: 12px; color: #8b9d83;');
    
    
    // ============================================
    // ANALYTICS (OPCIONAL)
    // ============================================
    
    // Si usas Google Analytics
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TU-ID-DE-GA');
    
    // Trackear cuando alguien confirma
    form.addEventListener('submit', function() {
        gtag('event', 'rsvp_submit', {
            'event_category': 'RSVP',
            'event_label': 'Form Submission'
        });
    });
    */
    
    
    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    
    // Detectamos si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log('Usuario en dispositivo móvil');
        // Puedes añadir funcionalidad específica para móvil aquí
    }
    
    
    // ============================================
    // GUARDAR EN CALENDARIO (OPCIONAL)
    // ============================================
    
    window.addToCalendar = function() {
        // EDITAR: Personaliza los detalles del evento
        const eventDetails = {
            title: 'Boda de Mark & Ashley',
            description: 'Celebración de nuestra boda',
            location: 'Jardín Botanical Gardens, 123 Garden Lane, San Diego, CA',
            startDate: '20260413T150000', // Formato: YYYYMMDDTHHMMSS
            endDate: '20260413T230000'
        };
        
        // Formato para Google Calendar
        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startDate}/${eventDetails.endDate}`;
        
        window.open(googleCalUrl, '_blank');
    };
    
    
    // ============================================
    // EASTER EGGS (OPCIONAL - DIVERTIDO)
    // ============================================
    
    // Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            console.log('🎉 ¡Código Konami activado! 🎉');
            // Añade aquí algo divertido, como confetti o una animación especial
            document.body.style.animation = 'rainbow 2s infinite';
        }
    });
    
    
    // ============================================
    // LOGGING PARA DEBUGGING
    // ============================================
    
    console.log('✅ JavaScript cargado correctamente');
    console.log('📅 Fecha de la boda:', weddingDate.toLocaleDateString('es-MX'));
    console.log('🎨 Tema:', getComputedStyle(document.documentElement).getPropertyValue('--color-primary'));
    
}); // Fin del DOMContentLoaded


// ============================================
// FUNCIONES GLOBALES (fuera del DOMContentLoaded)
// ============================================

// Función para verificar si el formulario tiene cambios sin guardar
window.addEventListener('beforeunload', function(e) {
    const form = document.getElementById('rsvpForm');
    
    if (!form) return;
    
    // Verificamos si hay datos en el formulario
    const hasData = form.querySelector('input[type="text"]').value !== '' ||
                    form.querySelector('input[type="email"]').value !== '';
    
    // Si hay datos y el formulario está visible (no se ha enviado)
    if (hasData && form.style.display !== 'none') {
        e.preventDefault();
        e.returnValue = '¿Estás seguro de salir? Tienes cambios sin guardar.';
        return e.returnValue;
    }
});


// ============================================
// SERVICE WORKER (Para PWA - OPCIONAL)
// ============================================

// Si quieres convertir esto en una PWA (Progressive Web App)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registrado:', registration);
            })
            .catch(error => {
                console.log('Error al registrar ServiceWorker:', error);
            });
    });
}
*/


// ============================================
// CONSOLE ART (OPCIONAL - PARA IMPRESIONAR)
// ============================================

console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║        💒 MARK & ASHLEY 💒           ║
    ║                                       ║
    ║         13 de Abril, 2026            ║
    ║                                       ║
    ║     ¡Gracias por confirmar!          ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
`);