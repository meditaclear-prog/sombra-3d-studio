# SOMBRA 3D STUDIO — Base multiplataforma

Esta entrega organiza o mesmo front-end para três destinos:
1. **Site**: build web responsivo.
2. **PWA instalável**: usuários podem adicionar o site à tela inicial em navegadores compatíveis.
3. **Aplicativo Android/iOS**: configuração inicial para empacotar a interface com Capacitor.

## O que já existe nesta base
- Interface responsiva reaproveitada do protótipo aprovado.
- Manifesto PWA, service worker e ícones de aplicativo.
- Configuração inicial de Capacitor para projetos nativos Android e iOS.
- Código fonte organizado e scripts de build.

## Como executar o site
Requer Node.js instalado:
```bash
npm install
npm run web
```
Para gerar a versão estática:
```bash
npm run build
```
Os arquivos finais ficam em `dist/`.

## Preparar aplicativos nativos
Depois de instalar dependências:
```bash
npx cap add android
npx cap add ios
npm run build
npx cap sync
```
Para Android, abra o projeto no Android Studio com `npx cap open android`.
Para iOS, é necessário um Mac com Xcode para compilar/assinar o app; depois use `npx cap open ios`.

## Importante: estado honesto do projeto
Esta é uma base de interface multiplataforma e uma configuração inicial de empacotamento, não APK/IPA pronto nem versão de loja.
- Site e interface funcionam como protótipo.
- PWA pode ser instalada quando publicada em HTTPS e o navegador oferece suporte.
- Capacitor permite reutilizar a interface em Android e iOS, mas ainda exige gerar projetos nativos, testar em aparelhos, configurar permissões, assinatura e publicação.
- A importação/catálogo é de demonstração e ainda não persiste arquivos permanentemente.
- Download por URL direta tem limitações de navegador/CORS.
- Conversão, geração 3D por IA, otimização geométrica e visualização 3D ainda precisam de integração real.
- Antes de distribuir, precisamos escolher os motores e serviços e revisar licenças, privacidade e segurança.

## Próxima etapa recomendada
1. Confirmar se o layout e a navegação estão aprovados.
2. Escolher qual função real integrar primeiro: download de fontes autorizadas, conversão, geração imagem→3D, ou otimização.
3. Adicionar armazenamento persistente e testes no Android.
