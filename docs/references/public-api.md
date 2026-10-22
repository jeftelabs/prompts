# Referência da API pública

## Exports

`index.ts` exporta `Prompt` de `src/enquirer.ts` e `errors` como namespace do módulo `src/errors.ts`. O subpath `@jeftelabs/prompts/types` resolve para `src/types.ts`, conforme os exports do `package.json`.

## Métodos de `Prompt`

Os métodos são assíncronos e resolvem o resultado após a interação ou resposta de trap.

| Método | Tipo de prompt Enquirer | Resultado padrão | Opções |
| --- | --- | --- | --- |
| `ask(title, options?)` | `input` | `string` | `TextPromptOptions<Result>` |
| `secure(title, options?)` | `password` | `string` | `TextPromptOptions<Result>` |
| `list(title, options?)` | `list` | `string[]` | `ListPromptOptions<Result>` |
| `confirm(title, options?)` | `confirm` | `boolean` | `BooleanPromptOptions<Result>` |
| `toggle(title, [enabled, disabled], options?)` | `toggle` | `boolean` | `TogglePromptOptions<Result>` |
| `choice(title, choices, options?)` | `select` | choice selecionada | `ChoicePromptOptions<Choice, Result>` |
| `multiple(title, choices, options?)` | `multiselect` | array de choices | `MultiplePromptOptions<Choice, Result>` |
| `autocomplete(title, choices, options?)` | `autocomplete` | choice ou array | `AutoCompletePromptOptions<Choice, Multiple, Result>` |

`choices` de `choice`/`multiple` são strings ou objetos `PromptChoice<Choice>`. `autocomplete` aceita strings. `toggle` requer uma tupla `[string, string]` com rótulos habilitado e desabilitado.

## Opções e callbacks

Os tipos exatos residem em `src/types.ts` e estão exportados pelo subpath `/types`.

- `name`: nome usado no payload do Enquirer, padrão `prompt`; na implementação de `list`, a opção ausente ainda termina como `prompt`, embora o builder seja chamado duas vezes para a chave.
- `default`: valor inicial, mapeado para Enquirer `initial`.
- `hint`: texto auxiliar.
- `validate(value, state)`: aceita valor e estado `{type, name, message, value}`; retorna boolean ou mensagem, também pode retornar Promise.
- `format(value)`: callback de formatação durante entrada interativa.
- `result(value)`: transforma o resultado antes do retorno; pode ser assíncrono.
- `seperator` em `ListPromptOptions`: nome legado, padrão `,`, enviado ao Enquirer como `sep`.
- `limit`, `multiple`, `footer` em autocomplete: limite de opções renderizadas, modo multiselect e callback de rodapé.

O autocomplete preenche `hint` usando a expressão atual `options.hint || options.multiple ? ... : ...`; devido à precedência de operadores, um hint customizado truthy também seleciona a string padrão de múltipla escolha. Esse detalhe é comportamento atual do código e deve ser revisto separadamente antes de documentá-lo como intenção ou alterá-lo.

## Traps

`prompt.trap(key)` registra `MockedPrompt` e retorna a instância para encadear:

- `replyWith(value)`, `accept()`, `reject()`;
- `chooseOption(index)`, `chooseOptions(indexes)`;
- `assertPasses(value)`, `assertFails(value, message?)`;
- `prompt.traps.verify()` falha se existem traps pendentes.

O despacho usa primeiro `options.name`, depois `options.message`; as chaves são comparadas literalmente. Um trap é removido antes de o mock ser executado. O mapa é publicamente observável como `prompt.traps.prompts`.

## Erros

`errors.E_PROMPT_CANCELLED` é criado por `@jeftelabs/exception`, com mensagem `Prompt cancelled`, código `E_PROMPT_CANCELLED` e status configurado `500`. A integração converte somente rejeição após `onCancel`; caso contrário repropaga a falha original do Enquirer.
