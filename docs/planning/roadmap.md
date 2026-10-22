# Planejamento

Este documento registra pontos para avaliação futura, não compromissos de entrega.

- Adicionar teste específico para normalização de cancelamento real em `Prompt`, com técnica de injeção ou isolamento da integração Enquirer.
- Avaliar traps com opções para `name` padrão duplicado e o comportamento do `ObjectBuilder` em `list`.
- Revisar a precedência da expressão de `hint` no autocomplete e adicionar teste para hint customizado antes de qualquer correção.
- Considerar corrigir o nome `seperator` em uma versão compatível ou com período de depreciação, pois faz parte da API existente.
- Documentar matriz de Node.js suportada com base em política de CI/pacote quando ela estiver explicitada.
- Considerar um workflow de validação de testes/build em pull requests; o workflow atual de checks só declara push para main.
