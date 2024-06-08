import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserEdit } from 'react-icons/fa';
import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <div className="flex flex-col gap-1 bg-gd-container">
      <Form
        method="post"
        action="/login"
        className="flex flex-col items-center gap-1"
      >
        <div className="flex w-full flex-col gap-1 bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 px-2 text-gd-white text-center font-semibold font-victor-mono p-1">Login</p>
          <div className="flex w-full flex-row gap-1 rounded-sm">
            <div className="flex items-center justify-center rounded-sm bg-gd-header-1 px-2 text-gd-white">
              <FaUserEdit className="aspect-square" />
            </div>
            <input
              required
              placeholder="Usuário"
              type="text"
              className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
            />
          </div>
          <div className="flex w-full flex-row gap-1 rounded-sm">
            <div className="flex items-center justify-center rounded-sm bg-gd-header-1 px-2 text-gd-white">
              <RiLockPasswordFill className="aspect-square" />
            </div>
            <input
              required
              placeholder="Senha"
              type="password"
              className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="m-1 w-fit rounded-sm bg-gd-collapsable px-2 text-gd-white hover:bg-gd-container-nav focus:bg-gd-container-nav"
        >
          Entrar
        </button>
      </Form>
    </div>
  );
}
