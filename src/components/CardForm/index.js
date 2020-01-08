import React, { useState, useContext } from 'react';
import produce from 'immer';

import { MdClose } from 'react-icons/md';

import ListContext from '../List/context';

import { Container, Form, CloseButton, Title, Label, Input, TextArea, Button, ColorLabel } from './styles';

export default function CardForm() {
  const { setShowForm } = useContext(ListContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  
  const [label1, setLabel1] = useState(false);
  const [label2, setLabel2] = useState(false);
  const [label3, setLabel3] = useState(false);
  const [label4, setLabel4] = useState(false);
  const [label5, setLabel5] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleLabels();
    console.log(title, description, labels);
  }

  function handleLabels(){
     setLabels(produce((labels, draft => {
      if(label1 && !labels.includes('#FE4A49')) draft.push('#FE4A49');
      if(label2 && !labels.includes('#FF9F1C')) draft.push('#FF9F1C');
      if(label3 && !labels.includes('#FED766')) draft.push('#FED766');
      if(label4 && !labels.includes('#59CD90')) draft.push('#59CD90');
      if(label5 && !labels.includes('#4392F1')) draft.push('#4392F1');
    })))
  }


  return (
    <Container>
      <CloseButton type="button" onClick={() => setShowForm(false)}>
        <MdClose color="#999" size={20} />
      </CloseButton>
      <Form onSubmit={handleSubmit}>

        <Title>{ title ? title : 'Nova tarefa incrível' }</Title>

        <Label>Tarefa</Label>
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
          <ColorLabel color="#FE4A49" to="check1" checked={label1}>
            <input type="checkbox" id="check1" onClick={() => setLabel1(!label1)} />
          </ColorLabel>
          <ColorLabel color="#FF9F1C" to="check2" checked={label2}>
            <input type="checkbox" id="check2" onClick={() => setLabel2(!label2)} />
          </ColorLabel>
          <ColorLabel color="#FED766" to="check3" checked={label3}>
            <input type="checkbox" id="check3" onClick={() => setLabel3(!label3)} />
          </ColorLabel>
          <ColorLabel color="#59CD90" to="check4" checked={label4}>
            <input type="checkbox" id="check4" onClick={() => setLabel4(!label4)} />
          </ColorLabel>
          <ColorLabel color="#4392F1" to="check5" checked={label5}>
            <input type="checkbox" id="check5" onClick={() => setLabel5(!label5)} />
          </ColorLabel>
        </div>
        <Button type="submit">Criar tarefa</Button>
      </Form>
    </Container>
  );
}
