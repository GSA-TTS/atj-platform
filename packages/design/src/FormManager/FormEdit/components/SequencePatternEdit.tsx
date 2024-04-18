import React, { useState } from 'react';
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
import { useFormContext } from 'react-hook-form';

import { SequenceProps, type Pattern } from '@atj/forms';
import { type SequencePattern } from '@atj/forms/src/patterns/sequence';

import { PatternComponent } from '../../../Form';

import { useFormEditStore, usePattern } from '../store';
import { PatternEditForm } from '../PatternEditForm';

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
      <div className="grid-row grid-gap">
        <div
          className="grid-col-1 grid-col"
          {...listeners}
          {...attributes}
          style={{ cursor: 'grab' }}
        >
          <span className="grabber1">:::</span>
          <span className="grabber2">:::</span>
        </div>
        <div className="grid-col-11 grid-col">{children}</div>
      </div>
    </li>
  );
};

const SequencePatternEdit: PatternComponent<SequenceProps> = props => {
  const { register, setValue } = useFormContext();
  const { context, form } = useFormEditStore(state => ({
    context: state.context,
    form: state.form,
  }));
  const pattern = usePattern(props._patternId);
  const [patterns, setPatterns] = useState<Pattern[]>(
    pattern.data.patterns.map((patternId: string) => {
      return form.patterns[patternId];
    })
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <PatternEditForm>
      <fieldset>
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
              setValue(pattern.id, {
                ...pattern,
                data: {
                  patterns: newOrder.map(pattern => pattern.id),
                },
              } satisfies SequencePattern);
            }
          }}
        >
          <SortableContext
            items={patterns}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              <input type="hidden" {...register(`${pattern.id}.id`)} />
              <input type="hidden" {...register(`${pattern.id}.type`)} />
              <input type="hidden" {...register(`${pattern.id}.patterns`)} />
              {patterns.map(pattern => {
                const EditComponent = context.editComponents[pattern.type];
                return (
                  <SortableItem key={pattern.id} id={pattern.id}>
                    <EditComponent {...props} />;
                  </SortableItem>
                );
              })}
            </ul>
          </SortableContext>
        </DndContext>
      </fieldset>
    </PatternEditForm>
  );
};

export default SequencePatternEdit;
