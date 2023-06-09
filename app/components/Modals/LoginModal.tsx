'use client';

import React, { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';

type Props = {};

const defaultValues = {
  email: '',
  password: '',
};

const LoginModal = (props: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useLoginModal();
  const { isOpen: registerIsOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in Successfully');
        router.refresh();
        onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggleModal = useCallback(() => {
    onClose();
    registerOnOpen();
  }, [onClose, registerOnOpen]);

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account" center />
        <Input
          id="email"
          type="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </>
  );

  const footerContent = (
    <>
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')}
          disabled={isLoading}
        />
        <Button
          outline
          label="Continue with GitHub"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
          disabled={isLoading}
        />

        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="justify-center flex flex-row items-center gap-2">
            <div>Don&apos;t have an account?</div>
            <div onClick={toggleModal} className="text-rose-500 cursor-pointer hover:underline">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
