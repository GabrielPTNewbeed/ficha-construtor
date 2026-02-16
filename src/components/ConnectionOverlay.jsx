import { useEffect, useRef } from "react";

export default function ConnectionOverlay({ widgets, editMode }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !editMode) return;

    const svg = svgRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // Limpar linhas anteriores
    svg.querySelectorAll("line, g").forEach(el => el.remove());

    // Criar grupo para linhas
    const linesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    linesGroup.setAttribute("class", "connection-lines");

    // Para cada widget com dependências
    widgets.forEach(widget => {
      if (!widget.dependsOn || widget.dependsOn.length === 0) return;

      const sourceElement = document.querySelector(`[data-widget-id="${widget.id}"]`);
      if (!sourceElement) return;

      const sourceRect = sourceElement.getBoundingClientRect();
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top;

      // Desenhar linha para cada dependência
      widget.dependsOn.forEach(depId => {
        const targetElement = document.querySelector(`[data-widget-id="${depId}"]`);
        if (!targetElement) return;

        const targetRect = targetElement.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height;

        // Linha com seta
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", sourceCenterX);
        line.setAttribute("y1", sourceCenterY);
        line.setAttribute("x2", targetCenterX);
        line.setAttribute("y2", targetCenterY);
        line.setAttribute("stroke", "#FF5722");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("stroke-dasharray", "5,5");
        line.setAttribute("pointer-events", "none");

        linesGroup.appendChild(line);

        // Adicionar círculo na ponta da seta
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", sourceCenterX);
        circle.setAttribute("cy", sourceCenterY);
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", "#FF5722");
        circle.setAttribute("pointer-events", "none");
        linesGroup.appendChild(circle);
      });
    });

    svg.appendChild(linesGroup);
  }, [widgets, editMode]);

  if (!editMode) return null;

  return (
    <svg
      ref={svgRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 500,
        pointerEvents: "none"
      }}
    />
  );
}
