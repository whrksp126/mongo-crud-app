import {useState, useEffect} from 'react';
import {Button, Form, From, Grid, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    memo: '',
    status: Boolean
  });
  
  const {name, description, memo, status} = newTask;
  const {push, query} = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async() => {
    const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await response.json();
    setNewTask({name: data.name, description: data.description, memo:data.memo, status:data.status});
  }

  useEffect(() =>{
    if(query.id) getTask();
  }, [query.id])

  const validate = () => {
    let errors = {};
    if(!name){
      errors.name = "제목은 필수 항목입니다."
    }
    if(!description){
      errors.description = "설명은 필수 항목입니다."
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if(Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if(query.id){
      await updateTask()
    } else {
      await createTask();
    }

    await push('/')
  }
  const updateTask = async() => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error)
    }
  };

  const createTask = async() => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  return (
    <Grid centered verticalAlign='middle' columns="3" style={{height: '80vh'}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>{query.id ? '작업 수정' : '작업 생성'}</h1>
            <div>
              {isSubmit ? 
                (<Loader active inline="centered" />) 
                  : 
                (
                  <Form onSubmit={handleSubmit}>
                    <Form.Input error={errors.name ? {content: '제목을 입력하세요'} : null}
                      label="제목" placeholder="제목을 입력하세요" name="name" onChange={handleChange} value={name} autoFocus />
                    <Form.TextArea error={errors.description ? {content: '설명을 입력하세요'} : null}
                      label="설명" placeholder="설명을 입력하세요" name="description" onChange={handleChange} value={description} />
                    <Button type="submit" primary>{query.id ? '수정' : '전송'}</Button>
                  </Form>
                )
              }
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default CreateTask
