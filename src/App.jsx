import CharacterSheet from "./components/CharacterSheet";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <strong>Ficha Construtor — D&D 5e</strong>
      </header>

      <main className="app-content">
        <CharacterSheet />
      </main>
    </div>
  );
}
