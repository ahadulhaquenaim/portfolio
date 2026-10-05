import { useEffect, useRef } from "react";

/** First-frame WebP for a /videos/*.mp4 clip (public/videos/posters/), shown
 *  while the clip buffers so the section never flashes an empty black box. */
export function posterFor(videoSrc: string) {
  return videoSrc.replace(/\/videos\/([^/]+)\.mp4$/, "/videos/posters/$1.webp");
}

/**
 * Pauses a looping background <video> whenever it scrolls out of view and
 * resumes it when it returns. Three autoplay-loop videos decoding at once
 * (hero, contact, sports) is a constant GPU/CPU drain even off-screen — this
 * keeps only the visible one running.
 *
 * Pass `lazyPoster` for below-the-fold clips: a `poster` attribute downloads
 * on mount even with preload="none", so on a cold first visit those images
 * compete with the hero for bandwidth. The poster is attached only once the
 * video gets within a screen or so of the viewport.
 */
export function useVideoInView<T extends HTMLVideoElement>(lazyPoster?: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() can reject if interrupted — swallow it.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.01 }
    );
    obs.observe(el);

    let posterObs: IntersectionObserver | undefined;
    if (lazyPoster) {
      posterObs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.poster = lazyPoster;
          posterObs?.disconnect();
        },
        { rootMargin: "100% 0px" }
      );
      posterObs.observe(el);
    }

    return () => {
      obs.disconnect();
      posterObs?.disconnect();
    };
    // lazyPoster tracks the clip, so a theme swap (which remounts the <video>
    // via `key`) re-attaches the observers to the new element.
  }, [lazyPoster]);

  return ref;
}

/**
 * Resolves once the video can show *something* — its poster image is decoded
 * or its first frame is buffered — or after `timeoutMs`, whichever comes first.
 * Lets the hero intro reveal real art instead of fading in an empty box on a
 * cold first visit.
 */
export function whenVideoPaintable(video: HTMLVideoElement | null, timeoutMs: number) {
  return new Promise<void>((resolve) => {
    if (!video || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resolve();
      return;
    }

    const timer = window.setTimeout(done, timeoutMs);
    video.addEventListener("loadeddata", done, { once: true });

    if (video.poster) {
      const img = new Image();
      img.src = video.poster;
      // decode() rejects on a broken image — fall back to the timer then.
      img.decode().then(done, () => {});
    }

    function done() {
      window.clearTimeout(timer);
      video?.removeEventListener("loadeddata", done);
      resolve();
    }
  });
}
