// PumpPulse SA — Interactive Prototype Logic (South African Fuel Market)

const USER_LOCATION = { lat: -26.1076, lng: 28.0567 }; // Sandton, Johannesburg
const VEHICLE_CONSUMPTION_L_PER_100KM = 7.8;

const GRADE_NAMES = {
  diesel50: 'Diesel 50ppm',
  diesel10: 'Diesel 10ppm',
  ulp95: 'ULP 95',
  ulp93: 'ULP 93'
};

// Initial South African Service Stations in Sandton / Bryanston / Rosebank corridor
const defaultStations = [
  {
    id: 'st-1',
    name: 'Sasol Rivonia Road',
    brand: 'Sasol',
    lat: -26.0935,
    lng: 28.0598,
    distanceKm: 1.6,
    loyaltyProgram: 'Absa Rewards / Sasol',
    loyaltyKey: 'absa',
    loyaltyRebatePerLitre: 0.45,
    updatedAgo: '12m ago',
    reporter: '@BakkieBoss_GP',
    verifiedCount: 6,
    airGaugeWorking: true,
    backupPower: true,
    shop: 'Sasol Delight + Seattle Coffee',
    prices: {
      diesel50: 20.42,
      diesel10: 20.68,
      ulp95: 22.86,
      ulp93: 22.14
    }
  },
  {
    id: 'st-2',
    name: 'Engen William Nicol 1-Stop',
    brand: 'Engen',
    lat: -26.0820,
    lng: 28.0315,
    distanceKm: 2.9,
    loyaltyProgram: 'FNB eBucks + Clicks ClubCard',
    loyaltyKey: 'ebucks',
    loyaltyRebatePerLitre: 0.85,
    updatedAgo: '24m ago',
    reporter: '@SandtonScout',
    verifiedCount: 11,
    airGaugeWorking: true,
    backupPower: true,
    shop: 'Woolworths Foodstop + Vida e Caffè',
    prices: {
      diesel50: 20.89,
      diesel10: 21.15,
      ulp95: 22.86,
      ulp93: 22.14
    }
  },
  {
    id: 'st-3',
    name: 'Astron Energy (Caltex) Grayston',
    brand: 'Astron Energy',
    lat: -26.1012,
    lng: 28.0685,
    distanceKm: 1.1,
    loyaltyProgram: 'Standard Bank UCount',
    loyaltyKey: 'ucount',
    loyaltyRebatePerLitre: 0.70,
    updatedAgo: '41m ago',
    reporter: '@FuelHunterZA',
    verifiedCount: 4,
    airGaugeWorking: false,
    backupPower: true,
    shop: 'FreshStop + Crispy Chicken',
    prices: {
      diesel50: 20.58,
      diesel10: 20.85,
      ulp95: 22.86,
      ulp93: 22.14
    }
  },
  {
    id: 'st-4',
    name: 'Shell Sandton Drive',
    brand: 'Shell',
    lat: -26.1128,
    lng: 28.0442,
    distanceKm: 1.4,
    loyaltyProgram: 'Shell V+ & Discovery Miles',
    loyaltyKey: 'shellv',
    loyaltyRebatePerLitre: 0.35,
    updatedAgo: '1h ago',
    reporter: '@JoziCommuter',
    verifiedCount: 3,
    airGaugeWorking: true,
    backupPower: true,
    shop: 'Shell Select + Torrador Coffee',
    prices: {
      diesel50: 21.18,
      diesel10: 21.40,
      ulp95: 22.86,
      ulp93: 22.14
    }
  },
  {
    id: 'st-5',
    name: 'BP Rosebank Express',
    brand: 'BP',
    lat: -26.1352,
    lng: 28.0418,
    distanceKm: 3.4,
    loyaltyProgram: 'Pick n Pay Smart Shopper',
    loyaltyKey: 'pnp',
    loyaltyRebatePerLitre: 0.50,
    updatedAgo: '2h ago',
    reporter: '@KarooCruiser',
    verifiedCount: 8,
    airGaugeWorking: true,
    backupPower: true,
    shop: 'Pick n Pay Express + Wild Bean Cafe',
    prices: {
      diesel50: 20.34,
      diesel10: 20.59,
      ulp95: 22.86,
      ulp93: 22.14
    }
  },
  {
    id: 'st-6',
    name: 'TotalEnergies Illovo Junction',
    brand: 'TotalEnergies',
    lat: -26.1248,
    lng: 28.0510,
    distanceKm: 2.1,
    loyaltyProgram: 'Dis-Chem Benefit Card',
    loyaltyKey: 'dischem',
    loyaltyRebatePerLitre: 0.30,
    updatedAgo: '3h ago',
    reporter: '@N1Highveld',
    verifiedCount: 2,
    airGaugeWorking: true,
    backupPower: false,
    shop: 'Bonjour + Mugg & Bean On-The-Move',
    prices: {
      diesel50: 20.76,
      diesel10: 20.99,
      ulp95: 22.86,
      ulp93: 22.14
    }
  }
];

const defaultBadges = [
  {
    id: 'first-drop',
    title: 'First Drop',
    icon: '⛽',
    desc: 'Capture your very first SA fuel price report.',
    unlocked: true,
    progress: '1 / 1'
  },
  {
    id: 'diesel-detective',
    title: 'Diesel Detective',
    icon: '🕵️‍♂️',
    desc: 'Spot & log a deregulated Diesel 50ppm price below R20.60/L.',
    unlocked: true,
    progress: '3 / 3'
  },
  {
    id: 'sharp-shooter',
    title: 'OCR Sharp Shooter',
    icon: '📷',
    desc: 'Scan a forecourt totem or pump display using AI OCR.',
    unlocked: false,
    progress: '0 / 1'
  },
  {
    id: 'air-hero',
    title: 'Air Pressure Hero',
    icon: '🛞',
    desc: 'Verify working tyre pressure gauges at 5 SA stations.',
    unlocked: true,
    progress: '5 / 5'
  },
  {
    id: 'wednesday-warrior',
    title: 'Wednesday Warrior',
    icon: '📅',
    desc: 'Submit a price on the 1st Wednesday of the month (DMRE change day).',
    unlocked: true,
    progress: '1 / 1'
  },
  {
    id: 'truth-seeker',
    title: 'Truth Seeker',
    icon: '👍',
    desc: 'Confirm community fuel prices with 1-tap verification.',
    unlocked: false,
    progress: '2 / 3'
  },
  {
    id: 'n1-cruiser',
    title: 'N1 / N3 Cruiser',
    icon: '🛣️',
    desc: 'Log fuel prices across 3 South African provinces.',
    unlocked: false,
    progress: '1 / 3'
  },
  {
    id: 'perk-redeemer',
    title: 'FuelBucks Boss',
    icon: '☕',
    desc: 'Redeem your first coffee or airtime perk in the Rewards store.',
    unlocked: false,
    progress: '0 / 1'
  }
];

const loyaltyPrograms = [
  { key: 'ebucks', name: 'FNB eBucks + Clicks (Engen)', rebate: 0.85, enabled: true },
  { key: 'ucount', name: 'Standard Bank UCount (Astron/Caltex)', rebate: 0.70, enabled: true },
  { key: 'pnp', name: 'Pick n Pay Smart Shopper (BP)', rebate: 0.50, enabled: true },
  { key: 'absa', name: 'Absa Rewards (Sasol)', rebate: 0.45, enabled: false },
  { key: 'shellv', name: 'Shell V+ / Discovery Miles (Shell)', rebate: 0.35, enabled: false }
];

const saPerksCatalog = [
  {
    id: 'perk-coffee',
    title: '☕ Vida e Caffè / Seattle Tall Cappuccino',
    subtitle: 'Redeemable at any participating Engen, Sasol, or Astron forecourt',
    cost: 80,
    codePrefix: 'VIDA-SA-'
  },
  {
    id: 'perk-airtime',
    title: '📱 R25 Instant SA Airtime / Data Voucher',
    subtitle: 'Works on Vodacom, MTN, Telkom & Cell C (Blu Voucher PIN)',
    cost: 120,
    codePrefix: 'AIR-ZA-'
  },
  {
    id: 'perk-sixty60',
    title: '🛒 R50 Checkers Sixty60 / Pick n Pay Voucher',
    subtitle: 'Instant digital grocery or forecourt convenience voucher',
    cost: 200,
    codePrefix: 'PNP-60-'
  },
  {
    id: 'perk-raffle',
    title: '🎟️ Monthly R1,500 Full Tank Draw Entry',
    subtitle: 'Drawn on the First Tuesday of every month before fuel price change',
    cost: 50,
    codePrefix: 'TANK-DRAW-'
  }
];

// Application State
let state = {
  selectedGrade: 'diesel50',
  captureGrade: 'diesel50',
  captureStationId: 'st-1',
  usedOcrScan: false,
  applyLoyalty: false,
  tankSizeLitres: 60,
  xp: 1420,
  coins: 245,
  streak: 5,
  driversHelped: 342,
  confirmationsDone: 2,
  stations: JSON.parse(localStorage.getItem('pp_stations_v1')) || defaultStations,
  badges: JSON.parse(localStorage.getItem('pp_badges_v1')) || defaultBadges,
  loyalty: loyaltyPrograms
};

let map = null;
let markersLayer = null;

function saveState() {
  localStorage.setItem('pp_stations_v1', JSON.stringify(state.stations));
  localStorage.setItem('pp_badges_v1', JSON.stringify(state.badges));
}

// Calculate effective price (with or without loyalty rebate)
function getStationEffectivePrice(station, grade) {
  const basePrice = station.prices[grade];
  if (!state.applyLoyalty) return basePrice;
  const userHasProgram = state.loyalty.find(l => l.key === station.loyaltyKey && l.enabled);
  if (userHasProgram) {
    return +(basePrice - station.loyaltyRebatePerLitre).toFixed(2);
  }
  return basePrice;
}

// Calculate Net Rand Saved vs highest price in area, minus round-trip detour fuel burn
function calculateNetSavings(station, grade) {
  const prices = state.stations.map(s => getStationEffectivePrice(s, grade));
  const highestRegionalPrice = Math.max(...prices);
  const stationPrice = getStationEffectivePrice(station, grade);

  const grossSavings = (highestRegionalPrice - stationPrice) * state.tankSizeLitres;
  // Round trip detour burn: distance * 2 * (7.8L / 100km) * stationPrice
  const detourLitresBurned = (station.distanceKm * 2) * (VEHICLE_CONSUMPTION_L_PER_100KM / 100);
  const detourCostRand = detourLitresBurned * stationPrice;

  const netSavings = grossSavings - detourCostRand;
  return {
    stationPrice,
    grossSavings: +grossSavings.toFixed(2),
    detourCostRand: +detourCostRand.toFixed(2),
    netSavings: +netSavings.toFixed(2)
  };
}

// Initialize Leaflet Map
function initMap() {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([USER_LOCATION.lat, USER_LOCATION.lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  // User GPS Pulsing Dot
  const userIcon = L.divIcon({
    className: '',
    html: `<div class="w-4 h-4 rounded-full bg-sky-400 border-2 border-white shadow-lg shadow-sky-400/80 animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
  L.marker([USER_LOCATION.lat, USER_LOCATION.lng], { icon: userIcon })
    .addTo(map)
    .bindPopup('<b>📍 Your Location</b><br/>Sandton Central, GP');

  markersLayer = L.layerGroup().addTo(map);
  renderAll();
}

function renderMapPins() {
  if (!markersLayer) return;
  markersLayer.clearLayers();

  // Sort by effective price to color-code cheapest vs expensive
  const sorted = [...state.stations].sort(
    (a, b) => getStationEffectivePrice(a, state.selectedGrade) - getStationEffectivePrice(b, state.selectedGrade)
  );
  const cheapestId = sorted[0].id;
  const priciestId = sorted[sorted.length - 1].id;

  state.stations.forEach(station => {
    const price = getStationEffectivePrice(station, state.selectedGrade);
    let bgClass = 'bg-amber-400 text-slate-950';
    if (station.id === cheapestId) bgClass = 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-400/40';
    else if (station.id === priciestId) bgClass = 'bg-rose-500 text-white';

    const pinHtml = `
      <div class="price-pin">
        <div class="price-pin-bubble ${bgClass}">
          <span>${station.id === cheapestId ? '🏆' : ''} R${price.toFixed(2)}</span>
        </div>
        <div class="price-pin-arrow"></div>
      </div>
    `;

    const icon = L.divIcon({
      className: '',
      html: pinHtml,
      iconSize: [80, 36],
      iconAnchor: [40, 36]
    });

    const marker = L.marker([station.lat, station.lng], { icon }).addTo(markersLayer);
    marker.on('click', () => {
      focusStation(station.id);
    });
  });
}

function focusStation(stationId) {
  const st = state.stations.find(s => s.id === stationId);
  if (!st || !map) return;
  map.flyTo([st.lat, st.lng], 14, { duration: 0.6 });
  const cardEl = document.getElementById(`card-${stationId}`);
  if (cardEl) {
    cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

// Render Horizontal Station Cards on Map Tab
function renderStationCards() {
  const container = document.getElementById('stationCardsContainer');
  const activeGradeLabel = document.getElementById('activeGradeLabel');
  activeGradeLabel.textContent = `${GRADE_NAMES[state.selectedGrade]} • ${state.tankSizeLitres}L Fill${state.applyLoyalty ? ' • Loyalty On' : ''}`;

  const enriched = state.stations.map(st => ({
    ...st,
    metrics: calculateNetSavings(st, state.selectedGrade)
  })).sort((a, b) => b.metrics.netSavings - a.metrics.netSavings);

  container.innerHTML = enriched.map((st, idx) => {
    const isBest = idx === 0;
    const netSaveBadge = st.metrics.netSavings > 0
      ? `<span class="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">Net Save R${st.metrics.netSavings.toFixed(0)}</span>`
      : `<span class="text-[10px] font-semibold bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Standard Rate</span>`;

    return `
      <div id="card-${st.id}" class="min-w-[275px] max-w-[275px] bg-slate-950/95 border ${isBest ? 'border-emerald-500/70' : 'border-slate-800'} rounded-2xl p-3 flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider ${isBest ? 'text-emerald-400' : 'text-slate-400'}">
              ${isBest ? '🏆 #1 Best Value After Detour' : `${st.distanceKm} km away • ${st.updatedAgo}`}
            </span>
            ${netSaveBadge}
          </div>
          <div class="flex items-baseline justify-between">
            <h3 class="font-extrabold text-sm text-white truncate pr-2">${st.name}</h3>
            <span class="mono-price text-base font-extrabold ${isBest ? 'text-emerald-400' : 'text-white'}">R${st.metrics.stationPrice.toFixed(2)}</span>
          </div>
          <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
            <span>${st.airGaugeWorking ? '🛞 Air OK' : '⚠️ No Air'}</span>
            <span>•</span>
            <span>${st.backupPower ? '⚡ Power OK' : '🔌 Grid Only'}</span>
            <span>•</span>
            <span class="text-amber-300 truncate">${st.loyaltyProgram.split(' ')[0]}</span>
          </div>
        </div>

        <div class="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80">
          <button onclick="launchNavigation('${st.id}')" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-1.5 px-2.5 rounded-xl flex items-center justify-center gap-1 transition">
            🧭 Navigate (${st.distanceKm}km)
          </button>
          <button onclick="confirmStationPrice('${st.id}')" title="Confirm price is still accurate (+10 XP)" class="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-1.5 px-2.5 rounded-xl border border-slate-700 transition">
            👍 ${st.verifiedCount}
          </button>
          <button onclick="openCaptureModal('${st.id}')" title="Update price at this station" class="bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold py-1.5 px-2 rounded-xl border border-slate-700 transition">
            ✏️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Render Tab 2: Detailed Cheapest Route & Net Savings Breakdown
function renderRankedStationList() {
  const listEl = document.getElementById('rankedStationList');
  const enriched = state.stations.map(st => ({
    ...st,
    metrics: calculateNetSavings(st, state.selectedGrade)
  })).sort((a, b) => b.metrics.netSavings - a.metrics.netSavings);

  listEl.innerHTML = enriched.map((st, idx) => {
    const isTop = idx === 0;
    return `
      <div class="bg-slate-800/70 border ${isTop ? 'border-emerald-500/70' : 'border-slate-700/70'} rounded-2xl p-3.5 space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-extrabold px-2 py-0.5 rounded-md ${isTop ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'}">#${idx + 1}</span>
              <h3 class="font-bold text-sm text-white">${st.name}</h3>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">${st.shop} • Updated ${st.updatedAgo} by ${st.reporter}</p>
          </div>
          <div class="text-right">
            <span class="mono-price text-lg font-extrabold text-emerald-400">R${st.metrics.stationPrice.toFixed(2)}<span class="text-xs text-slate-400">/L</span></span>
            <span class="block text-[10px] text-slate-400">Full ${state.tankSizeLitres}L = R${(st.metrics.stationPrice * state.tankSizeLitres).toFixed(2)}</span>
          </div>
        </div>

        <!-- Net Savings Math Breakdown -->
        <div class="bg-slate-900/90 rounded-xl p-2.5 grid grid-cols-3 gap-2 text-center border border-slate-800">
          <div>
            <span class="text-[10px] text-slate-400 block">Pump Saving</span>
            <span class="text-xs font-bold text-emerald-300">+R${st.metrics.grossSavings.toFixed(2)}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">Detour Burn (${(st.distanceKm * 2).toFixed(1)}km)</span>
            <span class="text-xs font-bold text-rose-400">-R${st.metrics.detourCostRand.toFixed(2)}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">True Net Save</span>
            <span class="text-xs font-extrabold ${st.metrics.netSavings > 0 ? 'text-emerald-400' : 'text-amber-400'}">
              ${st.metrics.netSavings >= 0 ? '+R' : '-R'}${Math.abs(st.metrics.netSavings).toFixed(2)}
            </span>
          </div>
        </div>

        <!-- Navigation & Action Buttons -->
        <div class="flex items-center justify-between gap-2 pt-1">
          <div class="flex gap-1.5">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${st.lat},${st.lng}" target="_blank" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl transition">
              🗺️ Google Maps
            </a>
            <a href="https://waze.com/ul?ll=${st.lat},${st.lng}&navigate=yes" target="_blank" class="bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs px-3 py-1.5 rounded-xl transition">
              🚗 Waze
            </a>
          </div>
          <button onclick="openCaptureModal('${st.id}')" class="text-xs text-emerald-400 font-semibold hover:underline">
            📷 Update Price
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Render Tab 3: Achievements & Leaderboard
function renderAchievementsTab() {
  document.getElementById('xpHeader').textContent = `${state.xp.toLocaleString()} XP`;
  document.getElementById('coinsHeader').textContent = state.coins;
  document.getElementById('rewardsCoinBalance').textContent = state.coins;
  document.getElementById('xpCurrentText').textContent = `${state.xp.toLocaleString()} XP`;
  document.getElementById('driversHelpedCount').textContent = `${state.driversHelped} motorists`;

  // Tier calculation
  let tierName = 'L3: Bakkiemeister';
  if (state.xp >= 2000) tierName = 'L4: Octane Ranger';
  if (state.xp >= 3500) tierName = 'L5: SA Fuel Legend';
  document.getElementById('userTierLabel').innerHTML = `${tierName} • <span id="xpHeader" class="text-emerald-400 font-semibold">${state.xp.toLocaleString()} XP</span>`;
  document.getElementById('profileTierTitle').textContent = tierName;

  const pct = Math.min(100, Math.round((state.xp / 2000) * 100));
  document.getElementById('xpProgressBar').style.width = `${pct}%`;

  const unlockedCount = state.badges.filter(b => b.unlocked).length;
  document.getElementById('badgeCountSummary').textContent = `${unlockedCount} / ${state.badges.length} Unlocked`;

  const badgesGrid = document.getElementById('badgesGrid');
  badgesGrid.innerHTML = state.badges.map(b => `
    <div class="p-3 rounded-2xl border ${b.unlocked ? 'bg-slate-800/90 border-emerald-500/40' : 'bg-slate-900/50 border-slate-800 opacity-60'} flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <span class="text-2xl">${b.icon}</span>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${b.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}">
          ${b.unlocked ? 'UNLOCKED ✓' : b.progress}
        </span>
      </div>
      <div class="mt-2">
        <h4 class="font-bold text-xs text-white">${b.title}</h4>
        <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">${b.desc}</p>
      </div>
    </div>
  `).join('');

  // Leaderboard
  const leaders = [
    { name: '@SandtonScout', tier: 'L4 Octane Ranger', xp: 1890, isUser: false },
    { name: '@BakkieBoss_GP', tier: 'L4 Octane Ranger', xp: 1640, isUser: false },
    { name: 'You (@JoburgDriver)', tier: tierName, xp: state.xp, isUser: true },
    { name: '@FuelHunterZA', tier: 'L3 Bakkiemeister', xp: 1290, isUser: false }
  ].sort((a, b) => b.xp - a.xp);

  const lbEl = document.getElementById('leaderboardList');
  lbEl.innerHTML = leaders.map((l, idx) => `
    <div class="flex items-center justify-between p-2.5 rounded-xl ${l.isUser ? 'bg-emerald-500/15 border border-emerald-500/40' : 'bg-slate-900/70'}">
      <div class="flex items-center gap-2.5">
        <span class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-extrabold ${idx === 0 ? 'text-amber-400' : 'text-slate-300'}">${idx + 1}</span>
        <div>
          <span class="text-xs font-bold ${l.isUser ? 'text-emerald-300' : 'text-white'}">${l.name}</span>
          <span class="block text-[10px] text-slate-400">${l.tier}</span>
        </div>
      </div>
      <span class="mono-price text-xs font-extrabold text-emerald-400">${l.xp.toLocaleString()} XP</span>
    </div>
  `).join('');
}

// Render Tab 4: Loyalty Stacker & Perks Marketplace
function renderRewardsTab() {
  const loyaltyEl = document.getElementById('loyaltyProgramsList');
  loyaltyEl.innerHTML = state.loyalty.map((prog, idx) => `
    <label class="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl cursor-pointer">
      <div class="flex items-center gap-2">
        <input type="checkbox" ${prog.enabled ? 'checked' : ''} onchange="toggleUserLoyaltyCard(${idx})" class="accent-emerald-500" />
        <span class="text-xs font-medium text-slate-200">${prog.name}</span>
      </div>
      <span class="text-xs font-bold text-emerald-400">-R${prog.rebate.toFixed(2)}/L</span>
    </label>
  `).join('');

  const storeEl = document.getElementById('perksStoreGrid');
  storeEl.innerHTML = saPerksCatalog.map(perk => `
    <div class="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-3.5 flex items-center justify-between gap-3">
      <div>
        <h4 class="font-bold text-xs text-white">${perk.title}</h4>
        <p class="text-[11px] text-slate-400 mt-0.5">${perk.subtitle}</p>
      </div>
      <button onclick="redeemPerk('${perk.id}')" class="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-2 rounded-xl shadow transition">
        🪙 ${perk.cost}
      </button>
    </div>
  `).join('');
}

// Switch Bottom Navigation Tabs
function switchTab(tabName) {
  ['map', 'navigate', 'achievements', 'rewards'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.add('hidden');
    const navBtn = document.getElementById(`nav-${t}`);
    if (navBtn) {
      navBtn.classList.remove('text-emerald-400');
      navBtn.classList.add('text-slate-400');
    }
  });

  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`nav-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-400');
    activeBtn.classList.add('text-emerald-400');
  }

  if (tabName === 'map' && map) {
    setTimeout(() => map.invalidateSize(), 100);
  }
  renderAll();
}

function setFuelGrade(grade) {
  state.selectedGrade = grade;
  document.querySelectorAll('.grade-btn').forEach(btn => {
    if (btn.dataset.grade === grade) {
      btn.className = 'grade-btn px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition whitespace-nowrap bg-emerald-500 text-slate-950';
    } else {
      btn.className = 'grade-btn px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition whitespace-nowrap bg-slate-900/90 text-slate-300 border border-slate-700';
    }
  });
  const navSelect = document.getElementById('navGradeSelect');
  if (navSelect) navSelect.value = grade;
  renderAll();
}

function toggleLoyaltyMode() {
  state.applyLoyalty = document.getElementById('loyaltyToggle').checked;
  renderAll();
}

function toggleUserLoyaltyCard(idx) {
  state.loyalty[idx].enabled = !state.loyalty[idx].enabled;
  renderAll();
}

function updateTankSize(litres) {
  const val = Math.max(10, Math.min(150, parseInt(litres, 10) || 60));
  state.tankSizeLitres = val;
  document.getElementById('tankSizeLabel').textContent = `${val}L`;
  document.getElementById('fillLitresInput').value = val;
  renderAll();
}

function openTankModal() {
  const nextSize = state.tankSizeLitres === 60 ? 80 : state.tankSizeLitres === 80 ? 45 : 60;
  updateTankSize(nextSize);
  showRewardToast('🚗 Tank Capacity Updated', `Set to ${nextSize}L fill size`, 'Net-Savings recalculated for your vehicle.', '⚙️');
}

// 1-Tap Confirm Existing Price
function confirmStationPrice(stationId) {
  const st = state.stations.find(s => s.id === stationId);
  if (!st) return;
  st.verifiedCount += 1;
  st.updatedAgo = 'Just now';
  state.xp += 10;
  state.coins += 3;
  state.confirmationsDone += 1;
  state.driversHelped += 4;

  let badgeMsg = `Confirmed ${GRADE_NAMES[state.selectedGrade]} at ${st.name}`;
  if (state.confirmationsDone >= 3) {
    const truthBadge = state.badges.find(b => b.id === 'truth-seeker');
    if (truthBadge && !truthBadge.unlocked) {
      truthBadge.unlocked = true;
      truthBadge.progress = '3 / 3';
      badgeMsg = '🏅 UNLOCKED BADGE: "Truth Seeker"!';
    }
  }

  saveState();
  renderAll();
  showRewardToast('COMMUNITY VERIFIED', '+10 XP & +3 🪙 FuelBucks', badgeMsg, '👍');
}

// Launch Navigation Action
function launchNavigation(stationId) {
  const st = state.stations.find(s => s.id === stationId);
  if (!st) return;
  const metrics = calculateNetSavings(st, state.selectedGrade);
  const url = `https://www.google.com/maps/dir/?api=1&destination=${st.lat},${st.lng}`;
  window.open(url, '_blank');
  showRewardToast(
    '🧭 Navigation Started',
    `Routing to ${st.name}`,
    `Estimated Net Savings: R${metrics.netSavings.toFixed(2)} on ${state.tankSizeLitres}L`,
    '🚗'
  );
}

// ==================== CAPTURE MODAL FUNCTIONS ====================
function openCaptureModal(stationId) {
  const selectEl = document.getElementById('captureStationSelect');
  selectEl.innerHTML = state.stations.map(st => `
    <option value="${st.id}" class="bg-slate-900 text-white">📍 ${st.name} (${st.distanceKm}km)</option>
  `).join('');

  state.captureStationId = stationId || state.stations[0].id;
  selectEl.value = state.captureStationId;
  state.captureGrade = state.selectedGrade;
  state.usedOcrScan = false;

  selectCaptureGrade(state.captureGrade);
  document.getElementById('captureModal').classList.remove('hidden');
}

function closeCaptureModal() {
  document.getElementById('captureModal').classList.add('hidden');
}

function onCaptureStationChange() {
  state.captureStationId = document.getElementById('captureStationSelect').value;
  selectCaptureGrade(state.captureGrade);
}

function selectCaptureGrade(grade) {
  state.captureGrade = grade;
  document.querySelectorAll('.cap-grade-btn').forEach(btn => {
    if (btn.dataset.cgrade === grade) {
      btn.className = 'cap-grade-btn py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950';
    } else {
      btn.className = 'cap-grade-btn py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300';
    }
  });

  const st = state.stations.find(s => s.id === state.captureStationId);
  if (st) {
    const currentPrice = st.prices[grade];
    document.getElementById('capturePriceInput').value = currentPrice.toFixed(2);
    syncOcrDisplay(currentPrice.toFixed(2));
  }
  document.getElementById('ocrDetectedGrade').textContent = GRADE_NAMES[grade].toUpperCase();
}

function adjustCapturePrice(delta) {
  const input = document.getElementById('capturePriceInput');
  const current = parseFloat(input.value) || 20.50;
  const updated = Math.max(10, +(current + delta).toFixed(2));
  input.value = updated.toFixed(2);
  syncOcrDisplay(updated.toFixed(2));
}

function syncOcrDisplay(val) {
  const num = parseFloat(val) || 0;
  document.getElementById('ocrDetectedDigits').textContent = `R ${num.toFixed(2)} /L`;
}

function simulateOcrScan(fromUpload = false) {
  state.usedOcrScan = true;
  const st = state.stations.find(s => s.id === state.captureStationId);
  const basePrice = st ? st.prices[state.captureGrade] : 20.55;
  // Simulate spotting a competitive forecourt price
  const scannedPrice = +(basePrice - 0.08).toFixed(2);

  const statusText = document.getElementById('ocrStatusText');
  statusText.textContent = '🔍 ML Kit scanning forecourt LED digits...';

  setTimeout(() => {
    document.getElementById('capturePriceInput').value = scannedPrice.toFixed(2);
    syncOcrDisplay(scannedPrice.toFixed(2));
    statusText.textContent = fromUpload
      ? `✅ Till Slip OCR Verified: ${GRADE_NAMES[state.captureGrade]} @ R${scannedPrice.toFixed(2)}/L`
      : `✅ AI OCR Locked (99.4% confidence): R${scannedPrice.toFixed(2)}/L`;
  }, 450);
}

function submitCapturedPrice() {
  const st = state.stations.find(s => s.id === state.captureStationId);
  const newPrice = parseFloat(document.getElementById('capturePriceInput').value);
  if (!st || isNaN(newPrice) || newPrice < 10 || newPrice > 40) return;

  st.prices[state.captureGrade] = +newPrice.toFixed(2);
  st.updatedAgo = 'Just now';
  st.reporter = 'You (@JoburgDriver)';
  st.verifiedCount += 1;
  st.airGaugeWorking = document.getElementById('tagAirGauge').checked;
  st.backupPower = document.getElementById('tagBackupPower').checked;

  const xpEarned = (state.usedOcrScan ? 40 : 25) + 5; // +5 for amenity check
  const coinsEarned = state.usedOcrScan ? 15 : 10;

  state.xp += xpEarned;
  state.coins += coinsEarned;
  state.driversHelped += 12;

  let unlockedText = `Updated ${GRADE_NAMES[state.captureGrade]} to R${newPrice.toFixed(2)}/L at ${st.name}`;

  if (state.usedOcrScan) {
    const ocrBadge = state.badges.find(b => b.id === 'sharp-shooter');
    if (ocrBadge && !ocrBadge.unlocked) {
      ocrBadge.unlocked = true;
      ocrBadge.progress = '1 / 1';
      unlockedText = '🏆 UNLOCKED BADGE: "OCR Sharp Shooter"!';
    }
  }

  saveState();
  closeCaptureModal();
  renderAll();
  showRewardToast(
    state.usedOcrScan ? '📷 AI OCR REPORT VERIFIED' : '✅ MANUAL PRICE LOGGED',
    `+${xpEarned} XP & +${coinsEarned} 🪙 FuelBucks Earned!`,
    unlockedText,
    '🎉'
  );
}

function redeemPerk(perkId) {
  const perk = saPerksCatalog.find(p => p.id === perkId);
  if (!perk) return;

  if (state.coins < perk.cost) {
    showRewardToast(
      '🪙 Need More FuelBucks',
      `You need ${perk.cost - state.coins} more 🪙 FuelBucks`,
      'Snap a fuel price at a station to earn +15 🪙!',
      '⚠️'
    );
    return;
  }

  state.coins -= perk.cost;
  const voucherCode = `${perk.codePrefix}${Math.floor(100000 + Math.random() * 900000)}`;

  const perkBadge = state.badges.find(b => b.id === 'perk-redeemer');
  if (perkBadge && !perkBadge.unlocked) {
    perkBadge.unlocked = true;
    perkBadge.progress = '1 / 1';
  }

  saveState();
  renderAll();
  showRewardToast(
    '🎁 PERK REDEEMED!',
    perk.title,
    `Voucher PIN: ${voucherCode} (Saved to Wallet)`,
    '☕'
  );
}

function showCefModal() {
  showRewardToast(
    '📊 SA "First Wednesday" Tank-Up Advice',
    'ULP 95 rising +R0.42/L • Diesel 50 dropping -R0.68/L',
    'Petrol drivers: Fill up BEFORE Tuesday midnight! Diesel drivers: Wait until Wednesday!',
    '🇿🇦'
  );
}

let toastTimer = null;
function showRewardToast(badgeTag, title, subtitle, icon = '🎉') {
  const toast = document.getElementById('rewardToast');
  document.getElementById('toastBadgeTag').textContent = badgeTag;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSubtitle').textContent = subtitle;
  document.getElementById('toastIcon').textContent = icon;

  toast.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hideRewardToast();
  }, 5000);
}

function hideRewardToast() {
  document.getElementById('rewardToast').classList.add('hidden');
}

function renderAll() {
  renderMapPins();
  renderStationCards();
  renderRankedStationList();
  renderAchievementsTab();
  renderRewardsTab();
}

window.addEventListener('DOMContentLoaded', () => {
  initMap();
});
