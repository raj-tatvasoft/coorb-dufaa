import "./StepFrame.scss";

const StepFrame = ({
  stepCount,
  activeStep,
}: {
  stepCount: number;
  activeStep: number;
}) => {
  const steps = new Array(stepCount).fill(0);
  return (
    <div className="stepFramWrapper">
      {steps.map((_, i) => {
        return (
          <div
            key={`step-frame-${i}`}
            className={`stepFrame ${i === activeStep ? "active" : ""}`}
          ></div>
        );
      })}
    </div>
  );
};

export default StepFrame;
