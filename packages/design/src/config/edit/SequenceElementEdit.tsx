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
import { type SequenceElement } from '@atj/forms/src/patterns/sequence';
import {
  type FormEditUIContext,
  type PatternEditComponent,
} from '../../FormManager/FormEdit/types';

interface ItemProps<T> {
  id: string;
  form: Blueprint;
  element: Pattern<T>;
  context: FormEditUIContext;
}

const SortableItem = <T,>({ id, form, element, context }: ItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = context.editComponents[element.type];

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
        <div className="editFieldsWrapper grid-col-11 grid-col">
          <Component
            key={element.id}
            context={context}
            element={element}
            form={form}
          />
        </div>
      </div>
    </li>
  );
};

const SequenceElementEdit: PatternEditComponent<SequenceElement> = ({
  context,
  form,
  element,
}) => {
  const { register, setValue } = useFormContext();
  const [elements, setElements] = useState<Pattern[]>(
    element.data.elements.map((elementId: string) => {
      return form.elements[elementId];
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
            const oldIndex = elements.findIndex(element => {
              return element.id === active.id;
            });
            const newIndex = elements.findIndex(element => {
              return element.id === over.id;
            });
            const newOrder = arrayMove(elements, oldIndex, newIndex);
            setElements(newOrder);
            setValue(element.id, {
              ...element,
              data: {
                elements: newOrder.map(element => element.id),
              },
            } satisfies SequenceElement);
          }
        }}
      >
        <SortableContext
          items={elements}
          strategy={verticalListSortingStrategy}
        >
          <ul className="editFormWrapper">
            <input type="hidden" {...register(`${element.id}.id`)} />
            <input type="hidden" {...register(`${element.id}.type`)} />
            <input type="hidden" {...register(`${element.id}.elements`)} />
            {elements.map(elements => (
              <SortableItem
                key={elements.id}
                id={elements.id}
                context={context}
                element={elements}
                form={form}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </fieldset>
  );
};

export default SequenceElementEdit;
