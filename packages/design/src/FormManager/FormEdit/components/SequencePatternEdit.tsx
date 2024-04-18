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

import { type Blueprint, type Pattern } from '@atj/forms';
import { type SequencePattern } from '@atj/forms/src/patterns/sequence';
import { type FormEditUIContext, type PatternEditComponent } from '../types';

interface ItemProps<T> {
  id: string;
  form: Blueprint;
  pattern: Pattern<T>;
  context: FormEditUIContext;
}

const SortableItem = <T,>({ id, form, pattern, context }: ItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = context.editComponents[pattern.type];

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
        <div className="editFieldsWrapper grid-col-11 grid-col">
          <Component
            key={pattern.id}
            context={context}
            pattern={pattern}
            form={form}
          />
        </div>
      </div>
    </li>
  );
};

const SequencePatternEdit: PatternEditComponent<SequencePattern> = ({
  context,
  form,
  pattern,
}) => {
  const { register, setValue } = useFormContext();
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
            {patterns.map(patterns => (
              <SortableItem
                key={patterns.id}
                id={patterns.id}
                context={context}
                pattern={patterns}
                form={form}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </fieldset>
  );
};

export default SequencePatternEdit;
