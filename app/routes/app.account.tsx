import { NavLink, Outlet } from '@remix-run/react';

export default function AppAccount() {
  return (
    <div className="flex h-full w-full flex-col bg-gd-content p-1">
      <div className="flex flex-col gap-1 bg-gd-container p-1">
        <div className="flex flex-row gap-1">
          <NavLink
            to={'/app/account/login'}
            className={({ isActive }) =>
              `flex w-fit items-center justify-center rounded-sm px-2 text-gd-white ${
                isActive ? 'bg-gd-container-selected' : 'bg-gd-collapsable hover:bg-gd-container-nav'
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to={'/app/account/signin'}
            className={({ isActive }) =>
              `flex w-fit items-center justify-center rounded-sm px-2 text-gd-white ${
                isActive ? 'bg-gd-container-selected' : 'bg-gd-collapsable hover:bg-gd-container-nav'
              }`
            }
          >
            Signin
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
