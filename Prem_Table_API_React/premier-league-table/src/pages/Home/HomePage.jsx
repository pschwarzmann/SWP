import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.heroBanner}>
        <h1 className={styles.heroText}>Home</h1>
      </div>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <div className={styles.contentGrid}>
          <div className={styles.textBlock}>
            <img 
              src="/img/kbalken.png" 
              className={styles.decorationLine} 
              alt="Decoration" 
            />
            <p className={styles.description}>
              The Premier League, founded in 1992...
              {/* Originaltext hier einfügen */}
            </p>
          </div>
          <img
            src="/img/foden.jpg"
            className={styles.featuredImage}
            alt="Phil Foden"
          />
        </div>
      </section>
    </div>
  );
}