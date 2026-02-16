// GUIA DE CAMPOS CALCULADOS (Calculated Fields)
//
// Como usar campos calculados no Ficha Construtor:
//
// 1. CRIAR UM CAMPO CALCULADO:
//    - Clique em "+ Add Widget"
//    - Type: "Calculated Field"
//    - Preencha a fórmula
//    - Salve
//
// 2. FÓRMULAS VÁLIDAS:
//    Você pode usar:
//    - getValue('widget_id'): pega o valor de outro widget
//    - Operações: +, -, *, /, %
//    - Funções: floor(), ceil(), round(), abs(), max(), min()
//
// 3. EXEMPLOS:
//
//    a) Modificador de Habilidade (D&D 5e):
//       floor((getValue('str') - 10) / 2)
//       - Pega valor do widget 'str'
//       - Subtrai 10
//       - Divide por 2
//       - Arredonda para baixo
//
//    b) Bônus de Proficiência (D&D 5e):
//       2 + floor((getValue('level') - 1) / 4)
//       - Começa com 2
//       - A cada 4 níveis (+1)
//
//    c) AC Total (D&D 5e):
//       getValue('ac_base') + getValue('dex_mod')
//       - AC Base + Modificador DEX
//
//    d) HP Total:
//       getValue('hp_base') + getValue('con_mod') * getValue('level')
//       - HP Base + (CON Mod × Nível)
//
// 4. VARIÁVEIS ID DOS WIDGETS (Template D&D 5e):
//    str, dex, con, int, wis, cha
//    str_mod, dex_mod, con_mod, int_mod, wis_mod, cha_mod
//    level, experience, ac, hp, maxHp, tempHp
//    proficiency_bonus
//
// 5. DEBUGGING:
//    - Abra o Console do Navegador (F12)
//    - Se houver erro, você verá em vermelho no campo
//    - Verifique:
//      ✓ O id do widget está correto (case-sensitive)
//      ✓ O widget pai (dependência) tem um valor número
//      ✓ A fórmula sintaxe está correta
//
// 6. DEPENDÊNCIAS:
//    - Todos os widgets que você usa com getValue()
//      aparecerão em "Depends On"
//    - Útil para visualizar relações
//
// TROUBLESHOOTING:
//
// ❌ "ERROR: getValue is not defined"
//    → Use getValue('id') com aspas simples
//
// ❌ "ERROR: Unknown symbol"
//    → O id do widget não existe
//    → Verifique se está escrito correto
//
// ❌ "0" ou resultado inesperado
//    → O widget dependência tem valor vazio
//    → Preencha primeiro o widget de entrada
