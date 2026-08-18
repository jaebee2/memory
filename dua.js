/* =========================================================
   DUA AUDIO PLAYER
   Independent from AudioManager.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const players = document.querySelectorAll(
        ".custom-audio-player"
    );

    if (!players.length) {
        console.warn("🤲 No Dua audio players found.");
        return;
    }

    console.log(
        `🤲 Dua system loaded: ${players.length} recordings`
    );


    /* =====================================================
       FORMAT TIME
    ===================================================== */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }


    /* =====================================================
       RESET PLAYER UI
    ===================================================== */

    function resetPlayerUI(container) {

        const playButton =
            container.querySelector(
                ".dua-play-button"
            );

        const progress =
            container.querySelector(
                ".dua-progress"
            );

        const currentTime =
            container.querySelector(
                ".dua-current-time"
            );

        container.classList.remove(
            "is-playing"
        );

        if (playButton) {

            playButton.textContent = "▶";

            playButton.setAttribute(
                "aria-label",
                "Play Dua"
            );
        }

        if (progress) {
            progress.value = 0;
        }

        if (currentTime) {
            currentTime.textContent = "0:00";
        }
    }


    /* =====================================================
       RESET PLAYER
    ===================================================== */

    function resetPlayer(container) {

        const audio =
            container.querySelector(
                ".dua-audio-element"
            );

        if (!audio) return;

        /*
         * Pause only if necessary.
         */

        if (!audio.paused) {
            audio.pause();
        }

        /*
         * Reset playback position.
         */

        try {
            audio.currentTime = 0;
        } catch (error) {
            console.warn(
                "⚠️ Could not reset audio position:",
                error
            );
        }

        resetPlayerUI(container);
    }


    /* =====================================================
       STOP OTHER PLAYERS
    ===================================================== */

    function stopOtherPlayers(
        currentContainer
    ) {

        players.forEach(
            (container) => {

                if (
                    container ===
                    currentContainer
                ) {
                    return;
                }

                const audio =
                    container.querySelector(
                        ".dua-audio-element"
                    );

                if (!audio) {
                    return;
                }

                /*
                 * Only touch audio that is
                 * actually playing.
                 */

                if (!audio.paused) {

                    audio.pause();

                    try {
                        audio.currentTime = 0;
                    } catch (error) {
                        // Ignore reset errors
                    }

                    resetPlayerUI(
                        container
                    );
                }

            }
        );
    }


    /* =====================================================
       INITIALIZE PLAYERS
    ===================================================== */

    players.forEach(
        (container, index) => {

            const duaNumber =
                index + 1;

            const audio =
                container.querySelector(
                    ".dua-audio-element"
                );

            const playButton =
                container.querySelector(
                    ".dua-play-button"
                );

            const stopButton =
                container.querySelector(
                    ".dua-stop-button"
                );

            const progress =
                container.querySelector(
                    ".dua-progress"
                );

            const currentTime =
                container.querySelector(
                    ".dua-current-time"
                );

            const duration =
                container.querySelector(
                    ".dua-duration"
                );


            /* =================================================
               CHECK PLAYER
            ================================================= */

            if (!audio || !playButton) {

                console.warn(
                    `⚠️ Dua ${duaNumber} player is incomplete.`
                );

                return;
            }


            /* =================================================
               PLAY / PAUSE BUTTON
            ================================================= */

            playButton.addEventListener(
                "click",
                async (event) => {

                    event.preventDefault();
                    event.stopPropagation();


                    /* -----------------------------------------
                       CURRENTLY PLAYING → PAUSE
                    ----------------------------------------- */

                    if (!audio.paused) {

                        audio.pause();

                        return;
                    }


                    /* -----------------------------------------
                       STOP OTHER DUAS
                    ----------------------------------------- */

                    stopOtherPlayers(
                        container
                    );


                    /* -----------------------------------------
                       CLEAR ERROR STATE
                    ----------------------------------------- */

                    container.classList.remove(
                        "audio-error"
                    );


                    /* -----------------------------------------
                       PLAY
                    ----------------------------------------- */

                    try {

                        const promise =
                            audio.play();


                        /*
                         * Modern browsers return a Promise.
                         */

                        if (
                            promise &&
                            typeof promise.then ===
                            "function"
                        ) {

                            await promise;

                        }


                        console.log(
                            `🔊 Dua ${duaNumber} playing`
                        );


                    } catch (error) {


                        /*
                         * IMPORTANT:
                         *
                         * AbortError happens when playback
                         * is interrupted. Don't mark the
                         * audio file as broken.
                         */

                        if (
                            error &&
                            error.name ===
                            "AbortError"
                        ) {

                            console.log(
                                `ℹ️ Dua ${duaNumber} playback interrupted.`
                            );

                            return;
                        }


                        if (
                            error &&
                            error.name ===
                            "NotAllowedError"
                        ) {

                            console.warn(
                                `⚠️ Browser blocked Dua ${duaNumber} playback.`
                            );

                            return;
                        }


                        console.error(
                            `❌ Unable to play Dua ${duaNumber}:`,
                            error
                        );


                        container.classList.add(
                            "audio-error"
                        );

                    }

                }
            );


            /* =================================================
               STOP BUTTON
            ================================================= */

            if (stopButton) {

                stopButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();
                        event.stopPropagation();

                        resetPlayer(
                            container
                        );

                    }
                );

            }


            /* =================================================
               PLAY EVENT
            ================================================= */

            audio.addEventListener(
                "play",
                () => {

                    container.classList.add(
                        "is-playing"
                    );

                    playButton.textContent =
                        "⏸";

                    playButton.setAttribute(
                        "aria-label",
                        "Pause Dua"
                    );

                }
            );


            /* =================================================
               PAUSE EVENT
            ================================================= */

            audio.addEventListener(
                "pause",
                () => {

                    container.classList.remove(
                        "is-playing"
                    );

                    playButton.textContent =
                        "▶";

                    playButton.setAttribute(
                        "aria-label",
                        "Play Dua"
                    );

                }
            );


            /* =================================================
               LOADED METADATA
            ================================================= */

            audio.addEventListener(
                "loadedmetadata",
                () => {

                    if (
                        duration &&
                        Number.isFinite(
                            audio.duration
                        )
                    ) {

                        duration.textContent =
                            formatTime(
                                audio.duration
                            );

                    }

                }
            );


            /* =================================================
               TIME UPDATE
            ================================================= */

            audio.addEventListener(
                "timeupdate",
                () => {

                    if (
                        !Number.isFinite(
                            audio.duration
                        ) ||
                        audio.duration <= 0
                    ) {
                        return;
                    }


                    const percentage =
                        (
                            audio.currentTime /
                            audio.duration
                        ) * 100;


                    if (progress) {

                        progress.value =
                            percentage;

                    }


                    if (currentTime) {

                        currentTime.textContent =
                            formatTime(
                                audio.currentTime
                            );

                    }

                }
            );


            /* =================================================
               PROGRESS BAR
            ================================================= */

            if (progress) {

                progress.addEventListener(
                    "input",
                    () => {

                        if (
                            !Number.isFinite(
                                audio.duration
                            ) ||
                            audio.duration <= 0
                        ) {
                            return;
                        }


                        const percentage =
                            Number(
                                progress.value
                            );


                        audio.currentTime =
                            (
                                percentage /
                                100
                            ) *
                            audio.duration;

                    }
                );

            }


            /* =================================================
               AUDIO FINISHED
            ================================================= */

            audio.addEventListener(
                "ended",
                () => {

                    resetPlayerUI(
                        container
                    );

                    try {
                        audio.currentTime = 0;
                    } catch (error) {
                        // Ignore
                    }

                    console.log(
                        `✅ Dua ${duaNumber} completed`
                    );

                }
            );


            /* =================================================
               AUDIO ERROR
            ================================================= */

            audio.addEventListener(
                "error",
                () => {

                    container.classList.add(
                        "audio-error"
                    );

                    console.error(
                        `❌ Dua ${duaNumber} could not be loaded.`
                    );

                    console.error(
                        "Audio source:",
                        audio.currentSrc ||
                        audio.src ||
                        container.dataset.audio
                    );

                }
            );

        }
    );


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (!document.hidden) {
                return;
            }


            players.forEach(
                (container) => {

                    const audio =
                        container.querySelector(
                            ".dua-audio-element"
                        );

                    if (
                        audio &&
                        !audio.paused
                    ) {

                        audio.pause();

                    }

                }
            );

        }
    );


    /* =====================================================
       PAGE CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            players.forEach(
                (container) => {

                    const audio =
                        container.querySelector(
                            ".dua-audio-element"
                        );

                    if (audio) {

                        audio.pause();

                    }

                }
            );

        }
    );


    console.log(
        "🤲 Dua audio player initialized."
    );

});