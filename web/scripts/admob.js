const BANNER_ID = 'ca-app-pub-8969153075102144/7465628216';
const REWARDED_ID = 'ca-app-pub-8969153075102144/9580655667';

let initialized = false;
let bannerVisible = false;
let rewardedReady = false;
let rewardedBusy = false;

function isNativeAndroid() {
  return Boolean(
    window.Capacitor &&
    window.Capacitor.isNativePlatform() &&
    window.Capacitor.getPlatform() === 'android'
  );
}

export async function initializeAdMob() {
  if (!isNativeAndroid()) {
    return { available: false, reason: 'not-android' };
  }

  if (initialized) {
    return { available: true };
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    // Produção: não ativar initializeForTesting.
    await AdMob.initialize();

    initialized = true;
    return { available: true };
  } catch (error) {
    console.error('Falha ao inicializar AdMob:', error);
    return { available: false, reason: 'initialization-failed' };
  }
}

export async function showTestBanner() {
  if (!isNativeAndroid()) {
    return { success: false, reason: 'not-android' };
  }

  const init = await initializeAdMob();
  if (!init.available) {
    return { success: false, reason: init.reason };
  }

  try {
    const { AdMob, BannerAdPosition, BannerAdSize } =
      await import('@capacitor-community/admob');

    await AdMob.showBanner({
      adId: BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    });

    bannerVisible = true;
    return { success: true };
  } catch (error) {
    console.error('Falha ao exibir banner:', error);
    return { success: false, reason: 'banner-failed' };
  }
}

export async function hideTestBanner() {
  if (!isNativeAndroid() || !bannerVisible) return;

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

  const init = await initializeAdMob();
  if (!init.available) {
    return { success: false, reason: init.reason };
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    await AdMob.prepareRewardVideoAd({
      adId: REWARDED_ID
    });

    rewardedReady = true;
    return { success: true };
  } catch (error) {
    rewardedReady = false;
    console.error('Falha ao carregar anúncio premiado:', error);
    return { success: false, reason: 'rewarded-load-failed' };
  }
}

export async function showTestRewardedAd() {
  if (!isNativeAndroid() || !rewardedReady || rewardedBusy) {
    return {
      success: false,
      rewarded: false,
      reason: 'not-ready'
    };
  }

  rewardedBusy = true;
  rewardedReady = false;

  try {
    const { AdMob } = await import('@capacitor-community/admob');

    // A promessa só é considerada concluída quando o plugin
    // retorna o item de recompensa conquistado.
    const reward = await AdMob.showRewardVideoAd();

    if (!reward || !Number.isFinite(reward.amount) || reward.amount <= 0) {
      return {
        success: false,
        rewarded: false,
        reason: 'reward-not-confirmed'
      };
    }

    return {
      success: true,
      rewarded: true,
      reward
    };
  } catch (error) {
    console.error('Anúncio premiado não concluído:', error);

    return {
      success: false,
      rewarded: false,
      reason: 'reward-not-confirmed'
    };
  } finally {
    rewardedBusy = false;
  }
}
