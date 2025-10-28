// hulpfuncties

function getCheckedSymptoms() {
  const boxes = document.querySelectorAll(".symptom");
  const selected = [];
  boxes.forEach(b => {
    if (b.checked) {
      selected.push(b.value);
    }
  });
  const other = document.getElementById("otherSymptom").value.trim();
  if (other !== "") {
    selected.push("anders:" + other);
  }
  return selected;
}

// Ernst bepalen op basis van klachten
// Regels:
// - "geen_beheer" of "niet_vindbaar" => minstens "chronisch"
// - combinatie "geen_beheer" + "niet_vindbaar" => "spoedgeval"
// - niets aangevinkt => "licht"
function determineSeverity(symptoms) {
  const hasNoOwner = symptoms.includes("geen_beheer");
  const notFindable = symptoms.includes("niet_vindbaar");

  if (hasNoOwner && notFindable) {
    return "Spoedgeval";
  }
  if (hasNoOwner || notFindable) {
    return "Chronisch";
  }
  if (symptoms.length === 0) {
    return "Licht ongemak";
  }
  return "Chronisch";
}

// Kernrisico's formuleren op basis van klachten
function buildRisks(symptoms) {
  const risks = [];

  if (symptoms.includes("dubbele_termen")) {
    risks.push("Zoekresultaten raken versnipperd door synoniemenstrijd.");
  }
  if (symptoms.includes("verouderd")) {
    risks.push("Onjuiste of gevoelige terminologie schaadt vertrouwen.");
  }
  if (symptoms.includes("onduidelijke_hierarchie")) {
    risks.push("Geen duidelijke structuur maakt hergebruik lastig.");
  }
  if (symptoms.includes("overlap")) {
    risks.push("Parallelle lijsten concurreren en veroorzaken ruis.");
  }
  if (symptoms.includes("geen_beheer")) {
    risks.push("Zonder eigenaar is er geen borging van kwaliteit en geen updatecyclus.");
  }
  if (symptoms.includes("geen_koppeling")) {
    risks.push("Geen koppeling beperkt interoperabiliteit en uitwisseling.");
  }
  if (symptoms.includes("niet_vindbaar")) {
    risks.push("Gebruikers kunnen materiaal niet betrouwbaar terugvinden.");
  }

  // Anders / vrije tekst
  symptoms
    .filter(s => s.startsWith("anders:"))
    .forEach(s => {
      risks.push(s.replace("anders:", "Specifiek probleem: "));
    });

  if (risks.length === 0) {
    risks.push("Geen directe risico's benoemd. Mogelijk alleen behoefte aan lichte opschoning.");
  }

  return risks;
}

// Receptregels per klacht
function buildRecept(symptoms) {
  const recepts = [];

  if (symptoms.includes("dubbele_termen")) {
    recepts.push({
      title: "Dubbele termen / synoniemen",
      text: [
        "Kies één voorkeusterm en registreer de rest als synoniem.",
        "Leg dat besluit vast (wie beslist, waarom gekozen).",
        "Publiceer de voorkeusterm in documentatie zodat iedereen hem gebruikt."
      ]
    });
  }

  if (symptoms.includes("verouderd")) {
    recepts.push({
      title: "Verouderde of inconsistente termen",
      text: [
        "Plan een periodieke review (bijv. halfjaarlijks) met inhoudelijke experts.",
        "Leg vast wanneer een term vervangen is en door welke nieuwe term.",
        "Communiceer wijziging aan de gebruikers van de data."
      ]
    });
  }

  if (symptoms.includes("onduidelijke_hierarchie")) {
    recepts.push({
      title: "Onduidelijke hiërarchie",
      text: [
        "Herstel de basisstructuur: broader / narrower / related.",
        "Controleer of elk begrip op de juiste plek hangt.",
        "Schrijf één zin per term: ‘Dit begrip betekent voor ons...’"
      ]
    });
  }

  if (symptoms.includes("niet_vindbaar")) {
    recepts.push({
      title: "Niet goed vindbaar in systemen",
      text: [
        "Controleer of de termenbron goed wordt ingelezen door het collectiesysteem.",
        "Test zoekgedrag met echte gebruikers.",
        "Zorg dat voorkeustermen en synoniemen allebei doorzoekbaar zijn."
      ]
    });
  }

  if (symptoms.includes("overlap")) {
    recepts.push({
      title: "Overlap tussen termenbronnen",
      text: [
        "Kies een voorkeursbron per domein (wie is leidend voor welke termen).",
        "Verwijs waar mogelijk naar een externe, gezaghebbende bron in plaats van zelf dupliceren.",
        "Noteer in de andere bron: ‘gebruik voorkeursterm uit X’."
      ]
    });
  }

  if (symptoms.includes("geen_beheer")) {
    recepts.push({
      title: "Geen vaste eigenaar / geen onderhoud",
      text: [
        "Wijs expliciet een beheerder aan (functie, niet persoon).",
        "Leg vast: hoe vaak wordt opgeschoond, wie mag nieuwe termen toevoegen.",
        "Zet governance op 1 A4 en laat die goedkeuren."
      ]
    });
  }

  if (symptoms.includes("geen_koppeling")) {
    recepts.push({
      title: "Geen koppeling met andere bronnen",
      text: [
        "Koppel belangrijke termen aan een erkende externe bron (bijv. AAT, Wikidata, Termennetwerk).",
        "Bewaar de URI’s, niet alleen labels.",
        "Documenteer waarom u koppelt en met welke dekking."
      ]
    });
  }

  // vrije tekst klacht → generieke slotbehandeling
  symptoms
    .filter(s => s.startsWith("anders:"))
    .forEach(s => {
      recepts.push({
        title: "Specifieke observatie",
        text: [
          s.replace("anders:", "").trim(),
          "Leg het probleem vast als issue in beheeragenda.",
          "Plan een besluitmoment met de verantwoordelijke beheerder.",
          "Documenteer gekozen oplossing en consequenties voor data."
        ]
      });
    });

  if (recepts.length === 0) {
    recepts.push({
      title: "Geen urgente klachten",
      text: [
        "Uw bron oogt stabiel.",
        "Plan wel minimaal 2 vaste controlemomenten per jaar.",
        "Borg wie eigenaar is, ook als alles gezond lijkt."
      ]
    });
  }

  return recepts;
}

// Samenvattingstekst
function buildSummary(orgName, sourceName, severity) {
  if (!orgName && !sourceName) {
    return "Er is (nog) geen context ingevuld. Voeg organisatie en bron toe voor een volledige verklaring.";
  }

  let base = "";
  if (orgName) {
    base += "Beoordeling van " + orgName;
  }
  if (sourceName) {
    base += (base ? " – " : "") + "terminologiebron \"" + sourceName + "\"";
  }
  base += ". ";

  base += "De huidige toestand wordt ingeschat als: " + severity + ". ";

  if (severity === "Spoedgeval") {
    base += "Advies: pak governance en vindbaarheid snel op. Dit is een risico voor vindbaarheid, duurzaamheid en vertrouwen.";
  } else if (severity === "Chronisch") {
    base += "Advies: plan gericht herstel. Dit vraagt aandacht maar is beheersbaar.";
  } else {
    base += "Advies: blijf periodiek controleren en leg verantwoordelijkheden vast.";
  }

  return base;
}

// UI helpers
function renderList(container, items) {
  container.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderRecept(container, recepts) {
  container.innerHTML = "";
  recepts.forEach(block => {
    const wrap = document.createElement("div");
    wrap.className = "recept-item";

    const titleEl = document.createElement("div");
    titleEl.className = "recept-item-title";
    titleEl.textContent = block.title;
    wrap.appendChild(titleEl);

    block.text.forEach(line => {
      const p = document.createElement("div");
      p.textContent = "• " + line;
      wrap.appendChild(p);
    });

    container.appendChild(wrap);
  });
}

// PDF export
async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const org = document.getElementById("orgName").value || "(organisatie onbekend)";
  const src = document.getElementById("sourceName").value || "(bron onbekend)";
  const sev = document.getElementById("severityText").textContent;
  const finalStatus = document.getElementById("finalStatus").textContent;

  let y = 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Gezondheidsverklaring Thesaurus", 10, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Organisatie: " + org, 10, y); y += 6;
  doc.text("Bron: " + src, 10, y); y += 6;
  doc.text("Inschatting: " + sev, 10, y); y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Advies van de Thesaurusdokter:", 10, y); y += 6;
  doc.setFont("helvetica", "normal");

  const receptItems = document.querySelectorAll(".recept-item");
  receptItems.forEach(block => {
    const title = block.querySelector(".recept-item-title").textContent;
    doc.text("• " + title, 10, y);
    y += 5;
    const lines = [...block.querySelectorAll("div:not(.recept-item-title)")].map(div => div.textContent);
    lines.forEach(line => {
      doc.text("   " + line, 10, y);
      y += 5;
    });
    y += 3;
  });

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Eindoordeel:", 10, y); y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(finalStatus, 10, y); y += 10;

  doc.text("Handtekening dokter: ___________________________", 10, y); y += 6;
  doc.text("Datum: ___________________________", 10, y); y += 10;

  doc.text("Spreekuur zonder wachtlijst. Raadpleeg bij twijfel uw Thesaurusdokter.", 10, y);

  doc.save("Gezondheidsverklaring_Thesaurusdokter.pdf");
}


// event listeners
document.addEventListener("DOMContentLoaded", () => {
  const diagnoseBtn = document.getElementById("diagnoseBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  diagnoseBtn.addEventListener("click", () => {
    const symptoms = getCheckedSymptoms();
    const orgName = document.getElementById("orgName").value.trim();
    const sourceName = document.getElementById("sourceName").value.trim();

    // ernst
    const severity = determineSeverity(symptoms);
    document.getElementById("severityText").textContent = severity;
    document.getElementById("overallStatusPill").textContent = severity;
    document.getElementById("finalStatus").textContent = severity;

    // risico's
    const risks = buildRisks(symptoms);
    renderList(document.getElementById("riskList"), risks);

    // recept
    const recept = buildRecept(symptoms);
    renderRecept(document.getElementById("receptList"), recept);

    // samenvatting
    const summary = buildSummary(orgName, sourceName, severity);
    document.getElementById("summaryText").textContent = summary;
  });

  downloadBtn.addEventListener("click", exportPDF);
});
// Voeg gezondheidsverklaring toe
doc.addPage();
doc.text("Gezondheidsverklaring", 10, 20);

const tableData = [
  ["Aspect", "Gezond", "Aandacht nodig"],
  ["Er is een vaste beheerder", "☐", "☐"],
  ["De lijst is gedocumenteerd (scope, licentie, structuur)", "☐", "☐"],
  ["Terminologie is actueel en bruikbaar", "☐", "☐"],
  ["Er zijn koppelingen met Termennetwerk of andere bronnen", "☐", "☐"],
  ["Synoniemen en hiërarchie zijn gecontroleerd", "☐", "☐"],
  ["Gebruikers geven feedback", "☐", "☐"],
  ["Er is een exitstrategie bij onderhoudsstop", "☐", "☐"],
  ["De bron is open beschikbaar (LOD)", "☐", "☐"],
  ["Governance is vastgelegd", "☐", "☐"],
  ["U herkent uw eigen termen zonder zoekpijn", "☐", "☐"]
];

// Gebruik jsPDF autoTable als die is geladen
if (window.jspdf && window.jspdf.autoTable) {
  doc.autoTable({
    head: [tableData[0]],
    body: tableData.slice(1),
    startY: 30,
    theme: 'grid'
  });
}
