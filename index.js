// ---------- INITIALISATION EMAILJS ----------
(function() {
    try {
        // Ta clé publique (celle fournie plus haut)
        emailjs.init({
            publicKey: "wmHZ9EWVPpUUzeNH4"
        });
    } catch (e) {
        console.warn("EmailJS non chargé ou erreur d'initialisation :", e);
    }
})();

// ---------- FONCTIONS DE NAVIGATION + HIGHLIGHT ----------
function scrollToContactWithHighlight() {
    const contactSection = document.querySelector("#contact");
    const contactForm = document.querySelector("#contact-form");
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    if (!contactSection || !contactForm) return;

    // Calculer la position en tenant compte de la navbar fixe
    const top = contactSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

    // Scroll fluide vers la position calculée
    window.scrollTo({ top, behavior: "smooth" });

    // Ajouter l'effet highlight après un petit délai (laisser le scroll se faire)
    const HIGHLIGHT_DELAY = 600; // ms
    setTimeout(() => {
        contactForm.classList.add("highlight-form");

        // Donner le focus sur le premier champ (plus accessible)
        const firstInput = contactForm.querySelector('[name="user_name"], input, textarea');
        if (firstInput) firstInput.focus();

        // retirer la classe après durée de l'animation
        setTimeout(() => {
            contactForm.classList.remove("highlight-form");
        }, 2000); // correspond à la durée de l'animation CSS
    }, HIGHLIGHT_DELAY);
}

// ---------- ATTACHER ÉCOUTEURS SUR LES BOUTONS ----------
document.addEventListener("DOMContentLoaded", function() {
    const letsTalkBtn = document.getElementById("letsTalkBtn");
    const getInTouchBtn = document.getElementById("getInTouchBtn");

    if (letsTalkBtn) {
        letsTalkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            scrollToContactWithHighlight();
        });
    }

    if (getInTouchBtn) {
        getInTouchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            scrollToContactWithHighlight();
        });
    }

    // ---------- GESTION DU FORMULAIRE (EmailJS + SweetAlert2) ----------
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            // Afficher une popup de chargement
            Swal.fire({
                title: 'Envoi en cours...',
                text: 'Merci de patienter pendant que nous envoyons votre message.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Envoi via EmailJS - adapte service/template si nécessaire
            // Ici on utilise les valeurs que tu avais : service_123 et template_7rpbhqn
            emailjs.sendForm("service_123", "template_7rpbhqn", this)
                .then(
                    function() {
                        Swal.fire({
                            icon: 'success',
                            title: 'Message envoyé !',
                            text: 'Merci, je te répondrai bientôt.',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6'
                        });
                        form.reset();
                    },
                    function(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oups...',
                            text: 'L\'envoi a échoué. Réessaie plus tard.',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#d33'
                        });
                        console.error("Erreur EmailJS :", error);
                    }
                );
        });
    }

    // Optionnel : si utilisateur clique sur un lien anchor "#contact" (dans la nav)
    // on empêche le saut par défaut et on utilise notre scroll personnalisé
    document.querySelectorAll('a[href="#contact"]').forEach(a => {
        a.addEventListener("click", function(e) {
            e.preventDefault();
            scrollToContactWithHighlight();
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    hamburgerBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Fermer menu au clic sur un lien
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });
});