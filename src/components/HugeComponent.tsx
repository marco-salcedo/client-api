const text = new Array(1024 * 1024 * 10)
  .fill(undefined)
  .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
  .join("");

const HugeComponent = () => {
  return <div suppressHydrationWarning>{text}</div>;
};

export default HugeComponent;
