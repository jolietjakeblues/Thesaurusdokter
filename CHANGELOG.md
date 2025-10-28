# Changelog

## v1.3 – 2025-10-28
### Inhoud en taal
- Alle teksten afgestemd op de studiedag "De ruggengraat van het verbinden. Werken met termen."
- Nieuwe toon: termen als ruggengraat voor vindbaarheid, hergebruik en samenwerking.
- Motto toegevoegd:
  - "Samen werken aan betekenis. De Thesaurusdokter helpt u uw termen gezond en verbonden te houden."
  - "BaaS: Betekenis as a Service."

### UI / content
- Intake- en diagnose-teksten verduidelijkt: minder technisch, meer richting samenwerking.
- Sectietitel "Advies van de Thesaurusdokter" hernoemd naar "Recept voor gezonde verbindingen".
- Footertekst in de webapp aangepast naar:
  - "Samen werken aan betekenis - Betekenis as a Service."

### PDF-output
- PDF-download bevat nu:
  1. Een dynamisch deel (organisatie, inschatting, recept, eindoordeel).
  2. Een vaste checklistpagina met structurele aandachtspunten (beheer, governance, koppelingen).
- Beide PDF-delen worden in de browser samengevoegd met pdf-lib.
- De checklist heeft nu het studiedag-motto als afsluiting.

### Technisch
- `jspdf-autotable` verwijderd.
- `pdf-lib` toegevoegd.
- `exportPDF()` herschreven om twee PDF's te combineren.
- Nieuwe statische PDF geplaatst onder `assets/gezondheidsverklaring-checklist.pdf`.

---

## v1.2 – 2025-10-28
- Eerste versie met PDF-samenvoeging (persoonlijk advies + vaste checklist).
- Introductie van pdf-lib in de frontend.

## v1.1 – 2025-10-28
- Automatische ernstinschatting en receptweergave verbeterd.
- Eerste PDF-export met diagnose en recept.

## v1.0 – 2025-10-25
- Eerste publieke versie van de Thesaurusdokter.
- Anamnese, diagnose, recept en PDF-download.
