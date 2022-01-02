import {Button, Card, Container, Grid} from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({tasks = []}) {
  const router = useRouter();
  if(tasks.length === 0) {
    return (
      <Grid centered vericalAlign="middle" columns='1' style={{height: '80vh'}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>현재 작업이 없습니다. 새로 만드세요</h1>
            <div>
              <Button primary onClick={ () => router.push('/tasks/new') }>
                작업 생성
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks && tasks.map((task) => (
          <Card key={task._id} >
            <Card.Content >
              <Card.Header>
                <Link href={`/tasks/${task._id}`}>
                  <a>{task.title}</a>
                </Link>
              </Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button color="orange" onClick={ () => router.push(`/tasks/${task._id}`) }>
                 상세
              </Button>
              <Button color="blue" onClick={ () => router.push(`/tasks/${task._id}/edit`) }>
                 수정
              </Button>
              <Button color="pink">
                 완료
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export async function getServerSideProps(){
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();

  return {
    props: {
      tasks,
    },
  }
}