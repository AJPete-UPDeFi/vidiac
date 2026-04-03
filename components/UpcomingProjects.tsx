import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

export default function UpcomingProjects() {
  return (
    <section className="mb-10 text-center">
      <p className="mb-10 text-4xl font-bold text-white">Upcoming Projects</p>
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="py-4">
          <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
            <p className="text-center text-2xl font-bold">Project Apollo</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <Image
              removeWrapper
              src="/images/ProjectApollo.png"
              alt="Project Apollo"
              width={100}
              height={100}
              className="z-0 h-full w-full object-cover py-3"
            />
            <p className="mt-3 text-center text-xl font-semibold">
              Empowering Artists with a Unique Blockchain Platform.
            </p>
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
            <p className="text-center text-2xl font-bold">Project Hercules</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <Image
              removeWrapper
              src="/images/ProjectHercules.png"
              alt="Project Hercules"
              width={100}
              height={100}
              className="z-0 h-full w-full object-cover py-3"
            />
            <p className="mt-3 text-center text-xl font-semibold">
              Empowering Gaming Creators Through Crypto
            </p>
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
            <p className="text-center text-2xl font-bold">Project Athena</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <Image
              removeWrapper
              src="/images/ProjectAthena.png"
              alt="Project Athena"
              width={100}
              height={100}
              className="z-0 h-full w-full object-cover py-3"
            />
            <p className="mt-3 text-center text-xl font-semibold">
              Cryptocurrency with a Cause - Support and Earn
            </p>
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
            <p className="text-center text-2xl font-bold">Project Hermes</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <Image
              removeWrapper
              src="/images/ProjectHermes.png"
              alt="Project Hermes"
              width={100}
              height={100}
              className="z-0 h-full w-full object-cover py-3"
            />
            <p className="mt-3 text-center text-xl font-semibold">
              Your Gateway to Innovative DeFi Partnerships
            </p>
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="flex-col items-center px-4 pb-0 pt-2">
            <p className="text-center text-2xl font-bold">Project Zeus</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <Image
              removeWrapper
              src="/images/ProjectZeus.png"
              alt="Project Zeus"
              width={100}
              height={100}
              className="z-0 h-full w-full object-cover py-3"
            />
            <p className="mt-3 text-center text-xl font-semibold">
              Continued Creation and Leadership of the UP DeFi Ecosystem
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
