import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="mainLoader" id="mainPageLoader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <style>
        {`
        .showLoader {
        .mainLoader {
            display: flex;
          }
        }
        .mainLoader {
            position: fixed;
            z-index: 2002;
            height: 100%;
            width: 100%;
            display: none;
            background: rgba(0, 0, 0, 0.3);
            align-items: center;
            justify-content: center;
          }
          .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ellipsis div {
            position: absolute;
            top: 33px;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: var(--lightSand);
            animation-timing-function: cubic-bezier(0, 1, 1, 0);
          }
          .lds-ellipsis div:nth-child(1) {
            left: 8px;
            animation: lds-ellipsis1 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(2) {
            left: 8px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(3) {
            left: 32px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(4) {
            left: 56px;
            animation: lds-ellipsis3 0.6s infinite;
          }
          @keyframes lds-ellipsis1 {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes lds-ellipsis3 {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(0);
            }
          }
          @keyframes lds-ellipsis2 {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(24px, 0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
