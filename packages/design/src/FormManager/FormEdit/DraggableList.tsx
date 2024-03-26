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
  getFormElement,
  type FormDefinition,
  type FormElement,
  FormElementId,
} from '@atj/forms';

import { SequenceElement } from '@atj/forms/src/elements/sequence';

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
  element: FormElement<SequenceElement>;
  form: FormDefinition;
  setSelectedElement: (element: FormElement) => void;
}>;
export const DraggableList: React.FC<DraggableListProps> = ({
  element,
  form,
  setSelectedElement,
  children,
}) => {
  const [elements, setElements] = useState<FormElement[]>(
    element.data.elements.map((elementId: FormElementId) => {
      return getFormElement(form, elementId);
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
          const oldIndex = elements.findIndex(element => {
            return element.id === active.id;
          });
          const newIndex = elements.findIndex(element => {
            return element.id === over.id;
          });
          const newOrder = arrayMove(elements, oldIndex, newIndex);
          setElements(newOrder);
          setSelectedElement({
            id: element.id,
            type: element.type,
            data: {
              elements: newOrder.map(element => element.id),
            },
            default: {
              elements: [],
            },
            required: element.required,
          } satisfies SequenceElement);
        }
      }}
    >
      <SortableContext items={elements} strategy={verticalListSortingStrategy}>
        <ul className="editFormWrapper">
          {arrayChildren.map((child, index) => (
            <SortableItem key={index} id={elements[index].id}>
              {child}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
