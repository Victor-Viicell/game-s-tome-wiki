import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserEdit } from 'react-icons/fa';
import { Form, useActionData } from '@remix-run/react';

interface InputFieldProps {
  placeholder: string;
  type: string;
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type, icon }) => (
  <div className="flex w-full flex-row gap-1 rounded-sm">
    <div className="flex items-center justify-center rounded-sm bg-gd-header-1 px-2 text-gd-white">
      {icon}
    </div>
    <input
      required
      placeholder={placeholder}
      type={type}
      className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
    />
  </div>
);

interface SubmitButtonProps {
  children: React.ReactNode;
}
interface ActionData {
  error?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => (
  <button
    type="submit"
    className="m-1 w-fit rounded-sm bg-gd-collapsable px-2 text-gd-white hover:bg-gd-container-nav focus:bg-gd-container-nav"
  >
    {children}
  </button>
);

export function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex flex-col gap-1 bg-gd-container">
      {actionData?.error && <p>{actionData.error}</p>}
      <Form method="post" className="flex flex-col items-center gap-1">
        <div className="flex w-full flex-col gap-1 bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 p-1 px-2 text-center font-victor-mono font-semibold text-gd-white">
            Login
          </p>
          <InputField placeholder="Usuário" type="text" icon={<FaUserEdit className="aspect-square" />} />
          <InputField placeholder="Senha" type="password" icon={<RiLockPasswordFill className="aspect-square" />} />
        </div>
        <SubmitButton>Entrar</SubmitButton>
      </Form>
    </div>
  );
}