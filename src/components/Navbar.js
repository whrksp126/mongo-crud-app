import { Menu, Container, Button } from "semantic-ui-react";
import Link from 'next/link';
import Image from 'next/image'
import {useRouter} from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  return (
    <Menu inverted borderless style={{padding: '.3rem', marginBottom: "20px"}} attached>
      <Container>
        <Menu.Item name="home">
          <Link href='/' passHref>
            <img  src='/vercel.svg' />
            {/* <Image src ='/vercel.svg' alt="logo" /> */}
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button size='mini' primary onClick={ () => router.push('/tasks/new') }>
              작업 추가
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
