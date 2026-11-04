// ============ AUDIO HANDLING ============
const audio = document.getElementById('themeAudio');
const muteBtn = document.getElementById('muteBtn');

if (audio && muteBtn) {
  window.addEventListener('load', () => {
    audio.volume = 0.4;
    // Autoplay attempt
    audio.play().catch(() => {
      console.log('Autoplay blocked. User must interact.');
    });
  });

  muteBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      muteBtn.textContent = '🔊 Sound';
      muteBtn.style.color = '#d4af37';
    } else {
      audio.pause();
      muteBtn.textContent = '🔇 Muted';
      muteBtn.style.color = '#888';
    }
  });
}

// ============ NAVIGATION ============
const navButtons = document.querySelectorAll('.nav-btn[data-section]');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-trigger reveal animations for the new section
    setTimeout(initScrollReveal, 100);
  });
});

// ============ SCROLL REVEAL (Intersection Observer) ============
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}
initScrollReveal();

// ============ 3D TILT EFFECT FOR CARDS ============
const cards = document.querySelectorAll('.kingdom-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg rotation
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ============ MAP INFO PANEL ============
const kingdomData = {
  north: { title: 'The North', sigil: '🐺', house: 'House Stark', ruler: 'King Bran the Broken', seat: 'Winterfell', desc: 'The largest of the Seven Kingdoms. A harsh land of snow and ancient forests, ruled for millennia by the Kings in the North.' },
  vale: { title: 'The Vale of Arryn', sigil: '🦅', house: 'House Arryn', ruler: 'Lord Robin Arryn', seat: 'The Eyrie', desc: 'A mountain kingdom protected by the Giant\'s Lance. Never taken by force. Protected by Lady Sansa Stark.' },
  river: { title: 'The Riverlands', sigil: '🐟', house: 'House Tully', ruler: 'Lord Edmure Tully', seat: 'Riverrun', desc: 'A fertile land of rivers but no natural borders — the battleground of every war.' },
  iron: { title: 'The Iron Islands', sigil: '🦑', house: 'House Greyjoy', ruler: 'Queen Yara Greyjoy', seat: 'Pyke', desc: 'A harsh archipelago of reavers who worship the Drowned God.' },
  west: { title: 'The Westerlands', sigil: '🦁', house: 'House Lannister', ruler: 'Lord Tyrion Lannister', seat: 'Casterly Rock', desc: 'The richest kingdom, famed for its gold mines.' },
  crown: { title: 'The Crownlands', sigil: '👑', house: 'The Iron Throne', ruler: 'King Bran the Broken', seat: 'King\'s Landing', desc: 'The lands around the capital, ruled directly from the Iron Throne.' },
  reach: { title: 'The Reach', sigil: '🌹', house: 'House Baratheon', ruler: 'Lord Gendry Baratheon', seat: 'Highgarden', desc: 'The most fertile and populous kingdom.' },
  storm: { title: 'The Stormlands', sigil: '🦌', house: 'House Baratheon', ruler: 'Lord Gendry Baratheon', seat: 'Storm\'s End', desc: 'A land of storms and proud warriors.' },
  dorne: { title: 'Dorne', sigil: '☀️', house: 'House Martell', ruler: 'Unknown Martell heir', seat: 'Sunspear', desc: 'The southernmost kingdom of deserts and passion.' },
  beyond: { title: 'Beyond the Wall', sigil: '❄️', house: 'The Free Folk', ruler: 'Tormund Giantsbane', seat: 'The True North', desc: 'The frozen lands north of the Wall, home to the Free Folk who refuse to kneel.' },
  wall: { title: 'The Wall', sigil: '🧊', house: 'The Night\'s Watch', ruler: 'Lord Commander', seat: 'Castle Black', desc: 'A colossal fortification of ice, 300 miles long and 700 feet tall. Built 8,000 years ago to defend against the White Walkers.' }
};

const regions = document.querySelectorAll('.region');
const panel = document.getElementById('infoPanel');
const panelContent = document.getElementById('panelContent');

regions.forEach(region => {
  region.addEventListener('click', (e) => {
    e.stopPropagation();
    const key = region.dataset.kingdom;
    const data = kingdomData[key];
    if (!data) return;

    panelContent.innerHTML = `
      <div style="text-align:center; font-size:3.5rem; margin-bottom:1rem; filter: drop-shadow(0 0 15px rgba(212,175,55,0.5));">${data.sigil}</div>
      <h2 style="color:#d4af37; text-align:center; font-family:'Cinzel Decorative', serif; letter-spacing:0.15em; margin-bottom:0.5rem;">${data.title}</h2>
      <p style="text-align:center; color:#f0d878; font-weight:700; font-size:1.1rem;">${data.house}</p>
      <p style="text-align:center; color:#999; font-style:italic; margin-bottom:1rem;">Seat: ${data.seat}</p>
      <p style="text-align:center; color:#d4af37; margin-bottom:1.5rem; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); padding: 0.8rem 0;">
        <strong>Ruled by:</strong> ${data.ruler}
      </p>
      <p style="font-family:'MedievalSharp', cursive; line-height:1.8; color:#d4c4a0; font-size:1.05rem; text-align:center;">${data.desc}</p>
    `;
    panel.classList.remove('hidden');
  });
});

function closePanel() { panel.classList.add('hidden'); }

document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && !e.target.classList.contains('region')) {
    closePanel();
  }
});

// ============ PARTICLE SYSTEMS (Embers & Snow) ============
function initParticles() {
  const canvas = document.getElementById('emberCanvas') || document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  const isLanding = document.body.classList.contains('landing');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = isLanding ? canvas.height + 10 : -10;
      this.size = Math.random() * 3 + 1;
      this.speedY = isLanding ? -(Math.random() * 1.5 + 0.5) : (Math.random() * 1 + 0.3);
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.fade = Math.random() * 0.01 + 0.005;
      
      // Embers are orange/red, Snow is white/blue
      if (isLanding) {
        const colors = ['255, 100, 0', '255, 150, 50', '255, 200, 100'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        this.color = '200, 228, 255';
        this.speedY = Math.random() * 1.5 + 0.5; // Fall down
        this.y = -10;
      }
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
      this.opacity -= this.fade;
      if (this.opacity <= 0 || this.y < -10 || this.y > canvas.height + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      
      // Glow effect for embers
      if (isLanding) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      } else {
        ctx.shadowBlur = 0;
      }
    }
  }

  const particleCount = isLanding ? 80 : 150;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

initParticles();