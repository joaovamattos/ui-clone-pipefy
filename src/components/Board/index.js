import React, { useState } from 'react';
import produce from 'immer';

import { loadLists } from '../../services/api';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }));  
  }

  function moveToList(fromList, toList, card) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[card];

      draft[fromList].cards.splice(card, 1);
      draft[toList].cards.push(dragged);
    }));
    return lists[toList].cards.length;
  }

  return (
    <BoardContext.Provider value={{ lists, move, moveToList }}>
      <Container>
        {lists.map((list, index) => <List key={index} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
