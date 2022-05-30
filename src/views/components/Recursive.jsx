import React from "react";

function sleep(time) {
  var start = new Date();
  var now;

  while (true) {
    now = new Date();
    if (now - start >= time) {
      break;
    }
  }
}

export const Recursive = ({ values }) => {
  if (values.length > 0) {
    const [first, ...rest] = values;
    // this makes it exponentially slow
    for (let i = 0; i < 3; i++) {
      sleep(2);
    }

    return (
      <div>
        <Recursive values={rest} />
        {first}
      </div>
    );
  } else {
    return null;
  }
};

export const MemoRecursive = React.memo(
  ({ values }) => {
    if (values.length > 0) {
      const [first, ...rest] = values;
      // this makes it exponentially slow
      for (let i = 0; i < 3; i++) {
        sleep(2);
      }

    } else {
      return null;
    }
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);