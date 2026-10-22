# Orientações para Claude e agentes de IA

As instruções canônicas estão em [`AGENTS.md`](./AGENTS.md). Consulte também as páginas pertinentes em [`docs/README.md`](./docs/README.md). Este repositório contém `@jeftelabs/prompts`, um wrapper ESM sobre Enquirer com prompts tipados e suporte a traps para testes.

## Documentação obrigatória para toda alteração

É extremamente obrigatório criar ou atualizar documentação detalhada sempre que algo novo for criado ou qualquer parte do projeto for modificada. Isso inclui código, API, tipos, testes, configuração, dependências, scripts, workflows, exemplos e os próprios documentos. Faça a atualização na mesma tarefa.

- Explique para humanos e IAs por que existe, como funciona, quais opções e efeitos produz, seus limites e como manter/verificar.
- Organize páginas em `docs/` com índice e áreas como guides, references e planning conforme necessário.
- Inclua toda página nova em `docs/README.md` e mantenha sua descoberta pelo README raiz.
- Atualize README quando instalação, API, compatibilidade ou exemplos mudarem.
- Confirme cada afirmação no código e nos testes; não finalize com documentação pendente.

## Mapa do projeto

- `index.ts`: exporta `Prompt` e o namespace `errors`.
- `src/base.ts`: métodos públicos de prompt e despacho para prompt real ou trap.
- `src/enquirer.ts`: integra Enquirer e normaliza cancelamento para `E_PROMPT_CANCELLED`.
- `src/mocked_prompt.ts`: respostas e asserções usadas pelos traps.
- `src/types.ts`: opções, callbacks e escolhas tipadas.
- `src/prompt_options.ts`, `src/colors.ts`, `src/icons.ts`: apresentação no terminal.
- `tests/traps/`: testes por tipo de prompt e comportamento de traps.
- `examples/index.ts`: exemplo interativo que pode solicitar entrada de terminal.

## Práticas

Leia `AGENTS.md`, a documentação relevante e o código antes de alterar. Confirme comandos em `package.json`. Preserve a API pública, ESM, os mocks e as convenções ESLint/Prettier. Mantenha a configuração do runner alinhada às dependências. Use Conventional Commits; faça commit, push ou PR apenas se solicitado. Não descarte alterações preexistentes nem exponha credenciais.
