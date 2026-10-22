# Desenvolvimento

## Estrutura

`index.ts` define a superfície publicada. `src/` contém API, integração com Enquirer, mocks, tipos e formatação; `tests/traps/` agrupa testes por método; `examples/index.ts` é um exemplo interativo e pode aguardar terminal. `bin/test.ts` configura `@t8ngs/runner` para descobrir `tests/**/*.spec.ts`.

## Requisitos de configuração

`tsconfig.json` estende `@arapucajs/tsconfig/tsconfig.package.json`, declarada em `devDependencies`, e define `rewriteRelativeImportExtensions: true`. O loader `@jeftelabs/exec` consulta esse tsconfig antes de executar arquivos TypeScript; portanto, um `extends` apontando para pacote ausente impede até o bootstrap dos testes. Mantenha o caminho e dependência sincronizados. A opção de reescrita é necessária para os imports relativos `.ts` usados pelo runner.

## Comandos

- `npm run lint`: valida ESLint/Prettier.
- `npm test`: executa `pretest` (lint), depois cobertura c8 e `quick:test`.
- `npm run quick:test`: inicia `bin/test.ts` pelo loader `@jeftelabs/exec`.
- `npm run typecheck`: executa `tsc --noEmit`.
- `npm run build`: lint, limpa `build/`, gera bundle pelo tsdown e declarações pelo TypeScript.
- `npm run format`: aplica Prettier e altera arquivos.

## Ao modificar

Documente cada alteração na mesma tarefa. Se alterar método, opção, retorno ou trap, atualize a referência pública e os guias; se mudar configuração ou comandos, atualize referências de desenvolvimento/build. Inclua páginas novas em `docs/README.md` e atualize README quando necessário para quem instala/usa o pacote.
