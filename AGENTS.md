# Instruções para agentes — `@jeftelabs/prompts`

Leia este arquivo antes de alterar o projeto. Use `src/`, `tests/`, exemplos, `package.json` e configuração como fontes de verdade.

## Projeto

`@jeftelabs/prompts` é um wrapper ESM sobre Enquirer que fornece prompts tipados e mecanismos de mock para facilitar testes. A API pública é exportada por `index.ts`; os tipos ficam em `src/types.ts`. As implementações ficam em `src/`, e os testes em `tests/traps/`.

## Documentação obrigatória

É obrigatório criar ou atualizar documentação detalhada sempre que algo novo for criado ou qualquer parte do projeto for modificada, incluindo código, API, testes, configuração, dependências, scripts, CI, exemplos e a própria documentação. Faça isso na mesma tarefa.

- Explique propósito, comportamento, entradas, saídas, opções, efeitos, limites e manutenção para humanos e agentes de IA.
- Organize a documentação em `docs/`, incluindo índice, guides, references, planning e outras áreas que o projeto exigir.
- Liste cada página no índice `docs/README.md` e descubra a documentação a partir do README raiz.
- Atualize README quando instalação, compatibilidade, API ou exemplos públicos mudarem.
- Valide afirmações e exemplos contra o código e os testes. Não documente comportamento presumido.

## Antes de alterar

1. Leia este arquivo e a documentação relevante em `docs/`.
2. Examine as implementações em `src/`, os testes relacionados e exemplos.
3. Confira exports em `index.ts`, scripts/dependências em `package.json`, configuração TS/ESLint e workflows.
4. Preserve os contratos públicos, os tipos por prompt, o comportamento de traps e o cancelamento tipado.

## Comandos

- `npm run lint`: ESLint.
- `npm test`: lint via `pretest` e testes com c8.
- `npm run quick:test`: runner sem cobertura.
- `npm run typecheck`: TypeScript sem emissão.
- `npm run build`: gera bundle ESM e declarações.
- `npm run format`: aplica Prettier aos arquivos.

Confirme scripts em `package.json`. `npm run format` escreve arquivos. Não adicione ou rode testes salvo solicitação do usuário ou quando necessário em commit autorizado.

## Convenções

- Siga ESM, exports definidos em `package.json`, TypeScript e estilo ESLint/Prettier.
- O runner depende do `tsconfig.json` e do loader `@jeftelabs/exec`; mantenha coerente a opção `rewriteRelativeImportExtensions`.
- Não altere artefatos gerados em `build/` como fonte.
- Use Conventional Commits.
- Faça commit, push ou PR apenas quando solicitado.
- Preserve alterações preexistentes e não exponha credenciais.
