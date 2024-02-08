
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";

function Example() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [ID, setID] = useState(0);

  function submitHandler(e) {
    e.preventDefault();
    if (!title) {
      alert('Empty Task Title');
      setDescription('');
      return;
    } else if (!description) {
      alert('Empty Task Description');
      setTitle('');
      return;
    } else {
      let date = new Date(Date.now());
      let dateFormat = date.toLocaleString();
      let todoId = ID + 1;
      setID(todoId);
      setTodos([...todos, { title, description, todoId, dateFormat }]);
      setTitle('');
      setDescription('');
    }
  }

  function deleteFun(todoId) {
    const updatedData = todos.filter((ele) => ele.todoId !== todoId);
    setTodos(updatedData);
  }

  // EDIT FUNCTION 
  function editFun(todoId) {
    let taskIndex = todos.findIndex((task) => task.todoId === todoId);
  
    if (taskIndex !== -1) {
      let currentTitle = prompt("Edit Todo Title", todos[taskIndex].title);
      let currentDescription = prompt("Edit Todo Description", todos[taskIndex].description);
     
      if (currentTitle === null || currentDescription === null || currentTitle.trim() === "" || currentDescription.trim() === "") {
        alert("Enter Title / Description");
      } else {
        let updatedTodos = [...todos];
        updatedTodos[taskIndex].title = currentTitle;
        updatedTodos[taskIndex].description = currentDescription;
  
        setTodos(updatedTodos);
      }
    }
  }

  return (
    <>
      <div>
      <Form onSubmit={submitHandler} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="Todo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Todo Title</label>
          </Form.Floating>

          <FloatingLabel controlId="floatingTextarea2" label="Todo Description">
            <Form.Control
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>

          <div className='BtnContainer'>
            <Button variant="primary" className='saveChanges' type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      <br />
      {todos.length > 0 && (
        <div className="container tableContainer">
          <div className="row tableRow">
            <div className="col-12">
              <Table bordered style={{marginTop: '2rem' , width: '80%' , marginLeft: 'auto' , marginRight: 'auto'}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>CreatedAt</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map(({ title, description, todoId, dateFormat }, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='date'>{dateFormat}</td>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td className='actions' style={{ height: '5.5rem' }}>
                        <FaTrash onClick={() => deleteFun(todoId)}  className="trash" />
                        <MdEdit onClick={() => {editFun(todoId)}} className='edit'/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Example;
