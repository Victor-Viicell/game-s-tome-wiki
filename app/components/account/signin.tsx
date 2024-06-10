import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserEdit } from 'react-icons/fa';
import { Form } from '@remix-run/react';
import { MdOutlinePassword } from 'react-icons/md';
import { MdAlternateEmail } from 'react-icons/md';

interface InputFieldProps {
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  icon,
  name,
}) => (
  <div className="flex w-full flex-row gap-1 rounded-sm">
    <div className="flex items-center justify-center rounded-sm bg-gd-header-1 px-2 text-gd-white">
      {icon}
    </div>
    <input
      required
      placeholder={placeholder}
      type={type}
      className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
      name={name}
    />
  </div>
);

interface SubmitButtonProps {
  children: React.ReactNode;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => (
  <button
    type="submit"
    className="m-1 w-fit rounded-sm bg-gd-collapsable px-2 text-gd-white hover:bg-gd-container-nav focus:bg-gd-container-nav"
  >
    {children}
  </button>
);

export function Signin() {
  return (
    <div className="flex flex-col gap-1 bg-gd-container">
      <Form
        method="post"
        action="/login"
        className="flex flex-col items-center gap-1"
      >
        <div className="flex w-full flex-col gap-1 bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 p-1 px-2 text-center font-victor-mono font-semibold text-gd-white">
            Signin
          </p>
          <InputField placeholder="Nome" type="text" icon={<FaUserEdit className="aspect-square" />} name="name" />
          <InputField placeholder="Usuário" type="text" icon={<FaUserEdit className="aspect-square" />} name="username" />
          <InputField placeholder="Email" type="email" icon={<MdAlternateEmail className="aspect-square" />} name="email" />
          <InputField placeholder="Senha" type="password" icon={<RiLockPasswordFill className="aspect-square" />} name="password" />
          <InputField placeholder="Confirme a Senha" type="password" icon={<MdOutlinePassword className="aspect-square" />} name="confirmPassword" />
        </div>
        <SubmitButton>Criar Conta</SubmitButton>
      </Form>
    </div>
  );
}
