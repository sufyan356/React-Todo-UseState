import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function getdata() {
  const data = JSON.parse(localStorage.getItem("Todos")) || [];
  return data;
}

function Example() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState(getdata());
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function submitHandler(e) {
    e.preventDefault();
    if(!title){
      alert('Empty Task Title');
      setDescription('');
      handleClose();
      return;
    }
    else if(!description){
      alert('Empty Task Description');
      setTitle('');
      handleClose()
      return;
    }
    else{
      let date = new Date(Date.now());
      let dateFormat = date.toLocaleString();
      const todoId = getdata().length + 1;
      setTodos([...todos, { title, description , todoId , dateFormat }]);
      setTitle('');
      setDescription('');
      handleClose();
    }

    
  }

  
  
  // EDIT FUNCTION 
  function editFun(todoId) {
    let todoItems = JSON.parse(localStorage.getItem("Todos"));
    let taskIndex = todoItems.findIndex((task) => task.todoId === todoId);
  
    if (taskIndex !== -1) {
      let currentTitle = prompt("Edit Todo Title", todoItems[taskIndex].title);
      let currentDescription = prompt("Edit Todo Description", todoItems[taskIndex].description);
     

      if (currentTitle === null || currentDescription === null || currentTitle.trim() === "" || currentDescription.trim() === "") {
        alert("Enter Title / Description");
      } else {
        todoItems[taskIndex].title = currentTitle;
        todoItems[taskIndex].description = currentDescription;
  
        setTodos([...todoItems]);
  
        localStorage.setItem("Todos", JSON.stringify(todoItems));
      }
    }
  }
  

  function deleteFun(todoId){
    const data = JSON.parse(localStorage.getItem("Todos"));
    const updatedData = data.filter((ele) => {
      return ele.todoId !== todoId
  })
     
    setTodos[updatedData];
    localStorage.setItem("Todos", JSON.stringify(updatedData));
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {/* <Button variant="px-6 mt-5 mb-5" onClick={handleShow} className='modalCustom'>
        Add Task
      </Button> */}


      <Form.Floating className="mb-3 addItems"  onClick={handleShow}>
        <Form.Control
         
          id="floatingInputCustom"
          type="text"
          placeholder="Add Tasks"
          autoComplete='off'
          // className='modalCustom'
          
        />
        <FaSearch className='searchIcon'/>
        <label htmlFor="floatingInputCustom"> Add Task </label>
      </Form.Floating>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
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
              <Button variant="secondary" className='closeBtn' onClick={handleClose}>
                Close
              </Button>

              <Button variant="primary" className='saveChanges' type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {todos.length  === 0 && <div className="insertData"> Insert data </div>}
      <br />
      {
            todos.length > 0 &&  
            <div className="container tableContainer">
                <div className="row tableRow">
                    <div className="col-12">
                        <Table bordered>
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
                            {todos.map(({title , description , todoId , dateFormat}, index) => (
                            <tr key={todoId}>
                                <td>{index + 1}</td>
                                <td className='date'>
                                  {dateFormat}
                                  {/* <Form.Check aria-label={`option ${index + 1}`} /> */}
                                </td>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td className='actions' style={{height: '5.5rem'}}><FaTrash  onClick={() => {deleteFun(todoId)}} className = "trash"/> <MdEdit onClick={() => {editFun(todoId)}} className='edit'/></td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    </div>
                </div>
            </div>
      }
    </>
  );
}

export default Example;
