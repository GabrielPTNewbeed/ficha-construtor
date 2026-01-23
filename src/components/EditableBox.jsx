import { Rnd } from "react-rnd";

export default function EditableBox({ id, onValueChange, title = "", content = "", x = 50, y = 50 }) {
  return (
    <Rnd
      default={{ x, y, width: 200, height: 80 }}
      bounds="window"
      dragHandleClassName="drag-handle"
    >
    <div className="w-full h-full border border-gray-400 rounded bg-white flex flex-col">
      {/* Campo de título */}
      <input
        id={`title-${id}`}
        type="text"
        className="w-full p-1 font-bold border-b outline-none"
        placeholder="Título..."
        onChange={(e) => onValueChange(id, { field: "title", value: e.target.value })}
      />

        {/* Campo de conteúdo */}
        <textarea
          id={`content-${id}`}
          className="w-full flex-1 p-2 outline-none resize-none"
          placeholder="Digite aqui..."
          onChange={(e) => onValueChange(id, { field: "content", value: e.target.value })}
        />
      </div>
    </Rnd>
  );
}