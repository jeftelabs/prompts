# Desenvolvimento

## Estrutura

`index.ts` define os exports do pacote. `src/` contém as classes de prompt e sua integração com Enquirer, `tests/` valida comportamentos automatizados e `examples/` demonstra consumo. Consulte esses diretórios antes de adicionar uma implementação para seguir os contratos existentes.

## Fluxo local

1. Instale as dependências com `npm install`.
2. Execute `npm run lint` para validar ESLint e Prettier.
3. Execute `npm test` para lint prévio e testes com cobertura.
4. Execute `npm run typecheck` quando alterar tipos ou implementação TypeScript.
5. Execute `npm run build` para verificar bundle e declarações.

`npm run format` modifica arquivos; prefira formatar apenas os arquivos envolvidos ou revisar o diff após sua execução.

## Documentação como parte da mudança

Toda mudança de comportamento, API, opções, exemplos, dependências, scripts ou configuração exige atualização detalhada da documentação em `docs/` e, quando pertinente à instalação ou uso público, do README. Registre novos documentos neste índice. Explique também limitações observadas nos testes para que usuários e agentes não presumam cobertura ou comportamento não implementado.

## TypeScript e runner

O `tsconfig.json` estende a configuração de pacote distribuída por `@arapucajs/tsconfig`, que deve estar instalada conforme `package.json`/lockfile. O projeto ativa `rewriteRelativeImportExtensions` para compatibilidade com imports relativos usados no TypeScript. Ao alterar esse encadeamento, confira tanto o typecheck/build quanto a inicialização de `npm run quick:test`.
