import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getBlockDefinition } from "@newsite/blocks";
import type { BlockInstance } from "@newsite/document";

type BlockListProps = {
  blocks: BlockInstance[];
  selectedBlockId: string | null;
  onSelect: (blockId: string) => void;
  onReorder: (blocks: BlockInstance[]) => void;
};

type SortableItemProps = {
  block: BlockInstance;
  index: number;
  selected: boolean;
  onSelect: (blockId: string) => void;
};

function SortableBlockItem({ block, index, selected, onSelect }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });
  const definition = getBlockDefinition(block.type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={[
        "block-list__item",
        selected ? "block-list__item--selected" : "",
        isDragging ? "block-list__item--dragging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-block-id={block.id}
    >
      <button
        type="button"
        className="block-list__handle"
        aria-label={`Déplacer le bloc ${definition?.label ?? block.type}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>
      <button
        type="button"
        className="block-list__select"
        data-testid={`select-block-${block.type}`}
        onClick={() => onSelect(block.id)}
        aria-pressed={selected}
      >
        <span className="block-list__index">{index + 1}</span>
        <span className="block-list__type">{definition?.label ?? block.type}</span>
      </button>
    </li>
  );
}

/**
 * Liste ordonnée de blocs avec @dnd-kit Sortable.
 */
export function BlockList({ blocks, selectedBlockId, onSelect, onReorder }: BlockListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    onReorder(arrayMove(blocks, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
        <ul className="block-list" aria-label="Ordre des blocs">
          {blocks.map((block, index) => (
            <SortableBlockItem
              key={block.id}
              block={block}
              index={index}
              selected={selectedBlockId === block.id}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
