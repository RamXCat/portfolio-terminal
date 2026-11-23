// Cross-browser mobile landscape orientation and fullscreen utility

export async function requestLandscape(): Promise<void> {
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isMobile) return;

  // 1. Enter Fullscreen (Mandatory for screen.orientation.lock in modern mobile browsers)
  try {
    const docEl = document.documentElement as any;
    if (docEl.requestFullscreen) {
      await docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) {
      await docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      await docEl.msRequestFullscreen();
    }
  } catch (err) {
    // Fullscreen may require explicit user gesture or be unsupported
  }

  // 2. Lock Orientation to Landscape
  try {
    const orientation = screen.orientation as any;
    if (orientation && orientation.lock) {
      await orientation.lock('landscape');
    } else if ((screen as any).lockOrientation) {
      (screen as any).lockOrientation('landscape');
    } else if ((screen as any).webkitLockOrientation) {
      (screen as any).webkitLockOrientation('landscape');
    } else if ((screen as any).mozLockOrientation) {
      (screen as any).mozLockOrientation('landscape');
    }
  } catch (err) {
    // Orientation lock not supported or blocked (e.g., iOS Safari)
  }
}

export async function exitLandscape(): Promise<void> {
  // 1. Unlock Orientation
  try {
    const orientation = screen.orientation as any;
    if (orientation && orientation.unlock) {
      orientation.unlock();
    } else if ((screen as any).unlockOrientation) {
      (screen as any).unlockOrientation();
    } else if ((screen as any).webkitUnlockOrientation) {
      (screen as any).webkitUnlockOrientation();
    }
  } catch (err) {
    // Ignore unlock errors
  }

  // 2. Exit Fullscreen
  try {
    const doc = document as any;
    if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement) {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    }
  } catch (err) {
    // Ignore fullscreen exit errors
  }
}
