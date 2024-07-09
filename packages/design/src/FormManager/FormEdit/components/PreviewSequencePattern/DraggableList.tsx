import React, { Children, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useFormManagerStore } from '../../../store';
import styles from '../../formEditStyles.module.css';

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
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  return (
    <div
      onFocus={event => {
        // Stop onFocus events from bubbling up to parent elements.
        event.stopPropagation();
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={event => {
          setActiveId(event.active.id);
        }}
        onDragEnd={event => {
          const { active, over } = event;
          setActiveId(null);

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
        onDragCancel={() => {
          setActiveId(null);
        }}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {arrayChildren.map((child, index) => {
            const patternId = order[index];
            if (patternId === undefined) {
              console.error('undefined patternId', index);
              return;
            }
            return (
              <SortableItem
                key={patternId}
                id={patternId}
                isActive={patternId === activeId}
                isOver={patternId === activeId}
              >
                {child}
              </SortableItem>
            );
          })}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <SortableItemOverlay>
              {arrayChildren[order.indexOf(activeId)]}
            </SortableItemOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const SortableItemOverlay = ({ children }: { children: React.ReactNode }) => {
  const context = useFormManagerStore(state => state.context);

  return (
    <div
      className={`${styles.draggableListWrapper} draggable-list-item-wrapper bg-white margin-bottom-3`}
      style={{
        boxShadow: '0 16px 24px rgba(0, 0, 0, 0.4)',
        cursor: 'grabbing',
        outline: '0.25rem solid #783cb9',
      }}
    >
      <div className="grid-row draggable-list-item">
        <div className={`${styles.draggableListButton} grid-col-12 width-full draggable-list-button padding-2`}
        style={{
          background: '#f0f0f0',
        }}
        >
          <svg
            className="usa-icon margin-x-auto display-block"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use
              xlinkHref={`${context.uswdsRoot}img/sprite.svg#drag_handle`}
            ></use>
          </svg>
        </div>
        <div className="grid-col-12 grid-col">{children}</div>
      </div>
    </div>
  );
};

const SortableItem = ({
  id,
  children,
  isActive,
  isOver,
}: {
  id: UniqueIdentifier;
  children: React.ReactNode;
  isActive: boolean;
  isOver: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const context = useFormManagerStore(state => state.context);

  return (
    <div
      className={`${styles.draggableListWrapper} draggable-list-item-wrapper bg-white margin-bottom-3 cursor-pointer`}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isOver ? 0.5 : 1,
        border: isOver ? '1px dashed #8168B3' : 'none',
        outline: isOver ? 'none' : '',
      }}
    >
      <div className="grid-row draggable-list-item">
        <div
          className={`${styles.draggableListButton} grid-col-12 width-full draggable-list-button padding-2`}
          {...listeners}
          {...attributes}
          style={{
            outline: isActive ? 'none' : '',
          }}
        >
          <svg
            className="usa-icon margin-x-auto display-block"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use
              xlinkHref={`${context.uswdsRoot}img/sprite.svg#drag_handle`}
            ></use>
          </svg>
        </div>
        <div className="grid-col-12 grid-col">{children}</div>
      </div>
    </div>
  );
};
