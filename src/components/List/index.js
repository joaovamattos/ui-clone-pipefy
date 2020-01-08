import React, { useContext, useRef, useState } from "react";

import { useDrag, useDrop } from 'react-dnd';

import { MdAdd } from "react-icons/md";

import BoardContext from '../Board/context';
import ListContext from './context';

import Card from "../Card";
import CardForm from '../CardForm';

import { Container, NoCards } from "./styles";

export default function List({ data, index: listIndex, done }) {
  const [showForm, setShowForm] = useState(false);

  const { moveToList, moveList } = useContext(BoardContext);
  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'LIST', listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [,dropRef] = useDrop({
    accept: 'CARD',
    hover(item) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const draggedIndex = item.index; // card arrastado
      
      // Verifica se o card está sendo arrastado para cima dele mesmo
      if (draggedListIndex === targetListIndex) {
        return;
      }
      
      const newIndex = moveToList(draggedListIndex, targetListIndex, draggedIndex);     

      item.index = newIndex;
      item.listIndex = targetListIndex;
    },
  });

  const [,dropListRef] = useDrop({
    accept: 'LIST',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      
      if (draggedListIndex === targetListIndex) {
        return;
      }
      
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = targetSize.width / 2;
      
      const draggedOffset = monitor.getClientOffset();
      const draggedLeft = draggedOffset.x - targetSize.left;
      
      if (draggedListIndex < targetListIndex && draggedLeft < targetCenter){
        return;
      }

      if (draggedListIndex > targetListIndex && draggedLeft > targetCenter){
        return;
      }

      moveList(draggedListIndex, targetListIndex);

      item.listIndex = targetListIndex;            
    },
  });

  dragRef(dropRef(dropListRef(ref)));

  return (
    <ListContext.Provider value={{ setShowForm }}>
      <Container done={done} ref={ref} isDragging={isDragging}>
        <header>
          <h2>{data.title}</h2>
          {listIndex === 0 && (
            <button type="button" onClick={() => setShowForm(true)}>
              <MdAdd size={24} color="#fff" />
            </button>
          )}
        </header>
        <ul>
          {data.cards.length > 0 ? (data.cards.map((card, index) => (
            <Card key={card.id} listIndex={listIndex} index={index} data={card} />
            ))) : <NoCards>Lista vazia :(</NoCards>}
        </ul>
      </Container>
      { showForm && <CardForm /> }
    </ListContext.Provider>
  );
}
