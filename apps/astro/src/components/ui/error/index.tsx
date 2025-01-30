import styles from './Error.module.scss';

type Props = {
  error?: string;
};

export default function Error({ error }: Props) {
  return (
    error && (
      <span className={styles.Error} aria-live="assertive" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
          <path
            stroke="#C23D3D"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 4.5v2m0 2h.005m-.697-6.554L1.195 9.049c-.228.394-.342.591-.325.753a.5.5 0 0 0 .203.353c.132.095.36.095.814.095h8.225c.456 0 .683 0 .815-.095a.5.5 0 0 0 .203-.353c.017-.162-.097-.359-.325-.753L6.692 1.946c-.227-.393-.34-.589-.489-.655a.5.5 0 0 0-.406 0c-.149.066-.262.262-.49.655Z"
          />
        </svg>
        <span>{error}</span>
      </span>
    )
  );
}
