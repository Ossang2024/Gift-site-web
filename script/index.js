// code du header qui disparait progréssivement avec le scrool 
let lastScrollY = window.scrollY;
const header = document.getElementById('header');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  // Si le menu mobile est ouvert, ne pas transformer le header
  if (mobileMenu && mobileMenu.classList.contains('open')) return;

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




// iframe des projets
// document.querySelector('.map-preview').addEventListener('click', () => {
//     document.querySelector('.map-container').classList.add('active');
// });








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
    el.innerHTML = text;  // Utilise innerHTML pour permettre les liens HTML
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

    // Réponses locales sans IA : dataset + matching simple
    const faq = [
      { patterns: ['bonjour','salut','bonsoir','hello'], reply: "Bonjour 👋 — Je suis l'assistant Gift Center. Vous peux vous donner des informations concernant nos formations, cours, contact, horaires ou encores langues & voyaages." },
      { patterns: ['formation','formations','cours','Design','infographie','Montage vidéo', 'bureautique', 'sécrétariat'], reply: "Nous proposons des formations en  <a href='../views/programmation.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' >Développement Web & Mobile</a>, <a href='../views/infographie.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' > Infographie & Design</a>, <a href='../views/bureautique.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' >Sécrétariat Bureautique</a> et en <a href='../views/montage_vidéo.html' target='_blank' style='color:blue;text-decoration:none' >Montage vidéo</a>. " },
      { patterns: ['langue','langues','anglais','allemand','italien','italiens'], reply: "Langues & Voyage : nous enseignons l'anglais, l'allemand et l'italien. Plus d'infos, visitez nos pages <a href='../views/allemand.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' >d'allemand</a>, <a href='../views/anglais.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' >d'anglais</a> ou <a href='../views/italiens.html' target='_blank' style='color:blue;font-weight: bold;text-decoration:none' >d'italiens</a>" },
      { patterns: ['création','creation','site','site web','web'], reply: "Création digitale : développement de sites web et applications. Voir : views/création.html" },
      { patterns: ['projet','projets','portfolio'], reply: "Nos projets sont listés <a href='../views/projets.html' target='_blank' style='color:blue; font-weight: bold;text-decoration:none' >ici</a> : — vous y trouverez des exemples et des démos." },
      { patterns: ['contact','adresse','où','ou','ou se','douala','cameroun'], reply: "Nous sommes à Ange Raphael, Douala, Cameroun. WhatsApp : +237 6 95 20 03 78 — Email : giftcenter237@gmail.com" },
      { patterns: ['horaire','heures','heure','jours','ouvert','fermeture'], reply: "Horaires : contactez-nous via WhatsApp pour les horaires exacts ou envoyez un e-mail à giftcenter237@gmail.com." },
      { patterns: ['newsletter','inscrire','inscription','comment'], reply: "Pour vous inscrire à la newsletter, utilisez le <a href='#news' target='_blank' style='color:blue;text-decoration:none' >formulire</a> en bas de la page (footer)." },
      { patterns: ['merci','thanks','thank'], reply: "Avec plaisir ! Si vous avez d'autres questions, demandez :)" },
      { patterns: ['qui êtes vous','c est quoi','présentation','the net','ton rôle','vous faites quoi'],reply: "Nous sommes The Net, un centre de formation en programmation, cybersécurité, bureautique, langues et création de sites web. Nous aidons les étudiants à développer leurs compétences et à atteindre leurs objectifs."},
      { patterns: ['programmation','coder','coding','python','php','html','css','javascript','formation dev'],reply: "Formation Programmation : nous proposons des cours en Python, PHP, HTML/CSS, JavaScript, et développement web complet. Plus de détails disponibles dans la section formations."},
      { patterns: ['cybersécurité','cybersecurité','sécurité informatique','hacker','ethical hacking'],reply: "Cybersécurité : nos formations couvrent les bases de la sécurité informatique, la protection des données, et les techniques d'ethical hacking pour sécuriser les systèmes."},
      { patterns: ['bureautique','excel','word','powerpoint','office','microsoft office'], reply: "Bureautique : nous formons à Word, Excel et PowerPoint du niveau débutant au niveau avancé. Formation idéale pour étudiants, enseignants et professionnels."}
    ];

    function normalize(s){
      return (s||'').toLowerCase().replace(/[.,!?;:\/\\]/g,'').trim();
    }

    function findBestReply(text){
      const t = normalize(text);
      // exact keywords
      let best = null;
      let bestScore = 0;
      faq.forEach(item => {
        let score = 0;
        item.patterns.forEach(p => { if (t.includes(p)) score++; });
        if (score > bestScore) { bestScore = score; best = item; }
      });
      if (bestScore > 0) return best.reply;

      // détecter demande de contact humain
      if (/humain|personne|conseiller|parler|téléphone|appel/.test(t)) {
        return "Vous voulez parler à un conseiller ? Contactez-nous sur WhatsApp : +237 6 95 20 03 78 — ou envoyez un e-mail à giftcenter237@gmail.com.";
      }

      // détecter question sur prix
      if (/prix|coût|tarif|combien/.test(t)) {
        return "Les tarifs varient selon la formation; contactez-nous sur WhatsApp pour un devis rapide : +237 6 95 20 03 78.";
      }

      // fallback : proposer options rapides
      return "Désolé, je ne suis pas sûr de comprendre. Vous pouvez demander : 'formations', 'langues', 'contact' — ou écrire 'conseiller' pour parler à un humain.";
    }

    // Simuler délai de réflexion/typing
    setTimeout(() => {
      if (body.contains(typing)) body.removeChild(typing);
      const reply = findBestReply(userText);
      appendMessage(reply, 'bot-message');
      body.scrollTop = body.scrollHeight;
    }, 700 + Math.min(1200, userText.length * 30));
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















// === MENU OPEN/CLOSE ===
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

// Fermer le menu mobile si l'utilisateur clique en dehors
function closeMobileMenu() {
  if (!menuBtn || !mobileMenu) return;
  menuBtn.classList.remove('active');
  mobileMenu.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!mobileMenu || !menuBtn) return;
  if (!mobileMenu.classList.contains('open')) return;
  const target = e.target;
  // Ne rien faire si le clic est sur le bouton du menu ou à l'intérieur du menu
  if (menuBtn.contains(target) || mobileMenu.contains(target)) return;
  closeMobileMenu();
});

// Sur les appareils tactiles, capter touchstart pour réactivité
document.addEventListener('touchstart', (e) => {
  if (!mobileMenu || !menuBtn) return;
  if (!mobileMenu.classList.contains('open')) return;
  const target = e.target;
  if (menuBtn.contains(target) || mobileMenu.contains(target)) return;
  closeMobileMenu();
}, { passive: true });

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (!mobileMenu || !menuBtn) return;
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
  }
});

// === ACCORDION ===
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(acc => {
  acc.querySelector(".acc-btn").addEventListener("click", () => {
    acc.classList.toggle("open");
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