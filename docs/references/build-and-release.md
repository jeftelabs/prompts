# Referência: build e publicação

## Formato e exports

`package.json` declara pacote `type: module`. O tsdown gera bundle ESM para `build/`, com entradas `index.ts` e `src/types.ts`; o TypeScript em seguida emite declarações. Os exports publicados são `.` (`build/index.js`) e `./types` (`build/src/types.js`). O campo `files` publica build e exclui binários de teste, exemplos e testes.

## Comandos

`npm run build` passa por `precompile` (lint e limpeza de `build/`) e `compile` (tsdown + declarações). `prepublishOnly` constrói novamente antes da publicação.

## Workflows

- `checks.yml`: dispara em push para `main` e valida commitlint do último commit; embora tenha um passo condicional para PR, o workflow não declara evento `pull_request` no estado atual.
- `release-please.yml`: executa em push para `main`, gera PR/tag de release e empacota artefato quando uma release é criada.
- `deploy.yml`: em release publicada, instala, compila e publica em GitHub Packages e npm.
- `labels.yml`: sincroniza labels sob acionamento manual.
- `stale.yml`: agenda o fechamento de issues/PRs inativos.

A configuração e os nomes exatos devem ser conferidos nos workflows antes de assumir comportamento de CI ou release após alterações.
