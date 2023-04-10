import React from "react";

const numbers = () => {
  const arr = [1, 2, 3, 4, 5];
  const handleprint = () => {
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  };

  function printOddNumbers() {
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 1) {
        console.log(arr[i]);
      }
    }
  }

  return (
    <div style={{height:"100vh"}}>
      <button onClick={handleprint}>print</button>
      <button onClick={printOddNumbers()}>print</button>
      {arr.map((num, i) => (
        <p key={i}>{num}</p>
      ))}
    </div>
  );
};

export default numbers;
