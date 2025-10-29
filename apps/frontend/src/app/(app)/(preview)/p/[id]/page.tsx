import { internalFetch } from '@kuku/helpers/utils/internal.fetch';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
import Image from 'next/image';
import Link from 'next/link';
import { CommentsComponents } from '@kuku/frontend/components/preview/comments.components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { VideoOrImage } from '@kuku/react/helpers/video.or.image';
import { CopyClient } from '@kuku/frontend/components/preview/copy.client';
import { getT } from '@kuku/react/translation/get.translation.service.backend';
import dynamicLoad from 'next/dynamic';

const RenderPreviewDate = dynamicLoad(
  () =>
    import('@kuku/frontend/components/preview/render.preview.date').then(
      (mod) => mod.RenderPreviewDate
    ),
  { ssr: false }
);

dayjs.extend(utc);
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Kuku' : 'Kuku'} Preview`,
  description: '',
};
export default async function Auth({
  params: { id },
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams?: {
    share?: string;
  };
}) {
  const post = await (await internalFetch(`/public/posts/${id}`)).json();
  const t = await getT();
  if (!post.length) {
    return (
      <div className="text-white fixed start-0 top-0 w-full h-full flex justify-center items-center text-[20px]">
        {t('post_not_found', 'Post not found')}
      </div>
    );
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-[1346px] py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="min-w-[55px]">
                <Link
                  href="/"
                  className="text-2xl flex items-center justify-center gap-[10px] text-textColor order-1"
                >
                  <div className="max-w-[55px]">
                    <Image
                      src={'/kuku.png'}
                      width={55}
                      height={55}
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
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-[20px]">
            {!!searchParams?.share && (
              <div>
                <CopyClient />
              </div>
            )}
            <div className="flex-1">
              {t('publication_date', 'Publication Date:')}{' '}
              <RenderPreviewDate date={post[0].publishDate} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row text-white w-full max-w-[1346px] mx-auto">
        <div className="flex-1">
          <div className="gap-[20px] flex flex-col">
            {post.map((p: any, index: number) => (
              <div
                key={String(p.id)}
                className="relative px-4 py-4 bg-third border border-tableBorder"
              >
                <div className="flex space-x-3">
                  <div>
                    <div className="flex shrink-0 rounded-full h-30 w-30 relative">
                      <div className="w-[50px] h-[50px] z-[20]">
                        <img
                          className="w-full h-full relative z-[20] bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.name}
                          src={post[0].integration.picture}
                        />
                      </div>
                      <div className="absolute -end-[5px] -bottom-[5px] w-[30px] h-[30px] z-[20]">
                        <img
                          className="w-full h-full bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.providerIdentifier}
                          src={`/icons/platforms/${post[0].integration.providerIdentifier}.png`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-semibold">
                        {post[0].integration.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        @{post[0].integration.profile}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <div
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: p.content,
                        }}
                      />
                      <div className="flex w-full gap-[10px]">
                        {JSON.parse(p?.image || '[]').map((p: any) => (
                          <div
                            key={p.name}
                            className="flex-1 rounded-[10px] max-h-[500px] overflow-hidden"
                          >
                            <VideoOrImage
                              isContain={true}
                              src={p.path}
                              autoplay={true}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="p-4 pt-0">
            <CommentsComponents postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
