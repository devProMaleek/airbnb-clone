'use client';

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';

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
      await axios.post('/api/auth/register', data);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default RegisterModal;
