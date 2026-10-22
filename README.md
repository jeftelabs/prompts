# @jeftelabs/prompts

Wrapper TypeScript sobre [Enquirer](https://github.com/enquirer/enquirer) para criar prompts de terminal e responder a eles programaticamente em testes.

## Por que usar

Comandos que aguardam entrada interativa podem travar testes automatizados. O pacote expõe uma API de prompts e permite registrar traps que substituem a interação pelo terminal, configuram respostas, simulam seleções e verificam funções de validação.

## Instalação

```sh
npm install @jeftelabs/prompts
```

O pacote publica ESM e declara os subpaths `.` e `./types`. O uso requer Node.js e compatibilidade com as dependências do pacote; confira os metadados publicados para os requisitos vigentes.

## Uso básico

```ts
import { Prompt } from '@jeftelabs/prompts'

const prompt = new Prompt()

const name = await prompt.ask('Qual é seu nome?', {
  name: 'name',
  validate(value) {
    return value.length > 0 || 'Informe um nome'
  },
})

const tools = await prompt.multiple('Quais ferramentas instalar?', ['npm', 'pnpm', 'yarn'])
```

Os métodos disponíveis são:

| Método | Uso |
| --- | --- |
| `ask(message, options?)` | Texto livre. |
| `secure(message, options?)` | Texto mascarado, por exemplo uma senha. |
| `list(message, options?)` | Lista de valores digitados, separada por vírgula por padrão. |
| `confirm(message, options?)` | Resposta booleana de confirmação. |
| `toggle(message, [enabled, disabled], options?)` | Resposta booleana com rótulos personalizados. |
| `choice(message, choices, options?)` | Seleciona uma opção. |
| `multiple(message, choices, options?)` | Seleciona várias opções. |
| `autocomplete(message, choices, options?)` | Seleciona opções com busca; aceita `multiple: true`. |

As opções tipadas variam conforme o método. Em geral, incluem `name`, `default`, `hint`, `validate`, `format` e `result`; autocomplete também aceita `limit`, `multiple` e `footer`. `validate` recebe o valor e o estado do prompt; `format` transforma a apresentação enquanto se digita; `result` transforma o valor final. Veja os tipos exportados em `@jeftelabs/prompts/types`.

As opções de `list` chamam o separador de `seperator` (grafia presente na API atual), cujo padrão é `,`.

## Testando prompts

Registre um trap usando a mensagem exata ou o nome atribuído ao prompt. A resposta é consumida quando o prompt correspondente é invocado.

```ts
import { Prompt } from '@jeftelabs/prompts'

const prompt = new Prompt()

prompt.trap('Qual é seu nome?').replyWith('Ada')
const name = await prompt.ask('Qual é seu nome?')
// name === 'Ada'
```

Para nomes estáveis, use a opção `name`:

```ts
prompt.trap('userName').replyWith('Ada')
const name = await prompt.ask('Qual é seu nome?', { name: 'userName' })
```

Os métodos do trap incluem:

- `replyWith(value)`: define uma resposta.
- `accept()` e `reject()`: respondem `true` ou `false` a prompts booleanos.
- `chooseOption(index)` e `chooseOptions(indexes)`: selecionam opções por índice, começando em zero.
- `assertPasses(value)` e `assertFails(value, expectedMessage?)`: verificam a validação configurada no prompt.

Confira traps não consumidos com `prompt.traps.verify()`; o método lança erro quando algum prompt esperado não foi acionado. Traps também ficam disponíveis em `prompt.traps.prompts` para inspeção.

## Cancelamento

Quando o usuário cancela a interação e o Enquirer invoca `onCancel`, o pacote rejeita a promise com `errors.E_PROMPT_CANCELLED`:

```ts
import { Prompt, errors } from '@jeftelabs/prompts'

try {
  await new Prompt().ask('Qual é seu nome?')
} catch (error) {
  if (error instanceof errors.E_PROMPT_CANCELLED) {
    console.log('Prompt cancelado')
  } else {
    throw error
  }
}
```

## Desenvolvimento

```sh
npm install
npm test
npm run typecheck
npm run build
```

O guia de desenvolvimento e as referências detalhadas estão em [docs/README.md](docs/README.md).
