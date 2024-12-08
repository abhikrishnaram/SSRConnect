'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';



const ProjectFileItem = ({ label, url, type, code: _ }) => (
    <div>
        <div className="text-primary text-xl font-semibold mt-12 mb-2 pb-2 justify-between flex items-center">
            <div>{label}</div>
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + url}
                    className="text-primary border duration-100 hover:border-primary/40 group bg-blue-50 px-4 flex items-center justify-center rounded-lg gap-1 py-1"
                    target="_blank"
                >
                    Open
                    <ExternalLinkIcon size="18" className="opacity-70 group-hover:opacity-100" />
                </Link>
                {/*<DownloadButton url={url} code={code} />*/}
            </div>
        </div>
        {type === 'PDF' ? (
            <iframe
                src={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + url}
                className="w-full h-[500px] rounded-lg"
            />
        ) : type === 'IMAGE' ? (
            <Image
                src={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + url}
                className="rounded-lg w-full h-auto"
                alt={label}
                height={500}
                width={900}
            />
        ) : (
            <video
                src={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + url}
                className="w-full rounded-lg"
                controls
            />
        )}
    </div>
);

export default ProjectFileItem;
