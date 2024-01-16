import Image from 'next/image';
import React from 'react';

const Landing = () => (
    <div className="min-h-screen relative w-full">
        <Image src="/assets/amma.jpeg" alt="background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-0 bottom-16 flex items-center justify-center bg-primary p-8 pl-16 rounded">
            <Image src="/logo-light.png" alt="logo" width={500} height={500} />
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
        <div className="grid grid-cols-2 w-full mx-auto container">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold text-primary">Student Social Responsibility</h1>
                <p className="text-primary/60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                {/*<div className="flex gap-4 mt-4">*/}
                {/*    <Link href="/project" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg">See Projects</Link>*/}
                {/*    <Link href="/contact" className="bg-primary/10 hover:bg-primary/40 text-primary px-4 py-2 rounded-lg">Contact us</Link>*/}
                {/*</div>*/}
            </div>
            <div className="relative flex items-center">

            </div>
        </div>
    </div>
);

export default Landing;