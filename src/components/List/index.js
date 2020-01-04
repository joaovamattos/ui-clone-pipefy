import React, { useContext } from "react";

import { useDrop } from 'react-dnd';

import { MdAdd } from "react-icons/md";

import BoardContext from '../Board/context';

import Card from "../Card";

import { Container, NoCards } from "./styles";

export default function List({ data, index: listIndex }) {

  const { moveToList } = useContext(BoardContext);

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

  return (
    <Container done={data.done} ref={dropRef}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
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
  );
}
