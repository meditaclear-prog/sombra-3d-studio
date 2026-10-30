import {
  initializeAdMob,
  showTestBanner,
  hideTestBanner,
  prepareTestRewardedAd,
  showTestRewardedAd
} from './admob.js';

function isAndroidApp() {
  return Boolean(
    window.Capacitor &&
    typeof window.Capacitor.isNativePlatform === 'function' &&
    window.Capacitor.isNativePlatform() &&
    window.Capacitor.getPlatform() === 'android'
  );
}

function showStatus(message) {
  const el = document.getElementById('admobTestStatus');
  if (el) el.textContent = message;
}

function createTestPanel() {
  const rightStack = document.querySelector('.right-stack');

  if (!rightStack || document.getElementById('admobTestCard')) return;

  const card = document.createElement('div');
  card.className = 'card';
  card.id = 'admobTestCard';
  card.style.marginTop = '16px';

  card.innerHTML = `
    <div class="section-head">
      <div>
        <h2>Publicidade do SOMBRA</h2>
        <p>Publicidade do SOMBRA 3D STUDIO para Android.</p>
      </div>
      <span class="stat-icon">▣</span>
    </div>

    <p id="admobTestStatus" role="status"
       style="font-size:13px;color:var(--muted);margin:12px 0">
      Preparando integração...
    </p>

    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="secondary" id="admobBannerBtn">
        Mostrar banner
      </button>
      <button class="secondary" id="admobHideBannerBtn">
        Ocultar banner
      </button>
      <button class="secondary" id="admobPrepareRewardBtn">
        Carregar anúncio recompensado
      </button>
      <button class="primary" id="admobShowRewardBtn">
        Assistir anúncio recompensado
      </button>
    </div>

    <p style="font-size:11px;color:var(--muted);margin-top:12px">
      Anúncios de teste: não geram receita nem concedem créditos.
    </p>
  `;

  rightStack.appendChild(card);

  document.getElementById('admobBannerBtn').onclick = async () => {
    showStatus('Solicitando banner de teste...');
    const result = await showTestBanner();
    showStatus(result.success
      ? 'Banner solicitado. Aguarde o carregamento.'
      : 'Não foi possível exibir o banner. Confira o log do Android.');
  };

  document.getElementById('admobHideBannerBtn').onclick = async () => {
    await hideTestBanner();
    showStatus('Solicitação para ocultar o banner enviada.');
  };

  document.getElementById('admobPrepareRewardBtn').onclick = async () => {
    showStatus('Carregando vídeo recompensado de teste...');
    const result = await prepareTestRewardedAd();
    showStatus(result.success
      ? 'Vídeo carregado. Toque em Assistir anúncio recompensado.'
      : 'Vídeo indisponível. Tente novamente mais tarde.');
  };

  document.getElementById('admobShowRewardBtn').onclick = async () => {
    showStatus('Abrindo vídeo de teste...');
    const result = await showTestRewardedAd();

    if (result.success && result.rewarded) {
      showStatus('Vídeo concluído. Nenhum crédito foi adicionado.');
    } else {
      showStatus('Vídeo não concluído ou não estava pronto. Carregue-o novamente.');
    }
  };
}

async function startAdMobTest() {
  if (!isAndroidApp()) {
    console.info('AdMob: os anúncios de teste funcionam no APK Android.');
    return;
  }

  createTestPanel();
  showStatus('Inicializando o SDK de anúncios...');

  const result = await initializeAdMob();

  showStatus(result.available
    ? 'SDK inicializado. Você já pode testar os anúncios.'
    : 'Não foi possível inicializar o SDK. Confira os logs do Android.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAdMobTest, { once: true });
} else {
  startAdMobTest();
}
