<template>
  <div class="content-body">
  </div>
</template>

<script>
// TODO: Merge the branch to master                                                           ---- 

// TODO: Select adres not working in update when klant is already selected                    ---- OK
// TODO: Datum fixen, telt altijd een dag terug in aankoop, verkoop en creditnota             ---- OK (99%)
// TODO: Table toggle aangepast door                                                          ---- OK
// TODO: Update show when last updated and by who                                             ---- OK
// TODO: Add bestelling en order nr in create and use api call for correct index              ---- OK
// TODO: Facturen titel beter maken bij zowel aankoop als verkoop                             ---- OK
// TODO: Opmerking order aanpassen qua naam voor AK, VK, CR                                   ---- OK
// TODO: fix bug in update with address                                                       ---- OK
// TODO: add error message at top of factuur: aankopen, verkopen, creditnotas                 ---- OK
// TODO: Table pagination when search text is changed set page again to 1                     ---- 
// TODO: fix bug with sorting table in overview                                               ---- 
// TODO: Artikel beter maken                                                                  ---- OK
// TODO: afbeelding toevoegen in print voor aankoop, verkoop en creditnota                    ---- 
// TODO: add before page refresh a message check when form is filled in and not submitted     ---- 
// TODO: show user that is logged in                                                          ---- 
// TODO: log user out if he is deleted and logged in                                          ---- 
// TODO: loading feedback                                                                     ---- 

// TODO: add overview for each klant, leverancier and artikel                                 ---- 
// TODO: dagboek toevoegen voor elke dag, week, maand, jaar of aangepaste periode             ---- 

// TODO: ENV Variables - check for TODO's in all files                                        ---- 
// TODO: delete console logs                                                                  ---- 
// TODO: Confirmation yes or no modal                                                         ---- 
// TODO: Counter change for aankopen, verkopen en creditnota                                  ---- 
/*
// TODO: Statistieken: 

- Aankopen, verkopen en creditnota:
    o Totaal aantal                                             --- OK 
    o Totaal prijs                                              --- OK
    o Periode: dag, week, maand, jaar en aagepaste periode      --- OK
- Klanten aankopen, verkopen en creditnotas
    o Totaal aantal                                             --- 
    o Totaal prijs                                              --- 
    o Periode: dag, week, maand, jaar en aagepaste periode      --- 
- Leveranciers aankopen, verkopen, creditnotas 
    o Totaal prijs                                              --- 
    o Totaal aantal                                             ---  
    o Periode: dag, week, maand, jaar en aagepaste periode      --- 
- Artikels
    o Totaal prijs                                              --- 
    o Totaal aantal                                             --- 
    o Periode: dag, week, maand, jaar en aagepaste periode      --- 

--> Totaal
--> Per klant of leverancier 
--> Per artikel



TODO: op leverdatum en op vervaldag een agenda calender en op klik met detail pagina en voor klanten nog betalingsdatum, beide apart
TODO; per klant en per leverancier
TODO: order "jaar en teller " 2022-1T
TODO: logo toevoegen
TODO: leverancier, per klant, per artikel


// DATABASE

- Bedrijven                                             ---     OK
- Gebruikers                                            ---                     Gebruikersnamen en Wachtwoorden
- Counters                                              ---     
- Betalingstermijnen                                    ---     OK
- Btw                                                   ---     OK
- Tekst                                                 ---     OK
- Artikelen                                             ---     OK
- Klanten                                               ---     OK
- Leveranciers                                          ---     OK
- Aankopen                                              ---     OK
- Aankopen_artikels                                     ---     OK
- Verkopen                                              ---     OK
- Verkopen_artikels                                     ---     OK
- Creditnotas                                           ---     OK
- Creditnotas_artikels                                  ---     OK

ALTER TABLE aankopen AUTO_INCREMENT=1;
truncate table aankopen;
ALTER TABLE aanopen_artikels AUTO_INCREMENT=1;
truncate table aanopen_artikels;
ALTER TABLE artikelen AUTO_INCREMENT=1;
truncate table artikelen;
ALTER TABLE betalingstermijnen AUTO_INCREMENT=1;
truncate table betalingstermijnen;
ALTER TABLE btw AUTO_INCREMENT=1;
truncate table btw;
ALTER TABLE counters AUTO_INCREMENT=1;
truncate table counters;
ALTER TABLE creditnotas AUTO_INCREMENT=1;
truncate table creditnotas;
ALTER TABLE creditnotas_artikels AUTO_INCREMENT=1;
truncate table creditnotas_artikels;
ALTER TABLE gebruikers AUTO_INCREMENT=1;
truncate table gebruikers;
ALTER TABLE klanten AUTO_INCREMENT=1;
truncate table klanten;
ALTER TABLE leveranciers AUTO_INCREMENT=1;
truncate table leveranciers;
ALTER TABLE tekst AUTO_INCREMENT=1;
truncate table tekst;
ALTER TABLE verkopen AUTO_INCREMENT=1;
truncate table verkopen;
ALTER TABLE verkopen_artikels AUTO_INCREMENT=1;
truncate table verkopen_artikels;

*/

export default {
  name: "Home",
};
</script>