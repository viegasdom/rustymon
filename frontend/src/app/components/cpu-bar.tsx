/** @jsx jsx */

import { css, jsx } from '@emotion/core';

const calculateColor = (percentage: number): string => {
  if (percentage >= 25 && percentage <= 75) return '#ffcc00';
  if (percentage >= 75) return '#cc3300';
  return '#99cc33';
};

type CPUBarProps = {
  cpuPercentage: number;
};

const CPUBar = ({ cpuPercentage }: CPUBarProps) => {
  return (
    <div
      css={css`
        max-width: 15rem;
        border-radius: 5px;
        background: white;
        text-align: center;
      `}
    >
      <div
        css={css`
          transition: width 3s ease-out;
          height: 3px;
          border: 1px solid #c0c0c0;
          width: ${cpuPercentage}%;
          background: ${calculateColor(cpuPercentage)};
          border-radius: 5px;
          padding: 2px;
        `}
      >
        &nbsp;
      </div>
      {cpuPercentage}%
    </div>
  );
};

export default CPUBar;