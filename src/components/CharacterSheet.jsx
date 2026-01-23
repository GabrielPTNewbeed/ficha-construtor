import { useEffect, useMemo, useState } from "react";

const SKILLS = {
  Acrobatics: "dex", Arcana: "int", Athletics: "str", Insight: "wis", Intimidation: "cha",
  Investigation: "int", Medicine: "wis", Nature: "int", Perception: "wis", Performance: "cha",
  Persuasion: "cha", Religion: "int", Sleight_of_Hand: "dex", Stealth: "dex", Survival: "wis", Deception: "cha"
};

const SAVE_THROWS = { str: "STR", dex: "DEX", con: "CON", int: "INT", wis: "WIS", cha: "CHA" };

function abilityModifier(score) { const s = Number(score) || 0; return Math.floor((s - 10) / 2); }
function profBonusFromLevel(lv) { const l = Number(lv) || 1; if (l >= 17) return 6; if (l >= 13) return 5; if (l >= 9) return 4; if (l >= 5) return 3; return 2; }
const emptySpells = () => ({ cantrips: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], level7: [], level8: [], level9: [], slots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, spellcastingAbility: "" });

export default function CharacterSheet() {
  const defaultState = {
    // Informações básicas
    name: "", player: "", class: "", race: "", background: "", alignment: "", experience: 0, level: 1,
    // Combate
    ac: 10, hp: 10, maxHp: 10, tempHp: 0, speed: 30,
    // Atributos
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    // Testes de Salvação
    savingThrows: Object.fromEntries(Object.keys(SAVE_THROWS).map((k) => [k, false])),
    // Perícias
    skills: Object.fromEntries(Object.keys(SKILLS).map((k) => [k, false])),
    // Proficiências
    proficiencies: { languages: "", tools: "", armor: "", weapons: "" },
    // Sensoriais
    senses: { darkvision: "", blindsight: "", truesight: "" },
    // Resistências e Imunidades
    resistances: { damage: "", condition: "" },
    immunities: { damage: "", condition: "" },
    vulnerabilities: { damage: "" },
    // Antecedentes
    traits: "", ideals: "", bonds: "", flaws: "", feature: "", backstory: "",
    // Equipamento
    equipment: "",
    // Magias
    spells: emptySpells(),
  };

  const [state, setState] = useState(() => { 
    try { 
      const raw = localStorage.getItem("characterSheet"); 
      if (!raw) return defaultState;
      const stored = JSON.parse(raw);
      // Faz um merge profundo com defaultState
      const result = JSON.parse(JSON.stringify(defaultState));
      Object.keys(stored).forEach(key => {
        if (typeof stored[key] === 'object' && stored[key] !== null && typeof result[key] === 'object') {
          result[key] = { ...result[key], ...stored[key] };
        } else {
          result[key] = stored[key];
        }
      });
      return result;
    } catch (err) { 
      console.error("Erro ao carregar ficha:", err);
      try { localStorage.removeItem("characterSheet"); } catch {}
      return defaultState; 
    } 
  });
  const [page, setPage] = useState("ficha");
  useEffect(() => { try { localStorage.setItem("characterSheet", JSON.stringify(state)); } catch {} }, [state]);
  const prof = useMemo(() => profBonusFromLevel(state.level), [state.level]);

  const setField = (path, value) => setState((s) => {
    const next = { ...s }; const parts = path.split('.'); let cur = next;
    for (let i = 0; i < parts.length - 1; i++) { cur[parts[i]] = { ...(cur[parts[i]] || {}) }; cur = cur[parts[i]]; }
    cur[parts[parts.length - 1]] = value; return next;
  });

  const reset = () => setState(defaultState);
  const exportJson = () => { const data = JSON.stringify(state, null, 2); const blob = new Blob([data], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${state.name || 'character'}.json`; a.click(); URL.revokeObjectURL(url); };
  const importJson = (file) => { if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(reader.result); setState((s) => ({ ...s, ...parsed })); } catch { alert('Arquivo inválido'); } }; reader.readAsText(file); };

  const addSpell = (levelKey, name) => { if (!name) return; setState((s) => ({ ...s, spells: { ...s.spells, [levelKey]: [...(s.spells[levelKey] || []), name] } })); };
  const removeSpell = (levelKey, idx) => setState((s) => ({ ...s, spells: { ...s.spells, [levelKey]: (s.spells[levelKey] || []).filter((_, i) => i !== idx) } }));
  const setSlot = (lvl, value) => setState((s) => ({ ...s, spells: { ...s.spells, slots: { ...(s.spells.slots || {}), [lvl]: Number(value) || 0 } } }));

  const spellAbilityMod = abilityModifier(state.abilities[state.spells.spellcastingAbility] || 0);
  const spellSaveDC = 8 + prof + spellAbilityMod;
  const spellAttack = (prof + spellAbilityMod) >= 0 ? `+${prof + spellAbilityMod}` : `${prof + spellAbilityMod}`;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setPage('ficha')} style={{ flex: 1 }}>Ficha</button>
        <button onClick={() => setPage('antecedentes')} style={{ flex: 1 }}>Antecedentes</button>
        <button onClick={() => setPage('magias')} style={{ flex: 1 }}>Magias</button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {page === 'ficha' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12 }}>
            <div>
              {/* Linha 1: Nome, Classe, Raça */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                <label>Nome<br /><input id="char-name" name="name" autoComplete="given-name" value={state.name} onChange={(e) => setField('name', e.target.value)} style={{ width: '100%' }} /></label>
                <label>Classe<br /><input id="char-class" name="class" autoComplete="off" value={state.class} onChange={(e) => setField('class', e.target.value)} style={{ width: '100%' }} /></label>
                <label>Raça<br /><input id="char-race" name="race" autoComplete="off" value={state.race} onChange={(e) => setField('race', e.target.value)} style={{ width: '100%' }} /></label>
              </div>

              {/* Linha 2: Antecedente, Alinhamento, Jogador */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                <label>Antecedente<br /><input id="char-background" name="background" autoComplete="off" value={state.background} onChange={(e) => setField('background', e.target.value)} style={{ width: '100%' }} /></label>
                <label>Alinhamento<br /><input id="char-alignment" name="alignment" autoComplete="off" value={state.alignment} onChange={(e) => setField('alignment', e.target.value)} style={{ width: '100%' }} /></label>
                <label>Jogador<br /><input id="char-player" name="player" autoComplete="name" value={state.player} onChange={(e) => setField('player', e.target.value)} style={{ width: '100%' }} /></label>
              </div>

              {/* Linha 3: Nível, Experiência */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <label>Nível<br /><input id="char-level" name="level" autoComplete="off" type='number' value={state.level} onChange={(e) => setField('level', Number(e.target.value) || 1)} style={{ width: '100%' }} /></label>
                <label>XP<br /><input id="char-xp" name="experience" autoComplete="off" type='number' value={state.experience} onChange={(e) => setField('experience', Number(e.target.value) || 0)} style={{ width: '100%' }} /></label>
              </div>

              <hr style={{ margin: '12px 0' }} />

              {/* Perícias */}
              <div style={{ marginTop: 12 }}>
                <h4>Perícias</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {Object.keys(SKILLS).map((sk) => (
                    <label key={sk} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input id={`skill-${sk}`} name={`skill-${sk}`} type='checkbox' checked={!!state.skills[sk]} onChange={(e) => setField(`skills.${sk}`, e.target.checked)} />
                      <span>{sk.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Testes de Salvação */}
              <div style={{ marginTop: 16 }}>
                <h4>Testes de Salvação</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {Object.keys(SAVE_THROWS).map((st) => (
                    <label key={st} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input id={`save-${st}`} name={`save-${st}`} type='checkbox' checked={!!state.savingThrows[st]} onChange={(e) => setField(`savingThrows.${st}`, e.target.checked)} />
                      <span>{SAVE_THROWS[st]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Proficiências */}
              <div style={{ marginTop: 16 }}>
                <h4>Proficiências</h4>
                <label>Idiomas<br /><textarea id="prof-languages" name="languages" autoComplete="off" value={state.proficiencies.languages} onChange={(e) => setField('proficiencies.languages', e.target.value)} style={{ width: '100%', height: 60 }} /></label>
                <label style={{ marginTop: 8, display: 'block' }}>Ferramentas<br /><textarea id="prof-tools" name="tools" autoComplete="off" value={state.proficiencies.tools} onChange={(e) => setField('proficiencies.tools', e.target.value)} style={{ width: '100%', height: 60 }} /></label>
                <label style={{ marginTop: 8, display: 'block' }}>Armaduras<br /><textarea id="prof-armor" name="armor" autoComplete="off" value={state.proficiencies.armor} onChange={(e) => setField('proficiencies.armor', e.target.value)} style={{ width: '100%', height: 40 }} /></label>
                <label style={{ marginTop: 8, display: 'block' }}>Armas<br /><textarea id="prof-weapons" name="weapons" autoComplete="off" value={state.proficiencies.weapons} onChange={(e) => setField('proficiencies.weapons', e.target.value)} style={{ width: '100%', height: 40 }} /></label>
              </div>

              {/* Sentidos */}
              <div style={{ marginTop: 16 }}>
                <h4>Sentidos</h4>
                <label>Visão Noturna<br /><input id="sense-darkvision" name="darkvision" autoComplete="off" type='text' placeholder='Ex: 60 pés' value={state.senses.darkvision} onChange={(e) => setField('senses.darkvision', e.target.value)} style={{ width: '100%' }} /></label>
                <label style={{ marginTop: 6, display: 'block' }}>Visão Cega<br /><input id="sense-blindsight" name="blindsight" autoComplete="off" type='text' placeholder='Ex: 30 pés' value={state.senses.blindsight} onChange={(e) => setField('senses.blindsight', e.target.value)} style={{ width: '100%' }} /></label>
                <label style={{ marginTop: 6, display: 'block' }}>Visão Verdadeira<br /><input id="sense-truesight" name="truesight" autoComplete="off" type='text' placeholder='Ex: 120 pés' value={state.senses.truesight} onChange={(e) => setField('senses.truesight', e.target.value)} style={{ width: '100%' }} /></label>
              </div>

              {/* Resistências, Imunidades, Vulnerabilidades */}
              <div style={{ marginTop: 16 }}>
                <h4>Resistências e Imunidades</h4>
                <label>Resistências (Dano)<br /><textarea id="resist-damage" name="resistances" autoComplete="off" value={state.resistances.damage} onChange={(e) => setField('resistances.damage', e.target.value)} style={{ width: '100%', height: 40 }} /></label>
                <label style={{ marginTop: 6, display: 'block' }}>Imunidades (Dano)<br /><textarea id="immun-damage" name="immunities" autoComplete="off" value={state.immunities.damage} onChange={(e) => setField('immunities.damage', e.target.value)} style={{ width: '100%', height: 40 }} /></label>
                <label style={{ marginTop: 6, display: 'block' }}>Vulnerabilidades (Dano)<br /><textarea id="vuln-damage" name="vulnerabilities" autoComplete="off" value={state.vulnerabilities.damage} onChange={(e) => setField('vulnerabilities.damage', e.target.value)} style={{ width: '100%', height: 40 }} /></label>
              </div>

              {/* Equipamento */}
              <div style={{ marginTop: 16 }}>
                <h4>Equipamento</h4>
                <textarea id="equipment" name="equipment" autoComplete="off" value={state.equipment} onChange={(e) => setField('equipment', e.target.value)} style={{ width: '100%', minHeight: 100 }} />
              </div>
            </div>

            <div>
              <h4>Atributos</h4>
              {Object.keys(state.abilities).map((a) => (
                <div key={a} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ width: 36 }}>{a.toUpperCase()}</div>
                  <input id={`ability-${a}`} name={`ability-${a}`} autoComplete="off" type='number' value={state.abilities[a]} onChange={(e) => setField(`abilities.${a}`, Number(e.target.value) || 0)} style={{ width: 60 }} />
                  <div style={{ marginLeft: 'auto' }}>{abilityModifier(state.abilities[a]) >= 0 ? '+' : ''}{abilityModifier(state.abilities[a])}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 8, background: '#444', borderRadius: 4 }}>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#aaa' }}>Proficiência</div>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>{prof >= 0 ? '+' : ''}{prof}</div>
                </div>
              </div>

              <div style={{ marginTop: 12, padding: 8, background: '#333', borderRadius: 4 }}>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: '#aaa' }}>CA</div>
                  <input id="combat-ac" name="ac" autoComplete="off" type='number' value={state.ac} onChange={(e) => setField('ac', Number(e.target.value) || 10)} style={{ width: '100%', fontSize: 16, padding: 4 }} />
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: '#aaa' }}>PV</div>
                  <input id="combat-hp" name="hp" autoComplete="off" type='number' value={state.hp} onChange={(e) => setField('hp', Number(e.target.value) || 10)} style={{ width: '100%', fontSize: 16, padding: 4 }} />
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: '#aaa' }}>PV Máximo</div>
                  <input id="combat-maxhp" name="maxhp" autoComplete="off" type='number' value={state.maxHp} onChange={(e) => setField('maxHp', Number(e.target.value) || 10)} style={{ width: '100%', fontSize: 16, padding: 4 }} />
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: '#aaa' }}>PV Temporário</div>
                  <input id="combat-temphp" name="temphp" autoComplete="off" type='number' value={state.tempHp} onChange={(e) => setField('tempHp', Number(e.target.value) || 0)} style={{ width: '100%', fontSize: 16, padding: 4 }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>Velocidade</div>
                  <input id="combat-speed" name="speed" autoComplete="off" type='text' placeholder='Ex: 30 pés' value={state.speed} onChange={(e) => setField('speed', e.target.value)} style={{ width: '100%', fontSize: 16, padding: 4 }} />
                </div>
              </div>

              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexDirection: 'column' }}>
                <button onClick={exportJson}>Exportar</button>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 12px', background: '#333', borderRadius: 4, textAlign: 'center' }}>
                  <input type='file' accept='application/json' style={{ display: 'none' }} onChange={(e) => importJson(e.target.files && e.target.files[0])} />
                  Importar
                </label>
                <button onClick={reset} style={{ background: '#500' }}>Reset</button>
              </div>
            </div>
          </div>
        )}

        {page === 'antecedentes' && (
          <div style={{ maxWidth: 800 }}>
            <div style={{ marginBottom: 16 }}>
              <h4>Traços de Personalidade</h4>
              <textarea id="traits" name="traits" autoComplete="off" value={state.traits} onChange={(e) => setField('traits', e.target.value)} style={{ width: '100%', minHeight: 80 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <h4>Ideais</h4>
              <textarea id="ideals" name="ideals" autoComplete="off" value={state.ideals} onChange={(e) => setField('ideals', e.target.value)} style={{ width: '100%', minHeight: 80 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <h4>Ligações</h4>
              <textarea id="bonds" name="bonds" autoComplete="off" value={state.bonds} onChange={(e) => setField('bonds', e.target.value)} style={{ width: '100%', minHeight: 80 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <h4>Falhas</h4>
              <textarea id="flaws" name="flaws" autoComplete="off" value={state.flaws} onChange={(e) => setField('flaws', e.target.value)} style={{ width: '100%', minHeight: 80 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <h4>Característica de Antecedente</h4>
              <textarea id="feature" name="feature" autoComplete="off" value={state.feature} onChange={(e) => setField('feature', e.target.value)} style={{ width: '100%', minHeight: 80 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <h4>História</h4>
              <textarea id="backstory" name="backstory" autoComplete="off" value={state.backstory} onChange={(e) => setField('backstory', e.target.value)} style={{ width: '100%', minHeight: 200 }} />
            </div>
          </div>
        )}

        {page === 'magias' && (
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label>Habilidade de Conjuração<br />
                <select id="spell-ability" name="spell-ability" autoComplete="off" value={state.spells.spellcastingAbility} onChange={(e) => setField('spells.spellcastingAbility', e.target.value)} style={{ width: '100%' }}>
                  <option value=''>--</option>
                  <option value='str'>STR</option>
                  <option value='dex'>DEX</option>
                  <option value='con'>CON</option>
                  <option value='int'>INT</option>
                  <option value='wis'>WIS</option>
                  <option value='cha'>CHA</option>
                </select>
              </label>
              <div style={{ marginTop: 12, padding: 8, background: '#333', borderRadius: 4 }}>
                <div>Spell Save DC: <strong>{spellSaveDC}</strong></div>
                <div style={{ marginTop: 4 }}>Spell Attack: <strong>{spellAttack}</strong></div>
              </div>
              <div style={{ marginTop: 12 }}>
                <h5>Slots de Magia</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[1,2,3,4,5,6,7,8,9].map((lvl) => (
                    <div key={lvl} style={{ padding: 8, background: '#2a2a2a', borderRadius: 4 }}>
                      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>Nível {lvl}</div>
                      <input type='number' value={state.spells.slots[lvl] || 0} onChange={(e) => setSlot(lvl, e.target.value)} style={{ width: '100%', fontSize: 14 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: 400 }}>
              <h5>Magias</h5>
              <AddSpellForm onAdd={(lvl, name) => addSpell(lvl, name)} />
              <div style={{ maxHeight: 500, overflow: 'auto', marginTop: 12 }}>
                <h6>Truques</h6>
                <ul style={{ marginTop: 4, listStyle: 'none', padding: 0 }}>
                  {(state.spells.cantrips || []).map((s, i) => (
                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 4, background: '#2a2a2a', marginBottom: 2, borderRadius: 2 }}>
                      {s}
                      <button onClick={() => removeSpell('cantrips', i)} style={{ background: '#500', padding: '2px 6px', fontSize: 12 }}>rem</button>
                    </li>
                  ))}
                </ul>
                {[1,2,3,4,5,6,7,8,9].map((n) => (
                  <div key={n} style={{ marginTop: 8 }}>
                    <h6>Nível {n}</h6>
                    <ul style={{ marginTop: 4, listStyle: 'none', padding: 0 }}>
                      {(state.spells[`level${n}`] || []).map((s, i) => (
                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 4, background: '#2a2a2a', marginBottom: 2, borderRadius: 2 }}>
                          {s}
                          <button onClick={() => removeSpell(`level${n}`, i)} style={{ background: '#500', padding: '2px 6px', fontSize: 12 }}>rem</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddSpellForm({ onAdd }) {
  const [level, setLevel] = useState('cantrips');
  const [name, setName] = useState('');
  return (
    <div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
      <select id="spell-level" name="spell-level" autoComplete="off" value={level} onChange={(e) => setLevel(e.target.value)} style={{ width: '100%' }}>
        <option value='cantrips'>Truque</option>
        {[1,2,3,4,5,6,7,8,9].map((n) => <option key={n} value={`level${n}`}>Nível {n}</option>)}
      </select>
      <input id="spell-name" name="spell-name" autoComplete="off" placeholder='Nome da magia' value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
      <button onClick={() => { if (name.trim()) { onAdd(level, name.trim()); setName(''); } }}>Adicionar Magia</button>
    </div>
  );
}
