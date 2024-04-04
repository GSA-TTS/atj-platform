import React, { Children, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  getPattern,
  type Blueprint,
  type Pattern,
  PatternId,
} from '@atj/forms';

import { SequencePattern } from '@atj/forms/src/patterns/sequence';

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="editFieldsRowWrapper grid-row grid-gap">
        <div
          className="editPageGrabButtonWrapper grid-col-1 grid-col"
          {...listeners}
          {...attributes}
          style={{ cursor: 'grab' }}
        >
          <span className="grabber1">:::</span>
          <span className="grabber2">:::</span>
        </div>
        <div className="editFieldsWrapper grid-col-11 grid-col">{children}</div>
      </div>
    </li>
  );
};

type DraggableListProps = React.PropsWithChildren<{
  pattern: Pattern<SequencePattern>;
  form: Blueprint;
  setSelectedPattern: (pattern: Pattern) => void;
}>;
export const DraggableList: React.FC<DraggableListProps> = ({
  pattern,
  form,
  setSelectedPattern,
  children,
}) => {
  const [patterns, setPatterns] = useState<Pattern[]>(
    pattern.data.patterns.map((patternId: PatternId) => {
      return getPattern(form, patternId);
    })
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const arrayChildren = Children.toArray(children);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={event => {
        const { active, over } = event;
        if (over === null) {
          return;
        }
        if (active.id !== over.id) {
          const oldIndex = patterns.findIndex(pattern => {
            return pattern.id === active.id;
          });
          const newIndex = patterns.findIndex(pattern => {
            return pattern.id === over.id;
          });
          const newOrder = arrayMove(patterns, oldIndex, newIndex);
          setPatterns(newOrder);
          setSelectedPattern({
            id: pattern.id,
            type: pattern.type,
            data: {
              patterns: newOrder.map(pattern => pattern.id),
            },
          } satisfies SequencePattern);
        }
      }}
    >
      <SortableContext items={patterns} strategy={verticalListSortingStrategy}>
        <ul className="editFormWrapper">
          {arrayChildren.map((child, index) => (
            <SortableItem key={index} id={patterns[index].id}>
              {child}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
