// PresaleProgress.tsx
import React from "react";
import { Progress } from "@nextui-org/react";

interface PresaleProgressProps {
    value: number;
}

const PresaleProgress = ({ value }: PresaleProgressProps) => {
    return (
      <Progress
        aria-label="Presale Progress"
        size="lg"
        value={value}
        color="success"
        showValueLabel={true}
        className="max-w-full font-bold"
      />
    );
};

export default PresaleProgress;