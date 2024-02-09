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

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
} from '@atj/forms';
import { getEditComponentForFormElement } from '../user';
import { SequenceElement } from '@atj/forms/src/config/elements/sequence';

interface ItemProps<T> {
  id: string;
  form: FormDefinition;
  element: FormElement<T>;
  config: FormConfig;
}

const SortableItem = <T,>({ id, form, element, config }: ItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = getEditComponentForFormElement(element.type);

  return (
    <li ref={setNodeRef} style={style}>
      <div {...listeners} {...attributes} style={{ cursor: 'grab' }}>
        :::
      </div>
      <Component
        key={element.id}
        config={config}
        element={element}
        form={form}
      />
    </li>
  );
};

export const SequenceElementEdit = ({
  config,
  form,
  element,
}: {
  config: FormConfig;
  form: FormDefinition;
  element: SequenceElement;
}) => {
  const { register, setValue } = useFormContext();
  const [elements, setElements] = useState(
    element.data.elements.map(elementId => {
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
              id: element.id,
              type: element.type,
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
          <ul>
            <input type="hidden" {...register(`${element.id}.id`)} />
            <input type="hidden" {...register(`${element.id}.type`)} />
            <input type="hidden" {...register(`${element.id}`)} />
            {elements.map(elements => (
              <SortableItem
                key={elements.id}
                id={elements.id}
                config={config}
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
