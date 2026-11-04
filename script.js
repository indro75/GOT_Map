// ============ AUDIO ============
const audio = document.getElementById('themeAudio');
const muteBtn = document.getElementById('muteBtn');

if (audio && muteBtn) {
  // Attempt autoplay when main page loads
  window.addEventListener('load', () => {
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.log('Autoplay blocked — user must interact first.');
    });
  });

  muteBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      muteBtn.textContent = '🔊';
    } else {
      audio.pause();
      muteBtn.textContent = '🔇';
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
  });
});

// ============ MAP INFO PANEL ============
const kingdomData = {
  north: {
    title: 'The North',
    sigil: '🐺',
    house: 'House Stark',
    ruler: 'King Bran the Broken',
    seat: 'Winterfell',
    desc: 'The largest of the Seven Kingdoms. A harsh land of snow and ancient forests, ruled for millennia by the Kings in the North. The Starks are descended from the First Men and Bran the Builder.'
  },
  vale: {
    title: 'The Vale of Arryn',
    sigil: '🦅',
    house: 'House Arryn',
    ruler: 'Lord Robin Arryn',
    seat: 'The Eyrie',
    desc: 'A mountain kingdom protected by the Giant\'s Lance and the Eyrie. Never taken by force. Protected by Lady Sansa Stark on behalf of young Lord Robin.'
  },
  river: {
    title: 'The Riverlands',
    sigil: '🐟',
    house: 'House Tully',
    ruler: 'Lord Edmure Tully',
    seat: 'Riverrun',
    desc: 'A fertile land of rivers but no natural borders — the battleground of every war. The Tullys rose with Aegon the Conqueror.'
  },
  iron: {
    title: 'The Iron Islands',
    sigil: '🦑',
    house: 'House Greyjoy',
    ruler: 'Queen Yara Greyjoy',
    seat: 'Pyke',
    desc: 'A harsh archipelago of reavers who worship the Drowned God. Yara Greyjoy is the first Queen to sit the Seastone Chair.'
  },
  west: {
    title: 'The Westerlands',
    sigil: '🦁',
    house: 'House Lannister',
    ruler: 'Lord Tyrion Lannister',
    seat: 'Casterly Rock',
    desc: 'The richest kingdom, famed for its gold mines. After the fall of Tywin, Cersei, and Jaime, Tyrion — now Hand of the King — rules Casterly Rock.'
  },
  crown: {
    title: 'The Crownlands',
    sigil: '👑',
    house: 'The Iron Throne',
    ruler: 'King Bran the Broken',
    seat: 'King\'s Landing',
    desc: 'The lands around the capital, ruled directly from the Iron Throne. Home to the Red Keep. Now the seat of the first elected king of the Six Kingdoms.'
  },
  reach: {
    title: 'The Reach',
    sigil: '🌹',
    house: 'House Baratheon (new)',
    ruler: 'Lord Gendry Baratheon',
    seat: 'Highgarden',
    desc: 'The most fertile and populous kingdom. After the extinction of the Tyrells, Gendry — Robert\'s legitimized bastard — was granted Highgarden by King Bran.'
  },
  storm: {
    title: 'The Stormlands',
    sigil: '🦌',
    house: 'House Baratheon',
    ruler: 'Lord Gendry Baratheon',
    seat: 'Storm\'s End',
    desc: 'A land of storms and proud warriors. Gendry Baratheon, legitimized son of Robert, now rules the ancestral seat of his father\'s house.'
  },
  dorne: {
    title: 'Dorne',
    sigil: '☀',
    house: 'House Martell',
    ruler: 'Unknown Martell heir',
    seat: 'Sunspear',
    desc: 'The southernmost kingdom of deserts and passion. The Martells ruled as Princes, unique for resisting the Targaryens. Their line was nearly extinguished in the wars.'
  },
  beyond: {
    title: 'Beyond the Wall',
    sigil: '❄',
    house: 'The Free Folk',
    ruler: 'Tormund Giantsbane (leader)',
    seat: 'The True North',
    desc: 'The frozen lands north of the Wall, home to the Free Folk who refuse to kneel. After the Great War, many settled south of the Wall under Tormund\'s guidance.'
  },
  wall: {
    title: 'The Wall',
    sigil: '🧊',
    house: 'The Night\'s Watch',
    ruler: 'Lord Commander of the Night\'s Watch',
    seat: 'Castle Black',
    desc: 'A colossal fortification of ice, 300 miles long and 700 feet tall. Built 8,000 years ago to defend against the White Walkers. Jon Snow now leads the Free Folk beyond it.'
  }
};

const regions = document.querySelectorAll('.region');
const panel = document.getElementById('infoPanel');
const panelContent = document.getElementById('panelContent');

regions.forEach(region => {
  region.addEventListener('click', (e) => {
    const key = region.dataset.kingdom;
    const data = kingdomData[key];
    if (!data) return;

    panelContent.innerHTML = `
      <div style="text-align:center; font-size:3rem; margin-bottom:1rem;">${data.sigil}</div>
      <h2 style="color:#c9a961; text-align:center; letter-spacing:0.15em; margin-bottom:0.5rem;">${data.title}</h2>
      <p style="text-align:center; color:#e8c878; font-weight:700;">${data.house}</p>
      <p style="text-align:center; color:#aaa; font-style:italic; margin-bottom:1rem;">Seat: ${data.seat}</p>
      <p style="text-align:center; color:#c9a961; margin-bottom:1.5rem;">
        <strong>Ruled by:</strong> ${data.ruler}
      </p>
      <p style="font-family:'MedievalSharp', cursive; line-height:1.7; color:#d4c4a0;">${data.desc}</p>
    `;
    panel.classList.remove('hidden');
  });
});

function closePanel() {
  panel.classList.add('hidden');
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && !e.target.classList.contains('region')) {
    closePanel();
  }
});

// ============ LANDING PAGE EASTER EGG ============
if (document.body.classList.contains('landing')) {
  const enterBtn = document.querySelector('.enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('mouseenter', () => {
      document.body.style.background = 'radial-gradient(ellipse at center, #2a0a0a 0%, #000 70%)';
    });
    enterBtn.addEventListener('mouseleave', () => {
      document.body.style.background = 'radial-gradient(ellipse at center, #1a0a0a 0%, #000 70%)';
    });
  }
}