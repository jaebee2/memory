/* =========================================================
   CAKE PAGE JAVASCRIPT

   Sequence:

   First interaction
        ↓
   Birthday voice
        ↓
   Voice ends
        ↓
   Candles go out
        ↓
   Fireworks video
        ↓
   Video + sound for 20 seconds
        ↓
   Video closes
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
           ===================================================== */

        const voice =
            document.getElementById(
                "birthdayVoice"
            );


        const flames =
            document.querySelectorAll(
                ".flame"
            );


        const status =
            document.getElementById(
                "voiceStatus"
            );


        const videoContainer =
            document.getElementById(
                "fireworksVideoContainer"
            );


        const fireworksVideo =
            document.getElementById(
                "fireworksVideo"
            );


        const fireworksClose =
            document.getElementById(
                "fireworksClose"
            );


        /* =====================================================
           STATE
           ===================================================== */

        let voiceStarted = false;

        let fireworksStarted = false;

        let fireworksTimer = null;


        /* =====================================================
           CHECK ELEMENTS
           ===================================================== */

        if (!voice) {

            console.error(
                "Birthday voice element was not found."
            );

            return;
        }


        if (!fireworksVideo) {

            console.error(
                "Fireworks video element was not found."
            );

        }


        /* =====================================================
           STATUS HELPER
           ===================================================== */

        function updateStatus(message) {

            if (!status) {
                return;
            }

            status.textContent = message;
        }


        /* =====================================================
           START BIRTHDAY VOICE
           ===================================================== */

        function startBirthdayVoice() {


            if (voiceStarted) {
                return;
            }


            voiceStarted = true;


            updateStatus(
                "🎙️ Playing your birthday message..."
            );


            /*
             * Always start the recording
             * from the beginning.
             */

            try {

                voice.currentTime = 0;

            } catch (error) {

                console.warn(
                    "Could not reset voice:",
                    error
                );

            }


            const playPromise =
                voice.play();


            if (
                playPromise &&
                typeof playPromise.then === "function"
            ) {

                playPromise

                    .then(() => {

                        console.log(
                            "🎙️ Birthday voice started."
                        );

                    })

                    .catch((error) => {

                        console.error(
                            "Birthday voice could not play:",
                            error
                        );


                        /*
                         * Reset state so the user
                         * can try again.
                         */

                        voiceStarted = false;


                        updateStatus(
                            "🎙️ Tap the screen to play your birthday message ❤️"
                        );

                    });

            }

        }


        /* =====================================================
           EXTINGUISH CANDLES
           ===================================================== */

        function extinguishCandles() {


            console.log(
                "🎙️ Voice finished."
            );


            updateStatus(
                "🕯️ Making a wish for my Deedah... ❤️"
            );


            /*
             * Extinguish each flame with a small delay
             * to make the effect look natural.
             */

            flames.forEach(
                (flame, index) => {

                    setTimeout(
                        () => {

                            flame.classList.add(
                                "is-out"
                            );

                        },
                        index * 120
                    );

                }
            );


            /*
             * Wait for the candle
             * animation to finish.
             */

            setTimeout(
                () => {

                    playFireworks();

                },
                1200
            );

        }


        /* =====================================================
           CHECK VIDEO SOURCE
           ===================================================== */

        function getPlayableVideoSource() {


            if (!fireworksVideo) {
                return null;
            }


            const sources =
                fireworksVideo.querySelectorAll(
                    "source"
                );


            /*
             * The browser will decide which
             * source it supports when load()
             * and play() are called.
             */

            for (
                const source of sources
            ) {

                console.log(
                    "🎥 Video source available:",
                    source.src
                );

            }


            return sources.length > 0
                ? sources[0]
                : null;

        }


        /* =====================================================
           PLAY FIREWORKS
           ===================================================== */

        function playFireworks() {


            if (
                fireworksStarted ||
                !fireworksVideo ||
                !videoContainer
            ) {

                return;

            }


            fireworksStarted = true;


            console.log(
                "🎆 Starting fireworks..."
            );


            updateStatus(
                "🎆 Happy Birthday, My Deedah! ❤️"
            );


            /*
             * Show video.
             */

            videoContainer.classList.add(
                "show"
            );


            videoContainer.setAttribute(
                "aria-hidden",
                "false"
            );


            /*
             * Make sure the video
             * is NOT muted.
             *
             * Your fireworks video
             * should play its own sound.
             */

            fireworksVideo.muted = false;

            fireworksVideo.defaultMuted = false;

            fireworksVideo.volume = 1;


            /*
             * Remove controls.
             */

            fireworksVideo.controls = false;


            /*
             * Start from beginning.
             */

            try {

                fireworksVideo.currentTime = 0;

            } catch (error) {

                console.warn(
                    "Could not reset fireworks video:",
                    error
                );

            }


            /*
             * Reload video source list.
             */

            fireworksVideo.load();


            /*
             * Wait briefly for the browser
             * to select a supported source.
             */

            setTimeout(
                () => {

                    startFireworksPlayback();

                },
                100
            );

        }


        /* =====================================================
           ACTUALLY START VIDEO
           ===================================================== */

        function startFireworksPlayback() {


            if (!fireworksVideo) {
                return;
            }


            const playPromise =
                fireworksVideo.play();


            if (
                playPromise &&
                typeof playPromise.then === "function"
            ) {

                playPromise

                    .then(() => {

                        console.log(
                            "🎆 Fireworks video is playing."
                        );


                        updateStatus(
                            "🎆 Happy Birthday, My Deedah! ❤️✨"
                        );


                        /*
                         * Stop after 20 seconds.
                         */

                        clearTimeout(
                            fireworksTimer
                        );


                        fireworksTimer =
                            setTimeout(
                                () => {

                                    stopFireworks();

                                },
                                20000
                            );

                    })


                    .catch(
                        (error) => {

                            console.error(
                                "Fireworks video could not play:",
                                error
                            );


                            updateStatus(
                                "🎆 Tap the screen to start the fireworks ❤️"
                            );


                            /*
                             * Some browsers can reject
                             * video playback with sound.
                             *
                             * Since the birthday voice
                             * was already started by a
                             * user interaction, give the
                             * visitor another interaction
                             * opportunity.
                             */

                            enableManualVideoStart();

                        }
                    );

            }

        }


        /* =====================================================
           MANUAL VIDEO START
           ===================================================== */

        function enableManualVideoStart() {


            const manualStart =
                () => {


                    if (!fireworksVideo) {
                        return;
                    }


                    fireworksVideo.muted = false;

                    fireworksVideo.defaultMuted = false;

                    fireworksVideo.volume = 1;


                    fireworksVideo.play()

                        .then(() => {

                            console.log(
                                "🎆 Fireworks started manually."
                            );


                            updateStatus(
                                "🎆 Happy Birthday, My Deedah! ❤️✨"
                            );


                            clearTimeout(
                                fireworksTimer
                            );


                            fireworksTimer =
                                setTimeout(
                                    () => {

                                        stopFireworks();

                                    },
                                    20000
                                );


                        })

                        .catch(
                            (error) => {

                                console.error(
                                    "Manual video playback failed:",
                                    error
                                );

                            }

                        );

                };


            document.addEventListener(
                "click",
                manualStart,
                {
                    once: true
                }
            );


            document.addEventListener(
                "touchstart",
                manualStart,
                {
                    once: true
                }
            );

        }


        /* =====================================================
           STOP FIREWORKS
           ===================================================== */

        function stopFireworks() {


            console.log(
                "🎆 Fireworks finished."
            );


            clearTimeout(
                fireworksTimer
            );


            if (fireworksVideo) {

                fireworksVideo.pause();


                try {

                    fireworksVideo.currentTime = 0;

                } catch (error) {

                    console.warn(
                        "Could not reset video:",
                        error
                    );

                }

            }


            if (videoContainer) {

                videoContainer.classList.remove(
                    "show"
                );


                videoContainer.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            fireworksStarted = false;


            updateStatus(
                "❤️ I hope you enjoyed your surprise, my Deedah."
            );

        }


        /* =====================================================
           VIDEO ENDED EVENT
           ===================================================== */

        if (fireworksVideo) {

            fireworksVideo.addEventListener(
                "ended",
                () => {

                    console.log(
                        "🎆 Fireworks video reached its end."
                    );


                    stopFireworks();

                }
            );


            /*
             * If the browser cannot decode a source,
             * report it clearly.
             */

            fireworksVideo.addEventListener(
                "error",
                (event) => {

                    console.error(
                        "🎥 Fireworks video error:",
                        event
                    );

                }
            );

        }


        /* =====================================================
           CLOSE FIREWORKS BUTTON
           ===================================================== */

        if (fireworksClose) {

            fireworksClose.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    stopFireworks();

                }
            );

        }


        /* =====================================================
           VOICE FINISHED
           ===================================================== */

        voice.addEventListener(
            "ended",
            () => {

                extinguishCandles();

            }
        );


        /* =====================================================
           VOICE ERROR
           ===================================================== */

        voice.addEventListener(
            "error",
            (event) => {

                console.error(
                    "🎙️ Birthday voice error:",
                    event
                );


                updateStatus(
                    "🎙️ There was a problem playing the birthday message."
                );


                voiceStarted = false;

            }
        );


        /* =====================================================
           FIRST CLICK
           ===================================================== */

        document.addEventListener(
            "click",
            startBirthdayVoice,
            {
                once: true
            }
        );


        /* =====================================================
           FIRST TOUCH
           ===================================================== */

        document.addEventListener(
            "touchstart",
            startBirthdayVoice,
            {
                once: true,
                passive: true
            }
        );


        /* =====================================================
           KEYBOARD
           ===================================================== */

        document.addEventListener(
            "keydown",
            startBirthdayVoice,
            {
                once: true
            }
        );


        /* =====================================================
           INITIAL VIDEO SOURCE CHECK
           ===================================================== */

        getPlayableVideoSource();


        console.log(
            "🎂 Cake page initialized successfully."
        );

    }
);