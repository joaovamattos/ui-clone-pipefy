import React, { useState } from 'react';
import produce from 'immer';

import { MdAdd } from "react-icons/md";

import { loadLists } from '../../services/api';
import { NoCards } from '../List/styles';

import BoardContext from './context';

import List from '../List';

import { Container, NewListButton } from './styles';

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

  function moveList(from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[from];

      draft.splice(from, 1);
      draft.splice(to, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move, moveToList, moveList }}>
      <Container>
        {lists.map((list, index) => <List key={list.id} index={index} data={list} done={index === lists.length - 1 && index > 0} />)}
        <NewListButton>
          <MdAdd size={36} color="rgba(0, 0, 0, 0.2)" />
          <NoCards style={{marginTop: 10}} >Nova Lista incrível</NoCards>
        </NewListButton>
      </Container>
    </BoardContext.Provider>
  );
}
