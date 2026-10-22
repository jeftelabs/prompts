# Testar comandos com traps

## Responder a uma chamada

```ts
import { Prompt } from '@jeftelabs/prompts'

const prompt = new Prompt()
prompt.trap('Nome do projeto').replyWith('demo')
const name = await prompt.ask('Nome do projeto')
```

A chave pode ser a mensagem exata ou a opção `name`. O `BasePrompt` tenta primeiro o nome e depois a mensagem. Uma chamada correspondente consome o trap mesmo se o mock falhar numa asserção. Traps são de uso único por chamada.

## Simular escolha

Use `chooseOption(index)` para seleção única e `chooseOptions(indexes)` para seleção múltipla. Índices começam em zero. `accept()` e `reject()` são atalhos de `replyWith(true)` e `replyWith(false)`. `replyWith(value)` permite respostas diretas; para múltipla seleção, uma resposta escalar é normalizada para array no mock.

Na ausência de resposta explícita, o mock imita defaults importantes: `confirm`/`toggle` usam `false`, `choice` seleciona o valor inicial ou a primeira opção, `multiple` usa default ou array vazio, e prompts textuais usam valor inicial. Verifique os testes do método para o comportamento esperado em detalhes.

## Testar validação

Encadeie asserções antes de invocar o prompt:

```ts
prompt
  .trap('projectName')
  .assertFails('', 'O nome é obrigatório')
  .assertPasses('demo')
  .replyWith('demo')

await prompt.ask('Nome do projeto', {
  name: 'projectName',
  validate(value) {
    return value.length > 0 || 'O nome é obrigatório'
  },
})
```

`assertFails` recebe valor e opcionalmente mensagem esperada (texto exato ou regex). `assertPasses` exige retorno exatamente `true` do validator. Se asserções foram registradas sem um callback `validate`, a asserção falha.

## Confirmar que o fluxo consumiu traps

A instância expõe `prompt.traps.verify()`, que lança o erro armazenado se houver traps pendentes. Também é possível observar `prompt.traps.prompts`, um `Map` de chaves pendentes. Chame `verify()` depois do fluxo sob teste, para que um trap esquecido não passe silenciosamente.

Use instâncias separadas para testes concorrentes; o estado dos traps é mutável e pertence à instância.
