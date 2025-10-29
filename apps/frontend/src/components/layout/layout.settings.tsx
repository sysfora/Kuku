'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { Title } from '@kuku/frontend/components/layout/title';
import { ContextWrapper } from '@kuku/frontend/components/layout/user.context';
import { TopMenu } from '@kuku/frontend/components/layout/top.menu';
import { MantineWrapper } from '@kuku/react/helpers/mantine.wrapper';
import { ToolTip } from '@kuku/frontend/components/layout/top.tip';
import { ShowMediaBoxModal } from '@kuku/frontend/components/media/media.component';
import Image from 'next/image';
import { Toaster, useToaster } from '@kuku/react/toaster/toaster';
import { ShowPostSelector } from '@kuku/frontend/components/post-url-selector/post.url.selector';
import { OrganizationSelector } from '@kuku/frontend/components/layout/organization.selector';
import NotificationComponent from '@kuku/frontend/components/notifications/notification.component';
import Link from 'next/link';
import useSWR from 'swr';
import { useFetch } from '@kuku/helpers/utils/custom.fetch';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import { ShowLinkedinCompany } from '@kuku/frontend/components/launches/helpers/linkedin.component';
import { SettingsComponent } from '@kuku/frontend/components/layout/settings.component';
import { Onboarding } from '@kuku/frontend/components/onboarding/onboarding';
import { Support } from '@kuku/frontend/components/layout/support';
import { ContinueProvider } from '@kuku/frontend/components/layout/continue.provider';
import { CopilotKit } from '@copilotkit/react-core';
import { Impersonate } from '@kuku/frontend/components/layout/impersonate';
import clsx from 'clsx';
import { BillingComponent } from '@kuku/frontend/components/billing/billing.component';
import dynamic from 'next/dynamic';
import { NewSubscription } from '@kuku/frontend/components/layout/new.subscription';
import { useVariables } from '@kuku/react/helpers/variable.context';
const ModeComponent = dynamic(
  () => import('@kuku/frontend/components/layout/mode.component'),
  {
    ssr: false,
  }
);
import { extend } from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { CheckPayment } from '@kuku/frontend/components/layout/check.payment';
import { ChromeExtensionComponent } from '@kuku/frontend/components/layout/chrome.extension.component';
import { LanguageComponent } from '@kuku/frontend/components/layout/language.component';
import { useT } from '@kuku/react/translation/get.transation.service.client';
import i18next from '@kuku/react/translation/i18next';
import { MediaSettingsLayout } from '@kuku/frontend/components/launches/helpers/media.settings.component';
extend(utc);
extend(weekOfYear);
extend(isoWeek);
extend(isBetween);
export const LayoutSettings = ({ children }: { children: ReactNode }) => {
  const fetch = useFetch();
  const t = useT();

  const { isGeneral } = useVariables();
  const { backendUrl, billingEnabled } = useVariables();
  const searchParams = useSearchParams();
  const load = useCallback(async (path: string) => {
    return await (await fetch(path)).json();
  }, []);
  const { data: user, mutate } = useSWR('/user/self', load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
  });
  if (!user) return null;
  return (
    <ContextWrapper user={user}>
      <CopilotKit
        credentials="include"
        runtimeUrl={backendUrl + '/copilot/chat'}
        showDevConsole={false}
      >
        <MantineWrapper>
          {user.tier === 'FREE' && searchParams.get('check') && (
            <CheckPayment check={searchParams.get('check')!} mutate={mutate} />
          )}
          <ToolTip />
          <ShowMediaBoxModal />
          <ShowLinkedinCompany />
          <MediaSettingsLayout />
          <Toaster />
          <ShowPostSelector />
          <NewSubscription />
          <Support />
          <ContinueProvider />
          <div className="min-h-[100vh] w-full max-w-[1440px] mx-auto bg-primary px-6 text-textColor flex flex-col">
            {user?.admin && <Impersonate />}
            <nav className="flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl flex items-center gap-[10px] text-textColor order-1"
              >
                <div className="min-w-[55px]">
                  <Image
                    src={isGeneral ? '/kuku.png' : '/logo.png'}
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
              </Link>
              {user?.orgId &&
                (user.tier !== 'FREE' || !isGeneral || !billingEnabled) ? (
                <TopMenu />
              ) : (
                <></>
              )}
              <div
                id="systray-buttons"
                className="flex items-center justify-self-end gap-[8px] order-2 md:order-3"
              >
                <LanguageComponent />
                <ChromeExtensionComponent />
                <ModeComponent />
                <SettingsComponent />
                <NotificationComponent />
                <OrganizationSelector />
              </div>
            </nav>
            <div className="flex-1 flex">
              <div className="flex-1 rounded-3xl px-0 py-[17px] flex flex-col">
                {user.tier === 'FREE' && isGeneral && billingEnabled ? (
                  <>
                    <div className="text-center mb-[20px] text-xl [@media(max-width:1024px)]:text-xl">
                      <h1 className="text-3xl [@media(max-width:1024px)]:text-xl">
                        {t(
                          'join_10000_entrepreneurs_who_use_kuku',
                          'Join 10,000+ Entrepreneurs Who Use Kuku'
                        )}
                        <br />
                        {t(
                          'to_manage_all_your_social_media_channels',
                          'To Manage All Your Social Media Channels'
                        )}
                      </h1>
                      <br />
                      {user?.allowTrial && (
                        <div className="table mx-auto">
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>
                              {t('100_no_risk_trial', '100% no-risk trial')}
                            </div>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>
                              {t(
                                'pay_nothing_for_the_first_7_days',
                                'Pay nothing for the first 7 days'
                              )}
                            </div>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>
                              {t(
                                'cancel_anytime_hassle_free',
                                'Cancel anytime, hassle-free'
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <BillingComponent />
                  </>
                ) : (
                  <>
                    <Title />
                    <div className="flex flex-1 flex-col">{children}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </MantineWrapper>
      </CopilotKit>
    </ContextWrapper>
  );
};
