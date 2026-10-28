const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const TEST_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917';

let initialized = false;
let bannerVisible = false;
let rewardedReady = false;
let rewardedBusy = false;

function isNativeAndroid() {
  return (
    window.Capacitor &&
    window.Capacitor.isNativePlatform() &&
    window.Capacitor.getPlatform() === 'android'
  );
}

export async function initializeAdMob() {
  if (!isNativeAndroid()) {
    return { available: false, reason: 'not-android' };
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    await AdMob.initialize({
      initializeForTesting: true
    });

    initialized = true;

    return { available: true };
  } catch (error) {
    console.error('Falha ao inicializar o AdMob:', error);
    return { available: false, reason: 'initialization-failed' };
  }
}

export async function showTestBanner() {
  if (!isNativeAndroid()) {
    return { success: false, reason: 'not-android' };
  }

  if (!initialized) {
    const result = await initializeAdMob();

    if (!result.available) {
      return { success: false, reason: result.reason };
    }
  }

  try {
    const { AdMob, BannerAdPosition, BannerAdSize } =
      await import('@capacitor-community/admob');

    await AdMob.showBanner({
      adId: TEST_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
    });

    bannerVisible = true;

    return { success: true };
  } catch (error) {
    console.error('Falha ao exibir banner de teste:', error);
    return { success: false, reason: 'banner-failed' };
  }
}

export async function hideTestBanner() {
  if (!isNativeAndroid() || !bannerVisible) {
    return;
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.hideBanner();
    bannerVisible = false;
  } catch (error) {
    console.error('Falha ao ocultar banner:', error);
  }
}

export async function prepareTestRewardedAd() {
  if (!isNativeAndroid() || rewardedBusy) {
    return { success: false, reason: 'unavailable' };
  }

  if (!initialized) {
    const result = await initializeAdMob();

    if (!result.available) {
      return { success: false, reason: result.reason };
    }
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    await AdMob.prepareRewardVideoAd({
      adId: TEST_REWARDED_ID,
      isTesting: true
    });

    rewardedReady = true;

    return { success: true };
  } catch (error) {
    rewardedReady = false;
    console.error('Falha ao preparar anúncio recompensado:', error);

    return { success: false, reason: 'rewarded-load-failed' };
  }
}

export async function showTestRewardedAd() {
  if (!isNativeAndroid() || !rewardedReady || rewardedBusy) {
    return { success: false, rewarded: false, reason: 'not-ready' };
  }

  rewardedBusy = true;
  rewardedReady = false;

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    const result = await AdMob.showRewardVideoAd();

    return {
      success: true,
      rewarded: true,
      reward: result
    };
  } catch (error) {
    console.error('Anúncio recompensado não concluído:', error);

    return {
      success: false,
      rewarded: false,
      reason: 'reward-not-confirmed'
    };
  } finally {
    rewardedBusy = false;
  }
}
