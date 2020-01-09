import React, { useState, useContext } from "react";
import produce from 'immer';
import {
  Form,
  Input,
  Title,
  Button,
  Container as FormContainer,
  CloseButton,
  Label
} from "../CardForm/styles";

import BoardContext from '../Board/context';

import { MdClose } from 'react-icons/md';

export default function ListForm() {

  const { setShowForm, setLists, lists } = useContext(BoardContext);

  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    
    if (title === '') return
    const newList = {
      id: lists.length + 1,
      title, 
      cards: []
    };

    setLists(produce(lists, draft => {
      draft.unshift(newList);
    }));

    setShowForm(false);
  }

  return (
    <FormContainer hgt="280px">
      <Form onSubmit={handleSubmit}>
        <CloseButton type="button" onClick={() => setShowForm(false)}>
          <MdClose color="#999" size={20} />
        </CloseButton>
        <Title>{title ? title : 'Nova lista incrível'}</Title>
        <Label>Nova lista</Label>
        <Input placeholder="O melhor nome para sua lista" value={title} onChange={event => setTitle(event.target.value)} />
        <Button>Criar lista</Button>
      </Form>
    </FormContainer>
  );
}
