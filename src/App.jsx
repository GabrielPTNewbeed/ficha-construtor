import CharacterSheet from "./components/CharacterSheet";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0f1724", color: '#eee', overflow: 'hidden' }}>
      <div style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid #333', background: '#081021' }}>
        <strong style={{ fontSize: 18 }}>Ficha Construtor — D&D 5e</strong>
      </div>
      <div style={{ width: '100%', height: 'calc(100% - 50px)', overflow: 'auto' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: 12 }}>
          <CharacterSheet />
        </div>
      </div>
    </div>
  );
}
