# Referência: testes e TypeScript

## Scripts

Os comandos abaixo vêm de `package.json`:

- `npm run lint` executa ESLint.
- `npm test` executa lint via `pretest` e depois `c8 npm run quick:test`.
- `npm run quick:test` carrega `bin/test.ts` pelo loader `@jeftelabs/exec`.
- `npm run typecheck` executa `tsc --noEmit`.
- `npm run build` compila bundle ESM e declarações TypeScript.

## Resolução do tsconfig

`tsconfig.json` estende `@arapucajs/tsconfig/tsconfig.package.json`. Esse pacote precisa ser resolvível a partir do diretório do projeto; ele está listado em `devDependencies`. O nome do pacote e o caminho do arquivo devem permanecer sincronizados com a dependência instalada. Um `extends` apontando para outro pacote causa falha do loader ao descobrir o tsconfig antes de executar os testes.

`rewriteRelativeImportExtensions: true` está definido localmente para permitir imports relativos com extensão TypeScript no código consumido pelo runner. Preserve essa opção enquanto o runner usar esses imports.

## Diagnóstico

Se `npm test` falhar:

1. Observe se a falha ocorreu em `pretest`/ESLint ou durante a inicialização de `quick:test`.
2. Para erro de resolução de config, compare `tsconfig.json` com o pacote em `devDependencies` e verifique a instalação com `npm ls @arapucajs/tsconfig`.
3. Para erro de extensão `.ts`, confira `rewriteRelativeImportExtensions` e os imports relativos.
4. Para falhas após o início do runner, investigue os testes e o código referenciado; não confunda falha de bootstrap com falha de asserção.
