import { NavLink, Outlet } from '@remix-run/react';

export default function app_account() {
  return (
    <div className="flex h-full w-full flex-col bg-gd-content p-1">
      <div className="flex flex-col gap-1 bg-gd-container p-1">
        <div className="flex flex-row gap-1">
          <NavLink
            to={'/app/account/login'}
            className="flex w-fit items-center justify-center rounded-sm bg-gd-collapsable px-2 text-gd-white hover:bg-gd-container-nav"
          >
            Login
          </NavLink>
          <NavLink
            to={'/app/account/signin'}
            className="flex w-fit items-center justify-center rounded-sm bg-gd-collapsable px-2 text-gd-white hover:bg-gd-container-nav"
          >
            Signin
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
