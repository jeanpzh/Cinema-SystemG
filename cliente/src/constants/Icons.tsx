const LoadingIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
      <circle
        fill="#FF156D"
        stroke="#FF156D"
        strokeWidth="7.5"
        r="7.5"
        cx="20"
        cy="32.5"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="32.5;67.5;32.5;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        ></animate>
      </circle>
      <circle
        fill="#FF156D"
        stroke="#FF156D"
        strokeWidth="7.5"
        r="7.5"
        cx="50"
        cy="32.5"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="32.5;67.5;32.5;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        ></animate>
      </circle>
      <circle
        fill="#FF156D"
        stroke="#FF156D"
        strokeWidth="7.5"
        r="7.5"
        cx="80"
        cy="32.5"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="32.5;67.5;32.5;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
      </circle>
    </svg>
  );
};
export default LoadingIcon;
