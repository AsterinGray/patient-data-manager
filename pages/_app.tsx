import { toastConfig } from '@/config/main'
import { AppDispatch, wrapper } from '@/store/index'
import { setIsAuthenticate } from '@/store/slices/auth'

import { GlobalStyleComponent } from '@/styles/index'
import { initAuthentication } from '@/utils/auth'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsAuthenticate(initAuthentication()));
  }, [dispatch]);

  return (
    <>
      <Component {...pageProps} />
      <GlobalStyleComponent />
      <ToastContainer {...toastConfig} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
