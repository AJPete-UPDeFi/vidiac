import { Card } from '@nextui-org/react';
import React from 'react';

const Roadmap = () => {
  return (
    <div className="mb-10">
      <p className="text-4xl font-bold text-white text-center mb-10">Roadmap</p>
        <Card className="py-4 bg-black bg-opacity-30">
      <div className='text-md text-white font-semibold p-4 xs:text-xl'>
        <p className="text-2xl font-bold mt-6 mb-3">Q4 2023</p>
        <p className="ml-4">&#x2705; Create UP DeFi and Vidiac website</p>
        <p className="ml-4">&#x2705; Create social media sites for the UP DeFi platform</p>
        <p className="ml-4">&#x2705; Connect directly with video creators, introduce them to Vidiac</p>

        <p className="text-2xl font-bold mt-6 mb-3">Q1 2024</p>
        <p className="ml-4">&#x2B1C; Launch Vidiac, amplifying video content creators on platforms like YouTube, Twitch, and Rumble</p>
        <p className="ml-4">&#x2B1C; Marketing Material Competition: Reward community members for marketing materials creation</p>
        <p className="ml-4">&#x2B1C; Polish up social media sites with community created content</p>
        <p className="ml-4">&#x2B1C; Develop strategic alliances to enhance creator's and UP DeFi's growth and exposure</p>
        <p className="ml-4">&#x2B1C; Introduce Projects Apollo and Hercules</p>
        <p className="ml-4">&#x2B1C; Partner with creators to build the communities for Project Apollo and Project Hermes</p>
        <p className="ml-4">&#x2B1C; Launch Projects Apollo and Project Hercules</p>
        <p className="ml-4">&#x2B1C; Utilize partnerships to introduce and launch Project Athena</p>
        <p className="ml-4">&#x2B1C; Onboard team members to help shape UP DeFi</p>

        <p className="text-2xl font-bold mt-6 mb-3">Q2 2024 and Beyond</p>
        <p className="ml-4">&#x2B1C; Introduce the scope of Project Hermes</p>
        <p className="ml-4">&#x2B1C; Work with the UP DeFi community to determine the direction of Project Hermes</p>
        <p className="ml-4">&#x2B1C; Develop partnerships with other tokens and build the Project Hermes community</p>
        <p className="ml-4">&#x2B1C; Launch the first token of Project Hermes</p>
        <p className="ml-4">&#x2B1C; Continue to refine and expand the UP DeFi ecosystem</p>
      </div>
      </Card>
    </div>
  );
};

export default Roadmap;