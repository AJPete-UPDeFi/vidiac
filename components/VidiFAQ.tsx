import {Accordion, AccordionItem} from "@nextui-org/react";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FAQ() {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);

return (
  
<section data-aos="fade-up" className="text-center max-w-[1400px]">
    <p className="text-gray-900 text-5xl font-extrabold mb-10">FAQ</p>
        <div className="text-left">
        <Accordion variant="splitted" selectionMode="multiple">
          <AccordionItem data-aos="fade-right" key="1" title="What is Vidiac?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>Vidiac is a DeFi token on the blockchain aiming to empower video creators with dividends and innovative growth opportunities.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-left" key="2" title="How does Vidiac work?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>It rewards video creators through dividends from trading taxes, offers additional income streams, and supports community growth with a referral system.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-right" key="3" title="How do I apply a referral code?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>Connect your wallet, enter the code in the Dashboard, and if needed, request whitelisting to participate.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-left" key="4" title="How are featured creators selected?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>Creators are chosen through community votes, ensuring a diverse and democratically selected spotlight.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-right" key="5" title="Do I need cryptocurrency experience to join Vidiac?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>No, you can start with just a crypto wallet and explore the ecosystem with support from the community.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-left" key="6" title="How can I support my favorite creators on Vidiac?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>Engage with their content, purchase their merchandise from www.vidiac.shop, and invest in Vidiac tokens to directly contribute to their success.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-right" key="7" title="How often are new featured creators introduced?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>New creators are spotlighted weekly, keeping the platform dynamic and diverse.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-left" key="8" title="How are the taxes determined?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>The community adjusts taxes, starting at 10%, with 90% as dividends and 10% to featured creators.</p>
            </div>
          </AccordionItem>

          <AccordionItem data-aos="fade-right" key="9" title="What is www.vidiac.shop?" className="bg-gradient-to-b from-gray-50 to-gray-500">
          <div className="text-lg font-semibold text-white bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg p-4">
            <p>It's a store where purchasing merchandise supports creators directly. Profits are used to buy VIDI tokens on the DEX, which are then sent to the respective creators, boosting their earnings and the project's economy.</p>
            </div>
          </AccordionItem>
        </Accordion>
        </div>
    </section>
);
}