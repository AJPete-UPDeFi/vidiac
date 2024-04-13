import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

export default function UpcomingProjects() {

  return (
    <section className="text-center mb-10">
        <p className='text-4xl font-bold text-white mb-10'>Upcoming Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1200px]">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="font-bold text-2xl text-center">Project Apollo</p>
                </CardHeader>
                <CardBody className='flex flex-col items-center'>
                    <Image removeWrapper src="/images/ProjectApollo.png" alt="Project Apollo" width={100} height={100} className="z-0 w-full h-full object-cover py-3" />
                    <p className="font-semibold text-xl text-center mt-3">Empowering Artists with a Unique Blockchain Platform.</p>
                </CardBody>
            </Card>

            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="font-bold text-2xl text-center">Project Hercules</p>
                </CardHeader>
                <CardBody className='flex flex-col items-center'>
                    <Image removeWrapper src="/images/ProjectHercules.png" alt="Project Hercules" width={100} height={100} className="z-0 w-full h-full object-cover py-3"/>
                    <p className="font-semibold text-xl text-center mt-3">Empowering Gaming Creators Through Crypto</p>
                </CardBody>
            </Card>

            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="font-bold text-2xl text-center">Project Athena</p>
                </CardHeader>
                <CardBody className='flex flex-col items-center'>
                    <Image removeWrapper src="/images/ProjectAthena.png" alt="Project Athena" width={100} height={100} className="z-0 w-full h-full object-cover py-3"/>
                    <p className="font-semibold text-xl text-center mt-3">Cryptocurrency with a Cause - Support and Earn</p>
                </CardBody>
            </Card>

            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="font-bold text-2xl text-center">Project Hermes</p>
                </CardHeader>
                <CardBody className='flex flex-col items-center'>
                    <Image removeWrapper src="/images/ProjectHermes.png" alt="Project Hermes" width={100} height={100} className="z-0 w-full h-full object-cover py-3"/>
                    <p className="font-semibold text-xl text-center mt-3">Your Gateway to Innovative DeFi Partnerships</p>
                </CardBody>
            </Card>

            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="font-bold text-2xl text-center">Project Zeus</p>
                </CardHeader>
                <CardBody className='flex flex-col items-center'>
                    <Image removeWrapper src="/images/ProjectZeus.png" alt="Project Zeus" width={100} height={100} className="z-0 w-full h-full object-cover py-3"/>
                    <p className="font-semibold text-xl text-center mt-3">Continued Creation and Leadership of the UP DeFi Ecosystem</p>
                </CardBody>
            </Card>
        </div>
    </section>
  );
}