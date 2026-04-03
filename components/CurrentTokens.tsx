import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import router, { useRouter } from 'next/router';

export default function KeyFeatures() {
  return (
    <section className="mb-10">
      <div className="text-center">
        <p className="mb-2 text-4xl font-bold text-white">Explore Our Tokens</p>
        <p className="mb-10 text-2xl font-semibold text-white">
          Click on Logos for More Details
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="py-4">
            <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
              <p className="text-center text-3xl font-bold">Vidiac</p>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
              <button
                aria-label="Vidiac"
                onClick={() => window.open('/vidiac', '_blank')}
              >
                <Image
                  src="/images/playbutton1.png"
                  alt="Vidiac"
                  width={200}
                  height={200}
                  className="max-h[200px] h-full w-full max-w-[200px]"
                />
              </button>
              <p className="mt-3 text-center text-xl font-semibold">
                Revolutionizing Content Creation through Blockchain
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
