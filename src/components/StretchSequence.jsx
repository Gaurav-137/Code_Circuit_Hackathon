import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialStretches = [
  { id: 'stretch-1', name: 'Neck Stretch', duration: 30 },
  { id: 'stretch-2', name: 'Shoulder Rolls', duration: 40 },
  { id: 'stretch-3', name: 'Side Bends', duration: 30 },
  { id: 'stretch-4', name: 'Hamstring Stretch', duration: 45 },
];

export default function StretchSequence() {
  const [stretches, setStretches] = useState(initialStretches);
  const [timers, setTimers] = useState({});

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(stretches);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setStretches(reordered);
  };

  const startTimer = (id, duration) => {
    if (timers[id]) return;

    setTimers((prev) => ({ ...prev, [id]: duration }));

    const interval = setInterval(() => {
      setTimers((prev) => {
        if (prev[id] <= 1) {
          clearInterval(interval);
          const copy = { ...prev };
          delete copy[id];
          return copy;
        }
        return { ...prev, [id]: prev[id] - 1 };
      });
    }, 1000);
  };

  return (
    <div>
      <h2>Interactive Stretch Sequence</h2>
      <p>Drag to reorder. Click timer to start.</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stretch-list">
          {(provided) => (
            <ul
              className="stretch-sequence-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stretches.map(({ id, name, duration }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(providedDrag) => (
                    <li
                      className="stretch-sequence-item"
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      {...providedDrag.dragHandleProps}
                    >
                      <span>
                        {name} - {duration}s
                      </span>
                      <button onClick={() => startTimer(id, duration)}>
                        {timers[id] ? timers[id] + 's' : 'Start'}
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
