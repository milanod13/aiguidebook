// FANEFUNKSJONALITET (US-FR01, US-FR02)
function visTab(faneId) {
    // Skjul alle faner
    const alleFaner = document.querySelectorAll('.tab-innhold');
    alleFaner.forEach(fane => fane.classList.remove('aktiv'));

    // Fjern aktiv fra alle knapper
    const alleKnapper = document.querySelectorAll('.tab-btn');
    alleKnapper.forEach(knapp => knapp.classList.remove('active'));

    // Vis valgt fane
    document.getElementById(faneId).classList.add('aktiv');

    // Merk aktiv knapp
    const aktivKnapp = document.querySelector(`[onclick="visTab('${faneId}')"]`);
    if (aktivKnapp) aktivKnapp.classList.add('active');
}

// KOPIER KILDEHENVISNING (US-FR05)
function kopierTekst(elementId, knapp) {
    const tekst = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(tekst).then(() => {
        knapp.textContent = '✅ Kopiert!';
        knapp.classList.add('kopiert');
        setTimeout(() => {
            knapp.textContent = '📋 Kopier';
            knapp.classList.remove('kopiert');
        }, 2000);
    });
}

// SJEKKLISTE FUNKSJONALITET (US-FR06, US-FR09)
const TOTAL_PUNKTER = 7;

function oppdaterFremgang() {
    const checkboxer = document.querySelectorAll('.sjekk-element input[type="checkbox"]');
    let antallAvkrysset = 0;

    checkboxer.forEach((checkbox, index) => {
        const element = document.getElementById(`sjekk-${index + 1}`);
        if (checkbox.checked) {
            antallAvkrysset++;
            element.classList.add('avkrysset');
        } else {
            element.classList.remove('avkrysset');
        }
    });

    // Oppdater teller
    const teller = document.getElementById('fremgang-teller');
    if (teller) teller.textContent = `${antallAvkrysset} av ${TOTAL_PUNKTER}`;

    // Oppdater fremgangsbar
    const bar = document.getElementById('fremgang-bar-fill');
    if (bar) bar.style.width = `${(antallAvkrysset / TOTAL_PUNKTER) * 100}%`;

    // Lagre i nettleserøkten (US-FR06)
    const status = Array.from(checkboxer).map(cb => cb.checked);
    sessionStorage.setItem('sjekkliste-status', JSON.stringify(status));
}

function tilbakestill() {
    const checkboxer = document.querySelectorAll('.sjekk-element input[type="checkbox"]');
    checkboxer.forEach(checkbox => {
        checkbox.checked = false;
    });
    sessionStorage.removeItem('sjekkliste-status');
    oppdaterFremgang();
}

function lagreSomPDF() {
    window.print();
}

// Last inn lagret status fra økt
function lastInnStatus() {
    const lagretStatus = sessionStorage.getItem('sjekkliste-status');
    if (!lagretStatus) return;

    const status = JSON.parse(lagretStatus);
    const checkboxer = document.querySelectorAll('.sjekk-element input[type="checkbox"]');

    checkboxer.forEach((checkbox, index) => {
        if (status[index]) {
            checkbox.checked = true;
        }
    });
    oppdaterFremgang();
}

// Kjør ved sideinnlasting
document.addEventListener('DOMContentLoaded', lastInnStatus);

// DROPDOWN NAVIGASJON
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const meny = dropdown.querySelector('.dropdown-meny');

    // Åpne/lukke ved klikk
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const erApen = meny.style.display === 'block';
        
        // Lukk alle andre dropdowns
        document.querySelectorAll('.dropdown-meny').forEach(m => {
            m.style.display = 'none';
        });

        meny.style.display = erApen ? 'none' : 'block';
    });
});

// Lukk dropdown ved klikk utenfor
document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown-meny').forEach(m => {
        m.style.display = 'none';
    });
});

// FAQ ACCORDEON
function visSporsmal(faqId) {
    const element = document.getElementById(faqId);
    const knapp = element.querySelector('.faq-knapp');
    const svar = element.querySelector('.faq-svar');

    const erApen = svar.classList.contains('aktiv');

    // Lukk alle andre
    document.querySelectorAll('.faq-svar').forEach(s => s.classList.remove('aktiv'));
    document.querySelectorAll('.faq-knapp').forEach(k => k.classList.remove('aktiv'));

    // Åpne/lukk valgt
    if (!erApen) {
        svar.classList.add('aktiv');
        knapp.classList.add('aktiv');
    }
}