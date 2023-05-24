'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

type Props = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { onOpen } = useRegisterModal();
  const { onOpen: loginOnOpen } = useLoginModal();
  const { onOpen: rentOnOpen } = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginOnOpen();
    }
    rentOnOpen();
  }, [currentUser, loginOnOpen, rentOnOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row gap-3 items-center rounded-full transition cursor-pointer hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push('/trips')} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => router.push('/reservations')} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentOnOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginOnOpen} label="Login" />
                <MenuItem onClick={onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
