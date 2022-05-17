import { useEffect } from 'react';
import { useUserContext } from '../utils/context/userContext';
import { useRouter } from 'next/router';

//! find better implementation for protected routes
//! rn direct access via url leads to login regardless of the auth status
//! check on backend
function useProtectedPage() {
  const { user } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    if (user.auth === false) router.push('/login');
  }, [user]);
}

export default useProtectedPage;
