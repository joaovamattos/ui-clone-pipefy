import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [,dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index; // card arrastado
      const targetIndex = index; // card alvo
      
      // Verifica se o card está sendo arrastado para cima dele mesmo
      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      // Retorna o quanto do item foi arrastado
      const draggedOffset = monitor.getClientOffset();
      // Subitraindo a distancia que o card percorreu do topo pela distancia que o alvo se encontra do topo
      const draggedTop = draggedOffset.y - targetSize.top;

      // Se o drag vier antes do item em que estou arrastando 
      // e a posição do meu drag for menor que o centro do item
      if (draggedIndex < targetIndex && draggedTop < targetCenter){
        return;
      }

      // Se o drag estiver depois do item em que estou arrastando
      // e a posição do meu drag for mais que o centro do item
      if (draggedIndex > targetIndex && draggedTop > targetCenter){
        return;
      }
      
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);     

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
        
      </header>
      <p>{data.content}</p>
      { data.user && <img src={data.user} alt="Foto de perfil" /> }
    </Container>
  );
}
