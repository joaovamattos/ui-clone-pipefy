import React, { useState, useContext } from 'react';
import produce from 'immer';

import { MdClose } from 'react-icons/md';

import ListContext from '../List/context';
import BoardContext from '../Board/context';

import { Container, Form, CloseButton, Title, Label, Input, TextArea, Button, ColorLabel } from './styles';

export default function CardForm() {
  const { setShowForm } = useContext(ListContext);
  const { setLists, lists } = useContext(BoardContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [label1Selected, setLabel1Selected] = useState(false);
  const [label2Selected, setLabel2Selected] = useState(false);
  const [label3Selected, setLabel3Selected] = useState(false);
  const [label4Selected, setLabel4Selected] = useState(false);
  const [label5Selected, setLabel5Selected] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (title === '') return

    let draft = [];
    if (label1Selected) draft.push('#FE4A49')
    if (label2Selected) draft.push('#FF9F1C')
    if (label3Selected) draft.push('#FED766')
    if (label4Selected) draft.push('#59CD90')
    if (label5Selected) draft.push('#4392F1')

    const newCard = {
      id: lists[0].cards.length + 1,
      content: title,
      labels: draft,
      user: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/profile.png'
    };

    setLists(produce(lists, draft => {
      draft[0].cards.unshift(newCard);
    }));

    setShowForm(false);
  }

  return (
    <Container hgt="500px" >
      <CloseButton type="button" onClick={() => setShowForm(false)}>
        <MdClose color="#999" size={20} />
      </CloseButton>
      <Form onSubmit={handleSubmit}>

        <Title>{ title ? title : 'Nova tarefa incrível' }</Title>

        <Label>Tarefa *</Label>
        <Input 
          type="text" 
          placeholder="Sua tarefa importante"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Descrição</Label>
        <TextArea 
          type="text" 
          placeholder="Do que essa tarefa se trata?" 
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label>Labels</Label>
        <div>
          <ColorLabel color="#FE4A49" checked={label1Selected}>
            <input type="checkbox" onClick={() => setLabel1Selected(!label1Selected)} />
          </ColorLabel>
          <ColorLabel color="#FF9F1C" checked={label2Selected}>
            <input type="checkbox" onClick={() => setLabel2Selected(!label2Selected)} />
          </ColorLabel>
          <ColorLabel color="#FED766" checked={label3Selected}>
            <input type="checkbox" onClick={() => setLabel3Selected(!label3Selected)} />
          </ColorLabel>
          <ColorLabel color="#59CD90" checked={label4Selected}>
            <input type="checkbox" onClick={() => setLabel4Selected(!label4Selected)} />
          </ColorLabel>
          <ColorLabel color="#4392F1" checked={label5Selected}>
            <input type="checkbox" onClick={() => setLabel5Selected(!label5Selected)} />
          </ColorLabel>
        </div>
        <Button type="submit">Criar tarefa</Button>
      </Form>
    </Container>
  );
}
