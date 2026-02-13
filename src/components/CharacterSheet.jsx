import { useEffect, useMemo, useState } from "react";
import { DND5E_SKILLS, DND5E_SAVES } from "../sheets/dnd5e.rules";
import AbilityScores from "./AbilityScores";
import SkillsList from "./SkillsList";
import SavingThrows from "./SavingThrows";

/* =======================
   Funções utilitárias
======================= */

function abilityModifier(score = 10) {
  return Math.floor((Number(score) - 10) / 2);
}

function profBonusFromLevel(level = 1) {
  return 2 + Math.floor((Number(level) - 1) / 4);
}

function emptySpells() {
  return {
    spellcastingAbility: "",
    cantrips: [],
    slots: {},
    level1: [], level2: [], level3: [], level4: [], level5: [],
    level6: [], level7: [], level8: [], level9: []
  };
}

/* =======================
   Componente principal
======================= */

export default function CharacterSheet() {
  const defaultState = {
    name: "", player: "", class: "", race: "", background: "",
    alignment: "", experience: 0, level: 1,

    ac: 10, hp: 10, maxHp: 10, tempHp: 0, speed: "30",

    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },

    savingThrows: Object.fromEntries(DND5E_SAVES.map(s => [s.id, false])),
    skills: Object.fromEntries(DND5E_SKILLS.map(s => [s.id, false])),

    proficiencies: { languages: "", tools: "", armor: "", weapons: "" },
    senses: { darkvision: "", blindsight: "", truesight: "" },

    resistances: { damage: "", condition: "" },
    immunities: { damage: "", condition: "" },
    vulnerabilities: { damage: "" },

    traits: "", ideals: "", bonds: "", flaws: "",
    feature: "", backstory: "", equipment: "",

    spells: emptySpells()
  };

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem("characterSheet");
      if (!raw) return structuredClone(defaultState);

      const parsed = JSON.parse(raw);
      return { ...structuredClone(defaultState), ...parsed };
    } catch {
      return structuredClone(defaultState);
    }
  });

  const [page, setPage] = useState("ficha");

  useEffect(() => {
    localStorage.setItem("characterSheet", JSON.stringify(state));
  }, [state]);

  const prof = useMemo(
    () => profBonusFromLevel(state.level),
    [state.level]
  );

  const setField = (path, value) => {
    setState(prev => {
      const next = structuredClone(prev);
      const parts = path.split(".");
      let cur = next;

      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] ??= {};
        cur = cur[parts[i]];
      }

      cur[parts.at(-1)] = value;
      return next;
    });
  };

  const reset = () => setState(structuredClone(defaultState));

  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify(state, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${state.name || "character"}.json`;
    a.click();
  };

  const importJson = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        setState(prev => ({ ...structuredClone(prev), ...parsed }));
      } catch {
        alert("Arquivo inválido");
      }
    };
    reader.readAsText(file);
  };

  const addSpell = (levelKey, name) => {
    setState(s => ({
      ...s,
      spells: {
        ...s.spells,
        [levelKey]: [...(s.spells[levelKey] || []), name]
      }
    }));
  };

  const removeSpell = (levelKey, index) => {
    setState(s => ({
      ...s,
      spells: {
        ...s.spells,
        [levelKey]: s.spells[levelKey].filter((_, i) => i !== index)
      }
    }));
  };

  const spellAbilityMod =
    abilityModifier(state.abilities[state.spells.spellcastingAbility]);

  const spellSaveDC = 8 + prof + spellAbilityMod;
  const spellAttack = `${prof + spellAbilityMod >= 0 ? "+" : ""}${prof + spellAbilityMod}`;

  /* JSX continua igual ao seu — sem erro estrutural */

  return (
    <div className="character-sheet">
      {/* MENU DE ABAS */}
      <nav className="sheet-tabs">
        <button
          onClick={() => setPage("ficha")}
          className={page === "ficha" ? "tab active" : "tab"}
        >
          Ficha
        </button>
        <button
          onClick={() => setPage("magia")}
          className={page === "magia" ? "tab active" : "tab"}
        >
          Magias
        </button>
        <button
          onClick={() => setPage("equipment")}
          className={page === "equipment" ? "tab active" : "tab"}
        >
          Equipamento
        </button>
        <button
          onClick={() => setPage("notes")}
          className={page === "notes" ? "tab active" : "tab"}
        >
          Anotações
        </button>
      </nav>

      {/* CONTEÚDO DINÂMICO */}
      <div className="sheet-content">
        {page === "ficha" && (
          <>
            {/* INFORMAÇÕES BÁSICAS */}
            <section className="form-section">
              <h2>Informações Básicas</h2>
              <div className="form-grid-3">
                <div>
                  <label>Nome</label>
                  <input
                    type="text"
                    value={state.name}
                    onChange={(e) => setField("name", e.target.value)}
                  />
                </div>
                <div>
                  <label>Classe</label>
                  <input
                    type="text"
                    value={state.class}
                    onChange={(e) => setField("class", e.target.value)}
                  />
                </div>
                <div>
                  <label>Raça</label>
                  <input
                    type="text"
                    value={state.race}
                    onChange={(e) => setField("race", e.target.value)}
                  />
                </div>
                <div>
                  <label>Antecedente</label>
                  <input
                    type="text"
                    value={state.background}
                    onChange={(e) => setField("background", e.target.value)}
                  />
                </div>
                <div>
                  <label>Jogador</label>
                  <input
                    type="text"
                    value={state.player}
                    onChange={(e) => setField("player", e.target.value)}
                  />
                </div>
                <div>
                  <label>Alinhamento</label>
                  <input
                    type="text"
                    value={state.alignment}
                    onChange={(e) => setField("alignment", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* NÍVEL, XP, CA, HP */}
            <section className="form-section">
              <h2>Progressão e Defesa</h2>
              <div className="form-grid-4">
                <div>
                  <label>Nível</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={state.level}
                    onChange={(e) => setField("level", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>XP</label>
                  <input
                    type="number"
                    min="0"
                    value={state.experience}
                    onChange={(e) => setField("experience", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>CA</label>
                  <input
                    type="number"
                    value={state.ac}
                    onChange={(e) => setField("ac", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>HP Atual</label>
                  <input
                    type="number"
                    value={state.hp}
                    onChange={(e) => setField("hp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>HP Máximo</label>
                  <input
                    type="number"
                    value={state.maxHp}
                    onChange={(e) => setField("maxHp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>HP Temporário</label>
                  <input
                    type="number"
                    value={state.tempHp}
                    onChange={(e) => setField("tempHp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Velocidade</label>
                  <input
                    type="text"
                    value={state.speed}
                    onChange={(e) => setField("speed", e.target.value)}
                    placeholder="30 pés"
                  />
                </div>
                <div>
                  <label>Bônus de Proficiência</label>
                  <input
                    type="text"
                    value={`+${prof}`}
                    disabled
                    className="readonly"
                  />
                </div>
              </div>
            </section>

            {/* ATRIBUTOS */}
            <section className="form-section">
              <AbilityScores
                abilities={state.abilities}
                onChange={(newAbilities) => setField("abilities", newAbilities)}
              />
            </section>

            {/* HABILIDADES E TESTES */}
            <section className="form-section">
              <SkillsList
                skills={state.skills}
                proficiency={prof}
                abilities={state.abilities}
                onChange={(newSkills) => setField("skills", newSkills)}
              />
            </section>

            <section className="form-section">
              <SavingThrows
                saves={state.savingThrows}
                proficiency={prof}
                abilities={state.abilities}
                onChange={(newSaves) => setField("savingThrows", newSaves)}
              />
            </section>

            {/* PROFICIÊNCIAS E SENTIDOS */}
            <section className="form-section">
              <h2>Proficiências e Sentidos</h2>
              <div className="form-grid-2">
                <div>
                  <label>Linguagens</label>
                  <textarea
                    value={state.proficiencies.languages}
                    onChange={(e) =>
                      setField("proficiencies.languages", e.target.value)
                    }
                    placeholder="Comum, Élfico, ..."
                  />
                </div>
                <div>
                  <label>Ferramentas</label>
                  <textarea
                    value={state.proficiencies.tools}
                    onChange={(e) =>
                      setField("proficiencies.tools", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Armaduras</label>
                  <textarea
                    value={state.proficiencies.armor}
                    onChange={(e) =>
                      setField("proficiencies.armor", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Armas</label>
                  <textarea
                    value={state.proficiencies.weapons}
                    onChange={(e) =>
                      setField("proficiencies.weapons", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Visão no Escuro</label>
                  <input
                    type="text"
                    value={state.senses.darkvision}
                    onChange={(e) =>
                      setField("senses.darkvision", e.target.value)
                    }
                    placeholder="60 pés"
                  />
                </div>
                <div>
                  <label>Visão às Cegas</label>
                  <input
                    type="text"
                    value={state.senses.blindsight}
                    onChange={(e) =>
                      setField("senses.blindsight", e.target.value)
                    }
                  />
                </div>
              </div>
            </section>

            {/* RESISTÊNCIAS E IMUNIDADES */}
            <section className="form-section">
              <h2>Resistências, Imunidades e Vulnerabilidades</h2>
              <div className="form-grid-2">
                <div>
                  <label>Resistência de Dano</label>
                  <textarea
                    value={state.resistances.damage}
                    onChange={(e) =>
                      setField("resistances.damage", e.target.value)
                    }
                    placeholder="Fogo, Frio, ..."
                  />
                </div>
                <div>
                  <label>Resistência de Condição</label>
                  <textarea
                    value={state.resistances.condition}
                    onChange={(e) =>
                      setField("resistances.condition", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Imunidade de Dano</label>
                  <textarea
                    value={state.immunities.damage}
                    onChange={(e) => setField("immunities.damage", e.target.value)}
                  />
                </div>
                <div>
                  <label>Imunidade de Condição</label>
                  <textarea
                    value={state.immunities.condition}
                    onChange={(e) =>
                      setField("immunities.condition", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Vulnerabilidade de Dano</label>
                  <textarea
                    value={state.vulnerabilities.damage}
                    onChange={(e) =>
                      setField("vulnerabilities.damage", e.target.value)
                    }
                  />
                </div>
              </div>
            </section>

            {/* TRAÇOS, IDEAIS, LAÇOS, FALHAS */}
            <section className="form-section">
              <h2>Personalidade e Características</h2>
              <div className="form-grid-2">
                <div>
                  <label>Traços de Personalidade</label>
                  <textarea
                    value={state.traits}
                    onChange={(e) => setField("traits", e.target.value)}
                  />
                </div>
                <div>
                  <label>Ideais</label>
                  <textarea
                    value={state.ideals}
                    onChange={(e) => setField("ideals", e.target.value)}
                  />
                </div>
                <div>
                  <label>Laços</label>
                  <textarea
                    value={state.bonds}
                    onChange={(e) => setField("bonds", e.target.value)}
                  />
                </div>
                <div>
                  <label>Falhas</label>
                  <textarea
                    value={state.flaws}
                    onChange={(e) => setField("flaws", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* FEATURE E BACKSTORY */}
            <section className="form-section">
              <h2>Feature de Classe e História</h2>
              <div className="form-grid-1">
                <div>
                  <label>Feature de Classe</label>
                  <textarea
                    value={state.feature}
                    onChange={(e) => setField("feature", e.target.value)}
                  />
                </div>
                <div>
                  <label>História do Personagem</label>
                  <textarea
                    value={state.backstory}
                    onChange={(e) => setField("backstory", e.target.value)}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {page === "magia" && (
          <section className="form-section">
            <h2>Magias</h2>

            <div className="spell-section">
              <h3>Informações Básicas de Magia</h3>
              <div className="form-grid-3">
                <div>
                  <label>Habilidade de Lançamento</label>
                  <select
                    value={state.spells.spellcastingAbility}
                    onChange={(e) =>
                      setField("spells.spellcastingAbility", e.target.value)
                    }
                  >
                    <option value="">Nenhuma</option>
                    <option value="str">Força</option>
                    <option value="dex">Destreza</option>
                    <option value="con">Constituição</option>
                    <option value="int">Inteligência</option>
                    <option value="wis">Sabedoria</option>
                    <option value="cha">Carisma</option>
                  </select>
                </div>
                <div>
                  <label>DC de Salvação de Magia</label>
                  <input
                    type="text"
                    value={spellSaveDC}
                    disabled
                    className="readonly"
                  />
                </div>
                <div>
                  <label>Bônus de Ataque de Magia</label>
                  <input
                    type="text"
                    value={spellAttack}
                    disabled
                    className="readonly"
                  />
                </div>
              </div>
            </div>

            <div className="spell-section">
              <h3>Adicionar Magia</h3>
              <AddSpellForm onAdd={addSpell} />
            </div>

            {/* MAGIAS POR NÍVEL */}
            <div className="spells-by-level">
              <div className="spell-level">
                <h4>Truques ({state.spells.cantrips?.length || 0})</h4>
                <div className="spell-list">
                  {state.spells.cantrips?.map((spell, idx) => (
                    <div key={idx} className="spell-item">
                      <span>{spell}</span>
                      <button
                        onClick={() => removeSpell("cantrips", idx)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
                const levelKey = `level${level}`;
                const spells = state.spells[levelKey] || [];
                return (
                  <div key={levelKey} className="spell-level">
                    <h4>
                      Nível {level} ({spells.length})
                    </h4>
                    <div className="spell-list">
                      {spells.map((spell, idx) => (
                        <div key={idx} className="spell-item">
                          <span>{spell}</span>
                          <button
                            onClick={() => removeSpell(levelKey, idx)}
                            className="btn-remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {page === "equipment" && (
          <section className="form-section">
            <h2>Equipamento</h2>
            <div className="form-grid-1">
              <div>
                <label>Equipamento</label>
                <textarea
                  value={state.equipment}
                  onChange={(e) => setField("equipment", e.target.value)}
                  style={{ minHeight: "300px" }}
                />
              </div>
            </div>
          </section>
        )}

        {page === "notes" && (
          <section className="form-section">
            <h2>Anotações</h2>
            <div className="form-grid-1">
              <div>
                <label>Notas Gerais</label>
                <textarea
                  placeholder="Anotações livres..."
                  style={{ minHeight: "300px" }}
                />
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CONTROLES GLOBAIS */}
      <footer className="sheet-footer">
        <button onClick={reset} className="btn-reset">
          Limpar Ficha
        </button>
        <button onClick={exportJson} className="btn-export">
          Exportar JSON
        </button>
        <label className="btn-import">
          Importar JSON
          <input
            type="file"
            accept=".json"
            onChange={(e) => importJson(e.target.files?.[0])}
            style={{ display: "none" }}
          />
        </label>
      </footer>
    </div>
  );
}


/* =======================
   Subcomponente
======================= */

function AddSpellForm({ onAdd }) {
  const [level, setLevel] = useState("cantrips");
  const [name, setName] = useState("");

  return (
    <div>
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option value="cantrips">Truque</option>
        {[1,2,3,4,5,6,7,8,9].map(n =>
          <option key={n} value={`level${n}`}>Nível {n}</option>
        )}
      </select>

      <input
        placeholder="Nome da magia"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={() => {
        if (!name.trim()) return;
        onAdd(level, name.trim());
        setName("");
      }}>
        Adicionar Magia
      </button>
    </div>
  );
}
