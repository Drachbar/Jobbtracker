# Jobbtracker

Jobbtracker är en webapp för att hålla koll på jobbansökningar – status, deadlines och information på ett ställe.

## Funktioner

- Lägg till jobb manuellt med företag, titel, länk, stad, anställningsform, status och deadline.
- Hämta information automatiskt från Platsbanken via annonslänk.
- Sök bland sparade jobb på företag eller titel. 
- Filtrera jobb efter status. 
- Visa jobb antingen som lista eller board.
- Uppdatera status direkt i gränssnittet.
- Spara all data lokalt i webbläsaren med `localStorage`. 

## Statusar

Appen använder följande statusar för att följa en ansökan:

- Vill söka
- Sökt
- Intervju
- Avslag

## Teknik

Projektet är byggt med:

- React
- TypeScript
- Vite
- Chakra UI

## Kom igång

Installera beroenden:

```bash
npm install
```

## Projektidé

Tanken med Jobbtracker är att göra jobbsökandet mer strukturerat. I stället för att hålla reda på ansökningar i anteckningar, mejl eller flera olika flikar samlas allt i en och samma vy.

## Möjliga framtida förbättringar

- Redigera befintliga jobb
- Sortering på deadline eller skapad datum
- Fler statusar, till exempel erbjudande
- Export och import av data
- Notiser för sista ansökningsdag
- Synkning mot backend eller databas