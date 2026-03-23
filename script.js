// === Your existing menu & dropdown code ===
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuBtn.textContent = navMenu.classList.contains("show") ? "✖" : "☰";
});

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");

if (dropdownToggle) {
  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("open");
  });
}


function updateMatchCards() {
  document.querySelectorAll('.matchcard-container').forEach(card => {
    const countdownEl = card.querySelector('.countdown');
    if (!countdownEl) return;

    const kickoffStr = countdownEl.dataset.kickoff;
    if (!kickoffStr) return;

    const kickoffDate = new Date(kickoffStr);   // UTC because of Z
    const now = Date.now();
    const diff = kickoffDate.getTime() - now;

    const liveBtn  = card.querySelector('.live-button');
    const statusEl = card.querySelector('.Match-status');

    // === Sport-standard local time formatting (exactly like Flashscore/Sofascore) ===
    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      day:     'numeric',
      month:   'short',
      hour:    '2-digit',
      minute:  '2-digit',
      hour12:  false
    });
    const localTime = formatter.format(kickoffDate);

    let text = '';
    let color = '#000000';

    if (diff > 0) {
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

      text = `${localTime} – Starts in ${h}:${m}:${s}`;
    } 
    else if (diff > -90 * 60 * 1000) {   // LIVE for 90 minutes after kickoff
      text = `LIVE NOW (${localTime})`;
      color = '#ff0000';

      if (liveBtn) liveBtn.style.display = 'inline-block';
      if (statusEl) {
        statusEl.textContent = 'Match in Progress';
        statusEl.style.display = 'block';
      }
    } 
    else {
      text = `Ended (${localTime})`;
      color = '#0e0909';
    }

    countdownEl.textContent = text;
    countdownEl.style.color = color;

    // Clean up buttons when not live
    if (diff > 0 || diff <= -90 * 60 * 1000) {
      if (liveBtn) liveBtn.style.display = 'none';
      if (statusEl) statusEl.style.display = 'none';
    }
  });
}
const matchesByLeague = {

  champions: [


     {
      game: " Barcelon vs Newcastle",
      kickoff: "2026-03-20T17:45:00Z",
      url: "watchlist.html?match=Barcelona vs Newcastle",
      top: true
    },

    {
      game: "Liverpool vs Galatasaray",
      kickoff: "2026-03-18T20:00:00Z",
      url: "watchlist.html?match=Liverpool vs Galatasaray",
      top: true
    },


    {
      game: "Bayern Munich vs Atalanta",
      kickoff: "2026-03-18T15:00:00Z",
      url: "watchlist.html?match=Bayern Munich vs Atalanta",
      top: true
    },

    {
      game: "Tottenham vs Atletico Madrid",
      kickoff: "2026-03-18T20:00:00Z",
      url: "watchlist.html?match=Tottenham vs Atletico Madrid",
      top: true
    },

  ],
  premier: [
    {
      game: " Burnley vs Bournemouth",
      kickoff: "2026-03-14T16:00:00Z",
      url: "watchlist.html?match= Burnley vs Bournemouth",

    },
    {
      game: "Sunderland vs Brighton",
      kickoff: "2026-03-14T16:00:00Z",
      url: "watchlist.html?match= Sunderland vs Brighton"
    },

    {
      game: "Chelsea vs Brentford",
      kickoff: "2026-03-14T18:30:00Z",
      url: "watchlist.html?match=Chelsea vs Brentford",
      top: true
    },

    {
      game: "Arsenal vs Everton",
      kickoff: "2026-03-14T18:30:00Z",
      url: "watchlist.html?match= Arsenal vs Everton",
      top: true

    },

    {
      game: "West Ham vs Man City",
      kickoff: "2026-03-14T21:00:00Z",
      url: "watchlist.html?match=Newcastle-vs-Everton",
      top: true
    }

  ],

  laliga: [

    {
      game: "Atletico Mardrid vs Getafe",
      kickoff: "2026-03-14T16:15:00Z",
      url: "watchlist.html?match=Atletico Mardrid vs Getafe",
      top: true
    },

    {
      game: "Real Madrid vs ELche",
      kickoff: "2026-03-14T21:00:00Z",
      url: "watchlist.html?match=Real Madrid vs ELche",
      top: true
    },

    {
      game: "Barcelona vs Sevila",
      kickoff: "2026-03-15T16:15:00Z",
      url: "watchlist.html?match=Barcelona vs Sevila",
      top: true
    }

  ],


  serieA: [
    {
      game: "Inter vs Atalanta",
      kickoff: "2026-03-14T15:00:00Z",
      url: "watchlist.html?match=Inter vs Atalanta"
    },
    {
      game: " Napoli vs Leece",
      kickoff: "2026-03-14T18:00:00Z",
      url: "watchlist.html?match=Napoli vs Leece"
    },

    {
      game: "Udinese vs Juvetus",
      kickoff: "2026-03-14T20:45:00Z",
      url: "watchlist.html?match=Udinese vs Juvetus"
    },


  ]
};

function renderMatches(matches, containerId) {
  const container = document.getElementById(containerId);

  matches.forEach(match => {
    const card = document.createElement("div");
    card.classList.add("matchcard-container");

    card.innerHTML = `
      <span class="live-button" style="display:none;">LIVE</span>
      <div class="Match-status"></div>
      <p class="match-time countdown" data-kickoff="${match.kickoff}">
        Loading...
      </p>
      <div class="Match-Game">${match.game}</div>
      <a href="${match.url}" target="_blank">
        <button class="watch-button">watch</button>
      </a>
    `;

    container.appendChild(card);
  });
}

// Render each league
renderMatches(matchesByLeague.premier, "premier-league-matches");
renderMatches(matchesByLeague.laliga, "laliga-matches");
//renderMatches(matchesByLeague.serieA, "serieA-matches");
renderMatches(matchesByLeague.champions, "champions-League-matches");




function renderTopGames() {
  const topContainer = document.getElementById("top-games-matches");
  const topSection = document.getElementById("top-games-section");

  topContainer.innerHTML = ""; // clear existing cards

  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];

  let hasTopGame = false;

  Object.values(matchesByLeague).forEach(leagueMatches => {
    leagueMatches.forEach(match => {

      if (!match.top) return;

      const matchDate = match.kickoff.split("T")[0];

      if (matchDate === todayDateString) {

        hasTopGame = true;

        const card = document.createElement("div");
        card.classList.add("matchcard-container");

        card.innerHTML = `
  <span class="live-button" style="display:none;">LIVE</span>
  <div class="Match-status"></div>
  <p class="match-time countdown" data-kickoff="${match.kickoff}">
    Loading...
  </p>
  <div class="Match-Game">${match.game}</div>
  <a href="${match.url}" target="_blank">
    <button class="watch-button">watch</button>
  </a>
`;

        topContainer.appendChild(card);
      }

    });
  });

  // Hide or show the entire section
  if (hasTopGame) {
    topSection.style.display = "block";
  } else {
    topSection.style.display = "none";
  }
}




renderTopGames();






// Run every second
setInterval(updateMatchCards, 1000);
setInterval(renderTopGames, 60000);
updateMatchCards(); // Run once immediately
