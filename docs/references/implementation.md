# Referência da implementação

## Construção das opções

`BasePrompt` usa `ObjectBuilder` para formar opções de Enquirer. Métodos compartilham prefixo e estilos; escolhas de string são normalizadas para objetos `{name, message, value}` em `choice` e `multiple`. `multiple` define uma função `indicator`; autocomplete também define `highlight`.

## Integração real

`Prompt` chama `enquirer.prompt(options)` e seleciona `output[options.name]`. Enquirer possui typings considerados inadequados pelo projeto, por isso é convertido para `any` na fronteira. O callback `onCancel` registra cancelamento e a exceção posterior é convertida em `E_PROMPT_CANCELLED`; falhas sem cancelamento passam sem conversão.

## Caminho de teste

`BasePrompt` consulta traps, que são `MockedPrompt`s. O mock:

1. escolhe defaults conforme o tipo de prompt;
2. converte índices de choice em `name` (ou string);
3. separa input de list usando `sep`;
4. executa as validações registradas e compara resultado/message esperado;
5. aplica callback `result` se fornecido.

O mock não roda o callback `format` geral e não modela estado/renders do Enquirer; a validação recebe estado mínimo com `value` vazio no simulador. Trate essa diferença como limite do harness.

## Observações de manutenção

- A instância mantém traps mutáveis. Não reutilize a mesma instância em testes concorrentes sem isolamento.
- Em `list`, o builder adiciona `name` uma segunda vez com `options.name`; confirme a semântica de `ObjectBuilder` antes de refatorar.
- `autocomplete` usa uma expressão de precedência ambígua para gerar hint; testes atuais exercitam modos de escolha, mas não cobrem hints customizados.
- A interface de options admite tipos mais específicos que a integração interna `any`; mantenha as declarações públicas alinhadas com o comportamento observado.
