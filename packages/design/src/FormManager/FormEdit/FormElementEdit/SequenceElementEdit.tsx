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

import { type FormDefinition, type FormElement } from '@atj/forms';
import { type SequenceElement } from '@atj/forms/src/elements/sequence';

import RenderField from './RenderField';
import { useFormContext } from 'react-hook-form';

interface ItemProps {
  id: string;
  form: FormDefinition;
  element: FormElement;
}

const SortableItem = ({ id, form, element }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="editFieldsRowWrapper grid-row grid-gap">
        <div className="editPageGrabButtonWrapper grid-col-1 grid-col" {...listeners} {...attributes} style={{ cursor: 'grab' }}>
          <span className="grabber1">:::</span>
          <span className="grabber2">:::</span>
        </div>
        <div className="editFieldsWrapper grid-col-11 grid-col">
          <RenderField key={element.id} element={element} form={form} />
        </div>  
      </div>
    </li>
  );
};

export const SequenceElementEdit = ({
  element,
  form,
}: {
  element: SequenceElement;
  form: FormDefinition;
}) => {
  const { register, setValue } = useFormContext();
  const [elements, setElements] = useState(
    element.elements.map(elementId => {
      return form.elements[elementId];
    })
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
            elements: newOrder.map(element => element.id),
          });
        }
      }}
    >
      <SortableContext items={elements} strategy={verticalListSortingStrategy}>
        <ul className="editFormWrapper">
          <input type="hidden" {...register(`${element.id}.id`)} />
          <input type="hidden" {...register(`${element.id}.type`)} />
          <input type="hidden" {...register(`${element.id}.elements`)} />
          {elements.map(elements => (
            <SortableItem
              key={elements.id}
              id={elements.id}
              element={elements}
              form={form}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
