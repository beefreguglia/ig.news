import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId: string }: SubscribeButtonProps) {
  return(
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  );
}