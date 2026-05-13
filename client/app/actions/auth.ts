'use client';

import { redirect } from 'next/navigation';

import { FormState, SignupFormSchema, SigninFormSchema } from '../lib/definitions';

import { HttpStatusCode } from '../consts/http';
import { errorResponse, postRequest } from '../utils/api';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await postRequest('auth/signup', validatedFields.data);

  if (!response) {
    return errorResponse('An error occurred during sign up');
  }

  if (response.status === HttpStatusCode.FORBIDDEN) {
    return errorResponse('User already exists');
  }

  if (response.status !== HttpStatusCode.OK) {
    return errorResponse('An error occurred during sign up');
  }

  redirect('/');
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await postRequest('auth/login', validatedFields.data);

  if (!response) {
    return errorResponse('An error occurred during sign in');
  }

  if (response.status === HttpStatusCode.NOT_FOUND) {
    return errorResponse(response.data.message);
  }

  if (response.status !== HttpStatusCode.OK) {
    return errorResponse('An error occurred during sign in');
  }

  redirect('/home');
}

export async function signout() {
  const response = await postRequest('auth/logout');

  if (!response || response.status !== HttpStatusCode.OK) {
    return errorResponse('An error occurred during sign out');
  }

  redirect('/');
}
