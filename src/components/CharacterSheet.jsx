import { useEffect, useMemo, useState } from "react";
import { DND5E_SKILLS, DND5E_SAVES } from "../sheets/dnd5e.rules";
import AbilityScores from "./AbilityScores";
import SkillsList from "./SkillsList";
import SavingThrows from "./SavingThrows";
import EditableLabel from "./EditableLabel";

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
  const [editMode, setEditMode] = useState(false);
  
  const [customLabels, setCustomLabels] = useState(() => {
    try {
      const raw = localStorage.getItem("customLabels");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("characterSheet", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("customLabels", JSON.stringify(customLabels));
  }, [customLabels]);

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

  const getLabel = (key, defaultLabel) => {
    return customLabels[key] || defaultLabel;
  };

  const setLabel = (key, newLabel) => {
    setCustomLabels(prev => ({
      ...prev,
      [key]: newLabel
    }));
  };

  const resetAllLabels = () => {
    setCustomLabels({});
  };

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

        <button
          onClick={() => setEditMode(!editMode)}
          className={`tab tab-edit ${editMode ? "active" : ""}`}
          title={editMode ? "Desativar modo de edição" : "Ativar modo de edição"}
        >
          {editMode ? "✓ Editando" : "🔒 Editar"}
        </button>
      </nav>

      {/* CONTEÚDO DINÂMICO */}
      <div className="sheet-content">
        {page === "ficha" && (
          <>
            {/* INFORMAÇÕES BÁSICAS */}
            <section className="form-section">
              <div className="form-section-header">
                <EditableLabel
                  labelKey="sec-info-basicas"
                  defaultLabel="Informações Básicas"
                  customLabels={customLabels}
                  setLabel={setLabel}
                  editMode={editMode}
                  isHeading={true}
                />
                {editMode && (
                  <button className="btn-reset-labels" onClick={resetAllLabels}>
                    Resetar Labels
                  </button>
                )}
              </div>
              <div className="form-grid-3">
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="nome"
                    defaultLabel="Nome"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.name}
                    onChange={(e) => setField("name", e.target.value)}
                    disabled={editMode}
                  />
                </div>
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="classe"
                    defaultLabel="Classe"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.class}
                    onChange={(e) => setField("class", e.target.value)}
                    disabled={editMode}
                  />
                </div>
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="raca"
                    defaultLabel="Raça"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.race}
                    onChange={(e) => setField("race", e.target.value)}
                    disabled={editMode}
                  />
                </div>
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="antecedente"
                    defaultLabel="Antecedente"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.background}
                    onChange={(e) => setField("background", e.target.value)}
                    disabled={editMode}
                  />
                </div>
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="jogador"
                    defaultLabel="Jogador"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.player}
                    onChange={(e) => setField("player", e.target.value)}
                    disabled={editMode}
                  />
                </div>
                <div className={editMode ? "field-editable" : ""}>
                  <EditableLabel
                    labelKey="alinhamento"
                    defaultLabel="Alinhamento"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.alignment}
                    onChange={(e) => setField("alignment", e.target.value)}
                    disabled={editMode}
                  />
                </div>
              </div>
            </section>

            {/* NÍVEL, XP, CA, HP */}
            <section className="form-section">
              <EditableLabel
                labelKey="sec-prog-defesa"
                defaultLabel="Progressão e Defesa"
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
                isHeading={true}
              />
              <div className="form-grid-4">
                <div>
                  <EditableLabel
                    labelKey="nivel"
                    defaultLabel="Nível"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={state.level}
                    onChange={(e) => setField("level", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="xp"
                    defaultLabel="XP"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    min="0"
                    value={state.experience}
                    onChange={(e) => setField("experience", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="ca"
                    defaultLabel="CA"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    value={state.ac}
                    onChange={(e) => setField("ac", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="hp-atual"
                    defaultLabel="HP Atual"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    value={state.hp}
                    onChange={(e) => setField("hp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="hp-maximo"
                    defaultLabel="HP Máximo"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    value={state.maxHp}
                    onChange={(e) => setField("maxHp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="hp-temporario"
                    defaultLabel="HP Temporário"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="number"
                    value={state.tempHp}
                    onChange={(e) => setField("tempHp", Number(e.target.value))}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="velocidade"
                    defaultLabel="Velocidade"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={state.speed}
                    onChange={(e) => setField("speed", e.target.value)}
                    placeholder="30 pés"
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="bonus-prof"
                    defaultLabel="Bônus de Proficiência"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
              />
            </section>

            {/* HABILIDADES E TESTES */}
            <section className="form-section">
              <SkillsList
                skills={state.skills}
                proficiency={prof}
                abilities={state.abilities}
                onChange={(newSkills) => setField("skills", newSkills)}
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
              />
            </section>

            <section className="form-section">
              <SavingThrows
                saves={state.savingThrows}
                proficiency={prof}
                abilities={state.abilities}
                onChange={(newSaves) => setField("savingThrows", newSaves)}
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
              />
            </section>

            {/* PROFICIÊNCIAS E SENTIDOS */}
            <section className="form-section">
              <EditableLabel
                labelKey="sec-proficiencias"
                defaultLabel="Proficiências e Sentidos"
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
                isHeading={true}
              />
              <div className="form-grid-2">
                <div>
                  <EditableLabel
                    labelKey="prof-linguagens"
                    defaultLabel="Linguagens"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.proficiencies.languages}
                    onChange={(e) =>
                      setField("proficiencies.languages", e.target.value)
                    }
                    placeholder="Comum, Élfico, ..."
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="prof-ferramentas"
                    defaultLabel="Ferramentas"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.proficiencies.tools}
                    onChange={(e) =>
                      setField("proficiencies.tools", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="prof-armaduras"
                    defaultLabel="Armaduras"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.proficiencies.armor}
                    onChange={(e) =>
                      setField("proficiencies.armor", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="prof-armas"
                    defaultLabel="Armas"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.proficiencies.weapons}
                    onChange={(e) =>
                      setField("proficiencies.weapons", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="sentido-darkvision"
                    defaultLabel="Visão no Escuro"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
                  <EditableLabel
                    labelKey="sentido-blindsight"
                    defaultLabel="Visão às Cegas"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
              <EditableLabel
                labelKey="sec-resistencias"
                defaultLabel="Resistências, Imunidades e Vulnerabilidades"
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
                isHeading={true}
              />
              <div className="form-grid-2">
                <div>
                  <EditableLabel
                    labelKey="res-dano"
                    defaultLabel="Resistência de Dano"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.resistances.damage}
                    onChange={(e) =>
                      setField("resistances.damage", e.target.value)
                    }
                    placeholder="Fogo, Frio, ..."
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="res-condicao"
                    defaultLabel="Resistência de Condição"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.resistances.condition}
                    onChange={(e) =>
                      setField("resistances.condition", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="imun-dano"
                    defaultLabel="Imunidade de Dano"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.immunities.damage}
                    onChange={(e) => setField("immunities.damage", e.target.value)}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="imun-condicao"
                    defaultLabel="Imunidade de Condição"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.immunities.condition}
                    onChange={(e) =>
                      setField("immunities.condition", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="vuln-dano"
                    defaultLabel="Vulnerabilidade de Dano"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
              <EditableLabel
                labelKey="sec-personalidade"
                defaultLabel="Personalidade e Características"
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
                isHeading={true}
              />
              <div className="form-grid-2">
                <div>
                  <EditableLabel
                    labelKey="tracos"
                    defaultLabel="Traços de Personalidade"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.traits}
                    onChange={(e) => setField("traits", e.target.value)}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="ideais"
                    defaultLabel="Ideais"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.ideals}
                    onChange={(e) => setField("ideals", e.target.value)}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="lacos"
                    defaultLabel="Laços"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.bonds}
                    onChange={(e) => setField("bonds", e.target.value)}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="falhas"
                    defaultLabel="Falhas"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.flaws}
                    onChange={(e) => setField("flaws", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* FEATURE E BACKSTORY */}
            <section className="form-section">
              <EditableLabel
                labelKey="sec-feature"
                defaultLabel="Feature de Classe e História"
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
                isHeading={true}
              />
              <div className="form-grid-1">
                <div>
                  <EditableLabel
                    labelKey="feature"
                    defaultLabel="Feature de Classe"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <textarea
                    value={state.feature}
                    onChange={(e) => setField("feature", e.target.value)}
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="backstory"
                    defaultLabel="História do Personagem"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
            <EditableLabel
              labelKey="sec-magias"
              defaultLabel="Magias"
              customLabels={customLabels}
              setLabel={setLabel}
              editMode={editMode}
              isHeading={true}
            />

            <div className="spell-section">
              <h3>
                <EditableLabel
                  labelKey="mag-info-basica"
                  defaultLabel="Informações Básicas de Magia"
                  customLabels={customLabels}
                  setLabel={setLabel}
                  editMode={editMode}
                />
              </h3>
              <div className="form-grid-3">
                <div>
                  <EditableLabel
                    labelKey="mag-habil-lancamento"
                    defaultLabel="Habilidade de Lançamento"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
                  <EditableLabel
                    labelKey="mag-dc-salvacao"
                    defaultLabel="DC de Salvação de Magia"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                  <input
                    type="text"
                    value={spellSaveDC}
                    disabled
                    className="readonly"
                  />
                </div>
                <div>
                  <EditableLabel
                    labelKey="mag-bonus-ataque"
                    defaultLabel="Bônus de Ataque de Magia"
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
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
              <h3>
                <EditableLabel
                  labelKey="mag-adicionar"
                  defaultLabel="Adicionar Magia"
                  customLabels={customLabels}
                  setLabel={setLabel}
                  editMode={editMode}
                />
              </h3>
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
            <EditableLabel
              labelKey="sec-equipamento"
              defaultLabel="Equipamento"
              customLabels={customLabels}
              setLabel={setLabel}
              editMode={editMode}
              isHeading={true}
            />
            <div className="form-grid-1">
              <div>
                <EditableLabel
                  labelKey="equip-listagem"
                  defaultLabel="Equipamento"
                  customLabels={customLabels}
                  setLabel={setLabel}
                  editMode={editMode}
                />
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
            <EditableLabel
              labelKey="sec-anotacoes"
              defaultLabel="Anotações"
              customLabels={customLabels}
              setLabel={setLabel}
              editMode={editMode}
              isHeading={true}
            />
            <div className="form-grid-1">
              <div>
                <EditableLabel
                  labelKey="anotacoes-gerais"
                  defaultLabel="Notas Gerais"
                  customLabels={customLabels}
                  setLabel={setLabel}
                  editMode={editMode}
                />
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
