// code du header qui disparait progréssivement avec le scrool 
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // On scroll vers le bas → cacher le header
    header.classList.add('hide');
  } else {
    // On scroll vers le haut → montrer le header
    header.classList.remove('hide');
  }
  lastScrollY = window.scrollY;
});









// Slideshow automatique avec animation du texte
const slides = document.querySelectorAll('.slider-item');
let currentSlide = 0;
const slideInterval = 6000; // 4 secondes

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initialisation
showSlide(currentSlide);
setInterval(nextSlide, slideInterval);






// animation des chifres dans la section statistiques
  const counters = document.querySelectorAll('.count');
  const speed = 100; // plus le chiffre est bas, plus c’est rapide

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 50);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Lance l’animation quand l’utilisateur arrive à la section
  window.addEventListener('scroll', () => {
    const section = document.querySelector('#stats');
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.2;

    if (sectionTop < triggerPoint) {
      animateCounters();
    }
  });





// Toggle de la liste ul au clic sur l'image de chaque .cart
document.querySelectorAll('.col14 .cart h2').forEach(h2 => {
    h2.addEventListener('click', function(e) {
        const cart = this.closest('.cart');
        cart.classList.toggle('show-ul');
    });
});







function changeOption(option) {
    image = document.querySelector (".img")
    text = document.querySelector(".testimony-text")
    title_name = document.querySelector(".title_name")
    title_profession = document.querySelector(".title_profession")
    const point1 = document.querySelector('.point1')
    const point2 = document.querySelector('.point2')
    const point3 = document.querySelector('.point3')

    // Retirer la classe active de tous les points
    point1.classList.remove("active-testimony");
    point2.classList.remove("active-testimony");
    point3.classList.remove("active-testimony");

    if (option === 1 ) {
        text.textContent = '"Grâce au programme \'Langues & Voyage\' de Gift Center, j\'ai gagné en confiance et en fluidité en anglais en seulement quelques mois. "';
        image.src = "../assets/images/testimonial-1.jpg";
        title_name.textContent = 'Sarah Lee';
        title_profession.textContent = 'Teacher' ;
        point1.classList.add("active-testimony");
    } else if (option === 2 ) {
        text.textContent = '"Les cours sont pratiques, les formateurs attentifs et les simulations de voyage m\'ont préparé aux situations réelles."'
        image.src = "../assets/images/testimonial2.jpg"
        title_name.textContent = "Jack Rucher"
        title_profession.textContent = "Student"
        point = document.querySelector(".point2")
        point2.classList.add("active-testimony")
    } else if (option === 3 ) {
        text.textContent = '"J\'ai pu voyager et communiquer sereinement — une vraie transformation pour ma carrière." "'
        image.src = "../assets/images/testimonial3.jpg"
        title_name.textContent = "Young Man"
        title_profession.textContent = "Engenier"
        point3.classList.add('active-testimony');
    }
}








// Chatbot flottant — initialisation
(function(){
  const floatBtn = document.getElementById('chat-float');
  const widget = document.getElementById('chat-widget');
  const closeBtn = document.getElementById('chat-close');
  const minimizeBtn = document.getElementById('chat-minimize');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');
  const quick = document.querySelectorAll('.chat-quick button');

  if (!floatBtn || !widget) return;

  function openWidget() {
    widget.classList.add('open');
    widget.setAttribute('aria-hidden','false');
    input.focus();
  }
  function closeWidget() {
    widget.classList.remove('open');
    widget.setAttribute('aria-hidden','true');
  }
  floatBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // évite que le document click ferme/réouvre instantanément
    const willOpen = !widget.classList.contains('open');
    if (willOpen) {
      widget.classList.add('open');
      widget.setAttribute('aria-hidden','false');
      // décaler légèrement le focus pour éviter blocage/scroll/keyboard instantané
      setTimeout(() => {
        if (input) input.focus({ preventScroll: true });
      }, 120);
    } else {
      widget.classList.remove('open');
      widget.setAttribute('aria-hidden','true');
    }
  });
  closeBtn && closeBtn.addEventListener('click', closeWidget);
  minimizeBtn && minimizeBtn.addEventListener('click', () => widget.classList.toggle('open'));

  // quick action handlers
  quick.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      if (action === 'formations') return sendSystemMessage("Voir nos formations → https://example.com/formations");
      if (action === 'creation') return sendSystemMessage("Création digitale → https://example.com/creation");
      if (action === 'langues') return sendSystemMessage("Langues & Voyage → https://example.com/langues");
    });
  });

  function appendMessage(text, cls='bot-message') {
    const el = document.createElement('div');
    el.className = cls;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function sendSystemMessage(text){
    appendMessage(text,'system-message');
  }

  function simulateReply(userText){
    // typing indicator
    const typing = document.createElement('div');
    typing.className = 'bot-message';
    typing.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    })
    .then(async (r) => {
      const json = await r.json();
      body.removeChild(typing);
      if (r.ok && json && json.reply) {
        appendMessage(json.reply, 'bot-message');
      } else {
        appendMessage(json.error || "Désolé, je n'ai pas de réponse pour le moment.", 'bot-message');
      }
      body.scrollTop = body.scrollHeight;
    })
    .catch(err => {
      if (body.contains(typing)) body.removeChild(typing);
      appendMessage("Erreur de connexion au serveur.", 'bot-message');
      console.error(err);
    });
  }


  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      appendMessage(val, 'user-message');
      input.value = '';
      simulateReply(val);
    });
  }

  // close widget when clicking outside on large screens
  document.addEventListener('click', (e) => {
    if (!widget.classList.contains('open')) return;
    if (e.target === floatBtn || widget.contains(e.target)) return;
    // ignore clicks on the floating return-to-top button
    const floatBtnTop = document.querySelector('.float-btn');
    if (floatBtnTop && floatBtnTop.contains && floatBtnTop.contains(e.target)) return;
    widget.classList.remove('open');
    widget.setAttribute('aria-hidden','true');
  });

})();





  // Affichage du menu mobile
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Accordéon
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });













// Footer : newsletter simple + animation de confirmation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('news-name').value.trim();
    const email = document.getElementById('news-email').value.trim();
    // validation basique
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      form.classList.add('shake');
      setTimeout(()=> form.classList.remove('shake'), 600);
      return;
    }
    // Effet d'envoi : remplacer par appel API réel si besoin
    const btn = form.querySelector('.btn-subscribe');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    setTimeout(()=>{
      btn.innerHTML = '<i class="fas fa-check"></i> Merci !';
      btn.style.background = 'linear-gradient(90deg, var(--accent), var(--primary))';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> S\'inscrire';
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });
});