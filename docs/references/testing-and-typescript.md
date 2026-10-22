# Referência: testes e TypeScript

## Scripts de teste

- `npm test` roda lint pelo lifecycle `pretest` e depois `c8 npm run quick:test`.
- `npm run quick:test` executa `node --import=@jeftelabs/exec --enable-source-maps bin/test.ts`.
- `bin/test.ts` configura `@t8ngs/runner` com arquivos `tests/**/*.spec.ts`, além de plugins de assert e expect-type.
- `npm run typecheck` chama `tsc --noEmit`.

Os testes verificam prompts com traps; não iniciam uma sessão visual real com Enquirer. Para validar cancelamento da integração real ou rendering de terminal, acrescente cobertura de integração apropriada e documente-a.

## tsconfig e loader

`tsconfig.json` estende `@arapucajs/tsconfig/tsconfig.package.json` e habilita `rewriteRelativeImportExtensions`. A dependência está em `devDependencies`; o `@jeftelabs/exec` usa o tsconfig para carregar TypeScript. O `extends` precisa apontar para o pacote instalado. O projeto já teve caminho configurado para `@adonisjs/tsconfig`, que não era dependência e fazia o loader falhar antes de iniciar os testes; o caminho foi alinhado ao pacote declarado.

## Diagnóstico de `npm test`

1. Se falhar em `pretest`, corrija primeiro ESLint/Prettier.
2. Se o loader relata config `extends` ausente, compare `tsconfig.json` com as dependências e `npm ls @arapucajs/tsconfig`.
3. Se o loader rejeita imports `.ts`, confira `rewriteRelativeImportExtensions`.
4. Se `quick:test` iniciou e apresenta falha de asserção, investigue o teste/código indicado: isso é diferente de falha de bootstrap.
