const jobCards = [
  {
    company: 'ABC BANK', icon: '🏦',
    title: 'Software Engineer',
    salary: 'RM4,500 – RM6,000', type: 'Hybrid', work: 'Full-time',
    perks: ['Mentorship from Seniors', 'Fast-track promotion path', 'Learning allowance (RM2k/yr)'],
    match: 91, compat: 94
  },
  {
    company: 'TECHFLOW', icon: '💡',
    title: 'Frontend Developer',
    salary: 'RM5,000 – RM7,500', type: 'Remote', work: 'Full-time',
    perks: ['Stock options', 'Flexible hours', 'Health & wellness budget'],
    match: 87, compat: 89
  },
  {
    company: 'VERTEX AI', icon: '🤖',
    title: 'AI/ML Engineer',
    salary: 'RM6,500 – RM9,000', type: 'Hybrid', work: 'Full-time',
    perks: ['AI research stipend', 'Conference travel budget', 'GPU access for personal projects'],
    match: 83, compat: 86
  },
  {
    company: 'CLOUDSCALE', icon: '☁️',
    title: 'DevOps Engineer',
    salary: 'RM5,500 – RM8,000', type: 'Onsite', work: 'Full-time',
    perks: ['Certification reimbursement', 'On-call allowance', 'Team retreats'],
    match: 79, compat: 82
  }
];

const candidateCards = [
  {
    name: 'Muhib Farabi', field: 'Computer Science (AI)',
    location: 'Remote / Kuala Lumpur', exp: '4+ Years Exp',
    skills: ['Python', 'SQL', 'Robotics'],
    interests: ['Banking Technology Ecosystems', 'Advanced Data Analytics & AI Implementation'],
    match: 89, compat: 91,
    emoji: '👨‍💻'
  },
  {
    name: 'Sarah Kim', field: 'UX/Product Design',
    location: 'Petaling Jaya', exp: '3 Years Exp',
    skills: ['Figma', 'React', 'Research'],
    interests: ['Fintech UX', 'Design Systems'],
    match: 85, compat: 88,
    emoji: '👩‍🎨'
  },
  {
    name: 'Jordan Smyth', field: 'Data Science',
    location: 'Kuala Lumpur', exp: '5+ Years Exp',
    skills: ['Python', 'TensorFlow', 'Spark'],
    interests: ['NLP', 'Predictive Analytics'],
    match: 80, compat: 83,
    emoji: '🧑‍🔬'
  }
];

let currentMode = 'jobs';
let currentJobIdx = 0;
let currentCandIdx = 0;
let animating = false;

function buildJobCard(card) {
  return `
    <div class="job-card" id="currentCard">
      <div class="job-card-img">
        <div class="job-card-img-inner">
          <div class="office-illustration">
            <div class="office-plant">🌿</div>
            <div class="office-col">
              <div class="office-window"></div>
              <div class="office-desk"></div>
            </div>
            <div class="office-col">
              <div class="office-window" style="opacity:.7"></div>
              <div class="office-window" style="height:40px;opacity:.5"></div>
            </div>
            <div class="office-plant">🌱</div>
          </div>
        </div>
        <div class="match-badge">${card.match}% MATCH</div>
        <div class="company-icon">${card.icon}</div>
      </div>
      <div class="job-card-body">
        <div class="company-name">${card.company}</div>
        <div class="job-title">${card.title}</div>
        <div class="job-tags">
          <div class="job-tag">💰 ${card.salary}</div>
          <div class="job-tag">📍 ${card.type}</div>
          <div class="job-tag">🕐 ${card.work}</div>
        </div>
        <div class="perks-label">Perks & Benefits</div>
        <ul class="perks-list">
          ${card.perks.map(p => `<li><div class="perk-check">✓</div>${p}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

function buildCandidateCard(c) {
  return `
    <div class="candidate-card" id="currentCard">
      <div class="candidate-img">
        <div class="candidate-photo">${c.emoji}</div>
        <div class="candidate-score-badge">
          <div class="score-label">Match Score</div>
          <div class="score-value">${c.match}%</div>
        </div>
        <div class="candidate-meta">
          <div class="meta-chip"><span>📍</span>${c.location}</div>
          <div class="meta-chip"><span>💼</span>${c.exp}</div>
        </div>
      </div>
      <div class="candidate-body">
        <div class="candidate-name">${c.name}</div>
        <div class="candidate-field">${c.field}</div>
        <div class="skills-label">Expertise & Skills</div>
        <div class="skills-row">
          ${c.skills.map(s => `<div class="skill-tag">⬡ ${s}</div>`).join('')}
        </div>
        <div class="interests-label">Interested In</div>
        <ul class="interests-list">
          ${c.interests.map(i => `<li><div class="interest-dot"></div>${i}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

function renderCard() {
  const stack = document.getElementById('swipeStack');
  if (currentMode === 'jobs') {
    if (currentJobIdx >= jobCards.length) {
      stack.innerHTML = `<div class="empty-card"><div class="empty-emoji">🎉</div><div class="empty-title">You've seen all jobs!</div><div class="empty-sub">Check your matches or come back later for new listings.</div></div>`;
      return;
    }
    stack.innerHTML = buildJobCard(jobCards[currentJobIdx]);
  } else {
    if (currentCandIdx >= candidateCards.length) {
      stack.innerHTML = `<div class="empty-card"><div class="empty-emoji">✨</div><div class="empty-title">All caught up!</div><div class="empty-sub">New candidates are added daily.</div></div>`;
      return;
    }
    stack.innerHTML = buildCandidateCard(candidateCards[currentCandIdx]);
  }
}

function swipe(dir) {
  if (animating) return;
  const card = document.getElementById('currentCard');
  if (!card) return;
  animating = true;

  const isLike = dir === 'right';
  card.classList.add(isLike ? 'card-exit-right' : 'card-exit-left');

  if (isLike) {
    // Show match modal with ~50% chance to keep it interesting, or always on first like
    const card_data = currentMode === 'jobs' ? jobCards[currentJobIdx] : candidateCards[currentCandIdx];
    const shouldMatch = Math.random() > 0.4;
    if (shouldMatch) {
      const name = currentMode === 'jobs' ? card_data.company : card_data.name;
      const icon = currentMode === 'jobs' ? card_data.icon : card_data.emoji;
      document.getElementById('modalCompanyName').textContent = name;
      document.getElementById('modalCompanyIcon').textContent = icon;
      document.getElementById('modalCompat').textContent = card_data.compat + '% Compatibility Match';
      setTimeout(() => { document.getElementById('matchModal').classList.add('open'); }, 350);
    }
  }

  setTimeout(() => {
    if (currentMode === 'jobs') currentJobIdx++;
    else currentCandIdx++;
    animating = false;
    renderCard();
  }, 400);
}

function setMode(mode) {
  currentMode = mode;
  document.getElementById('modeJobs').classList.toggle('active', mode === 'jobs');
  document.getElementById('modeCandidates').classList.toggle('active', mode === 'candidates');
  renderCard();
}

function closeModal() { document.getElementById('matchModal').classList.remove('open'); }

function goToMessages() {
  closeModal();
  showScreen('messages', document.querySelectorAll('.nav-tab')[2]);
}

// ── SCREEN SWITCHING
function showScreen(id, tab) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (tab) tab.classList.add('active');
}

// ── MATCHES DATA
const newMatches = [
  { name: 'TechFlow', icon: '💡', pct: '88%' },
  { name: 'Sarah K.', icon: '👩‍💼', pct: '85%' },
  { name: 'Vertex AI', icon: '🤖', pct: '82%' },
  { name: 'Elena G.', icon: '👩‍🔬', pct: '79%' }
];
const convos = [
  { name: 'Marcus Chen', org: 'TechFlow', date: 'Oct 24', msg: "Hey! We loved your portfolio. When are you free to chat about the lead role?", unread: true, online: true, icon: '👨‍💼' },
  { name: 'CloudScale Systems', org: '', date: 'Oct 22', msg: "That sounds perfect. I'll send over the detailed spec in an hour.", unread: false, online: false, icon: '☁️' },
  { name: 'Jordan Smyth', org: '', date: 'Oct 20', msg: "Welcome to the team! The onboarding invite should be in your inbox.", unread: true, online: false, icon: '🧑‍💼' },
  { name: 'InnoCore', org: '', date: 'Oct 18', msg: "Thank you for your time. We'll be in touch by early next week.", unread: false, online: false, icon: '🔷' }
];

function renderMatches() {
  const nmRow = document.getElementById('newMatchesRow');
  nmRow.innerHTML = newMatches.map(m => `
    <div class="match-thumb" onclick="showScreen('messages', document.querySelectorAll('.nav-tab')[2])">
      <div class="match-thumb-av">${m.icon}<div class="match-thumb-pct">${m.pct}</div></div>
      <div class="match-thumb-name">${m.name}</div>
    </div>`).join('');

  const cl = document.getElementById('convoList');
  cl.innerHTML = convos.map(c => `
    <div class="convo-item" onclick="showScreen('messages', document.querySelectorAll('.nav-tab')[2])">
      <div class="convo-av">${c.icon}${c.online ? '<div class="convo-online"></div>' : ''}</div>
      <div class="convo-info">
        <div class="convo-name-row">
          <div class="convo-name">${c.name}${c.org ? ' · ' + c.org : ''}</div>
          <div class="convo-date">${c.date}</div>
        </div>
        <div class="convo-msg${c.unread ? ' unread' : ''}">${c.msg}</div>
      </div>
      ${c.unread ? '<div class="unread-dot"></div>' : ''}
    </div>`).join('');
}

// Sidebar in messages
function renderMsgSidebar() {
  const sb = document.getElementById('msgSidebarList');
  sb.innerHTML = convos.map((c, i) => `
    <div class="convo-item" style="margin:0 -8px;padding-left:8px;padding-right:8px">
      <div class="convo-av" style="width:44px;height:44px;font-size:18px">${c.icon}${c.online ? '<div class="convo-online"></div>' : ''}</div>
      <div class="convo-info">
        <div class="convo-name-row">
          <div class="convo-name" style="font-size:14px">${c.name}</div>
          <div class="convo-date">${c.date}</div>
        </div>
        <div class="convo-msg${c.unread ? ' unread' : ''}" style="font-size:13px">${c.msg.slice(0,40)}…</div>
      </div>
    </div>`).join('');
}

function handleMsgKey(e) { if (e.key === 'Enter') sendMessage(); }
function sendMessage() {
  const input = document.getElementById('msgInput');
  const val = input.value.trim();
  if (!val) return;
  const body = document.getElementById('msgBody');
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  body.innerHTML += `<div><div class="bubble me">${val}</div><div class="bubble-time">${timeStr}</div></div>`;
  input.value = '';
  body.scrollTop = body.scrollHeight;
}

// Init
renderCard();
renderMatches();
renderMsgSidebar();