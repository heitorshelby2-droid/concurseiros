document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  revealItems.forEach(el => observer.observe(el));

  const toast = document.getElementById("toast");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  };

  document.querySelectorAll(".interactive").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      showToast("A seleção desta unidade está pronta para receber o conteúdo do edital.");
    });
  });

  const examButton = document.getElementById("examButton");
  if (examButton) examButton.addEventListener("click", () => showToast("O concurso está fechado no momento."));
  const approvedButton = document.getElementById("approvedButton");
  if (approvedButton) approvedButton.addEventListener("click", () => showToast("Nenhum resultado publicado no momento."));

  const rankSearch = document.getElementById("rankSearch");
  if (rankSearch) rankSearch.addEventListener("input", () => {});

  const calendarDays = document.getElementById("calendarDays");
  const monthTitle = document.getElementById("monthTitle");
  let calendarDate = new Date(2026, 9, 1);
  const monthNames = ["JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO","JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"];

  function renderCalendar() {
    if (!calendarDays || !monthTitle) return;
    const y = calendarDate.getFullYear(), m = calendarDate.getMonth();
    monthTitle.textContent = `${monthNames[m]} DE ${y}`;
    calendarDays.innerHTML = "";
    const first = new Date(y,m,1).getDay();
    const total = new Date(y,m+1,0).getDate();

    for(let i=0;i<first;i++) calendarDays.appendChild(document.createElement("span"));

    for(let d=1;d<=total;d++){
      const b=document.createElement("button");
      b.textContent=d;

      if(y===2026 && m===9 && d===5) b.classList.add("today");

      b.addEventListener("click",()=>showToast(`Agenda de ${d.toString().padStart(2,"0")}/${String(m+1).padStart(2,"0")}/${y}: nenhum evento publicado.`));

      calendarDays.appendChild(b);
    }
  }

  document.getElementById("prevMonth")?.addEventListener("click",()=>{
    calendarDate.setMonth(calendarDate.getMonth()-1);
    renderCalendar()
  });

  document.getElementById("nextMonth")?.addEventListener("click",()=>{
    calendarDate.setMonth(calendarDate.getMonth()+1);
    renderCalendar()
  });

  renderCalendar();
});