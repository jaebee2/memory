/* =========================================================
   MEMORY LANE
   Birthday Memory Gallery
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const IMAGE_FOLDER = "fresh/";

 const memories = [

    {
        image: "FIKP9654.png",
        title: "A Beautiful Memory",
        text: "One of those moments I will always remember. ❤️"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.17.56.png",
        title: "Moments Like This",
        text: "Some moments become memories we never want to lose. ✨"
    },

    {
        image: "my.png",
        title: "Just Us",
        text: "A simple moment that means so much to me. 💕"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.18.19.jpeg",
        title: "A Special Chapter",
        text: "Another beautiful chapter of our story. ❤️"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.17.52.png",
        title: "Captured Forever",
        text: "A special moment captured forever. 💖"
    },

    {
        image: "new.jpeg",
        title: "A Special Moment",
        text: "Every memory with you is worth keeping. ✨"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.17.50.jpeg",
        title: "A Memory to Keep",
        text: "Some moments deserve to be remembered forever. ❤️"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.18.05.png",
        title: "A Little Memory",
        text: "A little memory with a lot of meaning. ❤️"
    },

    {
        image: "WhatsApp Image 2026-08-15 at 22.17.27.jpeg",
        title: "That Beautiful Moment",
        text: "Another memory that makes me smile. ❤️"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.18.01.png",
        title: "Our Journey",
        text: "A beautiful moment from our journey together. 💖"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.34.57.jpeg",
        title: "Worth Keeping",
        text: "A memory worth keeping close forever. 💖"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.17.55.png",
        title: "Another Beautiful Moment",
        text: "Another beautiful piece of our journey. 💕"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.18.28.jpeg",
        title: "Our Story",
        text: "Another little piece of our beautiful story. ✨"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.18.00.png",
        title: "One of My Favorites",
        text: "One of my favorite memories. ❤️"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.18.04.jpeg",
        title: "A Beautiful Moment",
        text: "A beautiful moment in time. 💕"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.18.15.png",
        title: "Another Chapter",
        text: "And another beautiful chapter of our story. 💕"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.18.19.jpeg",
        title: "Close to My Heart",
        text: "This one will always have a special place in my heart. ❤️"
    },

    {
        image: "WhatsApp Video 2026-08-16 at 09.18.02.png",
        title: "Never Forget",
        text: "Another moment I never want to forget. ✨"
    },

    {
        image: "WhatsApp Image 2026-08-16 at 09.17.46.jpeg",
        title: "A Moment Captured",
        text: "A moment captured forever. 💖"
    },

    {
        image: "JOMA5393.png",
        title: "Another Beautiful Memory",
        text: "A new memory waiting to become part of our story. ❤️"
    },

    {
        image: "memory20.png",
        title: "A Special Moment",
        text: "Another special moment from our journey. 💖"
    },

    {
        image: "memory22.jpg",
        title: "The Story Continues",
        text: "One more beautiful memory to complete our story. ✨"
    }

];

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const gallery = document.getElementById("memoryGallery");
    const startButton = document.getElementById("startSlideshow");
    const pauseButton = document.getElementById("pauseSlideshow");
    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");
    const confettiContainer =
        document.getElementById("confetti-container");


    /* =====================================================
       STATE
    ===================================================== */

    let slideshowInterval = null;
    let currentSlide = 0;
    let slideshowRunning = false;


    /* =====================================================
       GENERATE GALLERY
    ===================================================== */

    function createGallery() {

        if (!gallery) return;

        gallery.innerHTML = "";

        memories.forEach((memory, index) => {

            const card = document.createElement("article");

            card.className = "memory-card";

            card.dataset.index = index;

            card.innerHTML = `

                <div class="memory-card-inner">

                    <div class="memory-image-wrapper">

                        <img
                            src="${IMAGE_FOLDER}${memory.image}"
                            alt="${memory.title}"
                            class="memory-image"
                            loading="${index < 4 ? "eager" : "lazy"}"
                        >

                        <div class="memory-number">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                    </div>

                    <div class="memory-content">

                        <h3>
                            ${memory.title}
                        </h3>

                        <p>
                            ${memory.text}
                        </p>

                    </div>

                </div>

            `;

            gallery.appendChild(card);

            setupCard(card);

        });

    }


    /* =====================================================
       CARD INTERACTIONS
    ===================================================== */

    function setupCard(card) {

        const image = card.querySelector(".memory-image");

        if (!image) return;


        /* Image loading */

        image.addEventListener("load", () => {

            image.classList.add("loaded");

            card.classList.add("image-loaded");

        });


        /* Image error */

        image.addEventListener("error", () => {

            console.warn(
                "Unable to load image:",
                image.src
            );

            card.classList.add("image-error");

        });


        /* Hover animation */

        card.addEventListener("mouseenter", () => {

            if (window.gsap) {

                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.35,
                    ease: "power2.out"
                });

            }

        });


        card.addEventListener("mouseleave", () => {

            if (window.gsap) {

                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: "power2.out"
                });

            }

        });


        /* Click image */

        image.addEventListener("click", () => {

            openImageViewer(
                image.src,
                image.alt,
                card.dataset.index
            );

        });

    }


    /* =====================================================
       GSAP SCROLL ANIMATION
    ===================================================== */

    function initializeAnimations() {

        if (!window.gsap) return;

        if (window.ScrollTrigger) {

            gsap.registerPlugin(ScrollTrigger);

        }

        const cards =
            document.querySelectorAll(".memory-card");


        cards.forEach((card, index) => {

            if (window.ScrollTrigger) {

                gsap.fromTo(
                    card,

                    {
                        opacity: 0,
                        y: 70,
                        scale: 0.94
                    },

                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: (index % 3) * 0.08,
                        ease: "power3.out",

                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            once: true
                        }

                    }
                );

            } else {

                gsap.fromTo(
                    card,

                    {
                        opacity: 0,
                        y: 50
                    },

                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.05
                    }
                );

            }

        });

    }


    /* =====================================================
       IMAGE VIEWER / LIGHTBOX
    ===================================================== */

    function openImageViewer(src, alt, index) {

        let viewer =
            document.getElementById("memoryImageViewer");


        if (!viewer) {

            viewer = document.createElement("div");

            viewer.id = "memoryImageViewer";

            viewer.innerHTML = `

                <div class="memory-viewer-backdrop"></div>

                <div class="memory-viewer-content">

                    <button
                        class="memory-viewer-close"
                        aria-label="Close image"
                    >
                        ×
                    </button>

                    <button
                        class="memory-viewer-prev"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    <img
                        class="memory-viewer-image"
                        src=""
                        alt=""
                    >

                    <button
                        class="memory-viewer-next"
                        aria-label="Next image"
                    >
                        ›
                    </button>

                    <div class="memory-viewer-caption"></div>

                </div>

            `;

            document.body.appendChild(viewer);


            viewer
                .querySelector(".memory-viewer-close")
                .addEventListener("click", closeImageViewer);


            viewer
                .querySelector(".memory-viewer-backdrop")
                .addEventListener("click", closeImageViewer);


            viewer
                .querySelector(".memory-viewer-prev")
                .addEventListener(
                    "click",
                    showPreviousImage
                );


            viewer
                .querySelector(".memory-viewer-next")
                .addEventListener(
                    "click",
                    showNextImage
                );

        }


        currentSlide = Number(index);

        updateViewer();

        viewer.classList.add("active");

        document.body.classList.add("viewer-open");

    }


    function updateViewer() {

        const viewer =
            document.getElementById("memoryImageViewer");

        if (!viewer) return;

        const memory =
            memories[currentSlide];

        if (!memory) return;


        const image =
            viewer.querySelector(
                ".memory-viewer-image"
            );

        const caption =
            viewer.querySelector(
                ".memory-viewer-caption"
            );


        image.src =
            IMAGE_FOLDER + memory.image;

        image.alt =
            memory.title;


        caption.innerHTML = `

            <strong>
                ${memory.title}
            </strong>

            <span>
                ${memory.text}
            </span>

            <small>
                ${currentSlide + 1} / ${memories.length}
            </small>

        `;

    }


    function closeImageViewer() {

        const viewer =
            document.getElementById("memoryImageViewer");

        if (!viewer) return;

        viewer.classList.remove("active");

        document.body.classList.remove("viewer-open");

    }


    function showPreviousImage() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                memories.length - 1;

        }

        updateViewer();

    }


    function showNextImage() {

        currentSlide++;

        if (currentSlide >= memories.length) {

            currentSlide = 0;

        }

        updateViewer();

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener("keydown", event => {

        const viewer =
            document.getElementById(
                "memoryImageViewer"
            );


        if (
            viewer &&
            viewer.classList.contains("active")
        ) {

            if (event.key === "Escape") {

                closeImageViewer();

            }

            if (event.key === "ArrowLeft") {

                showPreviousImage();

            }

            if (event.key === "ArrowRight") {

                showNextImage();

            }

        }

    });


    /* =====================================================
       SLIDESHOW
    ===================================================== */

    function startSlideshow() {

        if (slideshowRunning) return;

        slideshowRunning = true;

        if (startButton) {

            startButton.hidden = true;

        }

        if (pauseButton) {

            pauseButton.hidden = false;

        }


        highlightSlide(0);

        slideshowInterval =
            setInterval(() => {

                currentSlide++;

                if (
                    currentSlide >=
                    memories.length
                ) {

                    currentSlide = 0;

                }

                highlightSlide(currentSlide);

            }, 4000);


        createConfetti();

    }


    function pauseSlideshow() {

        slideshowRunning = false;

        clearInterval(slideshowInterval);

        slideshowInterval = null;


        if (startButton) {

            startButton.hidden = false;

        }

        if (pauseButton) {

            pauseButton.hidden = true;

        }

    }


    function highlightSlide(index) {

        const cards =
            document.querySelectorAll(
                ".memory-card"
            );

        if (!cards.length) return;


        cards.forEach(card => {

            card.classList.remove(
                "slideshow-active"
            );

        });


        const card = cards[index];

        if (!card) return;


        card.classList.add(
            "slideshow-active"
        );


        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            startSlideshow
        );

    }


    if (pauseButton) {

        pauseButton.addEventListener(
            "click",
            pauseSlideshow
        );

    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                /*
                 * Change this filename if your
                 * next birthday page has another name.
                 */

                window.location.href =
                    "letter.html";

            }
        );

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti() {

        if (!confettiContainer) return;


        confettiContainer.innerHTML = "";


        const pieces = 45;


        for (let i = 0; i < pieces; i++) {

            const piece =
                document.createElement("span");


            piece.className =
                "confetti-piece";


            piece.style.left =
                Math.random() * 100 + "%";


            piece.style.animationDelay =
                Math.random() * 2 + "s";


            piece.style.animationDuration =
                3 + Math.random() * 4 + "s";


            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confettiContainer.appendChild(piece);

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    createGallery();

    initializeAnimations();


    /* =====================================================
       IMAGE COUNT
    ===================================================== */

    console.log(
        `💖 Memory Lane loaded ${memories.length} memories.`
    );

});
/* =========================================
   MEMORY LANE BACKGROUND MUSIC
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("memoryLaneMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (!music || !musicToggle) {
        console.warn("Memory Lane music elements not found.");
        return;
    }

    let musicStarted = false;

    /*
     * Set volume.
     * 0.0 = silent
     * 1.0 = maximum
     */
    music.volume = 0.35;


    /* =====================================
       PLAY MUSIC
    ===================================== */

    function playMemoryLaneMusic() {

        const playPromise = music.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    musicToggle.textContent = "🔊";

                    musicToggle.classList.add("playing");

                    musicToggle.setAttribute(
                        "aria-label",
                        "Turn background music off"
                    );

                })
                .catch(() => {

                    /*
                     * Mobile browsers may block autoplay.
                     * The music will start after the user's
                     * first interaction.
                     */

                    console.log(
                        "Music autoplay blocked. Waiting for user interaction."
                    );

                });
        }
    }


    /* =====================================
       PAUSE MUSIC
    ===================================== */

    function pauseMemoryLaneMusic() {

        music.pause();

        musicToggle.textContent = "🔇";

        musicToggle.classList.remove("playing");

        musicToggle.setAttribute(
            "aria-label",
            "Turn background music on"
        );
    }


    /* =====================================
       MUSIC BUTTON
    ===================================== */

    musicToggle.addEventListener("click", () => {

        if (music.paused) {

            playMemoryLaneMusic();

        } else {

            pauseMemoryLaneMusic();

        }

    });


    /* =====================================
       START MUSIC AFTER FIRST USER
       INTERACTION
    ===================================== */

    function unlockMusic() {

        if (!musicStarted && music.paused) {

            playMemoryLaneMusic();

        }

        /*
         * Once the browser allows playback,
         * we don't need to keep listening.
         */

        if (!music.paused) {

            document.removeEventListener(
                "click",
                unlockMusic
            );

            document.removeEventListener(
                "touchstart",
                unlockMusic
            );

            document.removeEventListener(
                "keydown",
                unlockMusic
            );
        }
    }


    document.addEventListener(
        "click",
        unlockMusic,
        { passive: true }
    );

    document.addEventListener(
        "touchstart",
        unlockMusic,
        { passive: true }
    );

    document.addEventListener(
        "keydown",
        unlockMusic,
        { passive: true }
    );


    /* =====================================
       TRY AUTOPLAY
    ===================================== */

    playMemoryLaneMusic();

});