/* =========================================================
   DUA AUDIO PLAYER
   Completely independent from AudioManager.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const players = document.querySelectorAll(
    ".custom-audio-player"
  );

  if (!players.length) {
    console.warn("🤲 No Dua audio players found.");
    return;
  }

  console.log(`🤲 Dua system loaded: ${players.length} recordings`);


  /* =======================================================
     FORMAT TIME
  ======================================================= */

  function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(
      seconds % 60
    );

    return `${minutes}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }


  /* =======================================================
     RESET PLAYER
  ======================================================= */

  function resetPlayer(container) {

    const audio = container.querySelector(
      ".dua-audio-element"
    );

    const playButton = container.querySelector(
      ".dua-play-button"
    );

    const progress = container.querySelector(
      ".dua-progress"
    );

    const currentTime = container.querySelector(
      ".dua-current-time"
    );

    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

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

    container.classList.remove("is-playing");
  }


  /* =======================================================
     STOP ALL OTHER DUAS
  ======================================================= */

  function stopOtherPlayers(currentContainer) {

    players.forEach((container) => {

      if (container === currentContainer) {
        return;
      }

      const audio = container.querySelector(
        ".dua-audio-element"
      );

      if (!audio) return;

      if (!audio.paused) {
        resetPlayer(container);
      }

    });

  }


  /* =======================================================
     INITIALIZE EACH PLAYER
  ======================================================= */

  players.forEach((container, index) => {

    const audio = container.querySelector(
      ".dua-audio-element"
    );

    const playButton = container.querySelector(
      ".dua-play-button"
    );

    const stopButton = container.querySelector(
      ".dua-stop-button"
    );

    const progress = container.querySelector(
      ".dua-progress"
    );

    const currentTime = container.querySelector(
      ".dua-current-time"
    );

    const duration = container.querySelector(
      ".dua-duration"
    );


    if (!audio || !playButton) {
      console.warn(
        `⚠️ Dua ${index + 1} player is incomplete.`
      );

      return;
    }


    /* =====================================================
       PLAY / PAUSE
    ===================================================== */

    playButton.addEventListener(
      "click",
      async (event) => {

        event.preventDefault();

        stopOtherPlayers(container);


        /* -----------------------------------------------
           PAUSE
        ------------------------------------------------ */

        if (!audio.paused) {

          audio.pause();

          return;
        }


        /* -----------------------------------------------
           PLAY
        ------------------------------------------------ */

        try {

          await audio.play();

        } catch (error) {

          console.error(
            `❌ Unable to play Dua ${index + 1}:`,
            error
          );

          /*
           * This should normally only happen when the
           * browser blocks playback or the file cannot
           * be loaded.
           */

          container.classList.add(
            "audio-error"
          );

        }

      }
    );


    /* =====================================================
       STOP
    ===================================================== */

    if (stopButton) {

      stopButton.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          resetPlayer(container);

        }
      );

    }


    /* =====================================================
       AUDIO STARTED
    ===================================================== */

    audio.addEventListener(
      "play",
      () => {

        container.classList.add(
          "is-playing"
        );

        playButton.textContent = "⏸";

        playButton.setAttribute(
          "aria-label",
          "Pause Dua"
        );

      }
    );


    /* =====================================================
       AUDIO PAUSED
    ===================================================== */

    audio.addEventListener(
      "pause",
      () => {

        container.classList.remove(
          "is-playing"
        );

        playButton.textContent = "▶";

        playButton.setAttribute(
          "aria-label",
          "Play Dua"
        );

      }
    );


    /* =====================================================
       AUDIO LOADED
    ===================================================== */

    audio.addEventListener(
      "loadedmetadata",
      () => {

        if (duration) {

          duration.textContent =
            formatTime(audio.duration);

        }

      }
    );


    /* =====================================================
       AUDIO TIME UPDATE
    ===================================================== */

    audio.addEventListener(
      "timeupdate",
      () => {

        if (!audio.duration) {
          return;
        }


        const percentage =
          (audio.currentTime /
            audio.duration) *
          100;


        if (progress) {

          progress.value = percentage;

        }


        if (currentTime) {

          currentTime.textContent =
            formatTime(
              audio.currentTime
            );

        }

      }
    );


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    if (progress) {

      progress.addEventListener(
        "input",
        () => {

          if (!audio.duration) {
            return;
          }


          const percentage =
            Number(progress.value);


          audio.currentTime =
            (percentage / 100) *
            audio.duration;

        }
      );

    }


    /* =====================================================
       AUDIO FINISHED
    ===================================================== */

    audio.addEventListener(
      "ended",
      () => {

        container.classList.remove(
          "is-playing"
        );

        playButton.textContent = "▶";

        playButton.setAttribute(
          "aria-label",
          "Play Dua"
        );

        if (progress) {
          progress.value = 0;
        }

        if (currentTime) {
          currentTime.textContent = "0:00";
        }

        audio.currentTime = 0;

        console.log(
          `✅ Dua ${index + 1} completed`
        );

      }
    );


    /* =====================================================
       AUDIO ERROR
    ===================================================== */

    audio.addEventListener(
      "error",
      () => {

        container.classList.add(
          "audio-error"
        );

        console.error(
          `❌ Dua ${index + 1} could not be loaded.`
        );

        console.error(
          "Expected file:",
          container.dataset.audio
        );

      }
    );

  });


  /* =======================================================
     PAGE VISIBILITY
     
     Pause audio when the user leaves the page/tab.
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (!document.hidden) {
        return;
      }

      players.forEach((container) => {

        const audio = container.querySelector(
          ".dua-audio-element"
        );

        if (audio && !audio.paused) {
          audio.pause();
        }

      });

    }
  );


  /* =======================================================
     CLEANUP
  ======================================================= */

  window.addEventListener(
    "pagehide",
    () => {

      players.forEach((container) => {

        const audio = container.querySelector(
          ".dua-audio-element"
        );

        if (audio) {
          audio.pause();
        }

      });

    }
  );

});