import { useEffect, useState } from "react";

const moveFieldByKey = (key: string) => {
  const keys: any = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };

  console.log(keys[key])

  return keys[key];
};

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setMovement((m: any) => ({
        ...m,
        [moveFieldByKey(e.code)]: true,
      }));
    };

    const handleKeyUp = (e: any) => {
      setMovement((m: any) => ({
        ...m,
        [moveFieldByKey(e.code)]: false,
      }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};

export default usePlayerControls;
