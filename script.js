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
    let color = '#6d6262';

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
      color = '#6d6262';
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
      game: " Real Madrid vs Bayern",
      kickoff: "2026-04-07T19:00:00Z",
      url: "watchlist.html?match=Real Madrid vs Bayern",
      top: true
    },

    {
      game: "Sporting vs Arsenal",
      kickoff: "2026-04-07T19:00:00Z",
      url: "watchlist.html?match=Sporting vs Arsenal",
      top: true
    },


    {
      game: "Barcelona vs Atletico",
      kickoff: "2026-04-08T19:00:00Z",
      url: "watchlist.html?match=Barcelona vs Atletico",
      top: true
    },

    {
      game: "Psg vs Liverpool",
      kickoff: "2026-04-08T19:00:00Z",
      url: "watchlist.html?match=Psg vs Liverpool",
      top: true
    },

  ],
  premier: [
    {
      game: " Arsenal vs Bournemouth",
      kickoff: "2026-04-11T11:30:00Z",
      url: "watchlist.html?match= Arsenal vs Bournemouth",
      top: true

    },
    {
      game: "Brentford vs Everton",
      kickoff: "2026-04-11T14:00:00Z",
      url: "watchlist.html?match= Brentford vs Everton"
    },

    {
      game: "Liverpool vs Fulham",
      kickoff: "2026-04-11T16:30:00Z",
      url: "watchlist.html?match=Liverpool vs Fulham",
      top: true
    },

    {
      game: "Crystal Palace vs Newcastle",
      kickoff: "2026-04-12T13:00:00Z",
      url: "watchlist.html?match= Crystal Palace vs Newcastle",
      

    },

    {
      game: "Sundarland vs Tottenham",
      kickoff: "2026-04-12T13:00:00Z",
      url: "watchlist.html?match=Sundarland vs Tottenham",

    },

    {
      game: "Chelsea vs Man City",
      kickoff: "2026-04-12T13:00:00Z",
      url: "watchlist.html?match=Chelsea vs Man City",
      top: true
    },

    {
      game: "Man United vs Leeds United",
      kickoff: "2026-04-13T19:00:00Z",
      url: "watchlist.html?match=Man United vs Leeds United",
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
