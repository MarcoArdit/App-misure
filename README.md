# Rilievo Misure

App per prendere misure su foto o lavagna, gestire clienti, listini, codici e preventivi in PDF.
Funziona nel browser (telefono, tablet, computer) e i dati restano sul dispositivo.

## Metterla online con GitHub Pages
1. Su github.com crea un repository nuovo (es. `rilievo-misure`), pubblico.
2. Premi "Add file" > "Upload files" e trascina TUTTI i file di questa cartella (anche `.nojekyll`, se la tua vista lo mostra), poi "Commit changes".
3. Vai in Settings > Pages. Sotto "Branch" scegli `main` e la cartella `/ (root)`, poi Save.
4. Dopo un minuto l'indirizzo sarà `https://TUO-NOME.github.io/rilievo-misure/`.
5. Sul telefono apri l'indirizzo e usa "Aggiungi a schermata Home": diventa come un'app.

## Stessi dati su telefono e computer
Nella schermata iniziale, riquadro "Telefono e computer": premi "Accedi o crea account". La prima volta usa "Crea account" (email e password), poi su ogni dispositivo "Accedi" con le stesse credenziali. I dati si sincronizzano da soli ogni pochi secondi e quando riapri l'app.

## Portare qui i dati fatti finora
I dati dell'app provata in Claude non passano da soli (ogni indirizzo ha il suo archivio).
Nell'app di prima: schermata iniziale > Backup. Nell'app nuova: Ripristina e scegli quel file.

## Aggiornamenti
Quando carichi un nuovo `index.html` e `sw.js` (con la riga VERSION cambiata) l'app si aggiorna da sola alla riapertura.
