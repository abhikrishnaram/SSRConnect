import Image from 'next/image';
import React from 'react';

const Landing = () => (
    <div className="min-h-screen relative w-full">
        <Image src="/assets/amma.jpeg" alt="background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-0 bottom-16 flex items-center justify-center bg-primary p-8 pl-16 rounded">
            <Image src="/logo-light.png" alt="logo" width={500} height={100} />
        </div>
        <div className="absolute bottom-16 right-16 flex flex-col max-w-[450px] items-start justify-center text-gray-200">
            <div>
                Amrita’s flagship community outreach program that exposes students to the realities of life. It offers them a unique opportunity to make a real difference in the world outside and practice humanity in their own little ways
            </div>
            <div>
                <div className="text-sm opacity-50 mt-5">In assocaition with</div>
                <Image src="/amrita-logo.png" alt="Amrita Vishwa Vidyapeetham" width={200} height={100} />
            </div>
        </div>
    </div>
);

export default Landing;