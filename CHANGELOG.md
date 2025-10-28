# Changelog

Alle belangrijke wijzigingen aan dit project worden hier bijgehouden.

## [v1.1] – 2025-10-28
### Toegevoegd
- Tweede pagina in PDF-export met **Gezondheidsverklaring (checklist)**.
- Automatische paginering in PDF.

### Verbeterd
- PDF-export herschreven tot één duidelijke functie (`exportPDF()`).
- Fallback toegevoegd voor browsers zonder `autoTable`.
- Typografische details verbeterd (afstand, volgorde, fonts).

### Opgelost
- Gezondheidsverklaring verscheen niet in PDF (code buiten functie).
- Overbodige losse codeblokken verwijderd.

---

## [v1.0] – 2025-10-25
### Eerste release
- Werkende webapp voor het spreekuur van de **Thesaurusdokter**.
- Functies:
  - Anamnese (klachten selecteren)
  - Diagnosebepaling (licht, chronisch, spoedgeval)
  - Adviezen per klacht (recept)
  - PDF-download van Gezondheidsverklaring
