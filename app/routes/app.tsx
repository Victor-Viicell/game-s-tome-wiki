import { Outlet } from '@remix-run/react';
import Navbar from '~/components/navbar';
import {Xresize, Container} from './../components/generalcomponents';
import Sidebar from '~/components/sidebar';

export default function App() {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="flex h-full w-full flex-row">
        <Xresize>
          <Sidebar />
        </Xresize>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
