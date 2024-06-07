import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <div className="flex flex-col gap-1 bg-gd-container">
      <Form method="post" action="/login" className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 rounded-sm bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 px-2 text-gd-white">User</p>
          <input
            type="text"
            className="w-full rounded-sm bg-gd-container-nav text-gd-white"
          />
        </div>
        <div className="flex flex-col gap-1 rounded-sm bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 px-2 text-gd-white">
            Email
          </p>
          <input
            type="email"
            className="w-full rounded-sm bg-gd-container-nav text-gd-white"
          />
        </div>
        <div className="flex flex-col gap-1 rounded-sm bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 px-2 text-gd-white">
            Passworld
          </p>
          <input
            type="password"
            className="w-full rounded-sm bg-gd-container-nav text-gd-white"
          />
        </div>
        <div className="flex flex-col gap-1 rounded-sm bg-gd-content p-1">
          <p className="rounded-sm bg-gd-header-1 px-2 text-gd-white">
            Confirm Passworld
          </p>
          <input
            type="password"
            className="w-full rounded-sm bg-gd-container-nav text-gd-white"
          />
        </div>
      </Form>
    </div>
  );
}
