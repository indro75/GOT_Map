// ============ DEVICE DETECTION ============
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============ AUDIO ============
const audio = document.getElementById('themeAudio');
const muteBtn = document.getElementById('muteBtn');

if (audio && muteBtn) {
  window.addEventListener('load', () => {
    audio.volume = 0.4;
    audio.play().catch(() => {});
  });

  muteBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      muteBtn.textContent = '🔊 Sound';
    } else {
      audio.pause();
      muteBtn.textContent = '🔇 Muted';
    }
  });
}

// ============ HAMBURGER MENU ============
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking a nav button
  navMenu.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
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
    setTimeout(initScrollReveal, 100);
  });
});

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
}
initScrollReveal();

// ============ 3D TILT (Desktop Only) ============
if (!isTouchDevice && !isMobile) {
  const cards = document.querySelectorAll('.kingdom-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// ============ MAP / LIST VIEW TOGGLE ============
const viewToggle = document.getElementById('viewToggle');
const mapContainer = document.getElementById('mapContainer');
const listView = document.getElementById('listView');

if (viewToggle && mapContainer && listView) {
  viewToggle.addEventListener('click', () => {
    const isListView = listView.classList.contains('hidden');
    if (isListView) {
      mapContainer.classList.add('hidden');
      listView.classList.remove('hidden');
      viewToggle.querySelector('.toggle-text').textContent = 'Switch to Map View';
      viewToggle.querySelector('.toggle-icon').textContent = '🗺';
    } else {
      mapContainer.classList.remove('hidden');
      listView.classList.add('hidden');
      viewToggle.querySelector('.toggle-text').textContent = 'Switch to List View';
      viewToggle.querySelector('.toggle-icon').textContent = '☰';
    }
  });
}

// ============ KINGDOM DATA ============
const kingdomData = {
  north: { title: 'The North', sigil: '🐺', house: 'House Stark', ruler: 'King Bran the Broken', seat: 'Winterfell', desc: 'The largest of the Seven Kingdoms. A harsh land of snow and ancient forests, ruled for millennia by the Kings in the North.' },
  vale: { title: 'The Vale of Arryn', sigil: '🦅', house: 'House Arryn', ruler: 'Lord Robin Arryn', seat: 'The Eyrie', desc: 'A mountain kingdom protected by the Giant\'s Lance. Never taken by force.' },
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

// ============ INFO PANEL (Map Clicks) ============
const regions = document.querySelectorAll('.region');
const listItems = document.querySelectorAll('.list-item');
const panel = document.getElementById('infoPanel');
const panelContent = document.getElementById('panelContent');

function openInfoPanel(key) {
  const data = kingdomData[key];
  if (!data) return;
  panelContent.innerHTML = `
    <div style="text-align:center; font-size:3rem; margin-bottom:0.8rem;">${data.sigil}</div>
    <h2 style="color:#d4af37; text-align:center; font-family:'Cinzel Decorative', serif; letter-spacing:0.1em; margin-bottom:0.4rem; font-size:1.5rem;">${data.title}</h2>
    <p style="text-align:center; color:#f0d878; font-weight:700; margin-bottom:0.3rem;">${data.house}</p>
    <p style="text-align:center; color:#999; font-style:italic; margin-bottom:1rem; font-size:0.9rem;">Seat: ${data.seat}</p>
    <p style="text-align:center; color:#d4af37; margin-bottom:1rem; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); padding: 0.8rem 0; font-size:0.95rem;"><strong>Ruled by:</strong> ${data.ruler}</p>
    <p style="font-family:'MedievalSharp', cursive; line-height:1.7; color:#d4c4a0; text-align:center;">${data.desc}</p>
  `;
  panel.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  panel.classList.add('hidden');
  document.body.style.overflow = '';
}

regions.forEach(region => {
  region.addEventListener('click', (e) => {
    e.stopPropagation();
    openInfoPanel(region.dataset.kingdom);
  });
});

listItems.forEach(item => {
  item.addEventListener('click', () => openInfoPanel(item.dataset.kingdom));
});

document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && !e.target.closest('.region') && !e.target.closest('.list-item')) {
    closePanel();
  }
});

// ============ HOUSE MODAL ============
const housesData = {
  stark: { name: "House Stark", sigil: "🐺", words: "Winter is Coming", seat: "Winterfell", region: "The North", history: "House Stark is one of the Great Houses of Westeros and the principal house of the North. Their seat is Winterfell, an ancient castle built by Bran the Builder. The Starks are descended from the First Men and have ruled the North for thousands of years as Kings of Winter before bending the knee to Aegon the Conqueror. Known for their honor, duty, and connection to the old gods, the Starks are a house of warriors and leaders. During Robert's Rebellion and the War of the Five Kings, the Starks suffered greatly but ultimately survived to see Bran Stark become the first elected King of the Six Kingdoms.", characters: [ { name: "Eddard 'Ned' Stark", title: "Lord of Winterfell, Hand of the King", sigil: "⚔" }, { name: "Catelyn Stark", title: "Lady of Winterfell", sigil: "👑" }, { name: "Robb Stark", title: "King in the North", sigil: "👑" }, { name: "Sansa Stark", title: "Queen in the North", sigil: "👸" }, { name: "Arya Stark", title: "Slayer of the Night King", sigil: "🗡" }, { name: "Bran Stark", title: "King of the Six Kingdoms", sigil: "👁" }, { name: "Jon Snow", title: "King in the North", sigil: "🐉" } ] },
  lannister: { name: "House Lannister", sigil: "🦁", words: "Hear Me Roar!", seat: "Casterly Rock", region: "The Westerlands", history: "House Lannister of Casterly Rock is one of the Great Houses of Westeros and the principal house of the Westerlands. They are known for their immense wealth from the gold mines beneath Casterly Rock. The Lannisters are proud, cunning, and ambitious. Under Tywin Lannister, they became the most powerful house in Westeros. Cersei Lannister briefly ruled as Queen, but the house fell into decline after her death. Tyrion Lannister now serves as Hand of the King to Bran Stark.", characters: [ { name: "Tywin Lannister", title: "Lord of Casterly Rock", sigil: "🦁" }, { name: "Cersei Lannister", title: "Queen of the Seven Kingdoms", sigil: "👑" }, { name: "Jaime Lannister", title: "Kingslayer", sigil: "⚔" }, { name: "Tyrion Lannister", title: "Hand of the King", sigil: "🧠" }, { name: "Joffrey Baratheon", title: "King (secretly Lannister)", sigil: "👑" } ] },
  targaryen: { name: "House Targaryen", sigil: "🐉", words: "Fire and Blood", seat: "King's Landing / Dragonstone", region: "Crownlands", history: "House Targaryen was the royal house of the Seven Kingdoms for nearly 300 years. They conquered Westeros with dragons and ruled from the Iron Throne. Known for their silver-gold hair, purple eyes, and madness that plagued their bloodline. After Robert's Rebellion, the last Targaryens were exiled. Daenerys Targaryen returned with dragons to reclaim the throne but was killed by Jon Snow. With her death, the Targaryen dynasty ended.", characters: [ { name: "Aegon the Conqueror", title: "First Targaryen King", sigil: "🐉" }, { name: "Mad King Aerys II", title: "Last Targaryen King", sigil: "🔥" }, { name: "Daenerys Targaryen", title: "Mother of Dragons", sigil: "🐉" }, { name: "Jon Snow", title: "True Heir (Aegon Targaryen)", sigil: "⚔" }, { name: "Viserys Targaryen", title: "The Beggar King", sigil: "👑" } ] },
  baratheon: { name: "House Baratheon", sigil: "🦌", words: "Ours is the Fury", seat: "Storm's End", region: "The Stormlands", history: "House Baratheon was founded by Orys Baratheon, who took the lands, castle, and daughter of the last Storm King after Aegon's Conquest. Robert Baratheon led the rebellion against the Mad King and became King. After his death, his brothers Stannis and Renly claimed the throne. The legitimate line ended with Robert's children (actually Lannisters). Gendry, Robert's bastard, was legitimized and granted Storm's End by King Bran.", characters: [ { name: "Robert Baratheon", title: "King of the Seven Kingdoms", sigil: "🔨" }, { name: "Stannis Baratheon", title: "Lord of Dragonstone", sigil: "🔥" }, { name: "Renly Baratheon", title: "Lord of Storm's End", sigil: "👑" }, { name: "Shireen Baratheon", title: "Princess", sigil: "👸" }, { name: "Gendry Baratheon", title: "Lord of Storm's End", sigil: "⚒" } ] },
  tyrell: { name: "House Tyrell", sigil: "🌹", words: "Growing Strong", seat: "Highgarden", region: "The Reach", history: "House Tyrell were the stewards of Highgarden who became Lords Paramount of the Reach. They are known for their wealth, fertile lands, and political cunning. Under Mace Tyrell, they allied with the Lannisters through marriage. Margaery Tyrell married three kings. The house was destroyed when Cersei blew up the Sept of Baelor, killing Mace, Margaery, and Loras. Highgarden was later granted to Gendry Baratheon.", characters: [ { name: "Mace Tyrell", title: "Lord of Highgarden", sigil: "🌹" }, { name: "Olenna Tyrell", title: "Queen of Thorns", sigil: "👵" }, { name: "Margaery Tyrell", title: "Queen Consort", sigil: "👸" }, { name: "Loras Tyrell", title: "The Knight of Flowers", sigil: "⚔" } ] },
  martell: { name: "House Martell", sigil: "☀️", words: "Unbowed, Unbent, Unbroken", seat: "Sunspear", region: "Dorne", history: "House Martell rules Dorne, the southernmost kingdom. They resisted Aegon's conquest and joined through marriage alliance a century later. The Martells use the title 'Prince' instead of 'Lord.' During the War of the Five Kings, they allied with the Targaryens. The main line was nearly extinguished when Ellaria Sand killed Prince Doran and his heir Trystane. The house continues through an unknown heir.", characters: [ { name: "Doran Martell", title: "Prince of Dorne", sigil: "🤴" }, { name: "Elia Martell", title: "Wife of Rhaegar", sigil: "👸" }, { name: "Oberyn Martell", title: "The Red Viper", sigil: "🐍" }, { name: "Trystane Martell", title: "Prince of Dorne", sigil: "🤴" }, { name: "Ellaria Sand", title: "Paramour of Oberyn", sigil: "🗡" } ] },
  greyjoy: { name: "House Greyjoy", sigil: "🦑", words: "We Do Not Sow", seat: "Pyke", region: "The Iron Islands", history: "House Greyjoy rules the Iron Islands from their castle Pyke. They worship the Drowned God and follow the Old Way of reaving. After a failed rebellion, Balon Greyjoy's sons were taken as wards. Theon Greyjoy betrayed the Starks but later redeemed himself. Yara fought for the throne but was captured by Euron. After the wars, Yara became Queen of the Iron Islands - the first woman to rule.", characters: [ { name: "Balon Greyjoy", title: "Lord of the Iron Islands", sigil: "👑" }, { name: "Euron Greyjoy", title: "King of the Iron Islands", sigil: "👁" }, { name: "Theon Greyjoy", title: "Prince of Winterfell", sigil: "🦌" }, { name: "Yara Greyjoy", title: "Queen of the Iron Islands", sigil: "⚓" }, { name: "Victarion Greyjoy", title: "Lord Captain of the Iron Fleet", sigil: "⚔" } ] },
  arryn: { name: "House Arryn", sigil: "🦅", words: "As High as Honor", seat: "The Eyrie", region: "The Vale of Arryn", history: "House Arryn rules the Vale from their impregnable castle, the Eyrie, perched high in the Mountains of the Moon. They are one of the oldest and noblest houses. The Eyrie has never been taken by force. Jon Arryn fostered both Eddard Stark and Robert Baratheon, and his death sparked the War of the Five Kings. Lady Sansa Stark served as protector of the Vale alongside young Lord Robin Arryn.", characters: [ { name: "Jon Arryn", title: "Lord of the Eyrie, Hand of the King", sigil: "🦅" }, { name: "Lysa Arryn", title: "Lady of the Eyrie", sigil: "👸" }, { name: "Robert (Robin) Arryn", title: "Lord of the Eyrie", sigil: "🤴" }, { name: "Elbert Arryn", title: "Heir to the Eyrie", sigil: "⚔" } ] },
  tully: { name: "House Tully", sigil: "🐟", words: "Family, Duty, Honor", seat: "Riverrun", region: "The Riverlands", history: "House Tully rules the Riverlands from Riverrun. Unlike other Great Houses, they were not kings before Aegon's Conquest but were elevated to Lords Paramount for supporting the Conqueror. The Tullys are known for their sense of duty and family loyalty. Hoster Tully's children married into the Stark and Arryn houses. After the Red Wedding, the Freys held Riverrun, but it was eventually reclaimed by Edmure Tully.", characters: [ { name: "Hoster Tully", title: "Lord of Riverrun", sigil: "👑" }, { name: "Catelyn Tully Stark", title: "Lady of Winterfell", sigil: "👸" }, { name: "Lysa Tully Arryn", title: "Lady of the Eyrie", sigil: "👸" }, { name: "Edmure Tully", title: "Lord of Riverrun", sigil: "⚔" }, { name: "Brynden 'Blackfish' Tully", title: "Knight of Riverrun", sigil: "🐟" } ] }
};

function openHouseModal(houseKey) {
  const house = housesData[houseKey];
  if (!house) return;
  document.getElementById('modalSigil').textContent = house.sigil;
  document.getElementById('modalHouseName').textContent = house.name;
  document.getElementById('modalWords').textContent = `"${house.words}"`;
  document.getElementById('modalHistory').textContent = house.history;
  document.getElementById('modalSeat').textContent = `${house.seat}, ${house.region}`;
  document.getElementById('modalCharacters').innerHTML = house.characters.map(c => `
    <div class="character-card">
      <div class="character-sigil">${c.sigil}</div>
      <div class="character-name">${c.name}</div>
      <div class="character-title">${c.title}</div>
    </div>
  `).join('');
  document.getElementById('houseModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeHouseModal() {
  document.getElementById('houseModal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.house-btn').forEach(btn => {
    btn.addEventListener('click', () => openHouseModal(btn.dataset.house));
  });

  const houseModal = document.getElementById('houseModal');
  if (houseModal) {
    houseModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) closeHouseModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHouseModal();
      closePanel();
    }
  });
});

// ============ PARTICLE SYSTEMS (Performance-Aware) ============
function initParticles() {
  const canvas = document.getElementById('emberCanvas') || document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const isLanding = document.body.classList.contains('landing');
  
  // Reduce particles on mobile for performance
  const particleCount = isMobile ? (isLanding ? 30 : 60) : (isLanding ? 80 : 150);
  
  let particles = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : (isLanding ? canvas.height + 10 : -10);
      this.size = Math.random() * (isMobile ? 2 : 3) + 1;
      this.speedY = isLanding ? -(Math.random() * 1.2 + 0.3) : (Math.random() * 1 + 0.3);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.fade = Math.random() * 0.008 + 0.003;
      
      if (isLanding) {
        const colors = ['255, 100, 0', '255, 150, 50', '255, 200, 100'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        this.color = '200, 228, 255';
        this.speedY = Math.random() * 1.2 + 0.4;
        this.y = -10;
      }
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
      this.opacity -= this.fade;
      if (this.opacity <= 0 || this.y < -10 || this.y > canvas.height + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      if (isLanding) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.6)`;
      } else {
        ctx.shadowBlur = 0;
      }
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  let lastTime = 0;
  const targetFPS = isMobile ? 30 : 60;
  const frameInterval = 1000 / targetFPS;

  function animate(time) {
    requestAnimationFrame(animate);
    if (time - lastTime < frameInterval) return;
    lastTime = time;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
  }
  
  if (!prefersReducedMotion) requestAnimationFrame(animate);
}

initParticles();