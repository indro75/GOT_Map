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
// ============ HOUSE DATA ============
const housesData = {
  stark: {
    name: "House Stark",
    sigil: "🐺",
    words: "Winter is Coming",
    seat: "Winterfell",
    region: "The North",
    history: "House Stark is one of the Great Houses of Westeros and the principal house of the North. Their seat is Winterfell, an ancient castle built by Bran the Builder. The Starks are descended from the First Men and have ruled the North for thousands of years as Kings of Winter before bending the knee to Aegon the Conqueror. Known for their honor, duty, and connection to the old gods, the Starks are a house of warriors and leaders. During Robert's Rebellion and the War of the Five Kings, the Starks suffered greatly but ultimately survived to see Bran Stark become the first elected King of the Six Kingdoms.",
    characters: [
      { name: "Eddard 'Ned' Stark", title: "Lord of Winterfell, Hand of the King", sigil: "" },
      { name: "Catelyn Stark", title: "Lady of Winterfell", sigil: "👑" },
      { name: "Robb Stark", title: "King in the North", sigil: "👑" },
      { name: "Sansa Stark", title: "Queen in the North", sigil: "👸" },
      { name: "Arya Stark", title: "No One, Slayer of the Night King", sigil: "🗡" },
      { name: "Bran Stark", title: "King of the Six Kingdoms, The Three-Eyed Raven", sigil: "👁" },
      { name: "Jon Snow", title: "King in the North, Lord Commander", sigil: "🐉" }
    ]
  },
  lannister: {
    name: "House Lannister",
    sigil: "🦁",
    words: "Hear Me Roar! (Unofficial: A Lannister Always Pays His Debts)",
    seat: "Casterly Rock",
    region: "The Westerlands",
    history: "House Lannister of Casterly Rock is one of the Great Houses of Westeros and the principal house of the Westerlands. They are known for their immense wealth from the gold mines beneath Casterly Rock. The Lannisters are proud, cunning, and ambitious. Under Tywin Lannister, they became the most powerful house in Westeros. Cersei Lannister briefly ruled as Queen, but the house fell into decline after her death. Tyrion Lannister now serves as Hand of the King to Bran Stark, while the future of Casterly Rock remains uncertain.",
    characters: [
      { name: "Tywin Lannister", title: "Lord of Casterly Rock, Hand of the King", sigil: "🦁" },
      { name: "Cersei Lannister", title: "Queen of the Seven Kingdoms", sigil: "👑" },
      { name: "Jaime Lannister", title: "Kingslayer, Lord Commander of the Kingsguard", sigil: "⚔" },
      { name: "Tyrion Lannister", title: "Hand of the King to Bran Stark", sigil: "" },
      { name: "Joffrey Baratheon", title: "King (secretly a Lannister)", sigil: "👑" }
    ]
  },
  targaryen: {
    name: "House Targaryen",
    sigil: "🐉",
    words: "Fire and Blood",
    seat: "King's Landing (formerly), Dragonstone",
    region: "Crownlands",
    history: "House Targaryen was the royal house of the Seven Kingdoms for nearly 300 years. They conquered Westeros with dragons and ruled from the Iron Throne. Known for their silver-gold hair, purple eyes, and madness that plagued their bloodline, the Targaryens practiced incest to keep their bloodline pure. After Robert's Rebellion, the last Targaryens were exiled. Daenerys Targaryen returned with dragons to reclaim the throne but was killed by Jon Snow. With her death, the Targaryen dynasty ended, though Jon Snow (Aegon Targaryen) carries their blood.",
    characters: [
      { name: "Aegon the Conqueror", title: "First Targaryen King", sigil: "🐉" },
      { name: "Mad King Aerys II", title: "Last Targaryen King before Robert", sigil: "" },
      { name: "Daenerys Targaryen", title: "Mother of Dragons, Breaker of Chains", sigil: "🐉" },
      { name: "Jon Snow (Aegon Targaryen)", title: "True Heir to the Iron Throne", sigil: "⚔" },
      { name: "Viserys Targaryen", title: "The Beggar King", sigil: "👑" }
    ]
  },
  baratheon: {
    name: "House Baratheon",
    sigil: "🦌",
    words: "Ours is the Fury",
    seat: "Storm's End",
    region: "The Stormlands",
    history: "House Baratheon was founded by Orys Baratheon, who took the lands, castle, and daughter of the last Storm King after Aegon's Conquest. Robert Baratheon led the rebellion against the Mad King and became King of the Seven Kingdoms. After his death, his brothers Stannis and Renly claimed the throne, leading to the War of the Five Kings. The legitimate Baratheon line ended with the deaths of Robert's children (who were actually Lannisters). Gendry, Robert's bastard son, was legitimized and granted Storm's End by King Bran, continuing the house.",
    characters: [
      { name: "Robert Baratheon", title: "King of the Seven Kingdoms", sigil: "🔨" },
      { name: "Stannis Baratheon", title: "Lord of Dragonstone, Claimant King", sigil: "🔥" },
      { name: "Renly Baratheon", title: "Lord of Storm's End, Claimant King", sigil: "👑" },
      { name: "Shireen Baratheon", title: "Princess", sigil: "👸" },
      { name: "Gendry Baratheon", title: "Lord of Storm's End (legitimized)", sigil: "" }
    ]
  },
  tyrell: {
    name: "House Tyrell",
    sigil: "🌹",
    words: "Growing Strong",
    seat: "Highgarden",
    region: "The Reach",
    history: "House Tyrell were the stewards of Highgarden who became Lords Paramount of the Reach after the extinction of House Gardener. They are known for their wealth, fertile lands, and political cunning. Under Mace Tyrell, they allied with the Lannisters through marriage. Margaery Tyrell married three kings. The house was destroyed when Cersei blew up the Sept of Baelor, killing Mace, Margaery, and Loras. Highgarden was later granted to Gendry Baratheon by King Bran.",
    characters: [
      { name: "Mace Tyrell", title: "Lord of Highgarden, Hand of the King", sigil: "🌹" },
      { name: "Olenna Tyrell", title: "Queen of Thorns", sigil: "👵" },
      { name: "Margaery Tyrell", title: "Queen Consort (to 3 Kings)", sigil: "👸" },
      { name: "Loras Tyrell", title: "The Knight of Flowers", sigil: "⚔" }
    ]
  },
  martell: {
    name: "House Martell",
    sigil: "☀️",
    words: "Unbowed, Unbent, Unbroken",
    seat: "Sunspear",
    region: "Dorne",
    history: "House Martell rules Dorne, the southernmost kingdom of Westeros. They resisted Aegon's conquest and joined the Seven Kingdoms through marriage alliance a century later. The Martells are known for their passion, pride, and distinct culture influenced by the Rhoynar. They use the title 'Prince' instead of 'Lord.' During the War of the Five Kings, they allied with the Targaryens through marriage. The main line was nearly extinguished when Ellaria Sand and the Sand Snakes killed Prince Doran and his heir Trystane. The house continues through an unknown heir.",
    characters: [
      { name: "Doran Martell", title: "Prince of Dorne", sigil: "" },
      { name: "Elia Martell", title: "Princess, wife of Rhaegar Targaryen", sigil: "👸" },
      { name: "Oberyn Martell", title: "The Red Viper", sigil: "🐍" },
      { name: "Trystane Martell", title: "Prince of Dorne", sigil: "🤴" },
      { name: "Ellaria Sand", title: "Paramour of Oberyn", sigil: "🗡" }
    ]
  },
  greyjoy: {
    name: "House Greyjoy",
    sigil: "",
    words: "We Do Not Sow",
    seat: "Pyke",
    region: "The Iron Islands",
    history: "House Greyjoy rules the Iron Islands from their castle Pyke. They worship the Drowned God and follow the Old Way of reaving and raiding. After a failed rebellion against Robert Baratheon, Balon Greyjoy's sons were taken as wards. Theon Greyjoy betrayed the Starks but later redeemed himself. Yara (Asha) Greyjoy fought for the throne but was captured by Euron. After the wars, Yara was freed and bent the knee to Daenerys, then to Bran Stark, becoming Queen of the Iron Islands - the first woman to rule the Iron Islands.",
    characters: [
      { name: "Balon Greyjoy", title: "Lord of the Iron Islands", sigil: "👑" },
      { name: "Euron Greyjoy", title: "King of the Iron Islands", sigil: "👁" },
      { name: "Theon Greyjoy", title: "Prince of Winterfell", sigil: "🦌" },
      { name: "Yara (Asha) Greyjoy", title: "Queen of the Iron Islands", sigil: "⚓" },
      { name: "Victarion Greyjoy", title: "Lord Captain of the Iron Fleet", sigil: "⚔" }
    ]
  },
  arryn: {
    name: "House Arryn",
    sigil: "🦅",
    words: "As High as Honor",
    seat: "The Eyrie",
    region: "The Vale of Arryn",
    history: "House Arryn rules the Vale of Arryn from their impregnable castle, the Eyrie, perched high in the Mountains of the Moon. They are one of the oldest and noblest houses, descended from the First Men and the Andal kings. The Eyrie has never been taken by force. Jon Arryn fostered both Eddard Stark and Robert Baratheon, and his death sparked the War of the Five Kings. After the deaths of Lysa and her son Robert (Robin) Arryn's minority, Lady Sansa Stark served as protector of the Vale, effectively ruling alongside young Lord Robin Arryn.",
    characters: [
      { name: "Jon Arryn", title: "Lord of the Eyrie, Hand of the King", sigil: "" },
      { name: "Lysa Arryn", title: "Lady of the Eyrie", sigil: "👸" },
      { name: "Robert (Robin) Arryn", title: "Lord of the Eyrie", sigil: "🤴" },
      { name: "Elbert Arryn", title: "Heir to the Eyrie", sigil: "⚔" }
    ]
  },
  tully: {
    name: "House Tully",
    sigil: "🐟",
    words: "Family, Duty, Honor",
    seat: "Riverrun",
    region: "The Riverlands",
    history: "House Tully rules the Riverlands from Riverrun. Unlike other Great Houses, they were not kings before Aegon's Conquest but were elevated to Lords Paramount for supporting the Conqueror. The Tullys are known for their sense of duty and family loyalty. Hoster Tully's children married into the Stark and Arryn houses, creating powerful alliances. During the War of the Five Kings, the Riverlands became the primary battlefield. After the Red Wedding, the Freys held Riverrun, but it was eventually reclaimed by Edmure Tully, who now rules as Lord Paramount of the Trident.",
    characters: [
      { name: "Hoster Tully", title: "Lord of Riverrun", sigil: "👑" },
      { name: "Catelyn Tully Stark", title: "Lady of Winterfell", sigil: "👸" },
      { name: "Lysa Tully Arryn", title: "Lady of the Eyrie", sigil: "👸" },
      { name: "Edmure Tully", title: "Lord of Riverrun", sigil: "⚔" },
      { name: "Brynden 'Blackfish' Tully", title: "Knight of Riverrun", sigil: "🐟" }
    ]
  }
};

// ============ HOUSE MODAL FUNCTIONS ============
function openHouseModal(houseKey) {
  const house = housesData[houseKey];
  if (!house) return;

  // Set modal content
  document.getElementById('modalSigil').textContent = house.sigil;
  document.getElementById('modalHouseName').textContent = house.name;
  document.getElementById('modalWords').textContent = `"${house.words}"`;
  document.getElementById('modalHistory').textContent = house.history;
  document.getElementById('modalSeat').textContent = `${house.seat}, ${house.region}`;

  // Generate character cards
  const charactersContainer = document.getElementById('modalCharacters');
  charactersContainer.innerHTML = house.characters.map(char => `
    <div class="character-card">
      <div class="character-sigil">${char.sigil}</div>
      <div class="character-name">${char.name}</div>
      <div class="character-title">${char.title}</div>
    </div>
  `).join('');

  // Show modal
  document.getElementById('houseModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeHouseModal() {
  document.getElementById('houseModal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Add click listeners to house buttons
document.addEventListener('DOMContentLoaded', () => {
  const houseButtons = document.querySelectorAll('.house-btn');
  houseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const houseKey = btn.dataset.house;
      openHouseModal(houseKey);
    });
  });

  // Close modal on outside click
  document.getElementById('houseModal').addEventListener('click', (e) => {
    if (e.target.id === 'houseModal') {
      closeHouseModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHouseModal();
    }
  });
});