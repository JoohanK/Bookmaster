import { useState } from "react";

export const useToggle = (defaultValue: boolean) => {
  const [on, setToggle] = useState<boolean>(defaultValue);

  const toggle = () => {
    setToggle((prev) => !prev);
  };

  const toggleOn = () => {
    setToggle(true);
  };

  const toggleOff = () => {
    setToggle(false);
  };

  return { on, toggle, toggleOn, toggleOff };
};
