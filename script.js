// Elementi del DOM: app container, i video ecc...
const appContainerEl = document.querySelector("#app-container")
const videosEls = document.querySelectorAll("video")
const audioIconsEls = document.querySelectorAll(".volume")
const heartIconsEls = document.querySelectorAll(".hearts")

// Variabili globali: è il volume attivo
const halfScreenHeight = window.innerHeight / 2
let isVolumeEnabled = false
let isHeartEnabled = false

// Eventi: allo scroll dell'app container, al click dell'icona del volume
appContainerEl.addEventListener("scroll", function() {
    // Per ogni video
    videosEls.forEach(function(video, index) {
        // Recupero le informazioni della posizione del video nella pagina
        const videoRect = video.getBoundingClientRect()
        // Determinare la distanza fra il bordo superiore del video e il bordo superiore del nostro schermo
        // console.log(videoRect.top)
        // SE il bordo superiore videoRect.top del video su cui sto iterando è compreso fra 0 e il valore della metà dello schermo halfScreenHeight
        // faccio partire il video
        // ALTRIMENTI
        // lo metto in pausa
        if(videoRect.top >= 0 && videoRect.top <= halfScreenHeight) {
            video.currentTime = 0
            video.play()
        } else {
            video.pause()
        }
    })
})

// Per ogni icona dell'audio 
// al click
// Imposto l'audio di tutti i video allo stato attuale
// SE isVolumeEnabled è falso => true
// ALTRIMENTI il contrario
audioIconsEls.forEach(function(audioIcon) {
    audioIcon.addEventListener("click", function() {
        // Inverto il valore di isVolumeEnabled
        isVolumeEnabled = !isVolumeEnabled;
        // Per ogni video cambio il valore dell'attributo muted
        videosEls.forEach(function(video) {
            video.muted = !isVolumeEnabled;
        });

        // Cambio l'icona dell'audio solo per l'icona cliccata
        if (isVolumeEnabled) {
            audioIcon.className = "fa-solid fa-volume-high volume";
        } else {
            audioIcon.className = "fa-solid fa-volume-xmark volume";
        }

        // Aggiungo una transizione semplice sul colore e opacità
        audioIcon.style.transition = "color 0.3s ease, opacity 0.3s ease";
        audioIcon.style.opacity = "0.8";
        setTimeout(() => {
            audioIcon.style.opacity = "1";
        }, 300); // Ripristino l'opacità dopo la transizione
    });
})

// Per ogni icona del cuore
// al click
// Imposto l'icona del cuore a riempita
// SE isHeartEnabled è falso => true
// ALTRIMENTI il contrario
heartIconsEls.forEach(function(heartIcon) {
    heartIcon.addEventListener("click", function() {
        // Alterna la classe 'filled-heart' per il cuore
        heartIcon.classList.toggle("filled-heart");

        // Cambia il colore dell'icona del cuore
        if (heartIcon.classList.contains("filled-heart")) {
            heartIcon.style.color = "red";
        } else {
            heartIcon.style.color = "white";
        }

        // Aggiungo una transizione semplice sul colore e opacità
        heartIcon.style.transition = "color 0.3s ease, opacity 0.3s ease";
        heartIcon.style.opacity = "0.8";
        setTimeout(() => {
            heartIcon.style.opacity = "1";
        }, 300); // Ripristino l'opacità dopo la transizione
    });
})