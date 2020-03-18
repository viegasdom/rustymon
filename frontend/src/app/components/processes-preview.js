import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import useShowMore from '../hooks/use-show-more';
import { setDefault } from '../utils';
import { Button } from './buttons';

const BATCH_SIZE = 9;

const ProcessLink = styled(Link)`
  text-decoration: None;
  color: black;

  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 5px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12); */
  transition: 0.3s;

  :hover {
    /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12); */
    transform: translate3D(0, -1px, 0) scale(1.03);
  }

  :focus {
    /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12); */
    transform: translate3D(0, -1px, 0) scale(1.05);
    outline: none;
  }
`;

const ProcessesPreview = ({ processes }) => {
  const [notShowMore, currentProcesses, showMore, setShowMore] = useShowMore(
    processes,
    {
      batchSize: BATCH_SIZE,
      uniqueID: 'pid',
    },
  );

  return (
    <>
      <ul
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 33%);
          grid-template-rows: repeat(3, auto);
          grid-row-gap: 10px;
          grid-column-gap: 15px;
          margin-bottom: 1rem;
          list-style-type: none;
        `}
      >
        {currentProcesses.map((process, id) => {
          return (
            <ProcessLink
              key={`position-${id}-${process.pid}`}
              to={`processes/${process.pid}`}
            >
              <li css={css``}>
                <p>
                  <strong>Process ID:</strong> {process.pid}
                </p>
                <p>
                  <strong>Process Name:</strong> {process.name}
                </p>
                <p>
                  <strong>Process Processor Usage:</strong>{' '}
                  {setDefault(process.cpu_percent, 0).toFixed(2)}%
                </p>
                <p>
                  <strong>Process Memory Usage:</strong>{' '}
                  {setDefault(process.memory_percent, 0).toFixed(2)}%
                </p>
              </li>
            </ProcessLink>
          );
        })}
      </ul>
      <div
        css={css`
          justify-content: center;
          align-content: center;
          text-align: center;
        `}
      >
        <Button
          onClick={() => setShowMore(showMore + 1)}
          disabled={notShowMore}
        >
          Show More &darr;
        </Button>
        <Button onClick={() => setShowMore(showMore - 1)} disabled={!showMore}>
          Show Less &uarr;
        </Button>
      </div>
    </>
  );
};

export default ProcessesPreview;
