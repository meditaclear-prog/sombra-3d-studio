# SOMBRA 3D STUDIO — gerar APK Android pela nuvem

Este pacote **ainda não contém um APK instalável**. Ele prepara o projeto para que o GitHub Actions tente compilar um APK de teste (debug) sem precisar instalar Android Studio no celular.

## Passos (precisa de uma conta GitHub)
1. Extraia o ZIP no aparelho/computador.
2. Entre em https://github.com e crie um repositório novo chamado `sombra-3d-studio`. Para facilitar, deixe-o privado.
3. Envie para esse repositório **todo o conteúdo da pasta `sombra-source`**, incluindo a pasta oculta `.github`. No site do GitHub pelo celular, pode ser mais simples usar um computador ou o modo “site para computador”; a pasta `.github` precisa ser enviada para o repositório.
4. No repositório, abra **Actions** e habilite workflows se o GitHub pedir.
5. Selecione **Build SOMBRA Android APK** > **Run workflow** > **Run workflow**.
6. Aguarde terminar. Se ficar verde, abra a execução e baixe o artefato `SOMBRA-3D-STUDIO-debug-apk`. O GitHub entrega esse artefato como ZIP; dentro dele estará `app-debug.apk`.
7. Extraia o ZIP do artefato e envie `app-debug.apk` ao teu irmão. No Android dele, ele pode precisar permitir instalação dessa fonte. Só instalar se reconhecer que o arquivo veio do teu repositório/execução.

## Se falhar
Abra a execução em Actions e copie a primeira mensagem de erro vermelha para eu ajudar a corrigir. Não compartilhe tokens, senhas ou chaves.

## Limites importantes
- Não testei a compilação na infraestrutura do GitHub; este workflow é uma preparação para tentar gerar o APK. Pode ser necessário corrigir erros de dependências/compilação.
- APK debug serve para testes, não é a versão final de publicação.
- O app ainda é um protótipo: interface e navegação estão presentes, mas conversão/otimização real de modelos 3D, geração por IA e armazenamento persistente ainda precisam ser implementados.
- Para iOS, a compilação nativa exige macOS/Xcode e assinatura Apple; faremos essa etapa depois do teste Android.
