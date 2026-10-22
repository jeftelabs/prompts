# Usar os prompts

## Instanciar e chamar

```ts
import { Prompt } from '@jeftelabs/prompts'

const prompt = new Prompt()
const projectName = await prompt.ask('Nome do projeto', {
  name: 'projectName',
  default: 'my-app',
  validate(value) {
    return value.trim().length > 0 || 'O nome é obrigatório'
  },
})
```

Os métodos disponíveis são `ask`, `secure`, `list`, `confirm`, `toggle`, `choice`, `multiple` e `autocomplete`. Veja os parâmetros e tipos completos em [API pública](../references/public-api.md).

## Choices

`choice` e `multiple` aceitam strings ou objetos `PromptChoice` com `name`, e opcionais `message`, `hint` e `disabled`. Para strings, o wrapper define `name`, `message` e `value` com o mesmo conteúdo. O resultado padrão usa os nomes das choices. `autocomplete` recebe uma lista de strings e aceita `multiple: true` para retorno múltiplo.

## Callbacks e defaults

Os tipos por método estão em `src/types.ts`. Os callbacks `validate(value, state)`, `format(value)` e `result(value)` são opcionais; `result` permite trocar o tipo do valor final via parâmetro genérico. `default` é enviado como valor inicial do Enquirer. `name` identifica o prompt e é usado também para encontrá-lo por trap.

A opção do separador de `list` tem o nome legado `seperator` (um só `a` depois do `p`) na API e é encaminhada como `sep`; seu padrão é vírgula. Preserve esse nome ao escrever código existente.

## Cancelamento

Enquirer chama o callback `onCancel` quando a interação é cancelada. Nesse caso o wrapper lança `errors.E_PROMPT_CANCELLED`. Capture essa classe específica se cancelamento for um fluxo esperado; demais falhas são propagadas sem conversão. Consulte o exemplo no README.
