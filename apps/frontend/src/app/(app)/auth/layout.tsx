import { getT } from '@kuku/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import loadDynamic from 'next/dynamic';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <div className="dark !bg-black lbox">
      <ReturnUrlComponent />
      <div className="absolute start-0 top-0 z-[0] h-[100vh] w-[100vw] overflow-hidden bg-loginBg bg-contain bg-no-repeat bg-left-top" />
      <div className="relative z-[1] px-3 lg:pr-[100px] xs:mt-[70px] flex justify-center lg:justify-end items-center h-[100vh] w-[100vw] overflow-hidden">
        <div className="w-full max-w-lg h-[614px] flex flex-col bg-loginBox bg-no-repeat bg-contain">
          <div className="w-full relative">
            <div className="custom:fixed custom:text-start custom:left-[20px] custom:justify-start custom:top-[20px] absolute -top-[100px] text-textColor justify-center items-center w-full flex gap-[10px]">
              <Image
                src={isGeneralServerSide() ? '/kuku.png' : '/logo.png'}
                width={55}
                height={53}
                alt="Logo"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 156.45 51.7"
                className='h-[40px]'
              >
                <g>
                  <path
                    fill="#fff"
                    d="M14.4,49.97c0,.72-2.26,1.08-6.77,1.08l-4.03-.22c-2.4-.19-3.6-.53-3.6-1.01V1.51C0,.7,2.4.29,7.2.29s7.2.41,7.2,1.22v18.43L23.18,1.51c.33-.67,2.26-1.01,5.76-1.01,6.38,0,9.74.55,10.08,1.66,0,.1-.02.19-.07.29l-12.53,22.61,14.54,20.09c0,.1-.46.5-1.37,1.22-2.82,2.3-6.6,4.8-10.51,5.04l-1.73-.14c-1.54-.38-2.74-1.37-3.6-2.95l-8.21-15.7h-1.15v17.35Z"
                  />
                  <path
                    fill="#fff"
                    d="M43.92,15.41c-.59-1.07,12.98-1.07,12.38,0,0,0,0,21.02,0,21.02-.1,4.7,3.31,4.12,6.19,2.09V15.41c0-.48,2.04-.72,6.12-.72s6.12.24,6.12.72v23.62h1.87c3.24-.06,2.75,6.87,1.44,9.5-.96,2.11-2.26,3.17-3.89,3.17-3.22,0-5.59-1.32-7.13-3.96l-.07.07c-2.93,2.59-6.07,3.89-9.43,3.89-4.66,0-8.09-1.16-10.3-3.49-2.21-2.33-3.31-6.18-3.31-11.56V15.41Z"
                  />
                  <path
                    fill="#fff"
                    d="M83.45,1.15c0-.77,2.18-1.15,6.55-1.15,4.08.14,6.12.46,6.12.94v27.65l7.13-13.18c.43-1.66,12.57-1.11,13.32-.36l-9.36,15.26,10.8,20.23c.1.19-.8.35-2.7.47-3.32.28-11.72.29-12.13-.47l-7.13-15.98v15.91c.58,1.27-13.16,1.24-12.6.07,0,0,0-49.39,0-49.39Z"
                  />
                  <path
                    fill="#fff"
                    d="M121.32,15.41c-.59-1.07,12.98-1.07,12.38,0,0,0,0,21.02,0,21.02-.09,4.7,3.31,4.12,6.19,2.09V15.41c0-.48,2.04-.72,6.12-.72s6.12.24,6.12.72v23.62h1.87c3.24-.06,2.75,6.87,1.44,9.5-.96,2.11-2.26,3.17-3.89,3.17-3.22,0-5.59-1.32-7.13-3.96l-.07.07c-2.93,2.59-6.07,3.89-9.43,3.89-4.66,0-8.09-1.16-10.3-3.49-2.21-2.33-3.31-6.18-3.31-11.56V15.41Z"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="p-[32px] w-full h-[660px] text-textColor rbox">
            {children}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 flex justify-end">
              <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] translate-x-[22px] h-full" />
            </div>
            <div>
              <div className="absolute end-0 bg-gradient-to-l from-customColor9 h-[1px] translate-y-[60px] w-full" />
            </div>
          </div>
          <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] -translate-x-[22px] h-full" />
          <div className="absolute end-0 bg-gradient-to-l from-customColor9 h-[1px] -translate-y-[22px] w-full" />
        </div>
      </div>
    </div >
  );
}
