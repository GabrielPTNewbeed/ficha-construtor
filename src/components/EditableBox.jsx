import { Rnd } from "react-rnd";

export default function EditableBox({
  id,
  title = "",
  content = "",
  x = 50,
  y = 50,
  width = 200,
  height = 80,
  onChange
}) {
  return (
    <Rnd
      bounds="parent"
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(_, d) => {
        onChange(id, { field: "position", value: { x: d.x, y: d.y } });
      }}
      onResizeStop={(_, __, ref, ___, pos) => {
        onChange(id, {
          field: "size",
          value: {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            x: pos.x,
            y: pos.y
          }
        });
      }}
      dragHandleClassName="drag-handle"
    >
      <div className="w-full h-full border border-gray-400 rounded bg-white flex flex-col overflow-hidden">
        
        {/* Título / Drag handle */}
        <input
          className="drag-handle w-full p-1 font-bold border-b outline-none cursor-move"
          placeholder="Título..."
          value={title}
          onChange={(e) =>
            onChange(id, { field: "title", value: e.target.value })
          }
        />

        {/* Conteúdo */}
        <textarea
          className="w-full flex-1 p-2 outline-none resize-none"
          placeholder="Digite aqui..."
          value={content}
          onChange={(e) =>
            onChange(id, { field: "content", value: e.target.value })
          }
        />
      </div>
    </Rnd>
  );
}
