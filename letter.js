document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const container =
        document.getElementById("page-container");

    const surpriseButton =
        document.getElementById("surprise-button");

    const modalOverlay =
        document.getElementById("modal-overlay");

    const modalClose =
        document.getElementById("modal-close");

    const duaCloseButton =
        document.getElementById("dua-close-button");

    const duaAudio =
        document.getElementById("dua-audio-player");

    const duaStatus =
        document.getElementById("dua-audio-status");

    const duaItems =
        document.querySelectorAll(".dua-item");

    const clickSound =
        document.getElementById("click-sound");

    const backgroundMusic =
        document.getElementById("background-music");

    const musicToggle =
        document.getElementById("music-toggle");

    const musicIcon =
        document.getElementById("music-icon");


    /* =====================================================
       BIRTHDAY MESSAGE
       ===================================================== */

    const letterContent = `My Deedah ❤️,

As I sit here thinking about all the beautiful memories we've shared together, I can't help but smile. 😊❤️ From our late-night calls 🌙📱 to our spontaneous adventures 😂✨, you've brought so much joy, laughter, and happiness into my life.

You've been there for me through the good times and the difficult ones — my shoulder to lean on 🤗, someone I can laugh with until my stomach hurts 😂, and one of the people who always knows how to make a difficult day feel a little brighter. 🌸💕

On your special day 🎂🎉, I want you to know just how grateful I am to have you in my life. ❤️ You have such a beautiful heart — you're kind, funny, caring, thoughtful, and truly one of a kind. 🥰✨ Never forget how special you are and how much you mean to the people who love you. 💖

Today is your day, so I hope you smile a little bigger 😊, laugh a little louder 😂, and make some beautiful memories that you'll carry with you forever. 🎉💐✨

Happy Birthday to my favorite person! 🎂👑❤️ Here's to another beautiful year filled with happiness, laughter, unforgettable adventures, good health, success, and countless reasons to smile. 🥂✨

May all the beautiful things you deserve find their way to you. 💕 May your dreams continue to grow, and may every new chapter of your life be even more amazing than the last. 🌹✨

And remember... no matter how old you get, you'll always be my Deedah. 😂❤️

With all my love ❤️,

As You Say...

Uncle Abi 😂❤️`;


    /* =====================================================
       TYPEWRITER
       ===================================================== */

    if (
        typeof Typed !== "undefined" &&
        document.getElementById("typed-text")
    ) {

        new Typed("#typed-text", {

            strings: [
                letterContent
            ],

            typeSpeed: 25,

            startDelay: 500,

            showCursor: true,

            cursorChar: "|",

            contentType: "text",

            onComplete: () => {

                setTimeout(() => {

                    surpriseButton.classList.add(
                        "ready"
                    );

                }, 500);

            }

        });

    } else {

        const textElement =
            document.getElementById("typed-text");

        if (textElement) {
            textElement.textContent =
                letterContent;
        }

    }


    /* =====================================================
       FLOATING DECORATIONS
       ===================================================== */

    const floatingElements = [

        {
            emoji: "💖",
            size: "25px"
        },

        {
            emoji: "💕",
            size: "30px"
        },

        {
            emoji: "✨",
            size: "24px"
        },

        {
            emoji: "🌸",
            size: "25px"
        },

        {
            emoji: "🧸",
            size: "28px"
        },

        {
            emoji: "💗",
            size: "22px"
        },

        {
            emoji: "✨",
            size: "20px"
        },

        {
            emoji: "🌷",
            size: "26px"
        }

    ];


    floatingElements.forEach(
        (element, index) => {

            createFloatingElement(
                element,
                index
            );

        }
    );


    function createFloatingElement(
        element,
        index
    ) {

        const floating =
            document.createElement("div");

        floating.className =
            "floating-element";

        floating.textContent =
            element.emoji;

        floating.style.fontSize =
            element.size;

        const maxX =
            Math.max(
                10,
                window.innerWidth - 50
            );

        const maxY =
            Math.max(
                10,
                window.innerHeight - 50
            );

        floating.style.left =
            `${Math.random() * maxX}px`;

        floating.style.top =
            `${Math.random() * maxY}px`;

        floating.style.animationDuration =
            `${5 + Math.random() * 7}s`;

        floating.style.animationDelay =
            `${Math.random() * 4}s`;

        document.body.appendChild(
            floating
        );

    }


    /* =====================================================
       SURPRISE MODAL
       ===================================================== */

    surpriseButton.addEventListener(
        "click",
        () => {

            if (clickSound) {

                clickSound.currentTime = 0;

                clickSound.play()
                    .catch(() => {});

            }

            modalOverlay.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";


            /* Confetti */

            if (
                typeof confetti ===
                "function"
            ) {

                confetti({

                    particleCount: 120,

                    spread: 75,

                    startVelocity: 35,

                    origin: {
                        y: .65
                    }

                });

            }

        }
    );


    /* =====================================================
       DUA AUDIO
       ===================================================== */

    let currentlyPlaying =
        null;


    duaItems.forEach(
        (duaItem) => {

            const button =
                duaItem.querySelector(
                    ".dua-play-button"
                );

            const icon =
                button.querySelector("i");


            button.addEventListener(
                "click",
                async (event) => {

                    event.stopPropagation();


                    const audioFile =
                        duaItem.dataset.audio;


                    if (!audioFile) {

                        console.error(
                            "No audio file specified."
                        );

                        return;

                    }


                    /* ---------------------------------
                       SAME AUDIO = PAUSE
                       --------------------------------- */

                    if (
                        currentlyPlaying ===
                        duaItem &&
                        !duaAudio.paused
                    ) {

                        duaAudio.pause();

                        setDuaButton(
                            duaItem,
                            false
                        );

                        duaStatus.textContent =
                            "⏸️ Recitation paused";

                        return;

                    }


                    /* ---------------------------------
                       STOP EVERYTHING ELSE
                       --------------------------------- */

                    stopAllDuas();


                    /* ---------------------------------
                       LOAD AUDIO
                       --------------------------------- */

                    currentlyPlaying =
                        duaItem;

                    duaAudio.src =
                        audioFile;

                    duaAudio.load();


                    try {

                        await duaAudio.play();


                        setDuaButton(
                            duaItem,
                            true
                        );


                        const title =
                            duaItem
                                .querySelector("h3")
                                ?.textContent
                                ?.trim()
                                || "Dua";


                        duaStatus.textContent =
                            `🎙️ Playing: ${title}`;


                    } catch (error) {

                        console.error(
                            "Dua audio could not play:",
                            error
                        );


                        setDuaButton(
                            duaItem,
                            false
                        );


                        currentlyPlaying =
                            null;


                        duaStatus.textContent =
                            "⚠️ Unable to play this recording. Check the audio file path.";

                    }

                }
            );

        }
    );


    /* =====================================================
       DUA AUDIO ENDED
       ===================================================== */

    duaAudio.addEventListener(
        "ended",
        () => {

            if (currentlyPlaying) {

                setDuaButton(
                    currentlyPlaying,
                    false
                );

            }

            currentlyPlaying =
                null;

            duaStatus.textContent =
                "✨ Recitation finished. Choose another dua. 🤲";

        }
    );


    /* =====================================================
       DUA AUDIO ERROR
       ===================================================== */

    duaAudio.addEventListener(
        "error",
        () => {

            console.error(
                "Dua audio error:",
                duaAudio.error
            );


            if (currentlyPlaying) {

                setDuaButton(
                    currentlyPlaying,
                    false
                );

            }

            currentlyPlaying =
                null;

            duaStatus.textContent =
                "⚠️ This recording could not be loaded.";

        }
    );


    /* =====================================================
       STOP ALL DUA AUDIO
       ===================================================== */

    function stopAllDuas() {

        if (duaAudio) {

            duaAudio.pause();

            duaAudio.currentTime = 0;

        }


        duaItems.forEach(
            (item) => {

                setDuaButton(
                    item,
                    false
                );

            }
        );

        currentlyPlaying =
            null;

    }


    /* =====================================================
       CHANGE PLAY BUTTON
       ===================================================== */

    function setDuaButton(
        duaItem,
        playing
    ) {

        if (!duaItem) return;


        const icon =
            duaItem.querySelector(
                ".dua-play-button i"
            );


        if (!icon) return;


        if (playing) {

            duaItem.classList.add(
                "playing"
            );

            icon.classList.remove(
                "fa-play"
            );

            icon.classList.add(
                "fa-pause"
            );

        } else {

            duaItem.classList.remove(
                "playing"
            );

            icon.classList.remove(
                "fa-pause"
            );

            icon.classList.add(
                "fa-play"
            );

        }

    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        stopAllDuas();

        modalOverlay.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

        duaStatus.textContent =
            "🤲 Choose a dua to listen to its recitation ❤️";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    duaCloseButton.addEventListener(
        "click",
        closeModal
    );


    /* =====================================================
       CLICK OUTSIDE MODAL
       ===================================================== */

    modalOverlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                modalOverlay
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       ESC KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modalOverlay.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       BACKGROUND MUSIC
       ===================================================== */

    let isMusicPlaying =
        false;


    if (musicToggle && backgroundMusic) {

        musicToggle.addEventListener(
            "click",
            async () => {

                if (isMusicPlaying) {

                    backgroundMusic.pause();

                    isMusicPlaying =
                        false;

                    musicIcon.classList.remove(
                        "fa-volume-up"
                    );

                    musicIcon.classList.add(
                        "fa-volume-mute"
                    );

                } else {

                    try {

                        await backgroundMusic.play();

                        isMusicPlaying =
                            true;

                        musicIcon.classList.remove(
                            "fa-volume-mute"
                        );

                        musicIcon.classList.add(
                            "fa-volume-up"
                        );

                    } catch (error) {

                        console.log(
                            "Background music could not play:",
                            error
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       CURSOR EFFECT
       ===================================================== */

    let cursorTimeout;


    document.addEventListener(
        "mousemove",
        (event) => {

            clearTimeout(
                cursorTimeout
            );


            const effect =
                document.createElement(
                    "div"
                );

            effect.className =
                "cursor-effect";

            effect.style.left =
                `${event.clientX}px`;

            effect.style.top =
                `${event.clientY}px`;

            document.body.appendChild(
                effect
            );


            requestAnimationFrame(
                () => {

                    effect.style.opacity =
                        "1";

                    effect.style.transform =
                        "translate(-50%, -50%) scale(1)";

                }
            );


            setTimeout(
                () => {

                    effect.style.opacity =
                        "0";

                    setTimeout(
                        () => {

                            effect.remove();

                        },
                        500
                    );

                },
                250
            );

        }
    );


    /* =====================================================
       CLEANUP WHEN LEAVING PAGE
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            stopAllDuas();

            if (backgroundMusic) {
                backgroundMusic.pause();
            }

        }
    );

});