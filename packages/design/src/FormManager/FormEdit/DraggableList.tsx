import React, { Children } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({
  id,
  children,
}: {
  id: UniqueIdentifier;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
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
    </div>
  );
};

type DraggableListProps = React.PropsWithChildren<{
  order: UniqueIdentifier[];
  updateOrder: (order: UniqueIdentifier[]) => void;
}>;
export const DraggableList: React.FC<DraggableListProps> = ({
  children,
  order,
  updateOrder,
}) => {
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
          const oldIndex = order.indexOf(active.id);
          const newIndex = order.indexOf(over.id);
          const newOrder = arrayMove(order, oldIndex, newIndex);
          updateOrder(newOrder);
        }
      }}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        {arrayChildren.map((child, index) => {
          const patternId = order[index];
          return (
            <SortableItem key={patternId} id={patternId}>
              {child}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
