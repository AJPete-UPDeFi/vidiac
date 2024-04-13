import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import router, { useRouter } from 'next/router';

export default function KeyFeatures() {

  return (
    <section className="mb-10">
        <div className="text-center">
            <p className='text-4xl font-bold text-white mb-2'>Explore Our Tokens</p> 
            <p className='text-2xl font-semibold text-white mb-10'>Click on Logos for More Details</p>
        </div>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <p className="font-bold text-3xl text-center">Vidiac</p>
                    </CardHeader>
                    <CardBody className='flex flex-col items-center'>
                    <button aria-label='Vidiac' onClick={() => window.open('/vidiac', '_blank')}>
                        <Image src="/images/playbutton1.png" alt="Vidiac" width={200} height={200} className='w-full h-full max-w-[200px] max-h[200px]'/>
                    </button>
                        <p className='font-semibold text-xl text-center mt-3'>Revolutionizing Content Creation through Blockchain</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    </section>
);
}