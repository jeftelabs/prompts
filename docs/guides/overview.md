# Visão geral

## Propósito

Prompts interativos deixam comandos e fluxos dependentes de terminal difíceis de testar: um teste pode ficar aguardando uma entrada que nunca virá. `@jeftelabs/prompts` fornece um wrapper sobre Enquirer que mantém a interação real em produção e permite registrar traps nos testes para responder sem abrir um prompt.

## Fluxo de uma chamada

1. O consumidor cria uma instância de `Prompt` e chama um método, por exemplo `ask()` ou `choice()`.
2. `BasePrompt` constrói o objeto de opções esperado pelo Enquirer, incluindo valores padrão, validação, formatação, callbacks, estilos e choices relevantes.
3. O wrapper procura um trap primeiro pelo `name` do prompt e depois pela mensagem exibida.
4. Quando encontra trap, o `MockedPrompt` simula resposta/seleção, executa as verificações programadas e aplica `result`. Sem trap, a implementação delegada a Enquirer exibe a interação real.
5. Cancelamento sinalizado pelo callback `onCancel` é convertido em `errors.E_PROMPT_CANCELLED`; outros erros são propagados.

## Componentes

- `index.ts` exporta `Prompt` e o namespace `errors`.
- `src/base.ts` implementa a API comum e o despacho entre Enquirer e mocks.
- `src/enquirer.ts` integra a dependência Enquirer.
- `src/mocked_prompt.ts` implementa a resposta simulada e asserções de validação.
- `src/types.ts` descreve opções, estados e choices públicos usados pelos métodos.
- `src/prompt_options.ts`, `src/colors.ts`, `src/icons.ts` fornecem apresentação do terminal.
- `tests/traps/` cobre tipos de prompts, asserções e consumo dos traps.

## Escopo e limites

O pacote publica uma instância concreta `Prompt`. Os traps são recursos da mesma instância e são consumidos quando acionados; testes paralelos que compartilhem uma instância também compartilham seu mapa mutável de traps. O simulador cobre respostas e callbacks usados pela API, mas não reproduz a renderização, navegação interativa, eventos de terminal ou ciclo completo de vida do Enquirer. Testes de integração visual precisam exercitar um terminal real separado.

Os termos `format` e `result` seguem os callbacks configurados no Enquirer: `format` formata valor durante interação; `result` transforma a resposta antes de retorná-la. No caminho de mock, o simulador executa `result`, mas seu tratamento de `format` cobre especificamente a separação de valores em `list`; não interprete o mock como uma implementação completa do terminal.
