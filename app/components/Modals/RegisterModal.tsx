'use client';

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';

type Props = {};

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/register', data);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      onClose();
    } catch (error: any) {
      toast.error("Couldn't register you");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" center />
        <Input
          id="email"
          type="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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
        <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} disabled={isLoading} />
        <Button
          outline
          label="Continue with GitHub"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
          disabled={isLoading}
        />

        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="justify-center flex flex-row items-center gap-2">
            <div>Already have an account?</div>
            <div onClick={onClose} className="text-rose-500 cursor-pointer hover:underline">
              Log In
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
        title="Register"
        actionLabel="Continue"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
