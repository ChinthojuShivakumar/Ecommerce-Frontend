import styles from "./stepper.module.css";

const Stepper = ({steps, currentStep}) => {
 

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, i) => {
        const isCompleted = i + 1 < currentStep;
        const isActive = i + 1 === currentStep;
        return (
          <div className={styles.stepperWrapper} key={i}>
            <div
              className={`${styles.step} ${
                isCompleted
                  ? styles.completed
                  : isActive
                  ? styles.activeIndex
                  : styles.inactive
              }`}
            >
              {i + 1}
            </div>
            <div
              className={` ${currentStep === i + 1 && styles.activeStep} ${
                (isCompleted || isActive) && styles.labelActive
              }`}
            >
              {step}
            </div>
            {i !== steps.length - 1 && (
              <div
                className={`${styles.line} ${
                  i < currentStep && styles.lineActive
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
